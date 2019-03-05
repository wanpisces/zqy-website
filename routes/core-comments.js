/**
 * Created by Administrator on 2016/11/7.
 */
var API = require('../conf/api.js');
var Http = require('../util/http.js');

var module_coreComments = function(router){

    //core-examine 评审列表
    router.get('/examine-list',function (req, res) {
        res.render('examine-list');
    });

    router.get('/article-select',function (req,res) {
        res.render('article-select');
    });


    // 评论列表 tabCon
    router.get('/comment-list',function (req, res) {
        res.render('comment-list');
    });
    router.get('/commentList',function (req, res) {
        var data = {};
        data['token'] = req.session.userInfo;
        var page = req.query.currentPage;
        var keyWords = req.query.keyWords;
        var commentType = req.query.commentType;
        if(page){
            data['currentPage'] = page;
        }
        if(keyWords){
            data['keyWords'] = keyWords;
        }
        if(commentType){
          data['commentType'] = commentType;
        }
        Http(
            {url: API.systemGetCommentTabcon,method:'GET'},
            data,//前端数据
            function(content){
              res.json(content);
            },req);
    });

    // 是否精选
    router.post('/ishot',function (req, res) {
        var data = {};
        data['token'] = req.session.userInfo;
        data['commentID'] = req.body.commentID;
        Http(
            {url: API.systemChangeIsHot,method:'PATCH'},
            data,//前端数据
            function(content){
                res.json(content);
            },req);
    });
    
    // 是否回复
    router.post('/commentReply',function (req,res) {
        var data = {};
        data['token'] = req.session.userInfo;
        data['commentID'] = req.body.commentID;
        data['commentContent'] = req.body.commentContent;
        Http(
            {url: API.systemReplyState,method:'POST'},
            data,//前端数据
            function(content){
                var obj = content;
                //成功
                if(obj.code == 2000){
                    res.send(obj);
                }else{
                    res.json(content);
                }
            },req);
    });
    //删除评论
    router.post('/commentDele',function (req, res) {
        var data = {};
        data['token'] = req.session.userInfo;
        data['commentID'] = req.body.commentID;
        Http(
            {url: API.systemCommentDele,method:'DELETE'},
            data,//前端数据
            function(content){
                var obj = content;
                if(obj.code == 2000){
                    res.send(obj);
                }else{
                    res.json(content);
                }
            },req);
    });

    //删除回复
    router.post('/replyDelete',function (req, res) {
        var data = {};
        data['token'] = req.session.userInfo;
        data['commentID'] = req.body.commentID;
        Http(
            {url: API.systemDeleteReply,method:'DELETE'},
            data,//前端数据
            function(content){
                var obj = content;
                if(obj.code == 2000){
                    res.send(obj);
                }else{
                    res.json(content);
                }
            },req);
    });

    //文章列表 tabCon

    router.get('/articleListTabcon',function (req, res) {
        var data = {};
        data['token'] = req.session.userInfo;
        if (req.query.classifyID){
            if (req.query.classifyID != '0'){
                data['classifyID'] = req.query.classifyID;
            }
        }
        Http(
            {url: API.systemGetArticleTabcon,method:'GET'},
            data,//前端数据
            function(content){
                var obj = content;
                if(obj.code == 2000){
                    res.send(obj);
                }else{
                    res.json(content);
                }
            },req);
    })
};

module.exports   = module_coreComments;
