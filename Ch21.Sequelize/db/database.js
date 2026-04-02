import { config } from "../config.js";
import SQ from "sequelize"; // sequelize 사용할 수 있는 라이브러리 설치

const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
});
