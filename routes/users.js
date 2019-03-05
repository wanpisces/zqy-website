var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');

var module_users = function(router){
	/* GET users listing. */

	/* GET home page. */

	//13 学术前沿 14申报解读 15热门要闻 16政策法规 17招商引资 18园区发展 19线上走廊
	router.get('/list-page', function(req, res, next) {
		var data = req.query;
		var aVal = [];
		if (data.parentval) {aVal.push(data.parentval);}
		if (data.erval) {aVal.push(data.erval);}
    Http(
      {url: API.news, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	content.data.aVal = aVal;
        	content.data.attr_id = data.attr_id;
        	content.data.role_id = data.role_id;
        	content.data.title = aVal[aVal.length-1];
        	res.render('list-page',content.data);
        }
      }, req);
	});
	//排行

	router.get('/rank', function(req, res, next) {
		var data = req.query;
    Http(
      {url: API.news, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.json(content.data);
        }
      }, req);
	});
	router.get('/click-details', function(req, res, next) {
		var data = req.query;
		res.render('click-details',data);
	});
	//电子期刊
	router.get('/ele-Journals', function(req, res, next) {
		var data = req.query;
		Http(
      {url: API.eper, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.render('ele-Journals',content.data);
        }
      }, req);
	});
	//云端集市
	router.get('/mall', function(req, res, next) {
		res.render('mall');
	});
	//云端集市列表
	router.get('/mallList', function(req, res, next) {
		var data = req.query;
		for (var item in  data) {
			if (data[item] =='') {
				delete data[item];
			}
		}
		Http(
      {url: API.goods, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.json(content.data);
        }
      }, req);
	});
	//广告
	router.get('/adList', function(req, res, next) {
		var data = req.query;
		Http(
      {url: API.ad+'/'+data.aid, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.json(content.data);
        }
      }, req);
	});

	//项目库
	router.get('/project-library', function(req, res, next) {
		var data = req.query;
		for (var item in  data) {
			if (data[item] =='') {
				delete data[item];
			}
		}
		Http(
      {url: API.projectAll, method: 'GET'},
      data,//前端数据
      function (content){
        console.log(content);
        if (content.code == 2000){
        	if (data.index1) {
        		content.data.index1 = data.index1
        	}
        	if (data.index2) {
        		content.data.index2 = data.index2
        	}
        	res.render('project-library',content.data);
        }
      }, req);
	});
	//购买页
	router.get('/purchase-page', function(req, res, next) {
		var data = req.query;
		Http(
      {url: API.goods+'/'+data.goods_id, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.render('purchase-page',content.data);
        }
      }, req);
	});
	//项目库更多
	router.get('/project-more', function(req, res, next) {
    var data = req.query;
    Http(
      {url: API.project, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
          var obj = content.data;
          obj.role_id = data.role_id;
          res.render('project-more',obj);
        }
      }, req);

	});
	//项目详情
	router.get('/project-detail', function(req, res, next) {
		var data = req.query;
		Http(
      {url: API.project+'/'+data.project_id, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.render('project-detail',content.data);
        }
      }, req);
	});

	//支付
	router.post('/pay', function(req, res, next) {
		var data = req.body;
		console.log(data);
		Http(
      {url: API.pay, method: 'POST'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.json(content.data);
        }
      }, req);
	});
//支付商品详情
router.get('/purchaseJson', function(req, res, next) {
		var data = req.query;
		Http(
      {url: API.goods+'/'+data.goods_id, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.json(content.data);
        }
      }, req);
	});

	router.get('/declare-service', function(req, res, next) {
		res.render('declare-service');
	});
	//申报服务
	router.post('/serviceProjectAdd', function(req, res, next) {
		var data = req.body;
		Http(
      {url: API.serviceProjectAdd, method: 'POST'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.send(content.msg);
        }
     }, req);
	});

	//分类
	router.get('/attr', function(req, res, next) {
		var data = req.query;
		Http(
      {url: API.attr+'/'+data.attr_group_id, method: 'GET'},
      data,//前端数据
      function (content){
        if (content.code == 2000){
        	res.json(content.data);
        }
      }, req);
	});

//关于我们
	router.get('/about', function(req, res, next) {
		res.render('about');
	});
};



module.exports = module_users;
