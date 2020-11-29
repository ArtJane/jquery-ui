define(['$', 'group', 'dialog'], function ($) {

    var config = `
<pre>
    $('&lt;div&gt;').dialog({
        title: '标题',
        content: '我是内容~', 
        centered: true,       
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

            title: '对话框 / 垂直居中',

            headingBtns: [
                {
                    text: '垂直居中',
                    click: function () {
                        eval(config.replace(/<pre>|<\/pre>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
                    }
                }
            ],

            items: [
                {
                    title: '垂直居中',
                    key: 'config',
                    widget: function (ctx) {
                        return $(ctx.element).html(config);
                    }
                }
            ]
        });
    }
});