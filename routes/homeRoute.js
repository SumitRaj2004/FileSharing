import express from "express";
import multer from "multer";
import homeController from "../controllers/homeController.js";
import path from "path"
const router = new express.Router();



const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "uploads/")
    },
    filename : function(req, file, cb){
        const name = `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, name);
    }
})
const upload = multer({
    storage : storage,
    limits : {
        fileSize : 10485760  //10mb
    }
});

router.get("/", homeController.renderHome);
router.post("/", upload.single("image"), homeController.uploadFile, (error, req, res, next) => {
    res.render("home", {
        showError : "show",
        errorMessage : error.message 
    })
});
router.get("/files/:id", homeController.renderDownload);
router.get("/files/download/:id", homeController.download)


export default router;