/*! Filter widget formatter functions - updated 10/10/2013
 * requires: tableSorter 2.7.7+ and jQuery 1.4.3+
 * jQuery UI spinner, silder, range slider & datepicker (range)
 * HTML5 number (spinner), range slider & color selector
 */
;(function(k){k.tablesorter=k.tablesorter||{};k.tablesorter.filterFormatter={uiSpinner:function(b,e,h){var a=k.extend({min:0,max:100,step:1,value:1,delayed:!0,addToggle:!0,disabled:!1,exactMatch:!0,compare:""},h);h=k('<input class="filter" type="hidden">').appendTo(b).bind("change.tsfilter",function(){c({value:this.value,delayed:!1})});var d=[],l=b.closest("table")[0].config,c=function(f){var g=!0,c,e=f&&f.value&&k.tablesorter.formatFloat((f.value+"").replace(/[><=]/g,""))||b.find(".spinner").val()|| a.value;a.addToggle&&(g=b.find(".toggle").is(":checked"));c=a.disabled||!g?"disable":"enable";b.find(".filter").val(g?(a.compare?a.compare:a.exactMatch?"=":"")+e:"").trigger("search",f&&"boolean"===typeof f.delayed?f.delayed:a.delayed).end().find(".spinner").spinner(c).val(e);d.length&&(d.find(".spinner").spinner(c).val(e),a.addToggle&&(d.find(".toggle")[0].checked=g))};a.oldcreate=a.create;a.oldspin=a.spin;a.create=function(b,g){c();"function"===typeof a.oldcreate&&a.oldcreate(b,g)};a.spin=function(b, g){c(g);"function"===typeof a.oldspin&&a.oldspin(b,g)};a.addToggle&&k('<div class="button"><input id="uispinnerbutton'+e+'" type="checkbox" class="toggle" /><label for="uispinnerbutton'+e+'"></label></div>').appendTo(b).find(".toggle").bind("change",function(){c()});b.closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed");k('<input class="spinner spinner'+e+'" />').val(a.value).appendTo(b).spinner(a).bind("change keyup",function(a){c()});l.$table.bind("stickyHeadersInit",function(){d= l.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();a.addToggle&&k('<div class="button"><input id="stickyuispinnerbutton'+e+'" type="checkbox" class="toggle" /><label for="stickyuispinnerbutton'+e+'"></label></div>').appendTo(d).find(".toggle").bind("change",function(){b.find(".toggle")[0].checked=this.checked;c()});k('<input class="spinner spinner'+e+'" />').val(a.value).appendTo(d).spinner(a).bind("change keyup",function(a){b.find(".spinner").val(this.value);c()})}); l.$table.bind("filterReset",function(){a.addToggle&&(b.find(".toggle")[0].checked=!1);c()});c();return h},uiSlider:function(b,e,h){var a=k.extend({value:0,min:0,max:100,step:1,range:"min",delayed:!0,valueToHeader:!1,exactMatch:!0,compare:"",allText:"all"},h);h=k('<input class="filter" type="hidden">').appendTo(b).bind("change.tsfilter",function(){c({value:this.value})});var d=[],l=b.closest("table")[0].config,c=function(f){var c="undefined"!==typeof f?k.tablesorter.formatFloat((f.value+"").replace(/[><=]/g, ""))||a.min:a.value,h=a.compare+(a.compare?c:c===a.min?a.allText:c);a.valueToHeader?b.closest("thead").find("th[data-column="+e+"]").find(".curvalue").html(" ("+h+")"):b.find(".ui-slider-handle").addClass("value-popup").attr("data-value",h);b.find(".filter").val(a.compare?a.compare+c:c===a.min?"":(a.exactMatch?"=":"")+c).trigger("search",f&&"boolean"===typeof f.delayed?f.delayed:a.delayed).end().find(".slider").slider("value",c);d.length&&(d.find(".slider").slider("value",c),a.valueToHeader?d.closest("thead").find("th[data-column="+ e+"]").find(".curvalue").html(" ("+h+")"):d.find(".ui-slider-handle").addClass("value-popup").attr("data-value",h))};b.closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed");a.valueToHeader&&b.closest("thead").find("th[data-column="+e+"]").find(".tablesorter-header-inner").append('<span class="curvalue" />');a.oldcreate=a.create;a.oldslide=a.slide;a.create=function(b,d){c();"function"===typeof a.oldcreate&&a.oldcreate(b,d)};a.slide=function(b,d){c(d);"function"===typeof a.oldslide&& a.oldslide(b,d)};k('<div class="slider slider'+e+'"/>').appendTo(b).slider(a);l.$table.bind("filterReset",function(){b.find(".slider").slider("value",a.value);c()});l.$table.bind("stickyHeadersInit",function(){d=l.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();k('<div class="slider slider'+e+'"/>').val(a.value).appendTo(d).slider(a).bind("change keyup",function(a){b.find(".slider").val(this.value);c()})});return h},uiRange:function(b,e,h){var a=k.extend({values:[0, 100],min:0,max:100,range:!0,delayed:!0,valueToHeader:!1},h);h=k('<input class="filter" type="hidden">').appendTo(b).bind("change.tsfilter",function(){var b=this.value.split(" - ");""===this.value&&(b=[a.min,a.max]);b&&b[1]&&c({values:b,delay:!1})});var d=[],l=b.closest("table")[0].config,c=function(c){var g=c&&c.values||a.values,h=g[0]+" - "+g[1],m=g[0]===a.min&&g[1]===a.max?"":h;a.valueToHeader?b.closest("thead").find("th[data-column="+e+"]").find(".currange").html(" ("+h+")"):b.find(".ui-slider-handle").addClass("value-popup").eq(0).attr("data-value", g[0]).end().eq(1).attr("data-value",g[1]);b.find(".filter").val(m).trigger("search",c&&"boolean"===typeof c.delayed?c.delayed:a.delayed).end().find(".range").slider("values",g);d.length&&(d.find(".range").slider("values",g),a.valueToHeader?d.closest("thead").find("th[data-column="+e+"]").find(".currange").html(" ("+h+")"):d.find(".ui-slider-handle").addClass("value-popup").eq(0).attr("data-value",g[0]).end().eq(1).attr("data-value",g[1]))};b.closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed"); a.valueToHeader&&b.closest("thead").find("th[data-column="+e+"]").find(".tablesorter-header-inner").append('<span class="currange"/>');a.oldcreate=a.create;a.oldslide=a.slide;a.create=function(b,d){c();"function"===typeof a.oldcreate&&a.oldcreate(b,d)};a.slide=function(b,d){c(d);"function"===typeof a.oldslide&&a.oldslide(b,d)};k('<div class="range range'+e+'"/>').appendTo(b).slider(a);l.$table.bind("filterReset",function(){b.find(".range").slider("values",a.values);c()});l.$table.bind("stickyHeadersInit", function(){d=l.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();k('<div class="range range'+e+'"/>').val(a.value).appendTo(d).slider(a).bind("change keyup",function(a){b.find(".range").val(this.value);c()})});return h},uiDateCompare:function(b,e,h){var a=k.extend({defaultDate:"",cellText:"",changeMonth:!0,changeYear:!0,numberOfMonths:1,compare:"",compareOptions:!1},h);h=b.closest("thead").find("th[data-column="+e+"]");var d=k('<input class="dateCompare" type="hidden">').appendTo(b).bind("change.tsfilter", function(){var b=this.value;if(b)a.onClose(b)}),l,c,f=[],g=b.closest("table")[0].config,n=function(c){var d=(new Date(b.find(".date").datepicker("getDate"))).getTime();b.find(".compare").val(c);b.find(".dateCompare").val(c+d).trigger("search",a.delayed).end();f.length&&f.find(".compare").val(c)};h.addClass("filter-parsed");if(a.compareOptions){c='<select class="compare">';for(var m in a.compareOptions)c+='<option value="'+m+'"',m===a.compare&&(c+=' selected="selected"'),c+=">"+m+"</option>";c+="</select>"; b.append(c).find(".compare").bind("change",function(){n(k(this).val())})}else a.cellText&&(c="<label>"+a.cellText+"</label>",b.append(c));l='<input type="text" class="date date'+e+'" placeholder="'+(h.data("placeholder")||h.attr("data-placeholder")||"")+'" />';k(l).appendTo(b);a.oldonClose=a.onClose;a.onClose=function(c,d){var g=(new Date(b.find(".date").datepicker("getDate"))).getTime()||"",e=b.find(".compare").val()||a.compare;b.find(".dateCompare").val(e+g).trigger("search").end().find(".date").datepicker("setDate", c);f.length&&f.find(".date").datepicker("setDate",c);"function"===typeof a.oldonClose&&a.oldonClose(c,d)};b.find(".date").datepicker(a);a.filterDate&&b.find(".date").datepicker("setDate",a.filterDate);g.$table.bind("filterReset",function(){b.find(".date").val("").datepicker("option","currentText","");f.length&&f.find(".date").val("").datepicker("option","currentText","")});g.$table.bind("stickyHeadersInit",function(){f=g.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty(); a.compareOptions?f.append(c).find(".compare").bind("change",function(){n(k(this).val())}):a.cellText&&f.append(c);f.append(l).find(".date").datepicker(a)});return d.val(a.defaultDate?a.defaultDate:"")},uiDatepicker:function(b,e,h){var a=k.extend({from:"",to:"",textFrom:"from",textTo:"to",changeMonth:!0,changeYear:!0,numberOfMonths:1},h),d,l,c,f=[];h=k('<input class="dateRange" type="hidden">').appendTo(b).bind("change.tsfilter",function(){var a=this.value;a.match(" - ")?(a=a.split(" - "),b.find(".dateTo").val(a[1]), c(a[0])):a.match(">=")?c(a.replace(">=","")):a.match("<=")&&l(a.replace("<=",""))});var g=b.closest("table")[0].config;b.closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed");d="<label>"+a.textFrom+'</label><input type="text" class="dateFrom" /><label>'+a.textTo+'</label><input type="text" class="dateTo" />';k(d).appendTo(b);a.oldonClose=a.onClose;var n=a.defaultDate=a.from||a.defaultDate;c=a.onClose=function(c,d){var g=(new Date(c)).getTime()||"",e=(new Date(b.find(".dateTo").datepicker("getDate"))).getTime()|| "",g=g?e?g+" - "+e:">="+g:e?"<="+e:"";b.find(".dateRange").val(g).trigger("search").end().find(".dateTo").datepicker("option","minDate",c).end().find(".dateFrom").val(c);f.length&&f.find(".dateTo").datepicker("option","minDate",c).end().find(".dateFrom").val(c);"function"===typeof a.oldonClose&&a.oldonClose(c,d)};b.find(".dateFrom").datepicker(a);a.defaultDate=a.to||"+7d";l=a.onClose=function(c,d){var g=(new Date(b.find(".dateFrom").datepicker("getDate"))).getTime()||"",e=(new Date(c)).getTime()|| "",g=g?e?g+" - "+e:">="+g:e?"<="+e:"";b.find(".dateRange").val(g).trigger("search").end().find(".dateFrom").datepicker("option","maxDate",c).end().find(".dateTo").val(c);f.length&&f.find(".dateFrom").datepicker("option","maxDate",c).end().find(".dateTo").val(c);"function"===typeof a.oldonClose&&a.oldonClose(c,d)};b.find(".dateTo").datepicker(a);g.$table.bind("stickyHeadersInit",function(){f=g.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();f.append(d);a.onClose=l;f.find(".dateTo").datepicker(a); a.defaultDate=n;a.onClose=c;f.find(".dateFrom").datepicker(a)});b.closest("table").bind("filterReset",function(){b.find(".dateFrom, .dateTo").val("").datepicker("option","currentText","");f.length&&f.find(".dateFrom, .dateTo").val("").datepicker("option","currentText","")});return h.val(a.from?a.to?a.from+" - "+a.to:">="+a.from:a.to?"<="+a.to:"")},html5Number:function(b,e,h){var a,d=k.extend({value:0,min:0,max:100,step:1,delayed:!0,disabled:!1,addToggle:!0,exactMatch:!0,compare:"",compareOptions:!1, skipTest:!1},h);h=k('<input type="number" style="visibility:hidden;" value="test">').appendTo(b);var l=d.skipTest||"number"===h.attr("type")&&"test"!==h.val(),c,f=[],g=b.closest("table")[0].config,n=function(a){var c=b.find(".number").val();b.find(".compare").val(a);b.find("input[type=hidden]").val(a+c).trigger("search",d.delayed).end();f.length&&f.find(".compare").val(a)},m=function(a,c){var g=d.addToggle?b.find(".toggle").is(":checked"):!0,e=b.find(".compare").val()||d.compare;b.find("input[type=hidden]").val(!d.addToggle|| g?(d.compare?d.compare:d.exactMatch?"=":"")+a:"").val(!d.addToggle||g?e+a:"").trigger("search",c?c:d.delayed).end().find(".number").val(a);b.find(".number").length&&(b.find(".number")[0].disabled=d.disabled||!g);f.length&&(f.find(".number").val(a)[0].disabled=d.disabled||!g,d.addToggle&&(f.find(".toggle")[0].checked=g))};h.remove();l&&(c=d.addToggle?'<div class="button"><input id="html5button'+e+'" type="checkbox" class="toggle" /><label for="html5button'+e+'"></label></div>':"");if(d.compareOptions){c= '<select class="compare">';for(var p in d.compareOptions)c+='<option value="'+p+'"',p===d.compare&&(c+=' selected="selected"'),c+=">"+p+"</option>";c+="</select>";b.append(c).find(".compare").bind("change",function(){n(k(this).val())})}else c&&b.append(c);l&&(a='<input class="number" type="number" min="'+d.min+'" max="'+d.max+'" value="'+d.value+'" step="'+d.step+'" />',b.append(a+'<input type="hidden" />').find(".toggle, .number").bind("change",function(){m(b.find(".number").val())}).closest("thead").find("th[data-column="+ e+"]").addClass("filter-parsed").closest("table").bind("filterReset",function(){d.addToggle&&(b.find(".toggle")[0].checked=!1,f.length&&(f.find(".toggle")[0].checked=!1));m(b.find(".number").val())}),g.$table.bind("stickyHeadersInit",function(){f=g.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty();d.compareOptions?f.append(c).find(".compare").bind("change",function(){n(k(this).val())}):f.append(c);f.append(a).find(".toggle, .number").bind("change",function(){m(f.find(".number").val())}); m(b.find(".number").val())}),m(b.find(".number").val()));return l?b.find('input[type="hidden"]'):k('<input type="search">')},html5Range:function(b,e,h){var a=k.extend({value:0,min:0,max:100,step:1,delayed:!0,valueToHeader:!0,exactMatch:!0,compare:"",allText:"all",skipTest:!1},h);h=k('<input type="range" style="visibility:hidden;" value="test">').appendTo(b);var d=a.skipTest||"range"===h.attr("type")&&"test"!==h.val(),l=[],c=b.closest("table")[0].config,f=function(c,d){c=(c+"").replace(/[<>=]/g,"")|| a.min;var f=" ("+(a.compare?a.compare+c:c==a.min?a.allText:c)+")";b.find("input[type=hidden]").val(a.compare?a.compare+c:c==a.min?"":(a.exactMatch?"=":"")+c).trigger("search",d?d:a.delayed).end().find(".range").val(c);b.closest("thead").find("th[data-column="+e+"]").find(".curvalue").html(f);l.length&&(l.find(".range").val(c),l.closest("thead").find("th[data-column="+e+"]").find(".curvalue").html(f))};h.remove();d&&(b.html('<input type="hidden"><input class="range" type="range" min="'+a.min+'" max="'+ a.max+'" value="'+a.value+'" />').closest("thead").find("th[data-column="+e+"]").addClass("filter-parsed").find(".tablesorter-header-inner").append('<span class="curvalue" />'),b.find(".range").bind("change",function(){f(this.value)}),b.find("input[type=hidden]").bind("change.tsfilter",function(){var b=this.value;b!==this.lastValue&&(this.value=this.lastValue=a.compare?a.compare+b:b==a.min?"":(a.exactMatch?"=":"")+b,f(b))}),c.$table.bind("stickyHeadersInit",function(){l=c.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e).empty(); l.html('<input class="range" type="range" min="'+a.min+'" max="'+a.max+'" value="'+a.value+'" />').find(".range").bind("change",function(){f(l.find(".range").val())});f(b.find(".range").val())}),b.closest("table").bind("filterReset",function(){f(a.value)}),f(b.find(".range").val()));return d?b.find('input[type="hidden"]'):k('<input type="search">')},html5Color:function(b,e,h){var a,d=k.extend({value:"#000000",disabled:!1,addToggle:!0,exactMatch:!0,valueToHeader:!1,skipTest:!1},h);h=k('<input type="color" style="visibility:hidden;" value="test">').appendTo(b); var l=d.skipTest||"color"===h.attr("type")&&"test"!==h.val(),c=[],f=b.closest("table")[0].config,g=function(a){a=a||d.value;var f=!0,g=" ("+a+")";d.addToggle&&(f=b.find(".toggle").is(":checked"));b.find(".colorpicker").length&&(b.find(".colorpicker").val(a)[0].disabled=d.disabled||!f);b.find("input[type=hidden]").val(f?a+(d.exactMatch?"=":""):"").trigger("search");d.valueToHeader?b.closest("thead").find("th[data-column="+e+"]").find(".curcolor").html(g):b.find(".currentColor").html(g);c.length&&(c.find(".colorpicker").val(a)[0].disabled= d.disabled||!f,d.addToggle&&(c.find(".toggle")[0].checked=f),d.valueToHeader?c.closest("thead").find("th[data-column="+e+"]").find(".curcolor").html(g):c.find(".currentColor").html(g))};h.remove();l&&(a='<div class="color-controls-wrapper">',a+=d.addToggle?'<div class="button"><input id="colorbutton'+e+'" type="checkbox" class="toggle" /><label for="colorbutton'+e+'"></label></div>':"",a+='<input type="hidden"><input class="colorpicker" type="color" />',a+=(d.valueToHeader?"":'<span class="currentColor">(#000000)</span>')+ "</div>",b.html(a),d.valueToHeader&&b.closest("thead").find("th[data-column="+e+"]").find(".tablesorter-header-inner").append('<span class="curcolor" />'),b.find(".toggle, .colorpicker").bind("change",function(){g(b.find(".colorpicker").val())}),b.find("input[type=hidden]").bind("change.tsfilter",function(){g(this.value)}),b.closest("table").bind("filterReset",function(){b.find(".toggle")[0].checked=!1;g(b.find(".colorpicker").val())}),f.$table.bind("stickyHeadersInit",function(){c=f.widgetOptions.$sticky.find(".tablesorter-filter-row").children().eq(e); c.html(a).find(".toggle, .colorpicker").bind("change",function(){g(c.find(".colorpicker").val())});g(c.find(".colorpicker").val())}),g(d.value));return l?b.find('input[type="hidden"]'):k('<input type="search">')}}})(jQuery);