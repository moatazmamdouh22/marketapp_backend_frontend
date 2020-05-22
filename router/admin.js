const express = require('express');
const router = express.Router();
const userObj = require('../Models/user');
const categoryObj = require('../Models/Category');
var fs = require('fs-extra');
var nodemailer = require('nodemailer');
var formidable = require('formidable');
const termsObj = require('../Models/termsPolicy');
const employeeObj = require('../Models/employee');
const auctionObj = require('../Models/auction');
const contactUsObj = require('../Models/contactUS');
const notifyObj = require('../Models/notify');
const subscripeObj = require('../Models/subscripe');

const ADSObj = require('../Models/ADS');
var path = require('path');
var FCM = require('fcm-node');
var serverKey = 'AAAAJzby3mE:APA91bFj9xARC9_qg7USwc_iBFBmw1z1xZ43gtUAIYcdxjO40WvqRKRVieoFlCXyJHS94nj5FIw4UUsj0o73B-dhHPmn9FgU9thbFpHP8eIB5m2_RghXIDophgdaYpAolMmp_lM679pR'; //put your server key here
var fcm = new FCM(serverKey);

// register
router.post('/register', function (req, res, next) {
  userObj.create(req.body).then(function (data) {
    console.log(data);
    res.status(200).send(data);
  }).catch(next);
});
// get total cars  ...
router.get('/totalAppsAccepted', function (req, res, next) {
  auctionObj.find({ status: 2 }, {})
    .then(function (data) {
      var totalPlaces = data.length;
      res.status(200).send({ 'message': totalPlaces });
    });
});
router.get('/totalUsers', function (req, res, next) {
  userObj.find({}, {})
    .then(function (data) {
      var totalPlaces = data.length;
      res.status(200).send({ 'message': totalPlaces });
    });
});
router.get('/totalApps', function (req, res, next) {
  auctionObj.find({}, {})
    .then(function (data) {
      var totalPlaces = data.length;
      res.status(200).send({ 'message': totalPlaces });
    });
});
router.get('/totalCategories', function (req, res, next) {
  categoryObj.find({}, {})
    .then(function (data) {
      var totalPlaces = data.length;
      res.status(200).send({ 'message': totalPlaces });
    });
});

// category
router.get('/category', function (req, res, next) {
  categoryObj.find({}, {})
    .sort([['createdAt', -1]])
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });
});
// add category
router.post('/category', function (req, res, next) {
  categoryObj.create(req.body).then(function (data) {
    res.status(200).send(data);
  }).catch(next);
});
router.post('/ads', function (req, res, next) {
  ADSObj.create(req.body).then(function (data) {
    res.status(200).send(data);
  }).catch(next);
});
// category
router.get('/ads', function (req, res, next) {
  ADSObj.find({}, {})
    .sort([['createdAt', -1]])
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });
});
// get all contactus
router.get('/contactus', function (req, res, next) {
  contactUsObj.find({}, {})
    .populate({ path: 'userID' })
    .sort([['createdAt', -1]])
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });
});

// category 
router.get('/adsById', function (req, res, next) {
  ADSObj.findOne({ _id: req.query.id }, {})
    .then(function (user) {
      res.status(200).send(user);
    }).catch(next);
});

// category 
router.get('/categoryById', function (req, res, next) {
  categoryObj.findOne({ _id: req.query.id }, {})
    .then(function (user) {
      res.status(200).send(user);
    }).catch(next);
});

router.put('/category/:id', function (req, res, next) {
  categoryObj.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function (data) {
      categoryObj.findOne({ _id: req.params.id }).then(function (data2) {
        console.log(data2);
        return res.status(200).send(data2);
      }).catch(next);
    });
});
// update user
router.put('/ads/:id', function (req, res, next) {
  ADSObj.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function (data) {
      ADSObj.findOne({ _id: req.params.id }).then(function (data2) {
        console.log(data2);
        return res.status(200).send(data2);
      }).catch(next);
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
router.get('/userById', function (req, res, next) {
  userObj.findOne({ _id: req.query.id }, {})
    .then(function (user) {
      res.status(200).send(user);
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

router.get('/getTerms', function (req, res, next) {
  termsObj.find({ type: 1 }, {})
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });

});
// get all about .....
router.get('/getAboutApp', function (req, res, next) {
  termsObj.find({ type: 2 }, {})
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });
});
router.post('/terms', function (req, res, next) {
  termsObj.create(req.body).then(function (data) {
    res.status(200).send(data);
  }).catch(next);
});
router.put('/terms/:id', function (req, res, next) {
  termsObj.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function (data) {
      termsObj.findOne({ _id: req.params.id }).then(function (data2) {
        console.log(data2);
        return res.status(200).send(data2);
      }).catch(next);
    });
});
router.get('/termsById', function (req, res, next) {
  termsObj.findOne({ _id: req.query.id }, {})
    .then(function (user) {
      res.status(200).send(user);
    }).catch(next);
});

router.post('/employee', function (req, res, next) {
  employeeObj.create(req.body).then(function (data) {
    res.status(200).send(data);
  }).catch(next);
});
router.put('/employee/:id', function (req, res, next) {
  employeeObj.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function (data) {
      employeeObj.findOne({ _id: req.params.id }).then(function (data2) {
        console.log(data2);
        return res.status(200).send(data2);
      }).catch(next);
    });
});

// add terms
router.post('/addTerms', function (req, res, next) {
  termsObj.create(req.body).then(function (data) {
    console.log(data);
    res.status(200).send(data);
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
  employeeObj.findOne(data, {})
    .then(function (user) {
      if (user == null) {
        employeeObj.findOne(data2, {})
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
            res.status(200).send(user);
          }
        }
      }
    }).catch(next);
});
router.post('/requestAuction', function (req, res, next) {
  auctionObj.create(req.body).then(function (data) {
    res.status(200).send(data);
  }).catch(next);
});
router.get('/users', function (req, res, next) {
  userObj.find({}, {})
    .populate({ path: 'categoryID' })
    .sort([['createdAt', -1]])
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    });
});

router.get('/getSubscriptionsByUser', function (req, res, next) {
  subscripeObj.find({ userID: req.query.userID }, {})
    .sort([['subscriptionPrice', -1]])
    .populate({ path: 'auctionID' })
    .then(function (data) {
      res.status(200).send(data);
    });
});
router.get('/getUsersSubscriptions', function (req, res, next) {
  subscripeObj.find({ auctionID: req.query.auctionID ,status:1}, {})
    .populate({ path: 'userID' })
    .populate({ path: 'auctionID' })
    .then(function (data) {
      res.status(200).send(data);
    });
});

router.put('/subscription/:id', function (req, res, next) {
  subscripeObj.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function (data) {
      subscripeObj.findOne({ _id: req.params.id }).then(function (data2) {
        console.log(data2);
        subscripeObj.findOne({ auctionID: req.body.auctionID, status: 1 }, { subscriptionPrice: true })
          .sort({ subscriptionPrice: -1 }).limit(1)
          .then(function (data) {

            auctionObj.findOne({
              _id: req.body.auctionID
            }).then(function (data2) {
              console.log(data2)
              var obj = {
                highestPrice: data.subscriptionPrice
              }
              auctionObj.findByIdAndUpdate({ _id: req.body.auctionID }, obj)
                .then(function (data) {
                  auctionObj.findOne({ _id: req.body.auctionID }).then(function (data2) {
                    console.log(data2);
                  }).catch(next);
                })
            })

          });
        return res.status(200).send(data2);
      }).catch(next);
    });
});

router.post('/subscription', function (req, res, next) {

  subscripeObj.findOne({ userID: req.body.userID, auctionID: req.body.auctionID }, {})
    .then(function (data) {
      console.log(data);
      if (data != null) {
        // return res.status(422).json({ 'message': 'user is already subscripe this app' });
        if (data.status == 3 || data.status == 2) {
          // return res.status(422).json({ 'message': 'user is already subscripe this app' });
          var obj = {
            status : 1,
            subscriptionPrice: req.body.subscriptionPrice,
          }
          subscripeObj.findByIdAndUpdate({ _id: data._id }, obj)
          .then(function (data) {
            subscripeObj.findOne({ _id: req.params.id }).then(function (data2) {
              console.log(data2);
              subscripeObj.findOne({ auctionID: req.body.auctionID, status: 1 }, { subscriptionPrice: true })
                .sort({ subscriptionPrice: -1 }).limit(1)
                .then(function (data) {
      
                  auctionObj.findOne({
                    _id: req.body.auctionID
                  }).then(function (data2) {
                    console.log(data2)
                    var obj = {
                      highestPrice: data.subscriptionPrice
                    }
                    auctionObj.findByIdAndUpdate({ _id: req.body.auctionID }, obj)
                      .then(function (data) {
                        auctionObj.findOne({ _id: req.body.auctionID }).then(function (data2) {
                          console.log(data2);
                        }).catch(next);
                      })
                  })
                });
              return res.status(200).send(data2);
            }).catch(next);
          });
              }else{
            return res.status(422).json({ 'message': 'user is already subscripe this app' });
        } 
  
      } 
      else {
        userObj.findOne({
          _id: req.body.userID
        }, {})
          .then(function (user) {
            if (user == null) {
              res.status(401).json({
                message: 'user not found.'
              });
            } else {
              auctionObj.findOne({
                _id: req.body.auctionID
              }, {})
                .then(function (auction) {
                  if (auction == null) {
                    res.status(401).json({
                      message: 'app not found.'
                    });
                  } else {
                    if (auction.isInsurance == 1) { // have insurance
                      if (parseInt(user.userCredit) >= parseInt(auction.insurance) && parseInt(req.body.subscriptionPrice) >= parseInt(auction.startPrice)) {
                        var obj = {
                          auctionID: req.body.auctionID,
                          userID: req.body.userID,
                          subscriptionPrice: req.body.subscriptionPrice,
                        }
                        subscripeObj.create(obj).then(function (data) {

                          subscripeObj.findOne({ auctionID: req.body.auctionID }, { subscriptionPrice: true })
                            .sort({ subscriptionPrice: -1 }).limit(1)
                            .then(function (data) {
                              auctionObj.findOne({
                                _id: req.body.auctionID
                              }).then(function (data2) {
                                console.log(data2)
                                var obj = {
                                  highestPrice: data.subscriptionPrice
                                }
                                auctionObj.findByIdAndUpdate({ _id: req.body.auctionID }, obj)
                                  .then(function (data) {
                                    auctionObj.findOne({ _id: req.body.auctionID }).then(function (data2) {
                                      console.log(data2);
                                    }).catch(next);
                                  })
                              })

                            });
                          res.status(200).send(data);
                        }).catch(next);
                      } else {
                        res.status(401).json({
                          message: "your don't have enough credit to join Subscription ."
                        });
                      }
                    } else if (auction.isInsurance == 2) { // don't have insurance

                      if (parseInt(req.body.subscriptionPrice) >= parseInt(auction.startPrice)) {
                        var obj = {
                          auctionID: req.body.auctionID,
                          userID: req.body.userID,
                          subscriptionPrice: req.body.subscriptionPrice,
                        }
                        subscripeObj.create(obj).then(function (data) {

                          subscripeObj.findOne({ auctionID: req.body.auctionID }, { subscriptionPrice: true })
                            .sort({ subscriptionPrice: -1 }).limit(1)
                            .then(function (data) {
                              auctionObj.findOne({
                                _id: req.body.auctionID
                              }).then(function (data2) {
                                console.log(data2)
                                var obj = {
                                  highestPrice: data.subscriptionPrice
                                }
                                auctionObj.findByIdAndUpdate({ _id: req.body.auctionID }, obj)
                                  .then(function (data) {
                                    auctionObj.findOne({ _id: req.body.auctionID }).then(function (data2) {
                                      console.log(data2);
                                    }).catch(next);
                                  })
                              })
                              userObj.findOne({
                                _id: req.body.userID
                              }).then(function (data4) {
                                console.log(data4)
                                var obj = {
                                  userCredit: data4.userCredit - auction.insurance
                                }
                                console.log("obj", obj);
                                userObj.findByIdAndUpdate({ _id: req.body.userID }, obj)
                                  .then(function (data6) {
                                    userObj.findOne({ _id: req.body.userID }).then(function (data5) {
                                      console.log(data5);
                                    }).catch(next);
                                  })
                              })

                            });
                          res.status(200).send(data);
                        }).catch(next);
                      } else {
                        res.status(401).json({
                          message: "your don't have enough credit to join Subscription ."
                        });
                      }
                    }
                  }
                }).catch(next);
            }
          }).catch(next);

      }
    }).catch(next);

});

router.post('/user', function (req, res, next) {
  userObj.create(req.body).then(function (data) {
    res.status(200).send(data);
  }).catch(next);
});
// router.put('/user/:id', function (req, res, next) {
//   userObj.findByIdAndUpdate({ _id: req.params.id }, req.body)
//     .then(function (data) {
//       userObj.findOne({ _id: req.params.id }).then(function (data2) {
//         console.log(data2);
//         return res.status(200).send(data2);
//       }).catch(next);
//     });
// });
router.get('/delete', function (req, res, next) {
  subscripeObj.find({userID: '5db70866c8630a4884bff103'}).remove().exec(
    res.status(200).send({ 'message': 'done' })
  );
});


router.get('/requestAuction', function (req, res, next) {
  auctionObj.find({}, {})
    .populate({ path: 'userID' })
    .sort([['createdAt', -1]])
    .then(function (data) {
      res.status(200).send(data);
    });
});
router.get('/requestAuctionAccept', function (req, res, next) {
  auctionObj.find({ status: 2 }, {})
  .populate({ path: 'categoryID' })
    .sort([['createdAt', -1]])
    .then(function (data) {
      res.status(200).send(data);
    });
});
router.get('/requestAuctionReject', function (req, res, next) {
  auctionObj.find({ status: 3 }, {})
    .sort([['createdAt', -1]])
    .then(function (data) {
      res.status(200).send(data);
    });
});
router.get('/getrequestAuctionByID', function (req, res, next) {
  auctionObj.findOne({ _id: req.query.id }, {})
  .populate({ path: 'categoryID' })
    .then(function (data) {
      res.status(200).send(data);
    });
});

router.put('/requestAuction/:id', function (req, res, next) {
  auctionObj.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function (data) {
      auctionObj.findOne({ _id: req.params.id }).then(function (data2) {
        console.log(data2);
        return res.status(200).send(data2);
      }).catch(next);
    });
});

router.get('/getUsersSubscriptionsUserKeys', function (req, res, next) {
  subscripeObj.find({ auctionID: req.query.auctionID}, {})
    .populate({ path: 'userID', select: 'userKey' })
    .then(function (data) {
      res.status(200).send(data);
    });
});


router.get('/getAllUsersByUserKeys', function (req, res, next) {
  userObj.find({ userKey: { $ne: null } }, {})
    .then(function (data) {
      res.status(200).send(data);
    });
});

router.get('/getAllNotification', function (req, res, next) {
  notifyObj.find({userID:req.query.userID}, {})
  .sort([['createdAt', -1]])
  .populate({ path: 'userID'})
  .populate({ path: 'subscripeID', populate: { path: 'userID' } })
  .populate({ path: 'subscripeID', populate: { path: 'auctionID' } })
  .populate({ path: 'auctionID'})
    .then(function (data) {
      res.status(200).send(data);
    });
});
router.get('/getAllNotificationaaa', function (req, res, next) {
  notifyObj.find({}, {})
  .sort([['createdAt', -1]])
  .populate({ path: 'subscripeID', populate: { path: 'userID' } })
  .populate({ path: 'subscripeID', populate: { path: 'auctionID' } })
  .populate({ path: 'auctionID'})
    .then(function (data) {
      res.status(200).send(data);
    });
});

// router.get('/delete', function (req , res,next){
//   notifyObj.find({}).remove().exec(
//       res.status(200).send({'message':'delete'})
//       );
//   });

  // router.post('/postNotify', function (req, res, next) {
  //   subscripeObj.find({ auctionID: req.body.auctionID}, {})
  //     .then(function (data) {
  //       console.log(data);
  //       var array = []
  //       for (let index = 0; index < data.length; index++) {
  //         if (data[index].userID.userKey){
  //           array.push({userKey:data[index].userID.userKey,userID:data[index].userID,auctionID:data[index].auctionID,_id:data[index]._id});
  //         }
  //         }
  //         console.log(array);
  //       for (let i = 0; i < array.length; i++) {
  //         var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //           to: data[i],
  //           collapse_key: '123',
  //           notification: {
  //             title: 'Market',
  //             body: "you subscriped App"
  //           },
  //         };
  //         var obj = {
  //           msgAR: "you subscriped App",
  //           subscripeID: data[i]._id,
  //           msg: "you subscriped App",
  //           type: 1,
  //           auctionID: data[i].auctionID,
  //           userID: data[i].userID
  //         }
  //         notifyObj.create(obj).then(function (data) {
  //           console.log(data);
  //         })
  //         fcm.send(message, function (err, response) {
  //           if (err) {
  //             console.log("Something has gone wrong!");
  //             // res.status(200).send({message:'done'});
  //           } else {
  //             console.log("Done");
  //           }
  //         });
  //       }
  //     });
  // });
  
  

router.post('/sendNotificationToGroupUsers', function (req, res, next) {
  for (let index = 0; index < req.body.keys.length; index++) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: req.body.keys[index],
      collapse_key: '123',
      notification: {
        title: 'Market',
        body: req.body.msg
      },
    };
    var obj = {
      msgAR: req.body.msgAR,
      subscripeID: req.body.subscripeID,
      msg: req.body.msg,
      type: req.body.type,
      auctionID: req.body.auctionID,
      userID: req.body.ids[index]
    }
    notifyObj.create(obj).then(function (data) {
      // res.status(200).send(data);

    })
    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!");
        // res.status(200).send({message:'done'});
      } else {
        console.log("Done");
      }
    });
  }
  res.status(200).send({ message: 'done' });
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