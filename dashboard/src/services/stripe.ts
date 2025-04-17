import fetch from '@/utils/fetch';
import type { ISResponse } from '@contapp/shared';
import type { Stripe } from 'stripe';

export class StripeService {
	static async listProducts() {
		const response = await fetch('/stripe/list-products');

		const data = await response.json();
		return data as ISResponse<{
			products: Stripe.Product[];
			prices: Stripe.Price[];
		}>;
	}
}
