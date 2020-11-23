define(['jquery'], function($){
   
    //     [0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
    //     [1]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread
    //     [2]: http://jblas:password@mycompany.com:8080/mail/inbox
    //     [3]: http://jblas:password@mycompany.com:8080
    //     [4]: http:
    //     [5]: //
    //     [6]: jblas:password@mycompany.com:8080
    //     [7]: jblas:password
    //     [8]: jblas
    //     [9]: password
    //    [10]: mycompany.com:8080
    //    [11]: mycompany.com
    //    [12]: 8080
    //    [13]: /mail/inbox
    //    [14]: /mail/
    //    [15]: inbox
    //    [16]: ?msg=1234&type=unread
    //    [17]: #msg-content       
    var urlParseRE = /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;

    var parseSearch = function(search){
        var result = {};
        search = (search || "?").substring(1);
        $.each(search.split("&"), function(i, item){
            item = item.split("=");
            result[item[0]] = item[1];
        });
        return result;
    };

    var stringifyURL = function (uri) {
        var hash, search;

        hash = uri.hash.charAt( 0 ) === "#" ? uri.hash : "#";
        hash = hash.charAt( hash.length - 1 ) === "#" ? "" : hash;

        search = uri.search.charAt( 0 ) === "?" ? uri.search : "?" + uri.search;
        search = search.charAt( search.length - 1 ) === "?" ? "" : search;

        return uri.protocol +
            uri.doubleSlash +
            uri.host +
            ( ( uri.protocol !== "" && uri.pathname.substring( 0, 1 ) !== "/" ) ?
                "/" : "" ) +
            uri.pathname +
            uri.search +
            hash;
    };

    $.parseURL = function(option, url){
        var matches, parsedUrl, searchMap;

        matches = urlParseRE.exec( url || location.href || "" ) || [];
        searchMap = matches[ 16 ] ? parseSearch(matches[ 16 ]) : null;
        parsedUrl = {
            href:         matches[  0 ] || "",
            hrefNoHash:   matches[  1 ] || "",
            hrefNoSearch: matches[  2 ] || "",
            domain:       matches[  3 ] || "",
            protocol:     matches[  4 ] || "",
            doubleSlash:  matches[  5 ] || "",
            authority:    matches[  6 ] || "",
            username:     matches[  8 ] || "",
            password:     matches[  9 ] || "",
            host:         matches[ 10 ] || "",
            hostname:     matches[ 11 ] || "",
            port:         matches[ 12 ] || "",
            pathname:     matches[ 13 ] || "",
            directory:    matches[ 14 ] || "",
            filename:     matches[ 15 ] || "",
            search:       matches[ 16 ] || "",
            searchMap:    searchMap,                
            hash:         matches[ 17 ] || ""
        };

        if(option === "{}"){
            return parsedUrl;
        }

        if($.isPlainObject(option)){
            option.search = (typeof option.search === "object") ? $.param( option.search ) : option.search;            
            $.extend(parsedUrl, option);            
            parsedUrl = stringifyURL(parsedUrl);
            return $.parseURL("{}", parsedUrl);
        }        

        return parsedUrl[option];

    };

});