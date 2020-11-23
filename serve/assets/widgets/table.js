define(['$', 'paging'], function ($) {

    $.widget('ui.table', {

        templates: {

            main: '\
    			<table class="table table-bordered table-striped table-hover">\
    				<thead>\
    					<tr>{{tmpl(columns) "th"}}</tr>\
    				</thead>\
    				<tbody>\
    					{{if $data.source && $data.source.length}}\
    						{{tmpl(source) "tr"}}\
    					{{else}}\
    						{{tmpl "defaultTr"}}\
    					{{/if}}\
    				</tbody>\
    			</table>\
    			{{if paging}}<div class="paging"></div>{{/if}}',

            th: '\
                <th {{if width}}width="{{width}}"{{/if}}>{{html title}}</th>',

            tr: '\
                <tr>\
                	{{each columns}}\
                		{{if !$data.skip}}\
                            {{if replaceParent}}{{html text}}{{else}}<td>{{html text}}</td>{{/if}}\
                		{{/if}}\
                	{{/each}}\
                </tr>',

            defaultTr: '\
    			<tr><td colspan="{{$data.columns.length}}">暂无可用数据</td></tr>'

        },
        
        options: {
            
            source: [],

            columns: [],

            pageNumber: 1,

            pageSize: 10,

            checkbox: {},

            action: {},

            checkedData: {},

            mounted: $.noop
        },

        _create: function () {
            this._addClass(this.widgetFullName);
            this._on({
                'click .checkbox-all': '_clickCheckboxAll',
                'click a.action': '_clickAction',
                'click input[type=checkbox]': '_clickCheckbox',
                'click input[type=radio]': '_clickCheckbox'
            });
        },

        _init: function () {            
            var that = this;
            var o = this.options;

            this._getSource(function(ctx) {

                $.extend(o, ctx);

                if(o.columns.length){
                    that._extendColumns();
                }                

                $.each(o.source, function(i, row){
                    row.columns = that._setColumns(row);
                });

                that.element.html(that._tmpl('main', o));
                that.checkboxAll = that.element.find('.checkbox-all');
                that.tbody = that.element.find('tbody');

                if (o.paging) {
                    that._setPaging();
                }
                if (o.checkbox && o.checkbox.field) {
                    that._setCheckbox();
                }

                that._trigger('mounted', null, {
                    source: o.source
                });
            });
        },

        _getSource(next) {
            var o = this.options;

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
                o.source = o.source || [];
                next({
                    pageNumber: o.pageNumber,
                    pageSize: o.pageSize,
                    total: o.source.length,
                    paging: false,
                    source: o.source
                });
            }
        },

        _extendColumns: function () {
            var that = this;
            var o = this.options;
            var columns = o.columns;            

            if ((columns[0].field !== 'checkbox') && o.checkbox && o.checkbox.field) {
                if (o.checkbox.mode === 'radio') {
                    columns.unshift({
                        title: '',
                        field: 'checkbox',
                        render: function(row){
                            return '<input type="radio" name="' + o.checkbox.field + '" value="' + row[o.checkbox.field] + '">';
                        }
                    });
                } else {
                    columns.unshift({
                        title: '<input type="checkbox" class="checkbox-all">',
                        field: 'checkbox',
                        render: function(row){
                            var disabled = o.checkbox.disabled;
                            if ($.isFunction(disabled)) {
                                disabled = !!disabled.call(that.element[0], row);
                            }
                            return '<input type="checkbox" name="' + o.checkbox.field + '" value="' + row[o.checkbox.field] + '" ' + (disabled ? 'disabled' : '') + '>';
                        }
                    });
                }
            }

            if ((columns[columns.length - 1].data !== 'action') && o.action && o.action.items && o.action.items.length) {
                columns.push({
                    title: o.action.title || '操作',
                    data: 'action',
                    render: function(row){
                        var ret = '';
                        $.each(o.action.items, function(i, item){
                            var hide = false;
                            var classes = '';
                            if ($.isFunction(item.hide)) {
                                hide = !!item.hide.call(that.element[0], row);
                            }
                            if (hide) {
                                classes += 'hidden ';
                            }
                            classes += item.classes ? ('action ' + item.classes) : 'action';
                            ret += $('<a>')
                                .attr({
                                    href: $.isFunction(item.href) ? item.href.call(that.element[0], row) : (item.href || 'javascript:;'),
                                    class: classes,
                                    target: item.target
                                })
                                .html(item.text)
                                .prop('outerHTML');
                        });
                        return ret;
                    }
                });
            }
        },

        _setColumns: function(row) {
            var that = this;
            var columns = $.extend(true, [], this.options.columns);
            $.each(columns, function(i, column){
                var text = column.field ? (row[column.field] == null ? '' : row[column.field]) : "";
                if ($.isFunction(column.render)) {
                    column.text = column.render.call(that.element[0], row);
                    if (column.text === false) {
                        column.skip = true;
                    } else if (/^\s*<td\s+/i.test(column.text)) {
                        column.replaceParent = true;
                    }
                } else {
                    column.text = text;
                }
            });
            return columns;
        },

        _setPaging: function() {
            var that = this;
            var o = this.options;

            this.paging = this.element.find('.paging')
                .paging({
                    pageNumber: o.pageNumber,
                    pageSize: o.pageSize,
                    pageSizeList: o.pageSizeList,
                    total: o.total,
                    changePageNumber: function(e, ctx){
                        o.pageNumber = ctx.pageNumber;
                        that._init();
                    },
                    changePageSize: function(e, ctx){
                        o.pageSize = ctx.pageSize;
                        that._init();
                    }
                });
        },

        _setCheckbox: function() {
            var that = this;
            var o = this.options;
            $.each(o.checkedData, function(key){
                that.element.find('input[value=' + key + ']').prop('checked', true);
            });
            this._setCheckboxAll();
        },

        _clickCheckbox: function(e, ctx) {
            var o = this.options;            
            var target = $(e.currentTarget);
            o.checkedData = o.checkedData || {};

            if (target.prop('disabled') || target.hasClass('checkbox-all')) {
                return;
            }
            let key = ctx.data[o.checkbox.field];
            if (target.prop('checked')) {
                if (!o.checkedData[key]) {
                    o.checkedData[key] = $.extend({}, ctx.data);
                    delete o.checkedData[key].columns;
                }
            } else {
                delete o.checkedData[key];
            }
            this._setCheckboxAll();
        },

        _clickCheckboxAll: function(e) {
            var target = $(e.currentTarget);
            var checkbox = this.tbody.find('input[type=checkbox]');
            if (target.prop('checked')) {
                checkbox.prop('checked', false).click();
            } else {
                checkbox.prop('checked', true).click();
            }
        },

        _setCheckboxAll: function() {
            var o = this.options;
            if (Object.keys(o.checkedData).length === o.source.length) {
                this.checkboxAll.prop('checked', true);
            } else {
                this.checkboxAll.prop('checked', false);
            }
        },

        _clickAction: function(event) {
            var that = this;
            var index = $(event.currentTarget).index();
            $.each(this.options.action.items, function(i, item){
                if (i == index && $.isFunction(item.click)) {
                    item.click.call(that.element[0], event);
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