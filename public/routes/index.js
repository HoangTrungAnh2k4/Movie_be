"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _userRoute = _interopRequireDefault(require("./userRoute.js"));
var _authRoute = _interopRequireDefault(require("./authRoute.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// const adminRoutes = require("./adminRoute");

// const auth = require("../middleware/auth");

var routes = function routes(app) {
  app.use("/user/api", _userRoute["default"]);
  app.use("/auth/api", _authRoute["default"]);
};
var _default = exports["default"] = routes;