<section class="content">
   <div class="container-fluid">
      <div class="row">
         <div class="col-md-12">
            <div class="card card-default">
               <div class="card-header">
                  <h3 class="card-title text-red">note: <small>Allow:(png, jpg, gif, jpeg), Max-Size:300MB, Max-Height:1024px, Max-Width:1024px</small></h3>
               </div>
               <?php if ($edit == "edit") {  ?>
               <form  id ="Design-update" action="<?php echo base_url();?>Admin/imageUpdate/<?php echo $imgList->id;?>" method="post" enctype="multipart/form-data">
                  <div class="card-body">
                     <div class="row">
                        <div class="col-6">
                           <div class="form-group">
                              <label>Select Design Type</label>
                              <select class="form-control" name="Dtype">
                                 <option selected ><?php echo $imgList->Dtype ?></option>
                                 <option>option 1</option>
                                 <option>option 2</option>
                                 <option>option 3</option>
                                 <option>option 4</option>
                                 <option>option 5</option>
                              </select>
                           </div>
                        </div>
                        <div class="col-6">
                           <div class="form-group">
                              <label>Select Designed Image</label>
                              <div class="custom-file">
                                 <input type="file"  name="image" class="custom-file-input" id="customFile">
                                 <label class="custom-file-label" for="customFile">Select Image</label>
                              </div>
                           </div>
                           <img src="<?php echo base_url('web-include/design/');echo $imgList->image; ?>" alt="Image" style="max-width:200px;max-height:200px;">
                        </div>
                     </div>
                  </div>
                  <div class="card-footer d-flex justify-content-center">
                     <button type="submit" class="btn btn-primary text-center" >Submit</button>
                  </div>
               </form>
               <?php } else{?>
               <form  id ="Design-upload" action="Admin/imageUpload" method="post" enctype="multipart/form-data">
                  <div class="card-body">
                     <div class="row">
                        <div class="col-6">
                           <div class="form-group">
                              <label>Select Design Type</label>
                              <select class="form-control" name="Dtype">
                                 <option selected disabled>Select Type</option>
                                 <option>option 1</option>
                                 <option>option 2</option>
                                 <option>option 3</option>
                                 <option>option 4</option>
                                 <option>option 5</option>
                              </select>
                           </div>
                        </div>
                        <div class="col-6">
                           <div class="form-group">
                              <label>Select Designed Image</label>
                              <div class="custom-file">
                                 <input type="file"  name="image" class="custom-file-input" id="customFile">
                                 <label class="custom-file-label" for="customFile">Select Image</label>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="card-footer d-flex justify-content-center">
                     <button type="submit" class="btn btn-primary text-center" >Submit</button>
                  </div>
               </form>
               <?php } ?>
            </div>
         </div>
      </div>
   </div>
   <div class="card">
      <div class="card-header">
         <h3 class="card-title">Design List</h3>
      </div>
      <div class="card-body">
         <table id="example1" class="table table-bordered table-striped">
            <thead>
               <tr>
                  <th width="20" class="text-center">S.No</th>
                  <th width="150" class="text-center">Design Type</th>
                  <th width="150"class="text-center">Image</th>
                  <th width="80" class="text-center">Action</th>
               </tr>
            </thead>
            <tbody>
               <?php $i = 1; foreach ($tbl_data as $data) { ?>
               <tr>
                  <td class="text-center"><?php echo $i++; ?></td>
                  <td><?php echo $data['Dtype']; ?></td>
                  <td><img src="<?php echo base_url('web-include/design/'); ?><?php echo $data['image']; ?>"
                     alt="<?php echo $data['Dtype']; ?>" style="max-width:100px;max-height:100px;"></td>
                  <td class="text-center">
                     <a href="<?php echo base_url(); ?>Admin/editUpload/<?php echo $data['id']; ?>"><button type="button"
                        class="btn  bg-gradient-primary"><i
                        class="fas fa-edit"></i> Edit</button></a>
                     <a href="<?php echo base_url(); ?>Admin/deleteUpload/<?php echo $data['id']; ?>"
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
</div>
<script>
   $(document).ready(function() {
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
      $(document).ready(function () {
   
          $("#Design-upload").submit(function (e) {
              e.preventDefault();
              $.ajax({
                  url: $(this).attr('action'), // Use the form's action attribute
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
                          $('#Design-upload')[0].reset();
                          Swal.fire({
                              title: "Successful",
                              text: "Your Request Sent Successfully",
                              icon: "success",
                          }).then(function () {
                              window.location.href="<?php echo base_url('upload'); ?>";
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
          $("#Design-update").submit(function (e) {
              e.preventDefault();
              $.ajax({
                  url: $(this).attr('action'), // Use the form's action attribute
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
                          $("#Design-update")[0].reset();
                          Swal.fire({
                              title: "Successful",
                              text: "Your Request Sent Successfully",
                              icon: "success",
                          }).then(function () {
                              window.location.href="<?php echo base_url('upload'); ?>";
                               });ss
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