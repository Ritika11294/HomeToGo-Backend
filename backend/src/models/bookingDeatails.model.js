const mongoose=require("mongoose")

const property=require("./property.model")

const bookingSchema=new mongoose.Schema({
  property_id:{type:mongoose.Schema.Types.ObjectId,ref:property,required:true},
    personalDetails:{
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        email:{type:String,required:true},
        address:{type:String,required:true},
        nationality:{type:String,required:false,default:"India"}
    },
    paymentDetails:{
        cardNo:{type:Number,required:true,unique:true},
        CVV:{type:Number,required:true},
        expiryDate:{type:Date,required:true}
    },

    stayDetails:{
        checkIn:{type:Date,required:true},
        checkOut:{type:Date,required:true},
        noOfAdults:{type:Number,required:true},
        noOfChilds:{type:Number,required:true}
    }

   
    
},{
    versionKey:false,
    timestamps:true
})

module.exports=mongoose.model("booking",bookingSchema)