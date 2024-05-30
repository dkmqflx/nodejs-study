import express from "express";

const app = express();

// express에서 body에 대한 내용을 읽기 위해서는 미들웨어를 사용해야 한다
// 모든 request에 body에 대해 parsing 해서 보여준다
app.use(express.json());

app.post("/posts", (req, res) => {
  console.log(req.body);
  res.status(201).send("Thanks, Created");
});

app.put("/posts/:id", (req, res) => {
  console.log(req.body);
  res.status(200).send("Thanks, Updated!");
});

app.listen(8080);
