import Test from "../Models/Test";

export const createTest = async (req, res) => {
  try {
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
