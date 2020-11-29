define(['$', 'group'], function ($) {

    return function (ctx) {

        $(ctx.element).group({

            title: '概述',

            items: [
                {
                    title: 'JS模块加载与管理',
                    key: 'require',
                    widget: function (ctx) {
                        return $(ctx.element).html(`
                           jQuery-J2UI 使用requirejs库做JS模块的加载与管理。requirejs
                           <a href="https://requirejs.org/" target="_blank"> [ 官网 ] </a>
                           <a href="https://github.com/requirejs/requirejs" target="_blank"> [ github ] </a>                           
                        `);
                    }
                },
                {
                    title: '前端路由',
                    key: 'page',
                    widget: function (ctx) {
                        return $(ctx.element).html(`
                           jQuery-J2UI 使用page.js库做前端路由。page.js
                           <a href="http://visionmedia.github.io/page.js/" target="_blank"> [ 官网 ] </a>
                           <a href="https://github.com/visionmedia/page.js" target="_blank"> [ github ] </a>
                        `);
                    }
                },
                {
                    title: 'JS基础库',
                    key: 'jquery',
                    widget: function (ctx) {
                        return $(ctx.element).html(`
                           jQuery-J2UI 使用jquery库做JS基础库。jquery
                           <a href="https://jquery.com/" target="_blank"> [ 官网 ] </a>
                           <a href="https://github.com/jquery/jquery" target="_blank"> [ github ] </a>
                        `);
                    }
                },
                {
                    title: 'UI库',
                    key: 'bootstrap',
                    widget: function (ctx) {
                        return $(ctx.element).html(`
                           jQuery-J2UI 使用bootstrap3做UI库。bootstrap3
                           <a href="https://getbootstrap.com/docs/3.4/" target="_blank"> [ 官网 ] </a>
                           <a href="https://github.com/twbs/bootstrap/tree/v3.4.1" target="_blank"> [ github ] </a>
                        `);
                    }
                }
            ]

        });
    }
});