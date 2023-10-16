import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: [true, "Name is required"], trim: true },
  password: { type: String, required: [true, "Password is required"] },
  mobile: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
