import MongoDb from "mongodb";
import { getTweets } from "../database/database.js";
import * as UserRepository from "./auth.js";
const ObjectID = MongoDb.ObjectID;

//NOSQL 정보의 중복성 > 관계: 쿼리의 성능을 위해서

/**
 * NOSQL
 * 프로필 저장하는 프로필 DB 만들 수 있고
 * 사용자 문서 저장하는 문서 DB 만들 수 있다
 * NOSQL을 사용하는 경우에는 각각의 DB가 독립적이기 때문에 서로 관계가 없다
 * 그래서 수평적으로 확장하기가 쉽다
 * 그래서 여러개의 서버에 DB를 저장하기 용이하다
 * 관계형 조인 쿼리의 성능이 좋지 않다
 *
 * NOSQL에 특정한 컬렉션에 한해서 관계가 필요하다면
 * 정보의 중복성을 오히려 선호한다
 * A라는 컬렉션이 B라는 컬렉션과 관련이 있다면
 * A 컬렉션에 필요한 B의 정보를 저장하는 것
 * 중복을 가지는 것이 관계를 갖는 것 보다 성능적으로 더 좋기 때문
 *
 *
 * SQL: 관계형
 * 조인 쿼리의 성능이 좋기 때문
 */
export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets); // _id -> id
}

export async function getAllByUsername(username) {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets); // _id -> id
}

export async function getById(id) {
  console.log(id);
  return getTweets()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  return UserRepository.findById(userId)
    .then((user) =>
      getTweets().insertOne({
        text,
        createdAt: new Date(),
        userId,
        name: user.name,
        username: user.username,
        url: user.url,
      })
    )
    .then((result) => result.ops[0])
    .then(mapOptionalTweet);
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { text } },
      { returnOriginal: false }
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectID(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
