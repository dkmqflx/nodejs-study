import express from "express";

const app = express();

app.use(express.json());

// app1.js를 이런식으로 route를 처리할 수 있다.
// route에 처리하고 싶은 것들을 등록해준다
app
  .route("/posts")
  .get((req, res) => {
    res.status(201).send("GET: /posts");
  })
  .post((req, res) => {
    res.status(201).send("POST: /posts");
  });

app
  .route("/posts/:id")
  .put((req, res) => {
    res.status(201).send("PUT: /posts/:id");
  })
  .delete((req, res) => {
    res.status(201).send("DELETE: /posts/:id");
  });

app.listen(8080);
