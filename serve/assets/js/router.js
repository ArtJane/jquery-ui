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

    page('/dialog', function (ctx){
        loadArticle('base/dialog', ctx);
    });

    page('/notice', function (ctx){
        loadArticle('base/notice', ctx);
    });

    page({
        hashbang: true
    });

});