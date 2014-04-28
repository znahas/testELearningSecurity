$.tablesorter.addParser({
    id    : "fancyNumber",
    is    : function(s)
    {
        return /^[0-9]?[0-9,\.]*$/.test(s);
    },
    format: function(s)
    {
        return jQuery.tablesorter.formatFloat(s.replace(/,/g, ''));
    },
    type  : "numeric"
});


$(document).ready(function()
    {
        onLoadJquery();
    }
); //EOF $(document).ready(function()


function onLoadJquery()
{

    $.extend($.tablesorter.themes.bootstrap, {
        // these classes are added to the table. To see other table classes available,
        // look here: http://twitter.github.com/bootstrap/base-css.html#tables
        table      : 'table table-bordered',
        header     : 'bootstrap-header', // give the header a gradient background
        footerRow  : '',
        footerCells: '',
        icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
        sortNone   : 'bootstrap-icon-unsorted ',
        sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',     // includes classes for Bootstrap v2 & v3
        sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down', // includes classes for Bootstrap v2 & v3
        active     : '', // applied when column is sorted
        hover      : '', // use custom css here - bootstrap class may not override it
        filterRow  : '', // filter row class
        even       : '', // odd row zebra striping
        odd        : ''  // even row zebra striping
    });

    // call the tablesorter plugin and apply the uitheme widget
    $(".tablesorter").tablesorter({
        // this will apply the bootstrap theme if "uitheme" widget is included
        // the widgetOptions.uitheme is no longer required to be set
        theme: "bootstrap",

        widthFixed: true,
        showProcessing: true,

        headerTemplate: '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

        // widget code contained in the jquery.tablesorter.widgets.js file
        // use the zebra stripe widget if you plan on hiding any rows (filter widget)
        widgets       : [
            "uitheme",
            "stickyHeaders",
            "zebra"//,'filter'
        ],

        widgetOptions: {
            // using the default zebra striping class name, so it actually isn't included in the theme variable above
            // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
            zebra       : ["even", "odd"],

            // If there are child rows in the table (rows with class name from "cssChildRow" option)
            // and this option is true and a match is found anywhere in the child row, then it will make that row
            // visible; default is false
            filter_childRows : false,

            // if true, a filter will be added to the top of each table column;
            // disabled by using -> headers: { 1: { filter: false } } OR add class="filter-false"
            // if you set this to false, make sure you perform a search using the second method below
            filter_columnFilters : true,

            // extra css class applied to the table row containing the filters & the inputs within that row
            filter_cssFilter : 'tablesorter-filter',

            // class added to filtered rows (rows that are not showing); needed by pager plugin
            filter_filteredRow   : 'filtered',

            // add custom filter elements to the filter row
            // see the filter formatter demos for more specifics
            filter_formatter : null,

            // add custom filter functions using this option
            // see the filter widget custom demo for more specifics on how to use this option
            filter_functions : null,

            // if true, filters are collapsed initially, but can be revealed by hovering over the grey bar immediately
            // below the header row. Additionally, tabbing through the document will open the filter row when an input gets focus
            filter_hideFilters : false,

            // Set this option to false to make the searches case sensitive
            filter_ignoreCase : true,

            // if true, search column content while the user types (with a delay)
            filter_liveSearch : true,

            // jQuery selector string of an element used to reset the filters
            filter_reset : 'button.reset',

            // Use the $.tablesorter.storage utility to save the most recent filters (default setting is false)
            filter_saveFilters : true,

            // Delay in milliseconds before the filter widget starts searching; This option prevents searching for
            // every character while typing and should make searching large tables faster.
            filter_searchDelay : 300,

            // if true, server-side filtering should be performed because client-side filtering will be disabled, but
            // the ui and events will still be used.
            filter_serversideFiltering: false,

            // Set this option to true to use the filter to find text from the start of the column
            // So typing in "a" will find "albert" but not "frank", both have a's; default is false
            filter_startsWith : false,

            // Filter using parsed content for ALL columns
            // be careful on using this on date columns as the date is parsed and stored as time in seconds
            filter_useParsedData : false

        }
    });

    $(".ts-pager").html(
        '<button type="button" class="btn first disabled">' +
            '<i class="icon-step-backward glyphicon glyphicon-step-backward"></i></button>' +
            '<button type="button" class="btn prev disabled">' +
            '<i class="icon-arrow-left glyphicon glyphicon-backward"></i></button>' +
            '<span class="pagedisplay"></span>' +
            '<button type="button" class="btn next disabled">' +
            '<i class="icon-arrow-right glyphicon glyphicon-forward"></i></button>' +
            '<button type="button" class="btn last disabled">' +
            '    <i class="icon-step-forward glyphicon glyphicon-step-forward"></i></button>' +
            '<select class="pagesize" title="Select page size">' +
            '<option selected="selected" value="10">10</option>' +
            '<option value="20">20</option>' +
            '<option value="30">30</option>' +
            '<option value="40">40</option>' +
            '</select>' +
            '<select class="pagenum" title="Select page number"></select>'
    );

    $(".tablesorter.pager").tablesorterPager({

        // target the pager markup - see the HTML block below
        container : $(".ts-pager"),

        // target the pager page select dropdown - choose a page
        cssGoto   : ".pagenum",

        // remove rows from the table to speed up the sort of large tables.
        // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
        removeRows: false,

        // output string - default is '{page}/{totalPages}';
        // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
        output    : '{startRow} - {endRow} / {filteredRows} ({totalRows})'

    });

    // Disable / Enable Pager
    // **************
    $('.togglePager').click(function(){
        var mode = /Disable/.test( $(this).text() );
        $('table').trigger( (mode ? 'disable' : 'enable') + '.pager');
        $(this).text( (mode ? 'Enable' : 'Disable') + 'Pager');
        return false;
    });

    $('table').bind('pagerChange', function(){
        // pager automatically enables when table is sorted.
        $('.togglePager').text('Disable');
    });


    $(".datepicker").datepicker({ format: "yyyy-mm-dd"});
    $(".datetimepicker").datetimepicker({ format: "yyyy-mm-dd hh:ii:ss"});

    // Enable combobox
    $('select.combobox').combobox();


    /* jquery.numeric function types */
    $("input.numeric").numeric();
    $("input.integer").numeric(false, function()
    {
        alert("Integers only");
        this.value = "";
        this.focus();
    });
    $("input.positive").numeric({ negative: false }, function()
    {
        alert("No negative values");
        this.value = "";
        this.focus();
    });
    $("input.positive-integer").numeric({ decimal: false, negative: false }, function()
    {
        alert("Positive integers only");
        this.value = "";
        this.focus();
    });
    /*******  EOF jquery.numeric  ******/

        //Prevent the double sumition of forms
    $('form').submit(function(e)
    {
        var $submit = $(this).find('input[type="submit"]');

        //Get the actual submit value
        var submitVal = $submit.val();
        var submitName = $submit.attr('name');

        //Disable the button and show "Processing"
        $submit.val('Processing').attr('disabled', true);

        //Append the submit value
        $(this).append("<input type='hidden' name='" + submitName + "' value='" + submitVal + "' />");

    });

    // Checkbox checkall class
    $('input.checkall').click(function()
    {
        var table = $(this).closest('table');
        var checkboxes = table.find('input:checkbox');
        var self = this;

        checkboxes.each(function()
        {
            $(this).prop('checked', self.checked);
        });
    });
}

function getProgramRate(programId, callback)
{
    $.post(
        '/ajax/loanprogram/getRate/' + programId,
        function(data)
        {
            callback(data);
        });
}

function getGlobalLoanSplit(callback)
{
    $.post(
        '/ajax/loan/getGlobalSplit',
        function(data)
        {
            callback(data);
        });
}


/**
 * Changes the value of the combobox dropdows using jquery
 *
 * @param {string} selected
 * @param value
 * @param {string|null} destination
 */
function comboboxChangeValue(selected, value, destination)
{
    if (typeof destination == 'undefined') {
        destination = selected;
    }

    var comboboxInput = $('input[name="' + selected + '"]');

    $('#' + destination).val(value);
    comboboxInput.val(value);
    comboboxInput.next().val($('#' + destination + ' option:selected').text());
}

