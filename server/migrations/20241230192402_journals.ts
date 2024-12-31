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

	await knex.raw(`
    CREATE OR REPLACE FUNCTION generate_journal_number()
    RETURNS TRIGGER AS $$
    DECLARE
      max_number INTEGER;
    BEGIN
      SELECT COALESCE(MAX(journal_number), 0) + 1 INTO max_number
      FROM journals
      WHERE company_id = NEW.company_id;
      
      NEW.journal_number = max_number;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

	// Crear un trigger que use la función
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
