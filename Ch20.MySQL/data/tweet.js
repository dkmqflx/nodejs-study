import { db } from "../db/database.js";

// tweets as tw - tweets 테이블을 tw로 별칭 붙이기
// users as us - users 테이블을 us로 별칭 붙이기
// tw.userId=us.id - tweets 테이블의 userId와 users 테이블의 id를 조인
// ORDER BY tw.createdAt DESC - tweets 테이블의 createdAt 컬럼을 내림차순으로 정렬
const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";
const ORDER_DESC = "ORDER BY tw.createdAt DESC";

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute("INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)", [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute("DELETE FROM tweets WHERE id=?", [id]);
}
