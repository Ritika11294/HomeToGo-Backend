const mongoose=require("mongoose")

const propertySchema=new mongoose.Schema({
    images:[{type:String,required:true}],
    imgUrl:{type:String,required:true},
    features:{type:String,required:true},
    propertyName:{type:String,required:true},
    price:{type:Number,required:true},
    location:{type:String,required:true}

},{
    versionKey:false,
    timestamps:true
})

module.exports=mongoose.model("properties",propertySchema)

