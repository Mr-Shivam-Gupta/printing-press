function eggbfc(winw, resultoption) {
    var lasttop = winw,
        lastbottom = 0,
        smallest = 9999,
        largest = 0,
        samount = 0,
        lamoung = 0,
        lastamount = 0,
        resultid = 0,
        resultidb = 0,
        responsiveEntries = [{
            width: 1400,
            amount: 4,
            mmheight: 0
        }, {
            width: 1336,
            amount: 3,
            mmheight: 0
        }, {
            width: 1024,
            amount: 3,
            mmheight: 0
        }, {
            width: 900,
            amount: 3,
            mmheight: 0
        }, {
            width: 778,
            amount: 2,
            mmheight: 0
        }, {
            width: 600,
            amount: 2,
            mmheight: 0
        }, {
            width: 480,
            amount: 1,
            mmheight: 0
        }];
    if (responsiveEntries != undefined && responsiveEntries.length > 0)
        jQuery.each(responsiveEntries, function(index, obj) {
            var curw = obj.width != undefined ? obj.width : 0,
                cura = obj.amount != undefined ? obj.amount : 0;
            if (smallest > curw) {
                smallest = curw;
                samount = cura;
                resultidb = index;
            }
            if (largest < curw) {
                largest = curw;
                lamount = cura;
            }
            if (curw > lastbottom && curw <= lasttop) {
                lastbottom = curw;
                lastamount = cura;
                resultid = index;
            }
        });
    if (smallest > winw) {
        lastamount = samount;
        resultid = resultidb;
    }
    var obj = new Object;
    obj.index = resultid;
    obj.column = lastamount;
    if (resultoption == "id")
        return obj;
    else
        return lastamount;
}
if ("even" == "even") {
    var coh = 0,
        container = jQuery("#esg-grid-1-1");
    var cwidth = container.width(),
        ar = "17:10",
        gbfc = eggbfc(jQuery(window).width(), "id"),
        row = 2;
    ar = ar.split(":");
    aratio = parseInt(ar[0], 0) / parseInt(ar[1], 0);
    coh = cwidth / aratio;
    coh = coh / gbfc.column * row;
    var ul = container.find("ul").first();
    ul.css({
        display: "block",
        height: coh + "px"
    });
}
var essapi_1;
jQuery(document).ready(function() {
    essapi_1 = jQuery("#esg-grid-1-1").tpessential({
        gridID: 1,
        layout: "even",
        forceFullWidth: "off",
        lazyLoad: "off",
        row: 2,
        loadMoreAjaxToken: "58893fa21e",
        loadMoreAjaxUrl: "http://copypress.wp/wp-admin/admin-ajax.php",
        loadMoreAjaxAction: "Essential_Grid_Front_request_ajax",
        ajaxContentTarget: "ess-grid-ajax-container-",
        ajaxScrollToOffset: "0",
        ajaxCloseButton: "off",
        ajaxContentSliding: "on",
        ajaxScrollToOnLoad: "on",
        ajaxNavButton: "off",
        ajaxCloseType: "type1",
        ajaxCloseInner: "false",
        ajaxCloseStyle: "light",
        ajaxClosePosition: "tr",
        space: 0,
        pageAnimation: "fade",
        paginationScrollToTop: "off",
        spinner: "spinner0",
        evenGridMasonrySkinPusher: "off",
        lightBoxMode: "single",
        animSpeed: 1000,
        delayBasic: 1,
        mainhoverdelay: 1,
        filterType: "single",
        showDropFilter: "hover",
        filterGroupClass: "esg-fgc-1",
        googleFonts: ['Open+Sans:300,400,600,700,800', 'Raleway:100,200,300,400,500,600,700,800,900', 'Droid+Serif:400,700'],
        aspectratio: "17:10",
        responsiveEntries: [{
            width: 1400,
            amount: 4,
            mmheight: 0
        }, {
            width: 1336,
            amount: 3,
            mmheight: 0
        }, {
            width: 1024,
            amount: 3,
            mmheight: 0
        }, {
            width: 900,
            amount: 3,
            mmheight: 0
        }, {
            width: 778,
            amount: 2,
            mmheight: 0
        }, {
            width: 600,
            amount: 2,
            mmheight: 0
        }, {
            width: 480,
            amount: 1,
            mmheight: 0
        }]
    });

});