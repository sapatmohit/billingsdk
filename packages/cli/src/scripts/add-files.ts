import { confirm, spinner } from '@clack/prompts';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Result } from '../types/registry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Adds files for the specified framework and provider.
 * Fetches template files from either a remote URL or local file system.
 * Handles file conflicts and dependency installation.
 *
 * @param framework - The target framework ('nextjs', 'express', or 'react')
 * @param provider - The payment provider ('dodopayments' or 'paypal')
 * @returns Promise that resolves when all files are added
 */
export const addFiles = async (
	framework: 'nextjs' | 'express' | 'react',
	provider: 'dodopayments' | 'paypal'
) => {
	/**
	 * Attempts to fetch template from remote URL.
	 * Falls back to local template if remote fetch fails.
	 */
	const fetchTemplate = async (): Promise<Result> => {
		const remoteUrl = `https://billingsdk.com/tr/${framework}-${provider}.json`;
		const localPath = path.join(
			__dirname,
			'..',
			'..',
			'..',
			'..',
			'public',
			'tr',
			`${framework}-${provider}.json`
		);

		try {
			const response = await fetch(remoteUrl);
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}
			return (await response.json()) as Result;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			try {
				if (fs.existsSync(localPath)) {
					const localContent = fs.readFileSync(localPath, 'utf8');
					return JSON.parse(localContent) as Result;
				} else {
					throw new Error(
						`Local template not found at ${localPath}. Remote template failed with: ${errorMessage}`
					);
				}
			} catch (readError) {
				const readErrorMessage =
					readError instanceof Error ? readError.message : String(readError);
				throw new Error(
					`Failed to read or parse local template at ${localPath}. Error: ${readErrorMessage}. Remote template failed with: ${errorMessage}`
				);
			}
		}
	};

	const result = await fetchTemplate();
	let srcExists = fs.existsSync(path.join(process.cwd(), 'src'));
	const addToPath = srcExists ? 'src' : '';

	for (const file of result.files) {
		// Validate and sanitize file.target to prevent path traversal
		const baseDir = path.resolve(process.cwd(), addToPath ?? '.');
		const dest = path.resolve(
			process.cwd(),
			addToPath ?? '.',
			file.target
		);
		const relativePath = path.relative(baseDir, dest);
		const insideBase =
			!path.isAbsolute(file.target) &&
			!relativePath.startsWith('..') &&
			!path.isAbsolute(relativePath) &&
			dest.startsWith(baseDir + path.sep);
		if (!insideBase) {
			console.error(
				`Skipping file ${file.target}: Path traversal detected`
			);
			continue;
		}

		const filePath = dest;
		const dirPath = path.dirname(filePath);
		const displayPath = addToPath
			? path.join(addToPath, file.target)
			: file.target;

		try {
			fs.mkdirSync(dirPath, { recursive: true });
			const fileName = path.basename(file.target);

			if (fs.existsSync(filePath)) {
				if (fileName === '.env.example') {
					const existingContent = fs.readFileSync(filePath, 'utf8');

					// Parse existing content into a set of keys (ignore blank lines and comments)
					const existingLines = existingContent.split('\n');
					const existingKeys = new Set<string>();
					for (const line of existingLines) {
						const trimmedLine = line.trim();
						if (trimmedLine && !trimmedLine.startsWith('#')) {
							const [key] = trimmedLine.split('=', 2);
							if (key) {
								existingKeys.add(key.trim());
							}
						}
					}

					// Parse new content and filter out duplicate keys
					const newLines = file.content.split('\n');
					const filteredNewLines: string[] = [];
					for (const line of newLines) {
						const trimmedLine = line.trim();
						if (trimmedLine && !trimmedLine.startsWith('#')) {
							const [key] = trimmedLine.split('=', 2);
							if (key && !existingKeys.has(key.trim())) {
								filteredNewLines.push(line);
							}
						} else {
							// Keep comments and blank lines
							filteredNewLines.push(line);
						}
					}

					// Only append non-duplicate lines
					let newContent = existingContent;
					if (filteredNewLines.length > 0) {
						// Ensure there's a newline at the end of existing content before appending
						if (!newContent.endsWith('\n')) {
							newContent += '\n';
						}
						// Append filtered lines
						newContent += filteredNewLines.join('\n');
						// Ensure file ends with a newline
						if (!newContent.endsWith('\n')) {
							newContent += '\n';
						}
					}

					fs.writeFileSync(filePath, newContent);
				} else {
					const overwrite = await confirm({
						message: `File ${displayPath} already exists. Do you want to overwrite it?`,
					});
					if (overwrite) {
						fs.writeFileSync(filePath, file.content);
					}
				}
			} else {
				fs.writeFileSync(filePath, file.content);
			}
		} catch (error) {
			console.error(`Failed to add file ${displayPath}:`, error);
		}
	}

	/**
	 * Determines the package manager being used based on the npm_config_user_agent environment variable.
	 *
	 * @returns The name of the package manager ('bun', 'pnpm', 'yarn', or 'npm')
	 */
	function getPackageManager(): string {
		const userAgent = process.env.npm_config_user_agent || '';

		if (userAgent.startsWith('bun')) {
			return 'bun';
		} else if (userAgent.startsWith('pnpm')) {
			return 'pnpm';
		} else if (userAgent.startsWith('yarn')) {
			return 'yarn';
		} else {
			return 'npm';
		}
	}

	if (result.dependencies && process.env.BILLINGSDK_SKIP_INSTALL !== '1') {
		const s = spinner();
		s.start('Installing dependencies...');
		try {
			const packageManager = getPackageManager();
			const mkArgs = (pm: string, deps: string[]) => {
				switch (pm) {
					case 'pnpm':
						return ['add', ...deps];
					case 'yarn':
						return ['add', ...deps];
					case 'bun':
						return ['add', ...deps];
					default: // npm
						return ['install', ...deps];
				}
			};
			const args = mkArgs(packageManager, result.dependencies);
			execFileSync(packageManager, args, {
				stdio: 'inherit',
				timeout: 5 * 60 * 1000,
			});
			s.stop('Dependencies installed successfully!');
		} catch (error) {
			s.stop('Dependency installation failed.');
			console.error('Failed to install dependencies:', error);
		}
	}
};