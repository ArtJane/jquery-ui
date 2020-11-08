define(["jquery", "@widgets/base"], function($) {

    $.widget("ui.paging", $.ui.base, {

        templates: {

            main: /* html */ `                
                <nav class="d-flex flex-row justify-content-center align-items-center">
                    <div class="mr-3">总计 {{total}} 条，每页 {{pageSize}} 条</div>
                    <ul class="pagination mb-0">                    
                        {{tmpl(pages) "pageItem"}}                               	
                    </ul>                    
                    <div class="input-group ml-3" style="width: 120px;">
                        <input type="text" class="form-control" placeholder="转到...">
                        <div class="input-group-append">
                            <button type="button" class="btn btn-outline-secondary go">GO</button>
                        </div>
                    </div>
                    <select class="form-control ml-3" style="width: 120px;">
                        {{tmpl(pageSizeList) "option"}}
                    </select>
                </nav>
            `,

            pageItem: /* html */ `
                <li class="page-item {{if active}}active{{/if}}">
                    <a class="page-link" href="#">{{number}}</a>
                </li>
            `,

            option: /* html */ `
                <option value="{{value}}" {{if $options.pageSize===$data.value}}selected{{/if}}>{{label}}</option>
            `
        },

        options: {

            /* 
            当前页码 
            */
            pageNumber: 1,

            /* 
            每页记录数 
            */
            pageSize: 10,

            /* 
            总记录数 
            */
            total: 0,

            /* 
            需显示的页码数 
            */
            showPages: 7,

            /* 
            每页记录数列表            
            */
            pageSizeList: [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 }
            ],

            /* 
            选择页码:
            function(pageNumber){} 
            */
            changePageNumber: null,
            changePageSize: null

        },

        _create() {
            this._addClass("ui-paging");
            this._on({
                "click .page-link": "_clickPageLink",
                "click .go": "_clickGo",
                "keydown input[type=text]": "_keydownInput",
                "change select": "_changePageSize"
            });
        },

        _init() {
            this.options.totalPages = Math.ceil(this.options.total / this.options.pageSize);
            if (this.options.totalPages > 1) {
                this._createPages();
                this.element.html(this._tmpl("main", this.options));
                this.input = this.element.find("input");
            }
        },

        _createPages() {
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

        _clickPageLink(e, { data }) {
            var target = $(e.currentTarget);
            if (!target.hasClass("active")) {
                this._changePageNumber(e, data.number);
            }
            return false;
        },

        _clickGo(e) {
            var val = parseInt(this.input.val());
            this.input.val("");
            if (!$.isNumeric(val)) {
                return;
            }
            if (val < 1) {
                val = 1;
            } else if (val > this.options.totalPages) {
                val = this.options.totalPages;
            }
            this._changePageNumber(e, val);
        },

        _keydownInput(e) {
            if (e.keyCode === 13) {
                this._clickGo(e);
            }
        },

        _changePageNumber(e, pageNumber) {
            this._trigger("changePageNumber", e, {
                pageNumber
            });
        },

        _changePageSize(e) {
            this.options.pageSize = Number($(e.currentTarget).val());
            this._trigger("changePageSize", e, {
                pageSize: this.options.pageSize
            });
        }
    });

});