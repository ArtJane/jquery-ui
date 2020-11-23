define(['$', 'heading'], function($){

    $.widget('ui.detailPage', {

        templates: {

            main: '\
                {{if $data.title || ($data.headingBtns && $data.headingBtns.length)}}\
                    <div class="heading"></div>\
                {{/if}}\
                <div class="body">\
                    <div class="container-fluid">\
                        <div class="row">\
                            <div class="col-lg-1 col-md-2 col-sm-3">\
                                {{if $data.tabs && $data.tabs.length}}\
                                    <ul class="nav nav-pills nav-stacked" style="position: fixed; top: 119px;">\
                                        {{tmpl(tabs) "tab"}}\
                                    </ul>\
                                {{/if}}\
                            </div>\
                            <div class="col-lg-11 col-md-10 col-sm-9">\
                                <div class="items"></div>\
                            </div>\
                        </div>\
                    </div>\
                    {{if $data.footingBtns && $data.footingBtns.length}}\
                        <div class="footing">\
                            {{tmpl(footingBtns) "btn"}}\
                        </div>\
                    {{/if}}\
                </div>',

            tab: '\
                <li {{if active}}class="active"{{/if}}><a href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" {{if target}}target="{{target}}"{{/if}}>{{text}}</a></li>',

            item: '\
                <div id="{{key}}" class="item {{key}}">\
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

            headingBtns: null,
            
            tabs: null,

            source: null,

            items: null,

            footingBtns: null,

            mounted: null
        },

        _create: function() {
            this._addClass('ui-detailPage');

            this._on({
                'click .nav-pills>li': '_clickPill',
                'click footing > a.action': '_clickAction'
            });

            this._on(this.window, {
                "scroll": function(event){
                    var that = this;
                    if(!this.idMap){
                        this._createIdMap();
                    }
                    var top = this.window.scrollTop();
                    this.nav.css('top', top >= 50 ? 69 : 119);
                    $.each(this.idMap, function(key, value){
                        if(top + 200 > value){
                            that.nav
                                .find('[href="' + key + '"]').parent()
                                .siblings(".active").removeClass("active").end()
                                .addClass("active");
                        }else{
                            return false;
                        }
                    });
                }
            });
        },

        _init: function() {
            var that = this;
            var o = this.options;

            this._getSource(function(ctx) {
                $.extend(o, ctx);

                that.element.html(that._tmpl('main', this.options));
                that.heading = that.element.find('.heading');
                that.items = that.element.find('.items');
                that.nav = that.element.find('.nav-stacked');

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
                    source: []
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

                if(!$.ui[item.widget]){
                    return;
                }

                dfd = $.Deferred();
                that.itemsDefs.push(dfd);
                tmpl = that._tmpl('item', item);

                if($.isFunction(item.options)){
                    item.options = item.options.call(that.element[0], o.source);
                }
                item.key = item.key || 'key' + that.uuid;
                widgets[item.id] = tmpl.appendTo(that.items)
                    .find('div.widget')[item.widget]($.extend(item.options, {
                        mounted: function () {
                            dfd.resolve();
                        }
                    }));
            });

            $.when.apply($, this.itemsDefs).done(function () {
                that._trigger('mounted', null, {
                    source: o.source,
                    widgets: that._widgets
                });
            });
        },

        _createIdMap: function(){
            var idMap = this.idMap = {};
            $.each(this.options.tabs, function(i, item){
                var offset = $(item.href).offset();
                if(offset){
                    idMap[item.href] = offset.top;
                }
            });
        },

        _clickPill: function (event) {
            if(!this.idMap){
                this._createIdMap();
            }
            var target = $(event.currentTarget);
            var data = this._tmplItem(target).data;
            target
                .siblings(".active").removeClass("active").end()
                .addClass("active");
            this.window.scrollTop(this.idMap[data.href]);
            return false;
        },

        _clickAction: function(event, ctx){
			if($.isFunction(ctx.data.click)){
                ctx.data.click.call(this.element[0], event, {
                    source: this.options.source,
                    widgets: this._widgets
                });
                return false;
            }			
        }

    });

});