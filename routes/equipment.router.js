// equipment controllers
const equipmentControllers=require("../controllers/equipment.controllers");
// authentication middleware
const authenticationMiddleware=require("../middlewares/authentication")


const router=require("express").Router()

router.get("/getAll",equipmentControllers.getAllEquipment)
router.post("/login",equipmentControllers.loginEquipment)

router.get("/getByMacAdress/:adressMac",equipmentControllers.getEquipmentByMacAdress)

router.post("/add",equipmentControllers.addEquipment)

router.delete("/delete",authenticationMiddleware ,equipmentControllers.deleteEquipment)

module.exports=router;