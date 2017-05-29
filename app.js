var express=require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors=require('cors');
var path=require('path');
var mongoose=require('mongoose');


var app=express();
const route=require('./routes/route');
//db connection
mongoose.connect('mongodb://localhost:27017/contactlist');
mongoose.connection.on('connected',()=>
{
    console.log("connection created with database at 27017");
});
mongoose.connection.on('error',(err)=>
{

  if(err)
  {
      console.log("Erorr in db connection is"+err);
  }
});


//adding middleware--cors
app.use(cors());
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

app.use('/api',route);

//testing server
app.get('/',(req,res)=>
{
    res.send('foobar');
}
)

//Define port no

const port=3000;

app.listen(port,()=>
{
    console.log("succesfully connection created at port no"+port);
})