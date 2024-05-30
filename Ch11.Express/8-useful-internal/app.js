import express from "express";

const app = express();

// express.json -> REST API, body parse
app.use(express.json());

// express.urlencoded -> body를 parse하는데 HTML form 에서 submit을 해서 전달된 데이터를 자동으로 파싱해준다
// 옵션을 전달해주어야 한다
app.use(express.urlencoded({ extended: false }));

// express.static
app.post("/posts", (req, res) => {
  console.log(req.body);
  res.status(201).send("Thanks, Created");
});

const options = {
  dotfiles: "ignore", // 숨겨진 파일은 보여주지 않는다
  etag: false,
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};

// public에 있는 모든 파일에 대해 접근이 가능하다
// localhost:8080/image.jpg
// localhost:8080/index.html
app.use(express.static("public", options));
app.listen(8080);
