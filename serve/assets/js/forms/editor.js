define(['$', 'group', 'form'], function ($) {

    var config = `
<pre>
    $('&lt;div&gt;').form({
        items: [
            {
                tag: "textarea",
                tinymce: {},
                rows: 25,
                value: "abc"                
            }
        ]
    });
</pre>
    `;

    return function (ctx) {

        $(ctx.element).group({

            title: '表单 / 富文本',

            items: [
                {
                    title: '富文本',
                    key: 'base',
                    widget: function (ctx) {
                        return $(ctx.element).html(config);
                    }
                },
                {
                    title: '示例',
                    key: 'demo',
                    widget: function (ctx) {
                        eval(
                            config
                                .replace(/<pre>|<\/pre>/g, '')
                                .replace(/\$\('&lt;div&gt;'\)/g, '$(ctx.element)')
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>')
                        );
                    }
                }
            ]
        });
    }
});