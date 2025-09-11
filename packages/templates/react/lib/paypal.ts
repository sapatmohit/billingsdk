import { environment, PayPalHttpClient } from '@paypal/checkout-server-sdk';

/**
 * PayPal SDK configuration
 * 
 * This file sets up the PayPal client with the appropriate environment
 * based on the PAYPAL_ENV environment variable.
 */

// Determine PayPal environment based on PAYPAL_ENV
const getPayPalEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set in environment variables');
  }
  
  if (process.env.PAYPAL_ENV === 'live') {
    return new environment.LiveEnvironment(clientId, clientSecret);
  }
  return new environment.SandboxEnvironment(clientId, clientSecret);
};

// Create PayPal client
export const paypalClient = new PayPalHttpClient(getPayPalEnvironment());

/**
 * Create a PayPal order
 * 
 * @param amount - The amount to charge
 * @param currency - The currency code (e.g., 'USD')
 * @param description - Description of the purchase
 * @returns Promise resolving to the order ID
 */
export const createPayPalOrder = async (
  amount: string,
  currency: string = 'USD',
  description: string = 'BillingSDK Purchase'
) => {
  const request = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        description,
        amount: {
          currency_code: currency,
          value: amount,
        },
      },
    ],
    application_context: {
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/return`,
    },
  };

  try {
    const response = await paypalClient.execute({
      path: '/v2/checkout/orders',
      method: 'POST',
      body: request,
    });
    
    return response.result.id;
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw error;
  }
};

/**
 * Capture a PayPal order
 * 
 * @param orderId - The PayPal order ID to capture
 * @returns Promise resolving to the capture result
 */
export const capturePayPalOrder = async (orderId: string) => {
  try {
    const response = await paypalClient.execute({
      path: `/v2/checkout/orders/${orderId}/capture`,
      method: 'POST',
    });
    
    return response.result;
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    throw error;
  }
};

/**
 * Get order details
 * 
 * @param orderId - The PayPal order ID to retrieve
 * @returns Promise resolving to the order details
 */
export const getPayPalOrder = async (orderId: string) => {
  try {
    const response = await paypalClient.execute({
      path: `/v2/checkout/orders/${orderId}`,
      method: 'GET',
    });
    
    return response.result;
  } catch (error) {
    console.error('Error retrieving PayPal order:', error);
    throw error;
  }
};