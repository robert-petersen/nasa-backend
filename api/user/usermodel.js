const db = require("../../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  add,
  findById,
  remove,
  update
};

function find() {
  return db("users as u")
    .select("u.userId", "u.username");
}

function findBy(filter) {
  return db("users as u")
    .select("u.userId", "u.username")
    .where(filter);
}

async function add(user) {
  await db("users").insert(user, "");
  const userObj = await db("user").where("username", user.username).first()
  return userObj;
}

function findById(id) {
  return db("users as u")
    .select("u.userId", "u.username")
    .where("u.userId", id)
    .first();
}

function remove(id) {
  return db("users as u")
    .where("u.userId", id)
    .del();
}

function update(id, changes) {
  return db("users as u")
    .where("u.userId", id)
    .update(changes, '*');
}