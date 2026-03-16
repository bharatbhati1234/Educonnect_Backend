// courseUpload.js file ------------------------------------------------------------

// multer file for course

// ye course ka jo bhi images,video, files rehege usko upload kerne k liye banaya hai 

import multer from "multer";

const storage = multer.diskStorage({

destination: function(req,file,cb){
cb(null,"uploads/courses");
},

filename:function(req,file,cb){
cb(null,Date.now()+"-"+Math.round(Math.random()*1e9)+"-"+file.originalname);
}

})

const upload = multer({storage});

export default upload;