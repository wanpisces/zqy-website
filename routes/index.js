//配置文件
var CONF = require('../conf/conf.js');
var API = require('../conf/api.js');
var Http = require('../util/http.js');

//文件上传
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var request = require('request');
var fs = require('fs');					// 文件系统API
var path = require('path');
//认证
var auth = require('../util/auth.js');

var module_index = function (router) {

    //获取视频token
    router.get('/getToken', function (req, res, next) {
        var data = {};
        Http(
            {url: API.getToken, method: 'GET'},
            data,//前端数据
            function (content) {
                res.json(content);
            }, req);
    });

    //首页编辑
    router.get('/build', function (req, res, next) {
        var data = {};
        Http(
            {url: API.build, method: 'GET'},
            data,//前端数据
            function (content) {
                var obj = content;
                res.json(obj);
            }, req);
    });


    //登录
    router.post('/login', function (req, res, next) {
        var data = {};
        data['sysUserPhone'] = req.body.sysUserPhone;
        data['sysUserPwd'] = req.body.sysUserPwd;
        Http(
            {url: API.systemLogin, method: 'POST'},
            data,//前端数据
            function (content) {

                //var obj = JSON.parse(content); 	//字符串转对象
                var obj = content;

                //登录成功
                if (obj.code == 2000) {
                    // //写session
                    // var userInfo = {
                    // 	token:obj.data
                    // };
                    req.session.userInfo = obj.data.token;
                    req.session.roleName = obj.data.roleName;
                    req.session.sysUserPhone = obj.data.sysUserPhone;
                    req.session.communityName = obj.data.communityName;
                    //写入权限
                    req.session.userLevel = obj.data.level;
                    //跳转主页

                    // res.render('home1');
                    // res.send(JSON.stringify('12312312':'12312312312'));
                }
                res.json(content);
            }, req);
    });

    //首页
    router.get('/', function(req, res, next) {
        var data = req.query;
        var id = data.role_id;
        Http( {url: API.home, method: 'GET'},  data,//前端数据
          function (content) {
            if (content.code == 2000) {
                content.data.id = id;
                res.render('index',content.data);
            }
          }, req);
    });
    //首页七省新闻切换
    router.get('/index/serial', function(req, res, next) {
        var data = req.query;
        Http(
          {url: API.serial, method: 'GET'},
          data,//前端数据
          function (content) {
            if (content.code == 2000) {
                res.json(content.data);
            }
          }, req);
    });
    //要闻列表
    router.get('/article-details', function(req, res, next) {
        var data = req.query;
        Http(
          {url: API.news+'/'+data.news_id, method: 'GET'},
          data,//前端数据
          function (content){
            if (content.code == 2000) {
                res.render('article-details',content.data);
            }
          }, req);
    });



};
module.exports = module_index;
