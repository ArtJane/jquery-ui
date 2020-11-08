define(["jquery", "@widgets/base", "@widgets/paging"], function($) {

    $.widget("ui.table", $.ui.base, {

        templates: {

            main: /* html */ `
    			<table class="table table-bordered table-striped table-hover">
    				<thead>
    					<tr>{{tmpl(columns) "th"}}</tr>
    				</thead>
    				<tbody>
    					{{if source && source.length}}
    						{{tmpl(source) "tr"}}
    					{{else}}
    						{{tmpl "defaultTr"}}
    					{{/if}}
    				</tbody>
    			</table>
                {{if paging}}<div class="paging"></div>{{/if}}
            `,

            th: /* html */ `
                <th {{if width}}width="{{width}}"{{/if}}>{{html title}}</th>
            `,

            tr: /* html */ `
                <tr>
                	{{each columns}}
                		{{if !$data.skip}}
                            {{if replaceParent}}{{html text}}{{else}}<td>{{html text}}</td>{{/if}}
                		{{/if}}
                	{{/each}}
                </tr>
            `,

            defaultTr: /* html */ `
                <tr><td colspan="{{$data.columns.length}}">暂无可用数据</td></tr>
            `
        },

        options: {

            source: [],

            columns: [],

            pageNumber: 1,

            pageSize: 10,

            checkbox: {
                field: "",
                disabled: function(row) {},
                mode: ""
            },

            action: {
                title: "操作",
                items: [{
                    text: "aaaaaaaa",
                    classes: "",
                    href: "",
                    hide: function(row) {},
                    click: function() {

                    }
                }]
            },

            checkedData: {},

            complete: null
        },

        _create() {
            this._addClass("ui-table");
            this._on({
                "click .checkbox-all": "_clickCheckboxAll",
                "click a.action": "_clickAction",
                "click input[type=checkbox]": "_clickCheckbox",
                "click input[type=radio]": "_clickCheckbox"
            });
        },

        _init() {
            let o = this.options;
            this._getSource(ctx => {
                $.extend(o, ctx);
                this._extendColumns();

                $.each(o.source, (i, row) => {
                    row.columns = this._setColumns(row);
                });

                this.element.html(this._tmpl("main", o));
                this.checkboxAll = this.element.find(".checkbox-all");
                this.tbody = this.element.find("tbody");

                if (o.paging) {
                    this._setPaging();
                }
                if (o.checkbox && o.checkbox.field) {
                    this._setCheckbox();
                }

                this._trigger("complete");
            });
        },

        _getSource(next) {
            let o = this.options;
            if ($.isFunction(o.source)) {
                o._source = o.source;
            }
            if (o._source) {
                o._source.call(this.element[0], {
                    pageNumber: o.pageNumber,
                    pageSize: o.pageSize,
                    total: 0,
                    paging: true,
                    source: []
                }, next);
            } else {
                next({
                    pageNumber: o.pageNumber,
                    pageSize: o.pageSize,
                    total: o.source.length,
                    paging: false,
                    source: o.source
                });
            }
        },

        _extendColumns() {
            let o = this.options;
            let columns = o.columns;

            if ((columns[0].field !== "checkbox") && o.checkbox && o.checkbox.field) {
                if (o.checkbox.mode === "radio") {
                    columns.unshift({
                        title: "",
                        field: "checkbox",
                        render: row => {
                            return `<input type="radio" name="${o.checkbox.field}" value="${row[o.checkbox.field]}">`;
                        }
                    });
                } else {
                    columns.unshift({
                        title: `<input type="checkbox" class="checkbox-all">`,
                        field: "checkbox",
                        render: row => {
                            let disabled = false;
                            if ($.isFunction(o.checkbox.disabled)) {
                                disabled = !!o.checkbox.disabled.call(this.element[0], row);
                            }
                            return `<input type="checkbox" name="${o.checkbox.field}" value="${row[o.checkbox.field]}" ${disabled ? "disabled" : ""}>`;
                        }
                    });
                }
            }

            if ((columns[columns.length - 1].data !== "action") && o.action && o.action.items && o.action.items.length) {
                columns.push({
                    title: "操作",
                    data: "action",
                    render: row => {
                        let ret = "";
                        let classes = "";
                        $.each(o.action.items, (i, item) => {
                            let hide = false;
                            if ($.isFunction(item.hide)) {
                                hide = !!item.hide.call(this.element[0], row);
                            }
                            if (hide) {
                                classes += "d-none ";
                            }
                            classes += item.classes ? `action ${item.classes}` : "action";
                            ret += $("<a>")
                                .attr({
                                    href: $.isFunction(item.url) ? item.url.call(that.element[0], row) : "javascript:;",
                                    class: classes
                                })
                                .html(item.text)
                                .prop("outerHTML");
                        });
                        return ret;
                    }
                });
            }
        },

        _setColumns(row) {
            let columns = $.extend(true, [], this.options.columns);
            $.each(columns, (i, column) => {
                let text = column.field ? (row[column.field] == null ? "" : row[column.field]) : "";
                if ($.isFunction(column.render)) {
                    column.text = column.render.call(this.element[0], row);
                    if (column.text === false) {
                        column.skip = true;
                    } else if (column.text && /^\s*<td\s+/i.test(column.text)) {
                        column.replaceParent = true;
                    }
                } else {
                    column.text = text;
                }
            });
            return columns;
        },

        _setPaging() {
            let o = this.options;
            this.paging = this.element.find(".paging")
                .paging({
                    pageNumber: o.pageNumber,
                    pageSize: o.pageSize,
                    total: o.total,
                    changePageNumber: (e, { pageNumber }) => {
                        o.pageNumber = pageNumber;
                        this._init();
                    },
                    changePageSize: (e, { pageSize }) => {
                        o.pageSize = pageSize;
                        this._init();
                    }
                });
        },

        _setCheckbox() {
            let o = this.options;
            $.each(o.checkedData, key => {
                this.element.find(`input[value=${key}]`).prop("checked", true);
            });
            this._setCheckboxAll();
        },

        _clickCheckbox(e, { data }) {
            let o = this.options;
            let target = $(e.currentTarget);
            if (target.prop("disabled") || target.hasClass("checkbox-all")) {
                return;
            }
            let key = data[o.checkbox.field];
            if (target.prop("checked")) {
                if (!o.checkedData[key]) {
                    o.checkedData[key] = $.extend({}, data);
                    delete o.checkedData[key].columns;
                }
            } else {
                delete o.checkedData[key];
            }
            this._setCheckboxAll();
        },

        _clickCheckboxAll(e) {
            let target = $(e.currentTarget);
            let checkbox = this.tbody.find("input[type=checkbox]");
            if (target.prop("checked")) {
                checkbox.prop("checked", false).click();
            } else {
                checkbox.prop("checked", true).click();
            }
        },

        _setCheckboxAll() {
            let o = this.options;
            if (Object.keys(o.checkedData).length === o.source.length) {
                this.checkboxAll.prop("checked", true);
            } else {
                this.checkboxAll.prop("checked", false);
            }
        },

        _clickAction: function(e) {
            let index = $(e.currentTarget).index();
            $.each(this.options.action.items, (i, item) => {
                if (i == index && $.isFunction(item.click)) {
                    item.click.call(this.element[0], e);
                }
            });
        },

        getCheckedData: function() {
            var rows = [];
            var keys = [];
            $.each(this.options.checkedData, function(key, value) {
                rows.push(value);
                keys.push(key);
            });
            return {
                rows: rows,
                keys: keys
            };
        }

    });

});