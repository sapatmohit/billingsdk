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
import { cn } from '@/lib/utils';
import { CreditCard, Plus, Star, Trash2 } from 'lucide-react';

export interface PaymentMethod {
	id: string;
	type: 'credit' | 'debit' | 'ach';
	brand?: string;
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
}

export function PaymentMethodCard({
	className,
	title = 'Payment Methods',
	description,
	paymentMethods,
	onAdd,
	onRemove,
	onSetDefault,
}: PaymentMethodCardProps) {
	return (
		<Card className={cn('w-full', className)}>
			<CardHeader className="pb-4">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<CardTitle className="text-lg">{title}</CardTitle>
						{description && <CardDescription>{description}</CardDescription>}
					</div>
					<Button onClick={onAdd} size="sm">
						<Plus className="h-4 w-4 mr-2" />
						Add Payment Method
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{paymentMethods.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						<CreditCard className="h-12 w-12 mx-auto mb-4" />
						<p>No payment methods added yet</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{paymentMethods.map((method) => (
							<div
								key={method.id}
								className={cn(
									'rounded-lg border p-4 relative',
									method.isDefault && 'border-primary bg-primary/5'
								)}
							>
								{method.isDefault && (
									<div className="absolute -top-2 -right-2">
										<Badge variant="default">
											<Star className="h-3 w-3 mr-1" />
											Default
										</Badge>
									</div>
								)}
								<div className="flex items-center gap-3 mb-4">
									<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
										<CreditCard className="h-5 w-5" />
									</div>
									<div>
										<p className="font-medium">
											{method.brand
												? method.brand
												: method.type === 'ach'
												? 'Bank Account'
												: 'Card'}
										</p>
										<p className="text-sm text-muted-foreground">
											**** **** **** {method.last4}
										</p>
									</div>
								</div>
								{method.expiry && (
									<div className="text-sm mb-4">
										<span className="text-muted-foreground">Expires: </span>
										<span>{method.expiry}</span>
									</div>
								)}
								<div className="flex gap-2">
									{!method.isDefault && (
										<Button
											variant="outline"
											size="sm"
											className="flex-1"
											onClick={() => onSetDefault?.(method.id)}
										>
											<Star className="h-4 w-4 mr-1" />
											Set Default
										</Button>
									)}
									<Button
										variant="outline"
										size="sm"
										className="flex-1"
										onClick={() => onRemove?.(method.id)}
									>
										<Trash2 className="h-4 w-4 mr-1" />
										Remove
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
