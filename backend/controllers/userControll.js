const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');

exports.userRegistration = async (req, res) => {   //exports used to export the userRegister or any functions. it is a module.
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "pls fill the all fields properly",
            })
        }

        const profilePhoto = req.file ? req.file.path : null;
        const userdata = {
            fullName,
            email,
            password,
            profilePhoto
        }

        const user = await User.create(userdata);
        res.status(201).json({
            success: true,
            message: "User registration success",
            user
        });

    } catch (error) {
        fs.promises.unlink(req?.file?.path ?? '').catch((err) => console.log("file delete has a problem ...", err));
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "pls enter email and password",
            });
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "email not found",
            });

        };
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credemtioal",
            });
        };

        const options = {
            userId: user._id,
            role: user.role
        };
        const tocken = jwt.sign(options, process.env.JWT_SECRET_KEY, { expiresIn: "30min" });

        // user.password = undefined; // one method to hide the password
        const userObject = user.toObject();
        delete userObject.password;

        res.status(200).cookie('tocken', tocken, {
            maxAge: 24 * 60 * 60 * 1000,
        }).json({
            success: true,
            message: "user loggedin succesfully",
            user: userObject
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

exports.getAllusers = async (req, res) => {
    try {
        const Users = await User.find();
        if (!Users) {
            return res.status(404).json({
                success: false,
                message: "users not found",
            });
        }
        res.status(200).json({
            success: true,
            Users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}
exports.updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "users not found",
            });
        }
        user.status = !user.status;
        const updatedUser = user.save();
        res.status(200).json({
            success: true,
            message: "users status updated",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
exports.logoutUser = async (req, res) => {
    try {
        res.status(200).clearCookie('tocken').json({
            success: true,
            message: "user logged out succesfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}
exports.updatedProfile = async (req, res) => {
    try {
        const { userId } = req;
        const { email, fullName } = req.body;
        const { profilePhoto } = req?.file?.path ?? null;
        if (!email || !fullName) {
            if (profilePhoto) {
                fs.promises.unlink(profilePhoto).catch((err) => console.log("error while deleting"))
            }
            return res.status(400).json({
                success: false,
                message: "pls fill all the fields"
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            if (profilePhoto) {
                fs.promises.unlink(profilePhoto).catch((err) => console.log("error while deleting"))
            }
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        user.email = email;
        user.fullName = fullName;
        if (profilePhoto) {
            const oldProfilePic = user.profilePhoto;
            user.profilePhoto = profilePhoto;
            fs.promises.unlink(profilePhoto).catch((err) => console.log("error while deleting"))
        }
        const updatedUser = await user.save();
        const updatedUserobject = updatedUser.toObject();
        delete updatedUserobject.password;
        res.status(200).json({
            success: true,
            message: "profile updated successfuly",
            user: updatedUserobject
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}





