const express = require('express');
const router = express.Router();
const userObj = require('../Models/user');
const categoryObj = require('../Models/Category');
const auctionObj = require('../Models/auction');
var fs = require('fs-extra');
const termsObj = require('../Models/termsPolicy');
const contactUsObj = require('../Models/contactUS');
const ADSObj = require('../Models/ADS');
const subscripeObj = require('../Models/subscripe');
var nodemailer = require('nodemailer');
var formidable = require('formidable');
var path = require('path');
var FCM = require('fcm-node');
var serverKey = 'AAAAr7xHzv4:APA91bHxKpnVJ5PqSy1E89CLbaqcRyP7uaKl2ux3aNz1pdOus_Pmk319S1SP6WOyuM5gW6NIDF3U0wpl1i8dzaEAgvm8BsFmQSIsatb8CyDN7Qhc4NpgTPR16WEpjSod5PiV1ZnRN6W7';
var fcm = new FCM(serverKey);
// register
router.post('/register', function (req, res, next) {
  var customer = new userObj(req.body);
  userObj.findOne({ email: customer.email }, {})
    .then(function (data) {
      console.log(data);
      if (data != null) {
        return res.status(422).json({ 'message': 'sorry is email exsist' });
      }
      else {
        userObj.findOne({ mobile: customer.mobile }, {})
          .then(function (data) {
            console.log(data);
            if (data != null) {
              return res.status(422).json({ 'message': 'sorry is mobile exsist' });
            }
            else {
              userObj.create(customer).then(function (data) {
                console.log(data);
                res.status(200).send(data);
              });
            }
          }).catch(next);
      }
    }).catch(next);
});


// category
router.get('/category', function (req, res, next) {
  categoryObj.find({ status: 1 }, {})
    .sort([['createdAt', -1]])
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });
});

router.get('/getAds', function (req, res, next) {
  ADSObj.find({ status: 1 }, {})
    .sort([['createdAt', -1]])
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });
});
router.get('/userByID', function (req, res, next) {
  userObj.findOne({ _id: req.query.id }, {})
    .populate({ path: 'categoryID' })
    .then(function (data) {
      res.status(200).send(data);
    });
});

// update user
router.put('/user/:id', function (req, res, next) {
  userObj.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function (data) {
      userObj.findOne({ _id: req.params.id }).then(function (data2) {
        console.log(data2);
        return res.status(200).send(data2);
      }).catch(next);
    });
});
// get terms and condation .....
router.get('/getTerms', function (req, res, next) {
  termsObj.find({ type: 1 }, { _id: true, titleAr: true, titleEN: true })
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });
});
// get about app .....
router.get('/getAboutApp', function (req, res, next) {
  termsObj.find({ type: 2 }, { _id: true, titleAr: true, titleEN: true })
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });
});

router.post('/addContactUS', function (req, res, next) {
  var contactUs = new contactUsObj(req.body);
  contactUsObj.create(contactUs).then(function (data) {
    console.log(data);
    res.status(200).send(data);
  }).catch(next);
});

// forget password
router.get('/forgetPassword', function (req, res, next) {
  userObj.findOne({ email: req.query.email }, {})
    .then(function (user) {
      console.log(user);
      if (user == null) {
        res.status(401).json({ message: 'User not found.' });
      }
      else {
        var mailOptions = {
          from: 'marketappmob@gmail.com',
          to: user.email,
          subject: 'market App -  Password reset',
          text: 'Here is your last password ' + user.password + ' Kindly be noted that it is better to reedit your password from the app settings to keep your own privacy safe  \n  ها هى كلمة المرور السابقة: ' + user.password + '           يرجى العلم بانه من الأفضل أن تقوم بتعديل كلمة المرور من أعدادات التطبيق للحفاظ على أمان خصوصيتك'
        };
        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'marketappmob@gmail',
            pass: 'market2019'
          }
        });
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'DONE' });
          }
        });
      }
    }).catch(next);
});

// login ...
router.get('/login', function (req, res, next) {
  var data = {
    email: req.query.val
  }
  var data2 = {
    mobile: req.query.val
  }
  userObj.findOne(data, {})
    .then(function (user) {
      if (user == null) {
        userObj.findOne(data2, {})
          .then(function (user2) {
            if (user2 == null) {
              console.log('user not found');
              res.status(401).json({ message: 'Authentication failed. User not found.' });
            }
            else if (user2) {
              if (user2.password != req.query.password) {
                console.log('password worng !!!');
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
              }

              else {
                if (user2.status == 2) {
                  console.log("user suspend");
                  res.status(401).json({ message: 'this account is suspend !!!' });
                }
                else {
                  console.log(user2);
                  res.status(200).send(user2);
                  //return res.json({token: jwt.sign({ email: user.email, fullName: user.fullname, _id: user._id}, 'RestApi')});
                }
              }
            }

          }).catch(next);
        // console.log('user not found');
        // res.status(401).json({ message: 'Authen  tication failed. User not found.' });
      } else if (user) {
        // if (!user.comparePassword(req.query.password)) {
        if (user.password != req.query.password) {
          console.log('worng password !!!!');

          res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        else {
          if (user.status == 2) {
            console.log("user suspend");
            res.status(401).json({ message: 'this account is suspend !!!' });
          }
          else {
            console.log(user);
            var obj = { userKey: req.query.userKey }
            userObj.findByIdAndUpdate({
              _id: user._id
            }, obj)
              .then(function (data) {
                userObj.findOne({
                  _id: user._id
                }).then(function (user3) {
                  console.log(user3);
                  return res.status(200).send(user3);
                }).catch(next);
              });
          }
        }
      }
    }).catch(next);
});
// add app to acution
router.post('/requestAuction', function (req, res, next) {
  auctionObj.create(req.body).then(function (data) {
    res.status(200).send(data);
  }).catch(next);
});

// 

router.get('/isSubscripe', function (req, res, next) {
  subscripeObj.findOne({ userID: req.query.userID, auctionID: req.query.auctionID }, {})
    .then(function (data) {
      console.log(data);
      if (data == null) {
        return res.status(422).json({ message: -1 });
      } else {
        return res.status(200).json({ message: data.status, record: data.subscriptionPrice, id: data._id });
      }
    });
});



router.get('/requestAuction', function (req, res, next) {
  var pageOptions = {
    page: req.query.page || 0,
    limit: parseInt(req.query.limit) || 5
  }
  auctionObj.find({ status: 2 }, {})
    .sort([['createdAt', -1]])
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .then(function (data) {
      res.status(200).send(data);
    });

});
router.get('/getrequestAuctionByID', function (req, res, next) {
  auctionObj.findOne({ _id: req.query.id }, {})
    .populate({ path: 'categoryID' })
    .then(function (user) {
      res.status(200).send(user);
    }).catch(next);
});

// upload file to server .
router.post('/uploadFile', function (req, res, next) {

  var form = new formidable.IncomingForm();
  //Formidable uploads to operating systems tmp dir by default
  form.uploadDir = "./public/uploadFiles";       //set upload directory
  form.keepExtensions = true;     //keep file extension

  form.parse(req, function (err, fields, files) {
    console.log("file uploaded Completely ");
    var fileUploaded = files[Object.keys(files)[0]];

    res.send("http://" + req.headers.host + "/uploadFiles/" + path.basename(fileUploaded.path));
  });
});
module.exports = router;