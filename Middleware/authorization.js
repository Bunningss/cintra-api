const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err)
        return res
          .status(400)
          .json({ msg: "An error occured. Please try again." });
      else {
        req.user = user;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ msg: "You are not authorized to perform this action." });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.Id === req.params.id || req.user.Role === "Admin") {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "You are not authorized to perform this action." });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.Role === "Admin") {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "You are not authorized to perform this action." });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
