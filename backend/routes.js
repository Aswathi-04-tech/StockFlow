const express = require('express');

const router = express.Router();
const authController = require('./controllers/authControllers');
const userController = require('./controllers/userController');
const protect=require('./middleware/authMiddleware');
const accessControl=require('./middleware/roleMiddleware');

// register route for user registration

router.post("/register", authController.registerUser);
// login route for user login

router.post("/login", authController.loginUser);

router.get("/profile",protect,authController.getProfile);

// Create employee route (accessible only by admin)
router.post("/employees",protect, accessControl("admin"),userController.CreateEmployee);

module.exports = router;


