// courseUpload.js file ------------------------------------------------------------

// multer file for course

// ye course ka jo bhi images,video, files rehege usko upload kerne k liye banaya hai 


import multer from "multer";
import fs from "fs";
import path from "path";

// folder path
const uploadPath = "uploads/courses";

// check if folder exists, if not create it
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({ storage });

export default upload;