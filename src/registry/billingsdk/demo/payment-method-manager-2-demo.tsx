'use client';

import { PaymentMethodCard } from '@/registry/billingsdk/payment-method-card';

export function PaymentMethodManager2Demo() {
	return (
		<PaymentMethodCard
			title="Saved Payment Methods"
			description="Manage your payment methods"
			paymentMethods={[
				{
					id: '1',
					type: 'credit',
					brand: 'Visa',
					last4: '4242',
					expiry: '12/2027',
					isDefault: true,
				},
				{
					id: '2',
					type: 'credit',
					brand: 'Mastercard',
					last4: '5555',
					expiry: '08/2026',
					isDefault: false,
				},
				{ id: '3', type: 'ach', last4: '8765', isDefault: false },
			]}
			onAdd={() => console.log('Add payment method')}
			onRemove={(id) => console.log('Remove payment method', id)}
			onSetDefault={(id) => console.log('Set default payment method', id)}
		/>
	);
}
