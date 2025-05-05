import "dotenv";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  console.log("Auth middleware is working");

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      // veryfy token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = decode;

      next();
    } catch (error) {
      console.log(error);

      return res
        .status(401)
        .json({ message: "Access_token is expired or invalid" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
};

export default auth;
