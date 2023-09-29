const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

  app.post('/addstudent', async (req, res) => {
    const added = req.body;
    const addstudents = await studentsCollections.insertOne(added)
    res.send(addstudents)
})
app.delete('/students/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const studentId = await studentsCollections.deleteOne(query)
  res.send(studentId)
})
app.get('/students/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const data = await studentsCollections.findOne(query);
  res.send(data);
})
app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const unique = { _id: new ObjectId(id) };
            const review = req.body;
            console.log(review)
            const option = { upsert: true };
            const updateData = {
                $set: {
                    name: review.name,
                    Roll:review.Roll,
                    clases:review.clases,
                    section:review.section,
                    address:review.address,
                    mobile:review.mobile,
                    email:review.email
              }
            }
            const result = await studentsCollections.updateOne(unique, updateData, option);
            res.send(result);
        })


  } finally {
  
  
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Student Info Server Running ${port}`)
})