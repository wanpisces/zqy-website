/**
 * Created by Administrator on 2016/11/7.
 */
var module_coreOther = function(router){

    //core-examine
    router.get('/examine-list',function (req, res) {
        res.render('examine-list');
    });

    //core-comment
    router.get('/comment-list',function (req, res) {
        res.render('comment-list');
    });

};

module.exports = module_coreOther;