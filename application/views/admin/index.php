<?php include_once('widgets/top.php')?>
<div class="content-wrapper">
            <div class="content-header">
               <div class="container-fluid">
                  <div class="row mb-2">
                     <div class="col-sm-6">
                        <h1 class="m-0" style="text-transform: uppercase;"><?php echo $page_name;?></h1>
                     </div>
                     <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                           <li class="breadcrumb-item"><a href="#">Home</a></li>
                           <li class="breadcrumb-item active"><?php echo $page_name;?></li>
                        </ol>
                     </div>
                  </div>
               </div>
            </div>

   <?php include 'pages/'.$page_name.'.php';?>
</div>
<?php include_once('widgets/bottom.php')?>
