'use strict';
var express = require('express');
var router = express.Router();

var common = require('../common/common');
var async = require('async');
var Base = require('../action/fun');


router.post('/s',function (req,res,next) {

	var self = '';
	async.auto({
		start: function (callback) {
			var action = new Base();
			self = action;
			action.init(req,callback,next);
		},
		finish: ['start', function (results, callback) { //return true 自动执行下一步
			common.showResult(res,200,'',{
				data: self.result ? self.result.toString() : '',
                page: self.pageCount,
                pageH: self.page
			},'success',1);
		}]
	});
});


router.post('/specific',function (req,res,next) {

	var self = '';
	async.auto({
		start: function (callback) {
			var action = new Base();
			self = action;
			action.specific(req,callback,next);
		},
		finish: ['start', function (results, callback) { //return true 自动执行下一步
			common.showResult(res,200,'',{
				data: self.result ? self.result.toString() : '',
                page: self.pageCount,
                pageH: self.page
			},'success',1);
		}]
	});
});

module.exports = router;