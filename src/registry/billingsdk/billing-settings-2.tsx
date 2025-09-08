'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export interface BillingSettings2Props {
	className?: string;
}

export function BillingSettings2({ className }: BillingSettings2Props) {
	return (
		<Card className={cn('mx-auto max-w-5xl', className)}>
			<CardHeader>
				<CardTitle className="text-lg">Billing Settings</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<p className="text-sm text-muted-foreground">
					Manage your billing preferences and settings
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label htmlFor="fullName">Full Name</Label>
						<Input id="fullName" placeholder="John Doe" autoComplete="name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="billingEmail">Billing Email</Label>
						<Input
							id="billingEmail"
							type="email"
							autoComplete="email"
							placeholder="user@example.com"
						/>
						<p className="text-xs text-muted-foreground">
							Invoices will be sent to this email address
						</p>
					</div>

					<div className="space-y-2">
						<Label id="currency-label">Currency</Label>
						<Select defaultValue="usd">
							<SelectTrigger aria-labelledby="currency-label">
								<SelectValue placeholder="Select currency" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="usd">USD - US Dollar</SelectItem>
								<SelectItem value="inr">INR - Indian Rupees</SelectItem>
								<SelectItem value="eur">EUR - Euro</SelectItem>
								<SelectItem value="gbp">GBP - British Pound</SelectItem>
								<SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
								<SelectItem value="aud">AUD - Australian Dollar</SelectItem>
								<SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
								<SelectItem value="cny">CNY - Chinese Yuan</SelectItem>
								<SelectItem value="sgd">SGD - Singapore Dollar</SelectItem>
								<SelectItem value="chf">CHF - Swiss Franc</SelectItem>
								<SelectItem value="zar">ZAR - South African Rand</SelectItem>
								<SelectItem value="aed">AED - UAE Dirham</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="taxId">Tax ID (Optional)</Label>
						<Input id="taxId" placeholder="EU123456789" />
						<p className="text-xs text-muted-foreground">
							For VAT or other tax purposes
						</p>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between rounded-lg border p-4">
						<div>
							<div className="font-medium">Auto-Renewal</div>
							<div className="text-sm text-muted-foreground">
								Automatically renew your subscription
							</div>
						</div>
						<Switch aria-label="Auto-Renewal" />
					</div>

					<div className="flex items-center justify-between rounded-lg border p-4">
						<div>
							<div className="font-medium">Invoice Emails</div>
							<div className="text-sm text-muted-foreground">
								Receive emails when invoices are generated
							</div>
						</div>
						<Switch aria-label="Invoice Emails" />
					</div>

					<div className="flex items-center justify-between rounded-lg border p-4">
						<div>
							<div className="font-medium">Promotional Emails</div>
							<div className="text-sm text-muted-foreground">
								Receive occasional updates about new features and offers
							</div>
						</div>
						<Switch aria-label="Promotional Emails" />
					</div>
				</div>

				<div className="flex items-center justify-end gap-3 pt-2">
					<Button variant="outline">Cancel</Button>
					<Button>Save Changes</Button>
				</div>
			</CardContent>
		</Card>
	);
}
