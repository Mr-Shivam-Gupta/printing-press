<!DOCTYPE html>
<html lang="en-US" class="no-js scheme_default">
<head>
        <title>press</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="format-detection" content="telephone=no">

        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>js/vendor/essential-grid/css/settings.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/essential-grid.css" type="text/css" media="all" />

        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>js/vendor/revslider/css/settings.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/revslider.css" type="text/css" media="all" />

        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/font-icons/css/trx_addons_icons-embedded.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>js/vendor/swiper/swiper.min.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>js/vendor/magnific/magnific-popup.min.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/trx_addons_full.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/trx_addons.animation.css" type="text/css" media="all" />

        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/font-face/Montserrat/stylesheet.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/font-face/Sofia-Pro-Light/stylesheet.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/font-face/Gilroy/stylesheet.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/font-face/PermanentMarker/stylesheet.css" type="text/css" media="all" />

        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/fontello/css/fontello-embedded.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/style.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/colors.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/general.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/responsive.css" type="text/css" media="all" />
        <link rel="stylesheet" href="<?php echo base_url('web-include/');?>css/font-awesome/css/font-awesome.min.css" type="text/css" media="all" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">


        <link rel="icon" href="<?php echo base_url('web-include/');?>logo.jpg" sizes="32x32" />
        <link rel="icon" href="<?php echo base_url('web-include/');?>logo.jpg" sizes="192x192" />
        <link rel="apple-touch-icon-precomposed" href="<?php echo base_url('web-include/');?>images/cropped-favicon-180x180.png" />
    </head>
	<body class="home page custom-background body_tag scheme_default body_style_wide blog_style_excerpt sidebar_hide expand_content remove_margins header_style_header-custom-18 header_position_default menu_style_top no_layout">
        
        <div class="body_wrap">
            
            <div class="page_wrap">
              
                <header class="top_panel top_panel_custom top_panel_custom_18 without_bg_image scheme_default" style="background-color: black;">
                  
                    <div class="top_panel_container sc_layouts_row sc_layouts_row_type_compact sc_layouts_row_delimiter sc_layouts_row_fixed" style="background-color: black;">
                        <div class="sc_layouts_column sc_layouts_column_align_right sc_layouts_column_icons_position_left">
                           
                            <div class="sc_content sc_content_default sc_float_left sc_align_left">
                                <div class="sc_content_container">
                                    <div class="">
                                        <a href="<?php echo base_url('');?>" class="sc_layouts_logo_default">
                                            <img class="logo_image" src="<?php echo base_url('web-include/');?>logo.jpg" alt="logo" style="width:125px;">
                                        </a>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="sc_layouts_item">
                                <nav class="sc_layouts_menu sc_layouts_menu_default menu_hover_slide_line hide_on_mobile" data-animation-in="fadeInUpSmall" data-animation-out="fadeOutDownSmall">
                                    <ul id="menu-main-menu" class="sc_layouts_menu_nav">
                                       
                                        <li class="menu-item current-menu-ancestor current-menu-parent ">
                                            <a href="<?php echo base_url('');?>">
                                                <span>Home</span>
                                            </a>
                                            
                                        </li>
                            
                                        
                                        <!-- <li class="menu-item ">
                                            <a href="#">
                                                <span>About</span>
                                            </a>
                                           
                                        </li>
                                       
                                        <li class="menu-item">
                                            <a href="#">
                                                <span>Services</span>
                                            </a>
                                        </li>
                                       
                                        <li class="menu-item menu-item-has-children">
                                            <a href="<?php echo base_url('designs');?>">
                                                <span>Designs</span>
                                            </a>
                                            <ul class="sub-menu">
                                                <li class="menu-item">
                                                  
                                                </li>
                                            </ul>
                                            
                                        </li> -->
                                        <?php foreach ($manu as $manu) { ?>
                                        <li class="menu-item">
                                        <a href="<?php echo base_url('design/');echo $manu['url'];?> ">
                                                            <span><?php echo $manu['type'];?></span>
                                                        </a>
                                        </li>
                                        <?php }?>
                                        <li class="menu-item">
                                            <a href="<?php echo base_url('contact-us');?>">
                                                <span>Contacts</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                <div class="sc_layouts_iconed_text sc_layouts_menu_mobile_button">
                                    <a class="sc_layouts_item_link sc_layouts_iconed_text_link" href="#">
                                        <span class="sc_layouts_item_icon sc_layouts_iconed_text_icon trx_addons_icon-menu">Menu</span>
                                    </a>
                                </div>
                            </div>
                            <div class="sc_layouts_item contacts">
                                <div class="sc_layouts_iconed_text">
                                    <a href="mailto:sujeetrhythemphpy@gmail.com" class="sc_layouts_item_link sc_layouts_iconed_text_link">
                                        <span class="sc_layouts_item_icon sc_layouts_iconed_text_icon icon-mail-empty"></span>
                                        <span class="sc_layouts_item_details sc_layouts_iconed_text_details">
                                            <span class="sc_layouts_item_details_line2 sc_layouts_iconed_text_line2">sujeetrhythemphpy@gmail.com</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            
                            <div class="sc_layouts_item contacts">
                                <div class="sc_layouts_iconed_text">
                                    <a href="tel:093408 08198">
                                        <span class="sc_layouts_item_icon sc_layouts_iconed_text_icon icon-phone-2"></span>
                                        <span class="sc_layouts_item_details sc_layouts_iconed_text_details">
                                            <span class="sc_layouts_item_details_line2 sc_layouts_iconed_text_line2">093408 08198</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="sc_layouts_item contacts">
                                <div class="sc_layouts_iconed_text">
                               <a href="<?php echo base_url('admin-login')?>" class="sc_layouts_item_link sc_layouts_iconed_text_link">
                               <span class="sc_layouts_item_icon sc_layouts_iconed_text_icon icon-login"></span>
                                    <span class="sc_layouts_item_details sc_layouts_iconed_text_details">
                                        <span class="sc_layouts_item_details_line2 sc_layouts_iconed_text_line2">Login</span>
                                    </span>
                               </a>
                                </div>
                            </div>
                            
                            <!-- <div class="sc_layouts_item">
                                <div class="sc_socials sc_socials_default sc_align_default">
                                    <div class="socials_wrap">
                                        <span class="social_item">
                                            <a href="#" target="_blank" class="social_icons social_twitter">
                                                <span class="trx_addons_icon-twitter"></span>
                                            </a>
                                        </span>
                                        <span class="social_item">
                                            <a href="#" target="_blank" class="social_icons social_facebook">
                                                <span class="trx_addons_icon-facebook"></span>
                                            </a>
                                        </span><span class="social_item">
                                            <a href="#" target="_blank" class="social_icons social_gplus">
                                                <span class="trx_addons_icon-gplus"></span>
                                            </a>
                                        </span><span class="social_item">
                                            <a href="#" target="_blank" class="social_icons social_tumblr">
                                                <span class="trx_addons_icon-tumblr"></span>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                   
                </header>
                <!-- Menu mobile -->
                <div class="menu_mobile_overlay"></div>
                <div class="menu_mobile menu_mobile_fullscreen scheme_dark">
                    <div class="menu_mobile_inner">
                        <a class="menu_mobile_close icon-cancel"></a>
                        <nav class="menu_mobile_nav_area">
                            <ul id="menu_mobile-main-menu" class="">
                                <!-- Menu item : Home -->
                                <li class="menu-item current-menu-ancestor current-menu-parent ">
                                    <a href="<?php echo base_url('');?>">
                                        <span>Home</span>
                                    </a>
                                
                                </li>
                                <!-- /Menu item : Home -->
                                <!-- Menu item : Features -->
                                <li class="menu-item menu-item-has-children">
                                    <a href="#">
                                        <span>Features</span>
                                    </a>
                                    <ul class="sub-menu">
                                        <!-- Menu item : Tools -->
                                        <li class="menu-item menu-item-has-children">
                                            <a href="#">
                                                <span>Tools</span>
                                            </a>
                                            <ul class="sub-menu">
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>Typography</span>
                                                    </a>
                                                </li>
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>Shortcodes</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <!-- /Menu item : Tools -->
                                        <!-- Menu item : Pages -->
                                        <li class="menu-item menu-item-has-children">
                                            <a href="#">
                                                <span>Pages</span>
                                            </a>
                                            <ul class="sub-menu">
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>Our Team</span>
                                                    </a>
                                                </li>
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>Team Member</span>
                                                    </a>
                                                </li>
                                                <li class="menu-item menu-item-has-children">
                                                    <a href="#">
                                                        <span>Gallery</span>
                                                    </a>
                                                    <ul class="sub-menu">
                                                        <li class="menu-item">
                                                            <a href="#">
                                                                <span>Gallery Grid</span>
                                                            </a>
                                                        </li>
                                                        <li class="menu-item">
                                                            <a href="#">
                                                                <span>Gallery Cobbles</span>
                                                            </a>
                                                        </li>
                                                        <li class="menu-item">
                                                            <a href="#">
                                                                <span>Gallery Masonry</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <!-- /Menu item : Pages -->
                                        <!-- Menu item : Support -->
                                        <li class="menu-item menu-item-has-children">
                                            <a href="#">
                                                <span>Support</span>
                                            </a>
                                            <ul class="sub-menu">
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>Support</span>
                                                    </a>
                                                </li>
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>Video Tutorials</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <!-- /Menu item : Support -->
                                    </ul>
                                </li>
                                <!-- /Menu item : Features -->
                                <!-- Menu item : About -->
                                <li class="menu-item menu-item-has-children">
                                    <a href="#">
                                        <span>About</span>
                                    </a>
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="#">
                                                <span>Style 1</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="#">
                                                <span>Style 2</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <!-- /Menu item : About -->
                                <!-- Menu item : Services -->
                                <li class="menu-item">
                                    <a href="#">
                                        <span>Services</span>
                                    </a>
                                </li>
                                <!-- /Menu item : Services -->
                                <!-- Menu item : Blog -->
                                <li class="menu-item menu-item-has-children">
                                    <a href="#">
                                        <span>Blog</span>
                                    </a>
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="#">
                                                <span>Streampage</span>
                                            </a>
                                        </li>
                                        <li class="menu-item menu-item-has-children">
                                            <a href="#">
                                                <span>Classic Style</span>
                                            </a>
                                            <ul class="sub-menu">
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>2 Columns</span>
                                                    </a>
                                                </li>
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>3 Columns</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="menu-item menu-item-has-children">
                                            <a href="#">
                                                <span>Chess Style</span>
                                            </a>
                                            <ul class="sub-menu">
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>2 Columns</span>
                                                    </a>
                                                </li>
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>4 Columns</span>
                                                    </a>
                                                </li>
                                                <li class="menu-item">
                                                    <a href="#">
                                                        <span>6 Columns</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <!-- /Menu item : Blog -->
                                <!-- Menu item : Contacts -->
                                <li class="menu-item">
                                    <a href="#">
                                        <span>Contacts</span>
                                    </a>
                                </li>
                                <!-- /Menu item : Contacts -->
                            </ul>
                        </nav>
                        <!-- Search -->
                        <div class="search_wrap search_style_normal search_mobile">
                            <div class="search_form_wrap">
                                <form role="search" method="get" class="search_form" action="#">
                                    <input type="text" class="search_field" placeholder="Search" value="" name="s">
                                    <button type="submit" class="search_submit trx_addons_icon-search"></button>
                                </form>
                            </div>
                        </div>
                        <!-- /Search -->
                        <!-- Socials -->
                        <div class="socials_mobile">
                            <span class="social_item">
                                <a href="#" target="_blank" class="social_icons social_twitter">
                                    <span class="trx_addons_icon-twitter"></span>
                                </a>
                            </span><span class="social_item">
                                <a href="#" target="_blank" class="social_icons social_facebook">
                                    <span class="trx_addons_icon-facebook"></span>
                                </a>
                            </span><span class="social_item">
                                <a href="#" target="_blank" class="social_icons social_gplus">
                                    <span class="trx_addons_icon-gplus"></span>
                                </a>
                            </span><span class="social_item">
                                <a href="#" target="_blank" class="social_icons social_tumblr">
                                    <span class="trx_addons_icon-tumblr"></span>
                                </a>
                            </span>
                        </div>
                        <!-- /Socials -->
                    </div>
                </div>
                <!-- /Menu mobile -->
