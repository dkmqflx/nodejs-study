import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define("tweet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Tweet.belongsTo(User); // Tweet 테이블과 User 테이블을 조인

const INCLUDE_USER = {
  attributes: [
    "id",
    "text",
    "createdAt",
    "userId",
    [Sequelize.col("user.name"), "name"], // user 테이블의 name 컬럼을 name으로 별칭 붙이기
    [Sequelize.col("user.username"), "username"], // user 테이블의 username 컬럼을 username으로 별칭 붙이기
    [Sequelize.col("user.url"), "url"], // user 테이블의 url 컬럼을 url으로 별칭 붙이기
  ],
  include: {
    model: User, // User 테이블을 조인
    attributes: [],
  },
};

const ORDER_DESC = {
  // createdAt 컬럼을 내림차순으로 정렬
  order: [["createdAt", "DESC"]],
};

// 모든 트윗을 조회하는 함수, INCLUDE_USER와 ORDER_DESC를 합쳐서 조회
export async function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include, // 기존의 INCLUDE_USER.include를 사용하면서
      where: { username }, // 아래 조건을 추가
    },
  });
}

export async function getById(id) {
  return Tweet.findOne({
    where: { id }, // id 컬럼이 id와 일치하는 트윗을 조회
    ...INCLUDE_USER,
  });
}

export async function create(text, userId) {
  // text와 userId를 사용하여 트윗을 생성
  return Tweet.create({ text, userId }) //
    .then((data) => this.getById(data.dataValues.id));
}

export async function update(id, text) {
  // id와 text를 사용하여 트윗을 업데이트
  return Tweet.findByPk(id, INCLUDE_USER) //
    .then((tweet) => {
      tweet.text = text;
      return tweet.save();
    });
}

export async function remove(id) {
  // id를 사용하여 트윗을 삭제
  return Tweet.findByPk(id) //
    .then((tweet) => {
      tweet.destroy();
    });
}
