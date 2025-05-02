import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
// const adminRoutes = require("./adminRoute");

// const auth = require("../middleware/auth");

const routes = (app) => {
  app.use("/user/api", userRoute);
  app.use("/auth/api", authRoute);
};

export default routes;
