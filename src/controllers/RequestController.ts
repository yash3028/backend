import { data_source } from "../database"
import { Request } from "../entities/Request"
import { Software } from "../entities/Software"
import { User } from "../entities/User"
import { Request as ExpressRequest,RequestHandler,Response } from "express"
import { AuthRequest } from "../middlewares/authenticate"

export const submitRequest: RequestHandler = async(req: AuthRequest, res: Response) => {
  try {
    const userRepo = data_source.getRepository(User);
    const softwareRepo = data_source.getRepository(Software);
    const requestRepo = data_source.getRepository(Request);

    const { software, accessType, reason } = req.body;
    console.log("Software from body:", software);

    if (!req.user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userEntity = await userRepo.findOneBy({ id: req.user.id });
    if (!userEntity) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const softwareEntity = await softwareRepo.findOneBy({ name: software });
    if (!softwareEntity) {
      res.status(404).json({ message: "Software not found" });
      return;
    }

    const request = new Request();
    request.user = userEntity;
    request.software = softwareEntity;
    request.accessType = accessType;
    request.reason = reason;
    request.status = 'Pending';

    await requestRepo.save(request);

    res.status(201).json({ message: 'Request submitted' });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPendingRequest = async(req:ExpressRequest,res:Response)=>{
    try{
        const page = Number(req.query.page) || 1
        const limit = 10
        
        const requestRepo = data_source.getRepository(Request);
        const [requests,total] = await requestRepo.findAndCount({
            where:{status:"Pending"},
            relations: ["software", "user"],
            skip: (page - 1) * limit,
            take:limit   
         });
        res.json({data:requests,
            total,
            page,
            totalpages: Math.ceil(total/limit)
        });
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
        });
        if(!request){
             res.status(404).json({message:'request not found'})
            return;
            }
        request.status = status as "Approved" || "Rejected";
        await requestRepo.save(request);
        res.status(201).json({message:`Request${status.toLowerCase()}`})
    }catch(error){
        console.log(JSON.stringify(error))
        res.status(500).json({message:'Internal server error'})
    }
};