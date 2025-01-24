import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('accounts_plan', (table) => {
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
		table.string('nomenclature').notNullable();
		table.string('name').notNullable();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('accounts_plan');
}
