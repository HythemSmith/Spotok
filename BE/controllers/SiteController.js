const UserSchema = require('../database/models/UserSchema')
const bcrypt = require('bcrypt')
class SiteController {
    // [GET] /home/signup
    getSignUp(req, res) {
        res.json({key: '9'})
    }
    
    // // [POST] /home/signup
    // postSignUp = async (req, res) => {
    //     const { username, email, password, gender, dateOfBirth } = req.body;
    //     console.log(req.body)
    //     try {
    //         const checkEmail = await UserSchema.findOne({ email: email });
    
    //         if (!checkEmail) {
    //             await UserSchema.create({
    //                 userName: username,
    //                 email: email,
    //                 password: password,
    //                 gender: gender,
    //                 dateOfBirth: dateOfBirth
    //             });
    //             res.json({ message: "Sign up successfully" });
    //         } else {
    //             res.json({ message: "Already exists" });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: "Server error" });
    //     }
    // };
    // [POST] /home/signup
    postSignUp = async (req, res) => {
        let { name, email, password,  dateOfBirth } = req.body|| {};
        name = name ? name.trim() : '';
        email = email ? email.trim() : '';
        password = password ? password.trim() : '';
        dateOfBirth = dateOfBirth ? dateOfBirth.trim() : '';
        if(name == ""||email ==""|| password ==""|| dateOfBirth== ""){
            res.json({
                status: "FAILED",
                message: "Empty input fields"
            });
        } else if (!/^[a-zA-Z]*$/.test(name)){
            res.json({
                status: "FAILED",
                message: "Invalid name entered"
            })
        } else if (!/^[\w-\.]*@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            res.json({
                status: "FAILED",
                message: "Invalid email entered"
            })
        } else if (! new Date(dateOfBirth).getTime()){
            res.json({
                status: "FAILED",
                message: "Invalid date of birth entered"
            })
        } else if (password.length <0){
            res.json({
                status: "FAILED",
                message: "Password is too short"
            })
        } else{
            UserSchema.find({email}).then(result =>{
                if(result.length){
                    res.json({
                        status: "FAILED",
                        message: "User with the provided email already exist"
                    })
                }else{
                    
    
                    const saltRound = 10;
                    bcrypt.hash(password, saltRound).then(hashedPassword =>{
                        const newUser = new UserSchema({
                            userName: name,
                            email: email,
                            password: hashedPassword,
                            dateOfBirth: dateOfBirth
                        });
    
                        newUser.save().then(result => {
                            res.json({
                                status: "SUCCESS",
                                message: "Signup successful",
                                date: result,
                            })
                        })
                        .catch(err => {
                            console.error("Error saving account:", err);
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while saving account!"
                            })
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while hashing password!"
                        })
                    })
                }
            }).catch(err =>{
                console.log(err);
                res.json({
                    status: "FAILED",
                message: "An error occurred while checking for existing user"
                })
            })
        }
    };
    // [POST] /home/login
    postLogin = async (req, res) => {
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
    // [GET] /home
    getHome(req, res){
        res.send('Hello world!')
    }
}

module.exports = new SiteController