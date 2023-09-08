<div class="card">
   <div class="card-header ">
      <h3 class="card-title flot-left">Customer List</h3>
    
      <div class="float-right">
         <button type="button"  data-toggle="modal" data-target="#modal-lg"
            class="btn flot-right mr-4 bg-gradient-primary"><i
            class="fa fa-plus-square"></i> Add Customer</button>
      </div>
   </div>
   <div class="card-body">  
      <table id="example1" class="table table-bordered table-striped">
         <thead>
            <tr>
               <th width="20" class="text-center">S.No</th>
               <th width="50" class="text-center">Name</th>
               <th width="80"class="text-center">Contact</th>
               <th width="100" class="text-center">Email</th>
               <th width="150" class="text-center">Address</th>
               <th width="100" class="text-center">Action</th>
            </tr>
         </thead>
         <tbody>
             <?php $i=1; foreach ($customer_list as $customer) { ?>
            <tr>
               <td class="text-center"><?php  echo $i++; ?></td>
               <td class="text-center"><?php  echo $customer['customer'];?></td>
               <td class="text-center"><?php echo $customer['phone'];?></td>
               <td class="text-center"><?php if ($customer['email'] == "") {
                echo "<b>N/A</b>";
               } else {echo $customer['email'];}?></td>
               <td class="text-center"><?php  echo $customer['address'];?></td>
               <td class="text-center">
                    <button type="button" data-id="<?php echo $customer['id'];?>" data-name="<?php echo $customer['customer'];?>" data-address="<?php echo $customer['address'];?>"
                     data-contact="<?php echo $customer['phone'];?>" data-email="<?php echo $customer['email'];?>" data-toggle="modal" data-target="#edit"
                        class="btn edit-btn bg-gradient-primary"><i
                        class="fas fa-edit"></i> Edit</button>
                        <a href="<?php echo base_url(); ?>Admin/DeleteCustomer/<?php echo $customer['id'];?>"
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
<div class="modal fade" id="modal-lg">
   <div class="modal-dialog modal-lg">
      <div class="modal-content">
         <div class="modal-header bg-primary">
            <h4 class="modal-title">Add Customer</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <form action="Admin/customerSubmit" id="customer">
         <div class="modal-body row">
            <div class="col-6">
               <label>Customer Name *</label>
               <input type="text" class="form-control" name="name" value="" placeholder="Enter customer name">
            </div>
            <div class="col-6">
                <label >Contact Number *</label>
               <input type="text" class="form-control" maxlength="10" minlength="10" name="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="" placeholder="Enter contact number">
            </div>
            <div class="col-6">
                <label >Email</label>
               <input type="email" class="form-control" name="email" value="" placeholder="Enter customer email (optional)">
            </div>
            <div class="col-6">
                <label >Address *</label>
               <input type="text" class="form-control" name="address" placeholder="Enter customer address">
            </div>
         </div>
         <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
         </div>
         </form>
         
      </div>
   </div>
</div>
<div class="modal fade" id="edit">
   <div class="modal-dialog modal-lg">
      <div class="modal-content">
         <div class="modal-header bg-primary">
            <h4 class="modal-title">Edit Customer</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <form action="Admin/customerEdit" id="Edit">
         <div class="modal-body row">
            <input type="hidden" id="id" name="id" >
            <div class="col-6">
               <label>Customer Name *</label>
               <input type="text" class="form-control" id="name" name="name" placeholder="Enter customer name">
            </div>
            <div class="col-6">
                <label >Contact Number *</label>
               <input type="text" class="form-control" id="number" maxlength="10" minlength="10" name="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="" placeholder="Enter contact number">
            </div>
            <div class="col-6">
                <label >Email</label>
               <input type="email" class="form-control" id="email" name="email" value="" placeholder="Enter customer email (optional)">
            </div>
            <div class="col-6">
                <label >Address *</label>
               <input type="text" class="form-control" id="address" name="address" placeholder="Enter customer address">
            </div>
         </div>
         <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
         </div>
         </form>
         
      </div>
   </div>
</div>
<script>
   $(document).ready(function(){
    $('.edit-btn').click(function(){
        var id = $(this).data('id');
        var name = $(this).data('name');
        var contact = $(this).data('contact');
        var email = $(this).data('email');
        var address = $(this).data('address');
        $('#id').val(id);
        $('#name').val(name);
        $('#number').val(contact);
        $('#email').val(email);
        $('#address').val(address);
    });

});
   </script>
   
<script>

        $(document).ready(function () {
      
      $(".delete-button").click(function(event) {
               event.preventDefault(); 
   
               var deleteLink = $(this).attr('href');
   
               Swal.fire({
                   title: "Confirmation",
                   text: "Are you sure you want to delete this customer?",
                   icon: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#3085d6",
                   cancelButtonColor: "#d33",
                   confirmButtonText: "Yes, Delete it!",
               }).then((result) => {
                   if (result.isConfirmed) {
                       
                       window.location.href = deleteLink;
                   }
               });
           });
       });
      $(document).ready(function () {
    
    $("#customer").submit(function (e) {
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
                  $('#customer')[0].reset();
                  Swal.fire({
                      title: "Successful",
                      text: "Your Request Sent Successfully",
                      icon: "success",
                  }).then(function () {
                      window.location.href="<?php echo base_url('add-customer'); ?>";
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
    $("#Edit").submit(function (e) {
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
                  $('#Edit')[0].reset();
                  Swal.fire({
                      title: "Successful",
                      text: "Your Request Sent Successfully",
                      icon: "success",
                  }).then(function () {
                      window.location.href="<?php echo base_url('add-customer'); ?>";
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