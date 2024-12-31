import { JournalDestinationEnum } from '@contapp/shared';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('journals', (table) => {
		table
			.uuid('id')
			.unique()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();
		table.integer('journal_number').notNullable();
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
	// 3. Crear secuencia para journal_number
	await knex.raw(`
    CREATE SEQUENCE journal_number_seq;
  `);

	// 4. Crear función para generar journal_number
	await knex.raw(`
    CREATE OR REPLACE FUNCTION generate_journal_number()
    RETURNS TRIGGER AS $$
    DECLARE
      next_number INTEGER;
    BEGIN
      SELECT nextval('journal_number_seq') INTO next_number;
      NEW.journal_number = next_number;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

	// 5. Crear trigger
	await knex.raw(`
    CREATE TRIGGER set_journal_number
    BEFORE INSERT ON journals
    FOR EACH ROW
    EXECUTE FUNCTION generate_journal_number();
  `);
}

export async function down(knex: Knex): Promise<void> {
	await knex.raw('DROP TRIGGER IF EXISTS set_journal_number ON journals');

	await knex.raw('DROP FUNCTION IF EXISTS generate_journal_number');

	await knex.schema.dropTableIfExists('journals');
}
