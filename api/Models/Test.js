import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  question: { type: String, required: true, trim: true },
  options: [
    {
      text: String,
      isAnswer: Boolean,
    },
  ],
});

const testSchema = mongoose.Schema({
  test_name: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  question_amount: { type: Number, required: true },
  timer: { type: String, required: true, trim: true },
  questions: [questionSchema],
  createdAt: { type: Date, immutable: true, default: Date.now },
  updateddAt: { type: Date, default: Date.now },
});

const Test = new mongoose.model("Test", testSchema);
export default Test;
