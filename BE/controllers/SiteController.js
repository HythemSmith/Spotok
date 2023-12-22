const UserSchema = require('../database/models/UserSchema')
const MediaSchema = require('../database/models/MediaSchema')
const bcrypt = require('bcrypt')
const fs = require('fs').promises;
const path = require('path');

class SiteController {
    // [GET] /home/signup
    getSignUp(req, res) {
        res.json({key: '9'})
    }
    // [POST] /signup
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
        } else if (!/^[\sa-zA-Zàáảãạăắằẳẵặâấầẩẫậđèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳỵỷỹỵ0-9]*$/i.test(name)){
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
                                result,
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
    getHomeRandom = async (req, res) => {
        try {
            const randomDocuments = await UserSchema.aggregate([
                { $sample: { size: 4 } },
                { $project: { userName: 1, _id: 1, avatar: 1 } }
            ]);
    
            if (randomDocuments.length === 0) {
                return res.status(404).json({ error: 'No random document found' });
            }
            const userIds = randomDocuments.map(user => user._id);

            const songs = await MediaSchema.find({ creator: { $in: userIds } })
                .select('title creator duration coverURL storageURL');
    
            const responseData = randomDocuments.map(user => ({
                artist: { userName: user.userName, _id: user._id , avatar: user.avatar},
                songs: songs.filter(song => song.creator.toString() === user._id.toString())
            }));
            console.log(responseData)
            res.json({ responseData });
        } catch (error) {
            console.error('Error retrieving random documents:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    getHomeBase = async (req, res) => {
        try {
            const randomDocuments = await UserSchema.aggregate([
                {
                  $match: {
                    userName: { $in: ['Carly Rae Jepsen', 'Charlie Puth', 'Alec Benjamin', 'Mindme'] } // Replace with specific names
                  }
                },
                {
                  $project: {
                    userName: 1,
                    _id: 1,
                    avatar: 1,
                  }
                }
            ]);
            
            if (randomDocuments.length === 0) {
                return res.status(404).json({ error: 'No random document found' });
            }
            const userIds = randomDocuments.map(user => user._id);

            const songs = await MediaSchema.find({ creator: { $in: userIds } })
                .select('title creator duration coverURL storageURL');
    
            const responseData = randomDocuments.map(user => ({
                artist: { userName: user.userName, _id: user._id , avatar: user.avatar},
                songs: songs.filter(song => song.creator.toString() === user._id.toString())
            }));
            console.log(responseData)
            res.json({ responseData });
        } catch (error) {
            console.error('Error retrieving random documents:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    getHome(req, res){
        res.send("10")
    }
}

module.exports = new SiteController