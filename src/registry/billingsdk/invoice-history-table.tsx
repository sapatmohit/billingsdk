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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

export interface Invoice {
	id: string;
	date: string;
	description: string;
	amount: string;
	status: 'paid' | 'pending' | 'overdue' | 'cancelled';
}

export interface InvoiceHistoryTableProps {
	className?: string;
	title?: string;
	description?: string;
	invoices: Invoice[];
	onDownload?: (id: string) => void;
}

export function InvoiceHistoryTable({
	className,
	title = 'Invoice History',
	description,
	invoices,
	onDownload,
}: InvoiceHistoryTableProps) {
	const getStatusBadge = (status: Invoice['status']) => {
		switch (status) {
			case 'paid':
				return <Badge variant="default">Paid</Badge>;
			case 'pending':
				return <Badge variant="secondary">Pending</Badge>;
			case 'overdue':
				return <Badge variant="destructive">Overdue</Badge>;
			case 'cancelled':
				return <Badge variant="outline">Cancelled</Badge>;
			default:
				return <Badge variant="outline">Unknown</Badge>;
		}
	};

	return (
		<Card className={cn('w-full', className)}>
			<CardHeader className="pb-4">
				<CardTitle className="text-lg">{title}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Description</TableHead>
								<TableHead className="text-right">Amount</TableHead>
								<TableHead className="text-center">Status</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{invoices.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={5}
										className="text-center text-muted-foreground"
									>
										No invoices found
									</TableCell>
								</TableRow>
							) : (
								invoices.map((invoice) => (
									<TableRow key={invoice.id}>
										<TableCell className="font-medium">
											{invoice.date}
										</TableCell>
										<TableCell>{invoice.description}</TableCell>
										<TableCell className="text-right font-medium">
											{invoice.amount}
										</TableCell>
										<TableCell className="text-center">
											{getStatusBadge(invoice.status)}
										</TableCell>
										<TableCell className="text-right">
											<Button
												variant="outline"
												size="sm"
												onClick={() => onDownload?.(invoice.id)}
											>
												<Download className="h-4 w-4 mr-1" />
												PDF
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
