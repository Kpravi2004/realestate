const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const property = require("./property");
const predict = require("./predict");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/property", property);
app.use("/ml", predict);

app.listen(5000, () => console.log("Server running"));
