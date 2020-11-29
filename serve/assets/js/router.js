define(['$', 'page'], function ($, page) {

    function loadArticle(article, ctx){
        $('.layout-article').ready(function () {
            var $article = $(this).empty();
            $.each($article.data(), function(key, value){
                if(/^ui[A-Z]+/.test(key)){
                    $article[value.widgetName]('destroy');
                }
            });
            require([article], function (callback){
                $(window).scrollTop(0);
                callback({
                    router: ctx,
                    element: $article[0]
                });
            });
        });
    }

    page('/', function (ctx){
        loadArticle('index', ctx);
    });

    page('/dialogs/config', function (ctx){
        loadArticle('dialogs/config', ctx);
    });

    page('/dialogs/sm', function (ctx){
        loadArticle('dialogs/sm', ctx);
    });

    page('/dialogs/md', function (ctx){
        loadArticle('dialogs/md', ctx);
    });

    page('/dialogs/lg', function (ctx){
        loadArticle('dialogs/lg', ctx);
    });

    page('/dialogs/centered', function (ctx){
        loadArticle('dialogs/centered', ctx);
    });

    page('/dialogs/closable', function (ctx){
        loadArticle('dialogs/closable', ctx);
    });

    page('/dialogs/fade', function (ctx){
        loadArticle('dialogs/fade', ctx);
    });

    page('/notices/config', function (ctx){
        loadArticle('notices/config', ctx);
    });

    page('/notices/info', function (ctx){
        loadArticle('notices/info', ctx);
    });

    page('/notices/success', function (ctx){
        loadArticle('notices/success', ctx);
    });

    page('/notices/warning', function (ctx){
        loadArticle('notices/warning', ctx);
    });

    page('/notices/danger', function (ctx){
        loadArticle('notices/danger', ctx);
    });

    page('/notices/many', function (ctx){
        loadArticle('notices/many', ctx);
    });

    page('/tables/config', function (ctx){
        loadArticle('tables/config', ctx);
    });

    page('/tables/base', function (ctx){
        loadArticle('tables/base', ctx);
    });

    page('/tables/columns', function (ctx){
        loadArticle('tables/columns', ctx);
    });

    page('/tables/source', function (ctx){
        loadArticle('tables/source', ctx);
    });

    page('/tables/paging', function (ctx){
        loadArticle('tables/paging', ctx);
    });

    page('/tables/action', function (ctx){
        loadArticle('tables/action', ctx);
    });

    page('/tables/select', function (ctx){
        loadArticle('tables/select', ctx);
    });

    page({
        hashbang: true
    });

});