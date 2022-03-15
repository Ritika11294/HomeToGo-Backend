
const mongoose=require("mongoose")

const express=require("express")

const app=express()

const router=express.Router()

app.use(express.json())

const Property=require("../models/property.model")

const Booking=require("../models/bookingDeatails.model")


//used for adding property
router.get("/getData",async(req,res)=>{
    try {
        const properties= await Property.find().lean().exec()

        return res.status(200).send(properties)
    } catch (e) {
        res.send(e.message)
    }
})


router.post("/postData",async(req,res)=>{
    try {
        const properties= await Property.create(req.body)

        return res.status(200).send(properties)
    } catch (e) {
        res.send(e.message)
    }
})



//this is for getting property detalis by id => /properties/getData/:id
router.get("/getData/:id",async(req,res)=>{
    try {
        const properties= await Property.findById(req.params.id).lean().exec()

        return res.status(200).send(properties)
    } catch (e) {
        res.send(e.message)
    }
})



//this is for posting the booking details =>/properties/postBookings
router.post("/postBookings",async(req,res)=>{
    try {
        const bookings=await Booking.create(req.body)

        return res.send(bookings)
    } catch (e) {
        res.send(e.message)
    }
})

//this is for getting all bookings detalis=> /properties/getBookings
router.get("/getBookings",async(req,res)=>{
    try {
        const bookings=await Booking.find().lean().exec()

        return res.send(bookings)
    } catch (e) {
        res.send(e.message)
    }
})


// this is for getting booking details by id => /properties/getBooking/:id
router.get("/getBookings/:id",async(req,res)=>{
    try {
        const propertyData=await Booking.find({"property_id":req.params.id}).lean().exec()

        return res.send(propertyData)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports=router