define(['$', 'dialog', 'group'], function($){

    $.widget('ui.dialogPage', {

        options: {

            dialog: {},

            source: {},

            items: []
        },

        _create: function() {
            this._addClass('ui-dialogPage');
        },

        _init: function(){
            var that = this;
            var o = this.options;

            this.group = $('<div>').group({
                source: o.source,
                items: o.items,
                mounted: function () {
                    that.element.dialog($.extend(o.dialog, {
                        content: that.group
                    }));
                    that._trigger('mounted', null, {
                        source: o.source,
                        widgets: that.group._widgets
                    });
                }
            });
        }

    });

});