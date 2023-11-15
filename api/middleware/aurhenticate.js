export const authentication = (req, res, next) => {
  const authHeader = req.headers["authoriation"];
  const token = authHeader && authHeader.split("")[1];
  if (token == null) return res.status(403);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ isValid: false });
    req.user = user;
    next();
  });
};
