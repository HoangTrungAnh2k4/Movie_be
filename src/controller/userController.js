const userController = {
  test: (req, res) => {
    res.status(200).json({
      status: "success",
      message: "User controller is working",
    });
  },
};

export default userController;
