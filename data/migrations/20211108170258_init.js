exports.up = function(knex) {
  return knex.schema
    .createTable("apods", tbl => {
      tbl.increments("apodId");
      tbl.string("date", 128).notNullable().unique();
      tbl.string("copyright").notNullable();
      tbl.string("explanation").notNullable();
      tbl.string("media_type").notNullable();
      tbl.string("service_version").notNullable();
      tbl.string("url").notNullable();
      tbl.string("title").notNullable();
    })
    .createTable("users", tbl => {
      tbl.increments("userId");
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();
    })
    .createTable("apod_user_pairs", tbl => {
      tbl.increments("pairId");
      tbl
        .integer("userId")
        .unsigned()
        .references("users.userId")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("apodId")
        .unsigned()
        .references("apods.apodId")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("task-apod_user_pairs")
    .dropTableIfExists("users")
    .dropTableIfExists("apods")
};
