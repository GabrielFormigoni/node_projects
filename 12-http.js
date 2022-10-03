const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("Welcome to the Homepage!!");
  } else if (req.url == "/about") {
    res.end("About WebPage!!");
  } else {
    res.end(`
    <h1>Erro</h1>
    <p>Página não encontrada</p>
    <a href="/">Clique aqui pra voltar a Home</a>
  `);
  }
});

server.listen(3000);
