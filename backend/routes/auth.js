const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const Employee = require("../models/Employee");

const router = express.Router();


// ============================================================
// GOOGLE AUTHENTICATION
// ============================================================

const googleClientId =
    process.env.GOOGLE_CLIENT_ID;

const googleClient =
    new OAuth2Client(googleClientId);


// ============================================================
// CREATE JWT
// ============================================================

function createToken(user) {

    return jwt.sign(
        {
            id: user._id,
            employeeId: user.employeeId,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );
}


// ============================================================
// FORMAT USER RESPONSE
// ============================================================

function formatUser(user) {

    return {
        id: user._id,
        employeeId: user.employeeId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        department: user.department,
        active: user.active
    };
}


// ============================================================
// NORMAL LOGIN
// ============================================================

router.post(
    "/login",
    async (req, res) => {

        try {

            const {
                employeeId,
                password
            } = req.body;


            if (
                !employeeId ||
                !password
            ) {

                return res.status(400).json({

                    message:
                        "Employee ID and password are required."

                });

            }


            const user =
                await Employee.findOne({
                    employeeId:
                        employeeId.trim()
                });


            if (!user) {

                return res.status(401).json({

                    message:
                        "Invalid Employee ID or password."

                });

            }


            if (!user.active) {

                return res.status(403).json({

                    message:
                        "Your account has been disabled."

                });

            }


            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordMatch) {

                return res.status(401).json({

                    message:
                        "Invalid Employee ID or password."

                });

            }


            const token =
                createToken(user);


            res.json({

                message:
                    "Login successful.",

                token: token,

                user:
                    formatUser(user)

            });

        }

        catch (error) {

            console.error(
                "Login Error:",
                error
            );

            res.status(500).json({

                message:
                    "Server error during login."

            });

        }

    }
);


// ============================================================
// REGISTER
// ============================================================

router.post(
    "/register",
    async (req, res) => {

        try {

            const {
                employeeId,
                name,
                email,
                phone,
                password,
                role,
                department
            } = req.body;


            if (
                !employeeId ||
                !name ||
                !password
            ) {

                return res.status(400).json({

                    message:
                        "Employee ID, name and password are required."

                });

            }


            if (password.length < 4) {

                return res.status(400).json({

                    message:
                        "Password must contain at least 4 characters."

                });

            }


            const existingEmployee =
                await Employee.findOne({
                    employeeId:
                        employeeId.trim()
                });


            if (existingEmployee) {

                return res.status(400).json({

                    message:
                        "Employee ID already exists."

                });

            }


            // Check email only when one is provided
            if (email && email.trim()) {

                const existingEmail =
                    await Employee.findOne({
                        email:
                            email.trim().toLowerCase()
                    });


                if (existingEmail) {

                    return res.status(400).json({

                        message:
                            "This email is already registered."

                    });

                }

            }


            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );


            const employee =
                new Employee({

                    employeeId:
                        employeeId.trim(),

                    name:
                        name.trim(),

                    email:
                        email
                            ? email.trim().toLowerCase()
                            : "",

                    phone:
                        phone
                            ? phone.trim()
                            : "",

                    password:
                        hashedPassword,

                    role:
                        role === "admin"
                            ? "admin"
                            : "employee",

                    department:
                        department ||
                        "Field Service",

                    active:
                        true

                });


            await employee.save();


            res.status(201).json({

                message:
                    "Account created successfully.",

                user: {

                    employeeId:
                        employee.employeeId,

                    name:
                        employee.name,

                    email:
                        employee.email,

                    role:
                        employee.role,

                    department:
                        employee.department

                }

            });

        }

        catch (error) {

            console.error(
                "Registration Error:",
                error
            );

            res.status(500).json({

                message:
                    "Server error during registration."

            });

        }

    }
);


// ============================================================
// GOOGLE LOGIN
// ============================================================

router.post(
    "/google",
    async (req, res) => {

        try {

            const {
                credential
            } = req.body;


            if (!credential) {

                return res.status(400).json({

                    message:
                        "Google credential is required."

                });

            }


            if (!googleClientId) {

                console.error(
                    "GOOGLE_CLIENT_ID is missing from .env"
                );

                return res.status(500).json({

                    message:
                        "Google Sign-In is not configured on the server."

                });

            }


            // ------------------------------------------------
            // VERIFY GOOGLE ID TOKEN
            // ------------------------------------------------

            const ticket =
                await googleClient.verifyIdToken({

                    idToken:
                        credential,

                    audience:
                        googleClientId

                });


            const payload =
                ticket.getPayload();


            if (!payload) {

                return res.status(401).json({

                    message:
                        "Invalid Google account information."

                });

            }


            const googleEmail =
                payload.email
                    ? payload.email
                        .trim()
                        .toLowerCase()
                    : "";


            const emailVerified =
                payload.email_verified;


            if (
                !googleEmail ||
                !emailVerified
            ) {

                return res.status(401).json({

                    message:
                        "Your Google email could not be verified."

                });

            }


            console.log(
                "Google Sign-In email:",
                googleEmail
            );


            // ------------------------------------------------
            // FIND EMPLOYEE USING GOOGLE EMAIL
            // ------------------------------------------------

            const user =
                await Employee.findOne({

                    email:
                        googleEmail

                });


            if (!user) {

                return res.status(403).json({

                    message:
                        "This Google account is not registered with Chintamani Enterprises. Please contact the administrator."

                });

            }


            // ------------------------------------------------
            // CHECK ACCOUNT STATUS
            // ------------------------------------------------

            if (!user.active) {

                return res.status(403).json({

                    message:
                        "Your Chintamani Enterprises account has been disabled."

                });

            }


            // ------------------------------------------------
            // CREATE CHINTAMANI JWT
            // ------------------------------------------------

            const token =
                createToken(user);


            // ------------------------------------------------
            // SUCCESS
            // ------------------------------------------------

            res.json({

                message:
                    "Google Sign-In successful.",

                token:
                    token,

                user:
                    formatUser(user)

            });

        }

        catch (error) {

            console.error(
                "Google Login Error:",
                error
            );


            res.status(401).json({

                message:
                    "Google Sign-In failed. Please try again."

            });

        }

    }
);


// ============================================================
// EXPORT ROUTER
// ============================================================

module.exports = router;