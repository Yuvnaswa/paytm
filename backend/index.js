const express = require('express')
// const mogoose = require('mongoose');
const cors = require('cors')
const app = express()
const rootRouter = require("./routes/index")
const port = 3000
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json())



app.use("/api/v1",rootRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})