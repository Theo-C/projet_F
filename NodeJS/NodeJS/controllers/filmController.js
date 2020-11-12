const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Film } = require('../models/film');

// => localhost:3000/film/
router.get('/', (req, res) => {
    Film.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Film :' + JSON.stringify(err, undefined, 2)); } 
        });
    });

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    Film.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Film :' + JSON.stringify(err, undefined, 2)); }
    });

});


router.post('/', (req, res) => {
    var fil = new Film({
        name: req.body.name,
        director: req.body.director,
        date: req.body.date,
        duration: req.body.duration,
        
    });

    console.log(fil)
    fil.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Film Save   :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

     var fil = {
        name: req.body.name,
        director: req.body.director,
        date: req.body.date,
        duration: req.body.duration,
            
    };

    Film.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Film Update :' + JSON.stringify(err, undefined, 2)); }
    });

});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    Film.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Film Delete :' + JSON.stringify(err, undefined, 2)); }
    });

});

module.exports = router;    