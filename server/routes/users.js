const express = require ('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const path = require('path');
const multer = require('multer');
//const app = express();
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({storage: storage, fileFilter: filefilter});


router.route('/user')
.get(function(req,res){
    User.find(function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
            }
    });

  })
.post(upload.single('file'),async (req,res,next)=>{

    const model = new  User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        mobileNo:req.body.mobileNo,
        phoneNo:req.body.phoneNo,
        address:req.body.address,
          pic: req.file.originalname,
           filePath: req.file.path,

    });

      await model.save(function(err,data){
            if(err){
                res.send(err);
            }
            else{
                 res.send({data:"Record has been Inserted..!!"});
            }
        });
})
router.delete("/user/:id", function(req, res){
    User.deleteOne(
      {_id: req.params.id},
      function(err){
        if(!err){
          res.send("Successfully deleted the coressponding articles");
        }
        else{
          res.send(err);
        }
      }
    );
  });

router.post("/user/Updatedata",function(req,res){
   User.findByIdAndUpdate(req.body.id, {
     firstName:req.body.firstName,
     lastName:req.body.lastName,
     mobileNo:req.body.mobileNo,
     phoneNo:req.body.phoneNo,
     address:req.body.address,
      // pic: req.file.originalname,
      //  filePath: req.file.path,
       },
  function(err) {
   if (err) {
   res.send(err);
   return;
   }
   res.send({data:"Record has been Updated..!!"});
   });
  })

  // router.put('/user/:id', async function(req, res) {
  //  User.findByIdAndUpdate(
  //      {_id: req.params.id},
  //      {name: req.body.name, email: req.body.email,password:await sha512( req.body.password)},
  //      {overwrite: true},
  //      function(err){
  //        if(!err){
  //          res.send("Successfully updated");
  //        }
  //        else{
  //          res.send(err);
  //        }
  //      }
  //    );
  //  });


module . exports = router;
