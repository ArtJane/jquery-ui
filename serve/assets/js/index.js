define(["jquery", "@widgets/form"], function($) {

    return function($article, ctx) {
        $article.form({
            items: [{
                    row: ["col-md-4/col-md-8"],
                    tag: "input",
                    type: "text",
                    label: "aaa"
                },
                [{

                        row: ["col-md-4/col-md-8"],
                        tag: "input",
                        type: "text",
                        label: "aaa"
                    },
                    {
                        /* row: ["col-md-4/col-md-8"], */
                        label: "aaa",
                        items: [{
                                tag: "input",
                                type: "text"
                            },
                            {
                                tag: "input",
                                type: "text"
                            }
                        ]
                    },
                    {
                        row: ["col-md-4/col-md-8"],
                        tag: "input",
                        type: "text",
                        label: "aaa"
                    }
                ],
                {
                    tag: "input",
                    type: "text",
                    label: "aaa"
                },
                {
                    tag: "input",
                    type: "text",
                    label: "aaa"
                },
                {
                    tag: "span",
                    text: "",
                    row: ["col-md-4/col-md-8"],
                    items: [{
                        col: "col-md-1",
                        tag: "button",
                        type: "submit",
                        text: "aaa",
                        clas: "btn btn-primary btn-block"
                    }, {
                        col: "col-md-1",
                        tag: "button",
                        type: "reset",
                        text: "bbb",
                        clas: "btn btn-primary  btn-block"
                    }]
                }
            ]
        });
    }
});