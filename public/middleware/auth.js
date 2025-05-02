"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = require("jsonwebtoken");
require("dotenv");
var auth = function auth(req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(" ")[1];
    try {
      // veryfy token
      var decode = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = {
        userInfor: decode
      };
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Access_token is expired or invalid"
      });
    }
  } else {
    return res.status(401).json({
      message: "Authorization header is missing"
    });
  }
};
var _default = exports["default"] = auth;