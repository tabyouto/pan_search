'use strict';

let superagent  = require('superagent');
let async =require('async');
let cheerio     = require('cheerio');

function Base() {
	this.result = '';
	this.pageCount = 0;
    this.page = '';
};


Base.prototype.init = function(req, cb, next) {
	let that = this;
	async.auto({
		init: function (callback) { //return true 自动执行下一步
			let keyword = req.params.name || req.query.q;
			console.log(req.query.q);
			let url = encodeURI('http://cn.bing.com/search?q=site:pan.baidu.com '+ keyword +'&go=搜索&qs=bs&form=QBRE');
			superagent.get(url).end(function (err, res) {
				var $ = cheerio.load(res.text, {decodeEntities: false});
				var tmp = $('ol').html();
				that.pageCount = $(tmp).find('.sb_pagF li').length;
                that.page = $(tmp).find('.sb_pagF').html();
				$('.b_ans,.b_pag').remove();
				that.result = $('ol').html();
                var reg = /没有找到/;
                if(reg.test(that.result)) {
                    that.result = null;
                }
				callback && callback(null,'',next)
			})
		},
		cb: ['init', function (results, callback) {
			cb && cb();
		}]
	}, function (err, results) {
		console.log('err = ', err);
		console.log('results = ', results);
	});
};


Base.prototype.specific = function(req, cb, next) {
	let that = this;
	async.auto({
		init: function (callback) { //return true 自动执行下一步
			var _url = req.originalUrl.toString().split('+')[1];
			_url = _url.split('&')[0];
			console.log(_url);
			console.log(req.query.first);
            // http://cn.bing.com/search?q=site:pan.baidu.com 迅雷&go=搜索&qs=bs&form=QBRE&first=51&FORM=PERE3
			let url = encodeURI('http://cn.bing.com/search?q=site:pan.baidu.com '+ decodeURI(_url) +'&go=搜索&qs=bs&form=QBRE&first='+ req.query.first +'&FORM=PERE3');
			superagent.get(url).end(function (err, res) {
				var $ = cheerio.load(res.text, {decodeEntities: false});
                that.page = $('ol').find('.b_pag').html();
				// that.pageCount = $(tmp).find('.b_pag li').length;
				$('.b_ans,.b_pag').remove();
				that.result = $('ol').html(); //结果列表
                var reg = /没有找到/;
                if(reg.test(that.result)) {
                    that.result = null;
                }
				callback && callback(null,'',next)
			})
		},
		cb: ['init', function (results, callback) {
			cb && cb();
		}]
	}, function (err, results) {
		console.log('err = ', err);
		console.log('results = ', results);
	});
};

module.exports = Base;