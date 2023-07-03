import express from "express"
import User from "../modal/userModal.js";
import validateUserInput from "../middleware/authmiddleware.js";

const router = express.Router()

router.post("/register", async(req,res)=>{

    let {username,password} = req.body;

    // Validate the username and password
  const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
  const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      errors: [
        {
          type: 'field',
          value: username,
          msg: ' Username must be alphanumeric and between 6-12 characters.',
          path: 'username',
          location: 'body',
        },
      ],
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      errors: [
        {
          type: 'field',
          value: password,
          msg: 'Invalid password. Password must be at least 6 characters with special character ,alphabate,numbers.',
          path: 'password',
          location: 'body',
        },
      ],
    });
  }

   try {
  

    // const existingUser = await User.findOne({username:username});
    // if(existingUser){
    //     return res.status(200).json({message:"user already exists",existingUser})
    // }

    const user = User.create({username,password})

    return res.status(200).json({message:"user created succesfully",user})
    
   } catch (error) {
    console.log(error)
    return res.status(400).json({message:"internal server error"})
   }

    
})


router.post("/login", async(req,res)=>{

    try {
        let username = req.body.username
        let password = req.body.password

        const user = await User.findOne({username}).select("+password")

        if(!user){
            return res.status(500).json({message:"invalid username or password"})
        }
       else if(password !== user.password){
            return res.status(500).json({message:"invalid username or password"})
        }else{
            return res.status(200).json({message:"login successfully",user})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"internal server error"})
    }

})

export default router