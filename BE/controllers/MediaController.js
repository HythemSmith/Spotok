const MediaSchema = require('../database/models/MediaSchema');
const multer = require('multer');
const path = require('path');

// Parse JSON in incoming requests

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = "D:/SpotokDatabase"
        // Check for the field name and adjust the upload path accordingly
        if (file.fieldname === 'media') {
            uploadPath += "/Media/"
        } else if (file.fieldname === 'image') {
            uploadPath += "/Media-Cover/"
        }
    
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.replace(/\.[^/.]+$/, '') + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'media', maxCount: 1 }
]);


class MediaController {
  // [POST] /media/upload
  postUpload = async (req, res) => {
    try {
      let title, album, creator, mediaType, duration, storageurl, coverurl;

      // Encapsulate the upload middleware within a Promise
      await new Promise((resolve, reject) => {
        upload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
            console.log(err);
            reject(err);
            return res.status(500).json({ error: err.message });
          } else if (err) {
            console.log(err);
            reject(err);
            return res.status(500).json({ error: err });
          }

          try {
            ({ title, album, creator, mediaType, duration } = JSON.parse(req.body.data));

            const paths = Object.values(req.files).flatMap(files => files.map(file => file.path));
            [storageurl, coverurl] = paths;

            // Create an instance in MongoDB using await inside async function
            await MediaSchema.create({
              title: title,
              album: album,
              creator: creator,
              mediaType: mediaType,
              duration: duration,
              storageURL: storageurl,
              coverURL: mediaurl
            });

            // Resolve the Promise to signal completion
            resolve();
          } catch (error) {
            console.error('Error processing data or creating document:', error);
            reject(error);
          }
        });
      });

      // Code here will execute after the upload and MongoDB creation
      res.status(200).json({ message: 'Files uploaded and document created successfully' });
    } catch (error) {
      console.error('Error in postUpload:', error);
      res.status(500).json({ error: 'Failed to process data or create document' });
    }
  };

  // [GET] /
  getHome(req, res) {
    res.send('1230')
  }
}
  

module.exports = new MediaController();
