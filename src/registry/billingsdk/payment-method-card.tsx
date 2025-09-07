'use client';

import { Building, CreditCard, Edit3, Star, Trash2 } from 'lucide-react';
import type { FC } from 'react';

export interface PaymentMethod {
	id: string;
	type: 'credit' | 'ach';
	brand?: string;
	bankName?: string;
	last4: string;
	expiry?: string;
	isDefault: boolean;
}

export interface PaymentMethodCardProps {
	className?: string;
	title?: string;
	description?: string;
	paymentMethods: PaymentMethod[];
	onAdd?: () => void;
	onRemove?: (id: string) => void;
	onSetDefault?: (id: string) => void;
	onEdit?: (id: string) => void;
}

const PaymentMethodCard: FC<PaymentMethodCardProps> = ({
	title,
	description,
	paymentMethods,
	onAdd,
	onRemove,
	onSetDefault,
	onEdit,
}) => {
	return (
		<div className="payment-method-card">
			<h2>{title}</h2>
			<p>{description}</p>

			{onAdd && (
				<button className="add-button" onClick={onAdd}>
					Add Payment Method
				</button>
			)}

			<div className="payment-methods">
				{paymentMethods.map((method) => (
					<div key={method.id} className={`payment-method ${method.type}`}>
						<div className="method-details">
							<div className="method-type">
								{method.type === 'credit' ? (
									<CreditCard className="w-5 h-5" />
								) : (
									<Building className="w-5 h-5" />
								)}
								<span>
									{method.type === 'credit' ? 'Credit Card' : 'ACH Account'}
								</span>
							</div>
							<div className="method-info">
								{method.type === 'credit' && (
									<>
										<div>
											<strong>Brand:</strong> {method.brand}
										</div>
										<div>
											<strong>Last 4:</strong> {method.last4}
										</div>
										<div>
											<strong>Expiry:</strong> {method.expiry}
										</div>
									</>
								)}
								{method.type === 'ach' && (
									<div>
										<strong>Last 4:</strong> {method.last4}
									</div>
								)}
							</div>
						</div>

						<div className="method-actions">
							<button
								className="edit-button"
								onClick={() => onEdit?.(method.id)}
								aria-label={`Edit ${
									method.type === 'credit'
										? method.brand || 'credit card'
										: method.bankName || 'bank account'
								} ending in ${method.last4}`}
							>
								<Edit3 className="w-4 h-4" />
							</button>
							<button
								className="delete-button"
								onClick={() => onRemove?.(method.id)}
								aria-label={`Delete ${
									method.type === 'credit'
										? method.brand || 'credit card'
										: method.bankName || 'bank account'
								} ending in ${method.last4}`}
							>
								<Trash2 className="w-4 h-4" />
							</button>
							{!method.isDefault && (
								<button
									className="set-default-button"
									onClick={() => onSetDefault?.(method.id)}
									aria-label={`Set ${
										method.type === 'credit'
											? method.brand || 'credit card'
											: method.bankName || 'bank account'
									} ending in ${method.last4} as default payment method`}
								>
									<Star className="w-4 h-4" /> Set Default
								</button>
							)}
						</div>
					</div>
				))}
			</div>

			<style jsx>{`
				.payment-method-card {
					font-family: Arial, sans-serif;
					color: #333;
				}

				.payment-methods {
					display: flex;
					gap: 20px;
					margin-top: 20px;
					flex-wrap: wrap;
				}

				.payment-method {
					border: 1px solid #ddd;
					padding: 20px;
					border-radius: 8px;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
					transition: transform 0.2s;
				}
				.payment-method:hover {
					transform: scale(1.02);
				}
				.payment-method.credit {
					background-color: #f9f9f9;
				}
				.payment-method.ach {
					background-color: #eef;
				}

				.method-details {
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.method-type {
					display: flex;
					align-items: center;
					gap: 10px;
				}

				.method-actions button {
					background: none;
					border: none;
					cursor: pointer;
					margin-right: 10px;
				}
				.method-actions button:hover {
					color: #007bff;
				}

				.set-default-button {
					background-color: #007bff;
					color: white;
					padding: 5px 10px;
					border-radius: 4px;
				}
				.set-default-button:hover {
					background-color: #0056b3;
				}

				.add-button {
					background-color: #28a745;
					color: white;
					border: none;
					padding: 10px 15px;
					border-radius: 4px;
					cursor: pointer;
					margin-bottom: 20px;
				}
				.add-button:hover {
					background-color: #218838;
				}
			`}</style>
		</div>
	);
};

export default PaymentMethodCard;
