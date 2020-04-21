import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import bodyParser from "body-parser";

export const home = async(req, res) => {
    try{
        const videos = await Video.find({}).sort({_id:-1});
        res.render("home", {pageTitle: "Home", videos});
        console.log(loggedUser);
    } catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: []});
    }
    
};

export const search = async(req, res) => {
    const {
        query: {term: searchingBy}
    } = req;
    let videos = []
    // const searchingBy = req.query.term;
    try{
        videos = await Video.find({
            title: { $regex: searchingBy, $options: "i"}
        });
    }catch(error){
        console.log(error);
    }
    res.render("search", {pageTitle: "Search", searchingBy, videos});
};

//export const videos = (req, res) => res.render("video",  {pageTitle: "video"});

export const getUpload = (req, res) => {
    res.render("upload",  {pageTitle: "upload"});
};

export const postUpload = async(req, res) => {
    const {
        body:{  
            title,
            description
        },
        file: {path}
    } = req;
    //const user = await User.findById(req.user._id);
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id
    });
    console.log(req);
    req.user.videos.push(newVideo._id);
    req.user.save();
    //req.user.save();
    // ToDO: upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id).populate('creator');
        //console.log(video);
        res.render("videoDetail", {pageTitle: video.title, video});
    }   catch{
        res.redirect(routes.home);
    }
};

export const getEditVideo = async(req, res) => {
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video });
    }catch(error){
        red.redirect(routes.home);
    }
};

export const postEditVideo = async(req, res) => {
    const {
        params: {id},
        body: {title,description}
    } = req;
    try{
        await Video.findOneAndUpdate({_id: id}, { title, description });
        res.redirect(routes.videoDetail(id));
    }catch(error){
        res.redirect(routes.home);
    }
};

export const deleteVideo = async(req, res) => {
    const {
        params: {id}
    } = req;
    try{
        await Video.findOneAndRemove({_id: id});
    }catch(error){
        console.log(error);
    }
    res.redirect(routes.home);
};