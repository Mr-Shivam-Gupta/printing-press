
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Log in</title>


  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

  <link rel="stylesheet" href="<?php echo base_url('');?>web-include/admin/plugins/fontawesome-free/css/all.min.css">

  <link rel="stylesheet" href="<?php echo base_url('');?>web-include/admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css">

  <link rel="stylesheet" href="<?php echo base_url('');?>web-include/admin/dist/css/adminlte.min.css">
</head>
<body class="hold-transition login-page">

<div class="login-box">
    <div class="card">
        <div class="card-body login-card-body">
        <div class="login-logo mt-3">
        <img class="logo-pic-one " style="width:80%;" src="<?php echo base_url('web-include/');?>logo.jpg" alt="logo">
        </div>
      <p class="login-box-msg">Sign in to start your session</p>
      <?php if($errorMsg=$this->session->flashdata('error')):?>
               <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <?php echo $errorMsg;?>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <?php endif;?>
               <?php if($successMsg=$this->session->flashdata('success')):?>
               <div class="alert alert-success alert-dismissible fade show" role="alert">
                  <?php echo $successMsg;?>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <?php endif;?>
      <form action="<?php echo base_url('user-authentication')?>" enctype="multipart/form-data" method="post">
        <div class="input-group mb-3">
          <input type="email" name="username" value="test@gmail.com" class="form-control" placeholder="Email">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password"  name="userpassword" value="12345" class="form-control" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          
          <div class="col-6 mb-3">
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
          </div>
          
        </div>
      </form>

    </div>

  </div>
</div>



<script src="<?php echo base_url('');?>web-include/admin/plugins/jquery/jquery.min.js"></script>

<script src="<?php echo base_url('');?>web-include/admin/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

<script src="<?php echo base_url('');?>web-include/admin/dist/js/adminlte.min.js"></script>
</body>
</html>
