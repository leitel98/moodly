import { NextApiRequest, NextApiResponse } from "next";
import { connectToMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { hash } from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToMongoDB();

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(400).json({ error: "Data is missing" });
      }

      const { fullName, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({ error: "User Already Exists" });
      } else {
        if (typeof password !== "string" || password.length < 6) {
          return res.status(409).json({
            error: "Password should be a string of 6 characters or more",
          });
        }

        const hashedPassword = await hash(password, 12);

        const newUser = new User({
          fullName,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const { _id } = savedUser;
        const uid = _id.toString();

        return res.status(201).json({
          success: true,
          user: savedUser,
        });
      }
    } else if (req.method === "DELETE") {
      try {
        // extract email from query string
        const { email } = req.query;
        if (!email || Array.isArray(email)) {
          return res.status(400).json({ error: "Invalid email" });
        }

        // Delete user from MongoDB
        await User.deleteOne({ email });

        return res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Failed to delete user" });
      }
    }
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
