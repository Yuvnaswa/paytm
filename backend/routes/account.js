const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { authMiddleware } = require('../middlewareAuth');
const { Account,User } = require('../db');
const { default: mongoose } = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

//to check the balacne of the account
router.get('/balance', authMiddleware, async(req,res) =>{
    const account = await Account.findOne({
        userId:req.userId
    });
    
    res.json({
        balance:account.balance
    })
})

//Send money to anothet account
router.post('/transfer', authMiddleware, async(req,res) => {
    const session = await mongoose.startSession();

    //start transaction
    session.startTransaction();

    const {amount, to} = req.body;

    //Fetch the account within the transaction
    const account = await Account.findOne({
        userId:req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    //check the 'to' account exists
    const toAccount = await Account.findOne(
        {userId:to}
    ).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    //Perform the transacton
    await Account.updateOne({userId:req.userId}, {$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    //Commit the transaction
    session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
    console.log("done")
})

// async function transfer (req){
//     const session = await mongoose.startSession();

//     //start transaction
//     session.startTransaction();

//     const {amount, to} = req.body;

//     //Fetch the account within the transaction
//     const account = await Accout.findOne({
//         userId:req.userId
//     }).session(session);

//     // if(!account || account.balance < amount){
//     //     await session.abortTransaction();
//     //     return res.status(400).json({
//     //         message: "Insufficient balance"
//     //     });
//     // }

//     //check the 'to' account exists
//     const toAccount = await Accout.findOne(
//         {userId:to}
//     ).session(session);

//     // if(!toAccount){
//     //     await session.abortTransaction();
//     //     return res.status(400).json({
//     //         message: "Invalid account"
//     //     });
//     // }

//     //Perform the transacton
//     await Accout.updateOne({userId:req.userId}, {$inc:{balance:-amount}}).session(session);
//     await Accout.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

//     //Commit the transaction
//     session.commitTransaction();
//     // res.json({
//     //     message: "Transfer successful"
//     // });
//     console.log("done")
//     console.log(account.balance)
// }

// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })

// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })

module.exports = router;