'use strict';

// global app declaration
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-loading-bar']).constant('CONFIG', {
    // This is the url for the database. Change it between local and host when needed.
    DBURL: 'http://localhost:8800/'
    //DBURL: 'https://qss-judge.heroku.com/'
}).run(function ($log, $rootScope, routeInterceptor) {
    // Set listener on state changes
    routeInterceptor.listenOnRoute();

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        $log.error('$stateChangeError ' + toState.name + ' - fired when an error occurs during transition.', '\n  event: ', event, '\n  toState: ', toState, '\n  toParams: ', toParams, '\n  fromState: ', fromState, '\n  fromParams: ', fromParams, '\n  error: ', error);
    });
});
'use strict';

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '',
        abstract: true,
        templateUrl: 'build/views/pages/home.html',
        controller: 'homeController',
        controllerAs: 'ctrl',
        resolve: HomeController.resolve()
    }).state('home.landing', {
        url: '/home',
        templateUrl: 'build/views/pages/landing/landing.html',
        controller: 'landingController',
        controllerAs: 'ctrl',
        hideSide: true
    })

    //admin related states

    .state('home.login', {
        url: '/login',
        templateUrl: 'build/views/pages/admin/admin-login/admin-login.html',
        controller: 'adminLoginController',
        controllerAs: 'ctrl',
        hideNav: true
    }).state('home.admin', {
        url: '/admin/{adminId:[0-9]+}',
        abstract: true,
        templateUrl: 'build/views/pages/admin/admin-nav/admin-nav.html',
        controller: 'adminNavController',
        controllerAs: 'ctrl',
        resolve: AdminNavController.resolve()
    }).state('home.admin.dashboard', {
        url: '/dashboard',
        templateUrl: 'build/views/pages/admin/admin-dashboard/admin-dashboard.html',
        controller: 'adminDashboardController',
        controllerAs: 'ctrl'
    }).state('home.admin.users', {
        url: '/user-management',
        templateUrl: 'build/views/pages/admin/admin-users/admin-users.html'
    }).state('home.admin.summit', {
        url: '',
        abstract: true,
        template: '<ui-view />'
    }).state('home.admin.summit.management', {
        url: '/summit-management',
        templateUrl: 'build/views/pages/admin/admin-summits/admin-summits.html'
    }).state('home.admin.admins', {
        url: '/admins',
        templateUrl: 'build/views/pages/admin/admin-admins/admins.html',
        controller: 'adminsController',
        controllerAs: 'ctrl',
        resolve: AdminsController.resolve()
    }).state('home.admin.info', {
        url: '/info/{adminInfoId:[0-9]+}',
        templateUrl: 'build/views/pages/admin/admin-admins/admin-info.html',
        controller: 'adminInfoController',
        controllerAs: 'ctrl',
        params: {
            admin: null
        },
        resolve: AdminInfoController.resolve()
    }).state('home.admin.settings', {
        url: '',
        template: '<ui-view />'
    }).state('home.admin.settings.management', {
        url: '/settings',
        templateUrl: 'build/views/pages/admin/admin-settings-management/admin-settings-management.html'
    }).state('home.admin.summit.summits', {
        url: '/summits',
        templateUrl: 'build/views/pages/admin/admin-settings/summits/summits.html',
        controller: 'summitsController',
        controllerAs: 'ctrl',
        resolve: SummitsController.resolve()
    }).state('home.admin.summit.info', {
        url: '/summit/{summitId:[0-9]+}',
        templateUrl: 'build/views/pages/admin/admin-settings/summits/summit-info.html',
        controller: 'summitInfoController',
        controllerAs: 'ctrl',
        resolve: SummitInfoController.resolve()
    }).state('home.admin.settings.site', {
        url: '',
        abstract: true,
        templateUrl: 'build/views/pages/admin/admin-settings/admin-settings.html',
        controller: 'adminSettingsController',
        controllerAs: 'ctrl'
    }).state('home.admin.settings.site.institutions', {
        url: '/institutions',
        templateUrl: 'build/views/pages/admin/admin-settings/institutions/institutions.html',
        controller: 'institutionsController',
        controllerAs: 'ctrl',
        sideTab: 'institutions',
        resolve: InstitutionsController.resolve()
    }).state('home.admin.settings.site.roles', {
        url: '/roles',
        templateUrl: 'build/views/pages/admin/admin-settings/roles/roles.html',
        controller: 'rolesController',
        controllerAs: 'ctrl',
        sideTab: 'roles',
        resolve: RolesController.resolve()
    }).state('home.admin.settings.site.poster-categories', {
        url: '/poster-categories',
        templateUrl: 'build/views/pages/admin/admin-settings/poster-categories/poster-categories.html',
        controller: 'posterCategoriesController',
        controllerAs: 'ctrl',
        sideTab: 'poster-categories',
        resolve: PosterCategoriesController.resolve()
    }).state('home.admin.settings.site.judge-categories', {
        url: '/judge-categories',
        templateUrl: 'build/views/pages/admin/admin-settings/judge-categories/judge-categories.html',
        controller: 'judgeCategoriesController',
        controllerAs: 'ctrl',
        sideTab: 'judge-categories',
        resolve: JudgeCategoriesController.resolve()
    }).state('home.admin.settings.site.awards', {
        url: '/awards',
        templateUrl: 'build/views/pages/admin/admin-settings/awards/awards.html',
        controller: 'awardsController',
        controllerAs: 'ctrl',
        sideTab: 'awards',
        resolve: AwardsController.resolve()
    }).state('home.admin.settings.site.questions', {
        url: '/questions',
        templateUrl: 'build/views/pages/admin/admin-settings/questions/questions.html',
        controller: 'questionsController',
        controllerAs: 'ctrl',
        sideTab: 'questions',
        resolve: QuestionsController.resolve()
    }).state('home.admin.settings.site.question-sections', {
        url: '/question-sections',
        templateUrl: 'build/views/pages/admin/admin-settings/question-sections/question-sections.html',
        controller: 'questionSectionsController',
        controllerAs: 'ctrl',
        sideTab: 'question-sections',
        resolve: QuestionSectionsController.resolve()
    }).state('home.admin.reporting', {
        url: '/reporting?summitId',
        templateUrl: 'build/views/pages/admin/admin-reporting/admin-reporting.html',
        controller: 'adminReportingController',
        controllerAs: 'ctrl',
        resolve: AdminReportingController.resolve()
    }).state('home.admin.awards', {
        url: '/assign-awards',
        templateUrl: 'build/views/pages/admin/admin-assign-awards/admin-assign-awards.html',
        controller: 'adminAssignAwardsController',
        controllerAs: 'ctrl',
        resolve: AdminAssignAwardsController.resolve()
    }).state('home.admin.judges', {
        url: '/judges',
        templateUrl: 'build/views/pages/admin/admin-judges/admin-judges.html',
        controller: 'adminJudgesController',
        controllerAs: 'ctrl',
        resolve: AdminJudgesController.resolve()
    }).state('home.admin.judge', {
        url: '/judge/{judgeId:[0-9]+}',
        templateUrl: 'build/views/pages/admin/admin-judges/admin-judge-info.html',
        controller: 'adminJudgeInfoController',
        controllerAs: 'ctrl',
        resolve: AdminJudgeInfoController.resolve()
    }).state('home.admin.assign', {
        url: '/assign-posters',
        templateUrl: 'build/views/pages/admin/admin-assign-posters/admin-assign-posters.html',
        controller: 'adminAssignPostersController',
        controllerAs: 'ctrl',
        resolve: AdminAssignPostersController.resolve()
    }).state('home.admin.presenters', {
        url: '/presenters',
        templateUrl: 'build/views/pages/admin/admin-participants/admin-participants.html',
        controller: 'adminParticipantsController',
        controllerAs: 'ctrl',
        resolve: AdminParticipantsController.resolve()
    }).state('home.admin.presenter', {
        url: '/presenter/{presenterId:[0-9]+}',
        templateUrl: 'build/views/pages/admin/admin-participants/admin-participant-info.html',
        controller: 'adminPresenterInfoController',
        controllerAs: 'ctrl',
        resolve: AdminPresenterInfoController.resolve()
    }).state('home.admin.register', {
        url: '/register',
        templateUrl: 'build/views/pages/admin/admin-register/admin-register.html',
        controller: 'adminRegisterController',
        controllerAs: 'ctrl'
    }).state('home.admin.register-institution', {
        url: '/register-institution',
        templateUrl: 'build/views/pages/admin/admin-register-institution/admin-register-institution.html',
        params: {
            valid: false
        },
        controller: 'adminRegisterInstitutionController',
        controllerAs: 'ctrl',
        resolve: {
            institutions: ['institutionService', function (institutionService) {
                return institutionService.get({ active: 1 }).then(function (data) {
                    return data;
                });
            }],

            roles: ['roleService', function (roleService) {
                return roleService.get({ active: 1 }).then(function (data) {
                    return data;
                });
            }]

        }
    }).state('home.admin.register-info', {
        url: '/register-info',
        templateUrl: 'build/views/pages/admin/admin-register-info/admin-register-info.html',
        params: {
            valid: false
        },
        controller: 'adminRegisterInfoController',
        controllerAs: 'ctrl'
    })

    // register related states

    .state('register', {
        url: '/register',
        templateUrl: 'build/views/pages/registration/register/register.html',
        controller: 'registerController',
        controllerAs: 'ctrl',
        resolve: RegisterController.resolve()
    }).state('register-confirmation', {
        url: '/register-confirmation',
        templateUrl: 'build/views/pages/registration/register-confirmation/register-confirmation.html',
        controller: 'registerConfirmationController',
        controllerAs: 'ctrl'
    }).state('register-institution', {
        url: '/register-institution',
        templateUrl: 'build/views/pages/registration/register-institution/register-institution.html',
        params: {
            valid: false
        },
        controller: 'registerInstitutionController',
        controllerAs: 'ctrl',
        resolve: RegisterInstitutionController.resolve()
    }).state('register-info', {
        url: '/register-info',
        templateUrl: 'build/views/pages/registration/register-info/register-info.html',
        params: {
            valid: false
        },
        controller: 'registerInfoController',
        controllerAs: 'ctrl'
    })

    // judge related states

    .state('home.judge-login', {
        url: '/judge-login',
        templateUrl: 'build/views/pages/judge/judge-login/judge-login.html',
        controller: 'judgeLoginController',
        controllerAs: 'ctrl',
        hideNav: true
    }).state('home.judge', {
        url: '/judge/{judgeId:[0-9]+}',
        abstract: true,
        templateUrl: 'build/views/pages/judge/judge-nav/judge-nav.html',
        controller: 'judgeNavController',
        controllerAs: 'ctrl',
        resolve: JudgeNavController.resolve()
    }).state('home.judge.dashboard', {
        url: '/dashboard',
        templateUrl: 'build/views/pages/judge/judge-dashboard/judge-dashboard.html',
        controller: 'judgeDashboardController',
        controllerAs: 'ctrl',
        resolve: JudgeDashboardController.resolve()
    }).state('home.judge.info', {
        url: '/info',
        templateUrl: 'build/views/pages/judge/judge-info/judge-info.html',
        controller: 'judgeInfoController',
        controllerAs: 'ctrl',
        resolve: JudgeInfoController.resolve()
    }).state('home.judge.form', {
        url: '/form/{formId:[0-9]+}',
        templateUrl: 'build/views/pages/judge/judge-form/judge-form.html',
        controller: 'judgeFormController',
        controllerAs: 'ctrl',
        hideSide: true,
        resolve: JudgeFormController.resolve()
    });

    // default to landing page
    $urlRouterProvider.otherwise('/home');
}]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseTableModelController = function () {
    function BaseTableModelController(service, models) {
        _classCallCheck(this, BaseTableModelController);

        this.service = service;
        this.models = models;
        this.model = { active: 1 };
        this.modal = false;
    }

    _createClass(BaseTableModelController, [{
        key: 'add',
        value: function add() {
            var _this = this;

            this.service.create(this.model).then(function (model) {
                angular.element('.modal').modal('close');
                _this.setModal();
                _this.models.push(model);
                _this.model = { active: 1 };
            });
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.model = { active: 1 };
            this.setModal();
        }
    }, {
        key: 'activate',
        value: function activate(model) {
            model.active = 1;
            this.service.update(model);
        }
    }, {
        key: 'deactivate',
        value: function deactivate(model) {
            model.active = 0;
            this.service.delete(model);
        }
    }, {
        key: 'setModal',
        value: function setModal() {
            this.modal = this.modal ? false : true;
        }
    }]);

    return BaseTableModelController;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseSiteController = function BaseSiteController(service, models) {
    _classCallCheck(this, BaseSiteController);

    this.service = service;
    this.models = models;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseSiteTableModelController = function () {
    function BaseSiteTableModelController(service, models) {
        _classCallCheck(this, BaseSiteTableModelController);

        this.service = service;
        this.models = models;
        this.model = { active: '1' };
        this.modal = false;
        this.canEdit = false;
    }

    _createClass(BaseSiteTableModelController, [{
        key: 'add',
        value: function add() {
            var _this = this;

            this.service.create(this.model).then(function (model) {
                angular.element('.modal').modal('close');
                _this.setModal();
                _this.models.push(model);
                _this.model = { active: '1' };
            });
        }
    }, {
        key: 'edit',
        value: function edit() {
            var _this2 = this;

            this.service.update(this.model).then(function (model) {
                angular.element('.modal').modal('close');
                _this2.setModal();
                _this2.model = { active: '1' };
            });
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.model = { active: '1' };
            this.setModal();
            this.canEdit = false;
        }
    }, {
        key: 'activate',
        value: function activate(model) {
            model.active = '1';
            this.service.update(model);
        }
    }, {
        key: 'deactivate',
        value: function deactivate(model) {
            model.active = '0';
            this.service.delete(model);
        }
    }, {
        key: 'setModal',
        value: function setModal() {
            this.modal = this.modal ? false : true;
        }
    }, {
        key: 'setEdit',
        value: function setEdit(model) {
            this.canEdit = true;
            this.original = model;
            this.model = angular.copy(this.original);
        }
    }]);

    return BaseSiteTableModelController;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseApiService = function () {
    function BaseApiService($injector, serviceUrl, serviceType) {
        _classCallCheck(this, BaseApiService);

        this.$log = $injector.get('$log');
        this.$http = $injector.get('$http');
        this.$q = $injector.get('$q');
        this.baseUrl = $injector.get('CONFIG').DBURL;
        this.notificationService = $injector.get('notificationService');
        this.authService = $injector.get('authService');
        this.serviceUrl = serviceUrl;
        this.serviceType = serviceType;
    }

    // Regex found here: http://stackoverflow.com/questions/8955533/javascript-jquery-split-camelcase-string-and-add-hyphen-rather-than-space


    _createClass(BaseApiService, [{
        key: 'get',
        value: function get(params) {
            var _this = this;

            var deferred = this.$q.defer();

            var paramString = this.sanitizeParams(params);

            var url = this.baseUrl + this.serviceUrl + paramString;
            this.$http.get(url).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (error) {
                if (error.status === 401) {
                    _this.authService.logout();
                }
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }, {
        key: 'create',
        value: function create(object) {
            var _this2 = this;

            var deferred = this.$q.defer();

            var backendSafeObject = this.sanitizeObject(object);

            var url = this.baseUrl + this.serviceUrl + '/create';
            this.$http.post(url, backendSafeObject).then(function (response) {
                _this2.notificationService.success('Successfully created ' + _this2.serviceType + '!');
                deferred.resolve(response.data[0]);
            }).catch(function (error) {
                _this2.notificationService.error('Failed to create ' + _this2.serviceType + '!');
                deferred.reject(error);
            });
            return deferred.promise;
        }

        // Note: This method is also used for most deletes since we're just updating the active value to 0

    }, {
        key: 'update',
        value: function update(object) {
            var _this3 = this;

            var deferred = this.$q.defer();

            var backendSafeObject = this.sanitizeObject(object);

            var url = this.baseUrl + this.serviceUrl + '/update';
            this.$http.post(url, backendSafeObject).then(function (response) {
                _this3.notificationService.success('Successfully updated ' + _this3.serviceType + '!');
                deferred.resolve(response.data[0]);
            }).catch(function (error) {
                _this3.notificationService.error('Failed to update ' + _this3.serviceType + '!');
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }, {
        key: 'sanitizeParams',
        value: function sanitizeParams(params) {
            var paramString = '';
            if (params) {
                _.forOwn(params, function (value, key) {
                    var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                    paramString += '/' + newKey + '/' + value;
                });
            }
            return paramString;
        }
    }, {
        key: 'sanitizeObject',
        value: function sanitizeObject(object) {
            var backendSafeObject = {};
            if (object) {
                if (Array.isArray(object)) {
                    backendSafeObject = [];
                    var index = 0;
                    _.forEach(object, function (item) {
                        backendSafeObject[index] = {};
                        _.forOwn(item, function (value, key) {
                            var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                            backendSafeObject[index][newKey] = value;
                        });
                        index++;
                    });
                } else {
                    _.forOwn(object, function (value, key) {
                        var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        backendSafeObject[newKey] = value;
                    });
                }
            }
            return backendSafeObject;
        }
    }]);

    return BaseApiService;
}();

app.factory('baseApiService', BaseApiService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthService = function () {
    _createClass(AuthService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($http, $log, $state, $q, localStorageService, CONFIG) {
            AuthService.instance = new AuthService($http, $log, $state, $q, localStorageService, CONFIG);
            return AuthService.instance;
        }
    }]);

    function AuthService($http, $log, $state, $q, localStorageService, CONFIG) {
        _classCallCheck(this, AuthService);

        this.$http = $http;
        this.$log = $log;
        this.$state = $state;
        this.$q = $q;
        this.localStorageService = localStorageService;
        this.baseUrl = CONFIG.DBURL;
        this.currentUser = this.localStorageService.get('currentUser');
        this.authToken = this.localStorageService.get('authToken');
    }

    _createClass(AuthService, [{
        key: 'login',
        value: function login(email, password) {
            var _this = this;

            var deferred = this.$q.defer();

            var url = this.baseUrl + 'authorize';
            this.$http.post(url, { email: email, password: password }).then(function (response) {
                _this.$log.info('Login for user ' + email + ' successful!');
                _this.currentUser = response.data.user[0];
                _this.authToken = response.data.token.jwt;
                deferred.resolve(response.data.user[0]);
            }).catch(function (error) {
                _this.$log.error('Login for user ' + email + ' failed!');
                _this.currentUser = null;
                _this.authToken = null;
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }, {
        key: 'logout',
        value: function logout() {
            this.clearToken();
            this.$state.go('home.landing');
        }
    }, {
        key: 'clearToken',
        value: function clearToken() {
            this.currentUser = null;
            this.authToken = null;
        }
    }, {
        key: 'currentUser',
        get: function get() {
            return this._currentUser;
        },
        set: function set(data) {
            this.localStorageService.set('currentUser', data);
            this._currentUser = data;
        }
    }, {
        key: 'authToken',
        get: function get() {
            return this._authToken;
        },
        set: function set(token) {
            this.localStorageService.set('authToken', token);
            this._authToken = token;
            if (token) {
                this.$http.defaults.headers.common.Authorization = 'Bearer ' + token;
            } else {
                this.$http.defaults.headers.common.Authorization = null;
            }
        }
    }, {
        key: 'isAdmin',
        get: function get() {
            if (this.currentUser !== null) {
                return this.currentUser.type === 'Admin';
            }
            return false;
        }
    }, {
        key: 'isJudge',
        get: function get() {
            if (this.currentUser !== null) {
                return this.currentUser.type === 'Judge';
            }
            return false;
        }
    }, {
        key: 'isLoggedIn',
        get: function get() {
            return this.currentUser !== null || this.authToken !== null;
        }
    }]);

    return AuthService;
}();

AuthService.$inject = ['$http', '$log', '$state', '$q', 'localStorageService', 'CONFIG'];
app.factory('authService', AuthService.serviceFactory);
'use strict';

// This will help with dealing with our boolean values are 1 and 0

// Returns true if the value inside equals 1
function isTrue(val) {
    return val === 1 || val === '1';
}
"use strict";

// Not technically a service but didn't want to make n entire folder for this.

function getDate(dateString) {
    return new Date(dateString);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmailService = function () {
    function EmailService($http, $q, CONFIG, notificationService) {
        _classCallCheck(this, EmailService);

        this.$http;
        this.$q;
        this.notificationService;
        this.baseUrl = CONFIG.DBURL;
    }

    // Any email we need to do can go here. Name the function after the purpose of the email


    _createClass(EmailService, [{
        key: 'test',
        value: function test() {
            var _this = this;

            var deferred = $q.defer();

            this.$http.get(this.baseUrl + '/test').then(function (data) {
                _this.notificationService.success('Message was sent!');
            }).catch(function (error) {
                _this.notificationService.error('Message could not be sent!');
            });
        }
    }]);

    return EmailService;
}();

EmailService.$inject = ['$http', '$q', 'CONFIG', 'notificationService'];
app.service('email', EmailService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalStorageService = function () {
    function LocalStorageService($log, $window) {
        _classCallCheck(this, LocalStorageService);

        this.$log = $log;
        this.localStorage = $window.localStorage;
    }

    _createClass(LocalStorageService, [{
        key: 'get',
        value: function get(key) {
            this.$log.debug('Getting: ' + key);
            var json = this.localStorage.getItem(key);
            // If the item is undefined, return undefined
            return json === 'undefined' ? undefined : angular.fromJson(json);
        }
    }, {
        key: 'set',
        value: function set(key, item) {
            this.$log.debug('Setting: ' + key + ' to ' + angular.toJson(item));
            var json = angular.toJson(item);
            this.localStorage.setItem(key, json);
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            this.$log.debug('Deleting: ' + key);
            this.localStorage.removeItem(key);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.$log.debug('Clearing all keys!');
            this.localStorage.clear();
        }
    }]);

    return LocalStorageService;
}();

LocalStorageService.$inject = ['$log', '$window'];
app.service('localStorageService', LocalStorageService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationService = function () {
    function NotificationService($log) {
        _classCallCheck(this, NotificationService);

        this.$log = $log;
    }

    _createClass(NotificationService, [{
        key: 'success',
        value: function success(message) {
            this.$log.info(message);
            Materialize.toast(message, 4000, 'success');
        }
    }, {
        key: 'error',
        value: function error(message) {
            this.$log.error(message);
            Materialize.toast(message, 4000, 'error');
        }
    }]);

    return NotificationService;
}();

NotificationService.$inject = ['$log'];
app.service('notificationService', NotificationService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReCaptchaService = function () {
    _createClass(ReCaptchaService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            ReCaptchaService.instance = new ReCaptchaService($injector);
            return ReCaptchaService.instance;
        }
    }]);

    function ReCaptchaService($injector) {
        _classCallCheck(this, ReCaptchaService);

        this.$log = $injector.get('$log');
        this.$http = $injector.get('$http');
        this.$q = $injector.get('$q');
        this.baseUrl = $injector.get('CONFIG').DBURL;
        this.notificationService = $injector.get('notificationService');
    }

    // Regex found here: http://stackoverflow.com/questions/8955533/javascript-jquery-split-camelcase-string-and-add-hyphen-rather-than-space


    _createClass(ReCaptchaService, [{
        key: 'send',
        value: function send(object) {
            var deferred = this.$q.defer();

            var backendSafeObject = this.sanitizeObject(object);

            var url = this.baseUrl + 'recaptcha' + '/send';
            this.$http.post(url, backendSafeObject).then(function (response) {
                if (response.data.success) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }).catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }, {
        key: 'sanitizeObject',
        value: function sanitizeObject(object) {
            var backendSafeObject = {};
            if (object) {
                if (Array.isArray(object)) {
                    backendSafeObject = [];
                    var index = 0;
                    _.forEach(object, function (item) {
                        backendSafeObject[index] = {};
                        _.forOwn(item, function (value, key) {
                            var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                            backendSafeObject[index][newKey] = value;
                        });
                        index++;
                    });
                } else {
                    _.forOwn(object, function (value, key) {
                        var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        backendSafeObject[newKey] = value;
                    });
                }
            }
            return backendSafeObject;
        }
    }]);

    return ReCaptchaService;
}();

app.factory('reCaptchaService', ReCaptchaService.serviceFactory);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var registrationService = function () {
    function registrationService($log, $http, presenterService, posterCategoryService, keyParticipantService, posterAbstractService, posterService) {
        _classCallCheck(this, registrationService);

        this.presenterFirstName = "";
        this.presenterLastName = "";
        this.presenterSuffix = "";
        this.presenterEmail = "";
        this.presenterInstitution = "";
        this.presenterRole = "";
        this.keyParticipants = [];
        this.projectTitle = "";
        this.projectObjective = "";
        this.projectMethods = "";
        this.projectResults = "";
        this.projectConclusion = "";
        this.summitId = 0;
        this.posterCategoryId = 0;
        this.presenter = {};
        this.posterAbstract = {};
        this.poster = {};
        this.$http = $http;
        this.$log = $log;
        this.presenterService = presenterService;
        this.posterCategoryService = posterCategoryService;
        this.keyParticipantService = keyParticipantService;
        this.posterAbstractService = posterAbstractService;
        this.posterService = posterService;
    }

    _createClass(registrationService, [{
        key: "makePresenter",
        value: function makePresenter() {
            this.presenter = {
                firstName: this.presenterFirstName,
                lastName: this.presenterLastName,
                suffix: this.presenterSuffix,
                email: this.presenterEmail,
                institutionId: this.presenterInstitution,
                roleId: this.presenterRole
            };
            return this.presenter;
        }
    }, {
        key: "makePosterAbstract",
        value: function makePosterAbstract() {
            this.posterAbstract = {
                title: this.projectTitle,
                objective: this.projectObjective,
                methods: this.projectMethods,
                results: this.projectResults,
                conclusion: this.projectConclusion
            };
            return this.posterAbstract;
        }
    }, {
        key: "create",
        value: function create() {
            var _this = this;

            this.presenterService.create(this.presenter).then(function (presenter) {
                _.forEach(_this.keyParticipants, function (keyParticipant) {
                    keyParticipant.presenterId = presenter.presenterId;
                    _this.keyParticipantService.create(keyParticipant);
                });
                _this.posterAbstractService.create(_this.posterAbstract).then(function (posterAbstract) {
                    _this.poster.presenterId = presenter.presenterId;
                    _this.poster.posterAbstractId = posterAbstract.posterAbstractId;
                    _this.poster.submissionDate = new Date();
                    _this.posterService.create(_this.poster);
                });
            });
        }
    }, {
        key: "email",
        value: function email() {
            this.$http.post();
        }
    }]);

    return registrationService;
}();

registrationService.$inject = ['$log', '$http', 'presenterService', 'posterCategoryService', 'keyParticipantService', 'posterAbstractService', 'posterService'];
app.service('registrationService', registrationService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReportService = function () {
    function ReportService($injector) {
        _classCallCheck(this, ReportService);

        this.$log = $injector.get('$log');
        this.$http = $injector.get('$http');
        this.baseUrl = $injector.get('CONFIG').DBURL;
        this.notificationService = $injector.get('notificationService');
        this.authService = $injector.get('authService');
    }

    _createClass(ReportService, [{
        key: 'generate',
        value: function generate(object, fileName) {
            var _this = this;

            var backendSafeObject = this.sanitizeObject(object);

            var url = this.baseUrl + 'report/download';
            this.$http.post(url, backendSafeObject).then(function (response) {
                _this.notificationService.success('Successfully downloaded report!');
                _this.download(response.data, fileName, 'text/csv;encoding:utf-8');
            }).catch(function (error) {
                _this.notificationService.error('Failed to download report!');
            });
        }

        // Based on code here: http://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side

    }, {
        key: 'download',
        value: function download(content, fileName, mimeType) {
            var a = document.createElement('a');
            mimeType = mimeType || 'application/octet-stream';

            if (navigator.msSaveBlob) {
                // IE10
                navigator.msSaveBlob(new Blob([content], {
                    type: mimeType
                }), fileName);
            } else if (URL && 'download' in a) {
                //html5 A[download]
                a.href = URL.createObjectURL(new Blob([content], {
                    type: mimeType
                }));
                a.setAttribute('download', fileName);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
            }
        }
    }, {
        key: 'sanitizeObject',
        value: function sanitizeObject(object) {
            var backendSafeObject = {};
            if (object) {
                if (Array.isArray(object)) {
                    backendSafeObject = [];
                    var index = 0;
                    _.forEach(object, function (item) {
                        backendSafeObject[index] = {};
                        _.forOwn(item, function (value, key) {
                            var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                            backendSafeObject[index][newKey] = value;
                        });
                        index++;
                    });
                } else {
                    _.forOwn(object, function (value, key) {
                        var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        backendSafeObject[newKey] = value;
                    });
                }
            }
            return backendSafeObject;
        }
    }]);

    return ReportService;
}();

ReportService.$inject = ['$injector'];
app.service('reportService', ReportService);
"use strict";

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminService = function (_BaseApiService) {
    _inherits(AdminService, _BaseApiService);

    _createClass(AdminService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            AdminService.instance = new AdminService($injector);
            return AdminService.instance;
        }
    }]);

    function AdminService($injector) {
        _classCallCheck(this, AdminService);

        return _possibleConstructorReturn(this, (AdminService.__proto__ || Object.getPrototypeOf(AdminService)).call(this, $injector, 'admins', 'admin'));
    }

    _createClass(AdminService, [{
        key: 'updatePassword',
        value: function updatePassword(object) {
            var _this2 = this;

            var deferred = this.$q.defer();

            var backendSafeObject = this.sanitizeObject(object);

            var url = this.baseUrl + this.serviceUrl + '/update_password';
            this.$http.post(url, backendSafeObject).then(function (response) {
                _this2.notificationService.success('Successfully updated password!');
                deferred.resolve(response.data[0]);
            }).catch(function (error) {
                _this2.notificationService.error('Failed to update password! Make sure the old password was correct!');
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }, {
        key: 'delete',
        value: function _delete(object) {
            _get(AdminService.prototype.__proto__ || Object.getPrototypeOf(AdminService.prototype), 'update', this).call(this, object);
        }
    }]);

    return AdminService;
}(BaseApiService);

AdminService.$inject = ['$injector'];
app.factory('adminService', AdminService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AwardService = function (_BaseApiService) {
    _inherits(AwardService, _BaseApiService);

    _createClass(AwardService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            AwardService.instance = new AwardService($injector);
            return AwardService.instance;
        }
    }]);

    function AwardService($injector) {
        _classCallCheck(this, AwardService);

        return _possibleConstructorReturn(this, (AwardService.__proto__ || Object.getPrototypeOf(AwardService)).call(this, $injector, 'awards', 'award'));
    }

    _createClass(AwardService, [{
        key: 'delete',
        value: function _delete(object) {
            _get(AwardService.prototype.__proto__ || Object.getPrototypeOf(AwardService.prototype), 'update', this).call(this, object);
        }
    }]);

    return AwardService;
}(BaseApiService);

AwardService.$inject = ['$injector'];
app.factory('awardService', AwardService.serviceFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormQuestionService = function (_BaseApiService) {
    _inherits(FormQuestionService, _BaseApiService);

    _createClass(FormQuestionService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            FormQuestionService.instance = new FormQuestionService($injector);
            return FormQuestionService.instance;
        }
    }]);

    function FormQuestionService($injector) {
        _classCallCheck(this, FormQuestionService);

        return _possibleConstructorReturn(this, (FormQuestionService.__proto__ || Object.getPrototypeOf(FormQuestionService)).call(this, $injector, 'form_questions', 'formQuestion'));
    }

    return FormQuestionService;
}(BaseApiService);

FormQuestionService.$inject = ['$injector'];
app.factory('formQuestionService', FormQuestionService.serviceFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormService = function (_BaseApiService) {
    _inherits(FormService, _BaseApiService);

    _createClass(FormService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            FormService.instance = new FormService($injector);
            return FormService.instance;
        }
    }]);

    function FormService($injector) {
        _classCallCheck(this, FormService);

        return _possibleConstructorReturn(this, (FormService.__proto__ || Object.getPrototypeOf(FormService)).call(this, $injector, 'forms', 'form'));
    }

    _createClass(FormService, [{
        key: 'delete',
        value: function _delete(formId) {
            var _this2 = this;

            var deferred = this.$q.defer();

            var backendSafeObject = this.sanitizeObject({ formId: formId });

            var url = this.baseUrl + this.serviceUrl + '/delete';
            this.$http.post(url, backendSafeObject).then(function (response) {
                _this2.notificationService.success('Successfully deleted forms !');
                deferred.resolve(response.data[0]);
            }).catch(function (error) {
                _this2.notificationService.error('Failed to delete forms!');
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }]);

    return FormService;
}(BaseApiService);

FormService.$inject = ['$injector'];
app.factory('formService', FormService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstitutionService = function (_BaseApiService) {
    _inherits(InstitutionService, _BaseApiService);

    _createClass(InstitutionService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            InstitutionService.instance = new InstitutionService($injector);
            return InstitutionService.instance;
        }
    }]);

    function InstitutionService($injector) {
        _classCallCheck(this, InstitutionService);

        return _possibleConstructorReturn(this, (InstitutionService.__proto__ || Object.getPrototypeOf(InstitutionService)).call(this, $injector, 'institutions', 'institution'));
    }

    _createClass(InstitutionService, [{
        key: 'delete',
        value: function _delete(object) {
            _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'update', this).call(this, object);
        }
    }]);

    return InstitutionService;
}(BaseApiService);

InstitutionService.$inject = ['$injector'];
app.factory('institutionService', InstitutionService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JudgeCategoryService = function (_BaseApiService) {
    _inherits(JudgeCategoryService, _BaseApiService);

    _createClass(JudgeCategoryService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            JudgeCategoryService.instance = new JudgeCategoryService($injector);
            return JudgeCategoryService.instance;
        }
    }]);

    function JudgeCategoryService($injector) {
        _classCallCheck(this, JudgeCategoryService);

        return _possibleConstructorReturn(this, (JudgeCategoryService.__proto__ || Object.getPrototypeOf(JudgeCategoryService)).call(this, $injector, 'judge_categories', 'judgeCategory'));
    }

    _createClass(JudgeCategoryService, [{
        key: 'delete',
        value: function _delete(object) {
            _get(JudgeCategoryService.prototype.__proto__ || Object.getPrototypeOf(JudgeCategoryService.prototype), 'update', this).call(this, object);
        }
    }]);

    return JudgeCategoryService;
}(BaseApiService);

JudgeCategoryService.$inject = ['$injector'];
app.factory('judgeCategoryService', JudgeCategoryService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JudgeService = function (_BaseApiService) {
    _inherits(JudgeService, _BaseApiService);

    _createClass(JudgeService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            JudgeService.instance = new JudgeService($injector);
            return JudgeService.instance;
        }
    }]);

    function JudgeService($injector) {
        _classCallCheck(this, JudgeService);

        return _possibleConstructorReturn(this, (JudgeService.__proto__ || Object.getPrototypeOf(JudgeService)).call(this, $injector, 'judges', 'judge'));
    }

    _createClass(JudgeService, [{
        key: 'delete',
        value: function _delete(object) {
            _get(JudgeService.prototype.__proto__ || Object.getPrototypeOf(JudgeService.prototype), 'update', this).call(this, object);
        }
    }]);

    return JudgeService;
}(BaseApiService);

JudgeService.$inject = ['$injector'];
app.factory('judgeService', JudgeService.serviceFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyParticipantService = function (_BaseApiService) {
    _inherits(KeyParticipantService, _BaseApiService);

    _createClass(KeyParticipantService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            KeyParticipantService.instance = new KeyParticipantService($injector);
            return KeyParticipantService.instance;
        }
    }]);

    function KeyParticipantService($injector) {
        _classCallCheck(this, KeyParticipantService);

        return _possibleConstructorReturn(this, (KeyParticipantService.__proto__ || Object.getPrototypeOf(KeyParticipantService)).call(this, $injector, 'key_participants', 'key participant'));
    }

    _createClass(KeyParticipantService, [{
        key: 'delete',
        value: function _delete(keyParticipantId) {
            var _this2 = this;

            var deferred = this.$q.defer();

            var backendSafeObject = this.sanitizeObject({ keyParticipantId: keyParticipantId });

            var url = this.baseUrl + this.serviceUrl + '/delete';
            this.$http.post(url, backendSafeObject).then(function (response) {
                _this2.notificationService.success('Successfully deleted key participant!');
                deferred.resolve(response.data[0]);
            }).catch(function (error) {
                _this2.notificationService.error('Failed to delete key participant!');
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }]);

    return KeyParticipantService;
}(BaseApiService);

KeyParticipantService.$inject = ['$injector'];
app.factory('keyParticipantService', KeyParticipantService.serviceFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PosterAbstractService = function (_BaseApiService) {
    _inherits(PosterAbstractService, _BaseApiService);

    _createClass(PosterAbstractService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            PosterAbstractService.instance = new PosterAbstractService($injector);
            return PosterAbstractService.instance;
        }
    }]);

    function PosterAbstractService($injector) {
        _classCallCheck(this, PosterAbstractService);

        return _possibleConstructorReturn(this, (PosterAbstractService.__proto__ || Object.getPrototypeOf(PosterAbstractService)).call(this, $injector, 'poster_abstracts', 'poster abstract'));
    }

    return PosterAbstractService;
}(BaseApiService);

PosterAbstractService.$inject = ['$injector'];
app.factory('posterAbstractService', PosterAbstractService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PosterCategoryService = function (_BaseApiService) {
    _inherits(PosterCategoryService, _BaseApiService);

    _createClass(PosterCategoryService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            PosterCategoryService.instance = new PosterCategoryService($injector);
            return PosterCategoryService.instance;
        }
    }]);

    function PosterCategoryService($injector) {
        _classCallCheck(this, PosterCategoryService);

        return _possibleConstructorReturn(this, (PosterCategoryService.__proto__ || Object.getPrototypeOf(PosterCategoryService)).call(this, $injector, 'poster_categories', 'poster category'));
    }

    _createClass(PosterCategoryService, [{
        key: 'delete',
        value: function _delete(object) {
            _get(PosterCategoryService.prototype.__proto__ || Object.getPrototypeOf(PosterCategoryService.prototype), 'update', this).call(this, object);
        }
    }]);

    return PosterCategoryService;
}(BaseApiService);

PosterCategoryService.$inject = ['$injector'];
app.factory('posterCategoryService', PosterCategoryService.serviceFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PosterService = function (_BaseApiService) {
    _inherits(PosterService, _BaseApiService);

    _createClass(PosterService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            PosterService.instance = new PosterService($injector);
            return PosterService.instance;
        }
    }]);

    function PosterService($injector) {
        _classCallCheck(this, PosterService);

        return _possibleConstructorReturn(this, (PosterService.__proto__ || Object.getPrototypeOf(PosterService)).call(this, $injector, 'posters', 'poster'));
    }

    return PosterService;
}(BaseApiService);

PosterService.$inject = ['$injector'];
app.factory('posterService', PosterService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PresenterService = function (_BaseApiService) {
    _inherits(PresenterService, _BaseApiService);

    _createClass(PresenterService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            PresenterService.instance = new PresenterService($injector);
            return PresenterService.instance;
        }
    }]);

    function PresenterService($injector) {
        _classCallCheck(this, PresenterService);

        return _possibleConstructorReturn(this, (PresenterService.__proto__ || Object.getPrototypeOf(PresenterService)).call(this, $injector, 'presenters', 'presenter'));
    }

    _createClass(PresenterService, [{
        key: 'delete',
        value: function _delete(object) {
            _get(PresenterService.prototype.__proto__ || Object.getPrototypeOf(PresenterService.prototype), 'update', this).call(this, object);
        }
    }]);

    return PresenterService;
}(BaseApiService);

PresenterService.$inject = ['$injector'];
app.factory('presenterService', PresenterService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionSectionService = function (_BaseApiService) {
    _inherits(QuestionSectionService, _BaseApiService);

    _createClass(QuestionSectionService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            QuestionSectionService.instance = new QuestionSectionService($injector);
            return QuestionSectionService.instance;
        }
    }]);

    function QuestionSectionService($injector) {
        _classCallCheck(this, QuestionSectionService);

        return _possibleConstructorReturn(this, (QuestionSectionService.__proto__ || Object.getPrototypeOf(QuestionSectionService)).call(this, $injector, 'question_sections', 'question section'));
    }

    _createClass(QuestionSectionService, [{
        key: 'delete',
        value: function _delete(object) {
            _get(QuestionSectionService.prototype.__proto__ || Object.getPrototypeOf(QuestionSectionService.prototype), 'update', this).call(this, object);
        }
    }]);

    return QuestionSectionService;
}(BaseApiService);

QuestionSectionService.$inject = ['$injector'];
app.factory('questionSectionService', QuestionSectionService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionService = function (_BaseApiService) {
    _inherits(QuestionService, _BaseApiService);

    _createClass(QuestionService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            QuestionService.instance = new QuestionService($injector);
            return QuestionService.instance;
        }
    }]);

    function QuestionService($injector) {
        _classCallCheck(this, QuestionService);

        return _possibleConstructorReturn(this, (QuestionService.__proto__ || Object.getPrototypeOf(QuestionService)).call(this, $injector, 'questions', 'question'));
    }

    _createClass(QuestionService, [{
        key: 'delete',
        value: function _delete(object) {
            _get(QuestionService.prototype.__proto__ || Object.getPrototypeOf(QuestionService.prototype), 'update', this).call(this, object);
        }
    }]);

    return QuestionService;
}(BaseApiService);

QuestionService.$inject = ['$injector'];
app.factory('questionService', QuestionService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoleService = function (_BaseApiService) {
    _inherits(RoleService, _BaseApiService);

    _createClass(RoleService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            RoleService.instance = new RoleService($injector);
            return RoleService.instance;
        }
    }]);

    function RoleService($injector) {
        _classCallCheck(this, RoleService);

        return _possibleConstructorReturn(this, (RoleService.__proto__ || Object.getPrototypeOf(RoleService)).call(this, $injector, 'roles', 'role'));
    }

    _createClass(RoleService, [{
        key: 'delete',
        value: function _delete(object) {
            _get(RoleService.prototype.__proto__ || Object.getPrototypeOf(RoleService.prototype), 'update', this).call(this, object);
        }
    }]);

    return RoleService;
}(BaseApiService);

RoleService.$inject = ['$injector'];
app.factory('roleService', RoleService.serviceFactory);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SummitService = function (_BaseApiService) {
    _inherits(SummitService, _BaseApiService);

    _createClass(SummitService, null, [{
        key: 'serviceFactory',
        value: function serviceFactory($injector) {
            SummitService.instance = new SummitService($injector);
            return SummitService.instance;
        }
    }]);

    function SummitService($injector) {
        _classCallCheck(this, SummitService);

        return _possibleConstructorReturn(this, (SummitService.__proto__ || Object.getPrototypeOf(SummitService)).call(this, $injector, 'summits', 'summit'));
    }

    _createClass(SummitService, [{
        key: 'get',
        value: function get(params) {
            return _get(SummitService.prototype.__proto__ || Object.getPrototypeOf(SummitService.prototype), 'get', this).call(this, params).then(function (summits) {
                _.forEach(summits, function (summit) {
                    // Thanks IE
                    summit.summitStart = new Date(summit.summitStart.replace(/ /, 'T') + 'Z');
                    summit.summitEnd = new Date(summit.summitEnd.replace(/ /, 'T') + 'Z');
                    summit.registrationDeadline = new Date(summit.registrationDeadline.replace(/ /, 'T') + 'Z');
                });
                return summits;
            });
        }
    }, {
        key: 'updatePin',
        value: function updatePin(object) {
            var _this2 = this;

            var deferred = this.$q.defer();

            var backendSafeObject = this.sanitizeObject(object);

            var url = this.baseUrl + this.serviceUrl + '/update_pin';
            this.$http.post(url, backendSafeObject).then(function (response) {
                _this2.notificationService.success('Successfully updated pin!');
                deferred.resolve(response.data[0]);
            }).catch(function (error) {
                _this2.notificationService.error('Failed to update pin! Make sure the old pin was correct!');
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }, {
        key: 'delete',
        value: function _delete(object) {
            _get(SummitService.prototype.__proto__ || Object.getPrototypeOf(SummitService.prototype), 'update', this).call(this, object);
        }
    }]);

    return SummitService;
}(BaseApiService);

SummitService.$inject = ['$injector'];
app.factory('summitService', SummitService.serviceFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteInterceptor = function () {
    function RouteInterceptor($log, $state, $rootScope, authService) {
        _classCallCheck(this, RouteInterceptor);

        this.$log = $log;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.authService = authService;
        this.adminStates = ['home.admin', 'home.admin.dashboard', 'home.admin.settings', 'home.admin.reporting', 'home.admin.judges', 'home.admin.presenters', 'home.admin.register', 'home.admin.register-institution', 'home.admin.register-info'
        // ADD OTHER STATES HERE
        ];
        this.judgeStates = ['home.judge', 'home.judge.dashboard', 'home.judge.info', 'home.judge.form'];
        this.adminRegistrationStates = [];
        this.registrationStates = ['register', 'register-confirmation', 'register-institution', 'register-info', 'register-finish'];
    }

    _createClass(RouteInterceptor, [{
        key: 'listenOnRoute',
        value: function listenOnRoute() {
            var _this = this;

            this.$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                // This ensures the registration process goes smoothly.
                if (_.includes(_this.registrationStates, toState.name)) {
                    if (toState.name === 'register-institution' && !toParams.valid) {
                        event.preventDefault();
                        _this.$state.go('register');
                    } else if (toState.name === 'register-info' && !toParams.valid) {
                        event.preventDefault();
                        _this.$state.go('register');
                    }
                }
                // No user is logged in
                if (!_this.authService.isLoggedIn) {
                    if (_.includes(_this.judgeStates, toState.name)) {
                        event.preventDefault();
                        _this.$log.warn('Non-judge attempted access to state: ' + toState.name);
                        _this.$state.go('home.landing'); // redirect to judge login
                    } else if (_.includes(_this.adminStates, toState.name)) {
                        event.preventDefault();
                        _this.$log.warn('Non-admin attempted access to state: ' + toState.name);
                        _this.$state.go('home.landing'); // redirect to judge login
                    }
                } else {
                    // Judge is logged in
                    if (_this.authService.isJudge) {
                        if (_.includes(_this.adminStates, toState.name)) {
                            event.preventDefault();
                            _this.$log.warn('Non-admin attempted access to state: ' + toState.name);
                            _this.$state.go('home.login'); // redirect to judge login
                        } else if (_.includes(_this.judgeStates, toState.name)) {
                            // Checks to see if the user id matches the logged in id
                            if (toParams.judgeId !== _this.authService.currentUser.id) {
                                event.preventDefault();
                                toParams.judgeId = _this.authService.currentUser.id;
                                _this.$state.go(toState.name, toParams);
                            }
                        } else if (toState.name === 'home.landing') {
                            event.preventDefault();
                            toParams.judgeId = _this.authService.currentUser.id;
                            _this.$state.go('home.judge.dashboard', toParams);
                        }
                    }
                    // Admin is logged in
                    else if (_this.authService.isAdmin) {
                            if (_.includes(_this.judgeStates, toState.name)) {
                                event.preventDefault();
                                _this.$log.warn('Non-judge attempted access to state: ' + toState.name);
                                _this.$state.go('home.judge-login'); // redirect to judge login
                            } else if (_.includes(_this.adminStates, toState.name)) {
                                // Checks to see if the user id matches the logged in id
                                if (toParams.adminId !== _this.authService.currentUser.id) {
                                    event.preventDefault();
                                    toParams.adminId = _this.authService.currentUser.id;
                                    _this.$state.go(toState.name, toParams);
                                }
                                if (toState.name === 'home.admin.register-institution' && !toParams.valid) {
                                    event.preventDefault();
                                    _this.$state.go('home.admin.register');
                                } else if (toState.name === 'home.admin.register-info' && !toParams.valid) {
                                    event.preventDefault();
                                    _this.$state.go('home.admin.register');
                                }
                            } else if (toState.name === 'home.landing') {
                                event.preventDefault();
                                toParams.judgeId = _this.authService.currentUser.id;
                                _this.$state.go('home.admin.dashboard', toParams);
                            }
                        }
                    if (toState.name === 'home.judge') {
                        event.preventDefault();
                        _this.$state.go('home.judge.dashboard', { judgeId: toParams.judgeId });
                    } else if (toState.name === 'home.admin') {
                        event.preventDefault();
                        _this.$state.go('home.admin.dashboard', { adminId: toParams.adminId });
                    }
                }
            });
        }
    }]);

    return RouteInterceptor;
}();

RouteInterceptor.$inject = ['$log', '$state', '$rootScope', 'authService'];
app.service('routeInterceptor', RouteInterceptor);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomTabsDirective = function () {
    function CustomTabsDirective($timeout) {
        _classCallCheck(this, CustomTabsDirective);

        this.restrict = 'A';
        this.scope = {
            active: '='
        };
        this.$timeout = $timeout;
    }

    _createClass(CustomTabsDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {}
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout) {
            CustomTabsDirective.instance = new CustomTabsDirective($timeout);
            return CustomTabsDirective.instance;
        }
    }]);

    return CustomTabsDirective;
}();

CustomTabsDirective.directiveName = 'customTabs';
CustomTabsDirective.$inject = ['$timeout'];
app.directive(CustomTabsDirective.directiveName, CustomTabsDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FixedHeadersController = function () {
    function FixedHeadersController() {
        _classCallCheck(this, FixedHeadersController);
    }

    _createClass(FixedHeadersController, [{
        key: 'fixWidth',


        // Dynamically changes the column widths
        value: function fixWidth(column1, column2) {
            column1.style.width = column2.offsetWidth + 'px';
        }
    }]);

    return FixedHeadersController;
}();

app.controller('fixedHeadersController', FixedHeadersController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FixedHeadersDirective = function () {
    function FixedHeadersDirective($timeout, $window) {
        _classCallCheck(this, FixedHeadersDirective);

        this.restrict = 'A';
        this.controller = 'fixedHeadersController';
        this.$window = angular.element($window);
    }

    _createClass(FixedHeadersDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            var interval = setInterval(function () {
                var scroll = element.find('div.scrollable')[0];
                if (scroll.offsetHeight > 500) {
                    scroll.style.height = '500px';
                }
                var tables = element.find('table');
                if (tables.length > 1) {
                    var headers = angular.element(tables[0]).find('th'); // Main header
                    var subHeaders = angular.element(tables[2]).find('th'); // Sub header
                    if (subHeaders.length > 0) {
                        var index = 0;
                        _.forEach(headers, function (header) {
                            header.style.width = subHeaders[index].offsetWidth + 'px';
                            index++;
                        });
                    }
                    if (tables[0].offsetWidth === tables[2].offsetWidth) {
                        clearInterval(interval);
                    }
                }
            }, 1000);
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout, $window) {
            FixedHeadersDirective.instance = new FixedHeadersDirective($timeout, $window);
            return FixedHeadersDirective.instance;
        }
    }]);

    return FixedHeadersDirective;
}();

FixedHeadersDirective.directiveName = 'fixedHeaders';
FixedHeadersDirective.$inject = ['$timeout', '$window'];
app.directive(FixedHeadersDirective.directiveName, FixedHeadersDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyParticipantsModalDirective = function () {
    function KeyParticipantsModalDirective() {
        _classCallCheck(this, KeyParticipantsModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/key-participants-modal/key-participants-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(KeyParticipantsModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            KeyParticipantsModalDirective.instance = new KeyParticipantsModalDirective();
            return KeyParticipantsModalDirective.instance;
        }
    }]);

    return KeyParticipantsModalDirective;
}();

app.directive('keyParticipantsModal', KeyParticipantsModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JudgeTableController = function () {
    function JudgeTableController($scope, $stateParams, judgeService) {
        _classCallCheck(this, JudgeTableController);

        this.judgeService = judgeService;
        this.judges = $scope.judges;
        this.judgeCategories = $scope.judgeCategories;
        this.category = this.judgeCategories[0].judgeCategoryId;
        this.judge = { active: 1 };
        this.summitId = $scope.summitId;
        this.modal = false;
    }

    _createClass(JudgeTableController, [{
        key: 'add',
        value: function add() {
            var _this = this;

            this.judgeService.create(this.judge).then(function (judge) {
                angular.element('.modal').modal('close');
                _this.setModal();
                _this.judges.push(judge);
                _this.judge = { active: 1 };
            });
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.judge = { active: 1 };
            this.setModal();
        }
    }, {
        key: 'activate',
        value: function activate(judge) {
            judge.active = 1;
            this.judgeService.update(judge);
        }
    }, {
        key: 'deactivate',
        value: function deactivate(judge) {
            judge.active = 0;
            this.judgeService.delete(judge);
        }
    }, {
        key: 'setModal',
        value: function setModal() {
            this.modal = this.modal ? false : true;
        }
    }]);

    return JudgeTableController;
}();

JudgeTableController.$inject = ['$scope', '$stateParams', 'judgeService'];
app.controller('judgeTableController', JudgeTableController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JudgeTableDirective = function () {
    function JudgeTableDirective() {
        _classCallCheck(this, JudgeTableDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/judge-table/judge-table.html';
        this.replace = true;
        this.scope = {
            judges: '=',
            judgeCategories: '='
        };
        this.controller = 'judgeTableController';
        this.controllerAs = 'ctrl';
    }

    _createClass(JudgeTableDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            JudgeTableDirective.instance = new JudgeTableDirective();
            return JudgeTableDirective.instance;
        }
    }]);

    return JudgeTableDirective;
}();

app.directive('judgeTable', JudgeTableDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterialCollapsibleDirective = function () {
    function MaterialCollapsibleDirective($timeout) {
        _classCallCheck(this, MaterialCollapsibleDirective);

        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    _createClass(MaterialCollapsibleDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            this.$timeout(function () {
                element.collapsible();
            });
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout) {
            MaterialCollapsibleDirective.instance = new MaterialCollapsibleDirective($timeout);
            return MaterialCollapsibleDirective.instance;
        }
    }]);

    return MaterialCollapsibleDirective;
}();

MaterialCollapsibleDirective.directiveName = 'materialCollapsible';
MaterialCollapsibleDirective.$inject = ['$timeout'];
app.directive(MaterialCollapsibleDirective.directiveName, MaterialCollapsibleDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterialDatepickerDirective = function () {
    function MaterialDatepickerDirective($timeout) {
        _classCallCheck(this, MaterialDatepickerDirective);

        this.restrict = 'A';
        this.require = 'ngModel';
        this.$timeout = $timeout;
    }

    _createClass(MaterialDatepickerDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            this.$timeout(function () {
                element.pickadate({
                    selectMonths: true,
                    selectYears: 15
                });
            });
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout) {
            MaterialDatepickerDirective.instance = new MaterialDatepickerDirective($timeout);
            return MaterialDatepickerDirective.instance;
        }
    }]);

    return MaterialDatepickerDirective;
}();

MaterialDatepickerDirective.directiveName = 'materialDatepicker';
MaterialDatepickerDirective.$inject = ['$timeout'];
app.directive(MaterialDatepickerDirective.directiveName, MaterialDatepickerDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterialDropdownDirective = function () {
    function MaterialDropdownDirective($timeout) {
        _classCallCheck(this, MaterialDropdownDirective);

        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    _createClass(MaterialDropdownDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            this.$timeout(function () {
                element.dropdown({
                    hover: true,
                    belowOrigin: true
                });
            });
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout) {
            MaterialDropdownDirective.instance = new MaterialDropdownDirective($timeout);
            return MaterialDropdownDirective.instance;
        }
    }]);

    return MaterialDropdownDirective;
}();

MaterialDropdownDirective.directiveName = 'materialDropdown';
MaterialDropdownDirective.$inject = ['$timeout'];
app.directive(MaterialDropdownDirective.directiveName, MaterialDropdownDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterialModalDirective = function () {
    function MaterialModalDirective($timeout) {
        _classCallCheck(this, MaterialModalDirective);

        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    _createClass(MaterialModalDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            this.$timeout(function () {
                element.modal({
                    dismissible: false
                });
            });
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout) {
            MaterialModalDirective.instance = new MaterialModalDirective($timeout);
            return MaterialModalDirective.instance;
        }
    }]);

    return MaterialModalDirective;
}();

MaterialModalDirective.directiveName = 'materialModal';
MaterialModalDirective.$inject = ['$timeout'];
app.directive(MaterialModalDirective.directiveName, MaterialModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterialSelectDirective = function () {
    function MaterialSelectDirective($timeout) {
        _classCallCheck(this, MaterialSelectDirective);

        this.restrict = 'A';
        this.$timeout = $timeout;
        this.scope = {
            condition: '='
        };
    }

    _createClass(MaterialSelectDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            var _this = this;

            if (scope.condition !== undefined) {
                scope.$watch(function () {
                    return scope.condition;
                }, function () {
                    if (!scope.condition) {
                        _this.$timeout(function () {
                            element.material_select('destroy');
                        });
                    } else {
                        _this.$timeout(function () {
                            element.material_select();
                        });
                    }
                }, true);
            } else {
                this.$timeout(function () {
                    element.material_select();
                });
            }
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout) {
            MaterialSelectDirective.instance = new MaterialSelectDirective($timeout);
            return MaterialSelectDirective.instance;
        }
    }]);

    return MaterialSelectDirective;
}();

MaterialSelectDirective.directiveName = 'materialSelect';
MaterialSelectDirective.$inject = ['$timeout'];
app.directive(MaterialSelectDirective.directiveName, MaterialSelectDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterialSideNavDirective = function () {
    function MaterialSideNavDirective($timeout) {
        _classCallCheck(this, MaterialSideNavDirective);

        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    _createClass(MaterialSideNavDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            this.$timeout(function () {
                element.sideNav({
                    closeOnClick: true
                });
            });
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout) {
            MaterialSideNavDirective.instance = new MaterialSideNavDirective($timeout);
            return MaterialSideNavDirective.instance;
        }
    }]);

    return MaterialSideNavDirective;
}();

MaterialSideNavDirective.directiveName = 'materialSideNav';
MaterialSideNavDirective.$inject = ['$timeout'];
app.directive(MaterialSideNavDirective.directiveName, MaterialSideNavDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterialTabsDirective = function () {
    function MaterialTabsDirective($timeout) {
        _classCallCheck(this, MaterialTabsDirective);

        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    _createClass(MaterialTabsDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            this.$timeout(function () {
                element.tabs();
            });
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout) {
            MaterialTabsDirective.instance = new MaterialTabsDirective($timeout);
            return MaterialTabsDirective.instance;
        }
    }]);

    return MaterialTabsDirective;
}();

MaterialTabsDirective.directiveName = 'materialTabs';
MaterialTabsDirective.$inject = ['$timeout'];
app.directive(MaterialTabsDirective.directiveName, MaterialTabsDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PosterSelectDirective = function () {
    function PosterSelectDirective($timeout) {
        _classCallCheck(this, PosterSelectDirective);

        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    _createClass(PosterSelectDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            var headers = element.find('.poster-select th');
            var needsJudged = _.slice(headers, 0, 5);
            var alreadyJudged = _.slice(headers, 5);
            this.$timeout(function () {
                _.forEach(needsJudged, function (header, key) {
                    if (header.offsetWidth > alreadyJudged[key].offsetWidth) {
                        alreadyJudged[key].style.width = header.offsetWidth + 'px';
                    }
                });
            }, 30);
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory($timeout) {
            PosterSelectDirective.instance = new PosterSelectDirective($timeout);
            return PosterSelectDirective.instance;
        }
    }]);

    return PosterSelectDirective;
}();

PosterSelectDirective.$inject = ['$timeout'];
app.directive('posterSelect', PosterSelectDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarController = function () {
    function NavbarController($scope, authService, localStorageService) {
        var _this = this;

        _classCallCheck(this, NavbarController);

        this.authService = authService;
        this.user = authService.currentUser;
        this.summit = localStorageService.get('summit');
        $scope.$watch(function () {
            return authService.currentUser;
        }, function (newVal, oldVal) {
            _this.user = newVal;
        });
    }

    _createClass(NavbarController, [{
        key: 'logout',
        value: function logout(event) {
            angular.element(document.querySelector('.button-collapse')).sideNav('destroy');
            this.authService.logout();
        }
    }]);

    return NavbarController;
}();

NavbarController.$inject = ['$scope', 'authService', 'localStorageService'];
app.controller('navbarController', NavbarController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarDirective = function () {
    function NavbarDirective() {
        _classCallCheck(this, NavbarDirective);

        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            hideSide: '='
        };
        this.templateUrl = 'build/views/directives/navbar/navbar.html';
        this.controller = 'navbarController';
        this.controllerAs = 'ctrl';
    }

    _createClass(NavbarDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            NavbarDirective.instance = new NavbarDirective();
            return NavbarDirective.instance;
        }
    }]);

    return NavbarDirective;
}();

app.directive('navbar', NavbarDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SettingsTableController = function (_BaseSiteTableModelCo) {
    _inherits(SettingsTableController, _BaseSiteTableModelCo);

    function SettingsTableController($scope) {
        _classCallCheck(this, SettingsTableController);

        var _this = _possibleConstructorReturn(this, (SettingsTableController.__proto__ || Object.getPrototypeOf(SettingsTableController)).call(this, $scope.service, $scope.models));

        _this.editModal = false;
        return _this;
    }

    _createClass(SettingsTableController, [{
        key: 'edit',
        value: function edit() {
            var _this2 = this;

            this.service.update(this.model).then(function () {
                angular.element('.modal').modal('close');
                _this2.setEditModal();
                _this2.canEdit = false;
                _this2.model = { active: '1' };
            });
        }
    }, {
        key: 'setEditModal',
        value: function setEditModal() {
            this.editModal = this.editModal ? false : true;
        }
    }]);

    return SettingsTableController;
}(BaseSiteTableModelController);

SettingsTableController.$inject = ['$scope'];
app.controller('settingsTableController', SettingsTableController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsTableDirective = function () {
    function SettingsTableDirective() {
        _classCallCheck(this, SettingsTableDirective);

        this.restrict = 'E';
        this.replace = true;
        this.templateUrl = 'build/views/directives/settings-table/settings-table.html';
        this.scope = {
            title: '=',
            service: '=',
            models: '='
        };
        this.controller = 'settingsTableController';
        this.controllerAs = 'ctrl';
    }

    _createClass(SettingsTableDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            SettingsTableDirective.instance = new SettingsTableDirective();
            return SettingsTableDirective.instance;
        }
    }]);

    return SettingsTableDirective;
}();

app.directive('settingsTable', SettingsTableDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SideTabsController = function () {
    function SideTabsController($scope, $state, $element, $timeout) {
        var _this = this;

        _classCallCheck(this, SideTabsController);

        this.$scope = $scope;
        this.tabs = $scope.tabs;
        this.active = $scope.active ? $scope.active : this.tabs[0].id;
        this.$state = $scope.state;
        this.paramCheck = $scope.paramCheck ? $scope.paramCheck : 'id';
        this.current = $scope.state.current; // Is always the current state
        this.active = this.current.sideTab === this.active ? this.active : this.current.sideTab;
        $timeout(function () {
            $element.find('#' + _this.active).addClass('active');
        }, 10);
        this.$element = $element;
        // Sets a listener on the current state to watch for a state change.
        // This helps ensure the correct tab is active.
        this.$scope.$watch(function () {
            return $state.current;
        }, function (newVal, oldVal) {
            if (newVal.sideTab) {
                _this.setActiveTab(newVal.sideTab);
            }
        });

        // Some tabs change depending on parameters instead of states
        this.$scope.$watch(function () {
            return $state.params;
        }, function (newVal, oldVal) {
            if ($state.params[_this.paramCheck]) {
                var tab = capitalize($state.params[_this.paramCheck]);
                _this.setActiveTab(tab);
            }
        });
    }

    _createClass(SideTabsController, [{
        key: 'setActiveTab',
        value: function setActiveTab(tab) {
            if (this.active !== tab) {
                this.$element.find('#' + this.active).removeClass('active');
                this.active = tab;
                this.$element.find('#' + this.active).addClass('active');
            }
        }

        // Finds the active tab using the state and/or parameters.
        // If no parameters exist, the state is solely used.

    }, {
        key: 'findActiveTab',
        value: function findActiveTab(state) {
            var _this2 = this;

            _.forEach(this.tabs, function (tab) {
                if (tab.params) {
                    var equal = _.isEqualWith(_this2.$state, tab, function (state, tab) {
                        return state.params[_this2.paramCheck] === tab.params[_this2.paramCheck] && state.current.name === tab.state;
                    });
                    if (equal) {
                        _this2.setActiveTab(tab);
                    }
                } else {
                    if (state.name === tab.state) {
                        _this2.setActiveTab(tab);
                    }
                }
            });
        }
    }]);

    return SideTabsController;
}();

SideTabsController.$inject = ['$scope', '$state', '$element', '$timeout'];
app.controller('sideTabsController', SideTabsController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SideTabsDirective = function () {
    function SideTabsDirective() {
        _classCallCheck(this, SideTabsDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/side-tabs/side-tabs.html';
        this.scope = {
            tabs: '=',
            active: '=',
            state: '=',
            paramCheck: '='
        };
        this.controller = 'sideTabsController';
        this.controllerAs = 'ctrl';
    }

    _createClass(SideTabsDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            SideTabsDirective.instance = new SideTabsDirective();
            return SideTabsDirective.instance;
        }
    }]);

    return SideTabsDirective;
}();

app.directive('sideTabs', SideTabsDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JudgeEditorController = function () {
    function JudgeEditorController($scope, authService, judgeService) {
        _classCallCheck(this, JudgeEditorController);

        this.original = $scope.judge;
        this.judge = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.judgeCategories = $scope.judgeCategories;
        this.judgeService = judgeService;
        this.user = authService;
        this.canEdit = false;
    }

    _createClass(JudgeEditorController, [{
        key: 'edit',
        value: function edit() {
            this.canEdit = true;
        }
    }, {
        key: 'save',
        value: function save() {
            var _this = this;

            this.judgeService.update(this.judge).then(function (data) {
                _this.canEdit = false;
                _this.removeValidation();
                if (_this.user.isJudge) {
                    _this.user.currentUser.firstName = _this.judge.firstName;
                    _this.user.currentUser.lastName = _this.judge.lastName;
                    _this.user.currentUser.email = _this.judge.email;
                }
                if (_this.judge.judgeCategoryId !== _this.original.judgeCategoryId) {
                    _.forEach(_this.judgeCategories, function (category) {
                        if (_this.judge.judgeCategoryId === category.judgeCategoryId) {
                            _this.judge.category = category.title;
                        }
                    });
                }
                _this.original = angular.copy(_this.judge);
            }).catch(function (error) {
                _this.canEdit = false;
                _this.removeValidation();
                _this.judge = angular.copy(_this.original);
            });
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.canEdit = false;
            this.removeValidation();
            this.judge = angular.copy(this.original);
        }
    }, {
        key: 'removeValidation',
        value: function removeValidation() {
            angular.element('input').removeClass('valid');
            angular.element('input').removeClass('invalid');
        }
    }]);

    return JudgeEditorController;
}();

JudgeEditorController.$inject = ['$scope', 'authService', 'judgeService'];
app.controller('judgeEditorController', JudgeEditorController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JudgeEditorDirective = function () {
    function JudgeEditorDirective() {
        _classCallCheck(this, JudgeEditorDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/editors/judge-editor/judge-editor.html';
        this.replace = true;
        this.scope = {
            judge: '=',
            judgeCategories: '='
        };
        this.controller = 'judgeEditorController';
        this.controllerAs = 'ctrl';
    }

    _createClass(JudgeEditorDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            JudgeEditorDirective.instance = new JudgeEditorDirective();
            return JudgeEditorDirective.instance;
        }
    }]);

    return JudgeEditorDirective;
}();

app.directive('judgeEditor', JudgeEditorDirective.directiveFactory);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractModalController = function AbstractModalController($scope) {
    _classCallCheck(this, AbstractModalController);

    this.abstract = $scope.abstract;
};

AbstractModalController.$inject = ['$scope'];
app.controller('abstractModalController', AbstractModalController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractModalDirective = function () {
    function AbstractModalDirective() {
        _classCallCheck(this, AbstractModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/abstract-modal/abstract-modal.html';
        this.scope = {
            abstract: '='
        };
        this.controller = 'abstractModalController';
        this.controllerAs = 'ctrl';
    }

    _createClass(AbstractModalDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            scope.$watch(function () {
                return scope.abstract;
            }, function (newVal, oldVal) {
                controller.abstract = newVal;
            });
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AbstractModalDirective.instance = new AbstractModalDirective();
            return AbstractModalDirective.instance;
        }
    }]);

    return AbstractModalDirective;
}();

app.directive('abstractModal', AbstractModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddInstitutionModalDirective = function () {
    function AddInstitutionModalDirective() {
        _classCallCheck(this, AddInstitutionModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-institution-modal/add-institution-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(AddInstitutionModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AddInstitutionModalDirective.instance = new AddInstitutionModalDirective();
            return AddInstitutionModalDirective.instance;
        }
    }]);

    return AddInstitutionModalDirective;
}();

app.directive('addInstitutionModal', AddInstitutionModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddAdminModalDirective = function () {
    function AddAdminModalDirective() {
        _classCallCheck(this, AddAdminModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-admin-modal/add-admin-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(AddAdminModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AddAdminModalDirective.instance = new AddAdminModalDirective();
            return AddAdminModalDirective.instance;
        }
    }]);

    return AddAdminModalDirective;
}();

app.directive('addAdminModal', AddAdminModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddJudgeModalDirective = function () {
    function AddJudgeModalDirective() {
        _classCallCheck(this, AddJudgeModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-judge-modal/add-judge-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(AddJudgeModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AddJudgeModalDirective.instance = new AddJudgeModalDirective();
            return AddJudgeModalDirective.instance;
        }
    }]);

    return AddJudgeModalDirective;
}();

app.directive('addJudgeModal', AddJudgeModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddPosterModalDirective = function () {
    function AddPosterModalDirective() {
        _classCallCheck(this, AddPosterModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-poster-modal/add-poster-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(AddPosterModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AddPosterModalDirective.instance = new AddPosterModalDirective();
            return AddPosterModalDirective.instance;
        }
    }]);

    return AddPosterModalDirective;
}();

app.directive('addPosterModal', AddPosterModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddKeyParticipantModalDirective = function () {
    function AddKeyParticipantModalDirective() {
        _classCallCheck(this, AddKeyParticipantModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-key-participant-modal/add-key-participant-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(AddKeyParticipantModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AddKeyParticipantModalDirective.instance = new AddKeyParticipantModalDirective();
            return AddKeyParticipantModalDirective.instance;
        }
    }]);

    return AddKeyParticipantModalDirective;
}();

app.directive('addKeyParticipantModal', AddKeyParticipantModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddQuestionModalDirective = function () {
    function AddQuestionModalDirective() {
        _classCallCheck(this, AddQuestionModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-question-modal/add-question-modal.html';
        this.scope = {
            ctrl: '=',
            edit: '=',
            title: '='
        };
    }

    _createClass(AddQuestionModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AddQuestionModalDirective.instance = new AddQuestionModalDirective();
            return AddQuestionModalDirective.instance;
        }
    }]);

    return AddQuestionModalDirective;
}();

app.directive('addQuestionModal', AddQuestionModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddRoleModalDirective = function () {
    function AddRoleModalDirective() {
        _classCallCheck(this, AddRoleModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-role-modal/add-role-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(AddRoleModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AddRoleModalDirective.instance = new AddRoleModalDirective();
            return AddRoleModalDirective.instance;
        }
    }]);

    return AddRoleModalDirective;
}();

app.directive('addRoleModal', AddRoleModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddSummitModalDirective = function () {
    function AddSummitModalDirective() {
        _classCallCheck(this, AddSummitModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-summit-modal/add-summit-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(AddSummitModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AddSummitModalDirective.instance = new AddSummitModalDirective();
            return AddSummitModalDirective.instance;
        }
    }]);

    return AddSummitModalDirective;
}();

app.directive('addSummitModal', AddSummitModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddSettingsItemModalDirective = function () {
    function AddSettingsItemModalDirective() {
        _classCallCheck(this, AddSettingsItemModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-settings-item-modal/add-settings-item-modal.html';
        this.scope = {
            ctrl: '=',
            title: '='
        };
    }

    _createClass(AddSettingsItemModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AddSettingsItemModalDirective.instance = new AddSettingsItemModalDirective();
            return AddSettingsItemModalDirective.instance;
        }
    }]);

    return AddSettingsItemModalDirective;
}();

app.directive('addSettingsItemModal', AddSettingsItemModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AssignPosterModalDirective = function () {
    function AssignPosterModalDirective() {
        _classCallCheck(this, AssignPosterModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/assign-poster-modal/assign-poster-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(AssignPosterModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AssignPosterModalDirective.instance = new AssignPosterModalDirective();
            return AssignPosterModalDirective.instance;
        }
    }]);

    return AssignPosterModalDirective;
}();

app.directive('assignPosterModal', AssignPosterModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AwardPosterModalDirective = function () {
    function AwardPosterModalDirective() {
        _classCallCheck(this, AwardPosterModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/award-poster-modal/award-poster-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(AwardPosterModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            AwardPosterModalDirective.instance = new AwardPosterModalDirective();
            return AwardPosterModalDirective.instance;
        }
    }]);

    return AwardPosterModalDirective;
}();

app.directive('awardPosterModal', AwardPosterModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ForgotPasswordModalDirective = function () {
    function ForgotPasswordModalDirective() {
        _classCallCheck(this, ForgotPasswordModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/forgot-password-modal/forgot-password-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(ForgotPasswordModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            ForgotPasswordModalDirective.instance = new ForgotPasswordModalDirective();
            return ForgotPasswordModalDirective.instance;
        }
    }]);

    return ForgotPasswordModalDirective;
}();

app.directive('forgotPasswordModal', ForgotPasswordModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewFormModalController = function () {
    function ViewFormModalController($scope) {
        _classCallCheck(this, ViewFormModalController);

        this.form = $scope.form;
        this.formQuestions = $scope.formQuestions;
        this.scores = [{ id: '1', label: 'poor' }, { id: '2', label: 'adequate' }, { id: '3', label: 'fair' }, { id: '4', label: 'good' }, { id: '5', label: 'excellent' }];
        this.setup();
    }

    _createClass(ViewFormModalController, [{
        key: 'setup',
        value: function setup() {
            var _this = this;

            this.sections = [];
            _.forEach(this.formQuestions, function (formQuestion) {
                if (!_.find(_this.sections, { title: formQuestion.section })) {
                    var section = { title: formQuestion.section };
                    _this.sections.push(section);
                }
            });
        }
    }]);

    return ViewFormModalController;
}();

ViewFormModalController.$inject = ['$scope'];
app.controller('viewFormModalController', ViewFormModalController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewFormModalDirective = function () {
    function ViewFormModalDirective() {
        _classCallCheck(this, ViewFormModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/view-form-modal/view-form-modal.html';
        this.scope = {
            form: '=',
            formQuestions: '='
        };
        this.controller = 'viewFormModalController';
        this.controllerAs = 'ctrl';
    }

    _createClass(ViewFormModalDirective, [{
        key: 'link',
        value: function link(scope, element, attribute, controller) {
            scope.$watch(function () {
                return scope.form;
            }, function (newVal, oldVal) {
                controller.form = newVal;
            });
            scope.$watch(function () {
                return scope.formQuestions;
            }, function (newVal, oldVal) {
                controller.formQuestions = newVal;
                controller.setup();
            });
        }
    }], [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            ViewFormModalDirective.instance = new ViewFormModalDirective();
            return ViewFormModalDirective.instance;
        }
    }]);

    return ViewFormModalDirective;
}();

app.directive('viewFormModal', ViewFormModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewJudgeScoresModalDirective = function () {
    function ViewJudgeScoresModalDirective() {
        _classCallCheck(this, ViewJudgeScoresModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/view-judge-scores-modal/view-judge-scores-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(ViewJudgeScoresModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            ViewJudgeScoresModalDirective.instance = new ViewJudgeScoresModalDirective();
            return ViewJudgeScoresModalDirective.instance;
        }
    }]);

    return ViewJudgeScoresModalDirective;
}();

app.directive('viewJudgeScoresModal', ViewJudgeScoresModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewKeyParticipantsModalDirective = function () {
    function ViewKeyParticipantsModalDirective() {
        _classCallCheck(this, ViewKeyParticipantsModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/view-key-participants-modal/view-key-participants-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(ViewKeyParticipantsModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            ViewKeyParticipantsModalDirective.instance = new ViewKeyParticipantsModalDirective();
            return ViewKeyParticipantsModalDirective.instance;
        }
    }]);

    return ViewKeyParticipantsModalDirective;
}();

app.directive('viewKeyParticipantsModal', ViewKeyParticipantsModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewPosterPerformanceModalDirective = function () {
    function ViewPosterPerformanceModalDirective() {
        _classCallCheck(this, ViewPosterPerformanceModalDirective);

        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/view-poster-performance-modal/view-poster-performance-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    _createClass(ViewPosterPerformanceModalDirective, null, [{
        key: 'directiveFactory',
        value: function directiveFactory() {
            ViewPosterPerformanceModalDirective.instance = new ViewPosterPerformanceModalDirective();
            return ViewPosterPerformanceModalDirective.instance;
        }
    }]);

    return ViewPosterPerformanceModalDirective;
}();

app.directive('viewPosterPerformanceModal', ViewPosterPerformanceModalDirective.directiveFactory);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeController = function () {
    _createClass(HomeController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                summit: ['summitService', function (summitService) {
                    return summitService.get({ active: 1 }).then(function (data) {
                        return data[0];
                    });
                }]
            };
        }
    }]);

    function HomeController($scope, $state, authService, localStorageService, summit) {
        _classCallCheck(this, HomeController);

        $state.current.hideNav = $state.current.hideNav ? $state.current.hideNav : false; // This value can be used to make the navbar go away if we ever need it to.
        $scope.$state = $state;
        this.authService = authService;
        this.user = authService.currentUser;
        localStorageService.set('summit', summit); // Sets the current active summit for the site.
    }

    return HomeController;
}();

HomeController.$inject = ['$scope', '$state', 'authService', 'localStorageService', 'summit'];
app.controller('homeController', HomeController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LandingController = function () {
    function LandingController($scope, $state, localStorageService, authService, notificationService) {
        _classCallCheck(this, LandingController);

        var summit = localStorageService.get('summit');
        if (summit === undefined) {
            this.canRegister = false;
        } else {
            var deadline = new Date(summit.registrationDeadline).valueOf();
            var today = new Date().valueOf();
            if (deadline < today) {
                this.canRegister = false;
            } else {
                this.canRegister = true;
            }
        }
        this.$scope = $scope;
        this.$state = $state;
        this.authService = authService;
        this.notificationService = notificationService;
    }

    _createClass(LandingController, [{
        key: 'login',
        value: function login() {
            var _this = this;

            if (this.email && this.password) {
                this.authService.login(this.email, this.password).then(function (user) {
                    if (user.type === 'Admin') {
                        _this.$state.go('home.admin.dashboard', { adminId: user.id });
                    } else if (user.type === 'Judge') {
                        _this.$state.go('home.judge.dashboard', { judgeId: user.id });
                    }
                }).catch(function (error) {
                    _this.notificationService.error('Invalid username or password!');
                });
            }
        }
    }]);

    return LandingController;
}();

LandingController.$inject = ['$scope', '$state', 'localStorageService', 'authService', 'notificationService'];
app.controller('landingController', LandingController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PasswordResetController = function () {
    _createClass(PasswordResetController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                admin: ['adminService', '$stateParams', function (adminService, $stateParams) {
                    return adminService.recoverAccount({ resetToken: $stateParams.token }).then(function (data) {
                        if (data) {
                            return data;
                        } else {
                            return false;
                        }
                    });
                }]
            };
        }
    }]);

    function PasswordResetController($state, admin, adminService, notificationService) {
        _classCallCheck(this, PasswordResetController);

        if (!admin) {
            $state.go('home.landing');
        } else {
            this.admin = admin;
            this.adminService = adminService;
            this.newPass = "";
            this.confirmPass = "";
        }
        this.$state = $state;
    }

    _createClass(PasswordResetController, [{
        key: 'updatePassword',
        value: function updatePassword() {
            var _this = this;

            if (this.newPassword !== this.confirmPassword) {
                this.notificationService.error('Passwords don\'t match!');
            } else if (this.newPassword == null) {
                this.notificationService.error('Please set a new password!');
            } else if (this.newPassword.length < 8) {
                this.notificationService.error('Please make password at least 8 characters long!');
            } else {
                var password = { adminId: this.admin.adminId, password: this.newPassword };
                this.adminService.reset(password).then(function (data) {
                    _this.$state.go('home.landing');
                }).catch(function (error) {
                    _this.newPassword = null;
                    _this.confirmPassword = null;
                });
            }
        }
    }]);

    return PasswordResetController;
}();

PasswordResetController.$inject = ['$state', 'admin', 'adminService', 'notificationService'];
app.controller('passwordResetController', PasswordResetController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminInfoController = function () {
    _createClass(AdminInfoController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                admin: ['adminService', '$stateParams', function (adminService, $stateParams) {
                    if ($stateParams.admin !== null) {
                        return $stateParams.admin;
                    } else {
                        return adminService.get({ adminId: $stateParams.adminInfoId }).then(function (data) {
                            return data[0];
                        });
                    }
                }]
            };
        }
    }]);

    function AdminInfoController($scope, adminService, admin, authService, notificationService) {
        _classCallCheck(this, AdminInfoController);

        this.$scope = $scope;
        this.adminService = adminService;
        this.userId = authService.currentUser.id;
        this.notificationService = notificationService;
        this.original = admin;
        this.admin = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.canEdit = false;
        this.isSelf = false;
        if (this.admin.adminId === this.userId) {
            this.isSelf = true;
        }
    }

    _createClass(AdminInfoController, [{
        key: 'edit',
        value: function edit() {
            this.canEdit = true;
        }
    }, {
        key: 'save',
        value: function save() {
            var _this = this;

            this.adminService.update(this.admin).then(function (data) {
                _this.canEdit = false;
                _this.original = angular.copy(_this.admin);
            }).catch(function (error) {
                _this.canEdit = false;
                _this.admin = angular.copy(_this.original);
            });
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.canEdit = false;
            this.admin = angular.copy(this.original);
        }
    }, {
        key: 'updatePassword',
        value: function updatePassword() {
            var _this2 = this;

            if (this.newPassword !== this.confirmPassword) {
                this.notificationService.error('Passwords don\'t match!');
            } else if (this.newPassword == null) {
                this.notificationService.error('Please set a new password!');
            } else if (this.newPassword.length < 8) {
                this.notificationService.error('Please make password at least 8 characters long!');
            } else {
                var password = { adminId: this.original.adminId, newPassword: this.newPassword, oldPassword: this.oldPassword };
                this.adminService.updatePassword(password).then(function (data) {
                    _this2.resetPasswordFields();
                }).catch(function (error) {
                    _this2.resetPasswordFields();
                });
            }
        }
    }, {
        key: 'resetPasswordFields',
        value: function resetPasswordFields() {
            this.newPassword = null;
            this.oldPassword = null;
            this.confirmPassword = null;
        }
    }, {
        key: 'cancelPassword',
        value: function cancelPassword() {
            this.canEdit = false;
            this.oldPassword = null;
            this.newPassword = null;
            this.confirmPassword = null;
        }
    }]);

    return AdminInfoController;
}();

AdminInfoController.$inject = ['$scope', 'adminService', 'admin', 'authService', 'notificationService'];
app.controller('adminInfoController', AdminInfoController);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminsController = function (_BaseTableModelContro) {
    _inherits(AdminsController, _BaseTableModelContro);

    _createClass(AdminsController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                admins: ['adminService', function (adminService) {
                    return adminService.get().then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function AdminsController($scope, adminService, notificationService, authService, admins) {
        _classCallCheck(this, AdminsController);

        var _this = _possibleConstructorReturn(this, (AdminsController.__proto__ || Object.getPrototypeOf(AdminsController)).call(this, adminService, admins));

        _this.notificationService = notificationService;
        _this.userId = authService.currentUser.id;
        return _this;
    }

    _createClass(AdminsController, [{
        key: 'add',
        value: function add() {
            if (this.model.email !== this.confirmEmail) {
                this.notificationService.error('Emails must match!');
            } else if (this.model.password !== this.confirmPassword) {
                this.notificationService.error('Passwords must match!');
            } else {
                _get(AdminsController.prototype.__proto__ || Object.getPrototypeOf(AdminsController.prototype), 'add', this).call(this);
            }
        }
    }]);

    return AdminsController;
}(BaseTableModelController);

AdminsController.$inject = ['$scope', 'adminService', 'notificationService', 'authService', 'admins'];
app.controller('adminsController', AdminsController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminAssignAwardsController = function () {
    _createClass(AdminAssignAwardsController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                summits: ['summitService', function (summitService) {
                    return summitService.get().then(function (data) {
                        return data;
                    });
                }],
                posterCategories: ['posterCategoryService', function (posterCategoryService) {
                    return posterCategoryService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }],
                posters: ['posterService', function (posterService) {
                    return posterService.get().then(function (data) {
                        return data;
                    });
                }],
                awards: ['awardService', function (awardService) {
                    return awardService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function AdminAssignAwardsController(posterService, summits, posterCategories, posters, awards) {
        _classCallCheck(this, AdminAssignAwardsController);

        this.posterService = posterService;
        this.summits = summits;
        this.summitId = summits.length > 0 ? summits[0].summitId : undefined;
        this.posterCategories = posterCategories;
        this.posterCategoryId = posterCategories.length > 0 ? posterCategories[0].posterCategoryId : undefined;
        this.posters = posters;
        _.remove(awards, { awardId: '1' });
        this.awards = awards;
        this.originalSelectedPoster = {};
        this.selectedPoster = angular.copy(this.originalSelectedPoster);
    }

    _createClass(AdminAssignAwardsController, [{
        key: 'assign',
        value: function assign() {
            var _this = this;

            if (!angular.equals(this.selectedPoster, this.originalSelectedPoster)) {
                _.forEach(this.posters, function (poster) {
                    // If a poster already has the award
                    if (poster.awardId === _this.awardId && poster.summitId === _this.summitId && poster.posterCategoryId === _this.posterCategoryId) {
                        poster.awardId = '1';
                        _this.posterService.update(poster);
                    }
                });
                this.selectedPoster.awardId = this.awardId;
                this.posterService.update(this.selectedPoster).then(function () {
                    _.forEach(_this.posters, function (poster) {
                        if (_this.selectedPoster.posterId === poster.posterId) {
                            poster.awardId = _this.selectedPoster.awardId;
                        }
                    });
                    _this.selectedPoster = angular.copy(_this.originalSelectedPoster);
                    angular.element('.modal').modal('close');
                });
            }
        }
    }, {
        key: 'setAward',
        value: function setAward(award) {
            var _this2 = this;

            this.awardId = award.awardId;
            _.forEach(this.posters, function (poster) {
                // If a poster already has the award
                if (poster.awardId === _this2.awardId && poster.summitId === _this2.summitId && poster.posterCategoryId === _this2.posterCategoryId) {
                    _this2.selectedPoster = poster;
                }
            });
        }
    }, {
        key: 'setCategory',
        value: function setCategory(posterCategory) {
            this.posterCategoryId = posterCategory.posterCategoryId;
        }
    }, {
        key: 'selectPoster',
        value: function selectPoster(poster, e) {
            if (poster === this.selectedPoster) {
                var element = angular.element(e.target.parentElement);
                element.removeClass('active');
                this.selectedPoster = angular.copy(this.originalSelectedPoster);
            } else {
                var elements = angular.element(document.querySelectorAll('table.unassigned-posters tbody tr.active'));
                _.forEach(elements, function (element) {
                    element = angular.element(element);
                    element.removeClass('active');
                });
                var element = angular.element(e.target.parentElement);
                element.addClass('active');
                this.selectedPoster = poster;
            }
        }
    }]);

    return AdminAssignAwardsController;
}();

AdminAssignAwardsController.$inject = ['posterService', 'summits', 'posterCategories', 'posters', 'awards'];
app.controller('adminAssignAwardsController', AdminAssignAwardsController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminAssignPostersController = function () {
    _createClass(AdminAssignPostersController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                judges: ['judgeService', function (judgeService) {
                    return judgeService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }],
                posters: ['posterService', 'localStorageService', function (posterService, localStorageService) {
                    var summitId = localStorageService.get('summit') === undefined ? 0 : localStorageService.get('summit').summitId;
                    return posterService.get({ summitId: summitId, active: 1 }).then(function (data) {
                        return data;
                    });
                }],
                forms: ['formService', 'localStorageService', function (formService, localStorageService) {
                    var summitId = localStorageService.get('summit') === undefined ? 0 : localStorageService.get('summit').summitId;
                    return formService.get({ summitId: summitId }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function AdminAssignPostersController($scope, formService, judges, posters, forms, notificationService) {
        var _this = this;

        _classCallCheck(this, AdminAssignPostersController);

        this.formService = formService;
        this.notificationService = notificationService;
        this.judges = judges;
        this.originalPosters = posters;
        this.posters = angular.copy(this.originalPosters);
        this.originalForms = forms;
        this.forms = angular.copy(this.originalForms);
        this.judgeId = '';
        this.selectedPosters = [];
        this.selectedForms = [];
        this.removedPosters = [];
        // Filter unassigned posters
        $scope.$watch(function () {
            return _this.judgeId;
        }, function (newVal, oldVal) {
            _this.posters = angular.copy(_this.originalPosters);
            _this.removedPosters = _.remove(_this.posters, function (poster) {
                var form = _.find(_this.originalForms, { judgeId: newVal, posterId: poster.posterId });
                return form ? true : false;
            });
        }, true);
    }

    _createClass(AdminAssignPostersController, [{
        key: 'assign',
        value: function assign() {
            var _this2 = this;

            _.forEach(this.selectedPosters, function (selected) {
                _.pull(_this2.posters, selected);
                _this2.removedPosters.push(selected);
                var newForm = { judgeId: _this2.judgeId, posterId: selected.posterId };
                _this2.formService.create(newForm).then(function (form) {
                    _this2.forms.push(form);
                    _this2.originalForms = angular.copy(_this2.forms);
                    _.pull(_this2.selectedPosters, selected);
                }).catch(function () {
                    _this2.posters = angular.copy(_this2.originalPosters);
                    _this2.selectedPosters = [];
                    _this2.removeActivePosters();
                });
            });
        }
    }, {
        key: 'unassign',
        value: function unassign() {
            var _this3 = this;

            _.pullAll(this.forms, this.selectedForms);
            _.forEach(this.selectedForms, function (form) {
                _this3.formService.delete(form.formId).then(function () {
                    var newPoster = _.remove(_this3.removedPosters, { posterId: form.posterId });
                    if (newPoster.length === 1) {
                        _this3.posters.push(newPoster[0]);
                        _this3.originalPosters = angular.copy(_this3.posters);
                        _this3.originalForms = angular.copy(_this3.forms);
                        _.pull(_this3.selectedForms, form);
                    }
                }).catch(function () {
                    _this3.forms = angular.copy(_this3.originalForms);
                    _this3.selectedForms = [];
                    _this3.removeActiveForms();
                });
            });
        }
    }, {
        key: 'judgeSelected',
        value: function judgeSelected() {
            return this.judgeId !== null && this.judgeId !== undefined && this.judgeId !== '';
        }
    }, {
        key: 'selectPoster',
        value: function selectPoster(poster, e) {
            var existing = _.find(this.selectedPosters, poster);
            if (existing) {
                _.remove(this.selectedPosters, poster);
            } else {
                this.selectedPosters.push(poster);
            }
            this.select(e);
        }
    }, {
        key: 'selectForm',
        value: function selectForm(form, e) {
            if (isTrue(form.judged)) {
                this.notificationService.error('Cannot select poster that has already been judged!');
            } else {
                var existing = _.find(this.selectedForms, form);
                if (existing) {
                    _.remove(this.selectedForms, form);
                } else {
                    this.selectedForms.push(form);
                }
                this.select(e);
            }
        }
    }, {
        key: 'select',
        value: function select(e) {
            var element = angular.element(e.target.parentElement); // This is a little hacky; preferably, this should be in a directive, but oh well
            if (element.hasClass('active')) {
                element.removeClass('active');
            } else {
                element.addClass('active');
            }
        }
    }, {
        key: 'removeActivePosters',
        value: function removeActivePosters() {
            var elements = angular.element(document.querySelectorAll('table.unassigned-posters tbody tr.active'));
            _.forEach(elements, function (element) {
                element = angular.element(element);
                element.removeClass('active');
            });
        }
    }, {
        key: 'removeActiveForms',
        value: function removeActiveForms() {
            var elements = angular.element(document.querySelectorAll('table.assigned-posters tbody tr.active'));
            _.forEach(elements, function (element) {
                element = angular.element(element);
                element.removeClass('active');
            });
        }
    }]);

    return AdminAssignPostersController;
}();

AdminAssignPostersController.$inject = ['$scope', 'formService', 'judges', 'posters', 'forms', 'notificationService'];
app.controller('adminAssignPostersController', AdminAssignPostersController);
"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminJudgeInfoController = function () {
    _createClass(AdminJudgeInfoController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                summits: ['summitService', function (summitService) {
                    return summitService.get().then(function (data) {
                        return data;
                    });
                }],
                judge: ['judgeService', '$stateParams', function (judgeService, $stateParams) {
                    return judgeService.get({ judgeId: $stateParams.judgeId }).then(function (data) {
                        return data[0];
                    });
                }],
                judgeCategories: ['judgeCategoryService', function (judgeService) {
                    return judgeService.get().then(function (data) {
                        return data;
                    });
                }],
                forms: ['formService', 'judge', function (formService, judge) {
                    return formService.get({ judgeId: judge.judgeId }).then(function (data) {
                        return data;
                    });
                }],
                formQuestions: ['formQuestionService', 'judge', function (formQuestionService, judge) {
                    return formQuestionService.get({ judgeId: judge.judgeId }).then(function (data) {
                        return data;
                    });
                }],
                posters: ['posterService', 'localStorageService', function (posterService, localStorageService) {
                    return posterService.get({ summitId: localStorageService.get('summit').summitId }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function AdminJudgeInfoController($scope, judgeService, formService, summits, judge, judgeCategories, forms, formQuestions, posters) {
        _classCallCheck(this, AdminJudgeInfoController);

        this.$scope = $scope;
        this.judgeService = judgeService;
        this.formService = formService;
        this.original = judge;
        this.judge = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.judgeCategories = judgeCategories;
        this.forms = _.orderBy(forms, function (form) {
            return form.total;
        }, ['desc']);
        this.formQuestions = formQuestions;
        this.summits = summits;
        this.summitId = summits[0].summitId;
        if (forms[0] !== undefined) {
            this.form = forms[0];
        } else {
            this.form = {};
        }
        this.singleFormQuestions = _.filter(this.formQuestions, { formId: this.form.formId });
        this.posters = _.differenceWith(posters, forms, function (poster, form) {
            return poster.posterId === form.posterId;
        });
        this.canEdit = false;
        this.modal = false;
    }

    _createClass(AdminJudgeInfoController, [{
        key: 'edit',
        value: function edit() {
            this.canEdit = true;
        }
    }, {
        key: 'save',
        value: function save() {
            var _this = this;

            this.judgeService.update(this.judge).then(function (data) {
                _this.canEdit = false;
                if (_this.judge.judgeCategoryId !== _this.original.judgeCategoryId) {
                    _.forEach(_this.judgeCategories, function (category) {
                        if (_this.judge.judgeCategoryId === category.judgeCategoryId) {
                            _this.judge.category = category.title;
                        }
                    });
                }
                _this.original = angular.copy(_this.judge);
            }).catch(function (error) {
                _this.canEdit = false;
                _this.judge = angular.copy(_this.original);
            });
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.canEdit = false;
            this.judge = angular.copy(this.original);
        }

        // Poster Modal functions

    }, {
        key: 'assign',
        value: function assign() {
            var _this2 = this;

            this.formService.create(this.form).then(function (form) {
                angular.element('.modal').modal('close');
                _this2.setModal();
                _this2.forms.push(form);
                _this2.posters = _.remove(_this2.posters, function (poster) {
                    return poster.posterId === form.posterId;
                });
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.form = { judgeId: this.original.judgeId, total: 0 };
            this.setModal();
        }
    }, {
        key: 'setModal',
        value: function setModal() {
            this.modal = this.modal ? false : true;
        }
    }, {
        key: 'setForm',
        value: function setForm(form) {
            this.form = form;
            this.singleFormQuestions = _.filter(this.formQuestions, { formId: form.formId });
        }
    }, {
        key: 'remove',
        value: function remove(form) {
            var _this3 = this;

            if (form.judged === '0') {
                this.formService.delete(form.formId).then(function () {
                    _.remove(_this3.forms, form);
                });
            }
        }
    }]);

    return AdminJudgeInfoController;
}();

AdminJudgeInfoController.$inject = ['$scope', 'judgeService', 'formService', 'summits', 'judge', 'judgeCategories', 'forms', 'formQuestions', 'posters'];
app.controller('adminJudgeInfoController', AdminJudgeInfoController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminJudgesController = function () {
    _createClass(AdminJudgesController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                judges: ['judgeService', '$stateParams', function (judgeService, $stateParams) {
                    return judgeService.get().then(function (data) {
                        return data;
                    });
                }],
                judgeCategories: ['judgeCategoryService', function (judgeCategoryService) {
                    return judgeCategoryService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function AdminJudgesController($scope, $state, $stateParams, judges, judgeCategories) {
        _classCallCheck(this, AdminJudgesController);

        this.judges = judges;
        this.judgeCategories = judgeCategories;
    }

    return AdminJudgesController;
}();

AdminJudgesController.$inject = ['$scope', '$state', '$stateParams', 'judges', 'judgeCategories'];
app.controller('adminJudgesController', AdminJudgesController);
'use strict';

app.controller('adminDashboardController', ['$scope', function ($scope) {
    // dashboardy stuff wilst goeth here
}]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminNavController = function () {
    _createClass(AdminNavController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                admin: ['adminService', '$stateParams', function (adminService, $stateParams) {
                    return adminService.get({ adminId: $stateParams.id }).then(function (data) {
                        return data[0];
                    });
                }],
                summit: ['localStorageService', function (localStorageService) {
                    return localStorageService.get('summit');
                }]
            };
        }
    }]);

    function AdminNavController($scope, $stateParams, $state, admin, summit, authService) {
        _classCallCheck(this, AdminNavController);

        $scope.navbar = { hideNav: false };
        this.authService = authService;
        this.admin = admin;
        $scope.summitId = summit === undefined ? null : summit.summitId;
    }

    _createClass(AdminNavController, [{
        key: 'logout',
        value: function logout() {
            this.authService.logout();
        }
    }]);

    return AdminNavController;
}();

AdminNavController.$inject = ['$scope', '$stateParams', '$state', 'admin', 'summit', 'authService'];
app.controller('adminNavController', AdminNavController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminPresenterInfoController = function () {
    _createClass(AdminPresenterInfoController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                presenter: ['presenterService', '$stateParams', function (presenterService, $stateParams) {
                    return presenterService.get({ presenterId: $stateParams.presenterId }).then(function (data) {
                        return data[0];
                    });
                }],
                keyParticipants: ['keyParticipantService', 'presenter', function (keyParticipantService, presenter) {
                    return keyParticipantService.get({ presenterId: presenter.presenterId }).then(function (data) {
                        return data;
                    });
                }],
                poster: ['posterService', 'presenter', function (posterService, presenter) {
                    return posterService.get({ presenterId: presenter.presenterId }).then(function (data) {
                        return data[0];
                    });
                }],
                posterAbstract: ['posterAbstractService', 'poster', function (posterAbstractService, poster) {
                    return posterAbstractService.get({ posterId: poster.posterId }).then(function (data) {
                        return data[0];
                    });
                }],
                institutions: ['institutionService', function (institutionService) {
                    return institutionService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }],
                roles: ['roleService', function (roleService) {
                    return roleService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function AdminPresenterInfoController($scope, presenterService, keyParticipantService, posterAbstractService, presenter, keyParticipants, posterAbstract, institutions, roles, notificationService) {
        _classCallCheck(this, AdminPresenterInfoController);

        this.$scope = $scope;
        this.presenterService = presenterService;
        this.keyParticipantService = keyParticipantService;
        this.posterAbstractService = posterAbstractService;
        this.notificationService = notificationService;
        this.original = presenter;
        this.presenter = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.originalPosterAbstract = posterAbstract;
        this.posterAbstract = angular.copy(this.originalPosterAbstract);
        this.keyParticipants = keyParticipants;
        this.keyParticipant = { presenterId: this.presenter.presenterId };
        this.institutions = institutions;
        this.roles = roles;
        this.canEdit = false;
    }

    _createClass(AdminPresenterInfoController, [{
        key: 'edit',
        value: function edit() {
            this.canEdit = true;
        }
    }, {
        key: 'updatePresenter',
        value: function updatePresenter() {
            var _this = this;

            this.presenterService.update(this.presenter).then(function (data) {
                _this.canEdit = false;
                _this.original = angular.copy(_this.presenter);
            }).catch(function (error) {
                _this.canEdit = false;
                _this.presenter = angular.copy(_this.original);
            });
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.canEdit = false;
            this.presenter = angular.copy(this.original);
        }
    }, {
        key: 'addKeyParticipant',
        value: function addKeyParticipant() {
            var _this2 = this;

            this.keyParticipantService.create(this.keyParticipant).then(function (keyParticipant) {
                _this2.keyParticipants.push(keyParticipant);
                _this2.keyParticipant = { presenterId: _this2.presenter.presenterId };
            });
        }
    }, {
        key: 'cancelKeyParticipant',
        value: function cancelKeyParticipant() {
            this.keyParticipant = { presenterId: this.presenter.presenterId };
        }
    }, {
        key: 'deleteKeyParticipant',
        value: function deleteKeyParticipant(keyParticipant) {
            var _this3 = this;

            this.keyParticipantService.delete(keyParticipant.keyParticipantId).then(function () {
                _.remove(_this3.keyParticipants, keyParticipant);
            });
        }
    }, {
        key: 'updatePosterAbstract',
        value: function updatePosterAbstract() {
            var _this4 = this;

            this.posterAbstractService.update(this.posterAbstract).then(function () {
                _this4.originalPosterAbstract = angular.copy(_this4.posterAbstract);
            });
        }
    }, {
        key: 'cancelPosterAbstract',
        value: function cancelPosterAbstract() {
            this.posterAbstract = angular.copy(this.originalPosterAbstract);
        }
    }]);

    return AdminPresenterInfoController;
}();

AdminPresenterInfoController.$inject = ['$scope', 'presenterService', 'keyParticipantService', 'posterAbstractService', 'presenter', 'keyParticipants', 'posterAbstract', 'institutions', 'roles', 'notificationService'];
app.controller('adminPresenterInfoController', AdminPresenterInfoController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminParticipantsController = function () {
    _createClass(AdminParticipantsController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                summits: ['summitService', function (summitService) {
                    return summitService.get().then(function (data) {
                        return data;
                    });
                }],
                presenters: ['presenterService', function (presenterService) {
                    return presenterService.get().then(function (data) {
                        return data;
                    });
                }],
                abstracts: ['posterAbstractService', function (posterAbstractService) {
                    return posterAbstractService.get().then(function (data) {
                        return data;
                    });
                }],
                posters: ['posterService', function (posterService) {
                    return posterService.get().then(function (data) {
                        return data;
                    });
                }],
                keyParticipants: ['keyParticipantService', function (keyParticipantService) {
                    return keyParticipantService.get().then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function AdminParticipantsController($scope, $state, presenterService, posterAbstractService, posterService, keyParticipantService, summits, presenters, abstracts, posters, keyParticipants, notificationService) {
        var _this = this;

        _classCallCheck(this, AdminParticipantsController);

        this.presenterService = presenterService;
        this.posterAbstractService = posterAbstractService;
        this.posterService = posterService;
        this.keyParticipantService = keyParticipantService;
        this.notificationService = notificationService;
        this.summits = summits;
        this.summitId = summits[0].summitId;
        this.presenters = presenters;
        this.abstracts = abstracts;
        this.posters = posters;
        this.keyParticipants = keyParticipants;
        this.presenterAbstract = {};
        this.presenter = {};
        this.editedKeyParticipants = [];
        this.posterAbstract = {};
        this.poster = {};
        this.activeSummit = false;
        _.forEach(this.summits, function (summit) {
            if (isTrue(summit.active)) {
                _this.activeSummit = true;
            }
        });
    }

    _createClass(AdminParticipantsController, [{
        key: 'downloadAbstract',
        value: function downloadAbstract(presenter) {
            this.getPoster(presenter);
            var name = this.presenterAbstract.title + '.pdf';
            var abstractDoc = {
                header: function header(currentPage, pageCount) {
                    return { text: currentPage.toString() + ' of ' + pageCount, alignment: 'right', margin: [2, 2, 5, 0] };
                },
                background: {},
                content: [{ text: this.presenterAbstract.title, style: 'header', alignment: 'center' }, { text: 'Objective', style: 'subheader' }, this.presenterAbstract.objective, { text: 'Methods', style: 'subheader' }, this.presenterAbstract.methods, { text: 'Results', style: 'subheader' }, this.presenterAbstract.results, { text: 'Conclusion', style: 'subheader' }, this.presenterAbstract.conclusion],

                styles: {
                    header: {
                        fontSize: 28,
                        bold: true,
                        margin: [0, 10]
                    },
                    subheader: {
                        fontSize: 22,
                        bold: true,
                        margin: [0, 25, 0, 5]
                    }
                }
            };
            pdfMake.createPdf(abstractDoc).download(name);
        }
    }, {
        key: 'getKeyParticipants',
        value: function getKeyParticipants(presenter) {
            this.presenterKeyParticipants = _.filter(this.keyParticipants, { presenterId: presenter.presenterId });
        }
    }, {
        key: 'getPoster',
        value: function getPoster(presenter) {
            this.presenterPoster = _.find(this.posters, { presenterId: presenter.presenterId });
            this.presenterAbstract = _.find(this.abstracts, { posterAbstractId: this.presenterPoster.posterAbstractId });
        }
    }, {
        key: 'activate',
        value: function activate(presenter) {
            presenter.active = '1';
            this.presenterService.update(presenter);
        }
    }, {
        key: 'deactivate',
        value: function deactivate(presenter) {
            presenter.active = '0';
            this.presenterService.update(presenter);
        }
    }]);

    return AdminParticipantsController;
}();

AdminParticipantsController.$inject = ['$scope', '$state', 'presenterService', 'posterAbstractService', 'posterService', 'keyParticipantService', 'summits', 'presenters', 'abstracts', 'posters', 'keyParticipants', 'notificationService'];
app.controller('adminParticipantsController', AdminParticipantsController);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminRegisterController = function () {
    function AdminRegisterController($scope, $state, presenterService, notificationService, localStorageService, registrationService) {
        _classCallCheck(this, AdminRegisterController);

        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$state = $state;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.suffix = "";
        this.emailConfirmation = "";
        this.presenter = {};
        this.$scope = $scope;

        //Whatever for reCaptcha here
    }

    //Makes sure that the registrant entered the same email for both email fields


    _createClass(AdminRegisterController, [{
        key: "verifyEmail",
        value: function verifyEmail() {
            if (this.email === this.emailConfirmation) {
                this.continue();
            } else {
                this.notificationService.error("Email and Email Confirmation must match!");
            }
        }
    }, {
        key: "continue",


        //Loads the data in the custom service and will move to the next page
        value: function _continue() {

            this.presenter = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                suffix: this.suffix,
                institutionId: 0,
                roleId: 0
            };

            this.registrationService.presenter = this.presenter;

            this.registrationService.presenterFirstName = this.presenterFirstName;
            this.registrationService.presenterLastName = this.presenterLastName;
            this.registrationService.presenterEmail = this.presenterEmail;
            this.$state.go("home.admin.register-institution", { valid: true });
        }
    }]);

    return AdminRegisterController;
}();

AdminRegisterController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('adminRegisterController', AdminRegisterController);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminRegisterInfoController = function () {
    function AdminRegisterInfoController($scope, $timeout, $state, presenterService, notificationService, localStorageService, registrationService) {
        _classCallCheck(this, AdminRegisterInfoController);

        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$timeout = $timeout;
        this.$state = $state;
        this.posterAbstract = {};
        this.projectTitle = "";
        this.projectObjective = "";
        this.projectMethods = "";
        this.projectResults = "";
        this.projectConclusion = "";
    }

    _createClass(AdminRegisterInfoController, [{
        key: "finish",
        value: function finish() {
            var _this = this;

            this.posterAbstract = {
                title: this.projectTitle,
                objective: this.projectObjective,
                methods: this.projectMethods,
                results: this.projectResults,
                conclusion: this.projectConclusion
            };

            this.registrationService.posterAbstract = this.posterAbstract;
            this.registrationService.projectTitle = this.projectTitle;
            this.registrationService.projectObjective = this.projectObjective;
            this.registrationService.projectMethods = this.projectMethods;
            this.registrationService.projectResults = this.projectResults;
            this.registrationService.projectConclusion = this.projectConclusion;
            this.registrationService.summitId = this.summitId;
            this.registrationService.create();
            this.$timeout(function () {
                _this.$state.go('home.admin.presenters');
            }, 20);
            this.notificationService.success("Thank you for registering!");
        }
    }]);

    return AdminRegisterInfoController;
}();

AdminRegisterInfoController.$inject = ['$scope', '$timeout', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('adminRegisterInfoController', AdminRegisterInfoController);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminRegisterInstitutionController = function () {
    function AdminRegisterInstitutionController($scope, $state, presenterService, notificationService, localStorageService, registrationService, institutions, roles) {
        _classCallCheck(this, AdminRegisterInstitutionController);

        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$state = $state;
        this.summitId = localStorageService.get("summit").summitId;
        this.presenterInstitution = "";
        this.presenterRole = "";
        this.posterCategoryId = "";
        this.keyParticipantFName = "";
        this.keyParticipantLName = "";
        this.keyParticipantDepartment = "";
        this.keyParticipantInstitution = "";
        this.keyParticipantRole = "";
        this.institutions = institutions;
        this.roles = roles;
        this.keyParticipants = [];
        this.keyParticipant = {};
        this.musomDepartments = ["Family Medicine", "MED/PEDS", "Surgery", "Orthopaedics", "OBGYN", "Psychiatry", "Neurology", "Pediatrics", "Cardiology", "Endocrinology", "Hematology/Oncology", "Nephrology", "Pulmonary", "Sports Medicine"];
    }

    //Checks to see if the user chose an institution


    _createClass(AdminRegisterInstitutionController, [{
        key: "checkInstitutionExists",
        value: function checkInstitutionExists() {
            if (this.presenterInstitution !== null) {
                this.checkRoleExists();
            } else {
                this.notificationService.error("Please choose an institution!");
            }
        }
    }, {
        key: "checkRoleExists",


        //Checks to see if the user chose a role
        value: function checkRoleExists() {
            if (this.presenterRole !== null) {
                this.continue();
            } else {
                this.notificationService.error("Please choose a role!");
            }
        }
    }, {
        key: "checkKeyParticipantFNameExists",


        //Checks to see if the user entered a first name for the key participant
        value: function checkKeyParticipantFNameExists() {
            if (this.keyParticipantFName !== "") {
                this.checkKeyParticipantLNameExists();
            } else {
                this.notificationService.error("Please enter a first name!");
            }
        }
    }, {
        key: "checkKeyParticipantLNameExists",


        //Checks to see if the user entered a last name for the key participant
        value: function checkKeyParticipantLNameExists() {
            if (this.keyParticipantLName !== "") {
                this.checkKeyParticipantInstitutionExists();
            } else {
                this.notificationService.error("Please enter a last name!");
            }
        }
    }, {
        key: "checkKeyParticipantInstitutionExists",


        //Checks to see if the user chose an institution for the key participant
        value: function checkKeyParticipantInstitutionExists() {
            if (this.keyParticipantInstitution !== null && this.keyParticipantInstitution !== "") {
                this.checkKeyParticipantDepartmentExists();
            } else {
                this.notificationService.error("Please choose an institution");
            }
        }
    }, {
        key: "checkKeyParticipantDepartmentExists",


        //Checks to see if the user chose/entered a department for the key participant.  This is only needed for the School of Medicine and Cabell Huntington
        value: function checkKeyParticipantDepartmentExists() {
            if (this.keyParticipantInstitution === "1" || this.keyParticipantInstitution === "2") {
                if (this.keyParticipantDepartment !== null && this.keyParticipantDepartment !== "") {
                    this.checkKeyParticipantRoleExists();
                } else {
                    this.notificationService.error("Please enter/choose a department!");
                }
            } else {
                this.keyParticipantDepartment = "N/A";
                this.checkKeyParticipantRoleExists();
            }
        }
    }, {
        key: "checkKeyParticipantRoleExists",


        //Checks to see if the user chose a role for the key participant
        value: function checkKeyParticipantRoleExists() {
            if (this.keyParticipantRole !== null) {
                this.addKeyParticipant();
            } else {
                this.notificationService.error("Please choose a role!");
            }
        }
    }, {
        key: "getPosterCategoryId",


        //Sets the category for the posters based off of the role
        value: function getPosterCategoryId() {

            if (this.presenterRole === "1") {
                this.posterCategoryId = "4";
            } else if (this.presenterRole === "2") {
                this.posterCategoryId = "1";
            } else if (this.presenterRole === "3") {
                this.posterCategoryId = "2";
            } else if (this.presenterRole === "4" || this.presenterRole === "5") {
                this.posterCategoryId = "3";
            }
        }

        //Adds the entered key participant to the array

    }, {
        key: "addKeyParticipant",
        value: function addKeyParticipant() {
            var _this = this;

            this.keyParticipant = {
                firstName: this.keyParticipantFName,
                lastName: this.keyParticipantLName,
                department: this.keyParticipantDepartment,
                institutionId: this.keyParticipantInstitution,
                roleId: this.keyParticipantRole
            };
            _.forEach(this.institutions, function (institution) {
                if (institution.institutionId === _this.keyParticipant.institutionId) {
                    _this.keyParticipant.institution = institution.title;
                }
            });
            _.forEach(this.roles, function (role) {
                if (role.roleId === _this.keyParticipant.roleId) {
                    _this.keyParticipant.role = role.title;
                }
            });
            this.keyParticipants.push(this.keyParticipant);
            this.close();
        }
    }, {
        key: "continue",


        //Puts all of the information in the Registration Service and goes to the next page
        value: function _continue() {
            var _this2 = this;

            _.forEach(this.roles, function (role) {
                if (_this2.presenterRole === role.roleId) {
                    _this2.posterCategoryId = role.posterCategoryId;
                }
            });

            this.poster = {
                posterCategoryId: this.posterCategoryId,
                summitId: this.summitId,
                awardId: 1,
                posterAbstractId: 0,
                presenterId: 0
            };

            this.registrationService.poster = this.poster;
            this.registrationService.presenter.institutionId = this.presenterInstitution;
            this.registrationService.presenter.roleId = this.presenterRole;
            this.registrationService.presenterInstitution = this.presenterInstitution;
            this.registrationService.presenterRole = this.presenterRole;
            this.registrationService.keyParticipants = angular.copy(this.keyParticipants);
            this.$state.go('home.admin.register-info', { valid: true });
        }
    }, {
        key: "close",


        //Closes the modal
        value: function close() {
            angular.element(document.querySelector("#modal1")).modal('close');
            this.keyParticipantFName = "";
            this.keyParticipantLName = "";
            this.keyParticipantDepartment = "";
            this.keyParticipantInstitution = "";
            this.keyParticipantRole = "";
            this.keyParticipant = {};
        }
    }, {
        key: "delete",
        value: function _delete(keyParticipant) {
            _.remove(this.keyParticipants, keyParticipant);
            this.notificationService.success("Key Participant Removed!");
        }
    }]);

    return AdminRegisterInstitutionController;
}();

AdminRegisterInstitutionController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'institutions', 'roles'];
app.controller('adminRegisterInstitutionController', AdminRegisterInstitutionController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminReportingController = function () {
    _createClass(AdminReportingController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                summits: ['summitService', function (summitService) {
                    return summitService.get().then(function (data) {
                        return data;
                    });
                }],
                summit: ['$stateParams', 'summits', 'localStorageService', function ($stateParams, summits, localStorageService) {
                    if ($stateParams.summitId) {
                        return _.find(summits, { summitId: $stateParams.summitId });
                    } else {
                        return localStorageService.get('summit');
                    }
                }],
                posters: ['posterService', function (posterService) {
                    return posterService.get().then(function (data) {
                        return data;
                    });
                }],
                forms: ['formService', function (formService) {
                    return formService.get().then(function (data) {
                        return data;
                    });
                }],
                formQuestions: ['formQuestionService', function (formQuestionService) {
                    return formQuestionService.get().then(function (data) {
                        return data;
                    });
                }],
                questions: ['questionService', function (questionService) {
                    return questionService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }],
                judgeCategories: ['judgeCategoryService', function (judgeCategoryService) {
                    return judgeCategoryService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function AdminReportingController($filter, posterService, summit, summits, posters, forms, formQuestions, questions, judgeCategories, reportService) {
        _classCallCheck(this, AdminReportingController);

        this.$filter = $filter;
        this.posterService = posterService;
        this.summit = summit;
        this.summitId = summit === undefined ? undefined : summit.summitId;
        this.summits = summits;
        this.originalPosters = posters;
        this.posters = angular.copy(this.originalPosters);
        this.originalForms = forms;
        this.forms = angular.copy(this.originalForms);
        this.originalFormQuestions = formQuestions;
        this.formQuestions = angular.copy(this.originalFormQuestions);
        this.originalQuestions = questions;
        this.questions = angular.copy(this.originalQuestions);
        this.judgeCategories = judgeCategories;
        this.reportGenerated = false;
        this.reportService = reportService;
        this.posterForms = [];
    }

    _createClass(AdminReportingController, [{
        key: 'changeSummit',
        value: function changeSummit() {
            this.reportGenerated = false;
        }
    }, {
        key: 'generateReport',
        value: function generateReport() {
            var _this = this;

            this.posters = _.filter(this.originalPosters, { summitId: this.summitId, active: '1' });
            _.forEach(this.posters, function (poster) {
                var posterForms = _.filter(_this.forms, function (form) {
                    return poster.posterId === form.posterId && isTrue(form.judged);
                });
                var sum = 0;
                var numOfForms = 0;
                _.forEach(posterForms, function (form) {
                    sum += parseInt(form.total);
                    numOfForms++;
                });
                numOfForms = numOfForms === 0 ? 1 : numOfForms;
                poster.score = sum / numOfForms;
                _this.posterService.update(poster);
            });
            this.reportGenerated = true;
        }
    }, {
        key: 'getLeadAuthor',
        value: function getLeadAuthor(form) {
            return form.suffix !== null && form.suffix !== undefined && form.suffix !== '' ? form.firstName + ' ' + form.lastName + ' ' + form.suffix : form.firstName + ' ' + form.lastName;
        }
    }, {
        key: 'viewScores',
        value: function viewScores(poster) {
            this.posterForms = _.filter(this.forms, function (form) {
                return poster.posterId === form.posterId && isTrue(form.judged);
            });
        }

        // This retrieves the average performance for each question

    }, {
        key: 'viewPerformance',
        value: function viewPerformance(poster) {
            var _this2 = this;

            this.posterFormQuestions = _.filter(this.formQuestions, function (question) {
                return question.posterId === poster.posterId;
            });
            _.forEach(this.questions, function (question) {
                var sum = 0;
                var numOfForms = 0;
                _this2.posterFormQuestionPerForms = _.filter(_this2.posterFormQuestions, { questionId: question.questionId });
                _.forEach(_this2.posterFormQuestionPerForms, function (formQuestion) {
                    sum += parseInt(formQuestion.score); // Backend returns ints as strings
                    numOfForms++;
                });
                numOfForms = numOfForms === 0 ? 1 : numOfForms;
                question.average = sum / numOfForms;
            });
        }

        // This is explicitly for the downloaded report

    }, {
        key: 'calculatePerformance',
        value: function calculatePerformance(poster) {
            var _this3 = this;

            var formQuestions = _.filter(this.formQuestions, function (question) {
                return question.posterId === poster.posterId;
            });
            var index = 1;
            _.forEach(this.questions, function (question) {
                var sum = 0;
                var numOfForms = 0;
                _this3.formQuestionPerForms = _.filter(formQuestions, { questionId: question.questionId });
                _.forEach(_this3.formQuestionPerForms, function (formQuestion) {
                    sum += parseInt(formQuestion.score); // Backend returns ints as strings
                    numOfForms++;
                });
                numOfForms = numOfForms === 0 ? 1 : numOfForms;
                poster['question' + index] = _this3.$filter('number')(sum / numOfForms, 2); // Filters to 2 decimal places
                index++;
            });
        }

        // Calculates the status based on the forms.
        // Returns pending if even one form is unaccounted for. Returns complete, otherwise.

    }, {
        key: 'getStatus',
        value: function getStatus(poster) {
            var forms = _.filter(this.forms, { posterId: poster.posterId });
            var complete = true;
            var unassigned = false;
            if (forms.length === 0) {
                unassigned = true;
            }
            _.forEach(forms, function (form) {
                if (!isTrue(form.judged)) {
                    complete = false;
                }
            });
            return unassigned ? 'Unassigned' : complete ? 'Complete' : 'Pending';
        }
    }, {
        key: 'closeViewScores',
        value: function closeViewScores() {
            this.forms = angular.copy(this.originalForms);
        }
    }, {
        key: 'closeViewPerformance',
        value: function closeViewPerformance() {
            this.formQuestions = angular.copy(this.originalFormQuestions);
            this.questions = angular.copy(this.originalQuestions);
        }
    }, {
        key: 'download',
        value: function download() {
            var _this4 = this;

            var summit = _.filter(this.summits, { summitId: this.summitId })[0];
            var summitDate = this.$filter('date')(summit.summitStart, 'mediumDate');
            var fileName = summitDate.replace(/,/g, "").replace(/ /g, "_") + '.csv';
            var generatedPosters = _.filter(this.posters, { summitId: this.summitId });
            generatedPosters = _.orderBy(generatedPosters, function (poster) {
                return poster.score;
            }, ['desc']);
            var data = [];
            var headers = {
                posterNumber: 'Poster #',
                leadAuthor: 'Lead Author',
                category: 'Category',
                department: 'Department',
                title: 'Title',
                status: 'Status',
                score: 'Score'
            };
            var index = 1;
            _.forEach(this.questions, function (question) {
                headers['question' + index] = question.description;
                index++;
            });
            data.push(headers);
            _.forEach(generatedPosters, function (poster) {
                var item = {};
                item.posterNumber = poster.category + ' ' + poster.posterNumber;
                item.leadAuthor = _this4.getLeadAuthor(poster);
                item.category = poster.role;
                item.department = poster.institution;
                item.title = poster.posterTitle;
                item.status = _this4.getStatus(poster);
                item.score = _this4.$filter('number')(poster.score, 2); // Filters to 2 decimal places
                _this4.calculatePerformance(poster);
                index = 1;
                _.forEach(_this4.questions, function (question) {
                    item['question' + index] = poster['question' + index];
                    index++;
                });
                data.push(item);
            });
            this.reportService.generate(data, fileName);
        }
    }]);

    return AdminReportingController;
}();

AdminReportingController.$inject = ['$filter', 'posterService', 'summit', 'summits', 'posters', 'forms', 'formQuestions', 'questions', 'judgeCategories', 'reportService'];
app.controller('adminReportingController', AdminReportingController);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminSettingsController = function AdminSettingsController($state) {
    _classCallCheck(this, AdminSettingsController);

    this.tabs = [{ title: 'Institutions', id: 'institutions', state: 'home.admin.settings.site.institutions' }, { title: 'Roles', id: 'roles', state: 'home.admin.settings.site.roles' }, { title: 'Awards', id: 'awards', state: 'home.admin.settings.site.awards' }, { title: 'Judge Categories', id: 'judge-categories', state: 'home.admin.settings.site.judge-categories' }, { title: 'Poster Categories', id: 'poster-categories', state: 'home.admin.settings.site.poster-categories' }, { title: 'Question Sections', id: 'question-sections', state: 'home.admin.settings.site.question-sections' }, { title: 'Questions', id: 'questions', state: 'home.admin.settings.site.questions' }];
};

AdminSettingsController.$inject = ['$state'];
app.controller('adminSettingsController', AdminSettingsController);
"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JudgeDashboardController = function () {
    _createClass(JudgeDashboardController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                forms: ['formService', '$stateParams', 'localStorageService', function (formService, $stateParams, localStorageService) {
                    return formService.get({ judgeId: $stateParams.judgeId, summitId: localStorageService.get('summit').summitId, active: 1 }).then(function (data) {
                        return data;
                    });
                }],
                awards: ['awardService', function (awardService) {
                    return awardService.get().then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function JudgeDashboardController($scope, $state, $stateParams, forms, awards) {
        _classCallCheck(this, JudgeDashboardController);

        this.active = $stateParams.tab;
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.forms = forms;
        this.awards = awards;
        this.abstract = {};
        this.tabs = [{ id: 'Pending' }, { id: 'Complete' }];
    }

    _createClass(JudgeDashboardController, [{
        key: 'setAbstract',
        value: function setAbstract(poster) {
            this.abstract = {
                title: poster.posterTitle,
                objective: poster.objective,
                methods: poster.methods,
                results: poster.results,
                conclusion: poster.conclusion
            };
        }
    }, {
        key: 'downloadAbstract',
        value: function downloadAbstract(poster) {
            var name = poster.posterTitle + '.pdf';
            var abstractDoc = {
                header: function header(currentPage, pageCount) {
                    return { text: currentPage.toString() + ' of ' + pageCount, alignment: 'right', margin: [2, 2, 5, 0] };
                },
                background: { text: poster.posterTitle, bold: true, margin: [5, 2, 2, 0] },
                content: [{ text: poster.posterTitle, style: 'header' }, { text: 'Objective', style: 'header' }, poster.objective, { text: 'Methods', style: 'header' }, poster.methods, { text: 'Results', style: 'header' }, poster.results, { text: 'Conclusion', style: 'header' }, poster.conclusion],

                styles: {
                    header: {
                        fontSize: 22,
                        bold: true,
                        margin: [5, 10]
                    }
                }
            };
            pdfMake.createPdf(abstractDoc).download(name);
        }
    }]);

    return JudgeDashboardController;
}();

JudgeDashboardController.$inject = ['$scope', '$state', '$stateParams', 'forms', 'awards'];
app.controller('judgeDashboardController', JudgeDashboardController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JudgeFormController = function () {
    _createClass(JudgeFormController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                awards: ['awardService', function (awardService) {
                    return awardService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }],
                form: ['formService', '$stateParams', function (formService, $stateParams) {
                    return formService.get({ formId: $stateParams.formId }).then(function (data) {
                        return data[0];
                    });
                }],
                formQuestions: ['form', 'formQuestionService', function (form, formQuestionService) {
                    if (form.formId) {
                        return formQuestionService.get({ formId: form.formId }).then(function (data) {
                            return data;
                        });
                    } else {
                        return [];
                    }
                }],
                questionSections: ['questionSectionService', function (questionSectionService) {
                    return questionSectionService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }],
                questions: ['questionService', function (questionService) {
                    return questionService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function JudgeFormController($scope, $state, awards, form, formQuestions, questions, questionSections, formService, formQuestionService, notificationService) {
        _classCallCheck(this, JudgeFormController);

        this.awards = awards;
        this.questions = questions;
        this.questionSections = questionSections;
        this.originalForm = form;
        this.form = angular.copy(this.originalForm);
        this.form.judged = '1';
        this.originalFormQuestions = formQuestions;
        this.formQuestions = angular.copy(this.originalFormQuestions);
        this.formService = formService;
        this.formQuestionService = formQuestionService;
        this.notificationService = notificationService;
        this.$state = $state;
        this.scores = [{ id: '1', label: 'poor' }, { id: '2', label: 'adequate' }, { id: '3', label: 'fair' }, { id: '4', label: 'good' }, { id: '5', label: 'excellent' }];
        this.setupForm();
    }

    _createClass(JudgeFormController, [{
        key: 'submit',
        value: function submit() {
            var _this = this;

            if (!_.isEqual(this.form, this.originalForm)) {
                this.formService.update(this.form).then(function (data) {
                    _this.originalForm = angular.copy(_this.form);
                    if (!_.isEqualWith(_this.formQuestions, _this.originalFormQuestions, function (newVal, originalVal) {
                        var match = true;
                        _.forEach(newVal, function (val, key) {
                            if (val.score !== originalVal[key].score) {
                                match = false;
                            }
                        });
                        return match;
                    })) {
                        _this.formQuestionService.update(_this.formQuestions).then(function (data) {
                            _this.originalFormQuestions = angular.copy(_this.formQuestions);
                            _this.$state.go('home.judge.dashboard');
                        });
                    } else {
                        _this.$state.go('home.judge.dashboard');
                    }
                });
            } else {
                this.notificationService.error('No changes to submit!');
            }
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.form = angular.copy(this.originalForm);
            this.form.judged = '1';
            this.$state.go('home.judge.dashboard');
        }

        // This creates form questions if its the first time accessing the page

    }, {
        key: 'setupForm',
        value: function setupForm() {
            var _this2 = this;

            if (this.formQuestions.length === 0) {
                _.forEach(this.questions, function (question) {
                    var formQuestion = { formId: _this2.form.formId, questionId: question.questionId, section: question.section, description: question.description, score: 0 };
                    _this2.formQuestions.push(formQuestion);
                });
                this.formQuestionService.create(this.formQuestions);
                this.originalFormQuestions = angular.copy(this.formQuestions);
            }
        }
    }, {
        key: 'sum',
        value: function sum() {
            var _this3 = this;

            this.form.total = 0;
            _.forEach(this.formQuestions, function (formQuestion) {
                _this3.form.total += parseInt(formQuestion.score);
            });
        }
    }]);

    return JudgeFormController;
}();

JudgeFormController.$inject = ['$scope', '$state', 'awards', 'form', 'formQuestions', 'questions', 'questionSections', 'formService', 'formQuestionService', 'notificationService'];
app.controller('judgeFormController', JudgeFormController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JudgeInfoController = function () {
    _createClass(JudgeInfoController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                judgeCategories: ['judgeCategoryService', function (judgeCategoryService) {
                    return judgeCategoryService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function JudgeInfoController($scope, judge, judgeCategories) {
        _classCallCheck(this, JudgeInfoController);

        this.judge = judge;
        this.judgeCategories = judgeCategories;
    }

    return JudgeInfoController;
}();

JudgeInfoController.$inject = ['$scope', 'judge', 'judgeCategories'];
app.controller('judgeInfoController', JudgeInfoController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JudgeNavController = function () {
    _createClass(JudgeNavController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                judge: ['judgeService', '$stateParams', function (judgeService, $stateParams) {
                    return judgeService.get({ judgeId: $stateParams.judgeId }).then(function (data) {
                        return data[0];
                    });
                }]
            };
        }
    }]);

    function JudgeNavController($scope, judge, authService) {
        _classCallCheck(this, JudgeNavController);

        $scope.navbar = { hideNav: false };
        this.authService = authService;
        this.user = judge;
    }

    return JudgeNavController;
}();

JudgeNavController.$inject = ['$scope', 'judge', 'authService'];
app.controller('judgeNavController', JudgeNavController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegisterController = function () {
    _createClass(RegisterController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                summit: ['summitService', function (summitService) {
                    return summitService.get({ active: 1 }).then(function (data) {
                        return data[0];
                    });
                }]
            };
        }
    }]);

    function RegisterController($scope, $state, summit, presenterService, notificationService, localStorageService, registrationService, reCaptchaService) {
        _classCallCheck(this, RegisterController);

        if (summit === undefined) {
            $state.go('home.landing');
        }
        var deadline = new Date(summit.registrationDeadline).valueOf();
        var today = new Date().valueOf();
        if (deadline < today) {
            $state.go('home.landing');
        }
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.reCaptchaService = reCaptchaService;
        this.$state = $state;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.suffix = "";
        this.emailConfirmation = "";
        this.presenter = {};
        this.$scope = $scope;

        //Whatever for reCaptcha here
    }

    //Makes sure that the registrant entered the same email for both email fields


    _createClass(RegisterController, [{
        key: 'verifyEmail',
        value: function verifyEmail() {
            if (this.email === this.emailConfirmation) {
                this.continue();
            } else {
                this.notificationService.error("Email and Email Confirmation must match!");
            }
        }
    }, {
        key: 'verifyRecaptcha',
        value: function verifyRecaptcha() {
            var _this = this;

            this.grecaptchaResponse = grecaptcha.getResponse();
            this.reCaptchaService.send({ grecaptchaResponse: this.grecaptchaResponse }).then(function () {
                _this.verifyEmail();
            }).catch(function () {
                grecaptcha.reset();
                _this.notificationService.error("Please complete the reCaptcha!");
            });
        }
    }, {
        key: 'continue',


        //Loads the data in the custom service and will move to the next page
        value: function _continue() {

            this.presenter = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                suffix: this.suffix,
                institutionId: 0,
                roleId: 0
            };

            this.registrationService.presenter = this.presenter;

            this.registrationService.presenterFirstName = this.presenterFirstName;
            this.registrationService.presenterLastName = this.presenterLastName;
            this.registrationService.presenterEmail = this.presenterEmail;
            this.$state.go("register-institution", { valid: true });
        }
    }]);

    return RegisterController;
}();

RegisterController.$inject = ['$scope', '$state', 'summit', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'reCaptchaService'];
app.controller('registerController', RegisterController);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegisterConfirmationController = function () {
    function RegisterConfirmationController($scope, $state, presenterService, notificationService, localStorageService, registrationService, authService) {
        _classCallCheck(this, RegisterConfirmationController);

        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.authService = authService;
        this.$state = $state;
        this.presenterCode = "";
    }

    _createClass(RegisterConfirmationController, [{
        key: "validateCode",
        value: function validateCode() {

            if (this.presenterCode !== "") {
                this.continue();
            } else {
                this.notificationService.error("Please enter the code you received in your email!");
            }
        }
    }, {
        key: "continue",
        value: function _continue() {
            this.$state.go('register-institution');
        }
    }]);

    return RegisterConfirmationController;
}();

RegisterConfirmationController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'authService'];
app.controller('registerConfirmationController', RegisterConfirmationController);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegisterInfoController = function () {
    function RegisterInfoController($scope, $state, presenterService, notificationService, localStorageService, registrationService) {
        _classCallCheck(this, RegisterInfoController);

        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$state = $state;
        this.posterAbstract = {};
        this.projectTitle = "";
        this.projectObjective = "";
        this.projectMethods = "";
        this.projectResults = "";
        this.projectConclusion = "";
    }

    _createClass(RegisterInfoController, [{
        key: "finish",
        value: function finish() {

            this.posterAbstract = {
                title: this.projectTitle,
                objective: this.projectObjective,
                methods: this.projectMethods,
                results: this.projectResults,
                conclusion: this.projectConclusion
            };

            this.registrationService.posterAbstract = this.posterAbstract;
            this.registrationService.projectTitle = this.projectTitle;
            this.registrationService.projectObjective = this.projectObjective;
            this.registrationService.projectMethods = this.projectMethods;
            this.registrationService.projectResults = this.projectResults;
            this.registrationService.projectConclusion = this.projectConclusion;
            this.registrationService.summitId = this.summitId;
            this.registrationService.create();
            this.$state.go('home.landing');
            this.notificationService.success("Thank you for registering!");
        }
    }]);

    return RegisterInfoController;
}();

RegisterInfoController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('registerInfoController', RegisterInfoController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegisterInstitutionController = function () {
    _createClass(RegisterInstitutionController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                institutions: ['institutionService', function (institutionService) {
                    return institutionService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }],
                roles: ['roleService', function (roleService) {
                    return roleService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function RegisterInstitutionController($scope, $state, presenterService, notificationService, localStorageService, registrationService, institutions, roles) {
        _classCallCheck(this, RegisterInstitutionController);

        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$state = $state;
        this.summitId = localStorageService.get("summit").summitId;
        this.presenterInstitution = "";
        this.presenterRole = "";
        this.posterCategoryId = "";
        this.keyParticipantFName = "";
        this.keyParticipantLName = "";
        this.keyParticipantDepartment = "";
        this.keyParticipantInstitution = "";
        this.keyParticipantRole = "";
        this.institutions = institutions;
        this.roles = roles;
        this.keyParticipants = [];
        this.keyParticipant = {};
        this.musomDepartments = ["Family Medicine", "MED/PEDS", "Surgery", "Orthopaedics", "OBGYN", "Psychiatry", "Neurology", "Pediatrics", "Cardiology", "Endocrinology", "Hematology/Oncology", "Nephrology", "Pulmonary", "Sports Medicine"];
    }

    //Checks to see if the user chose an institution


    _createClass(RegisterInstitutionController, [{
        key: 'checkInstitutionExists',
        value: function checkInstitutionExists() {
            if (this.presenterInstitution !== null) {
                this.checkRoleExists();
            } else {
                this.notificationService.error("Please choose an institution!");
            }
        }
    }, {
        key: 'checkRoleExists',


        //Checks to see if the user chose a role
        value: function checkRoleExists() {
            if (this.presenterRole !== null) {
                this.continue();
            } else {
                this.notificationService.error("Please choose a role!");
            }
        }
    }, {
        key: 'checkKeyParticipantFNameExists',


        //Checks to see if the user entered a first name for the key participant
        value: function checkKeyParticipantFNameExists() {
            if (this.keyParticipantFName !== "") {
                this.checkKeyParticipantLNameExists();
            } else {
                this.notificationService.error("Please enter a first name!");
            }
        }
    }, {
        key: 'checkKeyParticipantLNameExists',


        //Checks to see if the user entered a last name for the key participant
        value: function checkKeyParticipantLNameExists() {
            if (this.keyParticipantLName !== "") {
                this.checkKeyParticipantInstitutionExists();
            } else {
                this.notificationService.error("Please enter a last name!");
            }
        }
    }, {
        key: 'checkKeyParticipantInstitutionExists',


        //Checks to see if the user chose an institution for the key participant
        value: function checkKeyParticipantInstitutionExists() {
            if (this.keyParticipantInstitution !== null && this.keyParticipantInstitution !== "") {
                this.checkKeyParticipantDepartmentExists();
            } else {
                this.notificationService.error("Please choose an institution");
            }
        }
    }, {
        key: 'checkKeyParticipantDepartmentExists',


        //Checks to see if the user chose/entered a department for the key participant.  This is only needed for the School of Medicine and Cabell Huntington
        value: function checkKeyParticipantDepartmentExists() {
            if (this.keyParticipantInstitution === "1" || this.keyParticipantInstitution === "2") {
                if (this.keyParticipantDepartment !== null && this.keyParticipantDepartment !== "") {
                    this.checkKeyParticipantRoleExists();
                } else {
                    this.notificationService.error("Please enter/choose a department!");
                }
            } else {
                this.keyParticipantDepartment = "N/A";
                this.checkKeyParticipantRoleExists();
            }
        }
    }, {
        key: 'checkKeyParticipantRoleExists',


        //Checks to see if the user chose a role for the key participant
        value: function checkKeyParticipantRoleExists() {
            if (this.keyParticipantRole !== null) {
                this.addKeyParticipant();
            } else {
                this.notificationService.error("Please choose a role!");
            }
        }
    }, {
        key: 'getPosterCategoryId',


        //Sets the category for the posters based off of the role
        value: function getPosterCategoryId() {

            if (this.presenterRole === "1") {
                this.posterCategoryId = "4";
            } else if (this.presenterRole === "2") {
                this.posterCategoryId = "1";
            } else if (this.presenterRole === "3") {
                this.posterCategoryId = "2";
            } else if (this.presenterRole === "4" || this.presenterRole === "5") {
                this.posterCategoryId = "3";
            }
        }

        //Adds the entered key participant to the array

    }, {
        key: 'addKeyParticipant',
        value: function addKeyParticipant() {
            var _this = this;

            this.keyParticipant = {
                firstName: this.keyParticipantFName,
                lastName: this.keyParticipantLName,
                department: this.keyParticipantDepartment,
                institutionId: this.keyParticipantInstitution,
                roleId: this.keyParticipantRole
            };
            _.forEach(this.institutions, function (institution) {
                if (institution.institutionId === _this.keyParticipant.institutionId) {
                    _this.keyParticipant.institution = institution.title;
                }
            });
            _.forEach(this.roles, function (role) {
                if (role.roleId === _this.keyParticipant.roleId) {
                    _this.keyParticipant.role = role.title;
                }
            });
            this.keyParticipants.push(this.keyParticipant);
            this.close();
        }
    }, {
        key: 'continue',


        //Puts all of the information in the Registration Service and goes to the next page
        value: function _continue() {
            var _this2 = this;

            _.forEach(this.roles, function (role) {
                if (_this2.presenterRole === role.roleId) {
                    _this2.posterCategoryId = role.posterCategoryId;
                }
            });

            this.poster = {
                posterCategoryId: this.posterCategoryId,
                summitId: this.summitId,
                awardId: 1,
                posterAbstractId: 0,
                presenterId: 0
            };

            this.registrationService.poster = this.poster;
            this.registrationService.presenter.institutionId = this.presenterInstitution;
            this.registrationService.presenter.roleId = this.presenterRole;
            this.registrationService.presenterInstitution = this.presenterInstitution;
            this.registrationService.presenterRole = this.presenterRole;
            this.registrationService.keyParticipants = angular.copy(this.keyParticipants);
            this.$state.go('register-info', { valid: true });
        }
    }, {
        key: 'close',


        //Closes the modal
        value: function close() {
            angular.element(document.querySelector("#modal1")).modal('close');
            this.keyParticipantFName = "";
            this.keyParticipantLName = "";
            this.keyParticipantDepartment = "";
            this.keyParticipantInstitution = "";
            this.keyParticipantRole = "";
            this.keyParticipant = {};
        }
    }, {
        key: 'delete',
        value: function _delete(keyParticipant) {
            _.remove(this.keyParticipants, keyParticipant);
            this.notificationService.success("Key Participant Removed!");
        }
    }]);

    return RegisterInstitutionController;
}();

RegisterInstitutionController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'institutions', 'roles'];
app.controller('registerInstitutionController', RegisterInstitutionController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AwardsController = function (_BaseSiteController) {
    _inherits(AwardsController, _BaseSiteController);

    _createClass(AwardsController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                awards: ['awardService', function (awardService) {
                    return awardService.get().then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function AwardsController(awardService, awards) {
        _classCallCheck(this, AwardsController);

        return _possibleConstructorReturn(this, (AwardsController.__proto__ || Object.getPrototypeOf(AwardsController)).call(this, awardService, awards));
    }

    return AwardsController;
}(BaseSiteController);

AwardsController.$inject = ['awardService', 'awards'];
app.controller('awardsController', AwardsController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JudgeCategoriesController = function (_BaseSiteController) {
    _inherits(JudgeCategoriesController, _BaseSiteController);

    _createClass(JudgeCategoriesController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                judgeCategories: ['judgeCategoryService', function (judgeCategoryService) {
                    return judgeCategoryService.get().then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function JudgeCategoriesController(judgeCategoryService, judgeCategories) {
        _classCallCheck(this, JudgeCategoriesController);

        return _possibleConstructorReturn(this, (JudgeCategoriesController.__proto__ || Object.getPrototypeOf(JudgeCategoriesController)).call(this, judgeCategoryService, judgeCategories));
    }

    return JudgeCategoriesController;
}(BaseSiteController);

JudgeCategoriesController.$inject = ['judgeCategoryService', 'judgeCategories'];
app.controller('judgeCategoriesController', JudgeCategoriesController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InstitutionsController = function () {
    _createClass(InstitutionsController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                institutions: ['institutionService', function (institutionService) {
                    return institutionService.get().then(function (data) {
                        return data;
                    });
                }],
                judgeCategories: ['judgeCategoryService', function (judgeCategoryService) {
                    return judgeCategoryService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function InstitutionsController(institutionService, institutions, judgeCategories) {
        _classCallCheck(this, InstitutionsController);

        this.institutionService = institutionService;
        this.institutions = institutions;
        this.judgeCategories = judgeCategories;
        this.institution = { judgeCategoryId: '', active: '1' };
        this.modal = false;
        this.editModal = false;
        this.canEdit = false;
    }

    _createClass(InstitutionsController, [{
        key: 'add',
        value: function add() {
            var _this = this;

            this.institutionService.create(this.institution).then(function (institution) {
                angular.element('.modal').modal('close');
                _this.setModal();
                _.forEach(_this.judgeCategories, function (judgeCategory) {
                    if (judgeCategory.judgeCategoryId === institution.judgeCategoryId) {
                        institution.category = judgeCategory.title;
                    }
                });
                _this.institutions.push(institution);
                _this.institution = { judgeCategory: '', active: '1' };
            });
        }
    }, {
        key: 'edit',
        value: function edit() {
            var _this2 = this;

            this.institutionService.update(this.institution).then(function () {
                angular.element('.modal').modal('close');
                _this2.setModal();
                _.forEach(_this2.judgeCategories, function (judgeCategory) {
                    if (judgeCategory.judgeCategoryId === _this2.institution.judgeCategoryId) {
                        _this2.institution.category = judgeCategory.title;
                    }
                });
                _this2.institution = { judgeCategoryId: '', active: '1' };
            });
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.institution = { active: '1' };
            this.setModal();
            this.canEdit = false;
        }
    }, {
        key: 'activate',
        value: function activate(institution) {
            institution.active = '1';
            this.institutionService.update(institution);
        }
    }, {
        key: 'deactivate',
        value: function deactivate(institution) {
            institution.active = '0';
            this.institutionService.update(institution);
        }
    }, {
        key: 'setModal',
        value: function setModal() {
            this.modal = this.modal ? false : true;
        }
    }, {
        key: 'setEdit',
        value: function setEdit(institution) {
            this.canEdit = true;
            this.original = institution;
            this.institution = angular.copy(this.original);
        }
    }, {
        key: 'setEditModal',
        value: function setEditModal() {
            this.editModal = this.editModal ? false : true;
        }
    }]);

    return InstitutionsController;
}();

InstitutionsController.$inject = ['institutionService', 'institutions', 'judgeCategories'];
app.controller('institutionsController', InstitutionsController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PosterCategoriesController = function (_BaseSiteController) {
    _inherits(PosterCategoriesController, _BaseSiteController);

    _createClass(PosterCategoriesController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                posterCategories: ['posterCategoryService', function (posterCategoryService) {
                    return posterCategoryService.get().then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function PosterCategoriesController(posterCategoryService, posterCategories) {
        _classCallCheck(this, PosterCategoriesController);

        return _possibleConstructorReturn(this, (PosterCategoriesController.__proto__ || Object.getPrototypeOf(PosterCategoriesController)).call(this, posterCategoryService, posterCategories));
    }

    return PosterCategoriesController;
}(BaseSiteController);

PosterCategoriesController.$inject = ['posterCategoryService', 'posterCategories'];
app.controller('posterCategoriesController', PosterCategoriesController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionSectionsController = function (_BaseSiteController) {
    _inherits(QuestionSectionsController, _BaseSiteController);

    _createClass(QuestionSectionsController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                questionSections: ['questionSectionService', function (questionSectionService) {
                    return questionSectionService.get().then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function QuestionSectionsController(questionSectionService, questionSections) {
        _classCallCheck(this, QuestionSectionsController);

        return _possibleConstructorReturn(this, (QuestionSectionsController.__proto__ || Object.getPrototypeOf(QuestionSectionsController)).call(this, questionSectionService, questionSections));
    }

    return QuestionSectionsController;
}(BaseSiteController);

QuestionSectionsController.$inject = ['questionSectionService', 'questionSections'];
app.controller('questionSectionsController', QuestionSectionsController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionsController = function (_BaseSiteTableModelCo) {
    _inherits(QuestionsController, _BaseSiteTableModelCo);

    _createClass(QuestionsController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                questions: ['questionService', function (questionService) {
                    return questionService.get().then(function (data) {
                        return data;
                    });
                }],
                questionSections: ['questionSectionService', function (questionSectionService) {
                    return questionSectionService.get().then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function QuestionsController(questionService, questions, questionSections) {
        _classCallCheck(this, QuestionsController);

        var _this = _possibleConstructorReturn(this, (QuestionsController.__proto__ || Object.getPrototypeOf(QuestionsController)).call(this, questionService, questions));

        _this.questionSections = questionSections;
        _this.section = questionSections[0].questionSectionId;
        return _this;
    }

    return QuestionsController;
}(BaseSiteTableModelController);

QuestionsController.$inject = ['questionService', 'questions', 'questionSections'];
app.controller('questionsController', QuestionsController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RolesController = function () {
    _createClass(RolesController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                roles: ['roleService', function (roleService) {
                    return roleService.get().then(function (data) {
                        return data;
                    });
                }],
                posterCategories: ['posterCategoryService', function (posterCategoryService) {
                    return posterCategoryService.get({ active: 1 }).then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function RolesController(roleService, roles, posterCategories) {
        _classCallCheck(this, RolesController);

        this.roleService = roleService;
        this.roles = roles;
        this.posterCategories = posterCategories;
        this.role = { active: '1' };
        this.modal = false;
        this.editModal = false;
        this.canEdit = false;
    }

    _createClass(RolesController, [{
        key: 'add',
        value: function add() {
            var _this = this;

            this.roleService.create(this.role).then(function (role) {
                angular.element('.modal').modal('close');
                _this.setModal();
                _.forEach(_this.posterCategories, function (posterCategory) {
                    if (posterCategory.posterCategoryId === role.posterCategoryId) {
                        role.category = posterCategory.title;
                    }
                });
                _this.roles.push(role);
                _this.role = { active: '1' };
            });
        }
    }, {
        key: 'edit',
        value: function edit() {
            var _this2 = this;

            var role = _.find(this.roles, { roleId: this.role.roleId });
            this.roleService.update(this.role).then(function () {
                angular.element('.modal').modal('close');
                _this2.setModal();
                _.forEach(_this2.posterCategories, function (posterCategory) {
                    if (posterCategory.posterCategoryId === role.posterCategoryId) {
                        role.category = posterCategory.title;
                    }
                });
                _this2.role = { active: '1' };
            });
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.role = { active: '1' };
            this.setModal();
            this.canEdit = false;
        }
    }, {
        key: 'activate',
        value: function activate(role) {
            role.active = '1';
            this.roleService.update(role);
        }
    }, {
        key: 'deactivate',
        value: function deactivate(role) {
            role.active = '0';
            this.roleService.update(role);
        }
    }, {
        key: 'setModal',
        value: function setModal() {
            this.modal = this.modal ? false : true;
        }
    }, {
        key: 'setEdit',
        value: function setEdit(role) {
            this.canEdit = true;
            this.original = role;
            this.role = angular.copy(this.original);
        }
    }, {
        key: 'setEditModal',
        value: function setEditModal() {
            this.editModal = this.editModal ? false : true;
        }
    }]);

    return RolesController;
}();

RolesController.$inject = ['roleService', 'roles', 'posterCategories'];
app.controller('rolesController', RolesController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SummitInfoController = function () {
    _createClass(SummitInfoController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                summit: ['summitService', '$stateParams', function (summitService, $stateParams) {
                    return summitService.get({ summitId: $stateParams.summitId }).then(function (data) {
                        return data[0];
                    });
                }]
            };
        }
    }]);

    function SummitInfoController($scope, $filter, summitService, summit, localStorageService, notificationService) {
        _classCallCheck(this, SummitInfoController);

        this.$scope = $scope;
        this.summitService = summitService;
        this.localStorageService = localStorageService;
        this.notificationService = notificationService;
        this.original = summit;
        this.$filter = $filter;
        this.summit = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.summitDate = this.$filter('date')(this.summit.summitStart, 'd MMM, y');
        this.startTime = this.summit.summitStart;
        this.endTime = this.summit.summitEnd;
        this.registrationDeadline = this.$filter('date')(this.summit.registrationDeadline, 'd MMM, y');
        this.deadlineTime = this.summit.registrationDeadline;
        this.canEdit = false;
    }

    _createClass(SummitInfoController, [{
        key: 'edit',
        value: function edit() {
            this.canEdit = true;
        }
    }, {
        key: 'save',
        value: function save() {
            var _this = this;

            if (this.valid()) {
                if (!(this.summitDate instanceof Date)) {
                    this.summitDate = new Date(this.summitDate);
                }
                if (!(this.registrationDeadline instanceof Date)) {
                    this.registrationDeadline = new Date(this.registrationDeadline);
                }
                this.summit.summitStart = this.$filter('date')(new Date(this.summitDate.getFullYear(), this.summitDate.getMonth(), this.summitDate.getDate(), this.startTime.getHours(), this.startTime.getMinutes(), 0), 'yyyy-MM-dd HH:mm:ss');
                this.summit.summitEnd = this.$filter('date')(new Date(this.summitDate.getFullYear(), this.summitDate.getMonth(), this.summitDate.getDate(), this.endTime.getHours(), this.endTime.getMinutes(), 0), 'yyyy-MM-dd HH:mm:ss');
                this.summit.registrationDeadline = this.$filter('date')(new Date(this.registrationDeadline.getFullYear(), this.registrationDeadline.getMonth(), this.registrationDeadline.getDate(), this.deadlineTime.getHours(), this.deadlineTime.getMinutes(), 0), 'yyyy-MM-dd HH:mm:ss');
                this.summitService.update(this.summit).then(function () {
                    if (isTrue(_this.summit.active)) {
                        _this.localStorageService.set('summit', _this.summit);
                    }
                    _this.canEdit = false;
                    _this.original = angular.copy(_this.summit);
                    if (!(_this.summit.summitStart instanceof Date)) {
                        _this.summit.summitStart = new Date(_this.summit.summitStart);
                    }
                    if (!(_this.summit.summitEnd instanceof Date)) {
                        _this.summit.summitEnd = new Date(_this.summit.summitEnd);
                    }
                    if (!(_this.summit.registrationDeadline instanceof Date)) {
                        _this.summit.registrationDeadline = new Date(_this.summit.registrationDeadline);
                    }
                    _this.summitDate = _this.$filter('date')(_this.summit.summitStart, 'd MMM, y');
                    _this.startTime = _this.summit.summitStart;
                    _this.endTime = _this.summit.summitEnd;
                    _this.registrationDeadline = _this.$filter('date')(_this.summit.registrationDeadline, 'd MMM, y');
                    _this.deadlineTime = _this.summit.registrationDeadline;
                }).catch(function (error) {
                    _this.canEdit = false;
                    _this.summit = angular.copy(_this.original);
                    _this.summitDate = _this.$filter('date')(_this.summit.summitStart, 'd MMM, y');
                    _this.startTime = _this.summit.summitStart;
                    _this.endTime = _this.summit.summitEnd;
                    _this.registrationDeadline = _this.$filter('date')(_this.summit.registrationDeadline, 'd MMM, y');
                    _this.deadlineTime = _this.summit.registrationDeadline;
                });
            } else {
                this.notificationService.error('Please fill out all the forms!');
            }
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.canEdit = false;
            if (!(this.summit.summitStart instanceof Date)) {
                this.summit.summitStart = new Date(this.summit.summitStart);
            }
            if (!(this.summit.summitEnd instanceof Date)) {
                this.summit.summitEnd = new Date(this.summit.summitEnd);
            }
            if (!(this.summit.registrationDeadline instanceof Date)) {
                this.summit.registrationDeadline = new Date(this.summit.registrationDeadline);
            }
            this.summit = angular.copy(this.original);
            this.summitDate = this.$filter('date')(this.summit.summitStart, 'd MMM, y');
            this.startTime = this.summit.summitStart;
            this.endTime = this.summit.summitEnd;
            this.registrationDeadline = this.$filter('date')(this.summit.registrationDeadline, 'd MMM, y');
            this.deadlineTime = this.summit.registrationDeadline;
        }
    }, {
        key: 'valid',
        value: function valid() {
            var valid = true;
            if (this.summitDate === null || this.summitDate === undefined) {
                valid = false;
            } else if (this.startTime === null || this.startTime === undefined) {
                valid = false;
            } else if (this.endTime === null || this.endTime === undefined) {
                valid = false;
            } else if (this.registrationDeadline === null || this.registrationDeadline === undefined) {
                valid = false;
            } else if (this.deadlineTime === null || this.deadlineTime === undefined) {
                valid = false;
            }
            return valid;
        }
    }, {
        key: 'updatePin',
        value: function updatePin() {
            var _this2 = this;

            if (this.newPin !== this.confirmPin) {
                this.notificationService.error('Pins don\'t match!');
            } else if (this.newPin == null) {
                this.notificationService.error('Please set a new pin!');
            } else if (this.newPin.length < 4) {
                this.notificationService.error('Pin must be 4 digits!');
            } else {
                var pin = { summitId: this.original.summitId, newPin: this.newPin, oldPin: this.oldPin };
                this.summitService.updatePin(pin).then(function (data) {
                    _this2.resetPinFields();
                }).catch(function (error) {
                    _this2.resetPinFields();
                });
            }
        }
    }, {
        key: 'resetPinFields',
        value: function resetPinFields() {
            this.newPin = null;
            this.oldPin = null;
            this.confirmPin = null;
        }
    }, {
        key: 'cancelPin',
        value: function cancelPin() {
            this.canEdit = false;
            this.oldPin = null;
            this.newPin = null;
            this.confirmPin = null;
        }
    }]);

    return SummitInfoController;
}();

SummitInfoController.$inject = ['$scope', '$filter', 'summitService', 'summit', 'localStorageService', 'notificationService'];
app.controller('summitInfoController', SummitInfoController);
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SummitsController = function (_BaseTableModelContro) {
    _inherits(SummitsController, _BaseTableModelContro);

    _createClass(SummitsController, null, [{
        key: 'resolve',
        value: function resolve() {
            return {
                summits: ['summitService', function (summitService) {
                    return summitService.get().then(function (data) {
                        return data;
                    });
                }]
            };
        }
    }]);

    function SummitsController($scope, $filter, summitService, summits, notificationService, authService, localStorageService) {
        _classCallCheck(this, SummitsController);

        var _this = _possibleConstructorReturn(this, (SummitsController.__proto__ || Object.getPrototypeOf(SummitsController)).call(this, summitService, summits));

        _this.notificationService = notificationService;
        _this.adminId = authService.currentUser.id;
        _this.localStorageService = localStorageService;
        _this.$filter = $filter;
        _this.adminScope = $scope.$parent.$parent; // This is awful, but you gotta do what you gotta do. This should be changed when it can.
        return _this;
    }

    _createClass(SummitsController, [{
        key: 'add',
        value: function add() {
            var _this2 = this;

            if (this.valid()) {
                if (this.model.pin !== this.confirmPin) {
                    this.notificationService.error('Pins do not match!');
                } else {
                    var summitDate = this.parseSummitDate();
                    this.model.summitStart = this.$filter('date')(this.parseStartDate(summitDate), 'yyyy-MM-dd HH:mm:ss');
                    this.model.summitEnd = this.$filter('date')(this.parseEndDate(summitDate), 'yyyy-MM-dd HH:mm:ss');
                    this.model.registrationDeadline = this.$filter('date')(this.parseRegistrationDeadline(), 'yyyy-MM-dd HH:mm:ss');
                    this.model.judgeLoginDisabled = 1;
                    this.model.createdByAdminId = this.adminId;
                    this.service.create(this.model).then(function (model) {
                        if (isTrue(model.active)) {
                            _this2.localStorageService.set('summit', model);
                            _this2.adminScope.summitId = model.summitId;
                            _.forEach(_this2.models, function (summit) {
                                summit.active = 0;
                            });
                        }
                        model.summitStart = new Date(model.summitStart);
                        model.summitEnd = new Date(model.summitEnd);
                        model.registrationDeadline = new Date(model.registrationDeadline);
                        angular.element('.modal').modal('close');
                        _this2.setModal();
                        _this2.models.push(model);
                        _this2.model = { active: 1 };
                    });
                }
            } else {
                this.notificationService.error('Please fill out all forms!');
            }
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.summitDate = null;
            this.startTime = null;
            this.endTime = null;
            this.registrationDeadline = null;
            this.deadlineTime = null;
            _get(SummitsController.prototype.__proto__ || Object.getPrototypeOf(SummitsController.prototype), 'cancel', this).call(this);
        }
    }, {
        key: 'parseSummitDate',
        value: function parseSummitDate() {
            var summitDate = new Date(this.summitDate);
            return {
                summitDate: summitDate,
                year: summitDate.getFullYear(),
                month: summitDate.getMonth() - 1,
                date: summitDate.getDate()
            };
        }
    }, {
        key: 'parseStartDate',
        value: function parseStartDate(summitDate) {
            var startHours = this.startTime.getHours();
            var startMinutes = this.startTime.getMinutes();
            return new Date(summitDate.year, summitDate.month, summitDate.date, startHours, startMinutes, 0);
        }
    }, {
        key: 'parseEndDate',
        value: function parseEndDate(summitDate) {
            var endHours = this.endTime.getHours();
            var endMinutes = this.endTime.getMinutes();
            return new Date(summitDate.year, summitDate.month, summitDate.date, endHours, endMinutes, 0);
        }
    }, {
        key: 'parseRegistrationDeadline',
        value: function parseRegistrationDeadline() {
            var date = new Date(this.registrationDeadline);
            var hours = this.deadlineTime.getHours();
            var minutes = this.deadlineTime.getMinutes();
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0);
        }
    }, {
        key: 'valid',
        value: function valid() {
            var valid = true;
            if (this.summitDate === null || this.summitDate === undefined) {
                valid = false;
            } else if (this.startTime === null || this.startTime === undefined) {
                valid = false;
            } else if (this.endTime === null || this.endTime === undefined) {
                valid = false;
            } else if (this.registrationDeadline === null || this.registrationDeadline === undefined) {
                valid = false;
            } else if (this.deadlineTime === null || this.deadlineTime === undefined) {
                valid = false;
            }
            return valid;
        }
    }, {
        key: 'activate',
        value: function activate(summit) {
            this.localStorageService.set('summit', summit);
            this.adminScope.summitId = summit.summitId;
            _.forEach(this.models, function (summit) {
                summit.active = 0;
            });
            _get(SummitsController.prototype.__proto__ || Object.getPrototypeOf(SummitsController.prototype), 'activate', this).call(this, summit);
        }
    }, {
        key: 'deactivate',
        value: function deactivate(summit) {
            this.localStorageService.set('summit', undefined);
            this.adminScope.summitId = undefined;
            _get(SummitsController.prototype.__proto__ || Object.getPrototypeOf(SummitsController.prototype), 'deactivate', this).call(this, summit);
        }
    }]);

    return SummitsController;
}(BaseTableModelController);

SummitsController.$inject = ['$scope', '$filter', 'summitService', 'summits', 'notificationService', 'authService', 'localStorageService'];
app.controller('summitsController', SummitsController);