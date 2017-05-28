var headerCommon = require('../common/variable');

var express = require('express');
var router = express.Router();
var async = require('async');
var Base = require('../action/fun');


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', headerCommon);
});


/* GET list page. */
router.get('/s/:name', function (req, res, next) {
	fetchList(req, next, function (data) {
		res.render('search', {
			common: headerCommon,
			res: data
		});
	});
});

/* GET next list page. */
router.get('/search', function (req, res, next) {
	fetchNextPage(req, next, function (data) {
		res.render('search', {
			common: headerCommon,
			res: data
		});
	});
});


function fetchList(req, next,_cb) {
	var self = '';
	async.auto({
		start: function (callback) {
			var action = new Base();
			self = action;
			action.init(req, callback, next);
		},
		finish: ['start', function (results, callback) { //return true 自动执行下一步
			_cb && _cb({
				data: self.result ? self.result.toString() : '',
				page: self.pageCount,
				pageH: self.page
			});
		}]
	});
}



function fetchNextPage(req, next,_cb) {

	var self = '';
	async.auto({
		start: function (callback) {
			var action = new Base();
			self = action;
			action.specific(req,callback,next);
		},
		finish: ['start', function (results, callback) { //return true 自动执行下一步
			_cb && _cb({
				data: self.result ? self.result.toString() : '',
				page: self.pageCount,
				pageH: self.page
			});


		}]
	});
}


module.exports = router;
