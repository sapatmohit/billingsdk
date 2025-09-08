'use client';

import { BillingSettings2 } from '@/registry/billingsdk/billing-settings-2';

export function BillingSettings2Demo() {
	return (
		<BillingSettings2
			title="Billing Settings 2"
			description="Manage your billing preferences and settings"
			initialData={{
				email: 'user@example.com',
				name: 'John Doe',
				autoRenewal: true,
				invoiceEmails: true,
				promotionalEmails: false,
				currency: 'USD',
				taxId: 'EU123456789',
			}}
			onSave={(data) => {
				console.log('Saved billing settings:', data);
			}}
			onCancel={() => {
				console.log('Cancelled billing settings changes');
			}}
		/>
	);
}
