import { stripe } from '../config/stripe';
import type { Reply, Request } from '../types';

export async function listProducts(_: Request, reply: Reply) {
	const products = await stripe.products.list();
	const prices = await stripe.prices.list();

	reply.code(200).send({
		success: true,
		message: 'Products retrieved successfully',
		data: {
			products: products.data,
			prices: prices.data,
		},
	});
}
