import { JournalDestinationEnum } from '@contapp/shared';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('journals', (table) => {
		table
			.uuid('id')
			.unique()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();
		table
			.uuid('company_id')
			.notNullable()
			.references('id')
			.inTable('companies');
		table.string('description').nullable();
		table.enum('destination', JournalDestinationEnum.options).notNullable();
		table.date('entry_date').notNullable();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('journals');
}
