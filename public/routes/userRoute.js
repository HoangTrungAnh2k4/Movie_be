"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controller/userController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var userRoute = _express["default"].Router();
userRoute.get("/test", _userController["default"].test);
var _default = exports["default"] = userRoute;