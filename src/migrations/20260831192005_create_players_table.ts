import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("players", (table) => {
    table.string("id", 16).primary();
    table.string("name").notNullable();
    table
      .string("manager_id", 16)
      .notNullable()
      .references("id")
      .inTable("managers")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("players");
}
