"use strict";

const app = require("./app");
const { PORT } = require('./config');

app.listen(PORT, function () {
  console.log(`started on ${PORT}`);
});






