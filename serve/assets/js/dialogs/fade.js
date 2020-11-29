define(['$', 'group', 'dialog'], function ($) {

    var config = `
<pre>
    $('&lt;div&gt;').dialog({
        title: '标题',
        content: '我是内容~', 
        fade: false,       
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

            title: '对话框 / 禁用效果',

            headingBtns: [
                {
                    text: '禁用效果',
                    click: function () {
                        eval(config.replace(/<pre>|<\/pre>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
                    }
                }
            ],

            items: [
                {
                    title: '禁用效果',
                    key: 'config',
                    widget: function (ctx) {
                        return $(ctx.element).html(config);
                    }
                }
            ]
        });
    }
});