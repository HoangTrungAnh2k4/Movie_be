import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";

import auth from "../middleware/auth.js";

const routes = (app) => {
  app.use("/user/api", auth, userRoute);
  app.use("/auth/api", authRoute);
};

export default routes;
