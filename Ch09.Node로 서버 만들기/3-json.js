const http = require("http");

const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JS" },
  { name: "Node" },
  { name: "Frontend" },
];

const server = http.createServer((req, res) => {
  const url = req.url; // what?, 클라이언트가 어떤 리소스를 원하는지
  const method = req.method; // how?, action?

  if (url === "/courses") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(courses)); // 메모리에 저장하고 있는 courses라는 데이터를 JSON 형태로 보내준다
    } else if (method === "POST") {
      const body = [];

      // data 이벤트 발생하면 받은 덩어라 chunk 자체를 body에 넣어준다
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });

      // 모든 데이터가 다 받아지는 end 이벤트가 발생하면
      req.on("end", () => {
        const bodyStr = Buffer.concat(body).toString(); // 버퍼 방식을 사용
        const course = JSON.parse(bodyStr);
        courses.push(course); // 기존의 courses에 추가

        console.log(course);

        res.writeHead(201);
        res.end();
      });
    }
  }
});

server.listen(8080);
