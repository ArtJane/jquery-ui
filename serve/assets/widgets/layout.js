define(['$'], function($){

    $.widget('ui.layout', {

        templates: {

            main: '\
                <div class="layout-header">{{tmpl "layoutHeader"}}</div>\
                <div class="layout-body {{laying}}">\
                    <div class="layout-aside">{{tmpl "layoutAside"}}</div>\
                    <div class="layout-article"></div>\
                    <div class="layout-footer">{{tmpl "layoutFooter"}}</div>\
                </div>',

            layoutHeader: '\
                <nav class="navbar navbar-{{theme}}">\
                    <div class="{{laying}}">\
                        {{tmpl "navbarHeader"}}\
                        {{tmpl "navbarCollapse"}}\
                    </div>\
                </nav>',

            navbarHeader: '\
                <div class="navbar-header">\
                    {{tmpl(brand) "navbarBrand"}}\
                    <span class="navbar-toggle collapsed" data-toggle="collapse" data-target="#layout-header-navbar"><i class="glyphicon glyphicon-menu-hamburger"></i></span>\
                    <span class="navbar-switch pull-left"><i class="glyphicon glyphicon-chevron-left"></i></span>\
                </div>',

            navbarBrand: '\
                <div class="navbar-brand">\
                    <a class="icon" href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" {{if target}}target="{{target}}"{{/if}}>\
                        {{if icon}}\
                            <i class="{{icon}}"></i>\
                        {{else img}}\
                            <img src="{{img}}">\
                        {{else}}\
                            <i class="glyphicon glyphicon-home"></i>\
                        {{/if}}\
                    </a>\
                    <span class="text">{{text}}</span>\
                </div>\
            ',

            navbarCollapse: '\
                <div class="collapse navbar-collapse" id="layout-header-navbar">\
                    {{tmpl($data.collapse.left) "navbarType"}}\
                    {{tmpl($data.collapse.right) "navbarType"}}\
                </div>',

            navbarType: '\
                {{if $data.type==="nav"}}\
                    {{tmpl "navbarNav"}}\
                {{else $data.type==="search"}}\
                    {{tmpl "navbarSearch"}}\
                {{else $data.type==="btn"}}\
                    {{tmpl "navbarBtn"}}\
                {{else $data.type==="text"}}\
                    {{tmpl "navbarText"}}\
                {{/if}}',

            navbarNav: '\
                <ul class="nav navbar-nav navbar-{{align}}">\
                    {{tmpl(items) "navbarNavItem"}}\
                </ul>',

            navbarNavItem: '\
                {{if dropdown}}\
                    <li {{if active}}class="active"{{/if}}>\
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">{{if icon}}<i class="{{icon}}"></i>{{/if}} {{text}} <span class="caret"></span></a>\
                        {{if $.isFunction($data.dropdown)}}\
                            <div class="dropdown-menu function"></div>\
                        {{else}}\
                            <ul class="dropdown-menu">\
                                {{tmpl(dropdown) "navbarNavItem"}}\
                            </ul>\
                        {{/if}}\
                    </li>\
                {{else}}\
                    <li class="navbar-item-clickable {{if active}}active{{/if}}">\
                        <a href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" {{if target}}target="{{target}}"{{/if}}>{{if icon}}<i class="{{icon}}"></i>{{/if}} {{text}}</a>\
                    </li>\
                {{/if}}',

            navbarSearch: '\
                <form class="navbar-form navbar-{{align}}">\
                    <div class="input-group">\
                        <input type="text" name="{{if name}}{{name}}{{else}}keyword{{/if}}" class="form-control" placeholder="{{if placeholder}}{{placeholder}}{{else}}搜索...{{/if}}">\
                        <span class="input-group-btn">\
                            <button type="submit" class="{{if classes}}{{classes}}{{else}}btn btn-default{{/if}}">{{$data.text||"搜索"}}</button>\
                        </span>\
                    </div>\
                </form>',

            navbarBtn: '\
                <button type="button" class="navbar-item-clickable navbar-btn navbar-{{align}} {{if classes}}{{classes}}{{else}}btn btn-default{{/if}}">{{text}}</button>',

            navbarText: '\
                <p class="navbar-text navbar-{{align}}">{{html text}}</p>',


            layoutAside: '\
                {{tmpl "menu"}}',

            menu: '\
                <ul class="list-group menu">\
                    {{tmpl(menu) "menuItem"}}\
                </ul>',

            menuItem: '\
                {{if menu}}\
                    <li class="list-group-item dropdown">\
                        <a class="" href="javascript:;" data-toggle="dropdown">\
                            {{if icon}}<i class="{{icon}}"></i>{{else}}<i class="glyphicon glyphicon-folder-open"></i>{{/if}}\
                            <span>{{text}}</span>\
                            <i class="glyphicon glyphicon-menu-right"></i>\
                        </a>\
                        <ul class="dropdown-menu">\
                            {{tmpl(menu) "dropdownItem"}}\
                        </ul>\
                    </li>\
                {{else}}\
                    <li class="list-group-item">\
                        <a href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" {{if target}}target="{{target}}"{{/if}}>\
                            {{if icon}}<i class="{{icon}}"></i>{{else}}<i class="glyphicon glyphicon-file"></i>{{/if}}\
                            <span>{{text}}</span>\
                        </a>\
                    </li>\
                {{/if}}',

            dropdownItem: '\
                <li>\
                    <a href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" {{if target}}target="{{target}}"{{/if}}>\
                        <span>{{text}}</span>\
                    </a>\
                </li>',

            layoutFooter: '\
                <div class="container">\
                    <p>{{html footer}}</p>\
                </div>'
        },

        options: {

            theme: 'default',

            laying: 'container-fluid',

            brand: {},

            source: {},

            collapse: {},

            menu: [],

            footer: ''
        },

        _create: function(){
            this._addClass('ui-layout');
        },

        _init: function(){
            var that = this;
            var o = this.options;

            this._getSource(function(ctx) {

                $.extend(o, ctx);

                that._setCollapse();

                that._setMenu();

                that.element.html(that._tmpl('main', that.options));

                that._getElements();

                that._setPlugs();

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
                    source: {}
                }, next);
            } else {
                next({
                    source: o.source
                });
            }
        },

        _setCollapse: function(){
            var o = this.options;

            if($.isFunction(o.collapse)){
                o.collapse = o.collapse.call(this.element[0], {
                    source: o.source
                });
            }

            if(o.collapse.left){
                $.each(o.collapse.left, function(i, item){
                    item.align = 'left';
                });
            }
            if(o.collapse.right){
                $.each(o.collapse.right, function(i, item){
                    item.align = 'right';
                });
            }
        },

        _setMenu: function(){
            var o = this.options;

            if($.isFunction(o.menu)){
                o.menu = o.menu.call(this.element[0], {
                    source: o.source
                });
            }
        },

        _getElements: function(){
            this.header = this.element.find('.layout-header');
            this.body = this.element.find('.layout-body');
            this.aside = this.body.find('.layout-aside');
            this.article = this.body.find('.layout-article');
            this.bar = this.body.find('.layout-bar');
            this.brand = this.header.find('.navbar-brand');
            this.navbarCollapse = this.header.find('.navbar-collapse');

            this._bindEvents();
        },

        _bindEvents: function(){
            var that = this;

            this._on(this.header, {
                'click .navbar-switch.pull-left': '_clickSwitchleft',
                'click .navbar-switch.pull-right': '_clickSwitchright',
                'click .navbar-toggle.collapsed': '_clickNavbartoggle',
                'click .navbar-item-clickable': '_clickNavItemClickable',
                'click button[type=submit]': '_submitForm'
            });

            this._on(this.aside.find('> .menu'), {
                'click .navbar-switch.pull-left': '_clickSwitchleft',
                'click .navbar-switch.pull-right': '_clickSwitchright',
                'click .navbar-toggle.collapsed': '_clickNavbartoggle'
            });

            this.aside
                .on('show.bs.collapse', '.menu', function (event) {
                    var target = $(event.target);
                    if(target.css('position') === 'absolute'){
                        return false;
                    }
                    that.aside.find(target).parent().addClass('open');
                    that.aside.find('.menu.collapse.in').not(event.target).collapse('hide');
                })
                .on('hide.bs.collapse', '.menu', function(event){
                    var target = $(event.target);
                    if(target.css('position') === 'absolute'){
                        return false;
                    }
                    that.aside.find(target).parent().removeClass('open');
                });
        },

        _setPlugs: function(){
            var that = this;

            /*this.element.find(".list-group-item.sub-menu").each(function (i, item) {
                var data = that._tmplItem(item).data;
                $(item).popover({
                    trigger: 'focus',
                    container: 'body',
                    html: true,
                    content: that._tmpl('menu', data)
                });
            });
*/
            this.element.find(".dropdown-menu.function").each(function(i, item){
                var data = that._tmplItem(item).data;
                data.dropdown.call(that.element[0], {
                    element: item,
                    source: that.options.source,
                    item: data
                });
            });

            this.bar.find(".tab-pane.function").each(function (i, item) {
                var data = that._tmplItem(item).data;
                data.content.call(that.element[0], {
                    element: item,
                    source: that.options.source,
                    item: data
                });
            });
        },

        _clickSwitchleft: function(){
            this._hideNavbarCollapse();

            if (this.brand.hasClass('min')) {
                this.brand.removeClass('min').closest('.navbar').removeClass('min');
                this.body.removeClass('transform');
                this.aside.addClass('extend');
            } else {
                this.brand.addClass('min').closest('.navbar').addClass('min');
                this.body.addClass('transform');
                this.aside.removeClass('extend');
                this._hideBar();
            }
        },

        _clickSwitchright: function(){
            this._hideNavbarCollapse();
            this.bar.toggleClass('extend');
            if(this.bar.hasClass('extend')){
                this._hideAside();
            }
        },

        _clickNavbartoggle: function(){
            this._hideAside();
            this._hideBar();
        },

        _clickNavItemClickable: function(event, ctx){
			if($.isFunction(ctx.data.click)){
                ctx.data.click.call(this.element[0], event, {
                    source: this.options.source,
                    item: ctx.data
                });
                return false;
            }
        },

        _clickBarTab: function(event, ctx){
            if($.isFunction(ctx.data.click)){
                ctx.data.click.call(this.element[0], event, {
                    source: this.options.source,
                    item: ctx.data,
                    element: this.bar.find('.tab-pane')[ctx.index]
                });
                return false;
            }
        },

        _submitForm: function(event, ctx){
            var form;
            event.preventDefault();
            form = $(event.currentTarget).closest('form').serializeJSON();

            if($.isFunction(ctx.data.btn.click)){
                ctx.data.btn.click.call(this.element[0], event, {
                    source: this.options.source,
                    item: ctx.data,
                    form: form
                });
            }
        },

        _hideNavbarCollapse: function(){
            if (this.navbarCollapse.hasClass('in')) {
                this.navbarCollapse.collapse('hide');
            }
        },

        _hideAside: function(){
            if (this.body.hasClass('transform')) {
                this.header.find('.navbar-switch.pull-left').trigger('click');
            }
        },

        _hideBar: function() {
            if (this.bar.hasClass('extend')) {
                this.header.find('.navbar-switch.pull-right').trigger('click');
            }
        }
    });
});