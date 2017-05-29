/**
 * Created by hjoker on 2017/5/29.
 */
'use strict';
let superagent = require('superagent');
let cheerio = require('cheerio');
let sqlAction = require('./mysql.js');

let url = 'http://www.pansou.com/';

superagent.get(url).end(function (err, res) {
	var $ = cheerio.load(res.text, {decodeEntities: false});
	let nav = [];
	$('.hothead a').each(function(index,item){
		nav.push($(item).text());
	});
	let list = [];
	let _temp = '';
	let resArr = [];
	$('.hotsearch ul ').each(function(index,item) {
		_temp = '';
		$(item).find('li a').each(function(index,item) {
			_temp += $(item).text() + ',';
		});
		_temp = _temp.substring(0,_temp.length-1);
		list.push(_temp);
	});
	nav.forEach(function(item,index) {
		resArr.push(['',item,list[index]])
	});

	sqlAction.query('truncate table hot',function(err,response) {
		if(!err) {
			sqlAction.insert('INSERT ignore INTO hot (id,nav,list) values ?',[resArr],function(err,response) {
				!err ? console.log('success') :  console.log('fail');
			});
		}
	})
})