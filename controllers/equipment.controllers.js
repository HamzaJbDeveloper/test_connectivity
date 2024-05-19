// equipment Model

const EquipmentModel = require("../models/equipment")

const getAllEquipment=async (req, res, next)=>{
    try{
        const allEquipment=await EquipmentModel.find({adressMac})
        return res.json({equimentList:allEquipment})
    }catch(err){
        res.json({msg:"error while getting equipment"})
        console.log(err)
    }
}


const getEquipmentByMacAdress=async(req, res, next)=>{

    const {adressMac}=req.params;

    try{
        const equimentByMac=await EquipmentModel.findOne({adressMac})
        if(equimentByMac){
            return res.json({status:true, msg:"ce pc est déja enregistrer !",data:equimentByMac})
        }else{
            res.json({status:false})
        }
    }catch(err){
        console.log(err)
        res.json({msg:"error while getting equiment By Mac Adress"})
    }
}

const loginEquipment=async (req, res, next)=>{
    try{    
        const {adressMac,password}=req.body
        const adressMacIsValid=await EquipmentModel.findOne({adressMac})
        if(!adressMacIsValid){
            res.json({status:false, msg:"no euipment with that adressMac"})
            return
        }
        const passwordIsValid=adressMacIsValid.password===password
        if(!passwordIsValid){
            res.json({status:false, msg:"wrong password"})
            return
        }
        res.json({status:true, token:adressMacIsValid.adressMac})

    }catch(err){
        console.log(err)
        res.json({status:false, msg:"error while loggin to equipment"})
    }
}

const addEquipment=async(req, res, next)=>{
    try{
        const newEquipment=new EquipmentModel(req.body)
        await newEquipment.save()
        res.json({status:true, msg:"l'equipement est ajouter !"})
    }catch(err){
        console.log(err)
        res.json({msg:"error while adding equipment !"})
    }
}


const deleteEquipment=async(req, res, next)=>{
    try{
        const {equipmentId}=req.body;
        const deleteEquipmentRequest=await EquipmentModel.findByIdAndDelete(equipmentId);
        if(deleteEquipmentRequest){
            res.json({status:true, msg:"equipment has been deleted"})
        }else{
            res.json({status:true, msg:"can't find equipment with that adressMAC"})
        }
    }catch(err){
        console.log(err)
        res.json({status:false, msg:"error while deleting equipment !"})
    }
}




module.exports={
    getAllEquipment:getAllEquipment,
    getEquipmentByMacAdress:getEquipmentByMacAdress,
    addEquipment:addEquipment,
    deleteEquipment:deleteEquipment,
    loginEquipment:loginEquipment
}