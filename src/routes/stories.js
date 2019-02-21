const express = require('express');

const routerStories = express.Router();
const jwt = require('../lib/jwt');
const useCasesStories = require('../useCases/stories');
const auth = require('../middlewares/auth');
routerStories.use(auth);

routerStories.get('/all',async(req,res)=>{
    try{
        const allStories = await useCasesStories.getAllStories();
        res.json({
            success:true,
            message:"All the stories of the System",
            payload:{
                allStories
            }
        });
    }catch(error){
        res.status(404);
        res.json({
            success:false,
            message:"We can not show the story of the crop",
            error:[
                error
            ]
        });
    }
})

routerStories.post('/crop',async(req,res)=>{
    try{
        console.log(req.body);
        const cropStories = await useCasesStories.getCropsStories(req.body);
        res.json({
            success:true,
            message:"Crops stories",
            payload:{
                cropStories
            }
        });
    }catch(error){
        res.status(404);
        res.json({
            success:false,
            message:"Could not show the Stories",
            error:[
                error
            ]
        });
    }
});

routerStories.post('/',async(req,res)=>{
    try{
        const dataStory = req.body;
        const newStoryCrop = await useCasesStories.newStoryCrop(dataStory);
        res.json({
            success:true,
            message:"Story Created",
            payload:{
                newStoryCrop
            }
        });
        
    }catch(error){
        res.status(404);
        res.json({
            success:false,
            message:"Could not create the story",
            error:[
                error
            ]
        });
    }
});

routerStories.post('/');

module.exports = {
    routerStories
}
