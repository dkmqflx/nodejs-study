import SQ from "sequelize";
import { sequelize } from "../db/database.js";
const DataTypes = SQ.DataTypes;

// user 테이블을 정의
export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  { timestamps: false }
);

// username으로 사용자를 찾는 함수
export async function findByUsername(username) {
  return User.findOne({ where: { username } });
}

// id로 사용자를 찾는 함수
export async function findById(id) {
  return User.findByPk(id);
}

// 사용자를 생성하는 함수
export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
}
