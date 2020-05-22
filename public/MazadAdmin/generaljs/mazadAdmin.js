
var RequestModule = angular.module("RequestModule", ['ngCookies', 'ngRoute', 'angularUtils.directives.dirPagination'])
    .directive('backButton', function () {
        return {
            restrict: 'A',

            link: function (scope, element, attrs) {
                element.bind('click', goBack);

                function goBack() {
                    history.back();
                    scope.$apply();
                }
            }
        }
    })
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/apps", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/apps.html",
                controller: "appsCtrl"
            })
            .when("/addApp", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/addApp.html",
                controller: "addAppCtrl"
            })

            .when("/editApp/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/editApp.html",
                controller: "editAppCtrl"
            })
            .when("/appDetails/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/appDetails.html",
                controller: "appDetailsCtrl"
            })
            .when("/appSubscriptionUsers/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/appSubscriptionUsers.html",
                controller: "appSubscriptionUsersCtrl"
            })
            
            .when("/appSubscription/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/appSubscription.html",
                controller: "appSubscriptionCtrl"
            })
            .when("/userSubscriptionApps/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/userSubscriptionApps.html",
                controller: "userSubscriptionAppsCtrl"
            })
            
            .when("/users", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/users.html",
                controller: "usersCtrl"
            })
            .when("/userDetails/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/userDetails.html",
                controller: "userDetailsCtrl"
            })
            .when("/addUser", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/addUser.html",
                controller: "addUserCtrl"
            })
            .when("/editUser/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/editUser.html",
                controller: "editUserCtrl"
            })
            .when("/categories", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/categories.html",
                controller: "categoriesCtrl"
            })
            .when("/addCategory", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/addCategory.html",
                controller: "addCategoryCtrl"
            })
            .when("/editCategory/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/editCategory.html",
                controller: "editCategoryCtrl"
            })
           
            .when("/contactUs", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/contactUs.html",
                controller: "contactUsCtrl"
            })
            .when("/terms", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/terms.html",
                controller: "termsCtrl"
            })
            .when("/about", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/about.html",
                controller: "aboutCtrl"
            })
            .when("/addTerms", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/addTerms.html",
                controller: "addTermsCtrl"
            })
            .when("/addAbout", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/addAbout.html",
                controller: "addAboutCtrl"
            })
            .when("/editTerms/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/editTerms.html",
                controller: "editTermsCtrl"
            })
            .when("/editAbout/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/editAbout.html",
                controller: "editAboutCtrl"
            })

            .when("/ads", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/ads.html",
                controller: "adsCtrl"
            })
            .when("/addAds", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/addAds.html",
                controller: "addAdsCtrl"
            })
            .when("/editAds/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/editAds.html",
                controller: "editAdsCtrl"
            })
            .when("/addNotification", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/addNotification.html",
                controller: "addNotificationCtrl"
            })
            .when("/sendNotificationToUser/:id", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/sendNotificationToUser.html",
                controller: "sendNotificationToUserCtrl"
            })
            
            .when("/Defualt", {
                templateUrl: "MazadAdmin/html/Defualt.html",
                controller: "DefualtCtrl"
            })
            .when("/editAdmin", {
                templateUrl: "http://157.230.25.241/MazadAdmin/html/editAdmin.html",
                controller: "editAdminCtrl"
            })
            .otherwise({
                redirectTo: 'Defualt'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .filter('cmdate', [
        '$filter',
        function ($filter) {
            return function (input, format) {
                return $filter('date')(new Date(input), format);
            };
        }
    ])

    
    .controller("appsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
            $http.get("/api/admin/requestAuction")
            .then(function (response) {
                $scope.apps = response.data;
            }, function (response) {
                //alert("Error !");
            })

            $scope.selectNav = function(id){
                setTimeout(() => {
                    $('.nav-link-tab').removeClass('active');
                    $('#tab-'+ id).addClass('active');
                    $('.tab-pane').removeClass('active');
                    $('.tab-pane').removeClass('show');
                    $('#tab-'+ id+ '-div').addClass('show');
                    $('#tab-'+ id+ '-div').addClass('active');
                    $scope.apps = [];
                    if(id == 1){
                        $http.get("/api/admin/requestAuction")
                        .then(function (response) {
                            $scope.apps = response.data;
                        }, function (response) {
                            //alert("Error !");
                        })
                    }
                    if(id == 2){
                        $http.get("/api/admin/requestAuctionAccept")
                        .then(function (response) {
                            $scope.apps = response.data;
                        }, function (response) {
                            //alert("Error !");
                        })
                    }
                    if(id == 3){
                        $http.get("/api/admin/requestAuctionReject")
                        .then(function (response) {
                            $scope.apps = response.data;
                        }, function (response) {
                            //alert("Error !");
                        })
                    }
                    if(id == 4){
                        $http.get("/api/admin/requestAuction")
                        .then(function (response) {
                            $scope.apps = response.data;
                        }, function (response) {
                            //alert("Error !");
                        })
                    }
                  
                }, 100);
               
            }
    })

    .controller("addAppCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
       

        
        $scope.img1 = "http://134.209.178.237/kayanWebsite/images/Capture.png";
        $scope.img2 = "http://134.209.178.237/kayanWebsite/images/Capture.png";
        $scope.img3 = "http://134.209.178.237/kayanWebsite/images/Capture.png";
        $scope.img4 = "http://134.209.178.237/kayanWebsite/images/Capture.png";
        $scope.img5 = "http://134.209.178.237/kayanWebsite/images/Capture.png";
        $scope.img6 = "http://134.209.178.237/kayanWebsite/images/Capture.png";

       
        $scope.getCategories = function(){
            $http.get("/api/admin/category")
            .then(function (response) {
                $scope.categories = response.data;
              
            }, function (response) {
                //alert("Error !");
            })
        }
        $scope.getCategories()
       
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
            if (num == 2) {
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
            if (num == 3) {
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
            if (num == 4) {
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
            if (num == 5) {
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

        }


        $scope.addData = function(){
            $http.get("/api/admin/getAllUsersByUserKeys")
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
                                    addedBy : 2,
                                    startDate : $('#startDate').val(),
                                    endDate : $('#endDate').val(),
                                    startPrice : $('#startPrice').val(),
                                    minimumPrice : $('#minimumPrice').val(),
                                    startH : $('#startH').val(),
                                    endH: $('#endH').val(),
                                    isInsurance: $('#isInsurance').val(),
                                    insurance: $('#insurance').val(),
                                    playstoreLink: $('#playstoreLink').val(),
                                    appstoreLink : $('#appstoreLink').val(),
                                    img1 :$scope.img1,
                                    img2 :$scope.img2,
                                    img3 :$scope.img3,
                                    img4 :$scope.img4,
                                    img5 :$scope.img5,
                                    img6 :$scope.img6,
                                    categoryID : $('#categoryID').val(),
                                    conditions : $('#conditions').val().trim()

                                    
                    
                                    
                                }
                                console.log(dataObj);
                    
                               
                                $http.post("/api/admin/requestAuction" , dataObj)
                                .then(function (response) {
                                    notificationObj.subscripeID = response.data._id;
                                    notificationObj.auctionID =  response.data._id;
                                    $http.post("/api/admin/sendNotificationToGroupUsers", notificationObj)
                                    .then(function (response) {
                                        alert("تم اضافة  المزاد  بنجاح ");
                                     
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
                            mobile : $('#mobile').val(),
                            addedBy : 2,
                            startDate : $('#startDate').val(),
                            endDate : $('#endDate').val(),
                            startPrice : $('#startPrice').val(),
                            minimumPrice : $('#minimumPrice').val(),
                            startH : $('#startH').val(),
                            endH: $('#endH').val(),
                            isInsurance: $('#isInsurance').val(),
                            insurance: $('#insurance').val(),
                            playstoreLink: $('#playstoreLink').val(),
                            appstoreLink : $('#appstoreLink').val(),
                            img1 :$scope.img1,
                            img2 :$scope.img2,
                            img3 :$scope.img3,
                            img4 :$scope.img4,
                            img5 :$scope.img5,
                            img6 :$scope.img6,
            
                            
                        }
                        console.log(dataObj);
            
                       
                        $http.post("/api/admin/requestAuction" , dataObj)
                        .then(function (response) {
                            alert("تم اضافة  المزاد  بنجاح ");
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

    .controller("editAppCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $http.get("/api/admin/getrequestAuctionByID?id=" + id)
            .then(function (response) {
                $scope.app = response.data;
                $scope.img1 =  $scope.app.img1 ;
                $scope.img2 =  $scope.app.img2 ;
                $scope.img3 =  $scope.app.img3 ;
                $scope.img4 =  $scope.app.img4 ;
                $scope.img5 =  $scope.app.img5 ;
                $scope.img6 =  $scope.app.img6 ;
            }, function (response) {
                //alert("Error !");
            })

        
      

       
            $scope.getCategories = function(){
                $http.get("/api/admin/category")
                .then(function (response) {
                    $scope.categories = response.data;
                  
                }, function (response) {
                    //alert("Error !");
                })
            }
            $scope.getCategories()
       
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
            if (num == 2) {
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
            if (num == 3) {
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
            if (num == 4) {
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
            if (num == 5) {
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

        }


        $scope.editData = function(){
            var dataObj = {
                appName :  $('#appName').val(),
                description : $('#description').val().trim(),
                mobile : $('#mobile').val(),
                status : $('#status').val(),
               
                startDate : $('#startDate').val(),
                endDate : $('#endDate').val(),
                startPrice : $('#startPrice').val(),
                minimumPrice : $('#minimumPrice').val(),
                startH : $('#startH').val(),
                endH: $('#endH').val(),
                isInsurance: $('#isInsurance').val(),
                insurance: $('#insurance').val(),
                playstoreLink: $('#playstoreLink').val(),
                appstoreLink : $('#appstoreLink').val(),
                img1 :$scope.img1,
                img2 :$scope.img2,
                img3 :$scope.img3,
                img4 :$scope.img4,
                img5 :$scope.img5,
                categoryID : $('#categoryID').val(),
                conditions : $('#conditions').val(),

             

                
            }
            console.log(dataObj);

        
            $http.put("/api/admin/requestAuction/" + id , dataObj)
            .then(function (response) {
                alert("تم تعديل التطبيق بنجاح ");
                $location.path('/apps' , "_self");

            }, function (response) {
                //alert("Error !");
            })
            
           
            
        }
    })

    .controller("appDetailsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $http.get("/api/admin/getrequestAuctionByID?id=" + id)
        .then(function (response) {
            $scope.app = response.data;
            $scope.img1 =  $scope.app.img1 || "http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img2 =  $scope.app.img2 || "http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img4 = $scope.app.img3 || "http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img5 =  $scope.app.img4 ||"http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img6 =  $scope.app.img5 ||"http://134.209.178.237/kayanWebsite/images/Capture.png";
        }, function (response) {
            //alert("Error !");
        })


        
    })
    .controller("appSubscriptionCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $http.get("/api/admin/getrequestAuctionByID?id=" + id)
        .then(function (response) {
            $scope.app = response.data;
            $scope.img1 =  $scope.app.img1 || "http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img2 =  $scope.app.img2 || "http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img4 = $scope.app.img3 || "http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img5 =  $scope.app.img4 ||"http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img6 =  $scope.app.img5 ||"http://134.209.178.237/kayanWebsite/images/Capture.png";
        }, function (response) {
            //alert("Error !");
        })

        $http.get("/api/admin/users")
        .then(function (response) {
            $scope.users = response.data;
        }, function (response) {
            //alert("Error !");
        })


        $scope.addData = function(){
                $http.get("/api/admin/getUsersSubscriptionsUserKeys?auctionID=" + id)
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
                                    userID :  $('#userID').val(),
                                    auctionID : id,
                                    subscriptionPrice :  $('#subscriptionPrice').val()
                                }
                    
                                $http.post("/api/admin/subscription" ,  dataObj)
                                .then(function (response) {
                                    var subObj = response.data;
                                    notificationObj.subscripeID = subObj._id
                                    $http.post("/api/admin/sendNotificationToGroupUsers", notificationObj)
                                    .then(function (response) {
                                        alert("  تم الاشتراك  بنجاح و  ارسال اشعار للمشتركين بذلك  ");
                                     
                                        $scope.ids = [];
                                        $scope.keys = [];
                                        $location.path('/apps' , "_self");
                                        
                                    }, function (response) {
                                        //alert("Error !");
                                    })
                                   
                    
                                }, function (response) {
                                    console.log(response);
                                    if(response.data && response.data.message == "your don't have enough credit to join Subscription ."){
                                        alert("لا يوجد رصيد كافى للمستخدم ");
                                    }
                                    if(response.data && response.data.message == "user is already subscripe this app"){
                                        alert("المستخدم مشترك بالفعل  ");
                                    }
                                    
                                    
                                })
                                
                            }
                        });
    
                    }
                   
                    
                    
                    
                    if($scope.subscribtions.length == 0){

                    


                    var dataObj = {
                        userID :  $('#userID').val(),
                        auctionID : id,
                        subscriptionPrice :  $('#subscriptionPrice').val()
                    }
        
                    $http.post("/api/admin/subscription" ,  dataObj)
                    .then(function (response) {
                        alert("تم الاشتراك  بنجاح ");

                        $location.path('/apps' , "_self");
        
                    }, function (response) {
                        console.log(response);
                        if(response.data && response.data.message == "your don't have enough credit to join Subscription ."){
                            alert("لا يوجد رصيد كافى للمستخدم ");
                        }
                        if(response.data && response.data.message == "user is already subscripe this app"){
                            alert("المستخدم مشترك بالفعل  ");
                        }
                        
                        
                    })
                 }
                }, function (response) {
                    //alert("Error !");
                })
                    
                

        }


        
    })

    
    .controller("userSubscriptionAppsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $http.get("/api/admin/userByID?id=" + id)
        .then(function (response) {
            $scope.user = response.data;
        }, function (response) {
            //alert("Error !");
        })

       

        $http.get("/api/admin/getSubscriptionsByUser?userID=" + id)
        .then(function (response) {
            $scope.subscribtions = response.data;
        }, function (response) {
            //alert("Error !");
        })

    })
    .controller("appSubscriptionUsersCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $http.get("/api/admin/getrequestAuctionByID?id=" + id)
        .then(function (response) {
            $scope.app = response.data;
            $scope.img1 =  $scope.app.img1 || "http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img2 =  $scope.app.img2 || "http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img4 = $scope.app.img3 || "http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img5 =  $scope.app.img4 ||"http://134.209.178.237/kayanWebsite/images/Capture.png";
            $scope.img6 =  $scope.app.img5 ||"http://134.209.178.237/kayanWebsite/images/Capture.png";
        }, function (response) {
            //alert("Error !");
        })

       

        $http.get("/api/admin/getUsersSubscriptions?auctionID=" + id)
        .then(function (response) {
            $scope.subscribtions = response.data;
        }, function (response) {
            //alert("Error !");
        })

        $scope.updateAuctionWinner = function(subscriptionID , userID ,auctionID , auction , subscriptionPrice ){

            $http.get("/api/admin/userById?id=" + userID)
            .then(function (response) {
                $scope.user = response.data;
                if($scope.user.userCredit <  (auction.minimumPrice)){
                    $scope.ids = [];
                    $scope.keys = [];
                    $scope.ids.push($scope.user._id);
                    $scope.keys.push($scope.user.userKey);
                    var notificationObj = {
                        type : 5,
                        msg : "a Credit not engough ",
                        msgAR : " رصيد غير كافى  ",
                        ids  :$scope.ids,
                        keys : $scope.keys,
                        subscripeID : subscriptionID
                    }

                    $http.post("/api/admin/sendNotificationToGroupUsers", notificationObj)
                    .then(function (response) {
                        alert("نأسف رصيد المستخدم أقل من الحد الادنى للمزاد  ");
                        $location.path('/apps' , "_self");       
                    }, function (response) {
                        //alert("Error !");
                    })
                    return;
                }
                if($scope.user.userCredit < subscriptionPrice){
                    $scope.ids = [];
                    $scope.keys = [];
                    $scope.ids.push($scope.user._id);
                    $scope.keys.push($scope.user.userKey);
                    var notificationObj = {
                        type : 5,
                        msg : "a Credit not engough ",
                        msgAR : " رصيد غير كافى  ",
                        ids  :$scope.ids,
                        keys : $scope.keys,
                        subscripeID : subscriptionID
                    }

                    $http.post("/api/admin/sendNotificationToGroupUsers", notificationObj)
                    .then(function (response) {
                        alert("نأسف رصيد المستخدم غير كافى ");
                        
                        $location.path('/apps' , "_self");
                        
                    }, function (response) {
                        //alert("Error !");
                    })
                    
                    return;
                }
                if(!$scope.user._id ){
                    alert("نأسف حدث خطأ ما  ");
                    return;
                }


                $http.get("/api/admin/getUsersSubscriptionsUserKeys?auctionID=" + auctionID)
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
                                    type : 3,
                                    msg : "a new winer on the auction ",
                                    msgAR : " تم اعلان الفائز ",
                                    ids  :$scope.ids,
                                    keys : $scope.keys ,
                                   
                                    //$("#msg").val('');
                                }

                                var userCredit = $scope.user.userCredit - subscriptionPrice;
                                var dataObj0 = {
                                    userCredit : userCredit
                                }
                                $http.put("/api/admin/user/" + userID , dataObj0)
                                .then(function (response) {
                                    var dataObj = {
                                        status : 2 ,
                                    }
                                    
                                    $http.put("/api/admin/subscription/" + subscriptionID , dataObj)
                                    .then(function (response) {
                                        var dataObj2 = {
                                            status : 4 ,
                                        }
                                        $http.put("/api/admin/requestAuction/" + auctionID , dataObj2)
                                        .then(function (response) {

                                            notificationObj.subscripeID = subscriptionID;
                                            $http.post("/api/admin/sendNotificationToGroupUsers", notificationObj)
                                            .then(function (response) {
                                                $scope.ids = [];
                                                $scope.keys = [];
                                                notificationObj = [];
                                                $scope.ids.push($scope.user._id);
                                                $scope.keys.push($scope.user.userKey);
                                                notificationObj = {
                                                    type : 4,
                                                    msg : "a Credit has been decreased winer on the auction ",
                                                    msgAR : " تم خصم مبلغ المزاد ",
                                                    ids  :$scope.ids,
                                                    keys : $scope.keys ,
                                                    subscripeID : subscriptionID
                                                }

                                                $http.post("/api/admin/sendNotificationToGroupUsers", notificationObj)
                                                .then(function (response) {
                                                    alert("تم اعلان فوز المستخدم ")
                                                    
                                                    $location.path('/apps' , "_self");
                                                    
                                                }, function (response) {
                                                    //alert("Error !");
                                                })
                                               
                                                
                                            }, function (response) {
                                                //alert("Error !");
                                            })
                                            
                                          
                                        }, function (response) {
                                            //alert("Error !");
                                        })
                        
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

                    
                        var userCredit = $scope.user.userCredit - subscriptionPrice;
                        var dataObj0 = {
                            userCredit : userCredit
                        }
                        $http.put("/api/admin/user/" + userID , dataObj0)
                        .then(function (response) {
                            var dataObj = {
                                status : 2 ,
                            }
                            $http.put("/api/admin/subscription/" + subscriptionID , dataObj)
                            .then(function (response) {
                                var dataObj2 = {
                                    status : 4 ,
                                }
                                $http.put("/api/admin/requestAuction/" + auctionID , dataObj2)
                                .then(function (response) {
                                    alert("تم اعلان فوز المستخدم ");
                                    $location.path("/apps"  , "_self");
                                }, function (response) {
                                    //alert("Error !");
                                })
                
                            }, function (response) {
                                //alert("Error !");
                            })
    
    
                        }, function (response) {
                            //alert("Error !");
                        })
    
                 }
                }, function (response) {
                    //alert("Error !");
                })


            }, function (response) {
                //alert("Error !");
            })



        }


        $scope.reverseUpdateAuctionWinner = function(subscriptionID , userID ,auctionID , auction , subscriptionPrice ){

            $http.get("/api/admin/userById?id=" + userID)
            .then(function (response) {
                $scope.user = response.data;
               
                    var userCredit = $scope.user.userCredit + subscriptionPrice;
                    var dataObj0 = {
                        userCredit : userCredit
                    }
                    $http.put("/api/admin/user/" + userID , dataObj0)
                    .then(function (response) {
                        var dataObj = {
                            status : 1 ,
                        }
                        $http.put("/api/admin/subscription/" + subscriptionID , dataObj)
                        .then(function (response) {
                            var dataObj2 = {
                                status : 2 ,
                            }
                            $http.put("/api/admin/requestAuction/" + auctionID , dataObj2)
                            .then(function (response) {
                                alert("تم الغاء فوز المستخدم ");

                                

                                $location.path("/apps"  , "_self");
                            }, function (response) {
                                //alert("Error !");
                            })
            
                        }, function (response) {
                            //alert("Error !");
                        })


                    }, function (response) {
                        //alert("Error !");
                    })
            }, function (response) {
                //alert("Error !");
            })



        }

    })


    .controller("usersCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        $http.get("/api/admin/users")
            .then(function (response) {
                $scope.users = response.data;
            }, function (response) {
                //alert("Error !");
            })
    })
    .controller("userDetailsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $scope.getCategories = function(){
            $http.get("/api/admin/category")
            .then(function (response) {
                $scope.categories = response.data;
              
            }, function (response) {
                //alert("Error !");
            })
        }
        $scope.getCategories()
        $http.get("/api/admin/userById?id=" + id)
            .then(function (response) {
                $scope.user = response.data;
               
            }, function (response) {
                //alert("Error !");
            })
    })

    .controller("editUserCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $http.get("/api/admin/userById?id=" + id)
            .then(function (response) {
                $scope.user = response.data;
              
               $('#personalImage').val($scope.user.personalImg)
            }, function (response) {
                //alert("Error !");
            })
        $scope.getCategories = function(){
            $http.get("/api/admin/category")
            .then(function (response) {
                $scope.categories = response.data;
              
            }, function (response) {
                //alert("Error !");
            })
        }
        $scope.getCategories()
        

        $scope.editData = function(){
            if (!$('#personalImage').val()) {
                var dataObj = {
                    fullname :  $('#fullname').val(),
                    email : $('#email').val(),
                    mobile : $('#mobile').val(),
                    birthday : $('#birthday').val(),
                    categoryID : $('#categoryID').val(),
                    password : $('#password').val(),
                    userCredit : $('#userCredit').val(),
                    status : $('#status').val()
                   
                }
    
                $http.put("/api/admin/user/" + id ,  dataObj)
                .then(function (response) {
                   
                    alert("تم تعديل المستخدم بنجاح ");
                    $location.path('/users' , "_self");
    
                }, function (response) {
                    
                    //alert("Error !");
                })

             }
            
            if ($('#personalImage').val()) {
                var formData = new FormData();
                var fileLogo = $('#personalImage')[0];
                formData.append('file', fileLogo.files[0]);
                $http({
                    url: "http://157.230.25.241/api/user/uploadFile",
                    method: "POST",
                    data: formData,
                    headers: {
                        'Content-Type': undefined
                    },
                    processData: false,
                }).then(function (response) {
                    $scope.personalImagepath = response.data;
                    var dataObj = {
                        fullname :  $('#fullname').val(),
                        email : $('#email').val(),
                        mobile : $('#mobile').val(),
                        birthday : $('#birthday').val(),
                        categoryID : $('#categoryID').val(),
                        password : $('#password').val(),
                        status : $('#status').val(),

                        personalImg : $scope.personalImagepath
                    }
        
                    $http.put("/api/admin/user/" + id ,  dataObj)
                    .then(function (response) {
                        alert("تم تعديل المستخدم بنجاح ");
                        $location.path('/users' , "_self");
        
                    }, function (response) {
                        //alert("Error !");
                    })
                    
                }, function (response) {
                    alert(' Error while Uploading Image !');
                })
            }
            
            
        }
    })

    .controller("editAdminCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        // var id = $routeParams.id;
        // $http.get("/api/admin/adminById?id=" + $scope.mazadAdmin._id)
        //     .then(function (response) {
        //         $scope.user = response.data;
              
        //     }, function (response) {
        //         //alert("Error !");
        //     })
       
        $scope.user = $scope.mazadAdmin;

        $scope.editData = function(){
           
                var dataObj = {
                    fullname :  $('#fullname').val(),
                    email : $('#email').val(),
                    mobile : $('#mobile').val(),
                    password : $('#password').val()
                   
                }
    
                $http.put("/api/admin/employee/" + $scope.mazadAdmin._id ,  dataObj)
                .then(function (response) {
                    alert("تم تعديل الادمن بنجاح ");
                    $scope.mazadAdmin = response.data;
                    $cookieStore.put('mazadAdmin', $scope.mazadAdmin);
                    $cookieStore.put('mazadAdminID', $scope.mazadAdmin._id);
                    $window.open("http://157.230.25.241/MazadAdmin/html/login.html", "_self");
                    //$location.path('/Default' , "_self");
    
                }, function (response) {
                    //alert("Error !");
                })

            
          
            
            
        }
    })
    .controller("addUserCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
       
        $scope.getCategories = function(){
            $http.get("/api/admin/category")
            .then(function (response) {
                $scope.categories = response.data;
              
            }, function (response) {
                //alert("Error !");
            })
        }
        $scope.getCategories()
        
       

        $scope.addData = function(){

            if ($('#personalImage').val()) {
                var formData = new FormData();
                var fileLogo = $('#personalImage')[0];
                formData.append('file', fileLogo.files[0]);
                $http({
                    url: "http://157.230.25.241/api/user/uploadFile",
                    method: "POST",
                    data: formData,
                    headers: {
                        'Content-Type': undefined
                    },
                    processData: false,
                }).then(function (response) {
                    $scope.personalImagepath = response.data;
                    var dataObj = {
                        

                        fullname :  $('#fullname').val(),
                        email : $('#email').val(),
                        mobile : $('#mobile').val(),
                        birthday : $('#birthday').val(),
                        categoryID : $('#categoryID').val(),
                        password : $('#password').val(),
                        status : 1,
                        personalImg : $scope.personalImagepath
                    }
        
                    $http.post("/api/admin/user" , dataObj)
                    .then(function (response) {
                        alert("تم اضافة  المستخدم بنجاح ");
                        $location.path('/users' , "_self");
        
                    }, function (response) {
                        //alert("Error !");
                    })
                    
                }, function (response) {
                    alert(' Error while Uploading Image !');
                })
            }
           
            
        }
    })
    

    .controller("categoriesCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        $http.get("/api/admin/category")
            .then(function (response) {
                $scope.categories = response.data;
            }, function (response) {
                //alert("Error !");
            })
    })
    .controller("addCategoryCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');

        $scope.addData = function(){
            var dataObj = {
                titleAR :  $('#titleAR').val(),
                titleEN : $('#titleEN').val(),
                status : 1
            }
            $http.post("/api/admin/category/" ,  dataObj)
            .then(function (response) {
                alert("تم اضافة الفئة  بنجاح ");
                $location.path('/categories' , "_self");
            }, function (response) {
                //alert("Error !");
            }) 
        }
    })
    
    .controller("editCategoryCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $http.get("/api/admin/categoryById?id=" + id)
            .then(function (response) {
                $scope.category = response.data;
               
            }, function (response) {
                //alert("Error !");
            })
       

        $scope.editData = function(){
           
                var dataObj = {
                    titleAR :  $('#titleAR').val(),
                    titleEN : $('#titleEN').val(),
                    status : $('#status').val()
                   
                   
                }
    
                $http.put("/api/admin/category/" + id ,  dataObj)
                .then(function (response) {
                    alert("تم تعديل الفئة  بنجاح ");
                    $location.path('/categories' , "_self");
    
                }, function (response) {
                    //alert("Error !");
                })

        }
    })


    .controller("editAboutCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $http.get("/api/admin/termsById?id=" + id)
            .then(function (response) {
                $scope.about = response.data;
               
            }, function (response) {
                //alert("Error !");
            })
       

        $scope.editData = function(){
           
                var dataObj = {
                    titleAr :  $('#titleAr').val(),
                    titleEN : $('#titleEN').val(),
                    status : $('#status').val()
                   
                   
                }
    
                $http.put("/api/admin/terms/" + id ,  dataObj)
                .then(function (response) {
                    alert("تم تعديل عنا  بنجاح ");
                    $location.path('/about' , "_self");
    
                }, function (response) {
                    //alert("Error !");
                })

        }
    })
    .controller("editTermsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        var id = $routeParams.id;
        $http.get("/api/admin/termsById?id=" + id)
            .then(function (response) {
                $scope.term = response.data;
               
            }, function (response) {
                //alert("Error !");
            })
       

        $scope.editData = function(){
           
                var dataObj = {
                    titleAr :  $('#titleAr').val(),
                    titleEN : $('#titleEN').val(),
                    status : $('#status').val()
                   
                   
                }
    
                $http.put("/api/admin/terms/" + id ,  dataObj)
                .then(function (response) {
                    alert("تم تعديل الشرط  بنجاح ");
                    $location.path('/terms' , "_self");
    
                }, function (response) {
                    //alert("Error !");
                })

        }
    })
    
    .controller("contactUsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        $http.get("/api/admin/contactus")
            .then(function (response) {
                $scope.contactUs = response.data;
            }, function (response) {
                //alert("Error !");
            })
    })
    .controller("termsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        $http.get("/api/admin/getTerms")
            .then(function (response) {
                $scope.terms = response.data;
            }, function (response) {
                //alert("Error !");
            })
    })
    .controller("aboutCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        $http.get("/api/admin/getAboutApp")
            .then(function (response) {
                $scope.about = response.data;
            }, function (response) {
                //alert("Error !");
            })
    })
    .controller("adsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        $http.get("/api/admin/ads")
            .then(function (response) {
                $scope.ads = response.data;
            }, function (response) {
                //alert("Error !");
            })
    })
    .controller("addAdsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        
        $scope.addData = function(){

            if ($('#imgPath').val()) {
                var formData = new FormData();
                var fileLogo = $('#imgPath')[0];
                formData.append('file', fileLogo.files[0]);
                $http({
                    url: "http://157.230.25.241/api/user/uploadFile",
                    method: "POST",
                    data: formData,
                    headers: {
                        'Content-Type': undefined
                    },
                    processData: false,
                }).then(function (response) {
                    $scope.imgPath = response.data;
                    var dataObj = {
                        
                        Description : $('#description').val().trim(),
                        status : 1,
                        imgPath : $scope.imgPath
                    }
        
                    $http.post("/api/admin/ads" , dataObj)
                    .then(function (response) {
                        alert("تم اضافة  الاعلان  بنجاح ");
                        $location.path('/ads' , "_self");
        
                    }, function (response) {
                        //alert("Error !");
                    })
                    
                }, function (response) {
                    alert(' Error while Uploading Image !');
                })
            }
           
            
        }
    })


    .controller("editAdsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        
        var id = $routeParams.id;
        $http.get("/api/admin/adsById?id=" + id)
            .then(function (response) {
                $scope.ads = response.data;
              
               $('#imgPath').val($scope.ads.imgPath)
            }, function (response) {
                //alert("Error !");
            })
        
        

        $scope.editData = function(){
            // console.log($('#imgPath').val());
            if (!$('#imgPath').val()) {
                var dataObj = {
                    Description : $('#description').val().trim(),

                    status : $('#status').val()
                   
                }
    
                $http.put("/api/admin/ads/" + id ,  dataObj)
                .then(function (response) {
                    alert("تم تعديل الاعلان  بنجاح ");
                    $location.path('/ads' , "_self");
    
                }, function (response) {
                    //alert("Error !");
                })

             }
            
            if ($('#imgPath').val()) {
                var formData = new FormData();
                var fileLogo = $('#imgPath')[0];
                formData.append('file', fileLogo.files[0]);
                $http({
                    url: "http://157.230.25.241/api/user/uploadFile",
                    method: "POST",
                    data: formData,
                    headers: {
                        'Content-Type': undefined
                    },
                    processData: false,
                }).then(function (response) {
                    $scope.personalImagepath = response.data;
                    var dataObj = {
                        Description : $('#description').val().trim(),

                        status : $('#status').val(),

                        imgPath : $scope.imgPath
                    }
        
                    $http.put("/api/admin/ads/" + id ,  dataObj)
                    .then(function (response) {
                        alert("تم تعديل الاعلان  بنجاح ");
                        $location.path('/ads' , "_self");
        
                    }, function (response) {
                        //alert("Error !");
                    })
                    
                }, function (response) {
                    alert(' Error while Uploading Image !');
                })
            }
            
            
        }
    })
    .controller("addTermsCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        
        $scope.addData = function(){
            var dataObj = {
                titleAr :  $('#titleAr').val(),
                titleEN : $('#titleEN').val(),
                type : 1
            }

            $http.post("/api/admin/terms" , dataObj)
            .then(function (response) {
                alert("تم اضافة الشرط بنجاح ");
                $location.path('/terms' , "_self");

            }, function (response) {
                //alert("Error !");
            })
        }
    })


    .controller("addNotificationCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        $http.get("/api/admin/users")
        .then(function (response) {
            $scope.users = response.data;
        }, function (response) {
            //alert("Error !");
        })
        
        $scope.selectedUsers = [];
        $scope.ids = [];
        $scope.keys = [];
        
        $scope.addUserToArr = function(userID){
            $scope.userExist = false;
            if($scope.selectedUsers.length > 0){
                $scope.selectedUsers.forEach((user , i ) => {
                    if(user._id == userID){
                        $scope.userExist = true;
                    }
                    if (i == $scope.selectedUsers.length - 1 &&  $scope.userExist == true){
                        alert("المستخدم موجود بالفعل ");
                        return;
                    }
                    if (i == $scope.selectedUsers.length - 1 &&  $scope.userExist == false){
                        $scope.users.forEach((ruser , r) => {
                                if(ruser._id == userID){
                                    $scope.selectedUsers.push(ruser);
                                    $scope.ids.push(ruser._id);
                                    $scope.keys.push(ruser.userKey);
                                }
                        });
                       
                    }
    
                });
            }
            if($scope.selectedUsers.length == 0 ){
                $scope.users.forEach((ruser , r) => {
                    if(ruser._id == userID){
                        $scope.selectedUsers.push(ruser);
                        $scope.ids.push(ruser._id);
                        $scope.keys.push(ruser.userKey);
                    }
                });
            }
            
            
        }
        $scope.deleteSelectedUser = function(index){
            $scope.selectedUsers = $scope.selectedUsers || [];
            $scope.ids = $scope.ids || [];
            $scope.keys = $scope.keys || [];

            $scope.selectedUsers.splice(index , 1);
            $scope.ids.splice(index , 1)
            $scope.keys.splice(index , 1)
        }
        


        $scope.sendNotification = function(){
            if($scope.selectedUsers && $scope.selectedUsers.length > 0  ){
                // if(  !$scope.msg || ($scope.msg && $scope.msg.length ==0)){
                //     alert("يرجى كتابة الرسالة  ");
                //     return;
                // }
            
                var Info = {
                    ids : $scope.ids,
                    keys : $scope.keys,
                    msg : $('#msg').val()
                }
            
                
                $http.post("/api/admin/sendNotificationToGroupUsers", Info)
                    .then(function (response) {
                        alert("تم ارسال الرسالة بنجاح");
                       
                        $scope.selectedUsers = [];
                        $scope.ids = [];
                        $scope.keys = [];
                        $("#msg").val('');
                        
                    }, function (response) {
                        //alert("Error !");
                    })
                }else{
                    alert("يرجى اختيار مستخدم واحد على الاقل ");
                }
            
            }
    })


    .controller("sendNotificationToUserCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        
        var id = $routeParams.id;
        $http.get("/api/admin/userById?id=" + id)
        .then(function (response) {
            $scope.user = response.data;
            if(!$scope.user.userKey){
                alert("لا يمكن ارسال اشعار لهذا المستخدم ، المستخدم لم يسجل الدخول على الهاتف من قبل ");
                $location.path('/users' , "_self");
                return;
            }
            $scope.ids = [];
            $scope.keys = [];
            $scope.ids.push($scope.user._id);
            $scope.keys.push($scope.user.userKey);
        }, function (response) {
            //alert("Error !");
        })
        
        //$scope.selectedUsers = [];
        
        

        $scope.sendNotification = function(){
      
                // if(  !$scope.msg || ($scope.msg && $scope.msg.length ==0)){
                //     alert("يرجى كتابة الرسالة  ");
                //     return;
                // }
            
                var Info = {
                    ids : $scope.ids,
                    keys : $scope.keys,
                    msg : $('#msg').val()
                }
            
                console.log(Info);
               
                $http.post("/api/admin/sendNotificationToGroupUsers", Info)
                    .then(function (response) {
                        alert("تم ارسال الرسالة بنجاح");
                       
                      
                        $scope.ids = [];
                        $scope.keys = [];
                        $scope.msg = '';
                        $location.path("/users" , "_self");
                        
                    }, function (response) {
                        //alert("Error !");
                    })
                }
            
        
    })
    .controller("addAboutCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location , $routeParams) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin');
        
        $scope.addData = function(){
            var dataObj = {
                titleAr :  $('#titleAr').val(),
                titleEN : $('#titleEN').val(),
                type : 2
            }

            $http.post("/api/admin/terms" , dataObj)
            .then(function (response) {
                alert("تم اضافة عنا  بنجاح ");
                $location.path('/about' , "_self")
            }, function (response) {
                //alert("Error !");
            })
        }
       
    })
    
    
    
    
    
    
    
    
    
    

    .controller("homeCtrl", function ($scope, $http, $rootScope, $window, $cookieStore, $location) {
        $scope.mazadAdmin = $cookieStore.get('mazadAdmin')
        $rootScope.cuser = $cookieStore.get('mazadAdmin')
        $scope.userId = $cookieStore.get('id');
        // $('#allusers').hide();
        // $('#employees').hide();
        // $('#empType').hide();
        // $('#AllCountries').hide();
        // $('#category').hide();
        // $('#carModel').hide();
        // $('#carYear').hide();
        // $('#carType').hide();
        // $('#allRequests').hide();
        // $('#allReceipt').hide();
        // $('#allCars').hide();
        // $('#permissions').hide();
        // $http.get("/api/admin/employeePermission?id=" + $rootScope.cuser.employeeTypeID)
        //     .then(function (response) {
        //         $scope.employeeTypePermissions = response.data;

        //         $scope.employeeTypePermissions.forEach(empPer => {
        //             if (empPer.permissionID && empPer.permissionID.value) {
        //                 $('#' + empPer.permissionID.value).show();
        //             }
        //         });
        //         // console.log($scope.employeeTypePermissions);
        //     }, function (response) {
        //         //alert("Error !");
        //     })


        $rootScope.logOutFun = function () {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
             
                $cookieStore.remove('mazadAdmin');
                $cookieStore.remove('mazadAdminID');
                alert('تم تسجيل الخروج !!');
                $window.open("http://157.230.25.241/MazadAdmin/html/login.html", "_self");
            }
        }

    })




    .controller("DefualtCtrl", function ($rootScope, $scope, $http, $window, $cookieStore) {
        $http.get("/api/admin/totalApps")
            .then(function (response) {
                $scope.totalApps = response.data.message;
            }, function (response) {
                //alert("Error !");
            })
        $http.get("/api/admin/totalUsers")
            .then(function (response) {
                $scope.totalUsers = response.data.message;
            }, function (response) {
                //alert("Error !");
            })
        $http.get("/api/admin/totalAppsAccepted")
            .then(function (response) {
                $scope.totalAppsAccepted = response.data.message;
            }, function (response) {
                //alert("Error !");
            })
        $http.get("/api/admin/totalCategories")
            .then(function (response) {
                $scope.totalCategories = response.data.message;
            }, function (response) {
                //alert("Error !");
            })



    })

   