import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("players", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .integer("manager_id")
      .unsigned()
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
