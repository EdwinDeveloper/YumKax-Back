const mongoose = require('mongoose');
const { Schema } = mongoose;

const stories = new Schema({
    begDate:{
        required:true,
        type:Date
    },
    actual:{
        required:true,
        type:Number
    },
    perfect:{
        required:true,
        type:Number
    },
    id_crops:{
        required:true,
        type:String,
        minlength:1,
        maxlength:61
    }
});

module.exports = {
    model:mongoose.model("storie",stories),
    stories
}