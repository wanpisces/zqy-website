//配置文件
var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');

var module_dm = function(router){

	//数据导入
	router.get('/data-import', function(req, res, next) {
		res.render('data-import');
	});
	router.get('/data-deal-list', function(req, res, next) {
		res.render('data-deal-list');
	});

	//文章
	router.get('/data-list',function(req,res,next){
		var data = {};
		data['token'] = req.session.userInfo;
		if(req.query.currentPage){
			data['currentPage'] = req.query.currentPage;
		}
		Http(
		{url: API.systemDataList,method:'GET'},
		data,//前端数据
		function(content){
			//var obj = JSON.parse(content); 	//字符串转对象
			//请求成功
			res.json(content);
		},req);
	});

	router.get('/add-user', function(req, res, next) {
		res.render('add-user');
	});
	
};

module.exports = module_dm;
