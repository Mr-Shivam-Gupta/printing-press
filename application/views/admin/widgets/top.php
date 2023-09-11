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
      <!-- <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/icon.css"> -->
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>dist/css/adminlte.min.css?v=3.2.0">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/daterangepicker/daterangepicker.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/summernote/summernote-bs4.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/dropzone/min/dropzone.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/bs-stepper/css/bs-stepper.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/select2/css/select2.min.css">
      <link rel="stylesheet" href="<?php echo base_url('web-include/admin/');?>plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
      <script src="<?php echo base_url('web-include/js/jquery.js');?>"></script>
      <script src="<?php echo base_url('web-include/js/sweetalert.js');?>"></script>
      <script nonce="41811315-e252-4064-a709-c657409c672c">
         (function(w,d){function z(){var db=w,dc=d,dd="zarazData",de="script";db[dd]=db[dd]||{};db[dd].executed=[];db.zaraz={deferred:[],listeners:[]};db.zaraz.q=[];db.zaraz._f=function(df){return async function(){var dg=Array.prototype.slice.call(arguments);db.zaraz.q.push({m:df,a:dg})}};for(const dh of["track","set","debug"])db.zaraz[dh]=db.zaraz._f(dh);db.zaraz.init=()=>{var di=dc.getElementsByTagName(de)[0],dj=dc.createElement(de),dk=dc.getElementsByTagName("title")[0];dk&&(db[dd].t=dc.getElementsByTagName("title")[0].text);db[dd].x=Math.random();db[dd].w=db.screen.width;db[dd].h=db.screen.height;db[dd].j=db.innerHeight;db[dd].e=db.innerWidth;db[dd].l=db.location.href;db[dd].r=dc.referrer;db[dd].k=db.screen.colorDepth;db[dd].n=dc.characterSet;db[dd].o=(new Date).getTimezoneOffset();if(db.dataLayer)for(const dp of Object.entries(Object.entries(dataLayer).reduce(((dq,dr)=>({...dq[1],...dr[1]})),{})))zaraz.set(dp[0],dp[1],{scope:"page"});db[dd].q=[];for(;db.zaraz.q.length;){const ds=db.zaraz.q.shift();db[dd].q.push(ds)}dj.defer=!0;for(const dt of[localStorage,sessionStorage])Object.keys(dt||{}).filter((dv=>dv.startsWith("_zaraz_"))).forEach((du=>{try{db[dd]["z_"+du.slice(7)]=JSON.parse(dt.getItem(du))}catch{db[dd]["z_"+du.slice(7)]=dt.getItem(du)}}));dj.referrerPolicy="origin";dj.src="<?php echo base_url('web-include/admin/');?>/cdn-cgi/zaraz/s.js?z="+btoa(encodeURIComponent(JSON.stringify(db[dd])));di.parentNode.insertBefore(dj,di)};["complete","interactive"].includes(dc.readyState)?z():db.addEventListener("DOMContentLoaded",z)})(window,document); 
      </script>
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
               <a class="nav-link" href="<?php echo base_url('logout');?>" role="button">
               <i class="fas fa-sign-out-alt"></i> Logout
               </a>
            </li>
            <li class="nav-item">
               <a class="nav-link" data-widget="fullscreen" href="#" role="button">
               <i class="fas fa-expand-arrows-alt"></i>
               </a>
            </li>
         </ul>
      </nav>
      <aside class="main-sidebar sidebar-dark-primary elevation-4 pt-2">
         <a href="<?php echo base_url('dashboard/');?>" class="brand-link">
         <img src="<?php echo base_url('web-include/');?>logo.jpg" alt=" Logo" class="  elevation-3" style="opacity: .8;border-radius: 20%;     float: left;
            line-height: .8;
            margin-left: 0.8rem;
            margin-right: 0.5rem;
            margin-top: -10px;
            max-height: 50px;
            width: auto;">
         <span class="brand-text font-weight-light">Sohag </span>
         </a>
         <div class="sidebar">
            <nav class="mt-2">
               <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                  <li class="nav-item menu-open">
                     <a href="<?php echo base_url('dashboard');?>" class="nav-link active">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                           Dashboard
                        </p>
                     </a>
                  </li>
                  <li class="nav-item ">
                     <a href="#" class="nav-link ">
                        <i class="nav-icon fas fa-th"></i>
                        <p>
                           Work
                           <i class="right fas fa-angle-left"></i>
                        </p>
                     </a>
                     <ul class="nav nav-treeview">
                        <li class="nav-item">
                           <a href="<?php echo base_url('add-customer');?>" class="nav-link">
                              <i class="nav-icon fa fa-user-plus" aria-hidden="true"></i>
                              <p>
                                 Add Customer
                              </p>
                           </a>
                        </li>
                        <li class="nav-item">
                           <a href="<?php echo base_url('work-list');?>" class="nav-link">
                              <i class="nav-icon fas fa-paste"></i>
                              <p>
                                 Work LIst
                              </p>
                           </a>
                        </li>
                     </ul>
                  </li>
                  <li class="nav-item ">
                     <a href="#" class="nav-link ">
                        <i class="nav-icon fas fa-th"></i>
                        <p>
                           Products
                           <i class="right fas fa-angle-left"></i>
                        </p>
                     </a>
                     <ul class="nav nav-treeview">
                        <li class="nav-item">
                           <a href="<?php echo base_url('add-product');?>" class="nav-link">
                              <i class="nav-icon fa fa-plus"></i>
                              <p>
                                 Add Product
                              </p>
                           </a>
                        </li>
                        <li class="nav-item">
                           <a href="<?php echo base_url('manage-product');?>" class="nav-link">
                              <i class="nav-icon fa fa-book"></i>
                              <p>
                                 Manage Product
                              </p>
                           </a>
                        </li>
                     </ul>
                  </li>
                  <li class="nav-item ">
                     <a href="#" class="nav-link ">
                        <i class="nav-icon fas fa-th"></i>
                        <p>
                           Designs
                           <i class="right fas fa-angle-left"></i>
                        </p>
                     </a>
                     <ul class="nav nav-treeview">
                        <li class="nav-item">
                           <a href="<?php echo base_url('design-type');?>" class="nav-link">
                              <i class="nav-icon 	fa fa-folder-open"></i>
                              <p>
                                 Design Types
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
                  </li>
               </ul>
            </nav>
         </div>
      </aside>