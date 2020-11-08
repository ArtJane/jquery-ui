define(["jquery", "@widgets/base", "@widgets/title", "@widgets/dialog"], function($) {

    $.widget("ui.layout", $.ui.base, {

        templates: {

            main: /* html */ `
                {{tmpl "navbar"}}
                <div class="d-flex flex-column flex-lg-row">
                    <div style="min-width: 220px;">
                        {{tmpl "aside"}}
                    </div>
                    <div class="flex-grow-1">
                        <div class="article"></div>                      
                    </div>
                </div>
            `,

            navbar: /* html */ `
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">{{brand}}</a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse">
                        {{tmpl "navbarNav"}}
                        {{tmpl "navbarForm"}}
                    </div>
                </nav>
            `,

            navbarNav: /* html */ `
                <ul class="navbar-nav mr-auto">
                    {{tmpl(nav) "navItem"}}                    
                </ul>
            `,

            navItem: /* html */ `
                {{if menu}}
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">{{text}}</a>
                        <div class="dropdown-menu">
                            {{tmpl(menu) "dropdownItem"}}
                        </div>
                    </li>
                {{else}}
                    <li class="nav-item {{if active}}active{{/if}}">
                        <a 
                            href="{{href}}"                           
                            class="nav-link {{if disabled}}disabled{{/if}}"
                            {{if disabled}}tabindex="-1"{{/if}}
                        >{{text}}</a>
                    </li>
                {{/if}}
            `,

            dropdownItem: /* html */ `
                {{if isDivider}}
                    <div class="dropdown-divider"></div>                    
                {{else}}
                    <a 
                        href="{{href}}"
                        class="dropdown-item {{if active}}active{{/if}} {{if disabled}}disabled{{/if}}" 
                        {{if disabled}}tabindex="-1"{{/if}}
                    >{{text}}</a>
                {{/if}}
            `,

            navbarForm: /* html */ `
                <form class="form-inline">
                    <input type="search" class="form-control mr-sm-2" placeholder="Search">
                    <button type="submit" class="btn btn-outline-success">Search</button>
                </form>
            `,

            aside: /* html */ `
                <div class="collapse navbar-collapse d-lg-block">
                    <div class="accordion" id="asideAccordion">
                        {{tmpl(menu) "menuItem"}}
                    </div>
                </div>
            `,

            menuItem: /* html */ `
                {{if menu}}
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">
                                <button 
                                    type="button" 
                                    class="btn btn-link btn-block text-left" 
                                    data-toggle="collapse" 
                                    data-target="#menuCollapse{{$index}}"
                                >{{text}}</button>
                            </h6>
                        </div>                    
                        <div id="menuCollapse{{$index}}" class="collapse {{if active}}show{{/if}}" data-parent="#asideAccordion">
                            <div class="card-body">
                                <div class="list-group">
                                    {{tmpl(menu) "listGroupItem"}}                                    
                                </div>
                            </div>
                        </div>
                    </div>                
                {{else}}
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">
                                <a href="{{href}}" class="btn btn-link btn-block text-left">{{text}}</a>
                            </h6>
                        </div>
                    </div>
                {{/if}}
            `,

            listGroupItem: /* html */ `
                <a 
                    href="{{href}}" 
                    class="list-group-item list-group-item-action {{if active}}active{{/if}} {{if disabled}}disabled{{/if}}"
                    {{if disabled}}tabindex="-1"{{/if}}
                >{{text}}</a>
            `
        },

        options: {
            brand: "Brand",
            nav: [],
            menu: []
        },

        _create: function() {
            this._addClass("ui-layout");
        },

        _init: function() {
            this._handleOptions();
            this.element.html(this._tmpl("main", this.options));
            this._getElements();
        },

        _handleOptions: function() {
            var o = this.options;
            if ($.isFunction(o.nav)) {
                o.nav = o.nav.call(this.element[0]);
            }
            if ($.isFunction(o.menu)) {
                o.menu = o.menu.call(this.element[0]);
            }
        },

        _getElements: function() {
            this.article = this.element.find(".article");
        }
    });
});