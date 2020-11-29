define(['$', 'group', 'dialog'], function ($) {

    var config = `
<pre>
    $('&lt;div&gt;').dialog({
        title: '标题',
        content: '我是内容~',        
        btns: [
            {
                text: '取消',
                click: function(){
                    $(this).dialog('close');
                }
            },
            {
                text: '确定',
                classes: 'btn btn-primary',
                click: function(){
                    $(this).dialog('close');
                }
            }            
        ]
    });
</pre>
    `;

    return function (ctx) {

        $(ctx.element).group({

            title: '对话框 / 中号',

            headingBtns: [
                {
                    text: '中号',
                    click: function () {
                        eval(config.replace(/<pre>|<\/pre>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
                    }
                }
            ],

            items: [
                {
                    title: '中号',
                    key: 'config',
                    widget: function (ctx) {
                        return $(ctx.element).html(config);
                    }
                }
            ]
        });
    }
});