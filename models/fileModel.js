import mongoose from "mongoose"
const fileSchema = new mongoose.Schema({
    filename : {
        type : String,
        required : true
    },
    size : {
        type : Number,
        required : true
    },
    path : {
        type : String,
        required : true
    }
}, {
    timestamps : true
})

const File = mongoose.model("File", fileSchema);

export default File;