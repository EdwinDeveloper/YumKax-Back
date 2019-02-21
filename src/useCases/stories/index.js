const storiesModel = require('../../models/stories').model;
const useCaseCrop = require('../crops');

const getAllStories = async () =>{
    const allStories = await storiesModel.find({}).exec();
    return allStories;
}

const getCropsStories = async (cropInfo) =>{
    const getCropsStories = await storiesModel.find(cropInfo).exec();
    return getCropsStories;
}

const newStoryCrop = async (storyData)=>{
    const datoCrop = {
        _id:storyData.id_crops
    }
    const verifyCrop = await useCaseCrop.findAnyCrops(datoCrop);
    //console.log("Resultado",verifyCrop);
    //if(verifyCrop.length<=0) throw new Error("The crop does not exits");
    const newStory = new storiesModel(storyData);
    const storyCreated = newStory.save();
    return storyCreated;
}

module.exports={
    getAllStories,
    getCropsStories,
    newStoryCrop
}