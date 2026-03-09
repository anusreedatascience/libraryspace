import jwt from "jsonwebtoken";
import BlackList from "../models/blackListerToken.js";

export const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let findBlock = await BlackList.findOne({ token: token });
  if (findBlock) {
    return res.status(200).send({ msg: "You are already logout" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ msg: "You're not authenticated person", Error: err.message });
    }

    console.log(decoded);
    req.user = decoded;
    next();
  });
};
