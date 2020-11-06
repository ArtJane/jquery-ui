define(["jquery", "@widgets/title"], function ($){

    return function ($article, ctx) {
        $article.title({
            title: "title"
        });
    }
});