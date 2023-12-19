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
        } else if (!/^[a-zA-Z\s]*$/.test(name)){
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
                { $sample: { size: 2 } }, 
                { $project: {
                    userName: 1,
                    _id: 1,
            }}]);
            
            if (randomDocuments.length === 0) {
              return res.status(404).json({ error: 'No random document found' });
            }

            const _ids = randomDocuments.map(user => user._id);
            const _names = randomDocuments.map(name => name.userName);

            try {
                const songsPromises = _ids.map(_ids =>
                    MediaSchema.find({ creator: _ids }) // Assuming 'creator' field in MediaSchema corresponds to user _id
                      .select('title creator duration coverURL storageURL') // Select multiple fields
                      .exec()
                    );
                    const songs = await Promise.all(songsPromises);
                    const flattenedSongs = songs.flat();
                    
                    const updatedSongsPromises = flattenedSongs.map(async song => {
                        const coverURL = song.coverURL;
                        const storageURL = song.storageURL;
                        try {
                            // Read cover image file content
                            const coverData = await fs.readFile(coverURL);
                            const base64CoverData = Buffer.from(coverData).toString('base64');
                            const coverDataURL = `data:image/jpeg;base64,${base64CoverData}`;
                
                            // Read MP3 file content
                            const mediaData = await fs.readFile(storageURL);
                            const base64MediaData = Buffer.from(mediaData).toString('base64');
                            const mediaDataURL = `data:audio/mp3;base64,${base64MediaData}`;
                
                            return { ...song._doc, coverURL: coverDataURL, storageURL: mediaDataURL };
                        } catch (error) {
                            console.error('Error reading files:', error);
                            return { ...song._doc, coverURL: null, storageURL: null };
                        }
                });
            
                const updatedSongs = await Promise.all(updatedSongsPromises);

                const responseData = randomDocuments.map((user, index) => ({
                    artist: { userName: user.userName, _id: user._id },
                    songs: updatedSongs[index],
                }));

                res.json({ responseData });
            } catch (error) {
                console.error('Error retrieving random title:', error);
                res.status(500).json({ error: 'Server error' });
            }    
        } catch (error) {
            console.error('Error retrieving random title:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    getHomeBase = async (req, res) => {
        try {
          const specificDocuments = await UserSchema.aggregate([
            {
              $match: {
                name: { $in: ['Alec Benjamin', 'Charlie Puth'] } // Replace 'Name1' and 'Name2' with the specific names
              }
            },
            {
              $project: {
                userName: 1,
                _id: 1,
              }
            }
          ]);
          if (specificDocuments.length === 0) {
            return res.status(404).json({ error: 'No random document found' });
          }

          const _ids = specificDocuments.map(user => user._id);
          const _names = specificDocuments.map(name => name.userName);

          try {
                const songsPromises = _ids.map(_ids =>
                  MediaSchema.find({ creator: _ids }) // Assuming 'creator' field in MediaSchema corresponds to user _id
                    .select('title creator duration coverURL storageURL') // Select multiple fields
                    .exec()
                  );
                  const songs = await Promise.all(songsPromises);
                  const flattenedSongs = songs.flat();
                  
                  const updatedSongsPromises = flattenedSongs.map(async song => {
                      console.log(song.coverURL)
                      const coverURL = song.coverURL;
                      const storageURL = song.storageURL;
                      try {
                          // Read cover image file content
                          const coverData = await fs.readFile(coverURL);
                          const base64CoverData = Buffer.from(coverData).toString('base64');
                          const coverDataURL = `data:image/jpeg;base64,${base64CoverData}`;
              
                          // Read MP3 file content
                          const mediaData = await fs.readFile(storageURL);
                          const base64MediaData = Buffer.from(mediaData).toString('base64');
                          const mediaDataURL = `data:audio/mp3;base64,${base64MediaData}`;
              
                          return { ...song._doc, coverURL: coverDataURL, storageURL: mediaDataURL };
                      } catch (error) {
                          console.error('Error reading files:', error);
                          return { ...song._doc, coverURL: null, storageURL: null };
                      }
              });
          
              const updatedSongs = await Promise.all(updatedSongsPromises);

              const responseData = randomDocuments.map((user, index) => ({
                  artist: { userName: user.userName, _id: user._id },
                  songs: updatedSongs[index],
              }));

              res.json({ responseData });
          } catch (error) {
              console.error('Error retrieving random title:', error);
              res.status(500).json({ error: 'Server error' });
          } 
      
          // Remaining logic to process songs for the specific documents...
        } catch (error) {
          console.error('Error retrieving specific documents:', error);
          res.status(500).json({ error: 'Server error' });
        }
      };
    getHome(req, res){
        res.send("10")
    }
}

module.exports = new SiteController