const express= require('express');
const User = require('../models/user');
const router= express.Router();
const Candidate= require('../models/candidate');
const { jwtauthMiddleware } = require('../jwt');

const checkAdmin= async(userData)=>{
    const user= await User.findById(userData);
    
    return user.role==='admin';
    
}


router.post('/', jwtauthMiddleware, async(req,res)=>{
    try {
        if(!await checkAdmin(req.user.id)){
            return res.status(403).json({message: 'User is not admin'});
        }
        const data= req.body;
        const newCandidate= new Candidate(data);
        const response=await newCandidate.save();

        res.status(200).json({candidate:response, message:'Candidate successfully created'});

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
})



router.put('/:candidateID', jwtauthMiddleware, async(req,res)=>{

    try {

        if(!checkAdmin(req.user.id)){
            return res.status(403).json({message: 'User is not admin'});
        }
        const candidateId= req.params.candidateID;
        const newData= req.body;
        const response= await Candidate.findByIdAndUpdate(candidateId, newData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })
    
        if(!response){
            return res.status(400).json({message: 'Candidate not found'});
        }
    
        return res.status(200).json({response});       

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
})



router.delete('/:candidateID', jwtauthMiddleware, async(req,res)=>{

    try {
        if(!checkAdmin(req.user.id)){
            return res.status(403).json({message: 'User is not admin'});
        }
        const candidateId= req.params.candidateID;
        const response= await Candidate.findByIdAndDelete(candidateId);
        if(!response){
            return res.status(400).json({message:'Candidate not found'});
        }
        return res.status(200).json({candidate:response, message:'Candidate deleted'})

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
})



router.post('/vote/:candidateID', jwtauthMiddleware, async(req,res)=>{

    try {

        const userID= req.user.id;
        const candidateId= req.params.candidateID;
    
        const user= await User.findById(userID);
        if(user.role=='admin'){
            return res.status(403).json({message: 'Admin cannot vote'});
        }
        else if(user.isVoted){
            return res.status(403).json({message: 'you have already voted'});
        }
        const candidate= await Candidate.findById(candidateId);
        if(!candidate){
            return res.status(401).json({message: 'No such candidate exists'});
        }
    
        user.isVoted=true;
        await user.save();
    
        candidate.votes.push({user:userID})
        candidate.voteCount+=1;
        await candidate.save();   
        
        return res.status(200).json({message: 'Thanks for voting'});

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
})


router.get('/vote/count', async(req,res)=>{


    try {
        const candidates= await Candidate.find().sort({voteCount:'desc'});

        const voteCounts=candidates.map((data)=>{
            return {
                party:data.party,
                voteCount:data.voteCount,
                id:data.id
            }
        })   
        
        return res.status(200).json({response: voteCounts})

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
})


router.get('/', async(req,res)=>{
    try {
        const candidates= await Candidate.find({}, 'name party _id');
        if(!candidates){
            return res.status(400).json({message: 'No candidates exist'});
        }
        return res.status(200).json({CANDIDATES: candidates})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
})

module.exports=router