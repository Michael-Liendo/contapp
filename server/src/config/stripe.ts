import { Stripe } from 'stripe';
import { EnvConfig } from './env';

export const stripe = new Stripe(EnvConfig().STRIPE_SECRET_KEY);
