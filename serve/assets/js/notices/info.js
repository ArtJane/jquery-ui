define(['$', 'group', 'notice'], function ($) {

    var config = `
<pre>
    $('&lt;div&gt;').notice({
        type: 'info',
        title: '标题',
        content: '我是内容~',        
        closed: function(){
            console.log('notice 关闭了~');
        }
    });
</pre>
    `;

    return function (ctx) {

        $(ctx.element).group({

            title: '信息提示 / 信息',

            headingBtns: [
                {
                    text: '信息',
                    click: function () {
                        eval(config.replace(/<pre>|<\/pre>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
                    }
                }
            ],

            items: [
                {
                    title: '配置',
                    key: 'config',
                    widget: function (ctx) {
                        return $(ctx.element).html(config);
                    }
                }
            ]
        });
    }
});