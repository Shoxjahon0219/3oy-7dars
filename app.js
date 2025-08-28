const express = require("express");
const config = require("config");
const router = require("./routes/index.route");

const app = express();
const PORT = config.get("port");

app.use(express.json());

app.use("/api", router)

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server started at: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
