'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, CreditCard, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const billingSettingsSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
	autoRenewal: z.boolean(),
	invoiceEmails: z.boolean(),
	promotionalEmails: z.boolean(),
	currency: z.string().min(1, { message: 'Currency is required.' }),
	taxId: z.string().optional(),
});

export type BillingSettingsProps = z.infer<typeof billingSettingsSchema>;

export interface BillingSettingsData {
	email: string;
	name: string;
	autoRenewal: boolean;
	invoiceEmails: boolean;
	promotionalEmails: boolean;
	currency: string;
	taxId?: string;
}

export interface BillingSettings2ComponentProps {
	className?: string;
	title?: string;
	description?: string;
	initialData?: BillingSettingsData;
	onSave?: (data: BillingSettingsData) => void;
	onCancel?: () => void;
}

export function BillingSettings2({
	className,
	title = 'Billing Settings 2',
	description,
	initialData,
	onSave,
	onCancel,
}: BillingSettings2ComponentProps) {
	const form = useForm<BillingSettingsProps>({
		resolver: zodResolver(billingSettingsSchema),
		defaultValues: {
			email: initialData?.email || '',
			name: initialData?.name || '',
			autoRenewal: initialData?.autoRenewal ?? true,
			invoiceEmails: initialData?.invoiceEmails ?? true,
			promotionalEmails: initialData?.promotionalEmails ?? false,
			currency: initialData?.currency || 'USD',
			taxId: initialData?.taxId || '',
		},
	});

	function onSubmit(data: BillingSettingsProps) {
		onSave?.(data);
	}

	return (
		<Card className={cn('w-full', className)}>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<CreditCard className="h-5 w-5" />
					{title}
				</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2">
											<User className="h-4 w-4" />
											Full Name
										</FormLabel>
										<FormControl>
											<Input placeholder="Enter your full name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2">
											<Mail className="h-4 w-4" />
											Billing Email
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your billing email"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Invoices will be sent to this email address
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="currency"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2">
											<CreditCard className="h-4 w-4" />
											Currency
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select currency" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="USD">USD - US Dollar</SelectItem>
												<SelectItem value="EUR">EUR - Euro</SelectItem>
												<SelectItem value="GBP">GBP - British Pound</SelectItem>
												<SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
												<SelectItem value="CAD">
													CAD - Canadian Dollar
												</SelectItem>
												<SelectItem value="AUD">
													AUD - Australian Dollar
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="taxId"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2">
											<CreditCard className="h-4 w-4" />
											Tax ID (Optional)
										</FormLabel>
										<FormControl>
											<Input placeholder="Enter your tax ID" {...field} />
										</FormControl>
										<FormDescription>
											For VAT or other tax purposes
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="space-y-4">
							<FormField
								control={form.control}
								name="autoRenewal"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base flex items-center gap-2">
												<Calendar className="h-4 w-4" />
												Auto-Renewal
											</FormLabel>
											<FormDescription>
												Automatically renew your subscription
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="invoiceEmails"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base">
												Invoice Emails
											</FormLabel>
											<FormDescription>
												Receive emails when invoices are generated
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="promotionalEmails"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base">
												Promotional Emails
											</FormLabel>
											<FormDescription>
												Receive occasional updates about new features and offers
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-end gap-3">
							<Button type="button" variant="outline" onClick={onCancel}>
								Cancel
							</Button>
							<Button type="submit">Save Changes</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
