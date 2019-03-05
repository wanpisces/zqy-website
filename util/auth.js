
//验证权限
var auth = function(req,res,next){
	var level = req.session.userLevel;//权限等级 0为超级管理员
	var router = {};
	if(level == undefined){
		res.redirect('/');
	}
	if(level == 0){
		router['level'] = 0;
	}
	if(level == 7){
		router['level'] = 1;
	}
	if(level == 8){
		router['level'] = 2;
	}
	return router;
};

module.exports = auth;
