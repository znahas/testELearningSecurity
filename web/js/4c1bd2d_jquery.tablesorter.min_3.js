/*!
 * TableSorter 2.12.0 min - Client-side table sorting with ease!
 * Copyright (c) 2007 Christian Bach
 */
!(function(g)
{
    g.extend({tablesorter: new function()
    {
        function c(a)
        {
            "undefined" !== typeof console && "undefined" !== typeof console.log ? console.log(a) : alert(a)
        }

        function l(a, b)
        {
            c(a + " (" + ((new Date).getTime() - b.getTime()) + "ms)")
        }

        function m(a)
        {
            for (var b in a) {
                return!1;
            }
            return!0
        }

        function p(a, b, d)
        {
            if (!b) {
                return"";
            }
            var h = a.config, c = h.textExtraction, f = "", f = "simple" === c ? h.supportsTextContent ? b.textContent : g(b).text() : "function" === typeof c ? c(b, a, d) : "object" === typeof c && c.hasOwnProperty(d) ? c[d](b, a, d) : h.supportsTextContent ? b.textContent : g(b).text();
            return g.trim(f)
        }

        function x(a)
        {
            var b = a.config, d = b.$tbodies = b.$table.children("tbody:not(." + b.cssInfoBlock + ")"), h, y, f, k, r, g, n = "";
            if (0 === d.length) {
                return b.debug ? c("*Empty table!* Not building a parser cache") : "";
            }
            d = d[0].rows;
            if (d[0]) {
                for (h = [], y = d[0].cells.length, f = 0; f < y; f++) {
                    k = b.$headers.filter(":not([colspan])");
                    k = k.add(b.$headers.filter('[colspan="1"]')).filter('[data-column="' + f + '"]:last');
                    r = b.headers[f];
                    g = e.getParserById(e.getData(k, r, "sorter"));
                    b.empties[f] = e.getData(k, r, "empty") || b.emptyTo || (b.emptyToBottom ? "bottom" : "top");
                    b.strings[f] = e.getData(k, r, "string") || b.stringTo || "max";
                    if (!g) {
                        a:{
                            k = a;
                            r = d;
                            g = -1;
                            for (var A = f, l = void 0, m = e.parsers.length, t = !1, v = "", l = !0; "" === v && l;) {
                                g++, r[g] ? (t = r[g].cells[A], v = p(k, t, A), k.config.debug && c("Checking if value was empty on row " + g + ", column: " + A + ': "' + v + '"')) : l = !1;
                            }
                            for (; 0 <= --m;) {
                                if ((l = e.parsers[m]) && "text" !== l.id && l.is && l.is(v, k, t)) {
                                    g = l;
                                    break a
                                }
                            }
                            g = e.getParserById("text")
                        }
                    }
                    b.debug && (n += "column:" + f + "; parser:" + g.id + "; string:" + b.strings[f] + "; empty: " + b.empties[f] + "\n");
                    h.push(g)
                }
            }
            b.debug && c(n);
            b.parsers = h
        }

        function z(a)
        {
            var b = a.tBodies, d = a.config, h, y, f = d.parsers, k, r, q, n, A, m, w, t = [];
            d.cache = {};
            if (!f) {
                return d.debug ? c("*Empty table!* Not building a cache") : "";
            }
            d.debug && (w = new Date);
            d.showProcessing && e.isProcessing(a, !0);
            for (n = 0; n < b.length; n++) {
                if (d.cache[n] = {row: [], normalized: []}, !g(b[n]).hasClass(d.cssInfoBlock)) {
                    h = b[n] && b[n].rows.length || 0;
                    y = b[n].rows[0] && b[n].rows[0].cells.length || 0;
                    for (r = 0; r < h; ++r) {
                        if (A = g(b[n].rows[r]), m = [], A.hasClass(d.cssChildRow)) {
                            d.cache[n].row[d.cache[n].row.length - 1] = d.cache[n].row[d.cache[n].row.length - 1].add(A);
                        } else {
                            d.cache[n].row.push(A);
                            for (q = 0; q < y; ++q) {
                                k = p(a, A[0].cells[q], q), k = f[q].format(k, a, A[0].cells[q], q), m.push(k), "numeric" === (f[q].type || "").toLowerCase() && (t[q] = Math.max(Math.abs(k) || 0, t[q] || 0));
                            }
                            m.push(d.cache[n].normalized.length);
                            d.cache[n].normalized.push(m)
                        }
                    }
                    d.cache[n].colMax = t
                }
            }
            d.showProcessing && e.isProcessing(a);
            d.debug && l("Building cache for " + h + " rows", w)
        }

        function B(a, b)
        {
            var d = a.config, h = a.tBodies, c = [], f = d.cache, k, r, q, n, A, p, w, t, v, s, u;
            if (!m(f)) {
                d.debug && (u = new Date);
                for (t = 0; t < h.length; t++) {
                    if (k = g(h[t]), k.length && !k.hasClass(d.cssInfoBlock)) {
                        A = e.processTbody(a, k, !0);
                        k = f[t].row;
                        r = f[t].normalized;
                        n = (q = r.length) ? r[0].length - 1 : 0;
                        for (p = 0; p < q; p++) {
                            if (s = r[p][n], c.push(k[s]), !d.appender || !d.removeRows) {
                                for (v = k[s].length, w = 0; w < v; w++) {
                                    A.append(k[s][w]);
                                }
                            }
                        }
                        e.processTbody(a, A, !1)
                    }
                }
                d.appender && d.appender(a, c);
                d.debug && l("Rebuilt table", u);
                b || e.applyWidget(a);
                g(a).trigger("sortEnd", a);
                g(a).trigger("updateComplete", a)
            }
        }

        function E(a)
        {
            var b = [], d = {}, h = 0, c = g(a).find("thead:eq(0), tfoot").children("tr"), f, k, e, q, n, l, m, p, t, v;
            for (f = 0; f < c.length; f++) {
                for (n = c[f].cells, k = 0; k < n.length; k++) {
                    q = n[k];
                    l = q.parentNode.rowIndex;
                    m = l + "-" + q.cellIndex;
                    p = q.rowSpan || 1;
                    t = q.colSpan || 1;
                    "undefined" === typeof b[l] && (b[l] = []);
                    for (e = 0; e < b[l].length + 1; e++) {
                        if ("undefined" === typeof b[l][e]) {
                            v = e;
                            break
                        }
                    }
                    d[m] = v;
                    h = Math.max(v, h);
                    g(q).attr({"data-column": v});
                    for (e = l; e < l + p; e++) {
                        for ("undefined" === typeof b[e] && (b[e] = []), m = b[e], q = v; q < v + t; q++) {
                            m[q] = "x"
                        }
                    }
                }
            }
            a.config.columns = h + 1;
            return d
        }

        function C(a)
        {
            var b = E(a), d, h, y, f, k, r, q, n = a.config;
            n.headerList = [];
            n.headerContent = [];
            n.debug && (q = new Date);
            f = n.cssIcon ? '<i class="' + n.cssIcon + " " + e.css.icon + '"></i>' : "";
            n.$headers = g(a).find(n.selectorHeaders).each(function(a)
            {
                h = g(this);
                d = n.headers[a];
                n.headerContent[a] = g(this).html();
                k = n.headerTemplate.replace(/\{content\}/g, g(this).html()).replace(/\{icon\}/g, f);
                n.onRenderTemplate && (y = n.onRenderTemplate.apply(h, [a, k])) && "string" === typeof y && (k = y);
                g(this).html('<div class="tablesorter-header-inner">' + k + "</div>");
                n.onRenderHeader && n.onRenderHeader.apply(h, [a]);
                this.column = b[this.parentNode.rowIndex + "-" + this.cellIndex];
                var c = e.getData(h, d, "sortInitialOrder") || n.sortInitialOrder;
                this.order = /^d/i.test(c) || 1 === c ? [1, 0, 2] : [0, 1, 2];
                this.count = -1;
                this.lockedOrder = !1;
                r = e.getData(h, d, "lockedOrder") || !1;
                "undefined" !== typeof r && !1 !== r && (this.order = this.lockedOrder = /^d/i.test(r) || 1 === r ? [1, 1, 1] : [0, 0, 0]);
                h.addClass(e.css.header + " " + n.cssHeader);
                n.headerList[a] = this;
                h.parent().addClass(e.css.headerRow + " " + n.cssHeaderRow);
                h.attr("tabindex", 0)
            });
            D(a);
            n.debug && (l("Built headers:", q), c(n.$headers))
        }

        function F(a, b, d)
        {
            var h = a.config;
            h.$table.find(h.selectorRemove).remove();
            x(a);
            z(a);
            G(h.$table, b, d)
        }

        function D(a)
        {
            var b, d = a.config;
            d.$headers.each(function(a, c)
            {
                b = "false" === e.getData(c, d.headers[a], "sorter");
                c.sortDisabled = b;
                g(c)[b ? "addClass" : "removeClass"]("sorter-false")
            })
        }

        function H(a)
        {
            var b, d, h, c = a.config, f = c.sortList, k = [e.css.sortAsc + " " + c.cssAsc, e.css.sortDesc + " " + c.cssDesc], r = g(a).find("tfoot tr").children().removeClass(k.join(" "));
            c.$headers.removeClass(k.join(" "));
            h = f.length;
            for (b = 0; b < h; b++) {
                if (2 !== f[b][1] && (a = c.$headers.not(".sorter-false").filter('[data-column="' + f[b][0] + '"]' + (1 === h ? ":last" : "")), a.length)) {
                    for (d = 0; d < a.length; d++) {
                        a[d].sortDisabled || (a.eq(d).addClass(k[f[b][1]]), r.length && r.filter('[data-column="' + f[b][0] + '"]').eq(d).addClass(k[f[b][1]]))
                    }
                }
            }
        }

        function L(a)
        {
            if (a.config.widthFixed && 0 === g(a).find("colgroup").length) {
                var b = g("<colgroup>"), d = g(a).width();
                g(a.tBodies[0]).find("tr:first").children("td:visible").each(function()
                {
                    b.append(g("<col>").css("width", parseInt(g(this).width() / d * 1E3, 10) / 10 + "%"))
                });
                g(a).prepend(b)
            }
        }

        function M(a, b)
        {
            var d, h, c, f = a.config, e = b || f.sortList;
            f.sortList = [];
            g.each(e, function(a, b)
            {
                d = [parseInt(b[0], 10), parseInt(b[1], 10)];
                if (c = f.headerList[d[0]]) {
                    f.sortList.push(d), h = g.inArray(d[1], c.order), c.count = 0 <= h ? h : d[1] % (f.sortReset ? 3 : 2)
                }
            })
        }

        function N(a, b, d)
        {
            var h, c, f = a.config, k = !d[f.sortMultiSortKey], r = g(a);
            r.trigger("sortStart", a);
            b.count = d[f.sortResetKey] ? 2 : (b.count + 1) % (f.sortReset ? 3 : 2);
            f.sortRestart && (c = b, f.$headers.each(function()
            {
                this === c || !k && g(this).is("." + e.css.sortDesc + ",." + e.css.sortAsc) || (this.count = -1)
            }));
            c = b.column;
            if (k) {
                f.sortList = [];
                if (null !== f.sortForce) {
                    for (h = f.sortForce, d = 0; d < h.length; d++) {
                        h[d][0] !== c && f.sortList.push(h[d]);
                    }
                }
                h = b.order[b.count];
                if (2 > h && (f.sortList.push([c, h]), 1 < b.colSpan)) {
                    for (d = 1; d < b.colSpan; d++) {
                        f.sortList.push([c + d, h])
                    }
                }
            } else if (f.sortAppend && 1 < f.sortList.length && e.isValueInArray(f.sortAppend[0][0], f.sortList) && f.sortList.pop(), e.isValueInArray(c, f.sortList)) {
                for (d = 0; d < f.sortList.length; d++) {
                    b = f.sortList[d], h = f.headerList[b[0]], b[0] === c && (b[1] = h.order[h.count], 2 === b[1] && (f.sortList.splice(d, 1), h.count = -1));
                }
            } else if (h = b.order[b.count], 2 > h && (f.sortList.push([c, h]), 1 < b.colSpan)) {
                for (d = 1; d < b.colSpan; d++) {
                    f.sortList.push([c + d, h]);
                }
            }
            if (null !== f.sortAppend) {
                for (h = f.sortAppend, d = 0; d < h.length; d++) {
                    h[d][0] !== c && f.sortList.push(h[d]);
                }
            }
            r.trigger("sortBegin", a);
            setTimeout(function()
            {
                H(a);
                I(a);
                B(a)
            }, 1)
        }

        function I(a)
        {
            var b, d, h, c, f, k, g, q, n, p, u, w, t, v = 0, s = a.config, x = s.textSorter || "", z = s.sortList, B = z.length, C = a.tBodies.length;
            if (!s.serverSideSorting && !m(s.cache)) {
                s.debug && (p = new Date);
                for (d = 0; d < C; d++) {
                    k = s.cache[d].colMax, n = (g = s.cache[d].normalized) && g[0] ? g[0].length - 1 : 0, g.sort(function(d, g)
                    {
                        for (b = 0; b < B; b++) {
                            f = z[b][0];
                            q = z[b][1];
                            w = (v = 0 === q) ? d : g;
                            t = v ? g : d;
                            h = s.string[s.empties[f] || s.emptyTo];
                            if ("" === w[f] && 0 !== h) {
                                return("boolean" === typeof h ? h ? -1 : 1 : h || 1) * (v ? 1 : -1);
                            }
                            if ("" === t[f] && 0 !== h) {
                                return("boolean" === typeof h ? h ? 1 : -1 : -h || -1) * (v ? 1 : -1);
                            }
                            (c = /n/i.test(s.parsers && s.parsers[f] ? s.parsers[f].type || "" : "")) && s.strings[f] ? (c = "boolean" === typeof s.string[s.strings[f]] ? (v ? 1 : -1) * (s.string[s.strings[f]] ? -1 : 1) : s.strings[f] ? s.string[s.strings[f]] || 0 : 0, u = s.numberSorter ? s.numberSorter(w[f], t[f], v, k[f], a) : e.sortNumeric(w[f], t[f], c, k[f])) : u = "function" === typeof x ? x(w[f], t[f], v, f, a) : "object" === typeof x && x.hasOwnProperty(f) ? x[f](w[f], t[f], v, f, a) : e.sortNatural(w[f], t[f]);
                            if (u) {
                                return u
                            }
                        }
                        return d[n] - g[n]
                    });
                }
                s.debug && l("Sorting on " + z.toString() + " and dir " + q + " time", p)
            }
        }

        function J(a, b)
        {
            var d = a[0].config;
            d.pager && !d.pager.ajax && a.trigger("updateComplete");
            "function" === typeof b && b(a[0])
        }

        function G(a, b, d)
        {
            !1 === b || a[0].isProcessing ? J(a, d) : a.trigger("sorton", [a[0].config.sortList, function()
            {
                J(a, d)
            }])
        }

        function K(a)
        {
            var b = a.config, d = b.$table, h, c;
            b.$headers.find(b.selectorSort).add(b.$headers.filter(b.selectorSort)).unbind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter").bind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter", function(d, h)
            {
                if (!(1 !== (d.which || d.button) && !/sort|keypress/.test(d.type) || "keypress" === d.type && 13 !== d.which || "mouseup" === d.type && !0 !== h && 250 < (new Date).getTime() - c)) {
                    if ("mousedown" === d.type) {
                        return c = (new Date).getTime(), "INPUT" === d.target.tagName ? "" : !b.cancelSelection;
                    }
                    b.delayInit && m(b.cache) && z(a);
                    var e = (/TH|TD/.test(this.tagName) ? g(this) : g(this).parents("th, td").filter(":first"))[0];
                    e.sortDisabled || N(a, e, d)
                }
            });
            b.cancelSelection && b.$headers.attr("unselectable", "on").bind("selectstart", !1).css({"user-select": "none", MozUserSelect: "none"});
            d.unbind("sortReset update updateRows updateCell updateAll addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(".tablesorter ")).bind("sortReset.tablesorter",function(d)
            {
                d.stopPropagation();
                b.sortList = [];
                H(a);
                I(a);
                B(a)
            }).bind("updateAll.tablesorter",function(b, d, h)
            {
                b.stopPropagation();
                e.refreshWidgets(a, !0, !0);
                e.restoreHeaders(a);
                C(a);
                K(a);
                F(a, d, h)
            }).bind("update.tablesorter updateRows.tablesorter",function(b, d, h)
            {
                b.stopPropagation();
                D(a);
                F(a, d, h)
            }).bind("updateCell.tablesorter",function(h, c, e, l)
            {
                h.stopPropagation();
                d.find(b.selectorRemove).remove();
                var n, y, m;
                n = d.find("tbody");
                h = n.index(g(c).parents("tbody").filter(":first"));
                var w = g(c).parents("tr").filter(":first");
                c = g(c)[0];
                n.length && 0 <= h && (y = n.eq(h).find("tr").index(w), m = c.cellIndex, n = b.cache[h].normalized[y].length - 1, b.cache[h].row[a.config.cache[h].normalized[y][n]] = w, b.cache[h].normalized[y][m] = b.parsers[m].format(p(a, c, m), a, c, m), G(d, e, l))
            }).bind("addRows.tablesorter",function(c, e, g, l)
            {
                c.stopPropagation();
                var n = e.filter("tr").length, y = [], m = e[0].cells.length, w = d.find("tbody").index(e.parents("tbody").filter(":first"));
                b.parsers || x(a);
                for (c = 0; c < n; c++) {
                    for (h = 0; h < m; h++) {
                        y[h] = b.parsers[h].format(p(a, e[c].cells[h], h), a, e[c].cells[h], h);
                    }
                    y.push(b.cache[w].row.length);
                    b.cache[w].row.push([e[c]]);
                    b.cache[w].normalized.push(y);
                    y = []
                }
                G(d, g, l)
            }).bind("sorton.tablesorter",function(b, c, h, e)
            {
                var g = a.config;
                b.stopPropagation();
                d.trigger("sortStart", this);
                M(a, c);
                H(a);
                g.delayInit && m(g.cache) && z(a);
                d.trigger("sortBegin", this);
                I(a);
                B(a, e);
                "function" === typeof h && h(a)
            }).bind("appendCache.tablesorter",function(b, d, c)
            {
                b.stopPropagation();
                B(a, c);
                "function" === typeof d && d(a)
            }).bind("applyWidgetId.tablesorter",function(d, c)
            {
                d.stopPropagation();
                e.getWidgetById(c).format(a, b, b.widgetOptions)
            }).bind("applyWidgets.tablesorter",function(b, d)
            {
                b.stopPropagation();
                e.applyWidget(a, d)
            }).bind("refreshWidgets.tablesorter",function(b, d, c)
            {
                b.stopPropagation();
                e.refreshWidgets(a, d, c)
            }).bind("destroy.tablesorter", function(b, d, c)
            {
                b.stopPropagation();
                e.destroy(a, d, c)
            })
        }

        var e = this;
        e.version = "2.12.0";
        e.parsers = [];
        e.widgets = [];
        e.defaults = {theme: "default", widthFixed: !1, showProcessing: !1, headerTemplate: "{content}", onRenderTemplate: null, onRenderHeader: null, cancelSelection: !0, dateFormat: "mmddyyyy", sortMultiSortKey: "shiftKey", sortResetKey: "ctrlKey", usNumberFormat: !0, delayInit: !1, serverSideSorting: !1, headers: {}, ignoreCase: !0, sortForce: null, sortList: [], sortAppend: null, sortInitialOrder: "asc", sortLocaleCompare: !1, sortReset: !1, sortRestart: !1, emptyTo: "bottom", stringTo: "max", textExtraction: "simple", textSorter: null, numberSorter: null, widgets: [], widgetOptions: {zebra: ["even", "odd"]}, initWidgets: !0, initialized: null, tableClass: "", cssAsc: "", cssDesc: "", cssHeader: "", cssHeaderRow: "", cssProcessing: "", cssChildRow: "tablesorter-childRow", cssIcon: "tablesorter-icon", cssInfoBlock: "tablesorter-infoOnly", selectorHeaders: "> thead th, > thead td", selectorSort: "th, td", selectorRemove: ".remove-me", debug: !1, headerList: [], empties: {}, strings: {}, parsers: []};
        e.css = {table: "tablesorter", childRow: "tablesorter-childRow", header: "tablesorter-header", headerRow: "tablesorter-headerRow", icon: "tablesorter-icon", info: "tablesorter-infoOnly", processing: "tablesorter-processing", sortAsc: "tablesorter-headerAsc", sortDesc: "tablesorter-headerDesc"};
        e.log = c;
        e.benchmark = l;
        e.construct = function(a)
        {
            return this.each(function()
            {
                var b = g.extend(!0, {}, e.defaults, a);
                !this.hasInitialized && e.buildTable && "TABLE" !== this.tagName && e.buildTable(this, b);
                e.setup(this, b)
            })
        };
        e.setup = function(a, b)
        {
            if (!a || !a.tHead || 0 === a.tBodies.length || !0 === a.hasInitialized) {
                return b.debug ? c("stopping initialization! No table, thead, tbody or tablesorter has already been initialized") : "";
            }
            var d = "", h = g(a), l = g.metadata;
            a.hasInitialized = !1;
            a.isProcessing = !0;
            a.config = b;
            g.data(a, "tablesorter", b);
            b.debug && g.data(a, "startoveralltimer", new Date);
            b.supportsTextContent = "x" === g("<span>x</span>")[0].textContent;
            b.supportsDataObject = function(a)
            {
                a[0] = parseInt(a[0], 10);
                return 1 < a[0] || 1 === a[0] && 4 <= parseInt(a[1], 10)
            }(g.fn.jquery.split("."));
            b.string = {max: 1, min: -1, "max+": 1, "max-": -1, zero: 0, none: 0, "null": 0, top: !0, bottom: !1};
            /tablesorter\-/.test(h.attr("class")) || (d = "" !== b.theme ? " tablesorter-" + b.theme : "");
            b.$table = h.addClass(e.css.table + " " + b.tableClass + d);
            b.$tbodies = h.children("tbody:not(." + b.cssInfoBlock + ")");
            b.widgetInit = {};
            C(a);
            L(a);
            x(a);
            b.delayInit || z(a);
            K(a);
            b.supportsDataObject && "undefined" !== typeof h.data().sortlist ? b.sortList = h.data().sortlist : l && h.metadata() && h.metadata().sortlist && (b.sortList = h.metadata().sortlist);
            e.applyWidget(a, !0);
            0 < b.sortList.length ? h.trigger("sorton", [b.sortList, {}, !b.initWidgets]) : b.initWidgets && e.applyWidget(a);
            b.showProcessing && h.unbind("sortBegin.tablesorter sortEnd.tablesorter").bind("sortBegin.tablesorter sortEnd.tablesorter", function(b)
            {
                e.isProcessing(a, "sortBegin" === b.type)
            });
            a.hasInitialized = !0;
            a.isProcessing = !1;
            b.debug && e.benchmark("Overall initialization time", g.data(a, "startoveralltimer"));
            h.trigger("tablesorter-initialized", a);
            "function" === typeof b.initialized && b.initialized(a)
        };
        e.isProcessing = function(a, b, d)
        {
            a = g(a);
            var c = a[0].config;
            a = d || a.find("." + e.css.header);
            b ? (0 < c.sortList.length && (a = a.filter(function()
            {
                return this.sortDisabled ? !1 : e.isValueInArray(parseFloat(g(this).attr("data-column")), c.sortList)
            })), a.addClass(e.css.processing + " " + c.cssProcessing)) : a.removeClass(e.css.processing + " " + c.cssProcessing)
        };
        e.processTbody = function(a, b, d)
        {
            if (d) {
                return a.isProcessing = !0, b.before('<span class="tablesorter-savemyplace"/>'), d = g.fn.detach ? b.detach() : b.remove();
            }
            d = g(a).find("span.tablesorter-savemyplace");
            b.insertAfter(d);
            d.remove();
            a.isProcessing = !1
        };
        e.clearTableBody = function(a)
        {
            g(a)[0].config.$tbodies.empty()
        };
        e.restoreHeaders = function(a)
        {
            var b = a.config;
            b.$table.find(b.selectorHeaders).each(function(a)
            {
                g(this).find(".tablesorter-header-inner").length && g(this).html(b.headerContent[a])
            })
        };
        e.destroy = function(a, b, d)
        {
            a = g(a)[0];
            if (a.hasInitialized) {
                e.refreshWidgets(a, !0, !0);
                var c = g(a), l = a.config, f = c.find("thead:first"), k = f.find("tr." + e.css.headerRow).removeClass(e.css.headerRow + " " + l.cssHeaderRow), m = c.find("tfoot:first > tr").children("th, td");
                f.find("tr").not(k).remove();
                c.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd ".split(" ").join(".tablesorter "));
                l.$headers.add(m).removeClass([e.css.header, l.cssHeader, l.cssAsc, l.cssDesc, e.css.sortAsc, e.css.sortDesc].join(" ")).removeAttr("data-column");
                k.find(l.selectorSort).unbind("mousedown.tablesorter mouseup.tablesorter keypress.tablesorter");
                e.restoreHeaders(a);
                !1 !== b && c.removeClass(e.css.table + " " + l.tableClass + " tablesorter-" + l.theme);
                a.hasInitialized = !1;
                "function" === typeof d && d(a)
            }
        };
        e.regex = {chunk: /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, hex: /^0x[0-9a-f]+$/i};
        e.sortNatural = function(a, b)
        {
            if (a === b) {
                return 0;
            }
            var d, c, g, f, k, l;
            c = e.regex;
            if (g = parseInt(b.match(c.hex), 16)) {
                d = parseInt(a.match(c.hex), 16);
                if (d < g) {
                    return-1;
                }
                if (d > g) {
                    return 1
                }
            }
            d = a.replace(c.chunk, "\\0$1\\0").replace(/\\0$/, "").replace(/^\\0/, "").split("\\0");
            c = b.replace(c.chunk, "\\0$1\\0").replace(/\\0$/, "").replace(/^\\0/, "").split("\\0");
            l = Math.max(d.length, c.length);
            for (k = 0; k < l; k++) {
                g = isNaN(d[k]) ? d[k] || 0 : parseFloat(d[k]) || 0;
                f = isNaN(c[k]) ? c[k] || 0 : parseFloat(c[k]) || 0;
                if (isNaN(g) !== isNaN(f)) {
                    return isNaN(g) ? 1 : -1;
                }
                typeof g !== typeof f && (g += "", f += "");
                if (g < f) {
                    return-1;
                }
                if (g > f) {
                    return 1
                }
            }
            return 0
        };
        e.sortText = function(a, b)
        {
            return a > b ? 1 : a < b ? -1 : 0
        };
        e.getTextValue = function(a, b, d)
        {
            if (d) {
                var c = a ? a.length : 0, e = d + b;
                for (d = 0; d < c; d++) {
                    e += a.charCodeAt(d);
                }
                return b * e
            }
            return 0
        };
        e.sortNumeric = function(a, b, d, c)
        {
            if (a === b) {
                return 0;
            }
            isNaN(a) && (a = e.getTextValue(a, d, c));
            isNaN(b) && (b = e.getTextValue(b, d, c));
            return a - b
        };
        e.characterEquivalents = {a: "\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5", A: "\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5", c: "\u00e7\u0107\u010d", C: "\u00c7\u0106\u010c", e: "\u00e9\u00e8\u00ea\u00eb\u011b\u0119", E: "\u00c9\u00c8\u00ca\u00cb\u011a\u0118", i: "\u00ed\u00ec\u0130\u00ee\u00ef\u0131", I: "\u00cd\u00cc\u0130\u00ce\u00cf", o: "\u00f3\u00f2\u00f4\u00f5\u00f6", O: "\u00d3\u00d2\u00d4\u00d5\u00d6", ss: "\u00df", SS: "\u1e9e", u: "\u00fa\u00f9\u00fb\u00fc\u016f", U: "\u00da\u00d9\u00db\u00dc\u016e"};
        e.replaceAccents = function(a)
        {
            var b, d = "[", c = e.characterEquivalents;
            if (!e.characterRegex) {
                e.characterRegexArray = {};
                for (b in c) {
                    "string" === typeof b && (d += c[b], e.characterRegexArray[b] = RegExp("[" + c[b] + "]", "g"));
                }
                e.characterRegex = RegExp(d + "]")
            }
            if (e.characterRegex.test(a)) {
                for (b in c) {
                    "string" === typeof b && (a = a.replace(e.characterRegexArray[b], b));
                }
            }
            return a
        };
        e.isValueInArray = function(a, b)
        {
            var d, c = b.length;
            for (d = 0; d < c; d++) {
                if (b[d][0] === a) {
                    return!0;
                }
            }
            return!1
        };
        e.addParser = function(a)
        {
            var b, d = e.parsers.length, c = !0;
            for (b = 0; b < d; b++) {
                e.parsers[b].id.toLowerCase() === a.id.toLowerCase() && (c = !1);
            }
            c && e.parsers.push(a)
        };
        e.getParserById = function(a)
        {
            var b, d = e.parsers.length;
            for (b = 0; b < d; b++) {
                if (e.parsers[b].id.toLowerCase() === a.toString().toLowerCase()) {
                    return e.parsers[b];
                }
            }
            return!1
        };
        e.addWidget = function(a)
        {
            e.widgets.push(a)
        };
        e.getWidgetById = function(a)
        {
            var b, d, c = e.widgets.length;
            for (b = 0; b < c; b++) {
                if ((d = e.widgets[b]) && d.hasOwnProperty("id") && d.id.toLowerCase() === a.toLowerCase()) {
                    return d
                }
            }
        };
        e.applyWidget = function(a, b)
        {
            a = g(a)[0];
            var d = a.config, c = d.widgetOptions, m = [], f, k, p;
            d.debug && (f = new Date);
            d.widgets.length && (d.widgets = g.grep(d.widgets, function(a, b)
            {
                return g.inArray(a, d.widgets) === b
            }), g.each(d.widgets || [], function(a, b)
            {
                (p = e.getWidgetById(b)) && p.id && (p.priority || (p.priority = 10), m[a] = p)
            }), m.sort(function(a, b)
            {
                return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1
            }), g.each(m, function(e, f)
            {
                if (f) {
                    if (b || !d.widgetInit[f.id]) {
                        f.hasOwnProperty("options") && (c = a.config.widgetOptions = g.extend(!0, {}, f.options, c), d.widgetInit[f.id] = !0), f.hasOwnProperty("init") && f.init(a, f, d, c);
                    }
                    !b && f.hasOwnProperty("format") && f.format(a, d, c, !1)
                }
            }));
            d.debug && (k = d.widgets.length, l("Completed " + (!0 === b ? "initializing " : "applying ") + k + " widget" + (1 !== k ? "s" : ""), f))
        };
        e.refreshWidgets = function(a, b, d)
        {
            a = g(a)[0];
            var h, l = a.config, f = l.widgets, k = e.widgets, m = k.length;
            for (h = 0; h < m; h++) {
                k[h] && k[h].id && (b || 0 > g.inArray(k[h].id, f)) && (l.debug && c("Refeshing widgets: Removing " + k[h].id), k[h].hasOwnProperty("remove") && (k[h].remove(a, l, l.widgetOptions), l.widgetInit[k[h].id] = !1));
            }
            !0 !== d && e.applyWidget(a, b)
        };
        e.getData = function(a, b, d)
        {
            var c = "";
            a = g(a);
            var e, f;
            if (!a.length) {
                return"";
            }
            e = g.metadata ? a.metadata() : !1;
            f = " " + (a.attr("class") || "");
            "undefined" !== typeof a.data(d) || "undefined" !== typeof a.data(d.toLowerCase()) ? c += a.data(d) || a.data(d.toLowerCase()) : e && "undefined" !== typeof e[d] ? c += e[d] : b && "undefined" !== typeof b[d] ? c += b[d] : " " !== f && f.match(" " + d + "-") && (c = f.match(RegExp("\\s" + d + "-([\\w-]+)"))[1] || "");
            return g.trim(c)
        };
        e.formatFloat = function(a, b)
        {
            if ("string" !== typeof a || "" === a) {
                return a;
            }
            var c;
            a = (b && b.config ? !1 !== b.config.usNumberFormat : "undefined" !== typeof b ? b : 1) ? a.replace(/,/g, "") : a.replace(/[\s|\.]/g, "").replace(/,/g, ".");
            /^\s*\([.\d]+\)/.test(a) && (a = a.replace(/^\s*\(/, "-").replace(/\)/, ""));
            c = parseFloat(a);
            return isNaN(c) ? g.trim(a) : c
        };
        e.isDigit = function(a)
        {
            return isNaN(a) ? /^[\-+(]?\d+[)]?$/.test(a.toString().replace(/[,.'"\s]/g, "")) : !0
        }
    }});
    var p = g.tablesorter;
    g.fn.extend({tablesorter: p.construct});
    p.addParser({id: "text", is: function()
    {
        return!0
    }, format      : function(c, l)
    {
        var m = l.config;
        c && (c = g.trim(m.ignoreCase ? c.toLocaleLowerCase() : c), c = m.sortLocaleCompare ? p.replaceAccents(c) : c);
        return c
    }, type        : "text"});
    p.addParser({id: "digit", is: function(c)
    {
        return p.isDigit(c)
    }, format      : function(c, l)
    {
        var m = p.formatFloat((c || "").replace(/[^\w,. \-()]/g, ""), l);
        return c && "number" === typeof m ? m : c ? g.trim(c && l.config.ignoreCase ? c.toLocaleLowerCase() : c) : c
    }, type        : "numeric"});
    p.addParser({id: "currency", is: function(c)
    {
        return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((c || "").replace(/[,. ]/g, ""))
    }, format      : function(c, l)
    {
        var m = p.formatFloat((c || "").replace(/[^\w,. \-()]/g, ""), l);
        return c && "number" === typeof m ? m : c ? g.trim(c && l.config.ignoreCase ? c.toLocaleLowerCase() : c) : c
    }, type        : "numeric"});
    p.addParser({id: "ipAddress", is: function(c)
    {
        return/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(c)
    }, format      : function(c, g)
    {
        var m, u = c ? c.split(".") : "", x = "", z = u.length;
        for (m = 0; m < z; m++) {
            x += ("00" + u[m]).slice(-3);
        }
        return c ? p.formatFloat(x, g) : c
    }, type        : "numeric"});
    p.addParser({id: "url", is: function(c)
    {
        return/^(https?|ftp|file):\/\//.test(c)
    }, format      : function(c)
    {
        return c ? g.trim(c.replace(/(https?|ftp|file):\/\//, "")) : c
    }, type        : "text"});
    p.addParser({id: "isoDate", is: function(c)
    {
        return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(c)
    }, format      : function(c, g)
    {
        return c ? p.formatFloat("" !== c ? (new Date(c.replace(/-/g, "/"))).getTime() || "" : "", g) : c
    }, type        : "numeric"});
    p.addParser({id: "percent", is: function(c)
    {
        return/(\d\s*?%|%\s*?\d)/.test(c) && 15 > c.length
    }, format      : function(c, g)
    {
        return c ? p.formatFloat(c.replace(/%/g, ""), g) : c
    }, type        : "numeric"});
    p.addParser({id: "usLongDate", is: function(c)
    {
        return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(c) || /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(c)
    }, format      : function(c, g)
    {
        return c ? p.formatFloat((new Date(c.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime() || "", g) : c
    }, type        : "numeric"});
    p.addParser({id: "shortDate", is: function(c)
    {
        return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((c || "").replace(/\s+/g, " ").replace(/[\-.,]/g, "/"))
    }, format      : function(c, g, m, u)
    {
        if (c) {
            m = g.config;
            var x = m.headerList[u];
            u = x.dateFormat || p.getData(x, m.headers[u], "dateFormat") || m.dateFormat;
            c = c.replace(/\s+/g, " ").replace(/[\-.,]/g, "/");
            "mmddyyyy" === u ? c = c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2") : "ddmmyyyy" === u ? c = c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1") : "yyyymmdd" === u && (c = c.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3"))
        }
        return c ? p.formatFloat((new Date(c)).getTime() || "", g) : c
    }, type        : "numeric"});
    p.addParser({id: "time", is: function(c)
    {
        return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(c)
    }, format      : function(c, g)
    {
        return c ? p.formatFloat((new Date("2000/01/01 " + c.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime() || "", g) : c
    }, type        : "numeric"});
    p.addParser({id: "metadata", is: function()
    {
        return!1
    }, format      : function(c, l, m)
    {
        c = l.config;
        c = c.parserMetadataName ? c.parserMetadataName : "sortValue";
        return g(m).metadata()[c]
    }, type        : "numeric"});
    p.addWidget({id: "zebra", priority: 90, format: function(c, l, m)
    {
        var u, x, z, B, E, C, F = RegExp(l.cssChildRow, "i"), D = l.$tbodies;
        l.debug && (E = new Date);
        for (c = 0; c < D.length; c++) {
            u = D.eq(c), C = u.children("tr").length, 1 < C && (z = 0, u = u.children("tr:visible"), u.each(function()
            {
                x = g(this);
                F.test(this.className) || z++;
                B = 0 === z % 2;
                x.removeClass(m.zebra[B ? 1 : 0]).addClass(m.zebra[B ? 0 : 1])
            }));
        }
        l.debug && p.benchmark("Applying Zebra widget", E)
    }, remove      : function(c, l, m)
    {
        var p;
        l = l.$tbodies;
        var x = (m.zebra || ["even", "odd"]).join(" ");
        for (m = 0; m < l.length; m++) {
            p = g.tablesorter.processTbody(c, l.eq(m), !0), p.children().removeClass(x), g.tablesorter.processTbody(c, p, !1)
        }
    }})
})(jQuery);
