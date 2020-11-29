define(['$', 'group', 'notice'], function ($) {

    var config = `
<pre>
    var count = 5;
    var interval = setInterval(function () {        
        count--;
        if(count < 1){
            clearInterval(interval);
        }else{
            $('&lt;div&gt;').notice({
                type: 'success',
                title: '成功 - ' + count,
                content: '我是内容~'
            });
        }
    }, 500);
</pre>
    `;

    return function (ctx) {

        $(ctx.element).group({

            title: '信息提示 / 弹出多个',

            headingBtns: [
                {
                    text: '弹出多个',
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