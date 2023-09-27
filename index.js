const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
// require('dotenv').config()

app.use(cors())
app.use(express.json())


async function run(){
    try{
        app.get('/', (req, res) => {
            res.send('Hello Student')
          })
    }
    finally{

    }
}


run().catch(err => console.log(err))

app.listen(port, () => {
  console.log(`Student Info Server Running ${port}`)
})