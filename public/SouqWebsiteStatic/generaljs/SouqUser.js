
(function () {


    angular.module('souqUser', ['ngCookies', 'ngRoute'])
        .filter('cmdate', [
            '$filter', function ($filter) {
                return function (input, format) {
                    return $filter('date')(new Date(input), format);
                };
            }
        ])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when("/HomeDefault", {
                    templateUrl: "http://localhost:1337/html/home.html",
                    controller: "HomeCtrl"
                })
                .when("/Home", {
                    templateUrl: "http://localhost:1337/html/home.html",
                    controller: "HomeCtrl"
                })

                .when("/profile", {
                    templateUrl: "http://localhost:1337/html/profile.html",
                    controller: "profileCtrl"
                })

                .when("/contactUs", {
                    templateUrl: "http://localhost:1337/html/contactUs.html",
                    controller: "contactUsCtrl"
                })
              
                
                
                
                .otherwise({ redirectTo: 'HomeDefault' });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

        })
        .controller("HomeCtrl", function ($scope, $http, $cookieStore, $rootScope, $location, $window) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');

            if ($rootScope.souqLang = $cookieStore.get('souqLang')) {
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");

                } else {

                    $cookieStore.put('souqLang', 'en')
                    $rootScope.souqLang = $cookieStore.get('souqLang');
                    $('body').css("direction", "ltr");

                }
            }
            if ($rootScope.souqUserID == undefined) {
                alert('قم بالتسجيل أولا !!');
                $window.open("http://localhost:1337/html/index.html", "_self");
            }


            $rootScope.souqUserHomeView = 1;


            $rootScope.changeLang = function (lang) {
                $cookieStore.put('souqLang', lang);
                $rootScope.souqLang = $cookieStore.get('souqLang');
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");
                    $rootScope.changeCoverItems()
                } else {
                    $('body').css("direction", "ltr");
                    $rootScope.changeCoverItems()

                }
                $rootScope.slideNavActiveLink($rootScope.slideNavId)
            }


            $rootScope.changeCoverItems = function (item, lang) {
                if (item == "sidebarCollapsear") {
                    $('#sidebarar').toggleClass('activeSidebarar');
                }
                if (item == "sidebarCollapseen") {
                    $('#sidebar').toggleClass('activeSidebaren');
                }

                // Get Login Form EN & AR
                if (item == "loginCollapseOuten") {
                    $('.loginCollapseen').toggleClass('activeLoginen');
                }
                if (item == "loginCollapseOutar") {
                    $('.loginCollapsear').toggleClass('activeLoginar');
                }


            }
            $rootScope.changeCoverItems()
            $rootScope.alertMessageLang = function (msgAr, msgEn, lang) {
                if (lang == 'ar') {
                    alert(msgAr);
                } else {
                    alert(msgEn);
                }

            }
                     


            $rootScope.logOut = function () {
                $cookieStore.remove('souqUser');
                $cookieStore.remove('souqUserID');
                $rootScope.alertMessageLang(
                    " ! تم تسجيل الخروج بنجاح  ",
                    " you has been loged out ! ",
                    $rootScope.souqLang
                )

                $window.open("http://localhost:1337/html/index.html", "_self");
                //$window.open("/Website/html/home.html", "_self");
            }
            $rootScope.slideNavActiveLink = function (slideNavId) {
                //console.log(slideNavId);
                $rootScope.slideNavId = slideNavId;
                setTimeout(() => {
                    $('.slideNav li').removeClass('active');
                    $('#' + slideNavId).addClass('active');
                }, 500);
            }
            $rootScope.slideNavActiveLink('Home');

        })

       
        .controller("profileCtrl", function ($rootScope, $scope, $http, $cookieStore, $rootScope, $window, $location) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            if ($rootScope.souqLang = $cookieStore.get('souqLang')) {
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");

                } else {

                    $cookieStore.put('souqLang', 'en')
                    $rootScope.souqLang = $cookieStore.get('souqLang');
                    $('body').css("direction", "ltr");

                }
            }
            if ($rootScope.souqUserID == undefined) {
                $rootScope.alertMessageLang(
                    'قم بالتسجيل أولا !!',
                    'please sign In first !!',
                    $rootScope.souqLang
                    
                    );
                $window.open("http://localhost:1337/html/index.html", "_self");
            }
            $rootScope.slideNavActiveLink('profile');
            $scope.user = {
                personalImg : "http://localhost:1337/images/Capture.png",
                licenseImg : "http://localhost:1337/images/Capture.png",
                nationalIdImg : "http://localhost:1337/images/Capture.png",
                uploadCount : 0
            }

            $scope.getAllCountries = function () {
                $http.get("http://134.209.178.237/api/user/country")
                    .then(function (response) {
                        $scope.countries = response.data;
                        $scope.getCurrentUser();
                    }, function (response) {
                        //alert("Error !!");
                    })
            }
            $scope.getAllCountries()
            $scope.getCurrentUser = function () {
                $http.get("http://134.209.178.237/api/admin/getuserByID?id=" + $rootScope.souqUserID)
                    .then(function (response) {
                        $scope.user = response.data;
                        $scope.user.personalImg = response.data.personalImg;
                        $scope.user.licenseImg = response.data.licenseImg;
                        $scope.user.nationalIdImg = response.data.nationalIdImg;
                        //$('#genderid' + response.data.gender  ).prop('checked',true);
                       // $('input:radio[name="gender"]').filter('[value='+response.data.gender+']').attr('checked', true);

                        if ($scope.user.countryID._id &&$scope.user.cityID._id) {
                            $scope.countryid = response.data.countryID._id;
                            $scope.getCityByCountryID($scope.countryid);

                        }
                    }, function (response) {
                        //alert("حدث خطا ما !! ");
                        }
                    )
            }
            $scope.getAllCountries()
            

            $scope.changePic = function (num) {
                if (num == 1) {
                        $scope.img1_wait = true;
                        if ($('#img1').val() != null) {
                            var formData = new FormData();
                            var fileimg1 = $('#img1')[0];
                            formData.append('file', fileimg1.files[0]);
                           
                                $http({
                                    url: "http://165.22.127.119/api/user/uploadFile",
                                    method: "POST",
                                    data: formData,
                                    headers: { 'Content-Type': undefined },
                                    processData: false,
                                }).then(function (response) {
                                    //alert("done")
                                    $scope.user.personalImg = response.data;
                                    //console.log($scope.user.personalImg);
                                       
                                        $scope.user.uploadCount +=1;
                                        $scope.img1_wait = false;
                                        //console.log($scope.user.uploadCount);
                                    // here
                                }, function (response) {
                                    $rootScope.alertMessageLang(
                                        "حدث خطأ ما أثناء تحميل الصورة  !!  ",
                                        "something wrong happened while uploading pic !!",
                                        $rootScope.souqLang
                                    )
                                    $scope.img1_wait = false;
                                   
                                })
                           
                           
                        }
                    
                }
                if (num == 2) {
                    $scope.img2_wait = true;
                        if ($('#img2').val() != null) {
                            var formData = new FormData();
                            var fileimg2 = $('#img2')[0];
                            formData.append('file', fileimg2.files[0]);
                           
                                $http({
                                    url: "http://165.22.127.119/api/user/uploadFile",
                                    method: "POST",
                                    data: formData,
                                    headers: { 'Content-Type': undefined },
                                    processData: false,
                                }).then(function (response) {
                                    //alert("done")
                                    $scope.user.licenseImg = response.data;
                                    //console.log($scope.user.licenseImg);
                                    $scope.user.uploadCount +=1;
                                    $scope.img2_wait = false;
                                    //console.log($scope.user.uploadCount);
                                   
                                    
                                    // here
                                }, function (response) {
                                    $rootScope.alertMessageLang(
                                        "حدث خطأ ما أثناء تحميل الصورة  !!  ",
                                        "something wrong happened while uploading pic !!",
                                        $rootScope.souqLang
                                    )
                                    $scope.img2_wait = false;
                                })
                           
                           
                        }
                    
                }
                if (num == 3) {
                    $scope.img3_wait = true;
                        if ($('#img3').val() != null) {
                            var formData = new FormData();
                            var fileimg3 = $('#img3')[0];
                            formData.append('file', fileimg3.files[0]);
                           
                                $http({
                                    url: "http://165.22.127.119/api/user/uploadFile",
                                    method: "POST",
                                    data: formData,
                                    headers: { 'Content-Type': undefined },
                                    processData: false,
                                }).then(function (response) {
                                    //alert("done")
                                    $scope.user.nationalIdImg = response.data;
                                    //console.log($scope.user.nationalIdImg);
                                    $scope.user.uploadCount +=1;
                                    $scope.img3_wait = false;
                                    //console.log($scope.user.uploadCount);

                                }, function (response) {
                                    $rootScope.alertMessageLang(
                                        "حدث خطأ ما أثناء تحميل الصورة  !!  ",
                                        "something wrong happened while uploading pic !!",
                                        $rootScope.souqLang
                                    )
                                    $scope.img3_wait = false;
                                })
                           
                           
                        }
                    
                }
               

            }


            $scope.getCityByCountryID = function (countryID) {

                $http.get("http://134.209.178.237/api/user/city?id=" + countryID)
                    .then(function (response) {
                        $scope.cityID = response.data;
                    }, function (response) {
                        //alert("Error !!");
                    })
            }



           


            $scope.updateUserInfo = function () {
                var userInfo = {
                    fullname: $("#fullnameid").val(),
                    mobile: $("#mobileid").val(),

                    countryID: $("#countryid").val(),
                    cityID: $("#cityid").val(),
                    email: $("#emailid").val(),

                    birthday: $("#birthdayid").val(),
                    personalImg: $scope.user.personalImg,
                    licenseImg: $scope.user.licenseImg,
                    nationalIdImg: $scope.user.nationalIdImg,
                    gender: $('input[name=gender]:checked').val()
                }

                if (userInfo.gender != "0") {
                    if (userInfo.gender != "1") {

                        $rootScope.alertMessageLang(
                            "يرجى اختيار الجنس   !  ",
                            "Kindly choose gender  !",
                            $rootScope.souqLang
                        )
                        return;

                    }

                }
                if (userInfo.gender != "1") {
                    if (userInfo.gender != "0") {

                        $rootScope.alertMessageLang(
                            "يرجى اختيار الجنس   !  ",
                            "Kindly choose gender  !",
                            $rootScope.souqLang
                        )
                        return;

                    }
                }

                var today = new Date();
                var birthday = new Date(userInfo.birthday);

                var diff = today.getMonth() - birthday.getMonth() +
                    (12 * (today.getFullYear() - birthday.getFullYear()))
                //console.log(diff);
                if (diff < 216) {
                    $rootScope.alertMessageLang(
                        "يجب ان يكون السن أكبر من 18  ",
                        "Age must be greater than 18 ",
                        $rootScope.souqLang
                    )
                    return;
                }



                $http.put("http://134.209.178.237/api/admin/user/" + $rootScope.souqUserID, userInfo)
                    .then(function (response) {
                        $rootScope.alertMessageLang(
                            "تم تعديل الملف الشخصى بنجاح ",
                            "your file has been updated successfully",
                            $rootScope.souqLang
                        )
                        $scope.getCurrentUser();
                        //$location.path("/profile/", "_self");
                    }, function (response) {
                        //alert("Error !");
                    })
            }


            $scope.editPass = function () {

                var changePassObj = {
                    oldPass: $("#oldPass").val(),
                    password: $("#passwordid").val(),
                    confirmPassword: $("#confirmPasswordid").val()
                }
                //console.log(changePassObj);
                if (changePassObj.oldPass != $scope.user.password) {
                    $rootScope.alertMessageLang(
                        "الباسورد القديم غير متوافق !  ",
                        "Wrong old password",
                        $rootScope.souqLang
                    )
                    return;
                }
                if (changePassObj.password.length < 6) {
                    $rootScope.alertMessageLang(
                        "الباسورد يجب ان يكون 6 حروف/ أرقام  !  ",
                        "password must be at least 6 characters / numbers ",
                        $rootScope.souqLang
                    )
                    return;
                }
                if (changePassObj.password != changePassObj.confirmPassword) {
                    $rootScope.alertMessageLang(
                        "الباسورد غير متوافق  !  ",
                        "New Password not compatible",
                        $rootScope.souqLang
                    )
                    return;
                }
                $http.put("http://134.209.178.237/api/admin/user/" + $rootScope.souqUserID, changePassObj)
                    .then(function (response) {
                        $rootScope.alertMessageLang(
                            "تم تعديل الملف الشخصى بنجاح ",
                            "your file has been updated successfully",
                            $rootScope.souqLang
                        )
                      
                        // $('#exampleModalLongTitle').click()
                        $('#exampleModalCenter').modal('hide')
                        
                        $scope.getCurrentUser();
                    }, function (response) {
                        alert("Error !");
                    })

            }



        })

        .controller("invoicesDueCtrl", function ($rootScope, $scope, $http, $cookieStore, $rootScope, $window) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            if ($rootScope.souqLang = $cookieStore.get('souqLang')) {
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");

                } else {

                    $cookieStore.put('souqLang', 'en')
                    $rootScope.souqLang = $cookieStore.get('souqLang');
                    $('body').css("direction", "ltr");

                }
            }
            if ($rootScope.souqUserID == undefined) {
                $rootScope.alertMessageLang(
                    'قم بالتسجيل أولا !!',
                    'please sign In first !!',
                    $rootScope.souqLang
                    
                    );
                $window.open("http://localhost:1337/html/index.html", "_self");
            }
            $rootScope.slideNavActiveLink('invoicesDue');
            $scope.totalInvoices = 0;
            $scope.geAlltCarsInvoicesDue = function (userID) {
                $scope.InvoicesDue = [];

                $http.get("http://134.209.178.237/api/user/getReceiptByUser?id=" + userID)
                    .then(function (response) {
                        $scope.InvoicesDue = response.data;
                        $scope.InvoicesDue.forEach(invoice => {
                            $scope.totalInvoices += invoice.price;
                        });


                        console.log($scope.InvoicesDue);
                    }, function (response) {
                           // alert("حدث خطا ما !! ");
                     }
                    )
            }

           


            $scope.geAlltCarsInvoicesDue($rootScope.souqUserID);
        })
        .controller("aboutCtrl", function ($rootScope, $scope, $http, $cookieStore, $rootScope, $window) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            if ($rootScope.souqUser._id = '') {
                alert('قم بالتسجيل أولا !!');
                $window.open("Website/html/login.html", "_self");
            }
            $scope.getAbout = function () {
            }
            //$scope.getAbout();
        })
        .controller("contactUsCtrl", function ($rootScope, $scope, $http, $cookieStore, $rootScope, $window, $location) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            if ($rootScope.souqLang = $cookieStore.get('souqLang')) {
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");

                } else {

                    $cookieStore.put('souqLang', 'en')
                    $rootScope.souqLang = $cookieStore.get('souqLang');
                    $('body').css("direction", "ltr");

                }
            }
            if ($rootScope.souqUserID == undefined) {
                $rootScope.alertMessageLang(
                    'قم بالتسجيل أولا !!',
                    'please sign In first !!',
                    $rootScope.souqLang
                    
                    );
                $window.open("http://localhost:1337/html/index.html", "_self");
            }
            $rootScope.slideNavActiveLink('contactUs');
            $scope.view = 1;
            $scope.currentMessages = [];
            $scope.getUserMesages = function (userID) {
                $http.get("http://134.209.178.237/api/user/contactUsByUsers?id=" + userID)
                    .then(function (response) {
                        $scope.userMessages = response.data;
                        // console.log("aaaaaa");

                    }, function (response) {
                        //alert("Error !!");
                    })
            }

            $scope.getUserMesages($rootScope.souqUserID);

            $scope.getMessageById = function (messageID) {
                $http.get("http://134.209.178.237/api/user/contactUsMsgById?id=" + messageID)
                    .then(function (response) {
                        //$scope.msg = response.data;
                        $scope.currentMessages = response.data;
                        // console.log($scope.msg)
                        console.log($scope.currentMessages)
                        $scope.message = "";
                    }, function (response) {
                        alert("Error !!");
                    })

            }

            $scope.sendNewMessage = function (userID, message) {
                var userObj = {
                    userID: userID
                }

                $http.post("http://134.209.178.237/api/user/contactUs", userObj)
                    .then(function (response) {
                        if (response.data && response.data._id) {
                            $scope.messageID = response.data._id;
                        }
                        var messageObj = {
                            contactUsID: $scope.messageID,
                            from: 1,
                            msg: message
                        }


                        $http.post("http://134.209.178.237/api/user/contactUsMsg", messageObj)
                            .then(function (response) {
                                $location.path("contactUs/" ,"_self");

                                //$scope.getMessageById($scope.messageID);

                            }, function (response) {
                                //alert("Error !");
                            })
                    }, function (response) {
                        //alert("Error !");
                    })


            }

            $scope.getChatHistory = function (chatID) {

                $http.get("http://134.209.178.237/api/user/contactUsMsgById?id=" + chatID)
                    .then(function (response) {

                        $scope.chat = response.data;
                        //console.log($scope.chat);
                        $scope.view = 2

                    }, function (response) {
                        //alert("Error !!");
                    })

            }


            $scope.updateMessage = function (messageID, message) {

                var messageObj = {
                    contactUsID: messageID,
                    from: 1,
                    msg: message
                }


                $http.post("http://134.209.178.237/api/user/contactUsMsg", messageObj)
                    .then(function (response) {
                        $scope.message = "";
                        $scope.getChatHistory(messageID);
                        //$scope.getMessageById($scope.messageID);

                    }, function (response) {
                        //alert("Error !");
                    })
            }


        })





})
    ();