const storiesModel = require('../../models/stories').model;
const useCaseCrop = require('../crops');

const getAllStories = async () =>{
    const allStories = await storiesModel.find({}).exec();
    return allStories;
}

const getCropsStories = async (cropInfo) =>{
    console.log("Dentro del crops storie",cropInfo);
    const getCropsStories = await storiesModel.find(cropInfo).exec();
    return getCropsStories;
}

const newStoryCrop = async (storyData)=>{
    const datoCrop = {
        _id:storyData.id_crops
    }
    
    const verifyCrop = await useCaseCrop.findAnyCrops(datoCrop);
    if(verifyCrop==null) throw new Error("Crop does not exist");
    const newStory = new storiesModel(storyData);
    const storyCreated = newStory.save();
    return storyCreated;
}

const UserCropActiveInformation = async(userId)=>{
    const data =  await useCaseCrop.getPerUserCrops(userId.Id_Users);
    const activeCrop = data.reduce((acumulator,currentValue)=>{
        if(currentValue.cropStatus=="active") return currentValue;
        return acumulator;
    });
    if(activeCrop==null) return "USER HAS NOT ACTIVE CROP";
    const idCropActive = activeCrop._id;
    const storiesActiveCrop = await getCropsStories({"id_crops":idCropActive});
    return storiesActiveCrop;
}

module.exports={
    getAllStories,
    getCropsStories,
    newStoryCrop,
    UserCropActiveInformation
}