define(['$', 'group', 'table'], function ($) {

    var config = `
<pre>
    $('&lt;div&gt;').table({
        source: function(ctx, next){
            $.ajax({
                url: '/get/data',
                method: 'GET',
                success: function(res){
                    /*
                    res = {
                        code: 0,
                        message: '',
                        data: [
                            {id: 1, name: '张三', age: 18, job: 'JAVA工程师'},
                            {id: 2, name: '李四', age: 20, job: '产品经理'},
                            {id: 3, name: '王五', age: 22, job: '测试工程师'}
                        ]
                    };
                    */
                    //给ctx.source赋值
                    ctx.source = res.data;
                    //执行下一步，并把ctx作为参数传入
                    next(ctx);
                }                
            });            
        },
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

            title: '表格 / 动态数据',

            items: [
                {
                    title: '动态数据',
                    key: 'base',
                    widget: function (ctx) {
                        return $(ctx.element).html(config);
                    }
                },
                {
                    title: '示例',
                    key: 'demo',
                    widget: function (ctx) {
                        $(ctx.element).table({
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
                    }
                }
            ]
        });
    }
});