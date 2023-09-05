jQuery(document).ready(function () {
    "use strict";
    TRX_ADDONS_STORAGE['vc_init_counter'] = 0;
    trx_addons_init_actions();
});
jQuery(window).on('beforeunload', function () {
    "use strict";
    if (jQuery.browser && !jQuery.browser.safari) jQuery('#page_preloader').css({
        display: 'block',
        opacity: 0
    }).animate({
        opacity: 0.8
    }, 300);
});

function trx_addons_init_actions() {
    "use strict";
    if (TRX_ADDONS_STORAGE['vc_edit_mode'] > 0 && jQuery('.vc_empty-placeholder').length == 0 && TRX_ADDONS_STORAGE['vc_init_counter']++ < 30) {
        setTimeout(trx_addons_init_actions, 200);
        return;
    }
    jQuery('#page_preloader').animate({
        opacity: 0
    }, 800, function () {
        jQuery(this).css({
            display: 'none'
        });
    });
    if (trx_addons_is_retina()) {
        trx_addons_set_cookie('trx_addons_is_retina', 1, 365);
    }
    jQuery(document).on('action.init_hidden_elements', trx_addons_ready_actions);
    trx_addons_ready_actions();
    trx_addons_resize_actions();
    trx_addons_scroll_actions();
    jQuery(window).resize(function () {
        "use strict";
        trx_addons_resize_actions();
    });
    jQuery(document).on('vc-full-width-row', function (e, el) {
        jQuery(document).trigger('action.resize_vc_row_start', [el]);
        jQuery(document).trigger('action.resize_vc_row_end', [el]);
    });
    jQuery(document).on('action.resize_vc_row_end', function (e, el) {
        trx_addons_resize_actions();
    });
    jQuery(window).scroll(function () {
        "use strict";
        trx_addons_scroll_actions();
    });
}

function trx_addons_ready_actions(e, container) {
    "use strict";
    if (arguments.length < 2) var container = jQuery('body');
    if (TRX_ADDONS_STORAGE['animate_inner_links'] > 0 && !container.hasClass('animate_to_inited')) {
        container.addClass('animate_to_inited').on('click', 'a', function (e) {
            "use strict";
            var href = jQuery(this).attr('href');
            if (href.substr(0, 1) == '#' && href.length > 1) {
                trx_addons_document_animate_to(href);
                e.preventDefault();
                return false;
            }
        });
    }
    if (container.find('.trx_addons_tabs:not(.inited)').length > 0 && jQuery.ui && jQuery.ui.tabs) {
        container.find('.trx_addons_tabs:not(.inited)').each(function () {
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
            var disabled = [];
            jQuery(this).find('> ul > li[data-disabled="true"]').each(function () {
                "use strict";
                disabled.push(jQuery(this).index());
            });
            jQuery(this).addClass('inited').tabs({
                active: init,
                disabled: disabled,
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
    if (container.find('.trx_addons_accordion:not(.inited)').length > 0 && jQuery.ui && jQuery.ui.accordion) {
        container.find('.trx_addons_accordion:not(.inited)').each(function () {
            "use strict";
            var accordion = jQuery(this);
            var headers = accordion.data('headers');
            if (headers === undefined) headers = 'h5';
            var height_style = accordion.data('height-style');
            if (height_style === undefined) height_style = 'content';
            var init = accordion.data('active');
            var active = false;
            if (isNaN(init)) {
                init = 0;
                var active = accordion.find(headers + '[data-active="true"]').eq(0);
                if (active.length > 0) {
                    while (!active.parent().hasClass('trx_addons_accordion')) {
                        active = active.parent();
                    }
                    init = active.index();
                    if (isNaN(init) || init < 0) init = 0;
                }
            } else {
                init = Math.max(0, init);
            }
            accordion.addClass('inited').accordion({
                active: init,
                header: headers,
                heightStyle: height_style,
                create: function (event, ui) {
                    if (ui.panel.length > 0) {
                        jQuery(document).trigger('action.init_hidden_elements', [ui.panel]);
                    } else if (active !== false && active.length > 0) {
                        active.find('>' + headers).trigger('click');
                    }
                },
                activate: function (event, ui) {
                    if (ui.newPanel.length > 0) jQuery(document).trigger('action.init_hidden_elements', [ui.newPanel]);
                }
            });
        });
    }
    jQuery(document).trigger('action.init_sliders', [container]);
    jQuery(document).trigger('action.init_shortcodes', [container]);
    if (container.find('.trx_addons_video_player.with_cover .video_hover:not(.inited)').length > 0) {
        container.find('.trx_addons_video_player.with_cover .video_hover:not(.inited)').addClass('inited').on('click', function (e) {
            "use strict";
            jQuery(this).parents('.trx_addons_video_player').addClass('video_play').find('.video_embed').html(jQuery(this).data('video'));
            var slider = jQuery(this).parents('.slider_swiper');
            if (slider.length > 0) {
                var id = slider.attr('id');
                TRX_ADDONS_STORAGE['swipers'][id].stopAutoplay();
            }
            jQuery(window).trigger('resize');
            e.preventDefault();
            return false;
        });
    }
    if (TRX_ADDONS_STORAGE['popup_engine'] == 'pretty') {
        container.find("a[href$='jpg']:not(.inited),a[href$='jpeg']:not(.inited),a[href$='png']:not(.inited),a[href$='gif']:not(.inited)").attr('rel', 'prettyPhoto[slideshow]');
        var images = container.find("a[rel*='prettyPhoto']:not(.inited):not(.esgbox):not([data-rel*='pretty']):not([rel*='magnific']):not([data-rel*='magnific'])").addClass('inited');
        try {
            images.prettyPhoto({
                social_tools: '',
                theme: 'facebook',
                deeplinking: false
            });
        } catch (e) {
        }
        ;
    } else if (TRX_ADDONS_STORAGE['popup_engine'] == 'magnific') {
        container.find("a[href$='jpg']:not(.inited),a[href$='jpeg']:not(.inited),a[href$='png']:not(.inited),a[href$='gif']:not(.inited)").attr('rel', 'magnific');
        var images = container.find("a[rel*='magnific']:not(.inited):not(.esgbox):not(.prettyphoto):not([rel*='pretty']):not([data-rel*='pretty'])").addClass('inited');
        try {
            images.magnificPopup({
                type: 'image',
                mainClass: 'mfp-img-mobile',
                closeOnContentClick: true,
                closeBtnInside: true,
                fixedContentPos: true,
                midClick: true,
                preloader: true,
                tLoading: TRX_ADDONS_STORAGE['msg_magnific_loading'],
                gallery: {
                    enabled: true
                },
                image: {
                    tError: TRX_ADDONS_STORAGE['msg_magnific_error'],
                    verticalFit: true
                },
                zoom: {
                    enabled: true,
                    duration: 300,
                    easing: 'ease-in-out',
                    opener: function (openerElement) {
                        if (!openerElement.is('img')) {
                            if (openerElement.parents('.trx_addons_hover').find('img').length > 0) openerElement = openerElement.parents('.trx_addons_hover').find('img');
                            else if (openerElement.siblings('img').length > 0) openerElement = openerElement.siblings('img');
                            else if (openerElement.parent().parent().find('img').length > 0) openerElement = openerElement.parent().parent().find('img');
                        }
                        return openerElement;
                    }
                },
                callbacks: {
                    beforeClose: function () {
                        jQuery('.mfp-figure figcaption').hide();
                        jQuery('.mfp-figure .mfp-arrow').hide();
                    }
                }
            });
        } catch (e) {
        }
        ;
        container.find(".trx_addons_popup_link:not(.inited)").addClass('inited').magnificPopup({
            type: 'inline',
            focus: 'input',
            closeBtnInside: true,
            callbacks: {
                open: function () {
                    "use strict";
                    jQuery(document).trigger('action.init_hidden_elements', [jQuery(this.content)]);
                    jQuery(this.content).find('.video_frame > iframe').each(function () {
                        "use strict";
                        var src = jQuery(this).attr('src');
                        if (src.indexOf('youtube') >= 0 || src.indexOf('vimeo') >= 0) {
                            jQuery(this).attr('src', trx_addons_add_to_url(src, {
                                'autoplay': 1
                            }));
                        }
                    });
                },
                resize: function () {
                    trx_addons_resize_actions();
                }
            }
        });
    }
    if (container.find('.post_counters_likes:not(.inited),.comment_counters_likes:not(.inited)').length > 0) {
        container.find('.post_counters_likes:not(.inited),.comment_counters_likes:not(.inited)').addClass('inited').on('click', function (e) {
            "use strict";
            var button = jQuery(this);
            var inc = button.hasClass('enabled') ? 1 : -1;
            var post_id = button.hasClass('post_counters_likes') ? button.data('postid') : button.data('commentid');
            var cookie_likes = trx_addons_get_cookie(button.hasClass('post_counters_likes') ? 'trx_addons_likes' : 'trx_addons_comment_likes');
            if (cookie_likes === undefined || cookie_likes === null) cookie_likes = '';
            jQuery.post(TRX_ADDONS_STORAGE['ajax_url'], {
                action: button.hasClass('post_counters_likes') ? 'post_counter' : 'comment_counter',
                nonce: TRX_ADDONS_STORAGE['ajax_nonce'],
                post_id: post_id,
                likes: inc
            }).done(function (response) {
                "use strict";
                var rez = {};
                try {
                    rez = JSON.parse(response);
                } catch (e) {
                    rez = {
                        error: TRX_ADDONS_STORAGE['msg_ajax_error']
                    };
                    console.log(response);
                }
                if (rez.error === '') {
                    var counter = rez.counter;
                    if (inc == 1) {
                        var title = button.data('title-dislike');
                        button.removeClass('enabled trx_addons_icon-heart-empty').addClass('disabled trx_addons_icon-heart');
                        cookie_likes += (cookie_likes.substr(-1) != ',' ? ',' : '') + post_id + ',';
                    } else {
                        var title = button.data('title-like');
                        button.removeClass('disabled trx_addons_icon-heart').addClass('enabled trx_addons_icon-heart-empty');
                        cookie_likes = cookie_likes.replace(',' + post_id + ',', ',');
                    }
                    button.data('likes', counter).attr('title', title).find(button.hasClass('post_counters_likes') ? '.post_counters_number' : '.comment_counters_number').html(counter);
                    trx_addons_set_cookie(button.hasClass('post_counters_likes') ? 'trx_addons_likes' : 'trx_addons_comment_likes', cookie_likes, 365);
                } else {
                    alert(TRX_ADDONS_STORAGE['msg_error_like']);
                }
            });
            e.preventDefault();
            return false;
        });
    }
    if (container.find('.socials_share .socials_caption:not(.inited)').length > 0) {
        container.find('.socials_share .socials_caption:not(.inited)').each(function () {
            "use strict";
            jQuery(this).addClass('inited').on('click', function (e) {
                "use strict";
                jQuery(this).siblings('.social_items').fadeToggle();
                e.preventDefault();
                return false;
            });
        });
    }
    if (container.find('.socials_share .social_items:not(.inited)').length > 0) {
        container.find('.socials_share .social_items:not(.inited)').each(function () {
            "use strict";
            jQuery(this).addClass('inited').on('click', '.social_item_popup > a.social_icons', function (e) {
                "use strict";
                var url = jQuery(this).data('link');
                window.open(url, '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0');
                e.preventDefault();
                return false;
            });
        });
    }
    container.find('.widget ul > li').each(function () {
        "use strict";
        if (jQuery(this).find('ul').length > 0) {
            jQuery(this).addClass('has_children');
        }
    });
    container.find('.widget_archive a:not(.inited)').addClass('inited').each(function () {
        "use strict";
        var val = jQuery(this).html().split(' ');
        if (val.length > 1) {
            val[val.length - 1] = '<span>' + val[val.length - 1] + '</span>';
            jQuery(this).html(val.join(' '))
        }
    });
    if (!TRX_ADDONS_STORAGE['menu_cache'] || TRX_ADDONS_STORAGE['menu_cache'].length == 0) {
        jQuery('.sc_layouts_menu_nav').each(function () {
            "use strict";
            if (jQuery(this).find('.current-menu-item').length == 0 || jQuery('body').hasClass('blog_template')) {
                if (TRX_ADDONS_STORAGE['menu_cache'] === undefined) TRX_ADDONS_STORAGE['menu_cache'] = [];
                var id = jQuery(this).attr('id');
                if (id === undefined) {
                    id = ('sc_layouts_menu_nav_' + Math.random()).replace('.', '');
                    jQuery(this).attr('id', id);
                }
                TRX_ADDONS_STORAGE['menu_cache'].push('#' + id);
            }
        });
    }
    if (TRX_ADDONS_STORAGE['menu_cache'] && TRX_ADDONS_STORAGE['menu_cache'].length > 0) {
        var href = window.location.href;
        for (var menu in TRX_ADDONS_STORAGE['menu_cache']) {
            menu = jQuery(TRX_ADDONS_STORAGE['menu_cache'][menu] + ':not(.prepared)');
            if (menu.length == 0) continue;
            menu.addClass('prepared');
            menu.find('li').removeClass('current-menu-ancestor current-menu-parent current-menu-item current_page_item');
            menu.find('a[href="' + href + '"]').each(function (idx) {
                var li = jQuery(this).parent();
                li.addClass('current-menu-item');
                if (li.hasClass('menu-item-object-page')) li.addClass('current_page_item');
                var cnt = 0;
                while ((li = li.parents('li')).length > 0) {
                    cnt++;
                    li.addClass('current-menu-ancestor' + (cnt == 1 ? ' current-menu-parent' : ''));
                }
            });
        }
    }
    container.find('.trx_addons_scroll_to_top:not(.inited)').addClass('inited').on('click', function (e) {
        "use strict";
        jQuery('html,body').animate({
            scrollTop: 0
        }, 'slow');
        e.preventDefault();
        return false;
    });
    jQuery(document).trigger('action.ready_trx_addons');
}

function trx_addons_scroll_actions() {
    "use strict";
    var scroll_offset = jQuery(window).scrollTop();
    var scroll_to_top_button = jQuery('.trx_addons_scroll_to_top');
    var adminbar_height = Math.max(0, jQuery('#wpadminbar').height());
    if (scroll_to_top_button.length > 0) {
        if (scroll_offset > 100) scroll_to_top_button.addClass('show');
        else scroll_to_top_button.removeClass('show');
    }
    jQuery('[data-animation^="animated"]:not(.animated)').each(function () {
        "use strict";
        if (jQuery(this).offset().top < scroll_offset + jQuery(window).height()) jQuery(this).addClass(jQuery(this).data('animation'));
    });
    jQuery(document).trigger('action.scroll_trx_addons');
}

function trx_addons_resize_actions(cont) {
    "use strict";
    trx_addons_resize_video(cont);
    jQuery(document).trigger('action.resize_trx_addons', [cont]);
}

function trx_addons_resize_video(cont) {
    if (cont === undefined) cont = jQuery('body');
    cont.find('video').each(function () {
        "use strict";
        var video = jQuery(this).eq(0);
        var ratio = (video.data('ratio') != undefined ? video.data('ratio').split(':') : [16, 9]);
        ratio = ratio.length != 2 || ratio[0] == 0 || ratio[1] == 0 ? 16 / 9 : ratio[0] / ratio[1];
        var mejs_cont = video.parents('.mejs-video');
        var w_attr = video.data('width');
        var h_attr = video.data('height');
        if (!w_attr || !h_attr) {
            w_attr = video.attr('width');
            h_attr = video.attr('height');
            if (!w_attr || !h_attr) return;
            video.data({
                'width': w_attr,
                'height': h_attr
            });
        }
        var percent = ('' + w_attr).substr(-1) == '%';
        w_attr = parseInt(w_attr);
        h_attr = parseInt(h_attr);
        var w_real = Math.round(mejs_cont.length > 0 ? Math.min(percent ? 10000 : w_attr, mejs_cont.parents('div,article').width()) : video.width()),
            h_real = Math.round(percent ? w_real / ratio : w_real / w_attr * h_attr);
        if (parseInt(video.attr('data-last-width')) == w_real) return;
        if (mejs_cont.length > 0 && mejs) {
            trx_addons_set_mejs_player_dimensions(video, w_real, h_real);
        }
        if (percent) {
            video.height(h_real);
        } else {
            video.attr({
                'width': w_real,
                'height': h_real
            }).css({
                'width': w_real + 'px',
                'height': h_real + 'px'
            });
        }
        video.attr('data-last-width', w_real);
    });
    cont.find('.video_frame iframe').each(function () {
        "use strict";
        var iframe = jQuery(this).eq(0);
        if (iframe.attr('src').indexOf('soundcloud') > 0) return;
        var ratio = (iframe.data('ratio') != undefined ? iframe.data('ratio').split(':') : (iframe.parent().data('ratio') != undefined ? iframe.parent().data('ratio').split(':') : (iframe.find('[data-ratio]').length > 0 ? iframe.find('[data-ratio]').data('ratio').split(':') : [16, 9])));
        ratio = ratio.length != 2 || ratio[0] == 0 || ratio[1] == 0 ? 16 / 9 : ratio[0] / ratio[1];
        var w_attr = iframe.attr('width');
        var h_attr = iframe.attr('height');
        if (!w_attr || !h_attr) {
            return;
        }
        var percent = ('' + w_attr).substr(-1) == '%';
        w_attr = parseInt(w_attr);
        h_attr = parseInt(h_attr);
        var pw = iframe.parent().width(),
            ph = iframe.parent().height(),
            w_real = pw,
            h_real = Math.round(percent ? w_real / ratio : w_real / w_attr * h_attr);
        if (iframe.parent().css('position') == 'absolute' && h_real > ph) {
            h_real = ph;
            w_real = Math.round(percent ? h_real * ratio : h_real * w_attr / h_attr)
        }
        if (parseInt(iframe.attr('data-last-width')) == w_real) return;
        iframe.css({
            'width': w_real + 'px',
            'height': h_real + 'px'
        });
        iframe.attr('data-last-width', w_real);
    });
}

function trx_addons_set_mejs_player_dimensions(video, w, h) {
    "use strict";
    if (mejs) {
        for (var pl in mejs.players) {
            if (mejs.players[pl].media.src == video.attr('src')) {
                if (mejs.players[pl].media.setVideoSize) {
                    mejs.players[pl].media.setVideoSize(w, h);
                }
                mejs.players[pl].setPlayerSize(w, h);
                mejs.players[pl].setControlsSize();
            }
        }
    }
}

function trx_addons_get_cookie(name) {
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

function trx_addons_set_cookie(name, value, expires, path, domain, secure) {
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

function trx_addons_del_cookie(name, path, domain) {
    "use strict";
    var path = arguments[1] != undefined ? arguments[1] : '/';
    var domain = arguments[2] != undefined ? arguments[2] : '';
    if (trx_addons_get_cookie(name)) document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

function trx_addons_clear_listbox(box) {
    "use strict";
    for (var i = box.options.length - 1; i >= 0; i--) box.options[i] = null;
}

function trx_addons_add_listbox_item(box, val, text) {
    "use strict";
    var item = new Option();
    item.value = val;
    item.text = text;
    box.options.add(item);
}

function trx_addons_del_listbox_item_by_value(box, val) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].value == val) {
            box.options[i] = null;
            break;
        }
    }
}

function trx_addons_del_listbox_item_by_text(box, txt) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].text == txt) {
            box.options[i] = null;
            break;
        }
    }
}

function trx_addons_find_listbox_item_by_value(box, val) {
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

function trx_addons_find_listbox_item_by_text(box, txt) {
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

function trx_addons_select_listbox_item_by_value(box, val) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        box.options[i].selected = (val == box.options[i].value);
    }
}

function trx_addons_select_listbox_item_by_text(box, txt) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        box.options[i].selected = (txt == box.options[i].text);
    }
}

function trx_addons_get_listbox_values(box) {
    "use strict";
    var delim = arguments[1] ? arguments[1] : ',';
    var str = '';
    for (var i = 0; i < box.options.length; i++) {
        str += (str ? delim : '') + box.options[i].value;
    }
    return str;
}

function trx_addons_get_listbox_texts(box) {
    "use strict";
    var delim = arguments[1] ? arguments[1] : ',';
    var str = '';
    for (var i = 0; i < box.options.length; i++) {
        str += (str ? delim : '') + box.options[i].text;
    }
    return str;
}

function trx_addons_sort_listbox(box) {
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

function trx_addons_get_listbox_selected_index(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) return i;
    }
    return -1;
}

function trx_addons_get_listbox_selected_value(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i].value;
        }
    }
    return null;
}

function trx_addons_get_listbox_selected_text(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i].text;
        }
    }
    return null;
}

function trx_addons_get_listbox_selected_option(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i];
        }
    }
    return null;
}

function trx_addons_get_radio_value(radioGroupObj) {
    "use strict";
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked) return radioGroupObj[i].value;
    return null;
}

function trx_addons_set_radio_checked_by_num(radioGroupObj, num) {
    "use strict";
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked && i != num) radioGroupObj[i].checked = false;
        else if (i == num) radioGroupObj[i].checked = true;
}

function trx_addons_set_radio_checked_by_value(radioGroupObj, val) {
    "use strict";
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked && radioGroupObj[i].value != val) radioGroupObj[i].checked = false;
        else if (radioGroupObj[i].value == val) radioGroupObj[i].checked = true;
}

function trx_addons_form_validate(form, opt) {
    "use strict";
    if (typeof(opt.error_message_show) == 'undefined') opt.error_message_show = true;
    if (typeof(opt.error_message_time) == 'undefined') opt.error_message_time = 5000;
    if (typeof(opt.error_message_class) == 'undefined') opt.error_message_class = 'trx_addons_message_box_error';
    if (typeof(opt.error_message_text) == 'undefined') opt.error_message_text = 'Incorrect data in the fields!';
    if (typeof(opt.error_fields_class) == 'undefined') opt.error_fields_class = 'trx_addons_field_error';
    if (typeof(opt.exit_after_first_error) == 'undefined') opt.exit_after_first_error = false;
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
                        error_msg += '<p class="trx_addons_error_item">' + (typeof(opt.rules[i].min_length.message) != 'undefined' ? opt.rules[i].min_length.message : opt.error_message_text) + '</p>';
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].max_length) == 'object') {
                    if (opt.rules[i].max_length.value > 0 && val.length > opt.rules[i].max_length.value) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="trx_addons_error_item">' + (typeof(opt.rules[i].max_length.message) != 'undefined' ? opt.rules[i].max_length.message : opt.error_message_text) + '</p>';
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].mask) == 'object') {
                    if (opt.rules[i].mask.value != '') {
                        var regexp = new RegExp(opt.rules[i].mask.value);
                        if (!regexp.test(val)) {
                            if (error_msg == '') jQuery(this).get(0).focus();
                            error_msg += '<p class="trx_addons_error_item">' + (typeof(opt.rules[i].mask.message) != 'undefined' ? opt.rules[i].mask.message : opt.error_message_text) + '</p>';
                            error = true;
                        }
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].state) == 'object') {
                    if (opt.rules[i].state.value == 'checked' && !jQuery(this).get(0).checked) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="trx_addons_error_item">' + (typeof(opt.rules[i].state.message) != 'undefined' ? opt.rules[i].state.message : opt.error_message_text) + '</p>';
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].equal_to) == 'object') {
                    if (opt.rules[i].equal_to.value != '' && val != jQuery(jQuery(this).get(0).form[opt.rules[i].equal_to.value]).val()) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="trx_addons_error_item">' + (typeof(opt.rules[i].equal_to.message) != 'undefined' ? opt.rules[i].equal_to.message : opt.error_message_text) + '</p>';
                        error = true;
                    }
                }
                if (opt.error_fields_class != '') jQuery(this).toggleClass(opt.error_fields_class, error);
            }
        }
    });
    if (error_msg != '' && opt.error_message_show) {
        var error_message_box = form.find(".trx_addons_message_box");
        if (error_message_box.length == 0) error_message_box = form.parent().find(".trx_addons_message_box");
        if (error_message_box.length == 0) {
            form.append('<div class="trx_addons_message_box"></div>');
            error_message_box = form.find(".trx_addons_message_box");
        }
        if (opt.error_message_class) error_message_box.toggleClass(opt.error_message_class, true);
        error_message_box.html(error_msg).fadeIn();
        setTimeout(function () {
            error_message_box.fadeOut();
        }, opt.error_message_time);
    }
    return error_msg != '';
}

function trx_addons_document_animate_to(id, callback) {
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
    jQuery('body,html').stop(true).animate({
        scrollTop: oft - jQuery('#wpadminbar').height() + 1
    }, speed, 'linear', callback);
}

function trx_addons_document_set_location(curLoc) {
    "use strict";
    if (history.pushState === undefined || navigator.userAgent.match(/MSIE\s[6-9]/i) != null) return;
    try {
        history.pushState(null, null, curLoc);
        return;
    } catch (e) {
    }
    location.href = curLoc;
}

function trx_addons_add_to_url(loc, prm) {
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

function trx_addons_browser_is_mobile() {
    "use strict";
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function trx_addons_browser_is_ios() {
    "use strict";
    return navigator.userAgent.match(/iPad|iPhone|iPod/i) != null || navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
}

function trx_addons_is_retina() {
    "use strict";
    var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
    return (window.devicePixelRatio > 1) || (window.matchMedia && window.matchMedia(mediaQuery).matches);
}

function trx_addons_get_file_name(path) {
    "use strict";
    path = path.replace(/\\/g, '/');
    var pos = path.lastIndexOf('/');
    if (pos >= 0) path = path.substr(pos + 1);
    return path;
}

function trx_addons_get_file_ext(path) {
    "use strict";
    var pos = path.lastIndexOf('.');
    path = pos >= 0 ? path.substr(pos + 1) : '';
    return path;
}

function trx_addons_check_images_complete(cont) {
    "use strict";
    var complete = true;
    cont.find('img').each(function () {
        if (!complete) return;
        if (!jQuery(this).get(0).complete) complete = false;
    });
    return complete;
}

function trx_addons_replicate(str, num) {
    "use strict";
    var rez = '';
    for (var i = 0; i < num; i++) {
        rez += str;
    }
    return rez;
}

function trx_addons_serialize(mixed_val) {
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
                    var ser = trx_addons_serialize(mixed_val[i]);
                    if (ser) map.push(trx_addons_serialize(idxobj.idx) + ser);
                }
                return "a:" + mixed_val.length + ":{" + map.join("") + "}";
            } else {
                var class_name = trx_addons_get_class(mixed_val);
                if (class_name == undefined) return false;
                var props = new Array();
                for (var prop in mixed_val) {
                    var ser = trx_addons_serialize(mixed_val[prop]);
                    if (ser) props.push(trx_addons_serialize(prop) + ser);
                }
                if (obj_to_array) return "a:" + props.length + ":{" + props.join("") + "}";
                else return "O:" + class_name.length + ":\"" + class_name + "\":" + props.length + ":{" + props.join("") + "}";
            }
        case "undefined":
            return "N;";
    }
    return false;
}

function trx_addons_get_class(obj) {
    "use strict";
    if (obj instanceof Object && !(obj instanceof Array) && !(obj instanceof Function) && obj.constructor) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);
        if (arr && arr.length == 2) return arr[1];
    }
    return false;
}
jQuery(document).on('action.ready_trx_addons', function () {
    "use strict";
    jQuery('form.trx_addons_popup_form_login:not(.inited)').addClass('inited').submit(function (e) {
        "use strict";
        var rez = trx_addons_login_validate(jQuery(this));
        if (!rez) e.preventDefault();
        return rez;
    });
    jQuery('form.trx_addons_popup_form_register:not(.inited)').addClass('inited').submit(function (e) {
        "use strict";
        var rez = trx_addons_registration_validate(jQuery(this));
        if (!rez) e.preventDefault();
        return rez;
    });
});

function trx_addons_login_validate(form) {
    "use strict";
    form.find('input').removeClass('trx_addons_field_error');
    var error = trx_addons_form_validate(form, {
        error_message_time: 4000,
        exit_after_first_error: true,
        rules: [{
            field: "log",
            min_length: {
                value: 1,
                message: TRX_ADDONS_STORAGE['msg_login_empty']
            },
            max_length: {
                value: 60,
                message: TRX_ADDONS_STORAGE['msg_login_long']
            }
        }, {
            field: "pwd",
            min_length: {
                value: 4,
                message: TRX_ADDONS_STORAGE['msg_password_empty']
            },
            max_length: {
                value: 60,
                message: TRX_ADDONS_STORAGE['msg_password_long']
            }
        }]
    });
    if (TRX_ADDONS_STORAGE['login_via_ajax'] && !error) {
        jQuery.post(TRX_ADDONS_STORAGE['ajax_url'], {
            action: 'trx_addons_login_user',
            nonce: TRX_ADDONS_STORAGE['ajax_nonce'],
            redirect_to: form.find('#redirect_to').length == 1 ? form.find('#redirect_to').val() : '',
            remember: form.find('#rememberme').val(),
            user_log: form.find('#log').val(),
            user_pwd: form.find('#pwd').val()
        }).done(function (response) {
            var rez = {};
            try {
                rez = JSON.parse(response);
            } catch (e) {
                rez = {
                    error: TRX_ADDONS_STORAGE['msg_ajax_error']
                };
                console.log(response);
            }
            var result = form.find(".trx_addons_message_box").toggleClass("trx_addons_message_box_error", false).toggleClass("trx_addons_message_box_success", false);
            if (rez.error === '') {
                result.addClass("trx_addons_message_box_success").html(TRX_ADDONS_STORAGE['msg_login_success']);
                setTimeout(function () {
                    if (rez.redirect_to != '') {
                        location.href = rez.redirect_to;
                    } else {
                        location.reload();
                    }
                }, 3000);
            } else {
                result.addClass("trx_addons_message_box_error").html(TRX_ADDONS_STORAGE['msg_login_error'] + (rez.error !== undefined ? '<br>' + rez.error : ''));
            }
            result.fadeIn().delay(3000).fadeOut();
        });
    }
    return !TRX_ADDONS_STORAGE['login_via_ajax'] && !error;
}

function trx_addons_registration_validate(form) {
    "use strict";
    form.find('input').removeClass('trx_addons_field_error');
    var error = trx_addons_form_validate(form, {
        error_message_time: 4000,
        exit_after_first_error: true,
        rules: [{
            field: "agree",
            state: {
                value: 'checked',
                message: TRX_ADDONS_STORAGE['msg_not_agree']
            },
        }, {
            field: "log",
            min_length: {
                value: 1,
                message: TRX_ADDONS_STORAGE['msg_login_empty']
            },
            max_length: {
                value: 60,
                message: TRX_ADDONS_STORAGE['msg_login_long']
            }
        }, {
            field: "email",
            min_length: {
                value: 7,
                message: TRX_ADDONS_STORAGE['msg_email_not_valid']
            },
            max_length: {
                value: 60,
                message: TRX_ADDONS_STORAGE['msg_email_long']
            },
            mask: {
                value: TRX_ADDONS_STORAGE['email_mask'],
                message: TRX_ADDONS_STORAGE['msg_email_not_valid']
            }
        }, {
            field: "pwd",
            min_length: {
                value: 4,
                message: TRX_ADDONS_STORAGE['msg_password_empty']
            },
            max_length: {
                value: 60,
                message: TRX_ADDONS_STORAGE['msg_password_long']
            }
        }, {
            field: "pwd2",
            equal_to: {
                value: 'pwd',
                message: TRX_ADDONS_STORAGE['msg_password_not_equal']
            }
        }]
    });
    if (!error) {
        jQuery.post(TRX_ADDONS_STORAGE['ajax_url'], {
            action: 'trx_addons_registration_user',
            nonce: TRX_ADDONS_STORAGE['ajax_nonce'],
            redirect_to: form.find('#redirect_to').length == 1 ? form.find('#redirect_to').val() : '',
            user_name: form.find('#log').val(),
            user_email: form.find('#email').val(),
            user_pwd: form.find('#pwd').val()
        }).done(function (response) {
            var rez = {};
            try {
                rez = JSON.parse(response);
            } catch (e) {
                rez = {
                    error: TRX_ADDONS_STORAGE['msg_ajax_error']
                };
                console.log(response);
            }
            var result = form.find(".trx_addons_message_box").toggleClass("trx_addons_message_box_error", false).toggleClass("trx_addons_message_box_success", false);
            if (rez.error === '') {
                result.addClass("trx_addons_message_box_success").html(TRX_ADDONS_STORAGE['msg_registration_success']);
                setTimeout(function () {
                    if (rez.redirect_to != '') {
                        location.href = rez.redirect_to;
                    } else {
                        jQuery('#trx_addons_login_popup .trx_addons_tabs_title_login > a').trigger('click');
                    }
                }, 3000);
            } else {
                result.addClass("trx_addons_message_box_error").html(TRX_ADDONS_STORAGE['msg_registration_error'] + (rez.error !== undefined ? '<br>' + rez.error : ''));
            }
            result.fadeIn().delay(3000).fadeOut();
        });
    }
    return false;
}
jQuery(document).on('action.ready_trx_addons', function () {
    "use strict";
    jQuery('body:not(.woocommerce) .widget_area:not(.footer_wrap) .widget_product_categories ul.product-categories .has_children > a').append('<span class="open_child_menu"></span>');
    jQuery('body:not(.woocommerce) .widget_area:not(.footer_wrap) .widget_product_categories').on('click', 'ul.product-categories.plain li a .open_child_menu', function (e) {
        "use strict";
        var $a = jQuery(this).parent();
        if ($a.siblings('ul:visible').length > 0) $a.siblings('ul').slideUp().parent().removeClass('opened');
        else {
            jQuery(this).parents('li').siblings('li').find('ul:visible').slideUp().parent().removeClass('opened');
            $a.siblings('ul').slideDown().parent().addClass('opened');
        }
        e.preventDefault();
        return false;
    });
    jQuery(document).on('action.resize_trx_addons', function () {
        "use strict";
        trx_addons_woocommerce_resize_actions();
    });
    trx_addons_woocommerce_resize_actions();

    function trx_addons_woocommerce_resize_actions() {
        "use strict";
        var cat_menu = jQuery('body:not(.woocommerce) .widget_area:not(.footer_wrap) .widget_product_categories ul.product-categories');
        var sb = cat_menu.parents('.widget_area');
        if (sb.length > 0 && cat_menu.length > 0) {
            if (sb.width() == sb.parents('.content_wrap').width()) {
                if (cat_menu.hasClass('inited')) {
                    cat_menu.removeClass('inited').addClass('plain').superfish('destroy');
                    cat_menu.find('ul.animated').removeClass('animated').addClass('no_animated');
                }
            } else {
                if (!cat_menu.hasClass('inited')) {
                    cat_menu.removeClass('plain').addClass('inited');
                    cat_menu.find('ul.no_animated').removeClass('no_animated').addClass('animated');
                    basekit_init_sfmenu('body:not(.woocommerce) .widget_area:not(.footer_wrap) .widget_product_categories ul.product-categories');
                }
            }
        }
    }

    jQuery('.variations_form.cart:not(.inited)').each(function () {
        "use strict";
        var form = jQuery(this).addClass('inited');
        var trx_addons_attribs = form.find('.trx_addons_attrib_item');
        if (trx_addons_attribs.length == 0) return;
        trx_addons_attribs.on('click', function (e) {
            "use strict";
            if (!jQuery(this).hasClass('trx_addons_attrib_disabled')) {
                jQuery(this).addClass('trx_addons_attrib_selected').siblings().removeClass('trx_addons_attrib_selected');
                var term = jQuery(this).data('value');
                var attrib = jQuery(this).parents('.trx_addons_attrib_extended').data('attrib');
                var select_box = jQuery(this).parents('.trx_addons_attrib_extended').siblings('.select_container').find('#' + attrib).trigger('touchstart');
                select_box.find('option:selected').removeAttr('selected');
                select_box.find('option[value="' + term + '"]').attr('selected', 'selected');
                select_box.trigger('change');
                trx_addons_woocommerce_check_variations(form);
            }
            e.preventDefault();
            return false;
        });
        var busy = false;
        form.find('.variations select').on('click', function (e) {
            "use strict";
            if (!busy) {
                busy = true;
                trx_addons_woocommerce_check_variations(form);
                busy = false;
            }
        });
        trx_addons_woocommerce_check_variations(form);
    });

    function trx_addons_woocommerce_check_variations(form, exclude) {
        "use strict";
        setTimeout(function () {
            if (exclude == undefined) exclude = '';
            form.find('.variations select').each(function () {
                "use strict";
                var select_box = jQuery(this);
                var attrib_box = select_box.parents('.select_container').siblings('.trx_addons_attrib_extended');
                if (select_box.attr('id') != exclude) select_box.trigger('touchstart');
                attrib_box.find('.trx_addons_attrib_item').removeClass('trx_addons_attrib_selected').addClass('trx_addons_attrib_disabled');
                select_box.find('option').each(function () {
                    "use strict";
                    attrib_box.find('.trx_addons_attrib_item[data-value="' + jQuery(this).val() + '"]').removeClass('trx_addons_attrib_disabled').toggleClass('trx_addons_attrib_selected', jQuery(this).get(0).selected);
                });
            });
        }, 10);
    }
});

function trx_addons_sc_fullheight_init(e, container) {
    "use strict";
    if (arguments.length < 2) var container = jQuery('body');
    if (container === undefined || container.length === undefined || container.length == 0) return;
    container.find('.trx_addons_stretch_height').each(function () {
        "use strict";
        var fullheight_item = jQuery(this);
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) {
            return;
        }
        var wh = 0;
        var fullheight_row = jQuery(this).parents('.vc_row-o-full-height');
        if (fullheight_row.length > 0) {
            wh = fullheight_row.css('height') != 'auto' ? fullheight_row.height() : 'auto';
        } else {
            if (screen.height > 1000) {
                var adminbar = jQuery('#wpadminbar');
                wh = jQuery(window).height() - (adminbar.length > 0 ? adminbar.height() : 0);
            } else wh = 'auto';
        }
        if (wh == 'auto' || wh > 0) fullheight_item.height(wh);
    });
}
jQuery(document).on('action.ready_trx_addons', function () {
    "use strict";
    var rows = jQuery('.sc_layouts_row_fixed');
    if (rows.length > 0) {
        rows.each(function () {
            "use strict";
            if (!jQuery(this).next().hasClass('sc_layouts_row_fixed_placeholder')) jQuery(this).after('<div class="sc_layouts_row_fixed_placeholder"></div>');
        });
        jQuery(document).on('action.scroll_trx_addons', function () {
            "use strict";
            trx_addons_cpt_layouts_fix_rows(rows, false);
        });
        jQuery(document).on('action.resize_trx_addons', function () {
            "use strict";
            trx_addons_cpt_layouts_fix_rows(rows, true);
        });
    }

    function trx_addons_cpt_layouts_fix_rows(rows, resize) {
        "use strict";
        if (jQuery(window).width() <= 800) {
            rows.removeClass('sc_layouts_row_fixed_on').css({
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
            var offset = parseInt(jQuery(this).hasClass('sc_layouts_row_fixed_on') ? placeholder.offset().top : jQuery(this).offset().top);
            if (isNaN(offset)) offset = 0;
            if (scroll_offset + rows_offset <= offset) {
                if (jQuery(this).hasClass('sc_layouts_row_fixed_on')) {
                    jQuery(this).removeClass('sc_layouts_row_fixed_on').css({
                        'top': 'auto'
                    });
                }
            } else {
                var h = jQuery(this).outerHeight();
                if (!jQuery(this).hasClass('sc_layouts_row_fixed_on')) {
                    if (rows_offset + h < jQuery(window).height() * 0.33) {
                        placeholder.height(h);
                        jQuery(this).addClass('sc_layouts_row_fixed_on').css({
                            'top': rows_offset + 'px'
                        });
                        h = jQuery(this).outerHeight();
                    }
                } else if (resize && jQuery(this).hasClass('sc_layouts_row_fixed_on') && jQuery(this).offset().top != rows_offset) {
                    jQuery(this).css({
                        'top': rows_offset + 'px'
                    });
                }
                rows_offset += h;
            }
        });
    }

    jQuery('[id*="sc_layouts_iconed_text_"]').each(function () {
        jQuery(this).parent().addClass('contacts');
    });
});
jQuery(document).on('action.ready_trx_addons', function () {
    "use strict";
    jQuery('.sc_layouts_logo').on('click', function (e) {
        "use strict";
        if (jQuery(this).attr('href') == '#') {
            trx_addons_document_animate_to(0);
            e.preventDefault();
            return false;
        }
    });
});
jQuery(document).on('action.ready_trx_addons', function () {
    "use strict";
    if (jQuery('.search_wrap:not(.inited)').length > 0) {
        jQuery('.search_wrap:not(.inited)').each(function () {
            "use strict";
            var search_wrap = jQuery(this).addClass('inited');
            var search_field = search_wrap.find('.search_field');
            var ajax_timer = null;
            search_field.on('keyup', function (e) {
                "use strict";
                if (e.keyCode == 27) {
                    search_field.val('');
                    trx_addons_search_close(search_wrap);
                    e.preventDefault();
                    return;
                }
                if (search_wrap.hasClass('search_ajax')) {
                    var s = search_field.val();
                    if (ajax_timer) {
                        clearTimeout(ajax_timer);
                        ajax_timer = null;
                    }
                    if (s.length >= 4) {
                        ajax_timer = setTimeout(function () {
                            jQuery.post(TRX_ADDONS_STORAGE['ajax_url'], {
                                action: 'ajax_search',
                                nonce: TRX_ADDONS_STORAGE['ajax_nonce'],
                                text: s
                            }).done(function (response) {
                                "use strict";
                                clearTimeout(ajax_timer);
                                ajax_timer = null;
                                var rez = {};
                                if (response == '' || response == 0) {
                                    rez = {
                                        error: TRX_ADDONS_STORAGE['msg_search_error']
                                    };
                                } else {
                                    try {
                                        rez = JSON.parse(response);
                                    } catch (e) {
                                        rez = {
                                            error: TRX_ADDONS_STORAGE['msg_search_error']
                                        };
                                        console.log(response);
                                    }
                                }
                                var msg = rez.error === '' ? rez.data : rez.error;
                                search_field.parents('.search_ajax').find('.search_results_content').empty().append(msg);
                                search_field.parents('.search_ajax').find('.search_results').fadeIn();
                            });
                        }, 500);
                    }
                }
            });
            search_wrap.find('.search_submit').on('click', function (e) {
                "use strict";
                if ((search_wrap.hasClass('search_style_expand') || search_wrap.hasClass('search_style_fullscreen')) && !search_wrap.hasClass('search_opened')) {
                    search_wrap.addClass('search_opened');
                    setTimeout(function () {
                        search_field.get(0).focus();
                    }, 500);
                } else if (search_field.val() == '') {
                    if (search_wrap.hasClass('search_opened')) trx_addons_search_close(search_wrap);
                    else search_field.get(0).focus();
                } else {
                    search_wrap.find('form').get(0).submit();
                }
                e.preventDefault();
                return false;
            });
            search_wrap.find('.search_close').on('click', function (e) {
                "use strict";
                trx_addons_search_close(search_wrap);
                e.preventDefault();
                return false;
            });
            search_wrap.find('.search_results_close').on('click', function (e) {
                "use strict";
                jQuery(this).parent().fadeOut();
                e.preventDefault();
                return false;
            });
            search_wrap.on('click', '.search_more', function (e) {
                "use strict";
                if (search_field.val() != '') search_wrap.find('form').get(0).submit();
                e.preventDefault();
                return false;
            });
        });
    }

    function trx_addons_search_close(search_wrap) {
        search_wrap.removeClass('search_opened');
        search_wrap.find('.search_results').fadeOut();
    }
});
jQuery(document).on('action.ready_trx_addons', function () {
    "use strict";
    if (jQuery('.sc_layouts_cart').length > 0) {
        jQuery('body:not(.added_to_cart_inited)').addClass('added_to_cart_inited').bind('added_to_cart', function () {
            "use strict";
            var total = jQuery('.widget_shopping_cart').eq(0).find('.total .amount').text();
            if (total != undefined) {
                jQuery('.sc_layouts_cart_summa').text(total);
            }
            var cnt = 0;
            jQuery('.widget_shopping_cart_content').eq(0).find('.cart_list li').each(function () {
                var q = jQuery(this).find('.quantity').html().split(' ', 2);
                if (!isNaN(q[0])) cnt += Number(q[0]);
            });
            var items = jQuery('.sc_layouts_cart_items').eq(0).text().split(' ', 2);
            items[0] = cnt;
            jQuery('.sc_layouts_cart_items').text(items[0] + ' ' + items[1]);
            jQuery('.sc_layouts_cart_items_short').text(items[0]);
            jQuery('.sc_layouts_cart').data({
                'items': cnt ? cnt : 0,
                'summa': total ? total : 0
            });
        });
        jQuery('.sc_layouts_cart:not(.inited)').addClass('inited').on('click', '.sc_layouts_cart_icon,.sc_layouts_cart_details', function (e) {
            "use strict";
            var widget = jQuery(this).siblings('.sc_layouts_cart_widget');
            if (widget.length > 0 && widget.text().replace(/\s*/g, '') != '') {
                jQuery(this).siblings('.sc_layouts_cart_widget').slideToggle();
            }
            e.preventDefault();
            return false;
        }).on('click', '.sc_layouts_cart_widget_close', function (e) {
            "use strict";
            jQuery(this).parent().slideUp();
            e.preventDefault();
            return false;
        });
    }
});
jQuery(document).on('action.ready_trx_addons', function () {
    "use strict";
    trx_addons_init_sfmenu('.sc_layouts_menu > ul:not(.inited)');
    jQuery('.sc_layouts_menu').each(function () {
        "use strict";
        if (jQuery(this).find('>ul.inited').length == 1) jQuery(this).addClass('menu_show');
    });
    jQuery('.menu_hover_slide_line:not(.slide_inited),.menu_hover_slide_box:not(.slide_inited)').each(function () {
        "use strict";
        var menu = jQuery(this).addClass('slide_inited');
        var style = menu.hasClass('menu_hover_slide_line') ? 'line' : 'box';
        setTimeout(function () {
            "use strict";
            menu.find('>ul').spasticNav({
                style: style,
                colorOverride: false
            });
        }, 500);
    });
});

function trx_addons_init_sfmenu(selector) {
    "use strict";
    jQuery(selector).show().each(function () {
        "use strict";
        var animation_in = jQuery(this).parent().data('animation-in');
        if (animation_in == undefined) animation_in = "none";
        var animation_out = jQuery(this).parent().data('animation-out');
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
(function ($) {
    $.fn.spasticNav = function (options) {
        options = $.extend({
            overlap: 0,
            style: 'box',
            reset: 50,
            color: '#00c6ff',
            colorOverride: true,
        }, options);
        return this.each(function () {
            var nav = $(this),
                currentPageItem = nav.find('>.current-menu-item,>.current-menu-parent,>.current-menu-ancestor'),
                hidden = false,
                blob, reset;
            if (currentPageItem.length === 0) {
                currentPageItem = nav.find('li').eq(0);
                hidden = true;
            }
            var a = currentPageItem.find('>a');
            $('<li id="blob"></li>').css({
                width: options.style == 'box' ? a.outerWidth() : a.width(),
                left: currentPageItem.position().left,
                top: currentPageItem.position().top - options.overlap / 2,
                opacity: hidden ? 0 : 1
            }).appendTo(this);
            blob = $('#blob', nav);
            if (options.style == 'box') blob.css({
                height: currentPageItem.outerHeight() + options.overlap
            });
            if (options.colorOverride) {
                var bg = a.css('backgroundColor');
                blob.css({
                    backgroundColor: hidden || bg == 'transparent' ? options.color : bg
                });
            }
            nav.find('>li:not(#blob)').hover(function () {
                clearTimeout(reset);
                var a = $(this).find('>a');
                if (options.colorOverride) {
                    var bg = a.css('backgroundColor');
                    if (bg != 'transparent') blob.css({
                        backgroundColor: bg
                    });
                }
                $(this).addClass('blob_over');
                blob.css({
                    left: $(this).position().left,
                    top: $(this).position().top - options.overlap / 2,
                    width: options.style == 'box' ? a.outerWidth() : a.width(),
                    opacity: 1
                });
            }, function () {
                reset = setTimeout(function () {
                    var a = currentPageItem.find('>a');
                    if (options.colorOverride) {
                        var bg = a.css('backgroundColor');
                        if (bg != 'transparent') blob.css({
                            backgroundColor: bg
                        });
                    }
                    blob.css({
                        width: options.style == 'box' ? a.outerWidth() : a.width(),
                        left: currentPageItem.position().left,
                        opacity: hidden ? 0 : 1,
                    });
                }, options.reset);
                $(this).removeClass('blob_over');
            });
        });
    };
})(jQuery);
jQuery(document).on('action.ready_trx_addons', function () {
    "use strict";
    jQuery('.sc_services_tabs:not(.inited)').addClass('inited').on('click', '.sc_services_tabs_list_item:not(.sc_services_tabs_list_item_active)', function (e) {
        "use strict";
        jQuery(this).siblings().removeClass('sc_services_tabs_list_item_active');
        jQuery(this).addClass('sc_services_tabs_list_item_active');
        var content = jQuery(this).parent().siblings('.sc_services_tabs_content');
        var items = content.find('.sc_services_item');
        content.find('.sc_services_item_active').addClass('sc_services_item_flip').removeClass('sc_services_item_active');
        items.eq(jQuery(this).index()).addClass('sc_services_item_active');
        setTimeout(function () {
            "use strict";
            content.find('.sc_services_item_flip').addClass('trx_addons_hidden').removeClass('sc_services_item_flip');
            items.removeClass('sc_services_item_flipping');
            setTimeout(function () {
                "use strict";
                items.removeClass('trx_addons_hidden');
            }, 600);
        }, 600);
        if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
            setTimeout(function () {
                "use strict";
                content.find('.sc_services_item_active').addClass('sc_services_item_flipping');
            }, 250);
        }
        e.preventDefault();
        return false;
    });
});
jQuery(document).on('action.init_sliders', trx_addons_init_sliders);
jQuery(document).on('action.init_hidden_elements', trx_addons_init_hidden_sliders);

function trx_addons_init_sliders(e, container) {
    "use strict";
    if (container.find('.sc_slider_controller:not(.inited)').length > 0) {
        container.find('.sc_slider_controller:not(.inited)').each(function () {
            "use strict";
            var controller = jQuery(this).addClass('inited');
            var slider_id = controller.data('slider-id');
            if (!slider_id) return;
            var controller_id = controller.attr('id');
            if (controller_id == undefined) {
                controller_id = 'sc_slider_controller_' + Math.random();
                controller_id = controller_id.replace('.', '');
                controller.attr('id', controller_id);
            }
            jQuery('#' + slider_id + ' .slider_swiper').attr('data-controller', controller_id);
            var controller_style = controller.data('style');
            var controller_effect = controller.data('effect');
            var controller_interval = controller.data('interval');
            var controller_height = controller.data('height');
            var controller_per_view = controller.data('slides-per-view');
            var controller_space = controller.data('slides-space');
            var controller_controls = controller.data('controls');
            var controller_html = '';
            jQuery('#' + slider_id + ' .swiper-slide').each(function (idx) {
                "use strict";
                var slide = jQuery(this);
                var image = slide.data('image');
                var title = slide.data('title');
                var cats = slide.data('cats');
                var date = slide.data('date');
                controller_html += '<div class="swiper-slide"' + ' style="' + (image !== undefined ? 'background-image: url(' + image + ');' : '') + '"' + '>' + '<div class="sc_slider_controller_info">' + '<span class="sc_slider_controller_info_number">' + (idx < 9 ? '0' : '') + (idx + 1) + '</span>' + '<span class="sc_slider_controller_info_title">' + title + '</span>' + '</div>' + '</div>';
            });
            controller.html('<div id="' + controller_id + '_outer"' + ' class="slider_swiper_outer slider_style_controller' + ' slider_outer_' + (controller_controls == 1 ? 'controls slider_outer_controls_side' : 'nocontrols') + ' slider_outer_nopagination' + ' slider_outer_' + (controller_per_view == 1 ? 'one' : 'multi') + '"' + '>' + '<div id="' + controller_id + '_swiper"' + ' class="slider_swiper swiper-slider-container' + ' slider_' + (controller_controls == 1 ? 'controls slider_controls_side' : 'nocontrols') + ' slider_nopagination' + ' slider_notitles' + ' slider_noresize' + ' slider_' + (controller_per_view == 1 ? 'one' : 'multi') + '"' + ' data-slides-min-width="100"' + ' data-controlled-slider="' + slider_id + '"' + (controller_effect !== undefined ? ' data-effect="' + controller_effect + '"' : '') + (controller_interval !== undefined ? ' data-interval="' + controller_interval + '"' : '') + (controller_per_view !== undefined ? ' data-slides-per-view="' + controller_per_view + '"' : '') + (controller_space !== undefined ? ' data-slides-space="' + controller_space + '"' : '') + (controller_height !== undefined ? ' style="height:' + controller_height + '"' : '') + '>' + '<div class="swiper-wrapper">' + controller_html + '</div>' + '</div>' + (controller_controls == 1 ? '<div class="slider_controls_wrap"><a class="slider_prev swiper-button-prev" href="#"></a><a class="slider_next swiper-button-next" href="#"></a></div>' : '') + '</div>');
        });
    }
    if (container.find('.slider_swiper:not(.inited)').length > 0) {
        container.find('.slider_swiper:not(.inited)').each(function () {
            "use strict";
            if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
            var slider = jQuery(this);
            var id = slider.attr('id');
            if (id == undefined) {
                id = 'swiper_' + Math.random();
                id = id.replace('.', '');
                slider.attr('id', id);
            }
            var cont = slider.parent().hasClass('slider_swiper_outer') ? slider.parent().attr('id', id + '_outer') : slider;
            var cont_id = cont.attr('id');
            var is_controller = slider.parents('.sc_slider_controller').length > 0;
            var controller_id = slider.data('controller');
            slider.find('.swiper-slide').each(function (idx) {
                jQuery(this).attr('data-slide-number', idx);
            });
            slider.css({
                'display': 'block',
                'opacity': 0
            }).addClass(id).addClass('inited').data('settings', {
                mode: 'horizontal'
            });
            var smw = slider.data('slides-min-width');
            if (smw == undefined) {
                smw = 180;
                slider.attr('data-slides-min-width', smw);
            }
            var width = slider.width();
            if (width == 0) width = slider.parent().width();
            var spv = slider.data('slides-per-view');
            if (spv == undefined) {
                spv = 1;
                slider.attr('data-slides-per-view', spv);
            }
            if (width / spv < smw) spv = Math.max(1, Math.floor(width / smw));
            var space = slider.data('slides-space');
            if (space == undefined) space = 0;
            var interval = slider.data('interval');
            if (interval === undefined) interval = Math.round(5000 * (1 + Math.random()));
            if (isNaN(interval)) interval = 0;
            if (TRX_ADDONS_STORAGE['swipers'] === undefined) TRX_ADDONS_STORAGE['swipers'] = {};
            TRX_ADDONS_STORAGE['swipers'][id] = new Swiper('.' + id, {
                calculateHeight: !slider.hasClass('slider_height_fixed'),
                resizeReInit: true,
                autoResize: true,
                effect: slider.data('effect') ? slider.data('effect') : 'slide',
                pagination: slider.hasClass('slider_pagination') ? '#' + cont_id + ' .slider_pagination_wrap' : false,
                paginationClickable: slider.hasClass('slider_pagination') ? '#' + cont_id + ' .slider_pagination_wrap' : false,
                paginationType: slider.hasClass('slider_pagination') && slider.data('pagination') ? slider.data('pagination') : 'bullets',
                nextButton: slider.hasClass('slider_controls') ? '#' + cont_id + ' .slider_next' : false,
                prevButton: slider.hasClass('slider_controls') ? '#' + cont_id + ' .slider_prev' : false,
                autoplay: slider.hasClass('slider_noautoplay') || interval == 0 ? false : parseInt(interval),
                autoplayDisableOnInteraction: true,
                initialSlide: 0,
                slidesPerView: spv,
                loopedSlides: spv,
                spaceBetween: space,
                speed: 600,
                centeredSlides: false,
                loop: true,
                grabCursor: !is_controller,
                slideToClickedSlide: is_controller,
                touchRatio: is_controller ? 0.2 : 1,
                onSlideChangeStart: function (swiper) {
                    cont.find('.slider_titles_outside_wrap .active').removeClass('active').fadeOut();
                    var controlled_slider = jQuery('#' + slider.data(is_controller ? 'controlled-slider' : 'controller') + ' .slider_swiper');
                    var controlled_id = controlled_slider.attr('id');
                    if (TRX_ADDONS_STORAGE['swipers'][controlled_id] && jQuery('#' + controlled_id).attr('data-busy') != 1) {
                        slider.attr('data-busy', 1);
                        setTimeout(function () {
                            slider.attr('data-busy', 0);
                        }, 300);
                        var slide_number = jQuery(swiper.slides[swiper.activeIndex]).data('slide-number');
                        var slide_idx = controlled_slider.find('[data-slide-number="' + slide_number + '"]').index();
                        TRX_ADDONS_STORAGE['swipers'][controlled_id].slideTo(slide_idx);
                    }
                },
                onSlideChangeEnd: function (swiper) {
                    var titles = cont.find('.slider_titles_outside_wrap .slide_info');
                    if (titles.length == 0) return;
                    titles.eq(jQuery(swiper.slides[swiper.activeIndex]).data('slide-number')).addClass('active').fadeIn(300);
                    cont.find('.trx_addons_video_player.with_cover.video_play').removeClass('video_play').find('.video_embed').empty();
                    slider.attr('data-busy', 0);
                }
            });
            slider.attr('data-busy', 1).animate({
                'opacity': 1
            }, 'fast');
            setTimeout(function () {
                slider.attr('data-busy', 0);
            }, 300);
        });
    }
}

function trx_addons_init_hidden_sliders(e, container) {
    "use strict";
    trx_addons_init_sliders(e, container);
    trx_addons_resize_sliders(e, container);
}
jQuery(document).on('action.resize_trx_addons', trx_addons_resize_sliders);

function trx_addons_resize_sliders(e, container) {
    "use strict";
    if (container === undefined) container = jQuery('body');
    container.find('.slider_swiper.inited').each(function () {
        "use strict";
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
        var id = jQuery(this).attr('id');
        var slider_width = jQuery(this).width();
        var slide = jQuery(this).find('.swiper-slide').eq(0);
        var slide_width = slide.width();
        var slide_height = slide.height();
        var last_width = jQuery(this).data('last-width');
        if (isNaN(last_width)) last_width = 0;
        var ratio = jQuery(this).data('ratio');
        if (ratio === undefined || ('' + ratio).indexOf(':') < 1) {
            ratio = slide_height > 0 ? slide_width + ':' + slide_height : "16:9";
            jQuery(this).attr('data-ratio', ratio);
        }
        ratio = ratio.split(':');
        var ratio_x = !isNaN(ratio[0]) ? Number(ratio[0]) : 16;
        var ratio_y = !isNaN(ratio[1]) ? Number(ratio[1]) : 9;
        if (!jQuery(this).hasClass('slider_noresize') || jQuery(this).height() == 0) {
            jQuery(this).height(Math.floor(slide_width / ratio_x * ratio_y));
        }
        if (TRX_ADDONS_STORAGE['swipers'][id].params.slidesPerView != 'auto') {
            if (last_width == 0 || last_width != slider_width) {
                var smw = jQuery(this).data('slides-min-width');
                var spv = jQuery(this).data('slides-per-view');
                if (slider_width / spv < smw) spv = Math.max(1, Math.floor(slider_width / smw));
                jQuery(this).data('last-width', slider_width);
                if (TRX_ADDONS_STORAGE['swipers'][id].params.slidesPerView != spv) {
                    TRX_ADDONS_STORAGE['swipers'][id].params.slidesPerView = spv;
                    TRX_ADDONS_STORAGE['swipers'][id].params.loopedSlides = spv;
                }
                TRX_ADDONS_STORAGE['swipers'][id].onResize();
            }
        }
    });
}
jQuery(document).on('action.init_shortcodes', function (e, container) {
    "use strict";
    var toc_menu = jQuery('#toc_menu');
    if (toc_menu.length == 0) trx_addons_build_page_toc();
    toc_menu = jQuery('#toc_menu:not(.inited)');
    if (toc_menu.length == 0) return;
    var toc_menu_items = toc_menu.addClass('inited').find('.toc_menu_item');
    trx_addons_detect_active_toc();
    var wheel_busy = false,
        wheel_time = 0;
    jQuery('.toc_menu_item > a').on('click', function (e) {
        "use strict";
        if (trx_addons_scroll_to_anchor(jQuery(this), true)) {
            e.preventDefault();
            return false;
        }
    });
    jQuery(window).on('scroll', function () {
        "use strict";
        trx_addons_mark_active_toc();
    });
    trx_addons_mark_active_toc();
    if (TRX_ADDONS_STORAGE['scroll_to_anchor'] == 1) {
        var wheel_stop = false;
        jQuery(document).on('action.stop_wheel_handlers', function (e) {
            "use strict";
            wheel_stop = true;
        });
        jQuery(document).on('action.start_wheel_handlers', function (e) {
            "use strict";
            wheel_stop = false;
        });
        jQuery(window).bind('mousewheel DOMMouseScroll', function (e) {
            if (screen.width < 960 || jQuery(window).width() < 960 || wheel_stop || trx_addons_browser_is_ios()) {
                return;
            }
            if (wheel_busy || wheel_time == e.timeStamp) {
                e.preventDefault();
                return false;
            }
            wheel_time = e.timeStamp;
            var wheel_dir = e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? -1 : 1;
            var items = trx_addons_detect_active_toc();
            var doit = false;
            var scroll_offset = parseInt(jQuery(window).scrollTop());
            var wh = jQuery(window).height();
            var ah = jQuery('#wpadminbar').length > 0 ? jQuery('#wpadminbar').height() : 0;
            if (wheel_dir == -1) {
                doit = true;
                setTimeout(function () {
                    if (items.prev >= 0 && items.prevOffset >= scroll_offset - wh - ah) trx_addons_scroll_to_anchor(toc_menu_items.eq(items.prev).find('a'), false);
                    else trx_addons_document_animate_to(Math.max(0, scroll_offset - wh));
                }, 10);
            } else {
                doit = true;
                setTimeout(function () {
                    if (items.next >= 0 && items.nextOffset <= scroll_offset + wh + ah) trx_addons_scroll_to_anchor(toc_menu_items.eq(items.next).find('a'), false);
                    else trx_addons_document_animate_to(Math.min(jQuery(document).height(), scroll_offset + wh));
                }, 10);
            }
            if (doit) {
                wheel_busy = true;
                setTimeout(function () {
                    wheel_busy = false;
                }, trx_addons_browser_is_ios() ? 1200 : 100);
                e.preventDefault();
                return false;
            }
        });
    }

    function trx_addons_detect_active_toc() {
        "use strict";
        var items = {
            loc: '',
            current: [],
            prev: -1,
            prevOffset: -1,
            next: -1,
            nextOffset: -1
        };
        toc_menu_items.each(function (idx) {
            "use strict";
            var id = '#' + jQuery(this).data('id');
            var pos = id.indexOf('#');
            if (pos < 0 || id.length == 1) return;
            var href = jQuery(this).find('a').attr('href');
            var href_pos = href.indexOf('#');
            if (href_pos < 0) href_pos = href.length;
            var loc = window.location.href;
            var pos2 = loc.indexOf('#');
            if (pos2 > 0) loc = loc.substring(0, pos2);
            var now = pos == 0;
            if (!now) now = loc == href.substring(0, href_pos);
            if (!now) return;
            var off = jQuery(id).offset().top;
            var id_next = jQuery(this).next().find('a').attr('href');
            var off_next = id_next ? parseInt(jQuery(id_next).offset().top) : 1000000;
            var scroll_offset = parseInt(jQuery(window).scrollTop());
            if (off > scroll_offset + 50) {
                if (items.next < 0) {
                    items.next = idx;
                    items.nextOffset = off;
                }
            } else if (off < scroll_offset - 50) {
                items.prev = idx;
                items.prevOffset = off;
            }
            if (off < scroll_offset + jQuery(window).height() * 0.8 && scroll_offset < off_next - 50) {
                items.current.push(idx);
                if (items.loc == '') items.loc = href_pos == 0 ? loc + id : id;
            }
        });
        return items;
    }

    function trx_addons_mark_active_toc() {
        "use strict";
        var items = trx_addons_detect_active_toc();
        toc_menu_items.removeClass('toc_menu_item_active');
        for (var i = 0; i < items.current.length; i++) {
            toc_menu_items.eq(items.current[i]).addClass('toc_menu_item_active');
            if (items.loc != '' && TRX_ADDONS_STORAGE['update_location_from_anchor'] == 1 && !trx_addons_browser_is_mobile() && !trx_addons_browser_is_ios() && !wheel_busy) trx_addons_document_set_location(items.loc);
        }
    }

    function trx_addons_scroll_to_anchor(link_obj, click_event) {
        "use strict";
        var href = click_event ? link_obj.attr('href') : '#' + link_obj.parent().data('id');
        if (href === undefined) return false;
        var pos = href.indexOf('#');
        if (pos < 0 || href.length == 1) return false;
        if (jQuery(href.substr(pos)).length > 0) {
            var loc = window.location.href;
            var pos2 = loc.indexOf('#');
            if (pos2 > 0) loc = loc.substring(0, pos2);
            var now = pos == 0;
            if (!now) now = loc == href.substring(0, pos);
            if (now) {
                wheel_busy = true;
                setTimeout(function () {
                    wheel_busy = false;
                }, trx_addons_browser_is_ios() ? 1200 : 100);
                trx_addons_document_animate_to(href.substr(pos), function () {
                    if (TRX_ADDONS_STORAGE['update_location_from_anchor'] == 1) trx_addons_document_set_location(pos == 0 ? loc + href : href);
                });
                return true;
            }
        }
        return false;
    }
});

function trx_addons_build_page_toc() {
    "use strict";
    var toc = '',
        toc_count = 0;
    jQuery('[id^="toc_menu_"],.sc_anchor').each(function (idx) {
        "use strict";
        var obj = jQuery(this);
        var obj_id = obj.attr('id') || ('sc_anchor_' + Math.random()).replace('.', '');
        var row = obj.parents('.wpb_row');
        if (row.length == 0) row = obj.parent();
        var row_id = row.length > 0 && row.attr('id') != undefined && row.attr('id') != '' ? row.attr('id') : '';
        var id = row_id || obj_id.substr(10);
        if (row.length > 0 && row_id == '') {
            row.attr('id', id);
        }
        var url = obj.data('url');
        var icon = obj.data('icon') || 'toc_menu_icon_default';
        var title = obj.attr('title');
        var description = obj.data('description');
        var separator = obj.data('separator');
        toc_count++;
        toc += '<div class="toc_menu_item' + (separator == 'yes' ? ' toc_menu_separator' : '') + '" data-id="' + id + '">' + (title || description ? '<a href="' + (url ? url : '#' + id) + '" class="toc_menu_description">' + (title ? '<span class="toc_menu_description_title">' + title + '</span>' : '') + (description ? '<span class="toc_menu_description_text">' + description + '</span>' : '') + '</a>' : '') + '<a href="' + (url ? url : '#' + id) + '" class="toc_menu_icon ' + icon + '"></a>' + '</div>';
    });
    if (toc_count > 0) jQuery('body').append('<div id="toc_menu" class="toc_menu"><div class="toc_menu_inner">' + toc + '</div></div>');
}
jQuery(document).on('action.init_shortcodes', function (e, container) {
    "use strict";
    if (container.find('.sc_form_form:not(.inited)').length > 0) {
        container.find('.sc_form_form:not(.inited)').addClass('inited').submit(function (e) {
            "use strict";
            sc_form_validate(jQuery(this));
            e.preventDefault();
            return false;
        });
    }
    jQuery('[class*="sc_input_hover_"] input, [class*="sc_input_hover_"] textarea').each(function () {
        "use strict";
        sc_form_mark_filled(jQuery(this));
    });
    jQuery('[class*="sc_input_hover_"] input, [class*="sc_input_hover_"] textarea').on('blur change', function () {
        "use strict";
        sc_form_mark_filled(jQuery(this));
    });
    jQuery('input, textarea, select').on('change', function () {
        "use strict";
        jQuery(this).removeClass('trx_addons_field_error');
    });
});

function sc_form_mark_filled(field) {
    "use strict";
    if (field.val() != '') field.addClass('filled');
    else field.removeClass('filled');
}

function sc_form_validate(form) {
    "use strict";
    var url = form.attr('action');
    if (url == '') return false;
    form.find('input').removeClass('trx_addons_error_field');
    var error = trx_addons_form_validate(form, {
        rules: [{
            field: "name",
            min_length: {
                value: 1,
                message: TRX_ADDONS_STORAGE['msg_field_name_empty']
            },
        }, {
            field: "email",
            min_length: {
                value: 1,
                message: TRX_ADDONS_STORAGE['msg_field_email_empty']
            },
            mask: {
                value: TRX_ADDONS_STORAGE['email_mask'],
                message: TRX_ADDONS_STORAGE['msg_field_email_not_valid']
            }
        }, {
            field: "message",
            min_length: {
                value: 1,
                message: TRX_ADDONS_STORAGE['msg_field_text_empty']
            },
        }]
    });
    if (!error && url != '#') {
        jQuery.post(url, {
            action: "send_sc_form",
            nonce: TRX_ADDONS_STORAGE['ajax_nonce'],
            data: form.serialize()
        }).done(function (response) {
            "use strict";
            var rez = {};
            try {
                rez = JSON.parse(response);
            } catch (e) {
                rez = {
                    error: TRX_ADDONS_STORAGE['msg_ajax_error']
                };
                console.log(response);
            }
            var result = form.find(".trx_addons_message_box").toggleClass("trx_addons_message_box_error", false).toggleClass("trx_addons_message_box_success", false);
            if (rez.error === '') {
                form.get(0).reset();
                result.addClass("trx_addons_message_box_success").html(TRX_ADDONS_STORAGE['msg_send_complete']);
            } else {
                result.addClass("trx_addons_message_box_error").html(TRX_ADDONS_STORAGE['msg_send_error'] + ' ' + rez.error);
            }
            result.fadeIn().delay(3000).fadeOut();
        });
    }
    return !error;
}
jQuery(document).on('action.init_hidden_elements', trx_addons_sc_googlemap_init);
jQuery(document).on('action.init_shortcodes', trx_addons_sc_googlemap_init);

function trx_addons_sc_googlemap_init(e, container) {
    if (arguments.length < 2) var container = jQuery('body');
    if (container.find('.sc_googlemap:not(.inited)').length > 0) {
        container.find('.sc_googlemap:not(.inited)').each(function () {
            "use strict";
            if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
            var map = jQuery(this).addClass('inited');
            var map_id = map.attr('id');
            var map_zoom = map.data('zoom');
            var map_style = map.data('style');
            var map_markers = [];
            map.find('.sc_googlemap_marker').each(function () {
                "use strict";
                var marker = jQuery(this);
                map_markers.push({
                    icon: marker.data('icon'),
                    address: marker.data('address'),
                    latlng: marker.data('latlng'),
                    description: marker.data('description'),
                    title: marker.data('title')
                });
            });
            trx_addons_sc_googlemap_create(jQuery('#' + map_id).get(0), {
                style: map_style,
                zoom: map_zoom,
                markers: map_markers
            });
        });
    }
}

function trx_addons_sc_googlemap_create(dom_obj, coords) {
    "use strict";
    if (typeof TRX_ADDONS_STORAGE['googlemap_init_obj'] == 'undefined') trx_addons_sc_googlemap_init_styles();
    TRX_ADDONS_STORAGE['googlemap_init_obj'].geocoder = '';
    try {
        var id = dom_obj.id;
        TRX_ADDONS_STORAGE['googlemap_init_obj'][id] = {
            dom: dom_obj,
            markers: coords.markers,
            geocoder_request: false,
            opt: {
                zoom: coords.zoom,
                center: null,
                scrollwheel: false,
                scaleControl: false,
                disableDefaultUI: false,
                panControl: true,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                styles: TRX_ADDONS_STORAGE['googlemap_styles'][coords.style ? coords.style : 'default'],
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        };
        trx_addons_sc_googlemap_build(id);
    } catch (e) {
        console.log(TRX_ADDONS_STORAGE['msg_sc_googlemap_not_avail']);
    }
    ;
}

function trx_addons_sc_googlemap_refresh() {
    "use strict";
    for (id in TRX_ADDONS_STORAGE['googlemap_init_obj']) {
        trx_addons_sc_googlemap_build(id);
    }
}

function trx_addons_sc_googlemap_build(id) {
    "use strict";
    TRX_ADDONS_STORAGE['googlemap_init_obj'][id].map = new google.maps.Map(TRX_ADDONS_STORAGE['googlemap_init_obj'][id].dom, TRX_ADDONS_STORAGE['googlemap_init_obj'][id].opt);
    for (var i in TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers) TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].inited = false;
    trx_addons_sc_googlemap_add_markers(id);
    jQuery(document).on('action.resize_trx_addons', function () {
        if (TRX_ADDONS_STORAGE['googlemap_init_obj'][id].map) TRX_ADDONS_STORAGE['googlemap_init_obj'][id].map.setCenter(TRX_ADDONS_STORAGE['googlemap_init_obj'][id].opt.center);
    });
}

function trx_addons_sc_googlemap_add_markers(id) {
    "use strict";
    for (var i in TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers) {
        if (TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].inited) continue;
        if (TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].latlng == '') {
            if (TRX_ADDONS_STORAGE['googlemap_init_obj'][id].geocoder_request !== false) continue;
            if (TRX_ADDONS_STORAGE['googlemap_init_obj'].geocoder == '') TRX_ADDONS_STORAGE['googlemap_init_obj'].geocoder = new google.maps.Geocoder();
            TRX_ADDONS_STORAGE['googlemap_init_obj'][id].geocoder_request = i;
            TRX_ADDONS_STORAGE['googlemap_init_obj'].geocoder.geocode({
                address: TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].address
            }, function (results, status) {
                "use strict";
                if (status == google.maps.GeocoderStatus.OK) {
                    var idx = TRX_ADDONS_STORAGE['googlemap_init_obj'][id].geocoder_request;
                    if (results[0].geometry.location.lat && results[0].geometry.location.lng) {
                        TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = '' + results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
                    } else {
                        TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = results[0].geometry.location.toString().replace(/\(\)/g, '');
                    }
                    TRX_ADDONS_STORAGE['googlemap_init_obj'][id].geocoder_request = false;
                    setTimeout(function () {
                        trx_addons_sc_googlemap_add_markers(id);
                    }, 200);
                } else dcl(TRX_ADDONS_STORAGE['msg_sc_googlemap_geocoder_error'] + ' ' + status);
            });
        } else {
            var latlngStr = TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].latlng.split(',');
            var markerInit = {
                map: TRX_ADDONS_STORAGE['googlemap_init_obj'][id].map,
                position: new google.maps.LatLng(latlngStr[0], latlngStr[1]),
                clickable: TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].description != ''
            };
            if (TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].icon) markerInit.icon = TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].icon;
            if (TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].title) markerInit.title = TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].title;
            TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].marker = new google.maps.Marker(markerInit);
            if (TRX_ADDONS_STORAGE['googlemap_init_obj'][id].opt.center == null) {
                TRX_ADDONS_STORAGE['googlemap_init_obj'][id].opt.center = markerInit.position;
                TRX_ADDONS_STORAGE['googlemap_init_obj'][id].map.setCenter(TRX_ADDONS_STORAGE['googlemap_init_obj'][id].opt.center);
            }
            if (TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].description != '') {
                TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].infowindow = new google.maps.InfoWindow({
                    content: TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].description
                });
                google.maps.event.addListener(TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].marker, "click", function (e) {
                    var latlng = e.latLng.toString().replace("(", '').replace(")", "").replace(" ", "");
                    for (var i in TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers) {
                        if (trx_addons_googlemap_compare_latlng(latlng, TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].latlng)) {
                            TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].infowindow.open(TRX_ADDONS_STORAGE['googlemap_init_obj'][id].map, TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].marker);
                            break;
                        }
                    }
                });
            }
            TRX_ADDONS_STORAGE['googlemap_init_obj'][id].markers[i].inited = true;
        }
    }
}

function trx_addons_googlemap_compare_latlng(l1, l2) {
    "use strict";
    var l1 = l1.replace(/\s/g, '', l1).split(',');
    var l2 = l2.replace(/\s/g, '', l2).split(',');
    var m0 = Math.min(l1[0].length, l2[0].length);
    var m1 = Math.min(l1[1].length, l2[1].length);
    return l1[0].substring(0, m0) == l2[0].substring(0, m0) && l1[1].substring(0, m1) == l2[1].substring(0, m1);
}

function trx_addons_sc_googlemap_init_styles() {
    TRX_ADDONS_STORAGE['googlemap_init_obj'] = {};
    TRX_ADDONS_STORAGE['googlemap_styles'] = {
        'default': [],
        'greyscale': [{
            "stylers": [{
                "saturation": -100
            }]
        }],
        'inverse': [{
            "stylers": [{
                "invert_lightness": true
            }, {
                "visibility": "on"
            }]
        }],
        'simple': [{
            stylers: [{
                hue: "#00ffe6"
            }, {
                saturation: -20
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                lightness: 100
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }]
    };
    jQuery(document).trigger('action.add_googlemap_styles');
}
'use strict';
(function (window, document) {
    'use strict';

    function Pathformer(element) {
        if (typeof element === 'undefined') {
            throw new Error('Pathformer [constructor]: "element" parameter is required');
        }
        if (element.constructor === String) {
            element = document.getElementById(element);
            if (!element) {
                throw new Error('Pathformer [constructor]: "element" parameter is not related to an existing ID');
            }
        }
        if (element.constructor instanceof window.SVGElement || /^svg$/i.test(element.nodeName)) {
            this.el = element;
        } else {
            throw new Error('Pathformer [constructor]: "element" parameter must be a string or a SVGelement');
        }
        this.scan(element);
    }

    Pathformer.prototype.TYPES = ['line', 'ellipse', 'circle', 'polygon', 'polyline', 'rect'];
    Pathformer.prototype.ATTR_WATCH = ['cx', 'cy', 'points', 'r', 'rx', 'ry', 'x', 'x1', 'x2', 'y', 'y1', 'y2'];
    Pathformer.prototype.scan = function (svg) {
        var fn, element, pathData, pathDom, elements = svg.querySelectorAll(this.TYPES.join(','));
        for (var i = 0; i < elements.length; i++) {
            element = elements[i];
            fn = this[element.tagName.toLowerCase() + 'ToPath'];
            pathData = fn(this.parseAttr(element.attributes));
            pathDom = this.pathMaker(element, pathData);
            element.parentNode.replaceChild(pathDom, element);
        }
    };
    Pathformer.prototype.lineToPath = function (element) {
        var newElement = {};
        newElement.d = 'M' + element.x1 + ',' + element.y1 + 'L' + element.x2 + ',' + element.y2;
        return newElement;
    };
    Pathformer.prototype.rectToPath = function (element) {
        var newElement = {},
            x = parseFloat(element.x) || 0,
            y = parseFloat(element.y) || 0,
            width = parseFloat(element.width) || 0,
            height = parseFloat(element.height) || 0;
        newElement.d = 'M' + x + ' ' + y + ' ';
        newElement.d += 'L' + (x + width) + ' ' + y + ' ';
        newElement.d += 'L' + (x + width) + ' ' + (y + height) + ' ';
        newElement.d += 'L' + x + ' ' + (y + height) + ' Z';
        return newElement;
    };
    Pathformer.prototype.polylineToPath = function (element) {
        var i, path;
        var newElement = {};
        var points = element.points.trim().split(' ');
        if (element.points.indexOf(',') === -1) {
            var formattedPoints = [];
            for (i = 0; i < points.length; i += 2) {
                formattedPoints.push(points[i] + ',' + points[i + 1]);
            }
            points = formattedPoints;
        }
        path = 'M' + points[0];
        for (i = 1; i < points.length; i++) {
            if (points[i].indexOf(',') !== -1) {
                path += 'L' + points[i];
            }
        }
        newElement.d = path;
        return newElement;
    };
    Pathformer.prototype.polygonToPath = function (element) {
        var newElement = Pathformer.prototype.polylineToPath(element);
        newElement.d += 'Z';
        return newElement;
    };
    Pathformer.prototype.ellipseToPath = function (element) {
        var startX = element.cx - element.rx,
            startY = element.cy;
        var endX = parseFloat(element.cx) + parseFloat(element.rx),
            endY = element.cy;
        var newElement = {};
        newElement.d = 'M' + startX + ',' + startY + 'A' + element.rx + ',' + element.ry + ' 0,1,1 ' + endX + ',' + endY + 'A' + element.rx + ',' + element.ry + ' 0,1,1 ' + startX + ',' + endY;
        return newElement;
    };
    Pathformer.prototype.circleToPath = function (element) {
        var newElement = {};
        var startX = element.cx - element.r,
            startY = element.cy;
        var endX = parseFloat(element.cx) + parseFloat(element.r),
            endY = element.cy;
        newElement.d = 'M' + startX + ',' + startY + 'A' + element.r + ',' + element.r + ' 0,1,1 ' + endX + ',' + endY + 'A' + element.r + ',' + element.r + ' 0,1,1 ' + startX + ',' + endY;
        return newElement;
    };
    Pathformer.prototype.pathMaker = function (element, pathData) {
        var i, attr, pathTag = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        for (i = 0; i < element.attributes.length; i++) {
            attr = element.attributes[i];
            if (this.ATTR_WATCH.indexOf(attr.name) === -1) {
                pathTag.setAttribute(attr.name, attr.value);
            }
        }
        for (i in pathData) {
            pathTag.setAttribute(i, pathData[i]);
        }
        return pathTag;
    };
    Pathformer.prototype.parseAttr = function (element) {
        var attr, output = {};
        for (var i = 0; i < element.length; i++) {
            attr = element[i];
            if (this.ATTR_WATCH.indexOf(attr.name) !== -1 && attr.value.indexOf('%') !== -1) {
                throw new Error('Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into \'path\' tags. Please use \'viewBox\'.');
            }
            output[attr.name] = attr.value;
        }
        return output;
    };
    'use strict';
    var requestAnimFrame, cancelAnimFrame, parsePositiveInt;

    function Vivus(element, options, callback) {
        this.isReady = false;
        this.setElement(element, options);
        this.setOptions(options);
        this.setCallback(callback);
        if (this.isReady) {
            this.init();
        }
    }

    Vivus.LINEAR = function (x) {
        return x;
    };
    Vivus.EASE = function (x) {
        return -Math.cos(x * Math.PI) / 2 + 0.5;
    };
    Vivus.EASE_OUT = function (x) {
        return 1 - Math.pow(1 - x, 3);
    };
    Vivus.EASE_IN = function (x) {
        return Math.pow(x, 3);
    };
    Vivus.EASE_OUT_BOUNCE = function (x) {
        var base = -Math.cos(x * (0.5 * Math.PI)) + 1,
            rate = Math.pow(base, 1.5),
            rateR = Math.pow(1 - x, 2),
            progress = -Math.abs(Math.cos(rate * (2.5 * Math.PI))) + 1;
        return (1 - rateR) + (progress * rateR);
    };
    Vivus.prototype.setElement = function (element, options) {
        if (typeof element === 'undefined') {
            throw new Error('Vivus [constructor]: "element" parameter is required');
        }
        if (element.constructor === String) {
            element = document.getElementById(element);
            if (!element) {
                throw new Error('Vivus [constructor]: "element" parameter is not related to an existing ID');
            }
        }
        this.parentEl = element;
        if (options && options.file) {
            var objElm = document.createElement('object');
            objElm.setAttribute('type', 'image/svg+xml');
            objElm.setAttribute('data', options.file);
            objElm.setAttribute('built-by-vivus', 'true');
            element.appendChild(objElm);
            element = objElm;
        }
        switch (element.constructor) {
            case window.SVGSVGElement:
            case window.SVGElement:
                this.el = element;
                this.isReady = true;
                break;
            case window.HTMLObjectElement:
                var onLoad, self;
                self = this;
                onLoad = function (e) {
                    if (self.isReady) {
                        return;
                    }
                    self.el = element.contentDocument && element.contentDocument.querySelector('svg');
                    if (!self.el && e) {
                        throw new Error('Vivus [constructor]: object loaded does not contain any SVG');
                    } else if (self.el) {
                        if (element.getAttribute('built-by-vivus')) {
                            self.parentEl.insertBefore(self.el, element);
                            self.parentEl.removeChild(element);
                            self.el.setAttribute('width', '100%');
                            self.el.setAttribute('height', '100%');
                        }
                        self.isReady = true;
                        self.init();
                        return true;
                    }
                };
                if (!onLoad()) {
                    element.addEventListener('load', onLoad);
                }
                break;
            default:
                throw new Error('Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)');
        }
    };
    Vivus.prototype.setOptions = function (options) {
        var allowedTypes = ['delayed', 'async', 'oneByOne', 'scenario', 'scenario-sync'];
        var allowedStarts = ['inViewport', 'manual', 'autostart'];
        if (options !== undefined && options.constructor !== Object) {
            throw new Error('Vivus [constructor]: "options" parameter must be an object');
        } else {
            options = options || {};
        }
        if (options.type && allowedTypes.indexOf(options.type) === -1) {
            throw new Error('Vivus [constructor]: ' + options.type + ' is not an existing animation `type`');
        } else {
            this.type = options.type || allowedTypes[0];
        }
        if (options.start && allowedStarts.indexOf(options.start) === -1) {
            throw new Error('Vivus [constructor]: ' + options.start + ' is not an existing `start` option');
        } else {
            this.start = options.start || allowedStarts[0];
        }
        this.isIE = (window.navigator.userAgent.indexOf('MSIE') !== -1 || window.navigator.userAgent.indexOf('Trident/') !== -1 || window.navigator.userAgent.indexOf('Edge/') !== -1);
        this.duration = parsePositiveInt(options.duration, 120);
        this.delay = parsePositiveInt(options.delay, null);
        this.dashGap = parsePositiveInt(options.dashGap, 1);
        this.forceRender = options.hasOwnProperty('forceRender') ? !!options.forceRender : this.isIE;
        this.selfDestroy = !!options.selfDestroy;
        this.onReady = options.onReady;
        this.frameLength = this.currentFrame = this.map = this.delayUnit = this.speed = this.handle = null;
        this.ignoreInvisible = options.hasOwnProperty('ignoreInvisible') ? !!options.ignoreInvisible : false;
        this.animTimingFunction = options.animTimingFunction || Vivus.LINEAR;
        this.pathTimingFunction = options.pathTimingFunction || Vivus.LINEAR;
        if (this.delay >= this.duration) {
            throw new Error('Vivus [constructor]: delay must be shorter than duration');
        }
    };
    Vivus.prototype.setCallback = function (callback) {
        if (!!callback && callback.constructor !== Function) {
            throw new Error('Vivus [constructor]: "callback" parameter must be a function');
        }
        this.callback = callback || function () {
            };
    };
    Vivus.prototype.mapping = function () {
        var i, paths, path, pAttrs, pathObj, totalLength, lengthMeter, timePoint;
        timePoint = totalLength = lengthMeter = 0;
        paths = this.el.querySelectorAll('path');
        for (i = 0; i < paths.length; i++) {
            path = paths[i];
            if (this.isInvisible(path)) {
                continue;
            }
            pathObj = {
                el: path,
                length: Math.ceil(path.getTotalLength())
            };
            if (isNaN(pathObj.length)) {
                if (window.console && console.warn) {
                    console.warn('Vivus [mapping]: cannot retrieve a path element length', path);
                }
                continue;
            }
            this.map.push(pathObj);
            path.style.strokeDasharray = pathObj.length + ' ' + (pathObj.length + this.dashGap * 2);
            path.style.strokeDashoffset = pathObj.length + this.dashGap;
            pathObj.length += this.dashGap;
            totalLength += pathObj.length;
            this.renderPath(i);
        }
        totalLength = totalLength === 0 ? 1 : totalLength;
        this.delay = this.delay === null ? this.duration / 3 : this.delay;
        this.delayUnit = this.delay / (paths.length > 1 ? paths.length - 1 : 1);
        for (i = 0; i < this.map.length; i++) {
            pathObj = this.map[i];
            switch (this.type) {
                case 'delayed':
                    pathObj.startAt = this.delayUnit * i;
                    pathObj.duration = this.duration - this.delay;
                    break;
                case 'oneByOne':
                    pathObj.startAt = lengthMeter / totalLength * this.duration;
                    pathObj.duration = pathObj.length / totalLength * this.duration;
                    break;
                case 'async':
                    pathObj.startAt = 0;
                    pathObj.duration = this.duration;
                    break;
                case 'scenario-sync':
                    path = pathObj.el;
                    pAttrs = this.parseAttr(path);
                    pathObj.startAt = timePoint + (parsePositiveInt(pAttrs['data-delay'], this.delayUnit) || 0);
                    pathObj.duration = parsePositiveInt(pAttrs['data-duration'], this.duration);
                    timePoint = pAttrs['data-async'] !== undefined ? pathObj.startAt : pathObj.startAt + pathObj.duration;
                    this.frameLength = Math.max(this.frameLength, (pathObj.startAt + pathObj.duration));
                    break;
                case 'scenario':
                    path = pathObj.el;
                    pAttrs = this.parseAttr(path);
                    pathObj.startAt = parsePositiveInt(pAttrs['data-start'], this.delayUnit) || 0;
                    pathObj.duration = parsePositiveInt(pAttrs['data-duration'], this.duration);
                    this.frameLength = Math.max(this.frameLength, (pathObj.startAt + pathObj.duration));
                    break;
            }
            lengthMeter += pathObj.length;
            this.frameLength = this.frameLength || this.duration;
        }
    };
    Vivus.prototype.drawer = function () {
        var self = this;
        this.currentFrame += this.speed;
        if (this.currentFrame <= 0) {
            this.stop();
            this.reset();
            this.callback(this);
        } else if (this.currentFrame >= this.frameLength) {
            this.stop();
            this.currentFrame = this.frameLength;
            this.trace();
            if (this.selfDestroy) {
                this.destroy();
            }
            this.callback(this);
        } else {
            this.trace();
            this.handle = requestAnimFrame(function () {
                self.drawer();
            });
        }
    };
    Vivus.prototype.trace = function () {
        var i, progress, path, currentFrame;
        currentFrame = this.animTimingFunction(this.currentFrame / this.frameLength) * this.frameLength;
        for (i = 0; i < this.map.length; i++) {
            path = this.map[i];
            progress = (currentFrame - path.startAt) / path.duration;
            progress = this.pathTimingFunction(Math.max(0, Math.min(1, progress)));
            if (path.progress !== progress) {
                path.progress = progress;
                path.el.style.strokeDashoffset = Math.floor(path.length * (1 - progress));
                this.renderPath(i);
            }
        }
    };
    Vivus.prototype.renderPath = function (index) {
        if (this.forceRender && this.map && this.map[index]) {
            var pathObj = this.map[index],
                newPath = pathObj.el.cloneNode(true);
            pathObj.el.parentNode.replaceChild(newPath, pathObj.el);
            pathObj.el = newPath;
        }
    };
    Vivus.prototype.init = function () {
        this.frameLength = 0;
        this.currentFrame = 0;
        this.map = [];
        new Pathformer(this.el);
        this.mapping();
        this.starter();
        if (this.onReady) {
            this.onReady(this);
        }
    };
    Vivus.prototype.starter = function () {
        switch (this.start) {
            case 'manual':
                return;
            case 'autostart':
                this.play();
                break;
            case 'inViewport':
                var self = this,
                    listener = function () {
                        if (self.isInViewport(self.parentEl, 1)) {
                            self.play();
                            window.removeEventListener('scroll', listener);
                        }
                    };
                window.addEventListener('scroll', listener);
                listener();
                break;
        }
    };
    Vivus.prototype.getStatus = function () {
        return this.currentFrame === 0 ? 'start' : this.currentFrame === this.frameLength ? 'end' : 'progress';
    };
    Vivus.prototype.reset = function () {
        return this.setFrameProgress(0);
    };
    Vivus.prototype.finish = function () {
        return this.setFrameProgress(1);
    };
    Vivus.prototype.setFrameProgress = function (progress) {
        progress = Math.min(1, Math.max(0, progress));
        this.currentFrame = Math.round(this.frameLength * progress);
        this.trace();
        return this;
    };
    Vivus.prototype.play = function (speed) {
        if (speed && typeof speed !== 'number') {
            throw new Error('Vivus [play]: invalid speed');
        }
        this.speed = speed || 1;
        if (!this.handle) {
            this.drawer();
        }
        return this;
    };
    Vivus.prototype.stop = function () {
        if (this.handle) {
            cancelAnimFrame(this.handle);
            this.handle = null;
        }
        return this;
    };
    Vivus.prototype.destroy = function () {
        this.stop();
        var i, path;
        for (i = 0; i < this.map.length; i++) {
            path = this.map[i];
            path.el.style.strokeDashoffset = null;
            path.el.style.strokeDasharray = null;
            this.renderPath(i);
        }
    };
    Vivus.prototype.isInvisible = function (el) {
        var rect, ignoreAttr = el.getAttribute('data-ignore');
        if (ignoreAttr !== null) {
            return ignoreAttr !== 'false';
        }
        if (this.ignoreInvisible) {
            rect = el.getBoundingClientRect();
            return !rect.width && !rect.height;
        } else {
            return false;
        }
    };
    Vivus.prototype.parseAttr = function (element) {
        var attr, output = {};
        if (element && element.attributes) {
            for (var i = 0; i < element.attributes.length; i++) {
                attr = element.attributes[i];
                output[attr.name] = attr.value;
            }
        }
        return output;
    };
    Vivus.prototype.isInViewport = function (el, h) {
        var scrolled = this.scrollY(),
            viewed = scrolled + this.getViewportH(),
            elBCR = el.getBoundingClientRect(),
            elHeight = elBCR.height,
            elTop = scrolled + elBCR.top,
            elBottom = elTop + elHeight;
        h = h || 0;
        return (elTop + elHeight * h) <= viewed && (elBottom) >= scrolled;
    };
    Vivus.prototype.docElem = window.document.documentElement;
    Vivus.prototype.getViewportH = function () {
        var client = this.docElem.clientHeight,
            inner = window.innerHeight;
        if (client < inner) {
            return inner;
        } else {
            return client;
        }
    };
    Vivus.prototype.scrollY = function () {
        return window.pageYOffset || this.docElem.scrollTop;
    };
    requestAnimFrame = (function () {
        return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        });
    })();
    cancelAnimFrame = (function () {
        return (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
            return window.clearTimeout(id);
        });
    })();
    parsePositiveInt = function (value, defaultValue) {
        var output = parseInt(value, 10);
        return (output >= 0) ? output : defaultValue;
    };
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return Vivus;
        });
    } else if (typeof exports === 'object') {
        module.exports = Vivus;
    } else {
        window.Vivus = Vivus;
    }
}(window, document));
jQuery(document).on('action.init_shortcodes', function (e, container) {
    "use strict";
    var time = 50;
    container.find('.sc_icon_type_svg:not(.inited)').each(function (idx) {
        "use strict";
        var cont = jQuery(this);
        var id = cont.addClass('inited').attr('id');
        if (id === undefined) {
            id = 'sc_icons_' + Math.random();
            id = id.replace('.', '');
        } else id += '_' + idx;
        cont.find('svg').attr('id', id);
        setTimeout(function () {
            cont.css('visibility', 'visible');
            var obj = new Vivus(id, {
                type: 'async',
                duration: 20
            });
            cont.data('svg_obj', obj);
            cont.parent().hover(function () {
                cont.data('svg_obj').reset().play();
            }, function () {
            });
        }, time);
        time += 300;
    });
});
jQuery(document).on('action.init_hidden_elements', trx_addons_sc_skills_init);
jQuery(document).on('action.init_shortcodes', trx_addons_sc_skills_init);
jQuery(document).on('action.scroll_trx_addons', trx_addons_sc_skills_init);

function trx_addons_sc_skills_init(e, container) {
    "use strict";
    if (arguments.length < 2) var container = jQuery('body');
    var scrollPosition = jQuery(window).scrollTop() + jQuery(window).height();
    container.find('.sc_skills_item:not(.inited)').each(function () {
        "use strict";
        var skillsItem = jQuery(this);
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) {
            return;
        }
        var scrollSkills = skillsItem.offset().top;
        if (scrollPosition > scrollSkills) {
            var init_ok = true;
            var skills = skillsItem.parents('.sc_skills').eq(0);
            var type = skills.data('type');
            var total = (type == 'pie' && skills.hasClass('sc_skills_compact_on')) ? skillsItem.find('.sc_skills_data .pie') : skillsItem.find('.sc_skills_total').eq(0);
            var start = parseInt(total.data('start'));
            var stop = parseInt(total.data('stop'));
            var maximum = parseInt(total.data('max'));
            var startPercent = Math.round(start / maximum * 100);
            var stopPercent = Math.round(stop / maximum * 100);
            var ed = total.data('ed');
            var speed = parseInt(total.data('speed'));
            var step = parseInt(total.data('step'));
            var duration = parseInt(total.data('duration'));
            if (isNaN(duration)) duration = Math.ceil(maximum / step) * speed;
            if (type == 'bar') {
                var dir = skills.data('dir');
                var count = skillsItem.find('.sc_skills_count').eq(0);
                if (dir == 'horizontal') count.css('width', startPercent + '%').animate({
                    width: stopPercent + '%'
                }, duration);
                else if (dir == 'vertical') count.css('height', startPercent + '%').animate({
                    height: stopPercent + '%'
                }, duration);
                trx_addons_sc_skills_animate_counter(start, stop, speed, step, ed, total);
            } else if (type == 'counter') {
                trx_addons_sc_skills_animate_counter(start, stop, speed, step, ed, total);
            } else if (type == 'pie') {
                if (window.Chart) {
                    var steps = parseInt(total.data('steps'));
                    var bg_color = total.data('bg_color');
                    var border_color = total.data('border_color');
                    var cutout = parseInt(total.data('cutout'));
                    var easing = total.data('easing');
                    var options = {
                        segmentShowStroke: border_color != '',
                        segmentStrokeColor: border_color,
                        segmentStrokeWidth: border_color != '' ? 1 : 0,
                        percentageInnerCutout: cutout,
                        animationSteps: steps,
                        animationEasing: easing,
                        animateRotate: true,
                        animateScale: false,
                    };
                    var pieData = [];
                    total.each(function () {
                        "use strict";
                        var color = jQuery(this).data('color');
                        var stop = parseInt(jQuery(this).data('stop'));
                        var stopPercent = Math.round(stop / maximum * 100);
                        pieData.push({
                            value: stopPercent,
                            color: color
                        });
                    });
                    if (total.length == 1) {
                        trx_addons_sc_skills_animate_counter(start, stop, Math.round(1500 / steps), step, ed, total);
                        pieData.push({
                            value: 100 - stopPercent,
                            color: bg_color
                        });
                    }
                    var canvas = skillsItem.find('canvas');
                    canvas.attr({
                        width: skillsItem.width(),
                        height: skillsItem.width()
                    }).css({
                        width: skillsItem.width(),
                        height: skillsItem.height()
                    });
                    new Chart(canvas.get(0).getContext("2d")).Doughnut(pieData, options);
                } else init_ok = false;
            }
            if (init_ok) skillsItem.addClass('inited');
        }
    });
}


jQuery(document).on('action.init_hidden_elements', trx_addons_accordion_init);
jQuery(document).on('action.init_shortcodes', trx_addons_accordion_init);
jQuery(document).on('action.scroll_trx_addons', trx_addons_accordion_init);

function trx_addons_accordion_init(e, container) {
    "use strict";
    if (arguments.length < 2) var container = jQuery('body');
    // Accordion
    if (container.find('.sc_accordion:not(.inited)').length > 0) {
        container.find(".sc_accordion:not(.inited)").each(function () {
            "use strict";
            var init = jQuery(this).data('active');
            if (isNaN(init)) init = 0;
            else init = Math.max(0, init);
            jQuery(this)
                .addClass('inited')
                .accordion({
                    active: init,
                    heightStyle: "content",
                    header: "> .sc_accordion_item > .sc_accordion_title",
                    create: function (event, ui) {
                        "use strict";
                        if (window.init_hidden_elements) init_hidden_elements(ui.panel);
                        ui.header.each(function () {
                            "use strict";
                            jQuery(this).parent().addClass('sc_active');
                        });
                    },
                    activate: function (event, ui) {
                        "use strict";
                        if (window.init_hidden_elements) init_hidden_elements(ui.newPanel);
                        ui.newHeader.each(function () {
                            "use strict";
                            jQuery(this).parent().addClass('sc_active');
                        });
                        ui.oldHeader.each(function () {
                            "use strict";
                            jQuery(this).parent().removeClass('sc_active');
                        });
                    }
                });
        });
    }

}

function trx_addons_sc_skills_animate_counter(start, stop, speed, step, ed, total) {
    "use strict";
    start = Math.min(stop, start + step);
    total.text(start + ed);
    if (start < stop) {
        setTimeout(function () {
            trx_addons_sc_skills_animate_counter(start, stop, speed, step, ed, total);
        }, speed);
    }
}