import Router from 'express'
import  {registerUser,loginUser,logoutUser} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/register").get(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }, 
    {
        name: "coverImage",
        maxCount: 1
    }
]),registerUser)

router.route("/login").get(upload.fields([]),loginUser)

router.route("/logout").post(verifyJWT,  logoutUser)


export default router