const UserSchema = require('../database/models/UserSchema')
class SiteController {

    // [POST] home/signup
    getSignUp(req, res) {
        res.json({key: '9'})
    }

    postSignUp = async (req, res) => {
        const { userName, email, password, gender, dateOfBirth } = req.body;
        try {
            const checkEmail = await UserSchema.findOne({ email: email });
    
            if (!checkEmail) {
                const newUser = new UserSchema({
                    userName: userName,
                    email: email,
                    password: password,
                    gender: gender,
                    dateOfBirth: dateOfBirth
                });
                console.log(newUser)
                await newUser.save();
                res.json({ message: "Sign up successfully" });
            } else {
                res.json({ message: "Already exists" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    };
    
    home(req, res){
        res.json({key: '9'})
    }
}

module.exports = new SiteController