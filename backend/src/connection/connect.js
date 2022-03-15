const mongoose=require("mongoose")

module.exports=()=>{
    return mongoose.connect("mongodb+srv://deepak:deep_123@cluster0.fyotr.mongodb.net/home2go?retryWrites=true&w=majority")
}