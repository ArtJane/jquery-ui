define(['$', 'group', 'dialog'], function ($) {

    var config = `
<pre>
    $('&lt;div&gt;').dialog({
        title: '标题', //标题，缺省值：'' 
        content: '我是内容~', //内容，缺省值：''                
        closable: true, //显示右上角关闭按钮，缺省值：true                        
        backdrop: true, //点击背景关闭，缺省值：true                         
        keyboard: true, //按Ecs键关闭，缺省值：true
        fade: true, //渐入渐出效果，缺省值：true                         
        centered: true, //弹出垂直居中，缺省值：false                        
        size: '', //弹框尺寸，缺省值：''，可选值：'sm'|''|'lg'
        btns: [ //按钮组，缺省值：[]
            {
                icon: 'glyphicon glyphicon-ok-sign', //图标，缺省值：''
                text: '确定', //文本，缺省值：''
                classes: 'btn btn-primary', //样式，缺省值：'btn btn-default'
                href: '/', //跳转地址，缺省值：'javascript:;'
                target: '_blank', //跳转打开方式，缺省值：'_self'
                click: function(){ //点击事件
                    ...
                    $(this).dialog('close'); //关闭dialog
                }
            },
            ...
        ]
    });
</pre>
    `;

    return function (ctx) {

        $(ctx.element).group({

            title: '对话框 / 配置',

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