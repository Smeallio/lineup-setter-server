import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("managers", (table) => {
    table.string("id", 16).primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password_hash", 255).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("managers");
}
