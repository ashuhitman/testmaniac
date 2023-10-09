import { Router } from "express";
import User from "../Models/user.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("route for user authentication");
});

router.get("/token", (req, res) => {
  res.status(200).send("route for user authentication");
});

router.post("/signup", async (req, res) => {
  console.log(req.body);

  try {
    // check if email id already exists
    const exisitingUser = await User.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(409)
        .send({ error: "Signup failed! User already exists" });
    }
    // creae user model
    const user = User(req.body);
    // save user data in DB
    const result = await user.save();
    if (result) {
      // if saved successfully
      res.status(201).send({ success: "User created successfully" });
    } else {
      // if failed to save
      res.status(409).send({ error: "Couldn't create user" });
    }
  } catch (error) {
    res.status(409).send({ error: error.message });
  }
});
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    // distructure email and password
    const { email, password } = req.body;
    // encode password
    // check if user exists
    const user = User.findOne({ email, password });

    if (user) {
      // if user exists
      // generate token and refresh token
      return res.status(200).send({ success: "logged in successfully" });
    } else {
      // if user not exists
      return res.status(404).send({ error: "User does not exist" });
    }
  } catch (error) {
    res.status(409).send({ error: error.message });
  }
});
// router.delete("/token", async (req, res) => {});

export default router;
