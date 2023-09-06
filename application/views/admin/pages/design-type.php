<section class="content">
   <div class="container-fluid">
      <div class="row">
         <div class="col-md-12">
            <div class="card card-default">
               <div class="card-header">
               <h3 class="card-title text-red">note: <small>Url should be in lowercase and without spaces</small></h3>
               </div>
              <?php if ($edit != "") { ?>

               <form  id ="DtypeEdit" action="<?php echo base_url();?>Admin/DtypeEdit/<?php echo $desList->id;?>" method="post" enctype="multipart/form-data">
                  <div class="card-body">
                     <div class="row">
                        <div class="col-6">
                        <div class="form-group">
                        <label >Design Type</label>
                        <input type="text" class="form-control" name="Dtype" value="<?php echo $desList->type;?>" placeholder="Ex. Poster">
                        </div>
                        </div>
                        <div class="col-6">
                        <div class="form-group">
                        <label >Url</label>
                        <input type="text" class="form-control" name="url" value="<?php echo $desList->url;?>" placeholder="Ex. Poster-design" oninput="formatInput(this)">
                        </div>
                        </div>
                     </div>
                  </div>
                  <div class="card-footer d-flex justify-content-center">
                     <button type="submit" class="btn btn-primary text-center" >Submit</button>
                  </div>
               </form>
              <?php }else{?>
               <form  id ="DtypeSubmit" action="Admin/DtypeSubmit" method="post" enctype="multipart/form-data">
                  <div class="card-body">
                     <div class="row">
                        <div class="col-6">
                        <div class="form-group">
                        <label >Design Type</label>
                        <input type="text" class="form-control" name="Dtype"  placeholder="Ex. Poster">
                        </div>
                        </div>
                        <div class="col-6">
                        <div class="form-group">
                        <label >Url</label>
                        <input type="text" class="form-control" name="url" placeholder="Ex. Poster-design" oninput="formatInput(this)">
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
         <h3 class="card-title">Manage Design List</h3>
      </div>
      <div class="card-body">
         <table id="example1" class="table table-bordered table-striped">
            <thead>
               <tr>
                  <th width="20" class="text-center">S.No</th>
                  <th width="150" class="text-center">Design Type</th>
                  <th width="150"class="text-center">URL</th>
                  <th width="80" class="text-center">Action</th>
               </tr>
            </thead>
            <tbody>
               <?php $i = 1; foreach ($tbl_data as $data) { ?>
               <tr>
                  <td class="text-center"><?php echo $i++; ?></td>
                  <td class="text-center"><?php echo $data['type']; ?></td>
                  <td class="text-center"><?php echo $data['url']; ?></td>
                  <td class="text-center">
                     <a href="<?php echo base_url(); ?>Admin/EditDesignType/<?php echo $data['id']; ?>"><button type="button"
                        class="btn  bg-gradient-primary"><i
                        class="fas fa-edit"></i> Edit</button></a>
                        <a href="<?php echo base_url(); ?>Admin/DeleteDesignType/<?php echo $data['id']; ?>"
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
   function formatInput(input) {
  const inputValue = input.value.toLowerCase();
  const formattedValue = inputValue.replace(/[^a-z0-9-]/g, '-');
  input.value = formattedValue;
}
     $(document).ready(function () {
      
      $(".delete-button").click(function(event) {
               event.preventDefault(); // Prevent the default link behavior
   
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

</script>