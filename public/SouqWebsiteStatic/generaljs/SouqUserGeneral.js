
(function () {


    angular.module('souqUser', ['ngCookies'])
        .filter('cmdate', [
            '$filter', function ($filter) {
                return function (input, format) {
                    return $filter('date')(new Date(input), format);
                };
            }
        ])

        .controller("SignUpCtrl", function ($scope, $http, $rootScope, $cookieStore, $window) {

            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');


            if ($rootScope.souqUserID && $rootScope.souqUserID.length > 0) {
                $window.open("http://localhost:1337/html/souqUser.html", "_self");
            }
            if ($rootScope.souqLang = $cookieStore.get('souqLang')) {
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");
                } else {
                    $cookieStore.put('souqLang', 'en')
                    $rootScope.souqLang = $cookieStore.get('souqLang');
                    $('body').css("direction", "ltr");

                }
            }
            $rootScope.changeLang = function (lang) {
                $cookieStore.put('souqLang', lang);
                $rootScope.souqLang = $cookieStore.get('souqLang');
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");
                } else {
                    $('body').css("direction", "ltr");

                }
            }
            $rootScope.alertMessageLang = function (msgAr, msgEn, lang) {
                if (lang == 'ar') {
                    alert(msgAr);
                } else {
                    alert(msgEn);
                }
            }

            $scope.user = {
                personalImg : "http://localhost:1337/images/Capture.png",
                licenseImg : "http://localhost:1337/images/Capture.png",
                nationalIdImg : "http://localhost:1337/images/Capture.png",
                uploadCount : 0
            }
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
                                    console.log($scope.user.personalImg);
                                       
                                        $scope.user.uploadCount +=1;
                                        $scope.img1_wait = false;
                                        console.log($scope.user.uploadCount);
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
                                    console.log($scope.user.licenseImg);
                                    $scope.user.uploadCount +=1;
                                    $scope.img2_wait = false;
                                    console.log($scope.user.uploadCount);
                                   
                                    
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
                                    console.log($scope.user.nationalIdImg);
                                    $scope.user.uploadCount +=1;
                                    $scope.img3_wait = false;
                                    console.log($scope.user.uploadCount);

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




            $http.get("http://134.209.178.237/api/user/country")
                .then(function (response) {
                    $scope.countryID = response.data;
                    console.log("Countries")
                }, function (response) {
                    alert("Error !!");
                })
            $scope.citiesFunFrom = function () {
                $scope.countryid = $('#countryid').val();
                $http.get("http://134.209.178.237/api/user/city?id=" + $scope.countryid)
                    .then(function (response) {
                        $scope.cityID = response.data;
                        }
                        , function (response) {
                            alert("Error !!");
                        })
            }



            $scope.createNewUser = function (){
                var signupObj = {
                    fullname: $("#fullnameid").val(),
                    mobile: $("#mobileid").val(),
                    nationalID: $("#nationalid").val(),
                    countryID: $("#countryid").val(),
                    cityID: $("#cityid").val(),
                    email: $("#emailid").val(),
                    password: $("#passwordid").val(),
                    birthday: $("#birthdayid").val(),
                    personalImg: $scope.user.personalImg,
                    licenseImg: $scope.user.licenseImg,
                    nationalIdImg: $scope.user.nationalIdImg,
                    gender: $('input[name=gender]:checked').val(),
                    confirmPassword: $("#confirmPasswordid").val()
            }
            console.log(signupObj);

            if(signupObj.password !== signupObj.confirmPassword ){
                $rootScope.alertMessageLang(
                    "يرجى التأكد من مطابقة الرقم السرى   !  " ,
                    "Please confirm that passowrd is identical  !" ,
                    $rootScope.souqLang
                )
                return;

            }
            if(signupObj.gender != "0"  ){
                if(signupObj.gender != "1"  ){

                    $rootScope.alertMessageLang(
                        "يرجى اختيار الجنس   !  " ,
                        "Kindly choose gender  !" ,
                        $rootScope.souqLang
                    )
                    return;

                }                                 

            }
            if(signupObj.gender != "1"  ){
                if(signupObj.gender != "0"  ){

                    $rootScope.alertMessageLang(
                        "يرجى اختيار الجنس   !  " ,
                        "Kindly choose gender  !" ,
                        $rootScope.souqLang
                    )
                    return;

                }


            }
            var today = new Date();
            var birthday = new Date(signupObj.birthday);

            var diff = today.getMonth() - birthday.getMonth() + 
            (12 * (today.getFullYear() - birthday.getFullYear()))
            console.log(diff);
            if(diff < 216){
                $rootScope.alertMessageLang(
                    "يجب ان يكون السن أكبر من 18  ",
                    "Age must be greater than 18 ",
                    $rootScope.souqLang
                )
                return;
            }
            if($scope.user.uploadCount <3 ){
                $rootScope.alertMessageLang(
                    "تأكد من تحميل الصور المطلوبة   ",
                    "Make sure you upload required pictures ",
                    $rootScope.souqLang
                )
                return;
            }
           
                $http.post("http://134.209.178.237/api/user/register", signupObj)
                .then(function (response) {
                    $rootScope.alertMessageLang(
                        "تم انشاء حساب جديد لك بنجاح !  " ,
                        "Your account has been successfully created !" ,
                        $rootScope.souqLang
                    )
                    $window.open("http://localhost:1337/html/index.html", "_self");


                }, function (response) {
                    if(response.data.error.includes("mobile")){
                        $rootScope.alertMessageLang(
                            "رقم الهاتف مسجل من قبل !  " ,
                            "Mobile already exist !" ,
                            $rootScope.souqLang
                        )

                    }
                    if(response.data.error.includes("email_1")){
                        $rootScope.alertMessageLang(
                            "الايميل  مسجل من قبل !  " ,
                            "Email already exist !" ,
                            $rootScope.souqLang
                        )


                    }
                    if(response.data.error.includes("nationalID_1")){
                        $rootScope.alertMessageLang(
                            "الرقم القومى  مسجل من قبل !  " ,
                            "nationalID already exist !" ,
                            $rootScope.souqLang
                        )


                    }

                })                    

                                                   
            }
            
        })

        .controller("SignInCtrl", function ($scope, $http, $rootScope, $window, $rootScope, $cookieStore) {
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


            if ($rootScope.souqUserID && $rootScope.souqUserID.length > 0) {
                $window.open("http://localhost:1337/html/souqUser.html", "_self");
                // $window.open("/Website/html/SouqUser.html", "_self");
            }


            $rootScope.changeLang = function (lang) {
                $cookieStore.put('souqLang', lang);
                $rootScope.souqLang = $cookieStore.get('souqLang');
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");
                } else {
                    $('body').css("direction", "ltr");

                }
            }
            $rootScope.alertMessageLang = function (msgAr, msgEn, lang) {
                if (lang == 'ar') {
                    alert(msgAr);
                } else {
                    alert(msgEn);
                }

            }

            $scope.loginFun = function () {
                var mail = $('#emailid').val();
                var pass = $('#passwordid').val();
                $http.get("http://134.209.178.237/api/user/login?val=" + mail + "&password=" + pass)
                    .then(function (response) {
                        $rootScope.user = response.data;
                        $cookieStore.put('souqUser', $rootScope.user);
                        $cookieStore.put('souqUserID', $rootScope.user._id);

                        if ($rootScope.souqLang = $cookieStore.get('souqLang')) {
                            if ($rootScope.souqLang == 'ar') {
                                $('body').css("direction", "rtl");
                            }
                            if ($rootScope.souqLang == 'en') {
                                $('body').css("direction", "ltr");
                            }
                            if ($rootScope.souqLang != 'en' && $rootScope.souqLang != 'ar') {
                                $cookieStore.put('souqLang', 'en');
                                $rootScope.souqLang = $cookieStore.get('souqLang')
                                $('body').css("direction", "ltr");
                            }

                        }
                        $rootScope.alertMessageLang(
                            "مرحبا " + " " + $rootScope.user.fullname,
                            "Welcome " + " " + $rootScope.user.fullname,
                            $rootScope.souqLang
                        )
                        $window.open("http://localhost:1337/html/souqUser.html", "_self");
                        //$window.open("/Website/html/SouqUser.html", "_self");

                    },
                        function (response) {
                            if (response.data.message.includes("Authentication failed")) {
                                $rootScope.alertMessageLang(
                                    "ايميل أو كلمة مرور خطـــأ !!  ",
                                    "Wrong email or password !!  ",
                                    $rootScope.souqLang
                                )
                                return;
                            }
                            $rootScope.alertMessageLang(
                                "حدث خطأ ما !!  ",
                                "SomSomething went wrong !!  ",
                                $rootScope.souqLang
                            )
                        }
                    )
            }

        })
        .controller("HomeCtrl", function ($scope, $http, $cookieStore, $rootScope, $location, $window) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            // console.log($rootScope.souqUser);
            // console.log($rootScope.souqUserID);
            //$rootScope.souqUserHomeView = $cookieStore.get('souqUserHomeView');

            //console.log($rootScope.souqUserHomeView);
            // if($rootScope.souqUserHomeView == undefined ){

            //     $rootScope.souqUserHomeView = 1;
            //     $cookieStore.put('souqUserHomeView' , $rootScope.souqUserHomeView);

            // }

            if ($rootScope.souqLang = $cookieStore.get('souqLang')) {
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");

                } else {

                    $cookieStore.put('souqLang', 'en')
                    $rootScope.souqLang = $cookieStore.get('souqLang');
                    $('body').css("direction", "ltr");

                }
            }

          

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

            $scope.logOut = function () {
                $cookieStore.remove('souqUser');
                $cookieStore.remove('souqUserID');
                $rootScope.alertMessageLang(
                    " ! تم تسجيل الخروج بنجاح  ",
                    " you has been loged out ! ",
                    $rootScope.souqLang
                )
                $window.open("/Website/html/home.html", "_self");
            }

        })


})
    ();