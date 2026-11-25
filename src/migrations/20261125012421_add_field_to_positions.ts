import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("positions", (table) => {
    table
      .enu("field", ["infield", "outfield"])
      .notNullable()
      .defaultTo("infield")
      .after("position");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("positions", (table) => {
    table.dropColumn("field");
  });
}