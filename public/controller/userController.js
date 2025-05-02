"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var userController = {
  test: function test(req, res) {
    res.status(200).json({
      status: "success",
      message: "User controller is working"
    });
  }
};
var _default = exports["default"] = userController;