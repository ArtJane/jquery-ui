define(['$'], function($){

    $.widget('ui.paging', {
    	
    	templates: {
    		
            main: '\
                <ul>\
                	<li>总计 {{total}} 条，每页  {{pageSize}} 条</li>\
                	<li>\
                        <ul class="pagination">\
                            <li class="page-prev"><a href="javascript:;">&laquo;</a></li>\
                            {{tmpl(pages) "pageItem"}}\
                            <li class="page-next"><a href="javascript:;">&raquo;</a></li>\
                        </ul>\
                    </li>\
                    {{if pages}}\
		                <li class="input-group">\
		                	<input type="text" class="form-control" placeholder="转到...">\
			                <span class="input-group-btn">\
			                	<button class="btn btn-default go">GO</button>\
			              	</span>\
		                </li>\
	            	{{/if}}\
                    {{if pageSizeList}}\
                        <li class="page-size">\
                            <span>每页</span>\
                            <select class="form-control">\
                                {{tmpl(pageSizeList) "option"}}\
                            </select>\
                            <span>条记录</span>\
                        </li>\
                    {{/if}}\
                </ul>',
            
            pageItem: '\
                <li class="page-item {{if active}}active{{/if}}">\
                    <a href="javascript:;">{{number}}</a>\
                </li>',           

            option: '\
                <option value="{{value}}" {{if $data.selected||$options.pageSize==$data.value}}selected="selected"{{/if}}>{{label}}</option>'
    	},
       
        options: {
            
        	//当前页码
            pageNumber: 1,
            
            //每页记录数
            pageSize: 10,
            
            //总记录数
            total: 0,
            
            //需显示的页码数
            showPages: 7, 
            
            //每页显示数量列表
            pageSizeList: null,
            
            //选择页码
            changePageNumber: null,

            //选择每页显示数量
            changePageSize: null
        },
       
        _create: function() {        	
        	this._addClass(this.widgetFullName);
            this._on({
                'click .page-item': '_clickPageItem',
                'click .page-prev': '_clickPagePrev',
                'click .page-Next': '_clickPageNext',
                'click .go': '_clickGo',
                'keydown input[type=text]': '_keydownInput',
                'change select': '_changePageSize'
            });
        },
      
        _init: function(){           

            //总页数
            this.options.totalPages = Math.ceil(this.options.total / this.options.pageSize);

            if (this.options.totalPages > 1) {
                //构造页分页数据
                this._createPages();
                //渲染模板
                this.element.html(this._tmpl('main', this.options));
	            this.input = this.element.find('input');
            }
        },

        //构造页分页数据
        _createPages: function(){
            var o = this.options;
            var min, max, pages;

            min = o.pageNumber - Math.floor(o.showPages / 2);
            min = Math.max(min, 1);

            max = o.pageNumber + (o.showPages - (o.pageNumber - min + 1));
            max = Math.min(max, o.totalPages);

            pages = max - min;
            if (pages !== o.showPages - 1) {
                min = min - (o.showPages - pages) + 1;
                min = Math.max(min, 1);
            }

            o.pages = [];
            for (; min <= max; min++) {
                min === o.pageNumber ?
                    o.pages.push({ number: min, active: true }) :
                    o.pages.push({ number: min });
            }
        },

        //点击页码
        _clickPageItem: function(event, ctx){
            var target = $(event.currentTarget);
            if(target.hasClass('active')){
                return;
            }            
            //选择页码
            this._changePageNumber(event, ctx.data.number);
        },

        _clickPagePrev: function(event){
            var number = this.options.pageNumber - 1;
            if(number < 1){
                number = 1;
            }
            this._changePageNumber(event, number);
        },

        _clickPageNext: function(event){
            var number = this.options.pageNumber + 1;
            if(number > this.options.totalPages){
                number = this.options.totalPages;
            }
            this._changePageNumber(event, number);
        },

        //点击跳转
        _clickGo: function(event){
            var val = parseInt(this.input.val());
            this.input.val('');

            if(!$.isNumeric(val)){
                return;
            }

            if(val < 1){
                val = 1;
            }else if(val > this.options.totalPages){
                val = this.options.totalPages;
            }

            //选择页码
            this._changePageNumber(event, val);
        },

        //输入框回车
        _keydownInput: function(event){
            if(event.keyCode === 13){
                this._clickGo(event);
            }
        },

        //选择页码
        _changePageNumber: function(event, pageNumber){ 
            this._trigger('changePageNumber', event, {
                pageNumber: pageNumber
            });          
            
        },        

        _changePageSize(event) {
            this.options.pageSize = Number($(event.currentTarget).val());
            this._trigger('changePageSize', event, {
                pageSize: this.options.pageSize
            });
        }

    });

});