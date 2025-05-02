"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = _interopRequireDefault(require("../controller/authController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authRoute = _express["default"].Router();
authRoute.post("/login", _authController["default"].login);
authRoute.post("/register", _authController["default"].register);
authRoute.get("/get_user", _authController["default"].getUer);
var _default = exports["default"] = authRoute;