import { verify } from "jsonwebtoken";
import "dotenv";

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      // veryfy token
      const decode = verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = {
        userInfor: decode,
      };

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
