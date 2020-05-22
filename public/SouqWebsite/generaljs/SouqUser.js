
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
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/home.html",
                    controller: "HomeCtrl"
                })
                .when("/Home", {
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/home.html",
                    controller: "HomeCtrl"
                })

                .when("/profile", {
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/profile.html",
                    controller: "profileCtrl"
                })
                .when("/apps", {
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/apps.html",
                    controller: "appsCtrl"
                })
                .when("/appDetails/:id", {
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/appDetails.html",
                    controller: "appDetailsCtrl"
                })
                .when("/addApp", {
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/addApp.html",
                    controller: "addAppCtrl"
                })
                .when("/contactUs", {
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/contactUs.html",
                    controller: "contactUsCtrl"
                })
                .when("/notifications", {
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/notifications.html",
                    controller: "notificationsCtrl"
                })
                .when("/terms", {
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/terms.html",
                    controller: "termsCtrl"
                })
                .when("/payment", {
                    templateUrl: "http://157.230.25.241/SouqWebsite/html/payment.html",
                    controller: "paymentCtrl"
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
            $rootScope.souqLang = $cookieStore.get('souqLang');
            $rootScope.page = 'Home';
            $rootScope.activeNavLink = function (navID , type) {
                console.log(navID);
               if (type == 1){
                  
                   $rootScope.navID = navID;
                
                       setTimeout(() => {
                           $('.nav-link-signIn-button').removeClass('nav-link-signIn-button-active');
                           $('.nav-mid li').removeClass('active');
                           $('#' + navID).addClass('active');
                           $('.nav-link-signIn-button').addClass('nav-link-signIn-button-active');
                       }, 300);
                   
                //    if(navID == 'navID5'){
                //        setTimeout(() => {
                //            $('.nav-link-signIn-button').addClass('nav-link-signIn-button-active');
                         
                //        }, 300);
                //    }
                  
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
           
           $rootScope.slideNavActiveLink = function (slideNavId) {
            console.log(slideNavId);
            $rootScope.slideNavId = slideNavId;
            setTimeout(() => {
                $('.slideBarNav li').removeClass('active');
                $('.slideBarNav ' + '#' + slideNavId).addClass('active');
            }, 500);
        }
        $rootScope.changeLang = function (lang) {
            
            $cookieStore.put('souqLang', lang);
            $rootScope.souqLang = $cookieStore.get('souqLang');
            if ($rootScope.souqLang == 'ar') {
                $('body').css("direction", "rtl");
                $rootScope.activeNavLink( 'navIDLangeAr',2);
                $rootScope.activeNavLink( $rootScope.navID,1);
                $rootScope.slideNavActiveLink($rootScope.slideNavId);
          
            } else {
                $('body').css("direction", "ltr");
                $rootScope.activeNavLink( 'navIDLangeEn',2);
                $rootScope.activeNavLink( $rootScope.navID,1);
                $rootScope.slideNavActiveLink($rootScope.slideNavId);
             

            }
        }

            if ($rootScope.souqUserID == undefined) {
                $rootScope.alertMessageLang(
                    " ! قم بالتسجيل أولا  ",
                    " please sign in first  ! ",
                    $rootScope.souqLang
                )
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");
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
            }
            
            


            $rootScope.activeNavLink('navID1' , 1);
            $rootScope.slideNavActiveLink('navID50');
            $scope.getRecentApps = function(){
                $http.get("http://157.230.25.241/api/user/requestAuction?page=" + 0 + "&limit=" + 5)
                    .then(function (response) {
                            $scope.recentApps = response.data;
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
                     


            $rootScope.logOut = function () {
                $cookieStore.remove('souqUser');
                $cookieStore.remove('souqUserID');
                $rootScope.alertMessageLang(
                    " ! تم تسجيل الخروج بنجاح  ",
                    " you has been loged out ! ",
                    $rootScope.souqLang
                )

                $window.open("http://157.230.25.241/SouqWebsite/html/main.html", "_self");
                //$window.open("/Website/html/home.html", "_self");
            }
           
            $rootScope.showAllNotifications = function(){
                $('.top-alert').css("display", "none");
                $location.path("/notifications" , "_self");
            }
            $rootScope.swithchNotifications = function(){
                $('.top-alert').toggle();
            }
            // $rootScope.slideNavActiveLink('Home');
            $scope.geNotifications = function(userID){
               
                $http.get("http://157.230.25.241/api/admin/getAllNotification?userID=" + userID)
                .then(function (response) {
                    $rootScope.notifications = response.data;
                    //console.log($scope.notifications)
                    
    
                    console.log($rootScope.notifications);
                }, function (response) {
                    //alert("Error !");
                })
            }
            $scope.geNotifications($rootScope.souqUser._id);

        })
        .controller("profileCtrl", function ($rootScope, $scope, $http, $cookieStore, $rootScope, $window, $location) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            if ($rootScope.souqUserID == undefined) {
                alert('قم بالتسجيل أولا !!');
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");
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
            }



            $rootScope.slideNavActiveLink('profile');
            $rootScope.activeNavLink('navID50' , 1);

            $scope.getAllCategories = function () {
                $http.get("http://157.230.25.241/api/user/category")
                    .then(function (response) {
                        $scope.categories = response.data;
                    }, function (response) {
                        //alert("Error !!");
                    })
            }
            $scope.getAllCategories()
            $scope.getCurrentUser = function () {
                $http.get("http://157.230.25.241/api/user/userByID?id=" + $rootScope.souqUserID)
                    .then(function (response) {
                        $scope.user = response.data;
                        $cookieStore.put('souqUser', $scope.user);
                        //$location.path("/profile/", "_self");
                       
                    }, function (response) {
                        //alert("حدث خطا ما !! ");
                        }
                    )
            }
       
            $scope.getCurrentUser();

            $scope.changePic = function (num) {
                if (num == 1) {
                        $scope.img1_wait = true;
                        if ($('#img1').val() != null) {
                            var formData = new FormData();
                            var fileimg1 = $('#img1')[0];
                            formData.append('file', fileimg1.files[0]);
                           
                                $http({
                                    url: "http://157.230.25.241/api/user/uploadFile",
                                    method: "POST",
                                    data: formData,
                                    headers: { 'Content-Type': undefined },
                                    processData: false,
                                }).then(function (response) {
                                    //alert("done")
                                    $scope.user.personalImg = response.data;
                                    console.log($scope.user.personalImg);
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
               

            }



            $scope.updateUserInfo = function () {
                var userInfo = {
                    fullname: $("#fullname").val(),
                    mobile: $("#mobile").val(),

                 
                    categoryID: $("#categoryID").val(),
                    email: $("#email").val(),

                    birthday: $("#birthday").val(),
                    personalImg: $scope.user.personalImg,
                  
            
                }

               


                $http.put("http://157.230.25.241/api/user/user/" + $rootScope.souqUserID, userInfo)
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
                $http.put("http://157.230.25.241/api/user/user/" + $rootScope.souqUserID, changePassObj)
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
        .controller("appsCtrl", function ($rootScope, $scope, $http, $cookieStore, $rootScope, $window, $location) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            if ($rootScope.souqUserID == undefined) {
                alert('قم بالتسجيل أولا !!');
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");
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
            }

            $rootScope.slideNavActiveLink('apps');
            $rootScope.activeNavLink('navID2' , 1);
            
            $scope.getAcceptedApps = function(){
                
                $http.get("http://157.230.25.241/api/admin/requestAuctionAccept")
                .then(function (response) {
                    $scope.apps = response.data;
                    console.log($scope.apps);
                }, function (response) {
                    //alert("Error !!");
                })
            }
            $scope.getAcceptedApps();

            $scope.getCurrentUser = function () {
                $http.get("http://157.230.25.241/api/user/userByID?id=" + $rootScope.souqUserID)
                    .then(function (response) {
                        $scope.user = response.data;
                        $cookieStore.put('souqUser', $scope.user);
                        //$location.path("/profile/", "_self");
                       
                    }, function (response) {
                        //alert("حدث خطا ما !! ");
                        }
                    )
            }
       
            $scope.getCurrentUser();

        })
        .controller("appDetailsCtrl", function ($rootScope, $scope, $http, $cookieStore, $routeParams, $rootScope, $window, $location) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            
            if ($rootScope.souqUserID == undefined) {
                alert('قم بالتسجيل أولا !!');
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");
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
            }
           
            $rootScope.slideNavActiveLink('apps');
            

            var id = $routeParams.id;
            
            $scope.geCurrentApp = function(appID){
               
                $http.get("http://157.230.25.241/api/admin/getrequestAuctionByID?id=" + appID)
                .then(function (response) {
                    $scope.app = response.data;
                    $scope.app.description = $scope.app.description.trim();
                    
                    $scope.img1 =  $scope.app.img1 || "http://157.230.25.241/kayanWebsite/images/Capture.png";
                    $scope.img2 =  $scope.app.img2 || "http://157.230.25.241/kayanWebsite/images/Capture.png";
                    $scope.img4 = $scope.app.img3 || "http://157.230.25.241/kayanWebsite/images/Capture.png";
                    $scope.img5 =  $scope.app.img4 ||"http://157.230.25.241/kayanWebsite/images/Capture.png";
                    $scope.img6 =  $scope.app.img5 ||"http://157.230.25.241/kayanWebsite/images/Capture.png";
                    $scope.img6 =  $scope.app.img6 ||"http://157.230.25.241/kayanWebsite/images/Capture.png";

                  
                    

                    $http.get("http://157.230.25.241/api/user/isSubscripe?auctionID=" + appID + "&userID=" + $rootScope.souqUser._id )
                    .then(function (response) {
                        $scope.userSubscribeObj = response.data;
                        
                    }, function (response) {
                      
                        if(response.data.message == -1){
                            $scope.userSubscribeObj = {
                                message : 2
                            }
                        }
                        //alert("Error !");
                    })
                }, function (response) {
                    //alert("Error !");
                })
            }
            $scope.geCurrentApp(id);

            $scope.getAuctioSubscripers = function(auctionID){
                
                $http.get("http://157.230.25.241/api/admin/getUsersSubscriptions?auctionID=" + auctionID)
                .then(function (response) {
                    $scope.auctioSubscripers = response.data;
               
                    
                 
             
                    
                }, function (response) {
                 
                    //alert("Error !");
                })
            }
            $scope.getAuctioSubscripers(id);
            $scope.subscribeAuction = function(){
                    $http.get("http://157.230.25.241/api/admin/getUsersSubscriptionsUserKeys?auctionID=" + id)
                    .then(function (response) {
                        $scope.ids = [];
                        $scope.keys = [];
                        $scope.subscribtions = response.data;
                       
                         if($scope.subscribtions.length > 0){
                            $scope.subscribtions.forEach((sub , i ) => {
                                $scope.ids.push(sub.userID._id);
                                $scope.keys.push(sub.userID.userKey);
        
                                if(  $scope.subscribtions.length -1  == i){
                                    var notificationObj = {
                                        type : 2,
                                        msg : "a new subscriber on the auction ",
                                        msgAR : " مشترك جديد في المزاد",
                                        ids  :$scope.ids,
                                        keys : $scope.keys 
                                        
                                        //$("#msg").val('');
                                    }
    
                                    var dataObj = {
                                        userID :  $rootScope.souqUserID,
                                        auctionID : id,
                                        subscriptionPrice :  $('#subscriptionPrice').val()
                                    }
                        
                                    $http.post("http://157.230.25.241/api/admin/subscription" ,  dataObj)
                                    .then(function (response) {
                                        var subObj = response.data;
                                        notificationObj.subscripeID = subObj._id
                                        $http.post("http://157.230.25.241/api/admin/sendNotificationToGroupUsers", notificationObj)
                                        .then(function (response) {

                                            $rootScope.alertMessageLang(
                                                "تم الاشتراك  بنجاح و  ارسال اشعار للمشتركين بذلك ",
                                                "subscribtion has been done  successfully",
                                                $rootScope.souqLang
                                            )
                                         
                                            $scope.ids = [];
                                            $scope.keys = [];
                                            $('#exampleModalCenter').modal('hide');
                                            $location.path('/apps' , "_self");
                                            
                                        }, function (response) {
                                            //alert("Error !");
                                        })
                                       
                        
                                    }, function (response) {
                                       
                                        if(response.data && response.data.message == "your don't have enough credit to join Subscription ."){
                                            $rootScope.alertMessageLang(
                                                "لا يوجد رصيد كافى للمستخدم ",
                                                "No enough credit for suscribtion ",
                                                $rootScope.souqLang
                                            )
                                            $('#exampleModalCenter').modal('hide');
                                        }
                                        if(response.data && response.data.message == "user is already subscripe this app"){
                                            $rootScope.alertMessageLang(
                                                "لقد اشتركت بالفعل فى المزاد  ",
                                                "You already subscribed  ",
                                                $rootScope.souqLang
                                            )
                                            $('#exampleModalCenter').modal('hide');
                                        }
                                        
                                        
                                    })
                                    
                                }
                            });
        
                        }
                       
                        
                        
                        
                        if($scope.subscribtions.length == 0){
                        var dataObj = {
                            userID :  $rootScope.souqUserID,
                            auctionID : id,
                            subscriptionPrice :  $('#subscriptionPrice').val()
                        }
            
                        $http.post("http://157.230.25.241/api/admin/subscription" ,  dataObj)
                        .then(function (response) {

                            $rootScope.alertMessageLang(
                                "تم الاشتراك  بنجاح ",
                                "you has been subscribed successfully ",
                                $rootScope.souqLang
                            )
                           
                            $('#exampleModalCenter').modal('hide');
                            $location.path('/apps' , "_self");
            
                        }, function (response) {
                            if(response.data && response.data.message == "your don't have enough credit to join Subscription ."){
                                $rootScope.alertMessageLang(
                                    "لا يوجد رصيد كافى للمستخدم ",
                                    "No enough credit for suscribtion ",
                                    $rootScope.souqLang
                                )
                                $('#exampleModalCenter').modal('hide');
                            }
                            if(response.data && response.data.message == "user is already subscripe this app"){
                                $rootScope.alertMessageLang(
                                    "لقد اشتركت بالفعل فى المزاد  ",
                                    "You already subscribed  ",
                                    $rootScope.souqLang
                                )
                                $('#exampleModalCenter').modal('hide');
                            }
                            
                            
                        })
                     }
                    }, function (response) {
                        //alert("Error !");
                    })
                        
                    
    
            }

            $scope.editSubscribeAuction = function(){
                var dataObj =  {
                    userID :  $rootScope.souqUserID,
                    auctionID : id,
                    subscriptionPrice :  $('#subscriptionPriceEdit').val()
                }
                $http.put("http://157.230.25.241/api/admin/subscription/"+ $scope.userSubscribeObj.id ,  dataObj)
                .then(function (response) {
                    alert("تم تعديل  الاشتراك  بنجاح ");
                    $('#exampleModalCenter').modal('hide');
                    $location.path('/apps' , "_self");
    
                }, function (response) {
                    if(response.data && response.data.message == "your don't have enough credit to join Subscription ."){
                        $rootScope.alertMessageLang(
                            "لا يوجد رصيد كافى للمستخدم ",
                            "No enough credit for suscribtion ",
                            $rootScope.souqLang
                        )
                        $('#exampleModalCenter').modal('hide');
                    }
                    if(response.data && response.data.message == "user is already subscripe this app"){
                        $rootScope.alertMessageLang(
                            "لقد اشتركت بالفعل فى المزاد  ",
                            "You already subscribed  ",
                            $rootScope.souqLang
                        )
                        $('#exampleModalCenter').modal('hide');
                    }
                    
                    
                })
                    
                

        }



        })
        .controller("addAppCtrl", function ($rootScope, $scope, $http, $cookieStore, $routeParams, $rootScope, $window, $location) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            
            if ($rootScope.souqUserID == undefined) {
                alert('قم بالتسجيل أولا !!');
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");
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
            }
         
            $rootScope.slideNavActiveLink('addApp');
            

           
            $scope.img1 = "http://157.230.25.241/kayanWebsite/images/Capture.png";
            $scope.img2 = "http://157.230.25.241/kayanWebsite/images/Capture.png";
            $scope.img3 = "http://157.230.25.241/kayanWebsite/images/Capture.png";
            $scope.img4 = "http://157.230.25.241/kayanWebsite/images/Capture.png";
            $scope.img5 = "http://157.230.25.241/kayanWebsite/images/Capture.png";
            $scope.img6 = "http://157.230.25.241/kayanWebsite/images/Capture.png";
    
    
           
            $scope.changePic = function (num) {
               
                if (num == 2) {
                    $scope.img1_wait = true;
                    if ($('#img1').val() != null) {
                        var formData = new FormData();
                        var fileimg1 = $('#img1')[0];
                        formData.append('file', fileimg1.files[0]);
    
                        $http({
                            url: "http://157.230.25.241/api/user/uploadFile",
                            method: "POST",
                            data: formData,
                            headers: { 'Content-Type': undefined },
                            processData: false,
                        }).then(function (response) {
                            //alert("done")
                            $scope.img1 = response.data;
                            console.log($scope.img1);
    
                            $scope.img1_wait = false;
    
    
                            // here
                        }, function (response) {
                            alert("حدث خطأ ما أثناء تحميل الصورة  !!  ");
    
                            $scope.img1_wait = false;
                        })
    
    
                    }
    
                }
                if (num == 3) {
                    $scope.img2_wait = true;
                    if ($('#img2').val() != null) {
                        var formData = new FormData();
                        var fileimg2 = $('#img2')[0];
                        formData.append('file', fileimg2.files[0]);
    
                        $http({
                            url: "http://157.230.25.241/api/user/uploadFile",
                            method: "POST",
                            data: formData,
                            headers: { 'Content-Type': undefined },
                            processData: false,
                        }).then(function (response) {
                            //alert("done")
                            $scope.img2 = response.data;
                            console.log($scope.img2);
    
                            $scope.img2_wait = false;
    
    
                            // here
                        }, function (response) {
                            alert("حدث خطأ ما أثناء تحميل الصورة  !!  ");
    
                            $scope.img2_wait = false;
                        })
    
    
                    }
    
                }
                if (num == 4) {
                    $scope.img3_wait = true;
                    if ($('#img3').val() != null) {
                        var formData = new FormData();
                        var fileimg3 = $('#img3')[0];
                        formData.append('file', fileimg3.files[0]);
    
                        $http({
                            url: "http://157.230.25.241/api/user/uploadFile",
                            method: "POST",
                            data: formData,
                            headers: { 'Content-Type': undefined },
                            processData: false,
                        }).then(function (response) {
                            //alert("done")
                            $scope.img3 = response.data;
                            console.log($scope.img3);
    
                            $scope.img3_wait = false;
    
    
                            // here
                        }, function (response) {
                            alert("حدث خطأ ما أثناء تحميل الصورة  !!  ");
    
                            $scope.img3_wait = false;
                        })
    
    
                    }
    
                }
                if (num == 5) {
                    $scope.img4_wait = true;
                    if ($('#img4').val() != null) {
                        var formData = new FormData();
                        var fileimg4 = $('#img4')[0];
                        formData.append('file', fileimg4.files[0]);
    
                        $http({
                            url: "http://157.230.25.241/api/user/uploadFile",
                            method: "POST",
                            data: formData,
                            headers: { 'Content-Type': undefined },
                            processData: false,
                        }).then(function (response) {
                            //alert("done")
                            $scope.img4 = response.data;
                            console.log($scope.img4);
    
                            $scope.img4_wait = false;
    
                        }, function (response) {
                            alert("حدث خطأ ما أثناء تحميل الصورة  !!  ");
    
                            $scope.img4_wait = false;
                        })
    
    
                    }
    
                }
                if (num == 6) {
                    $scope.img5_wait = true;
                    if ($('#img5').val() != null) {
                        var formData = new FormData();
                        var fileimg5 = $('#img5')[0];
                        formData.append('file', fileimg5.files[0]);
    
                        $http({
                            url: "http://157.230.25.241/api/user/uploadFile",
                            method: "POST",
                            data: formData,
                            headers: { 'Content-Type': undefined },
                            processData: false,
                        }).then(function (response) {
                            //alert("done")
                            $scope.img5 = response.data;
                            console.log($scope.img5);
    
                            $scope.img5_wait = false;
    
    
                            // here
                        }, function (response) {
                            alert("حدث خطأ ما أثناء تحميل الصورة  !!  ");
                            
                            $scope.img5_wait = false;
                        })
    
    
                    }
    
                }
                if (num == 1) {
                    $scope.logo_wait = true;
                    if ($('#logo').val() != null) {
                        var formData = new FormData();
                        var filelogo = $('#logo')[0];
                        formData.append('file', filelogo.files[0]);
    
                        $http({
                            url: "http://157.230.25.241/api/user/uploadFile",
                            method: "POST",
                            data: formData,
                            headers: { 'Content-Type': undefined },
                            processData: false,
                        }).then(function (response) {
                            //alert("done")
                            $scope.img6 = response.data;
                            console.log($scope.logo);
    
                            $scope.logo_wait = false;
    
    
                            // here
                        }, function (response) {
                            alert("حدث خطأ ما أثناء تحميل الصورة  !!  ");
                            
                            $scope.logo_wait = false;
                        })
    
    
                    }
    
                }
    
            }
    
    
            $scope.addData = function(){
                console.log("Here")
                $http.get("http://157.230.25.241/api/admin/getAllUsersByUserKeys")
                    .then(function (response) {
                        $scope.ids = [];
                        $scope.keys = [];
                        $scope.subscribtions = response.data;
                        if($scope.subscribtions.length > 0){
                            $scope.subscribtions.forEach((sub , i ) => {
                                $scope.ids.push(sub._id);
                                $scope.keys.push(sub.userKey);
        
                                if( $scope.subscribtions.length -1 == i ){
                                    var notificationObj = {
                                        type : 1,
                                        msg : "a new app has been created ",
                                        msgAR : " تم إنشاء تطبيق جديد",
                                        ids  :$scope.ids,
                                        keys : $scope.keys,
                                    
    
                                        //$("#msg").val('');
                                    }
    
                                    var dataObj = {
                                        appName :  $('#appName').val(),
                                        description : $('#description').val().trim(),
                                        mobile : $('#mobile').val(),
                                        addedBy : 1,
                                        img1 :$scope.img1,
                                        img2 :$scope.img2,
                                        img3 :$scope.img3,
                                        img4 :$scope.img4,
                                        img5 :$scope.img5,
                                        img6 :$scope.img6,
                                       
                                        
                        
                                        
                                    }
                                    console.log(dataObj);
                        
                                   
                                    $http.post("http://157.230.25.241/api/user/requestAuction" , dataObj)
                                    .then(function (response) {
                                        notificationObj.subscripeID = response.data._id;
                                        notificationObj.auctionID =  response.data._id;
                                        $http.post("http://157.230.25.241/api/admin/sendNotificationToGroupUsers", notificationObj)
                                        .then(function (response) {

                                            $rootScope.alertMessageLang(
                                                "تم اضافة  المزاد  بنجاح ",
                                                "Auction has been added successfully",
                                                $rootScope.souqLang
                                            )
                                         
                                           
                                            $scope.ids = [];
                                            $scope.keys = [];
                                            $location.path('/apps' , "_self");
                                            
                                        }, function (response) {
                                            //alert("Error !");
                                        })
                                       
                        
                                    }, function (response) {
                                        //alert("Error !");
                                    })
                                    
                                }
                            });
        
                        }
                       
                        
                        if($scope.subscribtions.length == 0){
                            var dataObj = {
                                appName :  $('#appName').val(),
                                description : $('#description').val().trim(),
                                addedBy : 1,
                                img1 :$scope.img1,
                                img2 :$scope.img2,
                                img3 :$scope.img3,
                                img4 :$scope.img4,
                                img5 :$scope.img5,
                                img6 :$scope.img6,
                
                                
                            }
                            console.log(dataObj);
                           
                            $http.post("http://157.230.25.241/api/user/requestAuction" , dataObj)
                            .then(function (response) {
                                $rootScope.alertMessageLang(
                                    "تم اضافة  المزاد  بنجاح ",
                                    "Auction has been added successfully",
                                    $rootScope.souqLang
                                )
                                $location.path('/apps' , "_self");
                
                            }, function (response) {
                                //alert("Error !");
                            })
                        }
                    }, function (response) {
                        //alert("Error !");
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
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");
            }
            $rootScope.slideNavActiveLink('invoicesDue');
            $scope.totalInvoices = 0;
            $scope.geAlltCarsInvoicesDue = function (userID) {
                $scope.InvoicesDue = [];

                $http.get("http://157.230.25.241/api/user/getReceiptByUser?id=" + userID)
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
            if ($rootScope.souqUserID == undefined) {
                alert('قم بالتسجيل أولا !!');
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");
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
            }
            $rootScope.slideNavActiveLink('contactUs');
            $scope.getUserDetails = function(userID){
            $http.get("http://157.230.25.241/api/user/userByID?id=" + userID)
            .then(function (response) {
                $scope.userDetails = response.data;
            }, function (response) {
                //alert("Error !!");
            })
            }
            $scope.getUserDetails($rootScope.souqUser._id);
    
           

            $scope.addData = function () {
                var dataObj = {
                    userID : $rootScope.souqUser._id,
                    msg : $('#message').val(),
                    fullname : $('#fullname').val(),
                    email :  $('#email').val(),
                    mobile : $('#mobile').val(),
                    type : 1


                }

                $http.post("http://157.230.25.241/api/user/addContactUS", dataObj)
                    .then(function (response) {
                        if (response.data && response.data._id) {
                            
                        }
                        $rootScope.alertMessageLang(
                            "تم ارسال رسالتك بنجاح  ",
                            "your message has been sent successfully",
                            $rootScope.souqLang
                        )
                        
                    }, function (response) {
                        //alert("Error !");
                    })


            }

            $scope.getChatHistory = function (chatID) {

                $http.get("http://157.230.25.241/api/user/contactUsMsgById?id=" + chatID)
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


                $http.post("http://157.230.25.241/api/user/contactUsMsg", messageObj)
                    .then(function (response) {
                        $scope.message = "";
                        $scope.getChatHistory(messageID);
                        //$scope.getMessageById($scope.messageID);

                    }, function (response) {
                        //alert("Error !");
                    })
            }


        })
        .controller("notificationsCtrl", function ($rootScope, $scope, $http, $cookieStore, $rootScope, $window, $location) {
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
                $window.open("http://157.230.25.241/SouqWebsite/html/main.html", "_self");
            }
            //$rootScope.slideNavActiveLink('no');
          
           
           $scope.getUserDetails = function(userID){
            $http.get("http://157.230.25.241/api/user/userByID?id=" + userID)
            .then(function (response) {
                $scope.userDetails = response.data;
            }, function (response) {
                //alert("Error !!");
            })
           }
           $scope.getUserDetails($rootScope.souqUser._id);
           $scope.geNotifications = function(userID){
               
            $http.get("http://157.230.25.241/api/admin/getAllNotification?userID=" + userID)
            .then(function (response) {
                $rootScope.notifications = response.data;
                //console.log($scope.notifications)
                

                console.log($rootScope.notifications);
            }, function (response) {
                //alert("Error !");
            })
        }
        $scope.geNotifications($rootScope.souqUser._id);
        $scope.goToAppDetails = function(appID){
            $location.path("/appDetails/" + appID  , "_self")
            }

        })
        .controller("termsCtrl", function ($rootScope, $scope, $http, $cookieStore, $rootScope, $window, $location) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            $rootScope.souqLang = $cookieStore.get('souqLang');

            if ($rootScope.souqUserID == undefined) {
                $rootScope.alertMessageLang(
                    " ! قم بالتسجيل أولا  ",
                    " please sign in first  ! ",
                    $rootScope.souqLang
                )
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");
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
            }
            
            


            $rootScope.activeNavLink('navID50' , 1);
            $rootScope.slideNavActiveLink('terms');

            $scope.getData = function(){
                $http.get("http://157.230.25.241/api/user/getTerms")
                .then(function (response) {
                    $scope.terms = response.data;
                }, function (response) {
                    //alert("Error !!");
                })
            }
            $scope.getData();
            //ng-repeat = "c in terms "

        })
        .controller("paymentCtrl", function ($rootScope, $scope, $http, $cookieStore, $rootScope, $window, $location) {
            $rootScope.souqUser = $cookieStore.get('souqUser');
            $rootScope.souqUserID = $cookieStore.get('souqUserID');
            if ($rootScope.souqUserID == undefined) {
                alert('قم بالتسجيل أولا !!');
                $window.open("http://157.230.25.241/SouqWebsite/html/signIn.html", "_self");
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
            }

            $rootScope.slideNavActiveLink('payment');
            $rootScope.activeNavLink('navID50' , 1);
          
           
           


        })

})
    ();