import File from "../models/fileModel.js"
import fs from "fs"
import mongoose from "mongoose";

const deletePrevious = async() => {
    const files = await File.find({});
    if (files){
        files.forEach((file) => {
            const timeNow = new Date();
            const fileTime = file.createdAt;
            if (timeNow - fileTime > 86400000){  // 8,64,00,000
                fs.unlink(file.path, async() => {
                    await File.findByIdAndDelete(file._id);
                })
            }
        })
    }
}

export default deletePrevious;