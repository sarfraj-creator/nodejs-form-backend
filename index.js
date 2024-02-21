const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.port || 3000;

app.use(express.json())
app.use(cors())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
    console.log('database connected!')   
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number
  });

  const FormData = mongoose.model('formData', formSchema);

  

app.get('/', async(req, res)=>{
    const allUsers = await FormData.find()
    res.json(allUsers)
})


app.post('/', async(req, res) => {

    const form = new FormData(req.body);
    await form.save();
    console.log(form);
    res.send(req.body)
   
});


app.listen(port, ()=>{
    console.log(`server is running http://localhost:${port}`);
})


