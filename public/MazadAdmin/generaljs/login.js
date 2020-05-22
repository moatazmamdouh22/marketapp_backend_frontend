

    
(function () {
    angular.module('mazadAdmin', ['ngCookies'])
        .filter('cmdate', [
            '$filter', function ($filter) {
                return function (input, format) {
                    return $filter('date')(new Date(input), format);
                };
            }
        ])

 

        .controller("SignInCtrl", function ($scope, $http, $rootScope, $window, $rootScope, $cookieStore) {
            $rootScope.mazadAdmin = $cookieStore.get('mazadAdmin');
            $rootScope.mazadAdminID = $cookieStore.get('mazadAdminID');



            if ($rootScope.mazadLang = $cookieStore.get('mazadLang')) {
                if ($rootScope.mazadLang == 'en') {
                    $('body').css("direction", "ltr");
                } else {
                    $cookieStore.put('mazadLang', 'ar')
                    $rootScope.mazadLang = $cookieStore.get('mazadLang');
                    $('body').css("direction", "rtl");

                }
            }


            if ($rootScope.mazadAdminID && $rootScope.mazadAdminID.length > 0) {
                $window.open("http://157.230.25.241/MazadAdmin/html/mazadAdmin.html", "_self");
                // $window.open("/Website/html/mazadAdmin.html", "_self");
            }


            $rootScope.changeLang = function (lang) {
                $cookieStore.put('mazadLang', lang);
                $rootScope.mazadLang = $cookieStore.get('mazadLang');
                if ($rootScope.mazadLang == 'ar') {
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
                $http.get("/api/admin/login?val=" + mail + "&password=" + pass)
                    .then(function (response) {
                        $rootScope.mazadAdmin = response.data;
                        $cookieStore.put('mazadAdmin', $rootScope.mazadAdmin);
                        $cookieStore.put('mazadAdminID', $rootScope.mazadAdmin._id);

                        if ($rootScope.mazadLang = $cookieStore.get('mazadLang')) {
                            if ($rootScope.mazadLang == 'ar') {
                                $('body').css("direction", "rtl");
                            }
                            if ($rootScope.mazadLang == 'en') {
                                $('body').css("direction", "ltr");
                            }
                            if ($rootScope.mazadLang != 'en' && $rootScope.mazadLang != 'ar') {
                                $cookieStore.put('mazadLang', 'ar');
                                $rootScope.mazadLang = $cookieStore.get('mazadLang')
                                $('body').css("direction", "rtl");
                            }

                        }
                        $rootScope.alertMessageLang(
                            "مرحبا " + " " + $rootScope.mazadAdmin.fullname,
                            "Welcome " + " " + $rootScope.mazadAdmin.fullname,
                            $rootScope.mazadLang
                        )
                        $window.open("http://157.230.25.241/MazadAdmin/html/mazadAdmin.html", "_self");
                        //$window.open("/Website/html/mazadAdmin.html", "_self");

                    },
                        function (response) {
                            if (response.data.message.includes("Authentication failed")) {
                                $rootScope.alertMessageLang(
                                    "ايميل أو كلمة مرور خطـــأ !!  ",
                                    "Wrong email or password !!  ",
                                    $rootScope.mazadLang
                                )
                                return;
                            }
                            $rootScope.alertMessageLang(
                                "حدث خطأ ما !!  ",
                                "SomSomething went wrong !!  ",
                                $rootScope.mazadLang
                            )
                        }
                    )
            }

        })
      


})
    ();