define(['$', 'heading', 'form', 'table'], function($){

    $.widget('ui.listPage', {

        templates: {

            main: '\
                {{if $data.title || ($data.headingBtns && $data.headingBtns.length)}}\
                    <div class="heading"></div>\
                {{/if}}\
                <div class="body">\
                    {{if $data.tabs && $data.tabs.length}}\
                        <ul class="nav nav-tabs">{{tmpl(tabs) "tab"}}</ul>\
                    {{/if}}\
                    {{if $data.searchItems && $data.searchItems.length}}\
                        <div class="search"></div>\
                    {{/if}}\
                    {{if $data.source && $data.source.length}}\
                        <div class="items table-responsive"></div>\
                    {{/if}}\
                </div>',

            tab: '\
                <li {{if active}}class="active"{{/if}}><a href="{{href}}" {{if target}}target="{{target}}"{{/if}}>{{text}}</a></li>'            

        },

        options: {

            title: '',

    	    headingBtns: [],

    	    tabs: [],
      
            searchItems: [],

            searchBtns: [],

            initAutoSearch: true,            

            pageSize: 10,

            pageSizeList: [],

    	    source: [],

            columns: [],

            checkbox: {},

            action: {},

            mounted: $.noop
        },
        
        _create: function() {
            this._addClass(this.widgetFullName);
            this._on({
            	'click .nav-tabs > li': '_clickTab'
            });
        },

        _init: function(){
            var o = this.options;

            this.element.html(this._tmpl('main', o));
            this.heading = this.element.find('.heading');
            this.search = this.element.find('.search');           
            this.items = this.element.find('.items');

            if(this.heading.length){
                this._setHeading();
            }

            if(o.pageSizeList){
                this._setPageSize();
            }

            if(this.search.length){
            	this._renderSearch();
            }else{
                this._renderList(1);
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
                            origClick.call(that.element[0], event, that.list.table('getCheckedData'));                           
                        };
                    }
                    return item;
                })
            });          
        },
       
        _setPageSize: function(){
            var o = this.options;
            $.each(o.pageSizeList, function(item){                
                if(item.selected){
                    o.pageSize = item.value;
                    delete item.selected;                   
                    return false;
                }
            });
        },

        _proxySearchBtns: function(btns){
            var that = this;
            $.each(btns, function(i, item){
                var origClick;
                if(item.label != null && item.items){
                    that._proxySearchBtns(item.items);
                }
                else if(item.type && item.type === 'submit'){
                    if($.isFunction(item.click)){
                        origClick = item.click;
                        item.click = function(event, data){
                            origClick.call(that.element[0], event, data, function(){
                                that.options.searchData = data;
                                that._renderList(1);
                            });
                        };
                    }
                }else if($.isFunction(item.click)){
                    origClick = item.click;
                    item.click = function(event, data){
                        origClick.call(that.element[0], event, data);
                    };
                }
            });
        },

        _renderSearch: function(){            
            var that = this;
            var o = this.options;

            this._proxySearchBtns(o.searchBtns);
            this.search
	            .form({
	                items: o.searchItems.concat([o.searchBtns])
                });
                
            if(this.options.initAutoSearch){
                this.search.form('getData', function(data){                   
            		that.options.searchData = data;
                	that._renderList(1);
	            });
            }            	
        },

        _renderList: function(pageNumber){
            var that = this;
            var o = this.options;           

            this.items.table({
                source: $.isFunction(o.source) ? function(ctx, next){                    
                    o.source.call(that.element[0], {
                        form: o.searchData,
                        table: ctx
                    }, function(ctx){                        
                        next(ctx.table);
                    });
                } : o.source,
                pageNumber: pageNumber,
                pageSize: o.pageSize, 
                pageSizeList: o.pageSizeList,
                columns: o.columns,
                checkbox: o.checkbox,
                action: o.action,
                mounted: o.mounted
            });
        },

        _clickTab: function(event, ctx){
            if($.isFunction(ctx.data.click)){
                ctx.data.click.call(this.element[0], event, ctx.data);
                return false;
            }
        },

        getCheckedData: function(){
            return this.items.table('getCheckedData');
        }

    });

});