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
                  <td class="text-center"><?php echo $data['quantity']; ?></td>
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
   <script>
   $(document).ready(function(){
    $('.purchase-button').click(function(){
        var id = $(this).data('id');
        var title = $(this).data('title');
        $('#add').val(id);
        $('#title').html(title);
    });
});
   </script>
   <div class="modal fade" id="purchase">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h3>Product:&nbsp;</h3><h4 class="modal-title" id="title"> </h4>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
                <input type="text" id="add" value="">
               
            </div>
            <div class="modal-footer justify-content-between">
               <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
               <button type="button" class="btn btn-primary">Save changes</button>
            </div>
         </div>
      </div>
   </div>
   <div class="modal fade" id="used">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h4 class="modal-title">Default used</h4>
               <button type="button"  class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <p>One fine body&hellip;</p>
            </div>
            <div class="modal-footer justify-content-between">
               <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
               <button type="button" class="btn btn-primary">Save changes</button>
            </div>
         </div>
      </div>
   </div>
</section>
<script>
   $(document).ready(function () {
    
   $("#DtypeSubmit").submit(function (e) {
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
                 $('#DtypeSubmit')[0].reset();
                 Swal.fire({
                     title: "Successful",
                     text: "Your Request Sent Successfully",
                     icon: "success",
                 }).then(function () {
                     window.location.href="<?php echo base_url('design-type'); ?>";
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
   $("#DtypeEdit").submit(function (e) {
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
                 $('#DtypeEdit')[0].reset();
                 Swal.fire({
                     title: "Successful",
                     text: "Your Request Sent Successfully",
                     icon: "success",
                 }).then(function () {
                     window.location.href="<?php echo base_url('design-type'); ?>";
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