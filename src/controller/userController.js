import userService from "../service/userService.js";

const userController = {
  test: (req, res) => {
    res.status(200).json({
      status: "success",
      message: "User controller is working",
    });
  },

  getUer: async (req, res) => {
    try {
      const email = req.user.email;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const result = await userService.getUser(email);
      res
        .status(result.status)
        .json(result.message ? { message: result.message } : result.data);
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Internal Server Error" });
    }
  },

  addFavorite: async (req, res) => {
    try {
      const email = req.user.email;
      const { favorite } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      if (!favorite) {
        return res.status(400).json({ message: "Favorite is required" });
      }

      const result = await userService.addFavorite(email, favorite);
      res
        .status(result.status)
        .json(result.message ? { message: result.message } : result.data);
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Internal Server Error" });
    }
  },

  deleteFavorite: async (req, res) => {
    try {
      const email = req.user.email;
      const { favorite } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      if (!favorite) {
        return res.status(400).json({ message: "Favorite is required" });
      }

      const result = await userService.deleteFavorite(email, favorite);
      res
        .status(result.status)
        .json(result.message ? { message: result.message } : result.data);
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Internal Server Error" });
    }
  },

  addComment: async (req, res) => {
    try {
      const userName = req.user.name;
      const { comment, movieName } = req.body;

      if (!comment) {
        res.status(400).json({ message: "Comment is require" });
      }

      const result = await userService.addComment(movieName, userName, comment);

      res
        .status(result.status)
        .json(result.message ? { message: result.message } : result.data);
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Internal Server Error" });
    }
  },
};

export default userController;
