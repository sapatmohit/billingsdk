'use client';

import { BillingSettings } from '@/registry/billingsdk/billing-settings';

export function BillingSettingsDemo() {
	return (
		<BillingSettings
			title="Billing Settings"
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
