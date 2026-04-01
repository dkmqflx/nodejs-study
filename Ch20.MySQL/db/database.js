import mysql from "mysql2"; // mysql 사용할 수 있는 라이브러리 설치
import { config } from "../config.js";

// createPool를 통해서 데이터베이스 연결을 관리하는 풀을 생성
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.databse,
  password: config.db.password,
});

export const db = pool.promise(); // 비동기적으로 promise 방식으로 데이터베이스 연결을 관리하는 풀을 생성
