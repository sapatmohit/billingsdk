'use client';

import {
	PaymentMethodManager2,
	type PaymentMethod2,
} from '@/registry/billingsdk/payment-method-manager-2';
import { useState } from 'react';

export function PaymentMethodManager2Demo() {
	const [paymentMethods, setPaymentMethods] = useState<PaymentMethod2[]>([
		{
			id: 'pm_1',
			type: 'credit',
			brand: 'Visa',
			last4: '4242',
			expiry: '12/2027',
			isDefault: true,
			cardholderName: 'John Doe',
			createdAt: '2023-01-15',
			status: 'active',
		},
		{
			id: 'pm_2',
			type: 'credit',
			brand: 'Mastercard',
			last4: '5555',
			expiry: '08/2026',
			isDefault: false,
			cardholderName: 'John Doe',
			createdAt: '2023-03-22',
			status: 'active',
		},
		{
			id: 'pm_3',
			type: 'ach',
			bankName: 'Chase Bank',
			last4: '8765',
			isDefault: false,
			cardholderName: 'John Doe',
			createdAt: '2023-05-10',
			status: 'active',
		},
		{
			id: 'pm_4',
			type: 'credit',
			brand: 'American Express',
			last4: '1234',
			expiry: '05/2024',
			isDefault: false,
			cardholderName: 'John Doe',
			createdAt: '2022-11-08',
			status: 'expired',
		},
		{
			id: 'pm_5',
			type: 'credit',
			brand: 'Discover',
			last4: '9876',
			expiry: '11/2025',
			isDefault: false,
			cardholderName: 'Jane Smith',
			createdAt: '2023-07-19',
			status: 'active',
		},
		{
			id: 'pm_6',
			type: 'ach',
			bankName: 'Bank of America',
			last4: '4321',
			isDefault: false,
			cardholderName: 'Jane Smith',
			createdAt: '2023-02-14',
			status: 'active',
		},
	]);

	const handleAdd = () => {
		console.log('Add payment method');
		// In a real app, this would redirect to a payment method addition flow
		alert('Redirecting to add payment method flow...');
	};

	const handleEdit = (id: string) => {
		console.log('Edit payment method', id);
		// In a real app, this would open a dialog or redirect to a payment method edit flow
		alert(`Opening edit dialog for payment method ${id}...`);
	};

	const handleRemove = (id: string) => {
		console.log('Remove payment method', id);
		// In a real app, this would call an API to remove the payment method
		setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
	};

	const handleSetDefault = (id: string) => {
		console.log('Set default payment method', id);
		// In a real app, this would call an API to set the default payment method
		setPaymentMethods((prev) =>
			prev.map((method) => ({
				...method,
				isDefault: method.id === id,
			}))
		);
	};

	const handleViewDetails = (id: string) => {
		console.log('View details for payment method', id);
		// In a real app, this might fetch additional details or open a detailed view
	};

	return (
		<div className="p-4">
			<PaymentMethodManager2
				paymentMethods={paymentMethods}
				onAdd={handleAdd}
				onEdit={handleEdit}
				onRemove={handleRemove}
				onSetDefault={handleSetDefault}
				onViewDetails={handleViewDetails}
			/>
		</div>
	);
}
