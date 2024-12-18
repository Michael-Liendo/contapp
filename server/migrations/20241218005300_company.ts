import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('companies', (table) => {
		table
			.uuid('id')
			.unique()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();
		table.string('name').notNullable();
		table.string('color');
		table.uuid('user_id').notNullable().references('id').inTable('users');
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('companies');
}
