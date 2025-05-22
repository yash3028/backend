import { data_source } from "../database"
import { Request } from "../entities/Request"
import { Software } from "../entities/Software"
import { User } from "../entities/User"
import { Request as ExpressRequest,RequestHandler,Response } from "express"
import { AuthRequest } from "../middlewares/authenticate"

export const submitRequest: RequestHandler = async(req:AuthRequest,res:Response)=>{
    try{
        const userRepo = data_source.getRepository(User)
        const softwareRepo = data_source.getRepository(Software)
        const requestRepo = data_source.getRepository(Request)
        const {softwareName,accessType,reason} = req.body
        const userId = req.user?.userId;
        
        const user = await userRepo.findOneBy({id:userId})
        if(!user){
            res.status(400).json({message:'user not found'})
            return
            }
        const software = await softwareRepo.findOneBy({name:softwareName})
        if(!software){
            res.status(404).json({message:"not found software"})
            return;
            }
        const request = new Request()
        request.user = user;
        request.software = software;
        request.accessType = accessType;
        request.reason = reason;
        request.status = 'Pending';
        await requestRepo.save(request);
        res.status(201).json({message:'request submitted'})
        return
    }catch(error){
        res.status(500).json({message:'server errorr'})
        return
        }
};

export const getPendingRequest = async(req:ExpressRequest,res:Response)=>{
    try{
        const requestRepo = data_source.getRepository(Request);
        const requests = await requestRepo.find({
            where:{status:"Pending"},
            relations:['user','software'],
        });
        res.json(requests);
    }catch(error){
        res.json({message:"error"})
    }
};

export const updateRequest = async(req:AuthRequest,res:Response)=>{
    try{
        const requestRepo = data_source.getRepository(Request)
        const {id} = req.params;
        const {status} = req.body;
        const request = await requestRepo.findOne({
            where:{id:Number(id)},
            relations:['user','software']
        });
        if(!request){
             res.status(404).json({message:'request not found'})
            return;
            }
        request.status = status as "Approved" || "Rejected";
        await requestRepo.save(request);
        res.json({message:`Request${status.toLowerCase()}`})
    }catch(error){
        res.json({message:'error'})
    }
};