var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');


var app = express();
var api_server = 'http://v2.api.dmzj.com/';
//首页
app.get('/', function (req, res, next) {
    res.redirect("https://www.dmzj.com/");
});
//轻小说
//推荐列表
app.get('/novel/recommend', function (req, res, next) {
    superagent.get(api_server + '/novel/recommend.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//最近更新列表
app.get('/novel/recentUpdate/:page', function (req, res, next) {
    superagent.get(api_server + '/novel/recentUpdate/' + (parseInt(req.params.page, 10) - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//排行榜
app.get('/novel/rank/all', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    superagent.get(api_server + '/novel/rank/0/0/' + (page - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//分类列表
app.get('/novel/category', function (req, res, next) {
    superagent.get(api_server + '/1/category.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//分类内容
app.get('/novel/category/:catId', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    var filter = 0;
    if (req.query.filter !== undefined && req.query.filter > 0) {
        filter = req.query.filter;
    }
    superagent.get(api_server + 'http://v2.api.dmzj.com/novel/' + req.params.catId + '/' + filter + '/0/' + (page - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//小说详情
app.get('/novel/info/:id', function (req, res, next) {
    superagent.get(api_server + '/novel/' + req.params.id + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//小说卷列表
app.get('/novel/chapter/:id', function (req, res, next) {
    superagent.get(api_server + '/novel/chapter/' + req.params.id + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//小说下载
app.get('/novel/download/:id/:volume_id/:chapter_id', function (req, res, next) {
    superagent.get(api_server + '/novel/download/' + req.params.id + '_' + req.params.volume_id + '_' + req.params.chapter_id + '.txt')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'text/html; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//小说搜索
app.get('/novel/search/', function (req, res, next) {
    superagent.get(api_server + '/search/show/1/' + encodeURI(req.query.keyword) + '/' + (parseInt(req.query.page, 10) - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});


//======漫画
//分类
app.get('/comic/category', function (req, res, next) {
    superagent.get(api_server + '/0/category.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//最近更新
app.get('/comic/latest', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    superagent.get(api_server + '/latest/100/' + (page - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//排行榜(未知)
app.get('/comic/rank/', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    res.redirect("/comic/rank/day?page=" + page);
});
//排行榜(日)
app.get('/comic/rank/day', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    superagent.get(api_server + '/rank/0/0/0/' + (page - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//排行榜(周)
app.get('/comic/rank/week', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    superagent.get(api_server + '/rank/0/1/0/' + (page - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//排行榜(月)
app.get('/comic/rank/month', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    superagent.get(api_server + '/rank/0/2/0/' + (page - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//排行榜(月)
app.get('/comic/rank/month', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    superagent.get(api_server + '/rank/0/2/0/' + (page - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//排行榜(总)
app.get('/comic/rank/all', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    superagent.get(api_server + '/rank/0/3/0/' + (page - 1).toString() + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//用户可能喜欢列表
app.get('/user/maybe/:userId/', function (req, res, next) {
    superagent.get(api_server + '/recommend/batchUpdate')
        .query({ 'uid': req.params.userId, 'category_id': '50' })
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//漫画详情
app.get('/comic/info/:id', function (req, res, next) {
    superagent.get(api_server + '/comic/' + req.params.id + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//漫画每话链接
app.get('/comic/chapter/:comicId/:chapterId', function (req, res, next) {
    superagent.get(api_server + '/chapter/' + req.params.comicId + '/' + req.params.chapterId + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//下载
app.get('/comic/download/:comicId/:chapterId', function (req, res, next) {
    res.redirect('http://imgzip.dmzj.com/y/' + req.params.comicId + '/' + req.params.chapterId + '.zip');
});


//======用户
//获取用户订阅
app.get('/user/subscribe/:userId/:subscribe_type', function (req, res, next) {
    var page = 1;
    if (req.query.page !== undefined && req.query.page > 0) {
        page = req.query.page;
    }
    var url = '';
    if (req.query.sort == 'time') {
        url = api_server + '/UCenter/subscribe/?sub_type=1&letter=all&uid=' + req.params.userId + '&page=' + (page - 1).toString();
        var subscribe_type = req.params.subscribe_type.replace(/\//g, '');
        if (subscribe_type !== '/') {
            switch (subscribe_type) {
                case 'novel':
                    url += '&type=1';
                    break;
                case 'comic':
                    url += '&type=0';
                    break;
            }
        }
    } else {
        url = api_server + '/subscribe/';
        switch (req.params.subscribe_type) {
            case 'novel':
                url += '1/';
                break;
            case 'comic':
                url += '0/';
                break;
        }
        url += req.params.userId + '/' + (page - 1).toString() + '.json';
    }
    superagent.get(url)
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});
//用户个人信息
app.get('/user/info/:userId', function (req, res, next) {
    superagent.get(api_server + '/UCenter/comics/' + req.params.userId + '.json')
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.append('Content-Type', 'application/json; charset=utf-8');
            res.append('Access-Control-Allow-Origin', '*');
            res.set();
            res.send(sres.text);
        });
});

//======测试用
app.get('/test', function (req, res, next) {
    console.log(req.query);
    superagent.get('https://httpbin.org/get')
        .query(req.query)
        .set('User-Agent', req.header('User-Agent'))
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.set('Access-Control-Allow-Origin', '*');
            res.send(sres.text);
        });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server error:Something broke!');
});
app.listen(process.env.PORT || 3000, function () {
    console.log('app is listening at port 3000');
});