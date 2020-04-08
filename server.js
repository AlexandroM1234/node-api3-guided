const express = require("express"); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

server.use(helmet());
server.use(morgan("dev"));
// server.use(verify);
server.use(express.json());

server.use("/api/hubs", verify("mom"), hubsRouter);
server.get("/", verify("wow"), (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

// middleware
// write and use a middleware that:
/// -reads a "pass" key from req.query
// if the pass === "mellon" , let the request continue
// else respond with HTTP status code 400 and any message

function verify(password) {
  return function (req, res, next) {
    const { pass } = req.query;
    if (pass === password) {
      next();
    } else {
      res.status(400).json({ message: "thats the wrong password fool" });
    }
  };
}
