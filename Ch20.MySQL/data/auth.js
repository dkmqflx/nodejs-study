import { db } from "../db/database.js";

export async function findByUsername(username) {
  // query 실행
  return db
    .execute("SELECT * FROM users WHERE username=?", [username]) //
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute("SELECT * FROM users WHERE id=?", [id]) //
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;

  // ?에 해당하는 값을 배열로 전달
  // id는 데이터베이스에서 자동으로 생성되는 값
  return db
    .execute(
      "INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)",
      [username, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}
