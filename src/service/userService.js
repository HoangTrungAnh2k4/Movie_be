import { GET_DB } from "../config/db.js";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const userService = {
  getUser: async (email) => {
    try {
      const usersCollection = GET_DB().collection("users");

      const user = await usersCollection.findOne({ email: email });

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
          favorite: user.favorite,
        },
      };
    } catch (error) {
      console.error("Database query error:", error);

      return { status: 500, message: "Internal Server Error" };
    }
  },

  addFavorite: async (email, favorite) => {
    try {
      const usersCollection = GET_DB().collection("users");

      const user = await usersCollection.findOne({ email: email });

      if (!user) {
        return {
          status: 404,
          message: "Người dùng không tồn tại.",
        };
      }

      const updatedUser = await usersCollection.updateOne(
        { email: email },
        { $addToSet: { favorite: favorite } }
      );

      if (updatedUser.modifiedCount === 0) {
        return {
          status: 400,
          message: "Không thể thêm vào danh sách yêu thích.",
        };
      }

      return {
        status: 200,
        message: "Thêm vào danh sách yêu thích thành công.",
      };
    } catch (error) {
      console.error("Database query error:", error);

      return { status: 500, message: "Internal Server Error" };
    }
  },

  deleteFavorite: async (email, favorite) => {
    try {
      const usersCollection = GET_DB().collection("users");

      const user = await usersCollection.findOne({ email: email });

      if (!user) {
        return {
          status: 404,
          message: "Người dùng không tồn tại.",
        };
      }

      const updatedUser = await usersCollection.updateOne(
        { email: email },
        { $pull: { favorite: favorite } }
      );

      if (updatedUser.modifiedCount === 0) {
        return {
          status: 400,
          message: "Không thể xóa khỏi danh sách yêu thích.",
        };
      }

      return {
        status: 200,
        message: "Xóa khỏi danh sách yêu thích thành công.",
      };
    } catch (error) {
      console.error("Database query error:", error);

      return { status: 500, message: "Internal Server Error" };
    }
  },

  addComment: async (movieName, userName, comment) => {
    try {
      const moviesCollection = GET_DB().collection("movies");

      const updateResult = await moviesCollection.updateOne(
        { name: movieName },
        {
          $push: {
            listComment: {
              $each: [
                {
                  user_name: userName,
                  comment: comment,
                },
              ],
              $position: 0,
            },
          },
        },
        { upsert: true }
      );

      return {
        status: 200,
        message: "Đã thêm bình luận thành công.",
      };
    } catch (error) {
      console.error("Database query error:", error);

      return { status: 500, message: "Internal Server Error" };
    }
  },
};

export default userService;
