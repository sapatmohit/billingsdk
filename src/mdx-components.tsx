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
import { PreviewComponents } from '@/components/preview/preview-components';
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
// Billing & Usage Components
import AlertsBannerDemo from '@/components/billingsdk/alerts-banner-demo';
import BillingSettingsDemo from '@/components/billingsdk/billing-settings-demo';
import BillingSummaryCardDemo from '@/components/billingsdk/billing-summary-card-demo';
import DetailedUsageTableDemo from '@/components/billingsdk/detailed-usage-table-demo';
import InvoiceHistoryTableDemo from '@/components/billingsdk/invoice-history-table-demo';
import PaymentMethodCardDemo from '@/components/billingsdk/payment-method-card-demo';
import UpcomingChargesDemo from '@/components/billingsdk/upcoming-charges-demo';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		...components,
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
		BillingSettingsDemo,
		BillingSummaryCardDemo,
		DetailedUsageTableDemo,
		InvoiceHistoryTableDemo,
		PaymentMethodCardDemo,
		UpcomingChargesDemo,
	};
}
