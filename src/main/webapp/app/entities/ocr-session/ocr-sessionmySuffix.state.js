(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('ocr-sessionmySuffix', {
            parent: 'entity',
            url: '/ocr-sessionmySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.ocrSession.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ocr-session/ocr-sessionsmySuffix.html',
                    controller: 'OcrSessionMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ocrSession');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('ocr-sessionmySuffix-detail', {
            parent: 'entity',
            url: '/ocr-sessionmySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.ocrSession.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ocr-session/ocr-sessionmySuffix-detail.html',
                    controller: 'OcrSessionMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ocrSession');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'OcrSession', function($stateParams, OcrSession) {
                    return OcrSession.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'ocr-sessionmySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('ocr-sessionmySuffix-detail.edit', {
            parent: 'ocr-sessionmySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ocr-session/ocr-sessionmySuffix-dialog.html',
                    controller: 'OcrSessionMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['OcrSession', function(OcrSession) {
                            return OcrSession.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ocr-sessionmySuffix.new', {
            parent: 'ocr-sessionmySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ocr-session/ocr-sessionmySuffix-dialog.html',
                    controller: 'OcrSessionMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                statusId: null,
                                serverFilePath: null,
                                filename: null,
                                createdBy: null,
                                updatedBy: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('ocr-sessionmySuffix', null, { reload: 'ocr-sessionmySuffix' });
                }, function() {
                    $state.go('ocr-sessionmySuffix');
                });
            }]
        })
        .state('ocr-sessionmySuffix.edit', {
            parent: 'ocr-sessionmySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ocr-session/ocr-sessionmySuffix-dialog.html',
                    controller: 'OcrSessionMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['OcrSession', function(OcrSession) {
                            return OcrSession.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ocr-sessionmySuffix', null, { reload: 'ocr-sessionmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ocr-sessionmySuffix.delete', {
            parent: 'ocr-sessionmySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ocr-session/ocr-sessionmySuffix-delete-dialog.html',
                    controller: 'OcrSessionMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['OcrSession', function(OcrSession) {
                            return OcrSession.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ocr-sessionmySuffix', null, { reload: 'ocr-sessionmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
