const express = require('express')
const app = express()
const z = require('zod');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const {User,Account} = require('../db');
const bodyParser = require('body-parser')
const {authMiddleware} = require("../middlewareAuth")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json())

const router = express.Router();

// zod singup
const signupBody = z.object({
    username:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string().min(5)
})

//zod signin
const signinBody = z.object({
    username:z.string().email(),
    password: z.string()
})

//zod update user
const updateUser = z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})

//signup
router.post("/signup", async(req,res)=>{
    const {success} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        }) 
    }
    
    const user = await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })
    

    const userId = user._id;

    // Create new account
    await Account.create({
        userId,
        balance: 1 + Math.random() * 100000
    })
    


    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message:"User created sussefully",
        token:token
    })
})


//singin
router.post('/signin', async(req,res) =>{
    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user =await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET)

        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })

})

//update user
router.put('/', authMiddleware, async(req,res)=>{
    const {success} = updateUser.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({_id:req.userId},req.body);

    res.json({
        message: "Updated successfully"
    })
})

// get the user from the backend, filterable via firstName/lastName
router.get('/bulk', async(req,res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map(user =>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

module.exports = router;