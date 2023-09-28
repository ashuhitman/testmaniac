import { Router } from "express";
const router = Router();

import Test from "../Models/Test.js";

// fetch all tests
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find({});
    res.send(tests);
  } catch (error) {
    res.send({ error: error.message });
  }
});
// fetch a test by id
router.get("/:id", async (req, res) => {
  try {
    const tests = await Test.findOne({ _id: req.params.id });
    res.send(tests);
  } catch (error) {
    res.send({ error: error.message });
  }
});
// add test
router.post("/create", async (req, res) => {
  try {
    const test = Test(req.body);
    const result = await test.save();
    res.status(200).send({ success: "added succesfully", data: result });
  } catch (error) {
    res.send({ error: error.message });
  }
});

// delete test
router.delete("/:id", async (req, res) => {
  try {
    const result = await Test.findByIdAndDelete(req.params["id"]);
    if (result === null) return res.send({ error: "Id not found" });

    return res.send({ success: "deleted succesfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

// update test
router.put("/:id", async (req, res) => {
  try {
    const result = await Test.findByIdAndUpdate(req.params["id"], req.body);
    if (result === null) {
      return res.send({ error: "Id not found" });
    }
    return res.send({ success: "Updated successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

export default router;
