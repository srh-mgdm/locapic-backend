var express = require('express');
var router = express.Router();

require('../models/connection');
const Place = require('../models/places');
const  { checkBody } = require('../modules/checkBody');


//Create new place in DB
router.post('/places', (req, res)=>{
    if(!checkBody(req.body,['name', 'nickname', 'latitude', 'longitude'])){ //بررسی کند که آیا فیلدهای اسم و ... موجود در بدنه درخواست موجودند وخالی نیستند
        return res.json({ result: false, error: 'Missing or empty fields' });
        return; // exist the route
    }
    const {nickname, name, latitude, longitude}=req.body;
    const newPlace = new Place({ nickname, name, latitude, longitude});

      newPlace.save()
     .then(() => {
            res.json({ result:true });
        });
  });

  //List of places by user nickname
  router.get('/places/:nickname', (req, res)=>{
    // search with regex to find places by nickname regardless of case
    Place.find({ nickname:{$regex : new RegExp(req.params.nickname, "i")} })
     .then(data => {
            res.json({ result:true, places: data });
        })

     })


  // Delete place from DB
  router.delete('/places', (req, res)=>{
    if(!checkBody(req.body,["name","nickname"])){
        return res.json({ result: false, error: 'Missing or empty fields' });
        return; // exist the route
    }
    const {nickname, name}=req.body;
    Place.deleteOne({ name, nickname:{$regex: new RegExp(req.body.nicknamen, "i")}})
    .then((deletedDoc) => {
      if (deletedDoc.deletedCount>0) {
        // document found and successfully deleted
        res.json({ result: true, deletedDoc})
      }else{
        res.json({ result: false, error: 'Place not found' });
      }

    })
  })






module.exports = router;
