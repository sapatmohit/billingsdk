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
						<Input id="fullName" placeholder="John Doe" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="billingEmail">Billing Email</Label>
						<Input id="billingEmail" placeholder="user@example.com" />
						<p className="text-xs text-muted-foreground">
							Invoices will be sent to this email address
						</p>
					</div>

					<div className="space-y-2">
						<Label>Currency</Label>
						<Select defaultValue="usd">
							<SelectTrigger>
								<SelectValue placeholder="Select currency" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="usd">USD - US Dollar</SelectItem>
								<SelectItem value="eur">EUR - Euro</SelectItem>
								<SelectItem value="gbp">GBP - British Pound</SelectItem>
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
						<Switch />
					</div>

					<div className="flex items-center justify-between rounded-lg border p-4">
						<div>
							<div className="font-medium">Invoice Emails</div>
							<div className="text-sm text-muted-foreground">
								Receive emails when invoices are generated
							</div>
						</div>
						<Switch />
					</div>

					<div className="flex items-center justify-between rounded-lg border p-4">
						<div>
							<div className="font-medium">Promotional Emails</div>
							<div className="text-sm text-muted-foreground">
								Receive occasional updates about new features and offers
							</div>
						</div>
						<Switch />
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
