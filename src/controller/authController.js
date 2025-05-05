import authService from "../service/authService.js";

const authControllers = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const result = await authService.register({
        name,
        email,
        password,
      });
      res
        .status(result.status)
        .json(result.message ? { message: result.message } : result.data);
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const result = await authService.login(email, password);
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

export default authControllers;
