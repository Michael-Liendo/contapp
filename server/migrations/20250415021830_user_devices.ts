import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('user_devices', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table
			.uuid('user_id')
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
		table.string('device_token').notNullable();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('user_devices');
}
