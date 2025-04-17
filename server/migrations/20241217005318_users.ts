import { UserNotificationSchema, UserRoleEnum } from '@contapp/shared';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	await knex.schema.createTable('users', (table) => {
		table
			.uuid('id')
			.unique()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();
		table.boolean('active').notNullable().defaultTo(true);
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('email').notNullable().unique();
		table
			.enum('role', UserRoleEnum.options)
			.notNullable()
			.defaultTo(UserRoleEnum.Enum.USER);
		table
			.json('notifications')
			.notNullable()
			.defaultTo(UserNotificationSchema.default);

		table.string('password').notNullable();
		table.timestamp('terms_accepted_at').nullable();
		table.timestamp('email_confirmed_at').nullable();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('users');
}
