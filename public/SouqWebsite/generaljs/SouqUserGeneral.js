
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
            $rootScope.souqLang = $cookieStore.get('souqLang');
            if ($rootScope.souqUserID && $rootScope.souqUserID.length > 0) {
                $window.open("http://157.230.25.241/SouqWebsite/html/souqUser.html", "_self");
            }
            


            $scope.user = {
                personalImg : "http://134.209.178.237/kayanWebsite//images/Capture.png"
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








            $scope.createNewUser = function (){
                var signupObj = {
                    fullname: $("#fullname").val(),
                    mobile: $("#mobile").val(),
                    email: $("#email").val(),
                    password: $("#password").val(),
                   
                    personalImg: $scope.user.personalImg
                   
            }
            console.log(signupObj);
            // var today = new Date();
            // var birthday = new Date(signupObj.birthday);

            // var diff = today.getMonth() - birthday.getMonth() + 
            // (12 * (today.getFullYear() - birthday.getFullYear()))
            // console.log(diff);
            // if(diff < 216){
            //     $rootScope.alertMessageLang(
            //         "يجب ان يكون السن أكبر من 18  ",
            //         "Age must be greater than 18 ",
            //         $rootScope.souqLang
            //     )
            //     return;
            // }
            
           
            if($scope.agreeTerms != true){
                $rootScope.alertMessageLang(
                    "يجب الموافقة على الشروط و الاحكام   ",
                    "you should agree terms and conditions ",
                    $rootScope.souqLang
                )
                return;
            }
            console.log($scope.agreeTerms);
         
                $http.post("http://157.230.25.241/api/user/register", signupObj)
                .then(function (response) {
                    $rootScope.alertMessageLang(
                        "تم انشاء حساب جديد لك بنجاح !  " ,
                        "Your account has been successfully created !" ,
                        $rootScope.souqLang
                    )
                    $window.open("signIn.html", "_self");


                }, function (response) {
                    if(response.data.message == 'sorry is mobile exsist'){
                        $rootScope.alertMessageLang(
                            "رقم الهاتف مسجل من قبل !  " ,
                            "Mobile already exist !" ,
                            $rootScope.souqLang
                        )

                    }
                    if(response.data.message == 'sorry is email exsist'){
                        $rootScope.alertMessageLang(
                            "الايميل  مسجل من قبل !  " ,
                            "Email already exist !" ,
                            $rootScope.souqLang
                        )


                    }
                    

                })                    

                                                   
            }
            
        })
        .controller("SignInCtrl", function ($scope, $http, $rootScope, $window, $rootScope, $cookieStore) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            $rootScope.souqLang = $cookieStore.get('souqLang');
            if ($rootScope.souqUserID && $rootScope.souqUserID.length > 0) {
                $window.open("http://157.230.25.241/SouqWebsite/html/souqUser.html", "_self");
            }

            $scope.loginFun = function () {
                var mail = $('#emailid').val();
                var pass = $('#passwordid').val();
                $http.get("http://157.230.25.241/api/user/login?val=" + mail + "&password=" + pass)
                    .then(function (response) {
                        $rootScope.user = response.data;
                        $cookieStore.put('souqUser', $rootScope.user);
                        $cookieStore.put('souqUserID', $rootScope.user._id);

                        if ($rootScope.souqLang == 'ar') {
                            $('body').css("direction", "rtl");
                            $rootScope.activeNavLink( 'navIDLangeAr',2);
                        }
                        if ($rootScope.souqLang == 'en' || $rootScope.souqLang ==  undefined  ) {
                            $cookieStore.put('souqLang', 'en')
                            $rootScope.souqLang = $cookieStore.get('souqLang');
                            $('body').css("direction", "ltr");
                            $rootScope.activeNavLink( 'navIDLangeEn',2);
                            console.log($rootScope.souqLang)
                        }
                        $rootScope.alertMessageLang(
                            "مرحبا " + " " + $rootScope.user.fullname,
                            "Welcome " + " " + $rootScope.user.fullname,
                            $rootScope.souqLang
                        )
                        $window.open("souqUser.html", "_self");
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
            $rootScope.souqLang = $cookieStore.get('souqLang');
            if ($rootScope.souqUserID && $rootScope.souqUserID.length > 0) {
                $window.open("http://157.230.25.241/SouqWebsite/html/souqUser.html", "_self");
            }


            $rootScope.activeNavLink = function (navID , type) {
                 console.log(navID);
                if (type == 1){
                   
                    $rootScope.navID = navID;
                    if(navID != 5){
                        setTimeout(() => {
                            $('.nav-link-signIn-button').removeClass('nav-link-signIn-button-active');
                            $('.nav-mid li').removeClass('active');
                            $('#' + navID).addClass('active');
                        }, 300);
                    }
                    if(navID == 'navID5'){
                        setTimeout(() => {
                            $('.nav-link-signIn-button').addClass('nav-link-signIn-button-active');
                          
                        }, 300);
                    }
                   
                }
                if (type == 2){
                    //console.log(navID);
                    $rootScope.langNavID = navID;
                    setTimeout(() => {
                        $('.navLangUl a').removeClass('active');
                        $('#' + navID).addClass('active');
                    }, 300);
                }
               
            }
           
            if ($rootScope.souqLang == 'ar') {
                $('body').css("direction", "rtl");
                $rootScope.activeNavLink( 'navIDLangeAr',2);
            }
            if ($rootScope.souqLang == 'en' || $rootScope.souqLang ==  undefined  ) {
                $cookieStore.put('souqLang', 'en')
                $rootScope.souqLang = $cookieStore.get('souqLang');
                $('body').css("direction", "ltr");
                $rootScope.activeNavLink( 'navIDLangeEn',2);
                console.log($rootScope.souqLang)
            }
               

            $rootScope.changeLang = function (lang) {
                
                $cookieStore.put('souqLang', lang);
                $rootScope.souqLang = $cookieStore.get('souqLang');
                if ($rootScope.souqLang == 'ar') {
                    $('body').css("direction", "rtl");
                    $rootScope.activeNavLink( 'navIDLangeAr',2);
                    // $rootScope.activeNavLink( $rootScope.navID,1)
                    // $rootScope.changeCoverItems()
                } else {
                    $('body').css("direction", "ltr");
                    $rootScope.activeNavLink( 'navIDLangeEn',2);
                    // $rootScope.activeNavLink( $rootScope.navID,1);
                    // $rootScope.changeCoverItems()

                }
            }


            // $rootScope.activeNavLink('navID1' , 1);
            $scope.getRecentApps = function(){
                $http.get("http://157.230.25.241/api/user/requestAuction?page=" + 0 + "&limit=" + 5)
                    .then(function (response) {
                            $scope.recentApps = response.data;
                            $scope.apps = response.data;

                            console.log($scope.recentApps);
                        },
                        function (response) {
                            setTimeout(() => {
                                $scope.getRecentApps();
                            }, 5000);
                        }
                    )
            }
            $scope.getRecentApps();

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

         

 
            $scope.addContactUs = function () {
                var dataObj = {
                    msg : $('#message').val(),
                    fullname : $('#fullname').val(),
                    email :  $('#email').val(),
                    mobile : $('#mobile').val(),
                    type : 2


                }

                $http.post("http://157.230.25.241/api/user/addContactUS", dataObj)
                    .then(function (response) {
                        // if (response.data && response.data._id) {
                            
                        // }
                        $rootScope.alertMessageLang(
                            "تم ارسال رسالتك بنجاح  ",
                            "your message has been sent successfully",
                            $rootScope.souqLang
                        )
                        
                    }, function (response) {
                        //alert("Error !");
                    })


            }
            $scope.loginRequired = function(){
                $rootScope.alertMessageLang(
                    "يرجى تسجيل الدخول أولا للمتابعة ، سيتم تحويلك لصفحة تسجيل الدخول  " ,
                    "please sign in to continue , we will redirect you to login page  " ,
                    $rootScope.souqLang
                )
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");

            }
            // $rootScope.signInBtn = 1;
            $rootScope.changeSignIn = function(type){
                if(type == 1){
                    $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");

                }
                if(type == 2){
                    $window.open("http://157.230.25.241/SouqWebsite/html/signUp.html", "_self");

                }
               
                
            }
        })


})
    ();