const UserSchema = require('../database/models/UserSchema')
class SiteController {
    // [GET] /home/signup
    getSignUp(req, res) {
        res.json({key: '9'})
    }
    
    // [POST] /home/signup
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
    // [POST] /home/login
    postSignIn = async (req, res) => {
        let { email, password } = req.body || {};
        console.log(req.body)
        email = email ? email.trim() : '';
        password = password ? password.trim() : '';

        if(email==""||password==""){
            res.json({
                status: "FAILED",
                message:"Empty credentials supplied"
            })
        }else {
            UserSchema.find({email})
                .then(data => {
                    if(data.length){
                        const hashedPassword = data[0].password;
                        bcrypt.compare(password,hashedPassword).then(result =>{
                            if(result){

                                res.json({
                                    status: "SUCCESS",
                                    message: "SignIn successful",
                                    data: data
                                })
                            } else{
                                res.json({
                                    status: "FAILED",
                                    message: "Invalid password entered"
                                })
                            }
                        })
                        .catch(err => {
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while comparing passwords"
                            })
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message:"Invalid credentials supplied"
                        })
                    }
                })
                .catch(err =>{
                    res.json({
                        status: "FAILED",
                        message:"An error occurred while checking for existing user"
                    })
                })
            }
    };
    // [GET] home
    getHome(req, res){
        res.send('Hello world!')
    }
}

module.exports = new SiteController