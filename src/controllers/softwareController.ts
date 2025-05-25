import { data_source } from "../database"
import { Software } from "../entities/Software"
import { Response,Request } from "express"

export const createSoftware = async(req:Request,res:Response)=>{
    try{
        const softwareRepo = data_source.getRepository(Software)
        const {name,description,accesslevels} = req.body;
        const software = new Software();
        software.name = name
        software.description = description;
        software.accesslevels = accesslevels;
        await softwareRepo.save(software)
        res.status(201).json({message:"software created"})
    }catch(error){
        console.log("error:",error)
        res.status(500).json({message:'error'})
    }
}

export const getAllSoftware = async(req:Request,res:Response)=>{
    try{
        const softwareRepo = data_source.getRepository(Software)
        const softwares = await softwareRepo.find()
        res.status(201).json(softwares)
    }catch(error){
        res.status(404).json({message:"no software found"})
    }
}