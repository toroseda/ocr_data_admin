(function () {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
