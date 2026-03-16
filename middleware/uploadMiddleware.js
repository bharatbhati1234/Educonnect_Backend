/**
 * Multer middleware used for uploading instructor profile images.
 * Saves uploaded files inside uploads/instructors folder.
 */

import multer from "multer"
import path from "path"

const storage = multer.diskStorage({

destination:function(req,file,cb){
cb(null,"uploads/instructors")
},

filename:function(req,file,cb){
const uniqueName = Date.now()+"-"+Math.round(Math.random()*1e9)
cb(null,uniqueName+path.extname(file.originalname))
}

})

const upload = multer({storage})

export default upload