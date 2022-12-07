const express = require('express');
const mongoose = require('mongoose');
const conn = require('./db.js');
const Category = require('./schema.js');

const app = express();
app.use(express.json());

app.post('/upload', function (req, res) {
    Category.create(req.body, (err, result) => {
        if (err) {
            let obj = { "status": 0, "data": err }
            res.send(obj)
        } else {
            let obj = { "status": 1, "data": result }
            res.send(obj)
        }
    });
});

app.get('/download/:_id', function (req, res) {
    Category.find({ "_id": mongoose.Types.ObjectId(req.params._id) }, async (err, result) => {
        if (err) {
            let obj = { "status": 0, "data": err }
            res.send(obj)
        } else if (result.length == 0 || result == null) {
            subCatInfo = await Category.find({ "subCatInfo._id": mongoose.Types.ObjectId(req.params._id) }).exec();
            if (subCatInfo.length == 0 || subCatInfo == null) {
                childCatInfo = await Category.find({ "childCatInfo._id": mongoose.Types.ObjectId(req.params._id) }).exec();
                let obj = { "status": 1, "data": childCatInfo[0].childCatInfo }
                res.send(obj)
            } else {
                let obj = { "status": 1, "data": subCatInfo[0].subCatInfo }
                res.send(obj)  
            }
        } else {
            let obj = { "status": 1, "data": result }
            res.send(obj)
        }
    });
})


var server = app.listen(3000, function () {
    console.log("Server started on port: 3000");
});
