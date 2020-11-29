define(['$', 'group', 'notice'], function ($) {

    var config = `
<pre>
    $('&lt;div&gt;').notice({
        type: 'info', //信息类型，缺省值：'info'，可选值：'success'｜'info'｜'warning'|'danger'
        title: '标题', //标题，缺省值：'' 
        content: '我是内容~', //内容，缺省值：''
        fade: true, //渐入渐出效果，缺省值：true
        timeout: 3000, //关闭延时，单位毫秒，缺省值：3000
        closed: function(){ //关闭后回调
            console.log('notice 关闭了~');
        }
    });
</pre>
    `;

    return function (ctx) {

        $(ctx.element).group({

            title: '信息提示 / 配置',

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