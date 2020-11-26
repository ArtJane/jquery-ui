define(['$', 'group', 'table', 'notice'], function ($) {

    var base = `
<pre>
    $(element).table({
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
                field: 'name'                
            },
            {
                title: '年龄',
                field: 'age'                
            },
            {
                title: '职业',
                field: 'job'                
            }
        ]
    });
</pre>
    `;

    return function (ctx) {

        $(ctx.element).group({

            title: '表格',

            headingBtns: [],

            items: [
                {
                    title: 'table 基本配置',
                    key: 'base',
                    widget: function (ctx) {
                        return $(ctx.element).html(base);
                    }
                },
                {
                    title: '示例',
                    key: 'base-demo',
                    widget: function (ctx) {
                        var element = ctx.element;
                        eval(base.replace(/<pre>|<\/pre>/g, ''));
                    }
                }
            ]
        });
    }
});