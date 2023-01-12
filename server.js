require("dotenv").config();

const http = require("http");
const app = require("./app");

// Renvoie un port valide
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// le PORT d'utilisation
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Cherche les erreurs et les gère de manière appropriée, le serveur la renvoie
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// crée un serveur http
const server = http.createServer(app);

// écoute le port sur lequel s'éxécute le serveur
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// écoute les requêtes sur le port
server.listen(port);

// Dotenv, stocker données secret !
