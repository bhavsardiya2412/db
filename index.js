let express = require('express');
let app = express();
db = require('../nodeproject/mongodb')
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const UserSchema = new mongoose.Schema({
  Student_name : String,
  class : Number,
  age : Number,
  roll_no : Number,
  marks : {type: mongoose.Schema.Types.Array}
});


app.post('/insert_data',async(req,res)=>{
    const User = mongoose.model('user',UserSchema);
    let data = await User.insertMany([{  Student_name:req.body.Student_name,class:req.body.class,age:req.body.age,roll_no:req.body.roll_no,marks:req.body.marks }]);
    res.send(data);
})
//specific subject marks..
app.post('/find_data',async(req,res)=>{
    const User = mongoose.model('user',UserSchema);
    let data = await User.find({roll_no : req.query.roll},{marks:{$elemMatch:{subject:req.query.sub}}});
   
    res.send(data);
})

//marks 50 -less then..
app.post('/find_document',async(req,res)=>{
  const User = mongoose.model('user',UserSchema);
  let data = await User.find({roll_no:req.query.roll},{marks:{$elemMatch:{obtainmarks:{$lt:50}}}});
  res.send(data);
})

app.post('/update',async(req,res)=>{
    const User = mongoose.model('user',UserSchema);
    let update_data = req.query.update_data;
    let data = await User.updateOne({roll_no:rs},{"$set":{"marks":req.body.marks,"Student_name":req.body.Student_name,"class":req.body.class}});
    res.send(data);
})

app.post('/delete',async(req,res)=>{
    const User = mongoose.model('user',UserSchema);
    let rs = req.query.rs;
    let data = await User.deleteOne( {roll_no:rs} );
    res.send(data);
})

app.post('/percentage',async(req,res)=>{
  const User = mongoose.model('user',UserSchema);
  let roll_no = req.query.roll_no;
  console.log(roll_no)
  let data = await User.find( {roll_no:roll_no} )
  console.log(data)
  let totallearn = 0;
  let totalmarks2 = 0;
  for(let mark of data[0].marks){
  console.log(mark)
    totallearn = Number(mark.obtainmarks)+totallearn
    totalmarks2 = Number(mark.totalmarks)+totalmarks2;

    
    
  }
  let learn = (totallearn/totalmarks2)*100
  if(learn>33){
    res.send({learn:learn,result:"pass"})
  }
  else
  res.send({learn:learn,result : "fail"});
})


const server = app.listen(port,()=>{
    const post = server.address().address;
    const port = server.address().port;
})
