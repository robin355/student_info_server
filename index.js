const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v1zucfh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const studentsCollections = client.db('students').collection('student_info')
    
    app.get('/students', async (req, res) => {
      const query = {}
      const students = await studentsCollections.find(query).toArray()
      res.send(students)
  })
  } finally {
  
  
  }
}
run().catch(console.dir);



// run().catch(err => console.log(err))

app.listen(port, () => {
  console.log(`Student Info Server Running ${port}`)
})