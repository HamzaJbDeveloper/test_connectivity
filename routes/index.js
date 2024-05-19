// routes
const authRoute=require("./auth.router")
const equipmentRoute=require("./equipment.router")


const router=require("express").Router()


router.use("/auth",authRoute)
router.use("/equipment",equipmentRoute)

module.exports=router;