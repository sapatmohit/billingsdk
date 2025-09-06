'use client';

import { InvoiceHistoryTable } from '@/registry/billingsdk/invoice-history-table';

export function InvoiceHistoryTableDemo() {
	return (
		<InvoiceHistoryTable
			title="Billing History"
			description="Your past invoices and payment records"
			invoices={[
				{
					id: '1',
					date: '2025-08-15',
					description: 'Pro Plan (Monthly)',
					amount: '$29.00',
					status: 'paid',
				},
				{
					id: '2',
					date: '2025-07-15',
					description: 'Pro Plan (Monthly)',
					amount: '$29.00',
					status: 'paid',
				},
				{
					id: '3',
					date: '2025-06-15',
					description: 'Pro Plan (Monthly)',
					amount: '$29.00',
					status: 'paid',
				},
				{
					id: '4',
					date: '2025-05-15',
					description: 'Pro Plan (Monthly)',
					amount: '$29.00',
					status: 'overdue',
				},
			]}
			onDownload={(id) => console.log(`Download invoice ${id}`)}
		/>
	);
}
