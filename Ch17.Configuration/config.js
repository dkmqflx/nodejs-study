import dotenv from "dotenv"; // 환경변수 관리 라이브러리
dotenv.config();

// 환경변수가 없을 경우 기본값 설정
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
    // 숫자로 관리해야 하는 값들은 parseInt 함수를 사용해서 숫자로 변환
  },
};
