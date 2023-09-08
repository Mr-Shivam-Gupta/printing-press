<section class="content">
   <div class="card">
      <div class="card-header">
         <h3 class="card-title">Manage Stock List</h3>
      </div>
      <div class="card-body">
         <table id="example1" class="table table-bordered table-striped">
            <thead>
               <tr>
                  <th width="20" class="text-center">S.No</th>
                  <th width="150" class="text-center">Product</th>
                  <th width="150"class="text-center">Required Quantity</th>
                  <th width="150"class="text-center">Available Quantity</th>
                  <th width="100" class="text-center">Action</th>
               </tr>
            </thead>
            <tbody>
               <?php $i = 1; foreach ($tbl_data as $data) { ?>
               <tr>
                  <td class="text-center"><?php echo $i++; ?></td>
                  <td class="text-center"><?php echo $data['product']; ?></td>
                  <td class="text-center"><?php echo $data['quantity']; ?></td>
                  <td class="text-center"><?php echo $data['available']; ?></td>
                  <td class="text-center">
                     <a href="javascript:void(0);" type="button" data-toggle="modal" data-target="#purchase" data-title="<?php echo $data['product']; ?>"  data-id="<?php echo $data['id']; ?>"
                        class="btn  bg-gradient-success purchase-button"><i
                        class="fa fa-plus-square"></i> purchase  </a>
                   

                     <a href="javascript:void(0);" data-id="<?php echo $data['id']; ?>" data-title="<?php echo $data['product']; ?>"  data-toggle="modal" data-target="#used"
                        class="btn bg-gradient-info used-button" >
                     <i class="fa fa-minus-square"></i> Used
                     </a>
                  </td>
               </tr>
               <?php } ?>
            </tbody>
         </table>
      </div>
   </div>

   <div class="modal fade" id="purchase">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header bg-success">
               <h5 class="modal-title">Product:&nbsp;</h5><h5 class="modal-title" id="title"> </h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <form action="<?php echo base_url('Admin/calulateStock');?>" method="post" enctype="multipart/form-data" id="admin-purchase">
               <div class="modal-body">
               <div class="form-group">
                        <label >Purchase Quantity</label>
                        <input type="text" class="form-control" required name="plush" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" placeholder="Enter Purchase Quantity">
                        </div>
                   <input type="hidden" id="pur" name="id" value="">
                  
               </div>
               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-success">Save changes</button>
               </div>

            </form>
         </div>
      </div>
   </div>
   <div class="modal fade" id="used">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header bg-info">
               <h5 class="modal-title">Product:&nbsp;</h5><h5 class="modal-title" id="u-title"> </h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <form action="<?php echo base_url('Admin/calulateStock');?>" method="post" enctype="multipart/form-data" id="admin-uses" >
               <div class="modal-body">
               <div class="form-group">
                        <label >Used Quantity</label>
                        <input type="text" class="form-control" required name="minus" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" placeholder="Enter Used Quantity">
                        </div>
                   <input type="hidden" id="use" name="id" value="">
               </div>
               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-info">Save changes</button>
               </div>

            </form>
         </div>
      </div>
   </div>
</section>
<script>
   $(document).ready(function(){
    $('.purchase-button').click(function(){
        var id = $(this).data('id');
        var title = $(this).data('title');
        $('#pur').val(id);
        $('#title').html(title);
    });
    $('.used-button').click(function(){
        var id = $(this).data('id');
        var title = $(this).data('title');
        $('#use').val(id);
        $('#u-title').html(title);
    });

});
   </script>
<script>
   $(document).ready(function () {
    
   $("#admin-purchase").submit(function (e) {
     e.preventDefault();
     $.ajax({
         url:$(this).attr('action'),
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
                 $('#admin-purchase')[0].reset();
                 Swal.fire({
                     title: "Successful",
                     text: "Your Request Sent Successfully",
                     icon: "success",
                 }).then(function () {
                     window.location.href="<?php echo base_url('manage-product'); ?>";
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
   $("#admin-uses").submit(function (e) {
     e.preventDefault();
     $.ajax({
         url:$(this).attr('action'),
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
                 $('#admin-uses')[0].reset();
                 Swal.fire({
                     title: "Successful",
                     text: "Your Request Sent Successfully",
                     icon: "success",
                 }).then(function () {
                     window.location.href="<?php echo base_url('manage-product'); ?>";
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

  
   });
   
</script>