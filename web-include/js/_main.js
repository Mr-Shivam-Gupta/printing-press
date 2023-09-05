(function() {
    "use strict";
        window.TRX_ADDONS_STORAGE = {
        "ajax_url": "#",
        "ajax_nonce": "e2bfe4c4c9",
        "site_url": "#",
        "popup_engine": "magnific",
        "animate_inner_links": "0",
        "user_logged_in": "0",
        "email_mask": "^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$",
        "msg_ajax_error": "Invalid server answer!",
        "msg_magnific_loading": "Loading image",
        "msg_magnific_error": "Error loading image",
        "msg_error_like": "Error saving your like! Please, try again later.",
        "msg_field_name_empty": "The name can't be empty",
        "msg_field_email_empty": "Too short (or empty) email address",
        "msg_field_email_not_valid": "Invalid email address",
        "msg_field_text_empty": "The message text can't be empty",
        "msg_search_error": "Search error! Try again later.",
        "msg_send_complete": "Send message complete!",
        "msg_send_error": "Transmit failed!",
        "menu_cache": [],
        "login_via_ajax": "1",
        "msg_login_empty": "The Login field can't be empty",
        "msg_login_long": "The Login field is too long",
        "msg_password_empty": "The password can't be empty and shorter then 4 characters",
        "msg_password_long": "The password is too long",
        "msg_login_success": "Login success! The page should be reloaded in 3 sec.",
        "msg_login_error": "Login failed!",
        "msg_not_agree": "Please, read and check 'Terms and Conditions'",
        "msg_email_long": "E-mail address is too long",
        "msg_email_not_valid": "E-mail address is invalid",
        "msg_password_not_equal": "The passwords in both fields are not equal",
        "msg_registration_success": "Registration success! Please log in!",
        "msg_registration_error": "Registration failed!",
        "scroll_to_anchor": "1",
        "update_location_from_anchor": "0",
        "msg_sc_googlemap_not_avail": "Googlemap service is not available",
        "msg_sc_googlemap_geocoder_error": "Error while geocode address"
    };

        window.COPYPRESS_STORAGE = {
        "ajax_url": "#",
        "ajax_nonce": "e2bfe4c4c9",
        "site_url": "#",
        "site_scheme": "scheme_default",
        "user_logged_in": "",
        "mobile_layout_width": "767",
        "menu_side_stretch": "1",
        "menu_side_icons": "1",
        "background_video": "",
        "use_mediaelements": "1",
        "message_maxlength": "1000",
        "admin_mode": "",
        "email_mask": "^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$",
        "strings": {
            "ajax_error": "Invalid server answer!",
            "error_global": "Error data validation!",
            "name_empty": "The name can&#039;t be empty",
            "name_long": "Too long name",
            "email_empty": "Too short (or empty) email address",
            "email_long": "Too long email address",
            "email_not_valid": "Invalid email address",
            "text_empty": "The message text can&#039;t be empty",
            "text_long": "Too long message text"
        },
        "alter_link_color": "#04caf7",
        "button_hover": "slide_left"
    };
})();

! function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, "script", "twitter-wjs");