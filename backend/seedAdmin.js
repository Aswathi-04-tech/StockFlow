const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcryptjs");
const User = require("./models/UserModel");
const connectDB = require("./config/db");

const seedAdmin = async () => {
  try {
    // Check environment variables
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Admin credentials are missing in .env");
    }

    if (ADMIN_PASSWORD.length < 8) {
      throw new Error("Admin password must contain at least 8 characters");
    }

    // Connect to MongoDB
    await connectDB();

    // Check whether an admin already exists
    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      console.log("An Admin account already exists.");
      return;
    }

    // Hash admin password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Create Admin
    const admin = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase().trim(),
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully:", admin.email);

  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    // Close MongoDB connection
    const mongoose = require("mongoose");
    await mongoose.connection.close();
  }
};

seedAdmin();