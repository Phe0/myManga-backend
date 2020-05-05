require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const databaseConnect = require("./src/config/database");
const setRoutes = require("./src/routes/BaseRoutes");
const http = require("http");

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(bodyParser.json());

databaseConnect();
setRoutes(app);

server.listen(8000);
