const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 2000

// middleware
app.use(cors());
app.use(express.json());

// json fake data call in clint side
const myFakeData = require('./fakeData/myShop.json')

app.get('/myData', (req, res) => {
  res.send(myFakeData)
});


// DB_USER=assignment10
// DB_PASS=kHaDiUUEErHmnpuG

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);





// MongoDB Connection:

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wlyyget.mongodb.net/?retryWrites=true&w=majority`;



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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send(`My Assignment Server is Running`);
});

app.listen(port, () => {
  console.log(`My Assignment Server is Running Port: ${port}`);
});
