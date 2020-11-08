define(["jquery", "page", "@widgets/layout"], function($, page){

    $(".layout").layout({
        menu: [
            {text: "home", href: "/"},
            {text: "menu", menu: [
                    {text: "item1", href: "/item1"},
                    {text: "item2", href: "/item2"},
                    {text: "item1", href: "/item1"},
                    {text: "item2", href: "/item2"}
                ]
            },
            {text: "menu", menu: [
                    {text: "item1", href: "/item1"},
                    {text: "item2", href: "/item2"},
                    {text: "item1", href: "/item1"},
                    {text: "item2", href: "/item2"}
                ]
            }
        ]
    });

    function loadArticle(article, ctx){
        var $article = $(".article").empty();
        $.each($article.data(), function(key, value){
            if(/^ui[A-Z]+/.test(key)){
                $article[value.widgetName]("destroy");
            }
        });
        require([article], function (callback){
            $(window).scrollTop(0);
            callback($article, ctx);
        });
    }

    page("/", function (ctx){
        loadArticle("index", ctx);
    });

    page();

});