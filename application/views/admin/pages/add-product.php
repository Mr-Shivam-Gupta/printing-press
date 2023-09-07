<section class="content">
   <div class="container-fluid">
      <div class="row">
         <div class="col-md-12">
            <div class="card card-default">
               <div class="card-header">
               <h3 class="card-title text-red">note: <small>Required Quantity: The quantity that should always be available in the shop.</small></h3>
               </div>
              <?php if ($edit != "") { ?>

               <form  id ="productEdit" action="<?php echo base_url();?>Admin/productEdit/<?php echo $desList->id;?>" method="post" enctype="multipart/form-data">
                  <div class="card-body">
                  <div class="row">
                        <div class="col-6">
                        <div class="form-group">
                        <label >Product Name</label>
                        <input type="text" class="form-control" name="product" value="<?php echo $desList->product;?>" placeholder="Ex. papers">
                        </div>
                        </div>
                        <div class="col-6">
                        <div class="form-group">
                        <label >Required Quantity</label>
                        <input type="text" class="form-control" name="quantity"  value="<?php echo $desList->quantity;?>" placeholder="Ex. 12 " onkeypress="return isNumberKey(event)" >
                        </div>
                        </div>
                     </div>
                  </div>
                  <div class="card-footer d-flex justify-content-center">
                     <button type="submit" class="btn btn-primary text-center" >Submit</button>
                  </div>
               </form>
              <?php }else{?>
               <form  id ="productSubmit" action="Admin/productSubmit" method="post" enctype="multipart/form-data">
                  <div class="card-body">
                     <div class="row">
                        <div class="col-6">
                        <div class="form-group">
                        <label >Product Name</label>
                        <input type="text" class="form-control" name="product"  placeholder="Ex. papers">
                        </div>
                        </div>
                        <div class="col-6">
                        <div class="form-group">
                        <label >Required Quantity</label>
                        <input type="text" class="form-control" name="quantity" placeholder="Ex. 12" onkeypress="return isNumberKey(event)" >
                        </div>
                        </div>
                     </div>
                  </div>
                  <div class="card-footer d-flex justify-content-center">
                     <button type="submit" class="btn btn-primary text-center" >Submit</button>
                  </div>
               </form>
               <?php }?>
            </div>
         </div>
      </div>
   </div>
   <div class="card">
      <div class="card-header">
         <h3 class="card-title">Stock List</h3>
      </div>
      <div class="card-body">
         <table id="example1" class="table table-bordered table-striped">
            <thead>
               <tr>
                  <th width="20" class="text-center">S.No</th>
                  <th width="150" class="text-center">Product</th>
                  <th width="150"class="text-center">Required Quantity</th>
                  <th width="80" class="text-center">Action</th>
               </tr>
            </thead>
            <tbody>
               <?php $i = 1; foreach ($tbl_data as $data) { ?>
               <tr>
                  <td class="text-center"><?php echo $i++; ?></td>
                  <td class="text-center"><?php echo $data['product']; ?></td>
                  <td class="text-center"><?php echo $data['quantity']; ?></td>
                  <td class="text-center">
                     <a href="<?php echo base_url(); ?>Admin/Editproduct/<?php echo $data['id']; ?>"><button type="button"
                        class="btn  bg-gradient-primary"><i
                        class="fas fa-edit"></i> Edit</button></a>

                        <a href="<?php echo base_url(); ?>Admin/Deleteproduct/<?php echo $data['id'];?>"
                        class="btn bg-gradient-danger delete-button" >
                     <i class="fa fa-trash"></i> Delete
                     </a>
                  </td>
               </tr>
               <?php } ?>
            </tbody>
         </table>
      </div>
   </div>
 
</section>

<script>

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    
    if (charCode >= 48 && charCode <= 57 || charCode === 8) {
        return true;
    }
    
    return false;
}
     $(document).ready(function () {
      
      $(".delete-button").click(function(event) {
               event.preventDefault(); 
   
               var deleteLink = $(this).attr('href');
   
               Swal.fire({
                   title: "Confirmation",
                   text: "Are you sure you want to delete this image?",
                   icon: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#3085d6",
                   cancelButtonColor: "#d33",
                   confirmButtonText: "Yes, delete it!",
               }).then((result) => {
                   if (result.isConfirmed) {
                       // Redirect to the captured href link
                       window.location.href = deleteLink;
                   }
               });
           });
       });

   $("#productSubmit").submit(function (e) {
       e.preventDefault();
       $.ajax({
           url: $(this).attr('action'),
           type: 'post',
           processData: false,
           contentType: false,
           cache: false,
           async: false,
           data: new FormData(this),
           beforeSend: function () {
               Swal.fire({
                   title: "Please Wait",
                   text: "",
                   icon: "info",
                   showConfirmButton: false,
                   allowOutsideClick: false
               });
           },
           success: function (data) {
               if (data == 1) {
                   $('#productSubmit')[0].reset();
                   Swal.fire({
                       title: "Successful",
                       text: "Your Request Sent Successfully",
                       icon: "success",
                   }).then(function () {
                       window.location.href="<?php echo base_url('add-stock'); ?>";
                        });
               } else {
                   Swal.fire({
                       title: "Error",
                       text: data,
                       icon: "warning",
                   });
               }
           },
           error: function () {
               Swal.fire({
                   title: "Error!",
                   text: "An error occurred while processing the request.",
                   icon: "error",
               });
           }
       });
   });
   $("#productEdit").submit(function (e) {
       e.preventDefault();
       $.ajax({
           url: $(this).attr('action'),
           type: 'post',
           processData: false,
           contentType: false,
           cache: false,
           async: false,
           data: new FormData(this),
           beforeSend: function () {
               Swal.fire({
                   title: "Please Wait",
                   text: "",
                   icon: "info",
                   showConfirmButton: false,
                   allowOutsideClick: false
               });
           },
           success: function (data) {
               if (data == 1) {
                   $('#productEdit')[0].reset();
                   Swal.fire({
                       title: "Successful",
                       text: "Your Request Sent Successfully",
                       icon: "success",
                   }).then(function () {
                       window.location.href="<?php echo base_url('add-stock'); ?>";
                        });
               } else {
                   Swal.fire({
                       title: "Error",
                       text: data,
                       icon: "warning",
                   });
               }
           },
           error: function () {
               Swal.fire({
                   title: "Error!",
                   text: "An error occurred while processing the request.",
                   icon: "error",
               });
           }
       });
   });

</script>