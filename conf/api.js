var CONF = require('../conf/conf.js');
var base_common = '';								//登录,注册,上传,短信
var base = CONF.HOSTNAME;//"http://test.didoxy.com";
// var base = 'http://api.easysq.cn'; //app接口地址
var base_public = base + '/public';
// var base_system = 'http://eshequapi.didoxy.com/community';
var base_web = base + '/web';//web端
var API = {};

//web
API.home = base_web + '/index';//首页
API.serial = base_web + '/index/serial';//首页七省切换新闻
API.news = base_web + '/news';//首页要闻
API.project = base_web + '/project';//项目库
API.goods = base_web + '/goods';//商品列表页
API.eper = base_web + '/eper';//期刊列表
API.ad = base_web + '/ad';//广告
API.projectAll = base_web + '/projectAll';//项目
API.pay = base_web + '/toPay';//支付
API.attr = base_public + '/attr';//分类
API.serviceProjectAdd = base_web + '/serviceProjectAdd';//添加项目
module.exports = API;
