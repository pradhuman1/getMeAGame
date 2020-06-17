"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

const directory = _path.default.join(__dirname, ".././");

app.use(_express.default.static(directory));
app.get('/', (req, res) => {
  res.sendFile(directory + "/chatBot.html");
});
app.listen(8080, () => {
  console.log("On port 8080");
});