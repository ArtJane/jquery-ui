var config = {
    ajax: '/ajax'
};

var require = {
    baseUrl: '/js',
    urlArgs: 'v=20201010',
    paths: {
        jquery: '../vendors/jquery/jquery',
        bootstrap: '../vendors/bootstrap/js/bootstrap',
        widget: '../vendors/jquery/jquery.widget',
        cookie: '../vendors/jquery/jquery.cookie',
        ready: '../vendors/jquery/jquery.ready',
        serializejson: '../vendors/jquery/jquery.serializejson',
        parseurl: '../vendors/jquery/jquery.parseurl',
        $:  '../vendors/jquery/jquery.bundle',
        validate: '../vendors/jquery/jquery.validate',
        moment: '../vendors/moment/moment',
        datetimepicker: '../vendors/datetimepicker/datetimepicker',
        tinymce: '../vendors/tinymce/tinymce.min',
        jqueryTinymce: '../vendors/tinymce/jquery.tinymce',
		page: '../vendors/page/page',
        layout: '../widgets/layout',
        dialog: '../widgets/dialog',
        notice: '../widgets/notice',
        form: '../widgets/form',
        table: '../widgets/table',
        paging: '../widgets/paging',
        steps: '../widgets/steps',
        heading: '../widgets/heading',
        group: '../widgets/group',
        listPage: '../widgets/listPage',
        detailPage: '../widgets/detailPage',
        stepsPage: '../widgets/stepsPage',
    },
    shim: {
        bootstrap: ['jquery'],
        jqueryTinymce: ['jquery', 'tinymce']
    }   
};