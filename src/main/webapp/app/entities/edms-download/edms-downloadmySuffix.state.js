(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('edms-downloadmySuffix', {
            parent: 'entity',
            url: '/edms-downloadmySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.edmsDownload.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/edms-download/edms-downloadsmySuffix.html',
                    controller: 'EdmsDownloadMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('edmsDownload');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('edms-downloadmySuffix-detail', {
            parent: 'entity',
            url: '/edms-downloadmySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ocrDataAdminApp.edmsDownload.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/edms-download/edms-downloadmySuffix-detail.html',
                    controller: 'EdmsDownloadMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('edmsDownload');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EdmsDownload', function($stateParams, EdmsDownload) {
                    return EdmsDownload.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'edms-downloadmySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('edms-downloadmySuffix-detail.edit', {
            parent: 'edms-downloadmySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-download/edms-downloadmySuffix-dialog.html',
                    controller: 'EdmsDownloadMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EdmsDownload', function(EdmsDownload) {
                            return EdmsDownload.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('edms-downloadmySuffix.new', {
            parent: 'edms-downloadmySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-download/edms-downloadmySuffix-dialog.html',
                    controller: 'EdmsDownloadMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                actualDirectory: null,
                                actualFilename: null,
                                createdBy: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('edms-downloadmySuffix', null, { reload: 'edms-downloadmySuffix' });
                }, function() {
                    $state.go('edms-downloadmySuffix');
                });
            }]
        })
        .state('edms-downloadmySuffix.edit', {
            parent: 'edms-downloadmySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-download/edms-downloadmySuffix-dialog.html',
                    controller: 'EdmsDownloadMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EdmsDownload', function(EdmsDownload) {
                            return EdmsDownload.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('edms-downloadmySuffix', null, { reload: 'edms-downloadmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('edms-downloadmySuffix.delete', {
            parent: 'edms-downloadmySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/edms-download/edms-downloadmySuffix-delete-dialog.html',
                    controller: 'EdmsDownloadMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EdmsDownload', function(EdmsDownload) {
                            return EdmsDownload.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('edms-downloadmySuffix', null, { reload: 'edms-downloadmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
