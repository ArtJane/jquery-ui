define(["jquery", "@widgets/base", "@widgets/title", "@widgets/dialog"], function ($) {

    $.widget("ui.layout", $.ui.base, {

        templates: {

            main: `
                {{tmpl "navbar"}}
                <div class="d-flex">
                    <div style="width: 220px;">
                        {{tmpl "aside"}}
                    </div>
                    <div class="flex-grow-1">
                        {{tmpl "article"}}                       
                    </div>
                </div>
            `,

            navbar: `
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Brand</a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbar-collapse">
                        {{tmpl "navbarNav"}}
                        {{tmpl "navbarForm"}}
                    </div>
                </nav>
            `,

            navbarNav: `
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Dropdown</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1">Disabled</a>
                    </li>
                </ul>
            `,

            navbarForm: `
                <form class="form-inline">
                    <input type="search" class="form-control mr-sm-2" placeholder="Search">
                    <button type="submit" class="btn btn-outline-success">Search</button>
                </form>
            `,

            aside: `
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action active">Cras justo odio</a>
                    <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                    <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
                    <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                    <a href="#" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">Vestibulum at eros</a>
                </div>
            `,

            article: `
                <div class="article-title">
                    <span>登录界面</span>
                </div>
                <div class="article-detail">
                    <span>欢迎光临登录界面~</span>
                </div>
            `
        },

        options: {
            title: "C类市场活动管理中心",
            disableBar: true
        },

        _create: function () {

            this._addClass(this.widgetFullName);
        },

        _init: function () {
            this.element.html(this._tmpl('main', this.options));
            this.title = this.element.find(".article-title");

            this.title.title({
                title: "title",
                buttons: [
                    {
                        text: "aaa",
                        click: function (){
                            console.log(666)
                            $("<div>").dialog();
                        }
                    }
                ]
            });

            /*
            window.G = {};
            this._getData(function (res) {
                this._isTimeZoneNull();
                this._setOpts(res);
            });
            */
        },

        _setOpts: function (res) {
            var opts = this.options;
            var employee = res.headInfo.employee;
            opts.user = {
                id: employee.empCode,
                username: employee.fullName,
                phone: employee.phone,
                email: employee.email,
                address: employee.country + employee.province + employee.city,
                changePasswordUrl: window.G.changePasswordUrl,
                workbenchUrl: window.G.workbenchUrl,
                timezone: this._getCookies('pref-timezone')
            };
            opts.workbenchUrl = window.G.workbenchUrl;
            opts.footer = res.footBarInfo.footBar;
            opts.products = [];
            $.each(res.headInfo.dimensionList, function (i, item) {
                opts.products.push({
                    title: item.name,
                    products: (function () {
                        var arr = [];
                        $.each(item.categoryList, function (i, item) {
                            arr.push({
                                icon: 'glyphicon glyphicon-plus',
                                title: item.name,
                                products: (function () {
                                    var arr = [];
                                    $.each(item.systemList, function (i, item) {
                                        arr.push({
                                            icon: 'glyphicon glyphicon-menu-right',
                                            title: item.name,
                                            url: item.url
                                        });
                                    });
                                    return arr;
                                })()
                            });
                        });
                        return arr;
                    })()
                });
            });

            opts.menu = [];
            $.each(res.sideBarInfo.menus, function (i, item) {
                opts.menu.push({
                    icon: 'glyphicon glyphicon-folder-open',
                    text: item.name,
                    menu: (function () {
                        var arr = [];
                        $.each(item.children, function (i, item) {
                            arr.push({
                                icon: 'glyphicon glyphicon-file',
                                text: item.name,
                                url: item.url
                            });
                        });
                        return arr;
                    })()
                });
            });
        },

        _getData: function (callback) {
            var that = this;
            callback.call(that, {
                headInfo: {
                    employee: {},
                    dimensionList: []
                },
                sideBarInfo: {
                    menus: []
                },
                footBarInfo: {
                    footBar: ""
                }
            });
            /*$.ajax({
                url: window.G.componentsUrl,
                type: 'POST',
                data: {
                    clientId: window.G.clientId || 'IXG0xerbr2iB8RHD',
                    userId: window.G.userId,
                    isInternational: false
                },
                success: function (res) {
                    callback.call(that, res);
                }
            });*/
        },

        _getElements: function () {
            this.header = this.element.find('.layout-header');
            this.body = this.element.find('.layout-body');
            this.aside = this.body.find('.layout-aside');
            this.article = this.body.find('.layout-article');
            this.bar = this.body.find('.layout-bar');

            this.brand = this.header.find('.navbar-brand');
            this.navbarCollapse = this.header.find('.navbar-collapse');
            this.products = this.header.find('.products');

            this._bindEvents();
        },

        _bindEvents: function () {
            var that = this;

            this._on(this.header, {
                'click .navbar-switch.pull-left': '_clickSwitchleft',
                'click .navbar-switch.pull-right': '_clickSwitchright',
                'click .navbar-toggle.collapsed': '_clickNavbartoggle',
                'click .product-pill': '_clickProduct'
            });

            this._on(this.aside.find('> .menu'), {
                'click .collapse a': '_clickCollapseA',
                'click .navbar-switch.pull-left': '_clickSwitchleft',
                'click .navbar-switch.pull-right': '_clickSwitchright',
                'click .navbar-toggle.collapsed': '_clickNavbartoggle',
                'click .product-pill': '_clickProduct'
            });

            this.header
                .on('show.bs.dropdown', '.products', function (event) {
                    var $this = $(this);
                    var left = $this.offset().left;
                    var menu = $this.find('>.dropdown-menu').css({
                        left: -left,
                        width: that.element.width()
                    });


                });
            this.aside
                .on('show.bs.collapse', '.menu', function (event) {
                    var target = $(event.target);

                    if (target.css('position') === 'absolute') {
                        return false;
                    }
                    that.aside.find(target).parent().addClass('open');
                    that.aside.find('.menu.collapse.in').not(event.target).collapse('hide');
                })
                .on('hide.bs.collapse', '.menu', function (event) {
                    var target = $(event.target);
                    if (target.css('position') === 'absolute') {
                        return false;
                    }
                    that.aside.find(target).parent().removeClass('open');
                });

            this.products.find('.product-pill').eq(0).click();

            this.window.scroll(function (event) {
                var title = that.article.find('.layout-title');
                var $this = $(this), interval;
                if (!title.length) {
                    interval = setInterval(function () {
                        title = that.article.find('.layout-title');
                        if (title.length) {
                            clearInterval(interval);
                            _setpin();
                        }
                    });
                } else {
                    _setpin();
                }

                function _setpin() {
                    var width = title.width();
                    if ($this.scrollTop() > 50) {
                        that.article.addClass('pin');
                        title.width(width);
                    } else {
                        that.article.removeClass('pin');
                        title.width('auto');
                    }
                }
            });
        },

        _clickCollapseA: function (event) {
            var href = $(event.currentTarget).attr('href');
            window.setGlobal(href, null);
            window.loadPage(href);
            return false;
        },

        _clickSwitchleft: function () {

            this._hideNavbarCollapse();

            if (this.brand.hasClass('min')) {
                this.brand.removeClass('min').closest('.navbar').removeClass('min');
                this.body.removeClass('transform');
                this.aside.addClass('extend');
            } else {
                this.brand.addClass('min').closest('.navbar').addClass('min');
                this.body.addClass('transform');
                this.aside.removeClass('extend');
            }
        },

        _clickSwitchright: function () {
            this._hideNavbarCollapse();
            this.bar.toggleClass('extend');
        },

        _clickNavbartoggle: function () {
            this._hideAside();
            this._hideBar();
        },

        _clickProduct: function (event, item) {
            $(event.target)
                .closest('li').addClass('active')
                .siblings('li').removeClass('active');

            this.products
                .find('.tab-content')
                .html(this._tmpl('productPane', item.data));

            return false;
        },

        _hideNavbarCollapse: function () {
            if (this.navbarCollapse.hasClass('in')) {
                this.navbarCollapse.collapse('hide');
            }
        },

        _hideAside: function () {
            if (this.body.hasClass('transform')) {
                this.header.find('.navbar-switch.pull-left').trigger('click');
            }
        },

        _hideBar: function () {
            if (this.bar.hasClass('extend')) {
                this.header.find('.navbar-switch.pull-right').trigger('click');
            }
        },
        _isTimeZoneNull: function () {
            //时区存在，则不设置
            console.log(this._getCookies('pref-timezone'));
            if (this._getCookies('pref-timezone') != false || this._getCookies('pref-format') != '') {
                return;
            }
            //时区不存在，默认设置为+8:00      .i4px.com
            this._setDefaultTimeZone('pref-timezone', '%2B08%3A00');
        }
    });
});