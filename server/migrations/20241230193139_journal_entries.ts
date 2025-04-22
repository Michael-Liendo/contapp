import { MasterNameEnum } from '@contapp/shared';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		MasterNameEnum.Values.journal_entries,
		(table) => {
			table
				.uuid('id')
				.unique()
				.defaultTo(knex.raw('uuid_generate_v4()'))
				.primary();
			table
				.uuid('journal_id')
				.notNullable()
				.references('id')
				.inTable('journals')
				.onDelete('CASCADE');
			table
				.uuid('account_id')
				.notNullable()
				.references('id')
				.inTable('accounts_plan')
				.onDelete('CASCADE');
			table.string('description').nullable();
			table.decimal('debit').notNullable().defaultTo(0);
			table.decimal('credit').notNullable().defaultTo(0);
			table.timestamps(true, true);
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(MasterNameEnum.Values.journal_entries);
}
