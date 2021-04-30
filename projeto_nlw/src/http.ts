import express from "express";
import{ createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";
import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
});

const http = createServer(app); // Criando protocolo HTTP
const io = new Server(http); // Criando protocolo WD

app.use(express.json());

io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id);
});

app.use(routes);
// app.get("/", (request, response) => {
//     // return response.send("Olá NLW5")
//     return response.json({
//         message: "Olá NLW 05!",
//     });
// });

// app.post("/users", (request, response) => {
//     return response.json({ message: "Usuário salvo com sucesso!" });

// });

export{ http, io };
