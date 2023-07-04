import express from "express"
import {rimraf} from "rimraf";
import path from "path";
import url from "url"
import File from "../models/fileModel.js";
import fs from "fs";
import deletePrevious from "../config/delete.js";
import {config} from "dotenv"
config();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const homeController = {
    renderHome : async(req, res) => {
        res.render("home");
    },
    uploadFile : async(req, res) => {
        const file = new File({
            filename : req.file.filename,
            size : req.file.size,
            path : req.file.path
        });
        await file.save();
        res.render("home", {
            showLink : "show",
            link : `${process.env.URL}/files/${file._id}`
        })

        deletePrevious();
        
        // deleting the file after 24h
        // setTimeout(() => {
        //     fs.unlink(file.path, async() => {
        //         await File.findByIdAndDelete(file._id);
        //     })
        // }, 20000)
    },
    renderDownload : async(req, res) => {
        try{
            const {id} = req.params;
            const file = await File.findOne({_id : id});
            let fileSize = (file.size/1024).toFixed(2);
            let unit = "kb"
            if (fileSize >= 1024){
                fileSize = (fileSize/1024).toFixed(2);
                unit = "mb"
            }
            res.render("download", {
                fileName : file.originalname,
                fileSize : `${fileSize} ${unit}`,
                id : id
            });
        }catch(err){
            res.send("the file your are accessing is either expired or doesn't exist");
        }
    },
    download : async(req, res) => {
        const {id} = req.params;
        try{
            const file = await File.findOne({_id : id});
            const downloadPath = path.join(__dirname, `../${file.path}`);
            res.download(downloadPath)
        }catch(err){
            res.send("The file you want to download is either expired or doesn't exist")
        }
    }
}   

export default homeController;  
