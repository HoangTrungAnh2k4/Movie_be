import { hashSync, compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { GET_DB } from "../config/db.js";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const authService = {
  register: async (data) => {
    try {
      const usersCollection = GET_DB().collection("users");

      const { name, email, password } = data;

      const existingUser = await usersCollection.findOne({
        email: email,
      });

      if (existingUser) {
        return {
          status: 409,
          message: "Email này đã được đăng ký. Vui lòng dùng email khác.",
        };
      }

      const hashedPassword = hashSync(password, 10);
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };
      const result = await usersCollection.insertOne(newUser);

      return {
        status: 201,
        message: "Đăng ký thành công",
      };
    } catch (error) {
      console.error("Database query error:", error);
      if (error.code === "ER_DUP_ENTRY") {
        return {
          status: 409,
          message: "Số điện thoại này đã được đăng ký. Vui lòng dùng số khác.",
        };
      }

      return { status: 500, message: "Internal Server Error" };
    }
  },

  login: async (email, password) => {
    try {
      const usersCollection = GET_DB().collection("users");

      const user = await usersCollection.findOne({ email });

      if (!user) {
        return {
          status: 401,
          message: "Email hoặc mật khẩu không đúng.",
        };
      }

      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) {
        return {
          status: 401,
          message: "Email hoặc mật khẩu không đúng.",
        };
      }

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      return {
        status: 200,
        data: {
          access_token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        },
      };
    } catch (error) {
      console.error("Database query error:", error);

      return { status: 500, message: "Internal Server Error" };
    }
  },

  getUser: async (req, res) => {
    let userInfor = null;

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      try {
        // veryfy token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        userInfor = decode;
      } catch (error) {
        console.log(error);

        return res
          .status(401)
          .json({ message: "Access_token is expired or invalid" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    try {
      const usersCollection = GET_DB().collection("users");

      const user = await usersCollection.findOne({ email: userInfor.email });

      if (!user) {
        return {
          status: 404,
          message: "Người dùng không tồn tại.",
        };
      }

      return {
        status: 200,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      console.error("Database query error:", error);

      return { status: 500, message: "Internal Server Error" };
    }
  },
};

export default authService;
