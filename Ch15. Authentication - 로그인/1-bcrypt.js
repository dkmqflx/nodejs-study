const bcrypt = require("bcrypt");

const password = "abcd1234";
const hashed = bcrypt.hashSync(password, 10); // 동기적으로 처리하는 방법, 프로젝트에서는 비동기적인 프로미스를 사용하도록 해야한다
console.log(`password: ${password}, hashed: ${hashed}`);

const result = bcrypt.compareSync("abcd123", hashed);
console.log(result); // true
