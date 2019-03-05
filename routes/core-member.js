/**
 * Created by Administrator on 2016/11/7.
 */
var module_coreMember = function(router){

    //core-examine
    router.get('/member-list',function (req, res) {
        res.render('member-list');
    });

    //member-list-pass
    router.get('/member-list-pass',function (req, res) {
        res.render('member-list-pass');
    });

    //core-comment
    router.get('/member',function (req, res) {
        res.render('member');
    });


};

module.exports = module_coreMember;
