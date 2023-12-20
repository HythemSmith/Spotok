const multer = require('multer');
const mime = require('mime-types');
const path = require('path')
const fs = require('fs');
const { google } = require('googleapis')
const MediaSchema = require('../database/models/MediaSchema')

const apikeys = require('../api.json')

const mediaFolderID = '1d-eGVViZn3Z07wgZW1lScO0h-7ZF3n_R'
const coverFolderID = '14kjGmibtfsUXlkfrxikBaTxDYa8T-E34'

//--------------------------------------------------//
// Multer file handle
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/') // Destination folder for temporarily storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use original filename
  }
});
const upload = multer({ storage: storage });
//--------------------------------------------------//
// Check mimeType of file
function getMimeType(filePath) {
  const extension = path.extname(filePath);
  const mimeType = mime.lookup(extension);
  return mimeType;
}
//--------------------------------------------------//
let jwtClient = null
const SCOPE = 'https://www.googleapis.com/auth/drive'
async function authorize(){
    jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );
    await jwtClient.authorize();
    console.log('Authorized!')
}

class MediaController {
  // [POST] /media/upload
  postUpload = async (req, res) => {
    upload.fields([{ name: 'image' }, { name: 'media' }])(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(400).send('Error uploading files.');
      }
  
      const { image, media } = req.files; // Files save to temp
      // Authorize to gg drive
      authorize()

      try {
        const { title, album, creator, mediaType, duration } = JSON.parse(req.body.data)
        const coverURL = await uploadFile(image[0].path, coverFolderID)
        const storageURL = await uploadFile(media[0].path, mediaFolderID)
        if(coverURL == 0|| storageURL == 0) {
          return res.status(500).json({
            message: 'Files Already exists!',
          });
        }
        try {
          await MediaSchema.create({
            title,
            album,
            creator,
            mediaType,
            duration,
            storageURL,
            coverURL
          })
        } catch (error) {
          console.log(error)
          res.status(500).send('Saving document error.')
        }

        return res.status(200).json({
          message: 'Files uploaded successfully to Drive!'
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send('Error uploading files to Drive and storing information.');
      }
    });

    // File upload function
    async function uploadFile(filePath, folderId) {
      const fileName = path.basename(filePath); // Get the base name of the file path
      const mimeType = getMimeType(filePath)
      const drive = google.drive({ version: 'v3', auth: jwtClient });

      // Check if file already exists
      const response = await drive.files.list({
        q: `name='${fileName}' and '${folderId}' in parents`,
        fields: 'files(id, name)',
        spaces: 'drive'
      });

      const files = response.data.files;
      if (files.length > 0) {
        console.log(`The file ${fileName} already exists.`);
        return;
      }
      const fileMetadata = {
        'name': fileName,
        'mimeType': mimeType,
        'parents': [folderId]
      };
      //---------------------------------//
      const media = {
        mimeType: mimeType,
        body: fs.createReadStream(filePath)
      };
      //---------------------------------//
      const file = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      });
      //---------------------------------//
      if (file.data.id) {
        await drive.permissions.create({
          fileId: file.data.id,
          requestBody: {
            role: 'reader',
            type: 'anyone'
          }
        });
    
        const result = await drive.files.get({
          fileId: file.data.id,
          fields: 'webViewLink'
        });
        
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file: ${err}`);
          } else {
            console.log(`File deleted: ${filePath}`);
          }
        });
        return result.data.webViewLink;
      }

    }
    
  }
  // [GET] /
  getHome(req, res) {
    res.send('1230');
  }
}

module.exports = new MediaController();
