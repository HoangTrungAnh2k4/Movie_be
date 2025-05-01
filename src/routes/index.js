import userRoute from "./userRoute.js";
// const authRoutes = require("./authRoute");
// const adminRoutes = require("./adminRoute");

// const auth = require("../middleware/auth");

const routes = (app) => {
  app.use("/user/api", userRoute);
  //   app.use("/auth/api", authRoutes);
  //   app.use("/admin/api", auth, adminRoutes);
};

export default routes;
