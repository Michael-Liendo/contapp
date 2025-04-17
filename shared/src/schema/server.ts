import { z } from 'zod';

export const MasterNameEnum = z.enum([
	'users',
	'companies',
	'accounts_plan',
	'journals',
	'journal_entries',
	'user_devices',
]);
