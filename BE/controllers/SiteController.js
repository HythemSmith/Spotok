const UserSchema = require('../database/models/UserSchema')
class SiteController {

    // [POST] home/signup
    getSignUp(req, res) {
        res.json({key: '9'})
    }

    postSignUp = async (req, res) => {
        const { username, email, password, gender, dateOfBirth } = req.body;
        console.log(req.body)
        try {
            const checkEmail = await UserSchema.findOne({ email: email });
    
            if (!checkEmail) {
                await UserSchema.create({
                    userName: username,
                    email: email,
                    password: password,
                    gender: gender,
                    dateOfBirth: dateOfBirth
                });
                res.json({ message: "Sign up successfully" });
            } else {
                res.json({ message: "Already exists" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    };
    
    getHome(req, res){
        res.json({key: '9'})
    }
}

module.exports = new SiteController