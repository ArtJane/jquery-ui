define(['$'], function($){

    $.widget('ui.layout', {        

        templates: {

            main: '\
                <div class="layout-header">{{tmpl "layoutHeader"}}</div>\
                <div class="layout-body">\
                    <div class="layout-aside">{{tmpl "layoutAside"}}</div>\
                    <div class="layout-article"></div>\
                    {{if bar}}\
                        <div class="layout-bar">{{tmpl "layoutBar"}}</div>\
                    {{/if}}\
                    <div class="layout-footer">{{tmpl "layoutFooter"}}</div>\
                </div>',

            layoutHeader: '\
                <nav class="navbar navbar-primary {{if bar}}bar{{/if}}">\
                    {{tmpl "navbarHeader"}}\
                    {{tmpl "navbarCollapse"}}\
                </nav>',

            navbarHeader: '\
                <div class="navbar-header">\
                    {{tmpl(brand) "navbarBrand"}}\
                    {{if bar}}\
                        <span class="navbar-switch pull-right"><i class="glyphicon glyphicon-cog"></i></span>\
                    {{/if}}\
                    <span class="navbar-toggle collapsed" data-toggle="collapse" data-target="#layout-header-navbar"><i class="glyphicon glyphicon-menu-hamburger"></i></span>\
                    <span class="navbar-switch pull-left"><i class="glyphicon glyphicon-chevron-left"></i></span>\
                </div>',

            navbarBrand: '\
                <div class="navbar-brand">\
                    <a href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" {{if target}}target="{{target}}"{{/if}}>\
                        {{if icon}}\
                            <i class="{{icon}}"></i>\
                        {{else img}}\
                            <img src="{{img}}">\
                        {{else}}\
                            <i class="glyphicon glyphicon-home"></i>\
                        {{/if}}\
                    </a>\
                    <span class="min"></span>\
                    <span class="max">{{text}}</span>\
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
                    <div class="form-group">\
                        <input type="text" name="{{if name}}{{name}}{{else}}keyword{{/if}}" class="form-control" placeholder="{{if placeholder}}{{placeholder}}{{else}}搜索...{{/if}}">\
                    </div>\
                    <button type="submit" class="{{if classes}}{{classes}}{{else}}btn btn-default{{/if}}">{{$data.text||"搜索"}}</button>\
                </form>',

            navbarBtn: '\
                <button type="button" class="navbar-item-clickable navbar-btn navbar-{{align}} {{if classes}}{{classes}}{{else}}btn btn-default{{/if}}">{{text}}</button>',

            layoutAside: '\
                {{tmpl "asideMenu"}}',

            asideMenu: '\
                <ul class="menu">\
                    {{tmpl(menu) "menuItem"}}\
                </ul>',

            menuItem: '\
                {{if menu}}\
                    <li>\
                        <a href="javascript:;" data-toggle="collapse" data-target="#layout-menu-{{$index}}">\
                            <i class="glyphicon glyphicon-menu-left pull-right"></i>\
                            {{if icon}}<i class="{{icon}}"></i>{{else}}<i class="glyphicon glyphicon-folder-open"></i>{{/if}}\
                            <span>{{text}}</span>\
                        </a>\
                        <ul class="menu collapse" id="layout-menu-{{$index}}">\
                            {{tmpl(menu) "menuLink"}}\
                        </ul>\
                    </li>\
                {{else}}\
                    {{tmpl "menuLink"}}\
                {{/if}}',

            menuLink: '\
                <li>\
                    <a href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" {{if target}}target="{{target}}"{{/if}}>\
                        {{if icon}}<i class="{{icon}}"></i>{{else}}<i class="glyphicon glyphicon-file"></i>{{/if}}\
                        <span>{{text}}</span>\
                    </a>\
                </li>',

            layoutBar: '\
                {{if $data.bar&&$data.bar.length}}\
                    <div class="tab-inverse">\
                        <ul class="nav nav-justified nav-tabs">\
                            {{tmpl(bar) "tab"}}\
                        </ul>\
                        <div class="tab-content">\
                            {{tmpl(bar) "tabContent"}}\
                        </div>\
                    </div>\
                {{/if}}',

            tab: '\
                <li {{if active}}class="active"{{/if}}>\
                    <a href="#layout-bar-{{$index}}" data-toggle="tab">\
                        {{if icon}}<i class="{{icon}}"></i>{{/if}}\
                        {{if text}}{{text}}{{/if}}\
                    </a>\
                </li>',

            tabContent: '\
                {{if $.isFunction($data.content)}}\
                    <div class="tab-pane function {{if active}}active{{/if}}" id="layout-bar-{{$index}}"></div>\
                {{else}}\
                    <div class="tab-pane {{if active}}active{{/if}}" id="layout-bar-{{$index}}">{{html content}}</div>\
                {{/if}}',

            layoutFooter: '\
                <div class="container text-center">\
                    <p>{{html footer}}</p>\
                </div>'
        }, 
        
        options: {

            brand: {},

            source: {},

            collapse: {},

            menu: [],

            footer: '',

            bar: null
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