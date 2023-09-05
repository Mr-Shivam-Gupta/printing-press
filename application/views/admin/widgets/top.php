<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title> Dashboard</title>
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/fontawesome-free/css/all.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/icheck-bootstrap/icheck-bootstrap.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/jqvmap/jqvmap.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>dist/css/adminlte.min.css?v=3.2.0">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/daterangepicker/daterangepicker.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/summernote/summernote-bs4.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/dropzone/min/dropzone.min.css">

      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/datatables-buttons/css/buttons.bootstrap4.min.css">


      <script src="<?php echo base_url('web-include/admin/');?>plugins/jquery/jquery.min.js"></script>

      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.27/dist/sweetalert2.all.min.js" integrity="sha256-S/HO+Ru8zrLDmcjzwxjl18BQYDCvFDD7mPrwJclX6U8=" crossorigin="anonymous"></script>

      
      <script nonce="41811315-e252-4064-a709-c657409c672c">(function(w,d){!function(db,dc,dd,de){db[dd]=db[dd]||{};db[dd].executed=[];db.zaraz={deferred:[],listeners:[]};db.zaraz.q=[];db.zaraz._f=function(df){return async function(){var dg=Array.prototype.slice.call(arguments);db.zaraz.q.push({m:df,a:dg})}};for(const dh of["track","set","debug"])db.zaraz[dh]=db.zaraz._f(dh);db.zaraz.init=()=>{var di=dc.getElementsByTagName(de)[0],dj=dc.createElement(de),dk=dc.getElementsByTagName("title")[0];dk&&(db[dd].t=dc.getElementsByTagName("title")[0].text);db[dd].x=Math.random();db[dd].w=db.screen.width;db[dd].h=db.screen.height;db[dd].j=db.innerHeight;db[dd].e=db.innerWidth;db[dd].l=db.location.href;db[dd].r=dc.referrer;db[dd].k=db.screen.colorDepth;db[dd].n=dc.characterSet;db[dd].o=(new Date).getTimezoneOffset();if(db.dataLayer)for(const dp of Object.entries(Object.entries(dataLayer).reduce(((dq,dr)=>({...dq[1],...dr[1]})),{})))zaraz.set(dp[0],dp[1],{scope:"page"});db[dd].q=[];for(;db.zaraz.q.length;){const ds=db.zaraz.q.shift();db[dd].q.push(ds)}dj.defer=!0;for(const dt of[localStorage,sessionStorage])Object.keys(dt||{}).filter((dv=>dv.startsWith("_zaraz_"))).forEach((du=>{try{db[dd]["z_"+du.slice(7)]=JSON.parse(dt.getItem(du))}catch{db[dd]["z_"+du.slice(7)]=dt.getItem(du)}}));dj.referrerPolicy="origin";dj.src="<?php echo base_url('web-include/admin/');?>/cdn-cgi/zaraz/s.js?z="+btoa(encodeURIComponent(JSON.stringify(db[dd])));di.parentNode.insertBefore(dj,di)};["complete","interactive"].includes(dc.readyState)?zaraz.init():db.addEventListener("DOMContentLoaded",zaraz.init)}(w,d,"zarazData","script");})(window,document);</script>
   </head>
   <body class="hold-transition sidebar-mini layout-fixed">
      <div class="wrapper">
    
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
         <ul class="navbar-nav">
            <li class="nav-item">
               <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
         </ul> 
         <ul class="navbar-nav ml-auto">
            <li class="nav-item">
               <a class="nav-link" data-widget="navbar-search" href="#" role="button">
               <i class="fas fa-search"></i>
               </a>
               <div class="navbar-search-block">
                  <form class="form-inline">
                     <div class="input-group input-group-sm">
                        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                        <div class="input-group-append">
                           <button class="btn btn-navbar" type="submit">
                           <i class="fas fa-search"></i>
                           </button>
                           <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                           <i class="fas fa-times"></i>
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
            </li>
            <li class="nav-item dropdown">
               <a class="nav-link" data-toggle="dropdown" href="#">
               <i class="far fa-comments"></i>
               <span class="badge badge-danger navbar-badge">3</span>
               </a>
               <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <a href="#" class="dropdown-item">
                     <div class="media">
                        <img src="<?php echo base_url('web-include/admin/');?>dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">
                        <div class="media-body">
                           <h3 class="dropdown-item-title">
                              Brad Diesel
                              <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                           </h3>
                           <p class="text-sm">Call me whenever you can...</p>
                           <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                        </div>
                     </div>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item">
                     <div class="media">
                        <img src="<?php echo base_url('web-include/admin/');?>dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                        <div class="media-body">
                           <h3 class="dropdown-item-title">
                              John Pierce
                              <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                           </h3>
                           <p class="text-sm">I got your message bro</p>
                           <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                        </div>
                     </div>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item">
                     <div class="media">
                        <img src="<?php echo base_url('web-include/admin/');?>dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                        <div class="media-body">
                           <h3 class="dropdown-item-title">
                              Nora Silvester
                              <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                           </h3>
                           <p class="text-sm">The subject goes here</p>
                           <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                        </div>
                     </div>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
               </div>
            </li>
            <li class="nav-item dropdown">
               <a class="nav-link" data-toggle="dropdown" href="#">
               <i class="far fa-bell"></i>
               <span class="badge badge-warning navbar-badge">15</span>
               </a>
               <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span class="dropdown-item dropdown-header">15 Notifications</span>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item">
                  <i class="fas fa-envelope mr-2"></i> 4 new messages
                  <span class="float-right text-muted text-sm">3 mins</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item">
                  <i class="fas fa-users mr-2"></i> 8 friend requests
                  <span class="float-right text-muted text-sm">12 hours</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item">
                  <i class="fas fa-file mr-2"></i> 3 new reports
                  <span class="float-right text-muted text-sm">2 days</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
               </div>
            </li>
            <li class="nav-item">
               <a class="nav-link" data-widget="fullscreen" href="#" role="button">
               <i class="fas fa-expand-arrows-alt"></i>
               </a>
            </li>
            <li class="nav-item">
               <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
               <i class="fas fa-th-large"></i>
               </a>
            </li>
         </ul>
      </nav>


       </---- side bar --->
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
         <a href="<?php echo base_url('web-include/admin/');?>index3.html" class="brand-link">
         <img src="<?php echo base_url('web-include/admin/');?>dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
         <span class="brand-text font-weight-light">AdminLTE 3</span>
         </a>
         <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
               <div class="image">
                  <img src="<?php echo base_url('web-include/admin/');?>dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
               </div>
               <div class="info">
                  <a href="#" class="d-block">Alexander Pierce</a>
               </div>
            </div>
         
            <nav class="mt-2">
               <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                  <li class="nav-item menu-open">
                     <a href="<?php echo base_url('admin-dashboard');?>" class="nav-link active">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                           Dashboard
                          
                        </p>
                     </a>
                  </li>
                  <li class="nav-item">
                  <a href="<?php echo base_url('design-type');?>" class="nav-link">
                  <i class="nav-icon fa fa-align-justify"></i>
                  <p>
                  Manage Design Types
                  </p>
                  </a>
                  </li>
                  <li class="nav-item">
                  <a href="<?php echo base_url('upload');?>" class="nav-link">
                  <i class="nav-icon far fa-images"></i>

                  <p>
                   Upload Images
                  </p>
                  </a>
                  </li>
               </ul>
            </nav>
         </div>
      </aside>
      