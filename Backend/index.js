const express=require('express')
const router=require('./routes/appRoutes')
var mongoose=require('mongoose')
const bodyParser = require('body-parser')
const cors=require('cors')
const app=express()
app.use(express.json());
app.use(cors())
let res=mongoose.connect("mongodb+srv://sannidhibhat646:uY6SuEqm11lya1nD@cluster0.seclf.mongodb.net/meandb", {
    useNewUrlParser: true,
   
});
if(res){
    console.log(res)
}
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use('/',router)
app.listen(3000,()=>{
    console.log("Server is running at 3000")
})