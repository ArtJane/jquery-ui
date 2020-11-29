define(['$', 'group', 'table'], function ($) {

    var config = `
<pre>
    $('&lt;div&gt;').table({
        source: [
            {id: 1, name: '张三', age: 18, job: 'JAVA工程师'},
            {id: 2, name: '李四', age: 20, job: '产品经理'},
            {id: 3, name: '王五', age: 22, job: '测试工程师'}
        ],
        columns: [
            {
                title: 'ID',
                field: 'id'                
            },
            {
                title: '姓名',
                field: 'name',
                //自定义列内容
                render: function(row){
                    return '&lt;b&gt;' + row.name + '&lt;b&gt;';
                }
            },
            {
                title: '年龄',
                field: 'age'                
            },
            {
                title: '职业',
                field: 'job'                
            },
            //添加自定义列
            {
                title: '描述',
                render: function(row){
                    return row.name + '很懒，什么也没留下~'
                }
            }
        ]
    });
</pre>
    `;

    return function (ctx) {

        $(ctx.element).group({

            title: '表格 / 列渲染',

            items: [
                {
                    title: '列渲染',
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