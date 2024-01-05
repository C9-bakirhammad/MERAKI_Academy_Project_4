// middleware to check if two passwords matched at register
const confirmPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  console.log(password, confirmPassword);
  if (password === confirmPassword) {
    next();
  } else {
    res.status(409).json({
      success: false,
      message: "Passwords not match",
    });
  }
};

module.exports = { confirmPassword };
