define(['$', 'heading'], function($){

    $.widget('ui.group', {

        templates: {

            main: '\
                {{if $data.title || ($data.headingBtns && $data.headingBtns.length)}}\
                    <div class="heading"></div>\
                {{/if}}\
                <div class="body">\
                    <div class="items"></div>\
                    {{if $data.footingBtns && $data.footingBtns.length}}\
                        <div class="footing">\
                            {{tmpl(footingBtns) "btn"}}\
                        </div>\
                    {{/if}}\
                </div>',

            item: '\
                <div class="item {{key}}">\
                    {{if title}}<h5>{{title}}</h5>{{/if}}\
                    <div class="widget"></div>\
                </div>',

            btn: '\
                <a href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" class="action {{if classes}}{{classes}}{{else}}btn btn-default{{/if}}" {{if target}}target="{{target}}"{{/if}}>\
                    {{if icon}}<i class="{{icon}}"></i>{{/if}}{{text}}\
                </a>'

        },

        options: {

            title: '',

    	    headingBtns: [],

            source: {},

            items: [],

            footingBtns: [],

            mounted: $.noop
        },

        _create: function() {
            this._addClass(this.widgetFullName);
            this._on({
            	'click footing > a.action': '_clickAction'
            });
        },

        _init: function () {            
            var that = this;
            var o = this.options;

            this._getSource(function(ctx) {
                $.extend(o, ctx);

                that.element.html(that._tmpl('main', this.options));
                that.heading = that.element.find('.heading');
                that.items = that.element.find('.items');

                if(that.heading.length){
                    that._setHeading();
                }

                that._setItems();                
            });
        },

        _getSource(next) {
            var o = this.options;

            if ($.isFunction(o.source)) {
                o._source = o.source;
            }

            if (o._source) {                
                o._source.call(this.element[0], {
                    source: {}
                }, next);
            } else {
                next({
                    source: o.source
                });
            }
        },

        _setHeading: function () {
            var that = this;
            var o = this.options;
            this.heading.heading({
                title: o.title,
                btns: $.map(o.headingBtns, function (item) {
                    var origClick;
                    if(item.click){
                        origClick = item.click;
                        item.click = function (event, ctx) {
                            origClick.call(that.element[0], event, {
                                source: o.source,
                                widgets: that._widgets
                            });
                        };
                    }
                    return item;
                })
            });
        },        

        _setItems: function(){
            var that = this;
            var o = this.options;
            var widgets = this._widgets = {};

            this.itemsDefs = [];

            $.each(o.items, function(i, item){                
                var tmpl, dfd;

                if($.isFunction(item.widget)){
                    item.key = item.key || 'key' + that.uuid;
                    widgets[item.key] = item.widget.call(that.element[0], {
                        source: o.source,
                        element: that._tmpl('item', item).appendTo(that.items).find('div.widget')[0]
                    });
                }
                else{
                    if(!$.ui[item.widget]){
                        return;
                    }

                    dfd = $.Deferred();
                    that.itemsDefs.push(dfd);
                    tmpl = that._tmpl('item', item);

                    if($.isFunction(item.options)){
                        item.options = item.options.call(that.element[0], {
                            source: o.source
                        });
                    }
                    item.key = item.key || 'key' + that.uuid;
                    widgets[item.key] = tmpl.appendTo(that.items)
                        .find('div.widget')[item.widget]($.extend(item.options, {
                            mounted: function () {
                                dfd.resolve();
                            }
                        }));
                }
            });

            $.when.apply($, this.itemsDefs).done(function () {
                that._trigger('mounted', null, {
                    source: o.source,
                    widgets: that._widgets
                });
            });
        },

        _clickAction: function(event, ctx){
			if($.isFunction(ctx.data.click)){
                ctx.data.click.call(this.element[0], event, {
                    source: this.options.source,
                    widgets: that._widgets
                });
                return false;
            }			
        }

    });

});