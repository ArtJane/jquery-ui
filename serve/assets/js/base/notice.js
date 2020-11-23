define(['$', 'group', 'notice'], function ($) {

    var config = `
<pre>
    $(element).notice({
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

            title: '信息提示',

            headingBtns: [
                {
                    text: '信息',
                    click: function () {
                        $('<div>').notice({
                            type: 'info',
                            title: '信息',
                            content: '我是内容~'
                        });
                    }
                },
                {
                    text: '成功',
                    click: function () {
                        $('<div>').notice({
                            type: 'success',
                            title: '成功',
                            content: '我是内容~'
                        });
                    }
                },
                {
                    text: '警告',
                    click: function () {
                        $('<div>').notice({
                            type: 'warning',
                            title: '警告',
                            content: '我是内容~'
                        });
                    }
                },
                {
                    text: '失败',
                    click: function () {
                        $('<div>').notice({
                            type: 'danger',
                            title: '失败',
                            content: '我是内容~'
                        });
                    }
                },
                {
                    text: '弹出多个',
                    click: function () {
                        var count = 4;
                        var interval = setInterval(function () {
                            count--;
                            if(count < 0){
                                clearInterval(interval);
                            }else{
                                $('<div>').notice({
                                    type: 'success',
                                    title: '成功',
                                    content: '我是内容~'
                                });
                            }
                        }, 500);
                    }
                }
            ],

            items: [
                {
                    title: 'notice 配置',
                    key: 'config',
                    widget: function (ctx) {
                        return $(ctx.element).html(config);
                    }
                }
            ]
        });
    }
});