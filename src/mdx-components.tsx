import BannerDemo from '@/components/banner-demo';
import BannerDemoThree from '@/components/banner-demo-three';
import BannerDemoTwo from '@/components/banner-demo-two';
import BannerDestructiveDemo from '@/components/banner-destructive-demo';
import BannerGradientDemo from '@/components/banner-gradient-demo';
import { CancelSubscriptionCardDemo } from '@/components/cancel-subscription-card-demo';
import { CancelSubscriptionDialogDemo } from '@/components/cancel-subscription-dialog-demo';
import InvoiceHistoryDemo from '@/components/invoice-history-demo';
import { PaymentMethodManagerDemo } from '@/components/payment-method-manager-demo';
import { PaymentMethodSelectorDemo } from '@/components/payment-method-selector-demo';
import { PaymentSuccessDialogDemo } from '@/components/payment-success-dialog-demo';
import { PricingTableFiveDemo } from '@/components/pricing-table-five-demo';
import { PricingTableFiveDemoMinimal } from '@/components/pricing-table-five-minimal-demo';
import { PricingTableFourDemo } from '@/components/pricing-table-four-demo';
import { PricingTableOneDemo } from '@/components/pricing-table-one-demo';
import { PricingTableOneMinimalDemo } from '@/components/pricing-table-one-minimal-demo';
import { PricingTableThreeDemo } from '@/components/pricing-table-three-demo';
import { PricingTableTwoDemo } from '@/components/pricing-table-two-demo';
import { PricingTableTwoMinimalDemo } from '@/components/pricing-table-two-minimal-demo';
import { SubscriptionManagementDemo } from '@/components/subscription-management-demo';
import { UpdatePlanCardDemo } from '@/components/update-plan-card-demo';
import { UpdatePlanDialogDemo } from '@/components/update-plan-dialog-demo';
import UsageMeterCircleDemo from '@/components/usage-meter-circle-demo';
import UsageMeterLinearDemo from '@/components/usage-meter-linear-demo';
import UsageTableDemo from '@/components/usage-table-demo';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import dynamic from 'next/dynamic';

const AlertsBannerDemo = dynamic(
	() => import('@/components/billingsdk/alerts-banner-demo')
);

const BillingSummaryCardDemo = dynamic(
	() => import('@/components/billingsdk/billing-summary-card-demo')
);
const DetailedUsageTableDemo = dynamic(
	() => import('@/components/billingsdk/detailed-usage-table-demo')
);
const InvoiceHistory2Demo = dynamic(
	() => import('@/components/billingsdk/invoice-history-2-demo')
);
const PaymentMethodManager2Demo = dynamic(
	() => import('@/components/billingsdk/payment-method-manager-2-demo')
);
const UpcomingChargesDemo = dynamic(
	() => import('@/components/billingsdk/upcoming-charges-demo')
);
const PreviewComponents = dynamic(() =>
	import('@/components/preview/preview-components').then(
		(mod) => mod.PreviewComponents
	)
);

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		...TabsComponents,
		PreviewComponents,
		PricingTableOneDemo,
		PricingTableOneMinimalDemo,
		PricingTableTwoDemo,
		PricingTableTwoMinimalDemo,
		PricingTableThreeDemo,
		PricingTableFourDemo,
		PricingTableFiveDemo,
		PricingTableFiveDemoMinimal,
		CancelSubscriptionCardDemo,
		CancelSubscriptionDialogDemo,
		SubscriptionManagementDemo,
		UpdatePlanDialogDemo,
		UpdatePlanCardDemo,
		UsageMeterLinearDemo,
		UsageMeterCircleDemo,
		BannerDemo,
		BannerDemoTwo,
		BannerDemoThree,
		BannerGradientDemo,
		BannerDestructiveDemo,
		InvoiceHistoryDemo,
		UsageTableDemo,
		PaymentMethodSelectorDemo,
		PaymentMethodManagerDemo,
		PaymentSuccessDialogDemo,
		// Billing & Usage Components
		AlertsBannerDemo,
		BillingSummaryCardDemo,
		DetailedUsageTableDemo,
		InvoiceHistory2Demo,
		PaymentMethodManager2Demo,
		UpcomingChargesDemo,
		// place this last so callers can override
		...components,
	} satisfies MDXComponents;
}
