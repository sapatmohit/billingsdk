'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

// Updated interface to match invoice-history.tsx
export interface Invoice {
	id: string;
	date: string;
	description?: string;
	amount: string;
	status: 'paid' | 'refunded' | 'open' | 'void';
	invoiceUrl?: string;
}

export interface InvoiceHistory2Props {
	className?: string;
	title?: string;
	description?: string;
	invoices: Invoice[];
	onDownload?: (id: string) => void;
}

export function InvoiceHistory2({
	className,
	title = 'Invoice History',
	description,
	invoices,
	onDownload,
}: InvoiceHistory2Props) {
	const getStatusBadge = (status: Invoice['status']) => {
		switch (status) {
			case 'paid':
				return <Badge variant="default">Paid</Badge>;
			case 'refunded':
				return <Badge variant="secondary">Refunded</Badge>;
			case 'open':
				return <Badge variant="outline">Open</Badge>;
			case 'void':
				return <Badge variant="outline">Void</Badge>;
			default:
				return <Badge variant="outline">Unknown</Badge>;
		}
	};

	// Updated action handler to prefer invoiceUrl when available
	const handleAction = (invoice: Invoice) => {
		if (invoice.invoiceUrl) {
			window.open(invoice.invoiceUrl, '_blank', 'noopener,noreferrer');
		} else {
			onDownload?.(invoice.id);
		}
	};

	// Determine if action button should be shown
	const shouldShowAction = (invoice: Invoice) => {
		return !!invoice.invoiceUrl || !!onDownload;
	};

	// Get aria-label for action button
	const getActionAriaLabel = (invoice: Invoice) => {
		return invoice.invoiceUrl
			? `View invoice ${invoice.id} in new tab`
			: `Download invoice ${invoice.id}`;
	};

	return (
		<Card className={cn('w-full', className)}>
			<CardHeader className="pb-4">
				<CardTitle className="text-lg">{title}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<Table>
						<TableCaption className="sr-only">Invoice history</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Description</TableHead>
								<TableHead className="text-right">Amount</TableHead>
								<TableHead className="text-center">Status</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{invoices.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={5}
										className="h-24 text-center text-muted-foreground"
									>
										No invoices found
									</TableCell>
								</TableRow>
							) : (
								invoices.map((invoice) => (
									<TableRow key={invoice.id}>
										<TableCell className="font-medium">
											{invoice.date}
										</TableCell>
										<TableCell>{invoice.description || 'Invoice'}</TableCell>
										<TableCell className="text-right font-medium">
											{invoice.amount}
										</TableCell>
										<TableCell className="text-center">
											{getStatusBadge(invoice.status)}
										</TableCell>
										<TableCell className="text-right">
											{shouldShowAction(invoice) && (
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleAction(invoice)}
													aria-label={getActionAriaLabel(invoice)}
												>
													<Download className="h-4 w-4 mr-1" />
													{invoice.invoiceUrl ? 'View' : 'Download'}
												</Button>
											)}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
