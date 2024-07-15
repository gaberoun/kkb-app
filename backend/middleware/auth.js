import jwt from "jsonwebtoken";

export const createAccessToken = (user) => {
  const data = { userId: user._id };
  return jwt.sign(data, process.env.JWT_SECRET, { "expiresIn": "1h" });
}

export const requireAuth = (request, response, next) => {
  try {
    if (request.headers.authorization === undefined) {
      return response.status(401).send({ message: "Access token missing" });
    }

    const token = request.headers.authorization.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    request.body.userId = userId;

    next();

  } catch (error) {
    console.log(error.message);
    response.status(403).send({ error: error.message });
  }
}
