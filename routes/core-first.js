/**
 * Created by Administrator on 2016/11/7.
 */


var module_coreFirst = function(router){

    //msg-list
    router.get('/msg-list',function (req, res) {
        res.render('msg-list');
    });

    //article-list
    router.get('/article-list',function (req, res) {
        res.render('article-list');
    });

};

module.exports = module_coreFirst;
