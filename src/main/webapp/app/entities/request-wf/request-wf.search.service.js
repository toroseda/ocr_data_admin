(function() {
    'use strict';

    angular
        .module('ocrDataAdminApp')
        .factory('RequestWfSearch', RequestWfSearch);

    RequestWfSearch.$inject = ['$resource'];

    function RequestWfSearch($resource) {
        var resourceUrl =  'api/_search/request-wfs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
