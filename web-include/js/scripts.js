(function (global) {
    global.Bideo = function () {
        this.opt = null;
        this.videoEl = null;
        this.approxLoadingRate = null;
        this._resize = null;
        this._progress = null;
        this.startTime = null;
        this.onLoadCalled = false;
        this.init = function (opt) {
            this.opt = opt = opt || {};
            var self = this;
            self._resize = self.resize.bind(this);
            self.videoEl = opt.videoEl;
            self.videoEl.addEventListener('loadedmetadata', self._resize, false);
            self.videoEl.addEventListener('canplay', function () {
                if (!self.opt.isMobile) {
                    self.opt.onLoad && self.opt.onLoad();
                    if (self.opt.autoplay !== false) self.videoEl.play();
                }
            });
            if (self.opt.resize) {
                global.addEventListener('resize', self._resize, false);
            }
            this.startTime = (new Date()).getTime();
            this.opt.src.forEach(function (srcOb, i, arr) {
                var key, val, source = document.createElement('source');
                for (key in srcOb) {
                    if (srcOb.hasOwnProperty(key)) {
                        val = srcOb[key];
                        source.setAttribute(key, val);
                    }
                }
                self.videoEl.appendChild(source);
            });
            if (self.opt.isMobile) {
                if (self.opt.playButton) {
                    self.opt.videoEl.addEventListener('timeupdate', function () {
                        if (!self.onLoadCalled) {
                            self.opt.onLoad && self.opt.onLoad();
                            self.onLoadCalled = true;
                        }
                    });
                    self.opt.playButton.addEventListener('click', function () {
                        self.opt.pauseButton.style.display = 'inline-block';
                        this.style.display = 'none';
                        self.videoEl.play();
                    }, false);
                    self.opt.pauseButton.addEventListener('click', function () {
                        this.style.display = 'none';
                        self.opt.playButton.style.display = 'inline-block';
                        self.videoEl.pause();
                    }, false);
                }
            }
            return;
        };
        this.resize = function () {
            if ('object-fit' in document.body.style) return;
            var w = this.videoEl.videoWidth,
                h = this.videoEl.videoHeight;
            var videoRatio = (w / h).toFixed(2);
            var container = this.opt.container,
                containerStyles = global.getComputedStyle(container),
                minW = parseInt(containerStyles.getPropertyValue('width')),
                minH = parseInt(containerStyles.getPropertyValue('height'));
            if (containerStyles.getPropertyValue('box-sizing') !== 'border-box') {
                var paddingTop = containerStyles.getPropertyValue('padding-top'),
                    paddingBottom = containerStyles.getPropertyValue('padding-bottom'),
                    paddingLeft = containerStyles.getPropertyValue('padding-left'),
                    paddingRight = containerStyles.getPropertyValue('padding-right');
                paddingTop = parseInt(paddingTop);
                paddingBottom = parseInt(paddingBottom);
                paddingLeft = parseInt(paddingLeft);
                paddingRight = parseInt(paddingRight);
                minW += paddingLeft + paddingRight;
                minH += paddingTop + paddingBottom;
            }
            var widthRatio = minW / w;
            var heightRatio = minH / h;
            if (widthRatio > heightRatio) {
                var new_width = minW;
                var new_height = Math.ceil(new_width / videoRatio);
            } else {
                var new_height = minH;
                var new_width = Math.ceil(new_height * videoRatio);
            }
            this.videoEl.style.width = new_width + 'px';
            this.videoEl.style.height = new_height + 'px';
        };
    };
}(window));
if (typeof COPYPRESS_STORAGE == 'undefined') var COPYPRESS_STORAGE = {};

function copypress_storage_get(var_name) {
    "use strict";
    return copypress_isset(COPYPRESS_STORAGE[var_name]) ? COPYPRESS_STORAGE[var_name] : '';
}

function copypress_storage_set(var_name, value) {
    "use strict";
    COPYPRESS_STORAGE[var_name] = value;
}

function copypress_storage_inc(var_name) {
    "use strict";
    var value = arguments[1] == undefined ? 1 : arguments[1];
    COPYPRESS_STORAGE[var_name] += value;
}

function copypress_storage_concat(var_name, value) {
    "use strict";
    COPYPRESS_STORAGE[var_name] += '' + value;
}

function copypress_storage_get_array(var_name, key) {
    "use strict";
    return copypress_isset(COPYPRESS_STORAGE[var_name][key]) ? COPYPRESS_STORAGE[var_name][key] : '';
}

function copypress_storage_set_array(var_name, key, value) {
    "use strict";
    if (!copypress_isset(COPYPRESS_STORAGE[var_name])) COPYPRESS_STORAGE[var_name] = {};
    COPYPRESS_STORAGE[var_name][key] = value;
}

function copypress_storage_inc_array(var_name, key) {
    "use strict";
    var value = arguments[2] == undefined ? 1 : arguments[2];
    COPYPRESS_STORAGE[var_name][key] += value;
}

function copypress_storage_concat_array(var_name, key, value) {
    "use strict";
    COPYPRESS_STORAGE[var_name][key] += '' + value;
}

function copypress_isset(obj) {
    "use strict";
    return typeof(obj) != 'undefined';
}

function copypress_empty(obj) {
    "use strict";
    return typeof(obj) == 'undefined' || (typeof(obj) == 'object' && obj == null) || (typeof(obj) == 'array' && obj.length == 0) || (typeof(obj) == 'string' && copypress_alltrim(obj) == '') || obj === 0;
}

function copypress_is_array(obj) {
    "use strict";
    return typeof(obj) == 'array';
}

function copypress_is_object(obj) {
    "use strict";
    return typeof(obj) == 'object';
}

function copypress_clone_object(obj) {
    "use strict";
    if (obj == null || typeof(obj) != 'object') {
        return obj;
    }
    var temp = {};
    for (var key in obj) {
        temp[key] = copypress_clone_object(obj[key]);
    }
    return temp;
}

function copypress_merge_objects(obj1, obj2) {
    "use strict";
    for (var i in obj2) obj1[i] = obj2[i];
    return obj1;
}

function copypress_serialize(mixed_val) {
    "use strict";
    var obj_to_array = arguments.length == 1 || argument[1] === true;
    switch (typeof(mixed_val)) {
        case "number":
            if (isNaN(mixed_val) || !isFinite(mixed_val)) return false;
            else return (Math.floor(mixed_val) == mixed_val ? "i" : "d") + ":" + mixed_val + ";";
        case "string":
            return "s:" + mixed_val.length + ":\"" + mixed_val + "\";";
        case "boolean":
            return "b:" + (mixed_val ? "1" : "0") + ";";
        case "object":
            if (mixed_val == null) return "N;";
            else if (mixed_val instanceof Array) {
                var idxobj = {
                    idx: -1
                };
                var map = [];
                for (var i = 0; i < mixed_val.length; i++) {
                    idxobj.idx++;
                    var ser = copypress_serialize(mixed_val[i]);
                    if (ser) map.push(copypress_serialize(idxobj.idx) + ser);
                }
                return "a:" + mixed_val.length + ":{" + map.join("") + "}";
            } else {
                var class_name = copypress_get_class(mixed_val);
                if (class_name == undefined) return false;
                var props = new Array();
                for (var prop in mixed_val) {
                    var ser = copypress_serialize(mixed_val[prop]);
                    if (ser) props.push(copypress_serialize(prop) + ser);
                }
                if (obj_to_array) return "a:" + props.length + ":{" + props.join("") + "}";
                else return "O:" + class_name.length + ":\"" + class_name + "\":" + props.length + ":{" + props.join("") + "}";
            }
        case "undefined":
            return "N;";
    }
    return false;
}

function copypress_get_class(obj) {
    "use strict";
    if (obj instanceof Object && !(obj instanceof Array) && !(obj instanceof Function) && obj.constructor) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);
        if (arr && arr.length == 2) return arr[1];
    }
    return false;
}

function copypress_in_list(str, list) {
    "use strict";
    var delim = arguments[2] ? arguments[2] : '|';
    var icase = arguments[3] ? arguments[3] : true;
    var retval = false;
    if (icase) {
        if (typeof(str) == 'string') str = str.toLowerCase();
        list = list.toLowerCase();
    }
    var parts = list.split(delim);
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] == str) {
            retval = true;
            break;
        }
    }
    return retval;
}

function copypress_alltrim(str) {
    "use strict";
    var dir = arguments[1] ? arguments[1] : 'a';
    var rez = '';
    var i, start = 0,
        end = str.length - 1;
    if (dir == 'a' || dir == 'l') {
        for (i = 0; i < str.length; i++) {
            if (str.substr(i, 1) != ' ') {
                start = i;
                break;
            }
        }
    }
    if (dir == 'a' || dir == 'r') {
        for (i = str.length - 1; i >= 0; i--) {
            if (str.substr(i, 1) != ' ') {
                end = i;
                break;
            }
        }
    }
    return str.substring(start, end + 1);
}

function copypress_ltrim(str) {
    "use strict";
    return copypress_alltrim(str, 'l');
}

function copypress_rtrim(str) {
    "use strict";
    return copypress_alltrim(str, 'r');
}

function copypress_padl(str, len) {
    "use strict";
    var ch = arguments[2] ? arguments[2] : ' ';
    var rez = str.substr(0, len);
    if (rez.length < len) {
        for (var i = 0; i < len - str.length; i++) rez += ch;
    }
    return rez;
}

function copypress_padr(str, len) {
    "use strict";
    var ch = arguments[2] ? arguments[2] : ' ';
    var rez = str.substr(0, len);
    if (rez.length < len) {
        for (var i = 0; i < len - str.length; i++) rez = ch + rez;
    }
    return rez;
}

function copypress_padc(str, len) {
    "use strict";
    var ch = arguments[2] ? arguments[2] : ' ';
    var rez = str.substr(0, len);
    if (rez.length < len) {
        for (var i = 0; i < Math.floor((len - str.length) / 2); i++) rez = ch + rez + ch;
    }
    return rez + (rez.length < len ? ch : '');
}

function copypress_replicate(str, num) {
    "use strict";
    var rez = '';
    for (var i = 0; i < num; i++) {
        rez += str;
    }
    return rez;
}

function copypress_prepare_macros(str) {
    "use strict";
    return str.replace(/\{\{/g, "<i>").replace(/\}\}/g, "</i>").replace(/\[\[/g, "<b>").replace(/\]\]/g, "</b>").replace(/\|\|/g, "<br>");
}

function copypress_round_number(num) {
    "use strict";
    var precision = arguments[1] ? arguments[1] : 0;
    var p = Math.pow(10, precision);
    return Math.round(num * p) / p;
}

function copypress_clear_number(num) {
    "use strict";
    var precision = arguments[1] ? arguments[1] : 0;
    var defa = arguments[2] ? arguments[2] : 0;
    var res = '';
    var decimals = -1;
    num = "" + num;
    if (num == "") num = "" + defa;
    for (var i = 0; i < num.length; i++) {
        if (decimals == 0) break;
        else if (decimals > 0) decimals--;
        var ch = num.substr(i, 1);
        if (ch == '.') {
            if (precision > 0) {
                res += ch;
            }
            decimals = precision;
        } else if ((ch >= 0 && ch <= 9) || (ch == '-' && i == 0)) res += ch;
    }
    if (precision > 0 && decimals != 0) {
        if (decimals == -1) {
            res += '.';
            decimals = precision;
        }
        for (i = decimals; i > 0; i--) res += '0';
    }
    return res;
}

function copypress_dec2hex(n) {
    "use strict";
    return Number(n).toString(16);
}

function copypress_hex2dec(hex) {
    "use strict";
    return parseInt(hex, 16);
}

function copypress_in_array(val, thearray) {
    "use strict";
    var rez = false;
    for (var i = 0; i < thearray.length - 1; i++) {
        if (thearray[i] == val) {
            rez = true;
            break;
        }
    }
    return rez;
}

function copypress_sort_array(thearray) {
    "use strict";
    var caseSensitive = arguments[1] ? arguments[1] : false;
    var tmp = '';
    for (var x = 0; x < thearray.length - 1; x++) {
        for (var y = (x + 1); y < thearray.length; y++) {
            if (caseSensitive) {
                if (thearray[x] > thearray[y]) {
                    tmp = thearray[x];
                    thearray[x] = thearray[y];
                    thearray[y] = tmp;
                }
            } else {
                if (thearray[x].toLowerCase() > thearray[y].toLowerCase()) {
                    tmp = thearray[x];
                    thearray[x] = thearray[y];
                    thearray[y] = tmp;
                }
            }
        }
    }
    return thearray;
}

function copypress_parse_date(dt) {
    "use strict";
    dt = dt.replace(/\//g, '-').replace(/\./g, '-').replace(/T/g, ' ').split('+')[0];
    var dt2 = dt.split(' ');
    var d = dt2[0].split('-');
    var t = dt2[1].split(':');
    d.push(t[0], t[1], t[2]);
    return d;
}

function copypress_get_date_difference(dt1) {
    "use strict";
    var dt2 = arguments[1] !== undefined ? arguments[1] : '';
    var short_date = arguments[2] !== undefined ? arguments[2] : true;
    var sec = arguments[3] !== undefined ? arguments[3] : false;
    var a1 = copypress_parse_date(dt1);
    dt1 = Date.UTC(a1[0], a1[1], a1[2], a1[3], a1[4], a1[5]);
    if (dt2 == '') {
        dt2 = new Date();
        var a2 = [dt2.getFullYear(), dt2.getMonth() + 1, dt2.getDate(), dt2.getHours(), dt2.getMinutes(), dt2.getSeconds()];
    } else var a2 = copypress_parse_date(dt2);
    dt2 = Date.UTC(a2[0], a2[1], a2[2], a2[3], a2[4], a2[5]);
    var diff = Math.round((dt2 - dt1) / 1000);
    var days = Math.floor(diff / (24 * 3600));
    diff -= days * 24 * 3600;
    var hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    var minutes = Math.floor(diff / 60);
    diff -= minutes * 60;
    var rez = '';
    if (days > 0) rez += (rez != '' ? ' ' : '') + days + ' day' + (days > 1 ? 's' : '');
    if ((!short_date || rez == '') && hours > 0) rez += (rez != '' ? ' ' : '') + hours + ' hour' + (hours > 1 ? 's' : '');
    if ((!short_date || rez == '') && minutes > 0) rez += (rez != '' ? ' ' : '') + minutes + ' minute' + (minutes > 1 ? 's' : '');
    if (sec || rez == '') rez += rez != '' || sec ? (' ' + diff + ' second' + (diff > 1 ? 's' : '')) : 'less then minute';
    return rez;
}

function copypress_hex2rgb(hex) {
    "use strict";
    hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
    return {
        r: hex >> 16,
        g: (hex & 0x00FF00) >> 8,
        b: (hex & 0x0000FF)
    };
}

function copypress_rgb2hex(color) {
    "use strict";
    var aRGB;
    color = color.replace(/\s/g, "").toLowerCase();
    if (color == 'rgba(0,0,0,0)' || color == 'rgba(0%,0%,0%,0%)') color = 'transparent';
    if (color.indexOf('rgba(') == 0) aRGB = color.match(/^rgba\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    else aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    if (aRGB) {
        color = '';
        for (var i = 1; i <= 3; i++) color += Math.round((aRGB[i][aRGB[i].length - 1] == "%" ? 2.55 : 1) * parseInt(aRGB[i])).toString(16).replace(/^(.)$/, '0$1');
    } else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
    return (color.substr(0, 1) != '#' ? '#' : '') + color;
}

function copypress_components2hex(r, g, b) {
    "use strict";
    return '#' + Number(r).toString(16).toUpperCase().replace(/^(.)$/, '0$1') + Number(g).toString(16).toUpperCase().replace(/^(.)$/, '0$1') + Number(b).toString(16).toUpperCase().replace(/^(.)$/, '0$1');
}

function copypress_rgb2components(color) {
    "use strict";
    color = copypress_rgb2hex(color);
    var matches = color.match(/^#?([\dabcdef]{2})([\dabcdef]{2})([\dabcdef]{2})$/i);
    if (!matches) return false;
    for (var i = 1, rgb = new Array(3); i <= 3; i++) rgb[i - 1] = parseInt(matches[i], 16);
    return rgb;
}

function copypress_hex2hsb(hex) {
    "use strict";
    return copypress_rgb2hsb(copypress_hex2rgb(hex));
}

function copypress_hsb2hex(hsb) {
    "use strict";
    var rgb = copypress_hsb2rgb(hsb);
    return copypress_components2hex(rgb.r, rgb.g, rgb.b);
}

function copypress_rgb2hsb(rgb) {
    "use strict";
    var hsb = {};
    hsb.b = Math.max(Math.max(rgb.r, rgb.g), rgb.b);
    hsb.s = (hsb.b <= 0) ? 0 : Math.round(100 * (hsb.b - Math.min(Math.min(rgb.r, rgb.g), rgb.b)) / hsb.b);
    hsb.b = Math.round((hsb.b / 255) * 100);
    if ((rgb.r == rgb.g) && (rgb.g == rgb.b)) hsb.h = 0;
    else if (rgb.r >= rgb.g && rgb.g >= rgb.b) hsb.h = 60 * (rgb.g - rgb.b) / (rgb.r - rgb.b);
    else if (rgb.g >= rgb.r && rgb.r >= rgb.b) hsb.h = 60 + 60 * (rgb.g - rgb.r) / (rgb.g - rgb.b);
    else if (rgb.g >= rgb.b && rgb.b >= rgb.r) hsb.h = 120 + 60 * (rgb.b - rgb.r) / (rgb.g - rgb.r);
    else if (rgb.b >= rgb.g && rgb.g >= rgb.r) hsb.h = 180 + 60 * (rgb.b - rgb.g) / (rgb.b - rgb.r);
    else if (rgb.b >= rgb.r && rgb.r >= rgb.g) hsb.h = 240 + 60 * (rgb.r - rgb.g) / (rgb.b - rgb.g);
    else if (rgb.r >= rgb.b && rgb.b >= rgb.g) hsb.h = 300 + 60 * (rgb.r - rgb.b) / (rgb.r - rgb.g);
    else hsb.h = 0;
    hsb.h = Math.round(hsb.h);
    return hsb;
}

function copypress_hsb2rgb(hsb) {
    "use strict";
    var rgb = {};
    var h = Math.round(hsb.h);
    var s = Math.round(hsb.s * 255 / 100);
    var v = Math.round(hsb.b * 255 / 100);
    if (s == 0) {
        rgb.r = rgb.g = rgb.b = v;
    } else {
        var t1 = v;
        var t2 = (255 - s) * v / 255;
        var t3 = (t1 - t2) * (h % 60) / 60;
        if (h == 360) h = 0;
        if (h < 60) {
            rgb.r = t1;
            rgb.b = t2;
            rgb.g = t2 + t3;
        } else if (h < 120) {
            rgb.g = t1;
            rgb.b = t2;
            rgb.r = t1 - t3;
        } else if (h < 180) {
            rgb.g = t1;
            rgb.r = t2;
            rgb.b = t2 + t3;
        } else if (h < 240) {
            rgb.b = t1;
            rgb.r = t2;
            rgb.g = t1 - t3;
        } else if (h < 300) {
            rgb.b = t1;
            rgb.g = t2;
            rgb.r = t2 + t3;
        } else if (h < 360) {
            rgb.r = t1;
            rgb.g = t2;
            rgb.b = t1 - t3;
        } else {
            rgb.r = 0;
            rgb.g = 0;
            rgb.b = 0;
        }
    }
    return {
        r: Math.round(rgb.r),
        g: Math.round(rgb.g),
        b: Math.round(rgb.b)
    };
}

function copypress_color_picker() {
    "use strict";
    var id = arguments[0] ? arguments[0] : "iColorPicker" + Math.round(Math.random() * 1000);
    var colors = arguments[1] ? arguments[1] : '#f00,#ff0,#0f0,#0ff,#00f,#f0f,#fff,#ebebeb,#e1e1e1,#d7d7d7,#cccccc,#c2c2c2,#b7b7b7,#acacac,#a0a0a0,#959595,' + '#ee1d24,#fff100,#00a650,#00aeef,#2f3192,#ed008c,#898989,#7d7d7d,#707070,#626262,#555,#464646,#363636,#262626,#111,#000,' + '#f7977a,#fbad82,#fdc68c,#fff799,#c6df9c,#a4d49d,#81ca9d,#7bcdc9,#6ccff7,#7ca6d8,#8293ca,#8881be,#a286bd,#bc8cbf,#f49bc1,#f5999d,' + '#f16c4d,#f68e54,#fbaf5a,#fff467,#acd372,#7dc473,#39b778,#16bcb4,#00bff3,#438ccb,#5573b7,#5e5ca7,#855fa8,#a763a9,#ef6ea8,#f16d7e,' + '#ee1d24,#f16522,#f7941d,#fff100,#8fc63d,#37b44a,#00a650,#00a99e,#00aeef,#0072bc,#0054a5,#2f3192,#652c91,#91278f,#ed008c,#ee105a,' + '#9d0a0f,#a1410d,#a36209,#aba000,#588528,#197b30,#007236,#00736a,#0076a4,#004a80,#003370,#1d1363,#450e61,#62055f,#9e005c,#9d0039,' + '#790000,#7b3000,#7c4900,#827a00,#3e6617,#045f20,#005824,#005951,#005b7e,#003562,#002056,#0c004b,#30004a,#4b0048,#7a0045,#7a0026';
    var colorsList = colors.split(',');
    var tbl = '<table class="colorPickerTable"><thead>';
    for (var i = 0; i < colorsList.length; i++) {
        if (i % 16 == 0) tbl += (i > 0 ? '</tr>' : '') + '<tr>';
        tbl += '<td style="background-color:' + colorsList[i] + '">&nbsp;</td>';
    }
    tbl += '</tr></thead><tbody>' + '<tr style="height:60px;">' + '<td colspan="8" id="' + id + '_colorPreview" style="vertical-align:middle;text-align:center;border:1px solid #000;background:#fff;">' + '<input style="width:55px;color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;" maxlength="7" />' + '<a href="#" id="' + id + '_moreColors" class="iColorPicker_moreColors"></a>' + '</td>' + '<td colspan="8" id="' + id + '_colorOriginal" style="vertical-align:middle;text-align:center;border:1px solid #000;background:#fff;">' + '<input style="width:55px;color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;" readonly="readonly" />' + '</td>' + '</tr></tbody></table>';
    jQuery(document.createElement("div")).attr("id", id).css('display', 'none').html(tbl).appendTo("body").addClass("iColorPickerTable").on('mouseover', 'thead td', function () {
        "use strict";
        var aaa = copypress_rgb2hex(jQuery(this).css('background-color'));
        jQuery('#' + id + '_colorPreview').css('background', aaa);
        jQuery('#' + id + '_colorPreview input').val(aaa);
    }).on('keypress', '#' + id + '_colorPreview input', function (key) {
        "use strict";
        var aaa = jQuery(this).val();
        if (aaa.length < 7 && ((key.which >= 48 && key.which <= 57) || (key.which >= 97 && key.which <= 102) || (key.which === 35 || aaa.length === 0))) {
            aaa += String.fromCharCode(key.which);
        } else if (key.which == 8 && aaa.length > 0) {
            aaa = aaa.substring(0, aaa.length - 1);
        } else if (key.which === 13 && (aaa.length === 4 || aaa.length === 7)) {
            var fld = jQuery('#' + id).data('field');
            var func = jQuery('#' + id).data('func');
            if (func != null && func != 'undefined') {
                func(fld, aaa);
            } else {
                fld.val(aaa).css('backgroundColor', aaa).trigger('change');
            }
            jQuery('#' + id + '_Bg').fadeOut(500);
            jQuery('#' + id).fadeOut(500);
        } else {
            key.preventDefault();
            return false;
        }
        if (aaa.substr(0, 1) === '#' && (aaa.length === 4 || aaa.length === 7)) {
            jQuery('#' + id + '_colorPreview').css('background', aaa);
        }
    }).on('click', 'thead td', function (e) {
        "use strict";
        var fld = jQuery('#' + id).data('field');
        var func = jQuery('#' + id).data('func');
        var aaa = copypress_rgb2hex(jQuery(this).css('background-color'));
        if (func != null && func != 'undefined') {
            func(fld, aaa);
        } else {
            fld.val(aaa).css('backgroundColor', aaa).trigger('change');
        }
        jQuery('#' + id + '_Bg').fadeOut(500);
        jQuery('#' + id).fadeOut(500);
        e.preventDefault();
        return false;
    }).on('click', 'tbody .iColorPicker_moreColors', function (e) {
        "use strict";
        var thead = jQuery(this).parents('table').find('thead');
        var out = '';
        if (thead.hasClass('more_colors')) {
            for (var i = 0; i < colorsList.length; i++) {
                if (i % 16 == 0) out += (i > 0 ? '</tr>' : '') + '<tr>';
                out += '<td style="background-color:' + colorsList[i] + '">&nbsp;</td>';
            }
            thead.removeClass('more_colors').empty().html(out + '</tr>');
            jQuery('#' + id + '_colorPreview').attr('colspan', 8);
            jQuery('#' + id + '_colorOriginal').attr('colspan', 8);
        } else {
            var rgb = [0, 0, 0],
                i = 0,
                j = -1;
            while (rgb[0] < 0xF || rgb[1] < 0xF || rgb[2] < 0xF) {
                if (i % 18 == 0) out += (i > 0 ? '</tr>' : '') + '<tr>';
                i++;
                out += '<td style="background-color:' + copypress_components2hex(rgb[0] * 16 + rgb[0], rgb[1] * 16 + rgb[1], rgb[2] * 16 + rgb[2]) + '">&nbsp;</td>';
                rgb[2] += 3;
                if (rgb[2] > 0xF) {
                    rgb[1] += 3;
                    if (rgb[1] > (j === 0 ? 6 : 0xF)) {
                        rgb[0] += 3;
                        if (rgb[0] > 0xF) {
                            if (j === 0) {
                                j = 1;
                                rgb[0] = 0;
                                rgb[1] = 9;
                                rgb[2] = 0;
                            } else {
                                break;
                            }
                        } else {
                            rgb[1] = (j < 1 ? 0 : 9);
                            rgb[2] = 0;
                        }
                    } else {
                        rgb[2] = 0;
                    }
                }
            }
            thead.addClass('more_colors').empty().html(out + '<td style="background-color:#ffffff" colspan="8">&nbsp;</td></tr>');
            jQuery('#' + id + '_colorPreview').attr('colspan', 9);
            jQuery('#' + id + '_colorOriginal').attr('colspan', 9);
        }
        jQuery('#' + id + ' table.colorPickerTable thead td').css({
            'width': '12px',
            'height': '14px',
            'border': '1px solid #000',
            'cursor': 'pointer'
        });
        e.preventDefault();
        return false;
    });
    jQuery(document.createElement("div")).attr("id", id + "_Bg").on('click', function (e) {
        "use strict";
        jQuery("#" + id + "_Bg").fadeOut(500);
        jQuery("#" + id).fadeOut(500);
        e.preventDefault();
        return false;
    }).appendTo("body");
    jQuery('#' + id + ' table.colorPickerTable thead td').css({
        'width': '12px',
        'height': '14px',
        'border': '1px solid #000',
        'cursor': 'pointer'
    });
    jQuery('#' + id + ' table.colorPickerTable').css({
        'border-collapse': 'collapse'
    });
    jQuery('#' + id).css({
        'border': '1px solid #ccc',
        'background': '#333',
        'padding': '5px',
        'color': '#fff',
        'z-index': 999999
    });
    jQuery('#' + id + '_colorPreview').css({
        'height': '50px'
    });
    return id;
}

function copypress_color_picker_show(id, fld, func) {
    "use strict";
    if (id === null || id === '') {
        id = jQuery('.iColorPickerTable').attr('id');
    }
    var eICP = fld.offset();
    var w = jQuery('#' + id).width();
    var h = jQuery('#' + id).height();
    var l = eICP.left + w < jQuery(window).width() - 10 ? eICP.left : jQuery(window).width() - 10 - w;
    var t = eICP.top + fld.outerHeight() + h < jQuery(document).scrollTop() + jQuery(window).height() - 10 ? eICP.top + fld.outerHeight() : eICP.top - h - 13;
    jQuery("#" + id).data({
        field: fld,
        func: func
    }).css({
        'top': t + "px",
        'left': l + "px",
        'position': 'absolute',
        'z-index': 100001
    }).fadeIn(500);
    jQuery("#" + id + "_Bg").css({
        'position': 'fixed',
        'z-index': 100000,
        'top': 0,
        'left': 0,
        'width': '100%',
        'height': '100%'
    }).fadeIn(500);
    var def = fld.val().substr(0, 1) == '#' ? fld.val() : copypress_rgb2hex(fld.css('backgroundColor'));
    jQuery('#' + id + '_colorPreview input,#' + id + '_colorOriginal input').val(def);
    jQuery('#' + id + '_colorPreview,#' + id + '_colorOriginal').css('background', def);
}

function copypress_get_cookie(name) {
    "use strict";
    var defa = arguments[1] != undefined ? arguments[1] : null;
    var start = document.cookie.indexOf(name + '=');
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return defa;
    }
    if (start == -1) return defa;
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function copypress_set_cookie(name, value, expires, path, domain, secure) {
    "use strict";
    var expires = arguments[2] != undefined ? arguments[2] : 0;
    var path = arguments[3] != undefined ? arguments[3] : '/';
    var domain = arguments[4] != undefined ? arguments[4] : '';
    var secure = arguments[5] != undefined ? arguments[5] : '';
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '=' + escape(value) + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
}

function copypress_del_cookie(name, path, domain) {
    "use strict";
    var path = arguments[1] != undefined ? arguments[1] : '/';
    var domain = arguments[2] != undefined ? arguments[2] : '';
    if (copypress_get_cookie(name)) document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

function copypress_clear_listbox(box) {
    "use strict";
    for (var i = box.options.length - 1; i >= 0; i--) box.options[i] = null;
}

function copypress_add_listbox_item(box, val, text) {
    "use strict";
    var item = new Option();
    item.value = val;
    item.text = text;
    box.options.add(item);
}

function copypress_del_listbox_item_by_value(box, val) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].value == val) {
            box.options[i] = null;
            break;
        }
    }
}

function copypress_del_listbox_item_by_text(box, txt) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].text == txt) {
            box.options[i] = null;
            break;
        }
    }
}

function copypress_find_listbox_item_by_value(box, val) {
    "use strict";
    var idx = -1;
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].value == val) {
            idx = i;
            break;
        }
    }
    return idx;
}

function copypress_find_listbox_item_by_text(box, txt) {
    "use strict";
    var idx = -1;
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].text == txt) {
            idx = i;
            break;
        }
    }
    return idx;
}

function copypress_select_listbox_item_by_value(box, val) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        box.options[i].selected = (val == box.options[i].value);
    }
}

function copypress_select_listbox_item_by_text(box, txt) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        box.options[i].selected = (txt == box.options[i].text);
    }
}

function copypress_get_listbox_values(box) {
    "use strict";
    var delim = arguments[1] ? arguments[1] : ',';
    var str = '';
    for (var i = 0; i < box.options.length; i++) {
        str += (str ? delim : '') + box.options[i].value;
    }
    return str;
}

function copypress_get_listbox_texts(box) {
    "use strict";
    var delim = arguments[1] ? arguments[1] : ',';
    var str = '';
    for (var i = 0; i < box.options.length; i++) {
        str += (str ? delim : '') + box.options[i].text;
    }
    return str;
}

function copypress_sort_listbox(box) {
    "use strict";
    var temp_opts = new Array();
    var temp = new Option();
    for (var i = 0; i < box.options.length; i++) {
        temp_opts[i] = box.options[i].clone();
    }
    for (var x = 0; x < temp_opts.length - 1; x++) {
        for (var y = (x + 1); y < temp_opts.length; y++) {
            if (temp_opts[x].text > temp_opts[y].text) {
                temp = temp_opts[x];
                temp_opts[x] = temp_opts[y];
                temp_opts[y] = temp;
            }
        }
    }
    for (var i = 0; i < box.options.length; i++) {
        box.options[i] = temp_opts[i].clone();
    }
}

function copypress_get_listbox_selected_index(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) return i;
    }
    return -1;
}

function copypress_get_listbox_selected_value(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i].value;
        }
    }
    return null;
}

function copypress_get_listbox_selected_text(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i].text;
        }
    }
    return null;
}

function copypress_get_listbox_selected_option(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i];
        }
    }
    return null;
}

function copypress_get_radio_value(radioGroupObj) {
    "use strict";
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked) return radioGroupObj[i].value;
    return null;
}

function copypress_set_radio_checked_by_num(radioGroupObj, num) {
    "use strict";
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked && i != num) radioGroupObj[i].checked = false;
        else if (i == num) radioGroupObj[i].checked = true;
}

function copypress_set_radio_checked_by_value(radioGroupObj, val) {
    "use strict";
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked && radioGroupObj[i].value != val) radioGroupObj[i].checked = false;
        else if (radioGroupObj[i].value == val) radioGroupObj[i].checked = true;
}

function copypress_form_validate(form, opt) {
    "use strict";
    var error_msg = '';
    form.find(":input").each(function () {
        "use strict";
        if (error_msg != '' && opt.exit_after_first_error) return;
        for (var i = 0; i < opt.rules.length; i++) {
            if (jQuery(this).attr("name") == opt.rules[i].field) {
                var val = jQuery(this).val();
                var error = false;
                if (typeof(opt.rules[i].min_length) == 'object') {
                    if (opt.rules[i].min_length.value > 0 && val.length < opt.rules[i].min_length.value) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].min_length.message) != 'undefined' ? opt.rules[i].min_length.message : opt.error_message_text) + '</p>';
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].max_length) == 'object') {
                    if (opt.rules[i].max_length.value > 0 && val.length > opt.rules[i].max_length.value) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].max_length.message) != 'undefined' ? opt.rules[i].max_length.message : opt.error_message_text) + '</p>';
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].mask) == 'object') {
                    if (opt.rules[i].mask.value != '') {
                        var regexp = new RegExp(opt.rules[i].mask.value);
                        if (!regexp.test(val)) {
                            if (error_msg == '') jQuery(this).get(0).focus();
                            error_msg += '<p class="error_item">' + (typeof(opt.rules[i].mask.message) != 'undefined' ? opt.rules[i].mask.message : opt.error_message_text) + '</p>';
                            error = true;
                        }
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].state) == 'object') {
                    if (opt.rules[i].state.value == 'checked' && !jQuery(this).get(0).checked) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].state.message) != 'undefined' ? opt.rules[i].state.message : opt.error_message_text) + '</p>';
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].equal_to) == 'object') {
                    if (opt.rules[i].equal_to.value != '' && val != jQuery(jQuery(this).get(0).form[opt.rules[i].equal_to.value]).val()) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].equal_to.message) != 'undefined' ? opt.rules[i].equal_to.message : opt.error_message_text) + '</p>';
                        error = true;
                    }
                }
                if (opt.error_fields_class != '') jQuery(this).toggleClass(opt.error_fields_class, error);
            }
        }
    });
    if (error_msg != '' && opt.error_message_show) {
        var error_message_box = form.find(".result");
        if (error_message_box.length == 0) error_message_box = form.parent().find(".result");
        if (error_message_box.length == 0) {
            form.append('<div class="result"></div>');
            error_message_box = form.find(".result");
        }
        if (opt.error_message_class) error_message_box.toggleClass(opt.error_message_class, true);
        error_message_box.html(error_msg).fadeIn();
        setTimeout(function () {
            error_message_box.fadeOut();
        }, opt.error_message_time);
    }
    return error_msg != '';
}

function copypress_document_animate_to(id, callback) {
    "use strict";
    var oft = !isNaN(id) ? Number(id) : 0;
    if (isNaN(id)) {
        if (id.indexOf('#') == -1) id = '#' + id;
        var obj = jQuery(id).eq(0);
        if (obj.length == 0) return;
        oft = obj.offset().top;
    }
    var st = jQuery(window).scrollTop();
    var speed = Math.min(1200, Math.max(300, Math.round(Math.abs(oft - st) / jQuery(window).height() * 300)));
    jQuery('body,html').animate({
        scrollTop: oft - jQuery('#wpadminbar').height() - jQuery('header.fixedTopMenu .topWrap').height()
    }, speed, 'linear', callback);
}

function copypress_document_set_location(curLoc) {
    "use strict";
    try {
        history.pushState(null, null, curLoc);
        return;
    } catch (e) {
    }
    location.href = curLoc;
}

function copypress_add_to_url(loc, prm) {
    "use strict";
    var ignore_empty = arguments[2] !== undefined ? arguments[2] : true;
    var q = loc.indexOf('?');
    var attr = {};
    if (q > 0) {
        var qq = loc.substr(q + 1).split('&');
        var parts = '';
        for (var i = 0; i < qq.length; i++) {
            var parts = qq[i].split('=');
            attr[parts[0]] = parts.length > 1 ? parts[1] : '';
        }
    }
    for (var p in prm) {
        attr[p] = prm[p];
    }
    loc = (q > 0 ? loc.substr(0, q) : loc) + '?';
    var i = 0;
    for (p in attr) {
        if (ignore_empty && attr[p] == '') continue;
        loc += (i++ > 0 ? '&' : '') + p + '=' + attr[p];
    }
    return loc;
}

function copypress_browser_is_mobile() {
    "use strict";
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function copypress_browser_is_ios() {
    "use strict";
    return navigator.userAgent.match(/iPad|iPhone|iPod/i) != null;
}

function copypress_is_retina() {
    "use strict";
    var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
    return (window.devicePixelRatio > 1) || (window.matchMedia && window.matchMedia(mediaQuery).matches);
}

function copypress_get_file_name(path) {
    "use strict";
    path = path.replace(/\\/g, '/');
    var pos = path.lastIndexOf('/');
    if (pos >= 0) path = path.substr(pos + 1);
    return path;
}

function copypress_get_file_ext(path) {
    "use strict";
    var pos = path.lastIndexOf('.');
    path = pos >= 0 ? path.substr(pos + 1) : '';
    return path;
}

function copypress_check_images_complete(cont) {
    "use strict";
    var complete = true;
    cont.find('img').each(function () {
        if (!complete) return;
        if (!jQuery(this).get(0).complete) complete = false;
    });
    return complete;
}

function copypress_debug_object(obj) {
    "use strict";
    var html = arguments[1] ? arguments[1] : false;
    var recursive = arguments[2] ? arguments[2] : false;
    var showMethods = arguments[3] ? arguments[3] : false;
    var level = arguments[4] ? arguments[4] : 0;
    var dispStr = "";
    var addStr = "";
    if (level > 0) {
        dispStr += (obj === null ? "null" : typeof(obj)) + (html ? "\n<br />" : "\n");
        addStr = copypress_replicate(html ? '&nbsp;' : ' ', level * 2);
    }
    if (obj !== null) {
        var i = 0;
        for (var prop in obj) {
            i++;
            if (i > 100) break;
            try {
                if (!showMethods && typeof(obj[prop]) == 'function') continue;
                if (recursive && level <= 3 && (typeof(obj[prop]) == 'object' || typeof(obj[prop]) == 'array') && obj[prop] != obj) dispStr += addStr + (html ? "<b>" : "") + prop + (html ? "</b>" : "") + '=' + copypress_debug_object(obj[prop], html, recursive, showMethods, level + 1);
                else dispStr += addStr + (html ? "<b>" : "") + prop + (html ? "</b>" : "") + '=' + (typeof(obj[prop]) == 'string' ? '"' : '') + obj[prop] + (typeof(obj[prop]) == 'string' ? '"' : '') + (html ? "\n<br />" : "\n");
            } catch (e) {
                dispStr += (html ? "<br><br>" : "\n\n") + "Error parsing on property '" + prop + "'. Recursion cancelled!";
                break;
            }
        }
    }
    return dispStr;
}
jQuery(document).ready(function () {
    jQuery("#debug_log_close").on('click', function (e) {
        jQuery('#debug_log').hide();
        e.preventDefault();
        return false;
    });
});

function copypress_debug_log(s) {
    "use strict";
    if (COPYPRESS_STORAGE['user_logged_in']) {
        if (jQuery('#debug_log').length == 0) {
            jQuery('body').append('<div id="debug_log"><span id="debug_log_close">x</span><div id="debug_log_content"></div></div>');
        }
        jQuery('#debug_log_content').append('<br>' + s);
        jQuery('#debug_log').show();
    }
}
if (window.dcl === undefined)
    function dcl(s) {
        console.log(s);
    }
if (window.dco === undefined)
    function dco(s, r) {
        console.log(copypress_debug_object(s, false, r));
    }
if (window.dal === undefined)
    function dal(s) {
        if (COPYPRESS_STORAGE['user_logged_in']) alert(s);
    }
if (window.dao === undefined)
    function dao(s, r) {
        if (COPYPRESS_STORAGE['user_logged_in']) alert(copypress_debug_object(s, false, r));
    }
if (window.ddl === undefined)
    function ddl(s) {
        copypress_debug_log(s);
    }
if (window.ddo === undefined)
    function ddo(s, r) {
        copypress_debug_log(copypress_debug_object(s, true, r));
    }
jQuery(document).ready(function () {
    "use strict";
    COPYPRESS_STORAGE['theme_init_counter'] = 0;
    copypress_init_actions();
});

function copypress_init_actions() {
    "use strict";
    if (COPYPRESS_STORAGE['vc_edit_mode'] && jQuery('.vc_empty-placeholder').length == 0 && COPYPRESS_STORAGE['theme_init_counter']++ < 30) {
        setTimeout(copypress_init_actions, 200);
        return;
    }
    copypress_ready_actions();
    copypress_resize_actions();
    copypress_scroll_actions();
    jQuery(window).resize(function () {
        "use strict";
        copypress_resize_actions();
    });
    jQuery(document).on('action.resize_vc_row_start', function (e, el) {
        copypress_resize_actions();
    });
    jQuery(document).on('action.init_hidden_elements', copypress_stretch_height);
    jQuery(document).on('action.init_shortcodes', copypress_stretch_height);
    jQuery(window).scroll(function () {
        "use strict";
        copypress_scroll_actions();
    });
}

function copypress_ready_actions() {
    "use strict";
    document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js');
    if (document.documentElement.className.indexOf(COPYPRESS_STORAGE['site_scheme']) == -1) document.documentElement.className += ' ' + COPYPRESS_STORAGE['site_scheme'];
    if (COPYPRESS_STORAGE['background_video'] && jQuery('.top_panel.with_bg_video').length > 0) {
        setTimeout(function () {
            jQuery('.top_panel.with_bg_video').prepend('<video id="background_video" loop muted></video>');
            var bv = new Bideo();
            bv.init({
                videoEl: document.querySelector('#background_video'),
                container: document.querySelector('.top_panel'),
                resize: true,
                isMobile: window.matchMedia('(max-width: 768px)').matches,
                playButton: document.querySelector('#background_video_play'),
                pauseButton: document.querySelector('#background_video_pause'),
                src: [{
                    src: COPYPRESS_STORAGE['background_video'],
                    type: 'video/' + copypress_get_file_ext(COPYPRESS_STORAGE['background_video'])
                }],
                onLoad: function () {
                }
            });
        }, 10);
    }
    if (jQuery('.copypress_tabs:not(.inited)').length > 0 && jQuery.ui && jQuery.ui.tabs) {
        jQuery('.copypress_tabs:not(.inited)').each(function () {
            "use strict";
            var init = jQuery(this).data('active');
            if (isNaN(init)) {
                init = 0;
                var active = jQuery(this).find('> ul > li[data-active="true"]').eq(0);
                if (active.length > 0) {
                    init = active.index();
                    if (isNaN(init) || init < 0) init = 0;
                }
            } else {
                init = Math.max(0, init);
            }
            jQuery(this).addClass('inited').tabs({
                active: init,
                show: {
                    effect: 'fadeIn',
                    duration: 300
                },
                hide: {
                    effect: 'fadeOut',
                    duration: 300
                },
                create: function (event, ui) {
                    if (ui.panel.length > 0) jQuery(document).trigger('action.init_hidden_elements', [ui.panel]);
                },
                activate: function (event, ui) {
                    if (ui.newPanel.length > 0) jQuery(document).trigger('action.init_hidden_elements', [ui.newPanel]);
                }
            });
        });
    }
    jQuery('.copypress_tabs_ajax').on("tabsbeforeactivate", function (event, ui) {
        "use strict";
        if (ui.newPanel.data('need-content')) copypress_tabs_ajax_content_loader(ui.newPanel, 1, ui.oldPanel);
    });
    jQuery('.copypress_tabs_ajax').on("click", '.nav-links a', function (e) {
        "use strict";
        var panel = jQuery(this).parents('.copypress_tabs_content');
        var page = 1;
        var href = jQuery(this).attr('href');
        var pos = -1;
        if ((pos = href.lastIndexOf('/page/')) != -1) {
            page = Number(href.substr(pos + 6).replace("/", ""));
            if (!isNaN(page)) page = Math.max(1, page);
        }
        copypress_tabs_ajax_content_loader(panel, page);
        e.preventDefault();
        return false;
    });
    var rows = jQuery('.copypress_layouts_row_fixed');
    if (rows.length > 0) {
        rows.each(function () {
            "use strict";
            if (!jQuery(this).next().hasClass('copypress_layouts_row_fixed_placeholder')) jQuery(this).after('<div class="copypress_layouts_row_fixed_placeholder"></div>');
        });
        jQuery(document).on('action.scroll_copypress', function () {
            "use strict";
            copypress_fix_header(rows, false);
        });
        jQuery(document).on('action.resize_copypress', function () {
            "use strict";
            copypress_fix_header(rows, true);
        });
    }
    if (jQuery('.menu_side_inner').length > 0 && jQuery('#toc_menu').length > 0) jQuery('#toc_menu').appendTo('.menu_side_inner');
    jQuery('.menu_side_button').on('click', function (e) {
        "use strict";
        jQuery(this).parent().toggleClass('opened');
        e.preventDefault();
        return false;
    });
    jQuery('.menu_mobile .menu-item-has-children > a').append('<span class="open_child_menu"></span>');
    jQuery('.sc_layouts_menu_mobile_button > a,.menu_mobile_button,.menu_mobile_description').on('click', function (e) {
        "use strict";
        jQuery('.menu_mobile_overlay').fadeIn();
        jQuery('.menu_mobile').addClass('opened');
        jQuery(document).trigger('action.stop_wheel_handlers');
        e.preventDefault();
        return false;
    });
    jQuery(document).on('keypress', function (e) {
        "use strict";
        if (e.keyCode == 27) {
            if (jQuery('.menu_mobile.opened').length == 1) {
                jQuery('.menu_mobile_overlay').fadeOut();
                jQuery('.menu_mobile').removeClass('opened');
                jQuery(document).trigger('action.start_wheel_handlers');
                e.preventDefault();
                return false;
            }
        }
    });
    ;
    jQuery('.menu_mobile_close, .menu_mobile_overlay').on('click', function (e) {
        "use strict";
        jQuery('.menu_mobile_overlay').fadeOut();
        jQuery('.menu_mobile').removeClass('opened');
        jQuery(document).trigger('action.start_wheel_handlers');
        e.preventDefault();
        return false;
    });
    jQuery('.menu_mobile').on('click', 'li a, li a .open_child_menu', function (e) {
        "use strict";
        var $a = jQuery(this).hasClass('open_child_menu') ? jQuery(this).parent() : jQuery(this);
        if ($a.parent().hasClass('menu-item-has-children')) {
            if ($a.attr('href') == '#' || jQuery(this).hasClass('open_child_menu')) {
                if ($a.siblings('ul:visible').length > 0) $a.siblings('ul').slideUp().parent().removeClass('opened');
                else {
                    jQuery(this).parents('li').siblings('li').find('ul:visible').slideUp().parent().removeClass('opened');
                    $a.siblings('ul').slideDown().parent().addClass('opened');
                }
            }
        }
        if (jQuery(this).hasClass('open_child_menu') || $a.attr('href') == '#') {
            e.preventDefault();
            return false;
        }
    });
    copypress_init_sfmenu('.sc_layouts_menu_nav:not(.inited)');
    if (jQuery('.sc_layouts_menu_nav').hasClass('inited')) jQuery('.sc_layouts_menu_nav_area').addClass('menu_show');
    jQuery("select:not(.esg-sorting-select)").wrap('<div class="select_container"></div>');
    jQuery("form#commentform").submit(function (e) {
        "use strict";
        var rez = copypress_comments_validate(jQuery(this));
        if (!rez) e.preventDefault();
        return rez;
    });
    jQuery("form").on('keypress', '.error_field', function () {
        if (jQuery(this).val() != '') jQuery(this).removeClass('error_field');
    });
    jQuery('.woocommerce,.woocommerce-page').on('click', '.copypress_shop_mode_buttons a', function (e) {
        "use strict";
        var mode = jQuery(this).hasClass('woocommerce_thumbs') ? 'thumbs' : 'list';
        jQuery.cookie('copypress_shop_mode', mode, {
            expires: 365,
            path: '/'
        });
        jQuery(this).siblings('input').val(mode).parents('form').get(0).submit();
        e.preventDefault();
        return false;
    });
    jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="q_inc"></span><span class="q_dec"></span>');
    jQuery('.woocommerce div.quantity').on('click', '>span', function (e) {
        "use strict";
        var f = jQuery(this).siblings('input');
        if (jQuery(this).hasClass('q_inc')) {
            f.val(Math.max(0, parseInt(f.val())) + 1);
        } else {
            f.val(Math.max(1, Math.max(0, parseInt(f.val())) - 1));
        }
        e.preventDefault();
        return false;
    });
    var wishlist = jQuery('.woocommerce .product .yith-wcwl-add-to-wishlist');
    if (wishlist.length > 0) {
        wishlist.find('.add_to_wishlist').addClass('button');
        if (jQuery('.woocommerce .product .compare').length > 0) jQuery('.woocommerce .product .compare').insertBefore(wishlist);
    }
    jQuery('.single-product .woocommerce-tabs').wrap('<div class="trx-stretch-width"></div>');
    jQuery('.trx-stretch-width').wrap('<div class="trx-stretch-width-wrap scheme_default"></div>');
    jQuery('.trx-stretch-width').after('<div class="trx-stretch-width-original"></div>');
    copypress_stretch_width();
    jQuery('.nav-links-more a').on('click', function (e) {
        "use strict";
        if (COPYPRESS_STORAGE['load_more_link_busy']) return;
        COPYPRESS_STORAGE['load_more_link_busy'] = true;
        var more = jQuery(this);
        var page = Number(more.data('page'));
        var max_page = Number(more.data('max-page'));
        if (page >= max_page) {
            more.parent().hide();
            return;
        }
        more.parent().addClass('loading');
        var panel = more.parents('.copypress_tabs_content');
        if (panel.length == 0) {
            jQuery.get(location.href, {
                paged: page + 1
            }).done(function (response) {
                "use strict";
                var p1 = response.indexOf('copypress-inline-styles-inline-css');
                if (p1 > 0) {
                    p1 = response.indexOf('>', p1) + 1;
                    var p2 = response.indexOf('</style>', p1);
                    var inline_css_add = response.substring(p1, p2);
                    var inline_css = jQuery('#copypress-inline-styles-inline-css');
                    if (inline_css.length == 0) jQuery('body').append('<style id="copypress-inline-styles-inline-css" type="text/css">' + inline_css_add + '</style>');
                    else inline_css.append(inline_css_add);
                }
                copypress_loadmore_add_items(jQuery('.content > .posts_container').eq(0), jQuery(response).find('.content > .posts_container > article,.content > .posts_container > div[class*="column-"]'));
            });
        } else {
            jQuery.post(COPYPRESS_STORAGE['ajax_url'], {
                nonce: COPYPRESS_STORAGE['ajax_nonce'],
                action: 'copypress_ajax_get_posts',
                blog_template: panel.data('blog-template'),
                blog_style: panel.data('blog-style'),
                posts_per_page: panel.data('posts-per-page'),
                cat: panel.data('cat'),
                parent_cat: panel.data('parent-cat'),
                post_type: panel.data('post-type'),
                taxonomy: panel.data('taxonomy'),
                page: page + 1
            }).done(function (response) {
                "use strict";
                var rez = {};
                try {
                    rez = JSON.parse(response);
                } catch (e) {
                    rez = {
                        error: COPYPRESS_STORAGE['strings']['ajax_error']
                    };
                    console.log(response);
                }
                if (rez.error !== '') {
                    panel.html('<div class="copypress_error">' + rez.error + '</div>');
                } else {
                    copypress_loadmore_add_items(panel.find('.posts_container'), jQuery(rez.data).find('article'));
                }
            });
        }

        function copypress_loadmore_add_items(container, items) {
            if (container.length > 0 && items.length > 0) {
                container.append(items);
                if (container.hasClass('portfolio_wrap')) {
                    container.masonry('appended', items);
                    if (container.hasClass('gallery_wrap')) {
                        COPYPRESS_STORAGE['GalleryFx'][container.attr('id')].appendItems();
                    }
                }
                more.data('page', page + 1).parent().removeClass('loading');
                jQuery('#toc_menu').remove();
                COPYPRESS_STORAGE['init_all_mediaelements'] = true;
                jQuery(document).trigger('action.init_shortcodes', [container.parent()]);
                jQuery(document).trigger('action.init_hidden_elements', [container.parent()]);
            }
            if (page + 1 >= max_page) more.parent().hide();
            else COPYPRESS_STORAGE['load_more_link_busy'] = false;
            jQuery(window).trigger('scroll');
        }

        e.preventDefault();
        return false;
    });
    jQuery(document).on('action.scroll_copypress', function (e) {
        "use strict";
        if (COPYPRESS_STORAGE['load_more_link_busy']) return;
        var container = jQuery('.content > .posts_container').eq(0);
        var inf = jQuery('.nav-links-infinite');
        if (inf.length == 0) return;
        if (container.offset().top + container.height() < jQuery(window).scrollTop() + jQuery(window).height() * 1.5) inf.find('a').trigger('click');
    });
    jQuery('button:not(.search_submit),.sc_item_button a,.sc_form button,.sc_price_link,.sc_action_item_link').each(function () {
        var width = jQuery(this).width();
        width = Math.ceil(width);
        jQuery(this).width(width);
    });
    jQuery(document).trigger('action.ready_copypress');
    jQuery(document).on('action.init_hidden_elements', copypress_init_post_formats);
    jQuery(document).trigger('action.init_hidden_elements', [jQuery('body').eq(0)]);
}

function copypress_scroll_actions() {
    "use strict";
    var scroll_offset = jQuery(window).scrollTop();
    var adminbar_height = Math.max(0, jQuery('#wpadminbar').height());
    jQuery(document).trigger('action.scroll_copypress');
    copypress_fix_sidebar();
    if (jQuery('body').hasClass('header_position_under') && !copypress_browser_is_mobile()) {
        var delta = 50;
        var adminbar = jQuery('#wpadminbar');
        var adminbar_height = adminbar.length == 0 && adminbar.css('position') == 'fixed' ? 0 : adminbar.height();
        var header = jQuery('.top_panel');
        var header_height = header.height();
        var mask = header.find('.top_panel_mask');
        if (mask.length == 0) {
            header.append('<div class="top_panel_mask"></div>');
            mask = header.find('.top_panel_mask');
        }
        if (scroll_offset > adminbar_height) {
            var offset = scroll_offset - adminbar_height;
            if (offset <= header_height) {
                var mask_opacity = Math.max(0, Math.min(0.8, (offset - delta) / header_height));
                header.css('top', Math.round(offset / 1.2) + 'px');
                mask.css({
                    'opacity': mask_opacity,
                    'display': offset == 0 ? 'none' : 'block'
                });
            } else if (parseInt(header.css('top')) != 0) {
                header.css('top', Math.round(offset / 1.2) + 'px');
            }
        } else if (parseInt(header.css('top')) != 0) {
            header.css('top', '0px');
            mask.css({
                'opacity': 0,
                'display': 'none'
            });
        }
        var footer = jQuery('.footer_wrap');
        var footer_height = Math.min(footer.height(), jQuery(window).height());
        var footer_visible = (scroll_offset + jQuery(window).height()) - (header.outerHeight() + jQuery('.page_content_wrap').outerHeight());
        if (footer_visible > 0) {
            mask = footer.find('.top_panel_mask');
            if (mask.length == 0) {
                footer.append('<div class="top_panel_mask"></div>');
                mask = footer.find('.top_panel_mask');
            }
            if (footer_visible <= footer_height) {
                var mask_opacity = Math.max(0, Math.min(0.8, (footer_height - footer_visible) / footer_height));
                footer.css('top', -Math.round((footer_height - footer_visible) / 1.2) + 'px');
                mask.css({
                    'opacity': mask_opacity,
                    'display': footer_height - footer_visible <= 0 ? 'none' : 'block'
                });
            } else if (parseInt(footer.css('top')) != 0) {
                footer.css('top', 0);
                mask.css({
                    'opacity': 0,
                    'display': 'none'
                });
            }
        }
    }
}

function copypress_resize_actions(cont) {
    "use strict";
    copypress_check_layout();
    copypress_fix_sidebar();
    copypress_fix_footer();
    copypress_stretch_width(cont);
    copypress_stretch_height(null, cont);
    copypress_vc_row_fullwidth_to_boxed(cont);
    if (COPYPRESS_STORAGE['menu_side_stretch']) copypress_stretch_sidemenu();
    jQuery(document).trigger('action.resize_copypress', [cont]);
}

function copypress_stretch_sidemenu() {
    "use strict";
    var toc_items = jQuery('.menu_side_wrap .toc_menu_item');
    if (toc_items.length < 5) return;
    var toc_items_height = jQuery(window).height() - jQuery('.menu_side_wrap .sc_layouts_logo').outerHeight() - toc_items.length;
    var th = Math.floor(toc_items_height / toc_items.length);
    var th_add = toc_items_height - th * toc_items.length;
    toc_items.find(".toc_menu_description,.toc_menu_icon").css({
        'height': th + 'px',
        'lineHeight': th + 'px'
    });
    toc_items.eq(0).find(".toc_menu_description,.toc_menu_icon").css({
        'height': (th + th_add) + 'px',
        'lineHeight': (th + th_add) + 'px'
    });
}

function copypress_check_layout() {
    "use strict";
    if (jQuery('body').hasClass('no_layout')) jQuery('body').removeClass('no_layout');
    var w = window.innerWidth;
    if (w == undefined) w = jQuery(window).width() + (jQuery(window).height() < jQuery(document).height() || jQuery(window).scrollTop() > 0 ? 16 : 0);
    if (COPYPRESS_STORAGE['mobile_layout_width'] >= w) {
        if (!jQuery('body').hasClass('mobile_layout')) {
            jQuery('body').removeClass('desktop_layout').addClass('mobile_layout');
        }
    } else {
        if (!jQuery('body').hasClass('desktop_layout')) {
            jQuery('body').removeClass('mobile_layout').addClass('desktop_layout');
            jQuery('.menu_mobile').removeClass('opened');
            jQuery('.menu_mobile_overlay').hide();
        }
    }
}

function copypress_stretch_width(cont) {
    "use strict";
    if (cont === undefined) cont = jQuery('body');
    cont.find('.trx-stretch-width').each(function () {
        "use strict";
        var $el = jQuery(this);
        var $el_cont = $el.parents('.page_wrap');
        var $el_cont_offset = 0;
        if ($el_cont.length == 0) $el_cont = jQuery(window);
        else $el_cont_offset = $el_cont.offset().left;
        var $el_full = $el.next('.trx-stretch-width-original');
        var el_margin_left = parseInt($el.css('margin-left'), 10);
        var el_margin_right = parseInt($el.css('margin-right'), 10);
        var offset = $el_cont_offset - $el_full.offset().left - el_margin_left;
        var width = $el_cont.width();
        if (!$el.hasClass('inited')) {
            $el.addClass('inited invisible');
            $el.css({
                'position': 'relative',
                'box-sizing': 'border-box'
            });
        }
        $el.css({
            'left': offset,
            'width': $el_cont.width()
        });
        if (!$el.hasClass('trx-stretch-content')) {
            var padding = Math.max(0, -1 * offset);
            var paddingRight = Math.max(0, width - padding - $el_full.width() + el_margin_left + el_margin_right);
            $el.css({
                'padding-left': padding + 'px',
                'padding-right': paddingRight + 'px'
            });
        }
        $el.removeClass('invisible');
    });
}

function copypress_stretch_height(e, cont) {
    "use strict";
    if (cont === undefined) cont = jQuery('body');
    cont.find('.trx-stretch-height').each(function () {
        "use strict";
        var fullheight_item = jQuery(this);
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) {
            return;
        }
        var wh = 0;
        var fullheight_row = jQuery(this).parents('.vc_row-o-full-height');
        if (fullheight_row.length > 0) {
            wh = fullheight_row.height();
        } else {
            if (screen.width > 1000) {
                var adminbar = jQuery('#wpadminbar');
                wh = jQuery(window).height() - (adminbar.length > 0 ? adminbar.height() : 0);
            } else wh = 'auto';
        }
        if (wh == 'auto' || wh > 0) fullheight_item.height(wh);
    });
}

function copypress_vc_row_fullwidth_to_boxed(row) {
    "use strict";
    if (jQuery('body').hasClass('body_style_boxed') || jQuery('body').hasClass('menu_style_side')) {
        if (row === undefined) row = jQuery('.vc_row[data-vc-full-width="true"]');
        var width_content = jQuery('.page_wrap').width();
        var width_content_wrap = jQuery('.page_content_wrap .content_wrap').width();
        var indent = (width_content - width_content_wrap) / 2;
        var rtl = jQuery('html').attr('dir') == 'rtl';
        row.each(function () {
            "use strict";
            var mrg = parseInt(jQuery(this).css('marginLeft'));
            jQuery(this).css({
                'width': width_content,
                'left': rtl ? 'auto' : -indent - mrg,
                'right': rtl ? -indent - mrg : 'auto',
                'padding-left': indent + mrg,
                'padding-right': indent + mrg
            });
            if (jQuery(this).attr('data-vc-stretch-content')) {
                jQuery(this).css({
                    'padding-left': 0,
                    'padding-right': 0
                });
            }
        });
    }
}

function copypress_fix_header(rows, resize) {
    "use strict";
    if (jQuery(window).width() <= 800) {
        rows.removeClass('copypress_layouts_row_fixed_on').css({
            'top': 'auto'
        });
        return;
    }
    var scroll_offset = jQuery(window).scrollTop();
    var admin_bar = jQuery('#wpadminbar');
    var rows_offset = Math.max(0, admin_bar.length > 0 && admin_bar.css('position') == 'fixed' ? admin_bar.height() : 0);
    rows.each(function () {
        "use strict";
        var placeholder = jQuery(this).next();
        var offset = parseInt(jQuery(this).hasClass('copypress_layouts_row_fixed_on') ? placeholder.offset().top : jQuery(this).offset().top);
        if (isNaN(offset)) offset = 0;
        if (scroll_offset + rows_offset <= offset) {
            if (jQuery(this).hasClass('copypress_layouts_row_fixed_on')) {
                jQuery(this).removeClass('copypress_layouts_row_fixed_on').css({
                    'top': 'auto'
                });
            }
        } else {
            var h = jQuery(this).outerHeight();
            if (!jQuery(this).hasClass('copypress_layouts_row_fixed_on')) {
                if (rows_offset + h < jQuery(window).height() * 0.33) {
                    placeholder.height(h);
                    jQuery(this).addClass('copypress_layouts_row_fixed_on').css({
                        'top': rows_offset + 'px'
                    });
                    h = jQuery(this).outerHeight();
                }
            } else if (resize && jQuery(this).hasClass('copypress_layouts_row_fixed_on') && jQuery(this).offset().top != rows_offset) {
                jQuery(this).css({
                    'top': rows_offset + 'px'
                });
            }
            rows_offset += h;
        }
    });
}

function copypress_fix_footer() {
    "use strict";
    if (jQuery('body').hasClass('header_position_under') && !copypress_browser_is_mobile()) {
        var ft = jQuery('.footer_wrap');
        if (ft.length > 0) {
            var ft_height = ft.outerHeight(false),
                pc = jQuery('.page_content_wrap'),
                pc_offset = pc.offset().top,
                pc_height = pc.height();
            if (pc_offset + pc_height + ft_height < jQuery(window).height()) {
                if (ft.css('position') != 'absolute') {
                    ft.css({
                        'position': 'absolute',
                        'left': 0,
                        'bottom': 0,
                        'width': '100%'
                    });
                }
            } else {
                if (ft.css('position') != 'static') {
                    ft.css({
                        'position': 'static',
                        'left': 'auto',
                        'bottom': 'auto'
                    });
                }
            }
        }
    }
}

function copypress_fix_sidebar() {
    "use strict";
    var sb = jQuery('.sidebar');
    if (sb.length > 0) {
        if (jQuery('.page_content_wrap .content_wrap .content').css('float') == 'none') {
            if (sb.css('position') == 'fixed') {
                sb.css({
                    'float': sb.hasClass('right') ? 'right' : 'left',
                    'position': 'static'
                });
            }
        } else {
            var sb_height = sb.outerHeight() + 30;
            var content_height = sb.siblings('.content').outerHeight();
            var scroll_offset = jQuery(window).scrollTop();
            var top_panel_height = jQuery('.top_panel').length > 0 ? jQuery('.top_panel').outerHeight() : 0;
            var widgets_above_page_height = jQuery('.widgets_above_page_wrap').length > 0 ? jQuery('.widgets_above_page_wrap').height() : 0;
            var page_padding = parseInt(jQuery('.page_content_wrap').css('paddingTop'));
            if (isNaN(page_padding)) page_padding = 0;
            var top_panel_fixed_height = top_panel_height;
            if (jQuery('.sc_layouts_row_fixed_on').length > 0) {
                top_panel_fixed_height = 0;
                jQuery('.sc_layouts_row_fixed_on').each(function () {
                    top_panel_fixed_height += jQuery(this).outerHeight();
                });
            }
            if (sb_height < content_height && (sb_height >= jQuery(window).height() && scroll_offset + jQuery(window).height() > sb_height + top_panel_height + widgets_above_page_height + page_padding || sb_height < jQuery(window).height() && scroll_offset > top_panel_height + widgets_above_page_height + page_padding)) {
                if (sb.css('position') !== 'fixed') {
                    var sb_top = sb_height >= jQuery(window).height() ? Math.min(0, jQuery(window).height() - sb_height) : top_panel_fixed_height + widgets_above_page_height + page_padding;
                    sb.css({
                        'float': 'none',
                        'position': 'fixed',
                        'top': sb_top + 'px'
                    });
                }
                var pos = jQuery('.page_content_wrap .content_wrap').position();
                pos = pos.left + Math.max(0, parseInt(jQuery('.page_content_wrap .content_wrap').css('paddingLeft'))) + Math.max(0, parseInt(jQuery('.page_content_wrap .content_wrap').css('marginLeft')));
                if (sb.hasClass('right')) sb.css({
                    'right': pos
                });
                else sb.css({
                    'left': pos
                });
                var footer_top = 0;
                var footer_pos = jQuery('.footer_wrap').position();
                var widgets_below_page_pos = jQuery('.widgets_below_page_wrap').position();
                if (widgets_below_page_pos) footer_top = widgets_below_page_pos.top;
                else if (footer_pos) footer_top = footer_pos.top;
                if (footer_top > 0 && scroll_offset + jQuery(window).height() > footer_top) sb.css({
                    'top': Math.min(top_panel_fixed_height + page_padding, jQuery(window).height() - sb_height - (scroll_offset + jQuery(window).height() - footer_top + 30)) + 'px'
                });
                else sb.css({
                    'top': Math.min(top_panel_fixed_height + page_padding, jQuery(window).height() - sb_height) + 'px'
                });
            } else {
                if (sb.css('position') == 'fixed') {
                    sb.css({
                        'float': sb.hasClass('right') ? 'right' : 'left',
                        'position': 'static',
                        'top': 'auto',
                        'left': 'auto',
                        'right': 'auto'
                    });
                }
            }
        }
    }
}

function copypress_init_sfmenu(selector) {
    "use strict";
    jQuery(selector).show().each(function () {
        "use strict";
        var animation_in = jQuery(this).parent().data('animation_in');
        if (animation_in == undefined) animation_in = "none";
        var animation_out = jQuery(this).parent().data('animation_out');
        if (animation_out == undefined) animation_out = "none";
        jQuery(this).addClass('inited').superfish({
            delay: 500,
            animation: {
                opacity: 'show'
            },
            animationOut: {
                opacity: 'hide'
            },
            speed: animation_in != 'none' ? 500 : 200,
            speedOut: animation_out != 'none' ? 500 : 200,
            autoArrows: false,
            dropShadows: false,
            onBeforeShow: function (ul) {
                "use strict";
                if (jQuery(this).parents("ul").length > 1) {
                    var w = jQuery(window).width();
                    var par_offset = jQuery(this).parents("ul").offset().left;
                    var par_width = jQuery(this).parents("ul").outerWidth();
                    var ul_width = jQuery(this).outerWidth();
                    if (par_offset + par_width + ul_width > w - 20 && par_offset - ul_width > 0) jQuery(this).addClass('submenu_left');
                    else jQuery(this).removeClass('submenu_left');
                }
                if (animation_in != 'none') {
                    jQuery(this).removeClass('animated fast ' + animation_out);
                    jQuery(this).addClass('animated fast ' + animation_in);
                }
            },
            onBeforeHide: function (ul) {
                "use strict";
                if (animation_out != 'none') {
                    jQuery(this).removeClass('animated fast ' + animation_in);
                    jQuery(this).addClass('animated fast ' + animation_out);
                }
            }
        });
    });
}

function copypress_init_post_formats(e, cont) {
    "use strict";
    copypress_init_media_elements(cont);
    cont.find('.format-video .post_featured.with_thumb .post_video_hover:not(.inited)').addClass('inited').on('click', function (e) {
        "use strict";
        jQuery(this).parents('.post_featured').addClass('post_video_play').find('.post_video').html(jQuery(this).data('video'));
        jQuery(window).trigger('resize');
        e.preventDefault();
        return false;
    });
}

function copypress_init_media_elements(cont) {
    "use strict";
    if (COPYPRESS_STORAGE['use_mediaelements'] && cont.find('audio:not(.inited),video:not(.inited)').length > 0) {
        if (window.mejs) {
            window.mejs.MepDefaults.enableAutosize = true;
            window.mejs.MediaElementDefaults.enableAutosize = true;
            cont.find('audio:not(.inited),video:not(.inited)').each(function () {
                "use strict";
                if (jQuery(this).parents('.mejs-mediaelement').length == 0 && (COPYPRESS_STORAGE['init_all_mediaelements'] || (!jQuery(this).hasClass('tpl-audio-shortcode') && !jQuery(this).hasClass('wp-video-shortcode') && !jQuery(this).parent().hasClass('wp-playlist')))) {
                    var media_tag = jQuery(this);
                    var settings = {
                        enableAutosize: true,
                        videoWidth: -1,
                        videoHeight: -1,
                        audioWidth: '100%',
                        audioHeight: 30,
                        success: function (mejs) {
                            var autoplay, loop;
                            if ('flash' === mejs.pluginType) {
                                autoplay = mejs.attributes.autoplay && 'false' !== mejs.attributes.autoplay;
                                loop = mejs.attributes.loop && 'false' !== mejs.attributes.loop;
                                autoplay && mejs.addEventListener('canplay', function () {
                                    mejs.play();
                                }, false);
                                loop && mejs.addEventListener('ended', function () {
                                    mejs.play();
                                }, false);
                            }
                        }
                    };
                    jQuery(this).mediaelementplayer(settings);
                }
            });
        } else setTimeout(function () {
            copypress_init_media_elements(cont);
        }, 400);
    }
}

function copypress_tabs_ajax_content_loader(panel, page, oldPanel) {
    "use strict";
    if (panel.html().replace(/\s/g, '') == '') {
        var height = oldPanel === undefined ? panel.height() : oldPanel.height();
        if (isNaN(height) || height < 100) height = 100;
        panel.html('<div class="copypress_tab_holder" style="min-height:' + height + 'px;"></div>');
    } else panel.find('> *').addClass('copypress_tab_content_remove');
    panel.data('need-content', false).addClass('copypress_loading');
    jQuery.post(COPYPRESS_STORAGE['ajax_url'], {
        nonce: COPYPRESS_STORAGE['ajax_nonce'],
        action: 'copypress_ajax_get_posts',
        blog_template: panel.data('blog-template'),
        blog_style: panel.data('blog-style'),
        posts_per_page: panel.data('posts-per-page'),
        cat: panel.data('cat'),
        parent_cat: panel.data('parent-cat'),
        post_type: panel.data('post-type'),
        taxonomy: panel.data('taxonomy'),
        page: page
    }).done(function (response) {
        "use strict";
        panel.removeClass('copypress_loading');
        var rez = {};
        try {
            rez = JSON.parse(response);
        } catch (e) {
            rez = {
                error: COPYPRESS_STORAGE['strings']['ajax_error']
            };
            console.log(response);
        }
        if (rez.error !== '') {
            panel.html('<div class="copypress_error">' + rez.error + '</div>');
        } else {
            panel.prepend(rez.data).fadeIn(function () {
                jQuery(document).trigger('action.init_shortcodes', [panel]);
                jQuery(document).trigger('action.init_hidden_elements', [panel]);
                jQuery(window).trigger('scroll');
                setTimeout(function () {
                    panel.find('.copypress_tab_holder,.copypress_tab_content_remove').remove();
                    jQuery(window).trigger('scroll');
                }, 600);
            });
        }
    });
}

function copypress_comments_validate(form) {
    "use strict";
    form.find('input').removeClass('error_field');
    var comments_args = {
        error_message_text: COPYPRESS_STORAGE['strings']['error_global'],
        error_message_show: true,
        error_message_time: 4000,
        error_message_class: 'copypress_messagebox copypress_messagebox_style_error',
        error_fields_class: 'error_field',
        exit_after_first_error: false,
        rules: [{
            field: 'comment',
            min_length: {
                value: 1,
                message: COPYPRESS_STORAGE['strings']['text_empty']
            },
            max_length: {
                value: COPYPRESS_STORAGE['message_maxlength'],
                message: COPYPRESS_STORAGE['strings']['text_long']
            }
        }]
    };
    if (form.find('.comments_author input[aria-required="true"]').length > 0) {
        comments_args.rules.push({
            field: 'author',
            min_length: {
                value: 1,
                message: COPYPRESS_STORAGE['strings']['name_empty']
            },
            max_length: {
                value: 60,
                message: COPYPRESS_STORAGE['strings']['name_long']
            }
        });
    }
    if (form.find('.comments_email input[aria-required="true"]').length > 0) {
        comments_args.rules.push({
            field: 'email',
            min_length: {
                value: 1,
                message: COPYPRESS_STORAGE['strings']['email_empty']
            },
            max_length: {
                value: 60,
                message: COPYPRESS_STORAGE['strings']['email_long']
            },
            mask: {
                value: COPYPRESS_STORAGE['email_mask'],
                message: COPYPRESS_STORAGE['strings']['email_not_valid']
            }
        });
    }
    var error = copypress_form_validate(form, comments_args);
    return !error;
}
jQuery(document).on('action.init_hidden_elements', function (e, cont) {
    "use strict";
    if (COPYPRESS_STORAGE['button_hover'] && COPYPRESS_STORAGE['button_hover'] != 'default') {
        jQuery('.theme_button:not([class*="sc_button_hover_"]),\ .more-link:not([class*="sc_button_hover_"]),\ .trx_addons_hover_content .trx_addons_hover_links a:not([class*="sc_button_hover_"]),\ .copypress_tabs .copypress_tabs_titles li a:not([class*="sc_button_hover_"]),\ .hover_shop_buttons .icons a:not([class*="sc_button_hover_style_"]),\ .woocommerce #respond input#submit:not([class*="sc_button_hover_"]),\ .woocommerce .button:not([class*="shop_cart"]):not([class*="sc_button_hover_"]),\ .woocommerce-page .button:not([class*="shop_cart"]):not([class*="sc_button_hover_"]),\ #buddypress a.button:not([class*="sc_button_hover_"])\ ').addClass('sc_button_hover_just_init sc_button_hover_' + COPYPRESS_STORAGE['button_hover']);
        if (COPYPRESS_STORAGE['button_hover'] != 'arrow') {
            jQuery('input[type="submit"]:not([class*="sc_button_hover_"]),\ input[type="button"]:not([class*="sc_button_hover_"]),\ .vc_tta-accordion .vc_tta-panel-heading .vc_tta-controls-icon:not([class*="sc_button_hover_"]),\ .vc_tta-color-grey.vc_tta-style-classic .vc_tta-tab > a:not([class*="sc_button_hover_"]),\ .single-product div.product .trx-stretch-width .woocommerce-tabs .wc-tabs li a,\ .woocommerce nav.woocommerce-pagination ul li a:not([class*="sc_button_hover_"]),\ .tribe-events-button:not([class*="sc_button_hover_"]),\ #tribe-bar-views .tribe-bar-views-list .tribe-bar-views-option a:not([class*="sc_button_hover_"]),\ .tribe-bar-mini #tribe-bar-views .tribe-bar-views-list .tribe-bar-views-option a:not([class*="sc_button_hover_"]),\ .tribe-events-cal-links a:not([class*="sc_button_hover_"]),\ .tribe-events-sub-nav li a:not([class*="sc_button_hover_"]),\ .isotope_filters_button:not([class*="sc_button_hover_"]),\ .trx_addons_scroll_to_top:not([class*="sc_button_hover_"]),\ .sc_promo_modern .sc_promo_link2:not([class*="sc_button_hover_"]),\ .post_item_single .post_content .post_meta .post_share .social_item a:not([class*="sc_button_hover_"]),\ .slider_swiper .slider_prev:not([class*="sc_button_hover_"]),\ .slider_swiper .slider_next:not([class*="sc_button_hover_"]),\ .sc_slider_controller_titles .slider_controls_wrap > a:not([class*="sc_button_hover_"]),\ .tagcloud > a:not([class*="sc_button_hover_"])\ ').addClass('sc_button_hover_just_init sc_button_hover_' + COPYPRESS_STORAGE['button_hover']);
        }
        jQuery('.sc_slider_controller_titles .slider_controls_wrap > a:not([class*="sc_button_hover_style_"])\ ').addClass('sc_button_hover_just_init sc_button_hover_style_default');
        jQuery('.trx_addons_hover_content .trx_addons_hover_links a:not([class*="sc_button_hover_style_"]),\ .single-product ul.products li.product .post_data .button:not([class*="sc_button_hover_style_"])\ ').addClass('sc_button_hover_just_init sc_button_hover_style_inverse');
        jQuery('.post_item_single .post_content .post_meta .post_share .social_item a:not([class*="sc_button_hover_style_"]),\ .woocommerce #respond input#submit.alt:not([class*="sc_button_hover_style_"]),\ .woocommerce a.button.alt:not([class*="sc_button_hover_style_"]),\ .woocommerce button.button.alt:not([class*="sc_button_hover_style_"]),\ .woocommerce input.button.alt:not([class*="sc_button_hover_style_"])\ ').addClass('sc_button_hover_just_init sc_button_hover_style_hover');
        jQuery('.woocommerce .woocommerce-message .button:not([class*="sc_button_hover_style_"]),\ .woocommerce .woocommerce-info .button:not([class*="sc_button_hover_style_"])\ ').addClass('sc_button_hover_just_init sc_button_hover_style_alter');
        jQuery('.sidebar .trx_addons_tabs .trx_addons_tabs_titles li a:not([class*="sc_button_hover_style_"]),\ .copypress_tabs .copypress_tabs_titles li a:not([class*="sc_button_hover_style_"]),\ .widget_tag_cloud a:not([class*="sc_button_hover_style_"]),\ .widget_product_tag_cloud a:not([class*="sc_button_hover_style_"])\ ').addClass('sc_button_hover_just_init sc_button_hover_style_alterbd');
        jQuery('.vc_tta-accordion .vc_tta-panel-heading .vc_tta-controls-icon:not([class*="sc_button_hover_style_"]),\ .vc_tta-color-grey.vc_tta-style-classic .vc_tta-tab > a:not([class*="sc_button_hover_style_"]),\ .single-product div.product .trx-stretch-width .woocommerce-tabs .wc-tabs li a:not([class*="sc_button_hover_style_"]),\ .sc_action_item_event .sc_action_item_link:not([class*="sc_button_hover_style_"]),\ .slider_prev:not([class*="sc_button_hover_style_"]),\ .slider_next:not([class*="sc_button_hover_style_"]),\ .trx_addons_video_player.with_cover .video_hover:not([class*="sc_button_hover_style_"]),\ .trx_addons_tabs .trx_addons_tabs_titles li a:not([class*="sc_button_hover_style_"])\ ').addClass('sc_button_hover_just_init sc_button_hover_style_dark');
        setTimeout(function () {
            "use strict";
            jQuery('.sc_button_hover_just_init').removeClass('sc_button_hover_just_init');
        }, 500);
        jQuery('.mejs-controls button,\ .mfp-close,\ .sc_button_bg_image,\ .hover_shop_buttons a,\ .sc_layouts_row_type_narrow .sc_button\ ').removeClass('sc_button_hover_' + COPYPRESS_STORAGE['button_hover']);
    }
});
jQuery(document).on('action.add_googlemap_styles', copypress_trx_addons_add_googlemap_styles);
jQuery(document).on('action.init_shortcodes', copypress_trx_addons_init);
jQuery(document).on('action.init_hidden_elements', copypress_trx_addons_init);

function copypress_trx_addons_add_googlemap_styles(e) {
    TRX_ADDONS_STORAGE['googlemap_styles']['dark'] = [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
        }, {
            "color": "#333333"
        }, {
            "lightness": 40
        }]
    }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#ffffff"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#fefefe"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#fefefe"
        }, {
            "lightness": 17
        }, {
            "weight": 1.2
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "lightness": 20
        }, {
            "color": "#13162b"
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#13162b"
        }, {
            "lightness": 21
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#5fc6ca"
        }, {
            "lightness": 21
        }]
    }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
            "visibility": "simplified"
        }, {
            "color": "#cccdd2"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#13162b"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#ff0000"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#13162b"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 29
        }, {
            "weight": 0.2
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#13162b"
        }, {
            "lightness": 18
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#13162b"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#13162b"
        }, {
            "lightness": 19
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f4f9fc"
        }, {
            "lightness": 17
        }]
    }];
}

function copypress_trx_addons_init(e, container) {
    "use strict";
    if (arguments.length < 2) var container = jQuery('body');
    if (container === undefined || container.length === undefined || container.length == 0) return;
    container.find('.sc_countdown_item canvas:not(.inited)').addClass('inited').attr('data-color', COPYPRESS_STORAGE['alter_link_color']);
}
jQuery(document).on('action.ready_copypress', copypress_js_composer_init);
jQuery(document).on('action.init_shortcodes', copypress_js_composer_init);
jQuery(document).on('action.init_hidden_elements', copypress_js_composer_init);

function copypress_js_composer_init(e, container) {
    "use strict";
    if (arguments.length < 2) var container = jQuery('body');
    if (container === undefined || container.length === undefined || container.length == 0) return;
    container.find('.vc_message_box_closeable:not(.inited)').addClass('inited').on('click', function (e) {
        "use strict";
        jQuery(this).fadeOut();
        e.preventDefault();
        return false;
    });
}