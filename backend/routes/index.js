
const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const userRouter = require("./user")
const accountsRouter = require("./account")

app.use(cors());
app.use(bodyParser.json());

const router = express.Router();

router.use("/user", userRouter)
router.use('/account', accountsRouter);

module.exports = router;