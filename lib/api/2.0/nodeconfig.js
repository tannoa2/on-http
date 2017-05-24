// Copyright 2017, EMC, Inc.

'use strict';

var injector = require('../../../index.js').injector;
var controller = injector.get('Http.Services.Swagger').controller;
var schemaApiService = injector.get('Http.Api.Services.Schema');
var nameSpace = '/api/2.0/nodeconfig/definitions/';
var waterline = injector.get('Services.Waterline');
var Errors = injector.get('Errors');
var nodes = injector.get('Http.Services.Api.Nodes');
var obmsService = injector.get('Http.Services.Api.Obms');
var _ = injector.get('_'); // jshint ignore:line

// GET /api/2.0/nodeconfig
var nodeconfigGet = controller(function(req) {
    return waterline.nodeconfig.find()
        .then(function(data){
            return data
        })
});

// PUT /api/2.0/nodeconfig
var nodeconfigPut = controller({success: 201}, function(req) {
    var dbEntry = req.swagger.params.body.value;
    return waterline.nodeconfig.create(dbEntry)
        .then(function(data){
            return data
        })
});

// GET /api/2.0/nodeconfig/identifier
var nodeconfigGetById = controller(function(req) {
    return waterline.nodeconfig.find({servertag:req.swagger.params.id.raw});
});

// PATCH /api/2.0/nodeconfig/identifier
var nodeconfigPatchById = controller( function(req) {
    return obmsService.updateObmById(
        req.swagger.params.identifier.value, req.swagger.params.body.value);

});

// DELETE /api/2.0/nodeconfig/identifier
var nodeconfigDeleteById = controller({success: 204}, function(req) {
    return obmsService.removeObmById(req.swagger.params.identifier.value);
});


module.exports = {
    nodeconfigGet: nodeconfigGet,
    nodeconfigPut: nodeconfigPut,
    nodeconfigGetById: nodeconfigGetById,
    nodeconfigPatchById: nodeconfigPatchById,
    nodeconfigDeleteById: nodeconfigDeleteById,
};
