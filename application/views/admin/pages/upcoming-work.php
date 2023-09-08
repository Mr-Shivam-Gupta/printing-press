<div class="card">
   <div class="card-header ">
      <!-- <h3 class="card-title flot-left">Work List</h3> -->
      <a href="<?php echo base_url('today-work');?>"><button type="button" class="btn flot-right mr-4 bg-gradient-info">Today Work List</button></a>
      <a href="<?php echo base_url('upcoming-work');?>"><button type="button" class="btn flot-right mr-4 bg-gradient-info">Upcoming Work List</button></a>
      <a href="<?php echo base_url('done-work');?>"><button type="button" class="btn flot-right mr-4 bg-gradient-info">Done Work List</button></a>
      <a href="<?php echo base_url('cencel-work');?>"><button type="button" class="btn flot-right mr-4 bg-gradient-info">Canceled Work List</button></a>
      
      <div class="float-right">
         <button type="button"  data-toggle="modal" data-target="#modal-lg"
            class="btn flot-right mr-4 bg-gradient-primary"><i
            class="fa fa-plus-square"></i> Add Work</button>
      </div>
   </div>
   <div class="card-body">  
      <table id="example1" class="table table-bordered table-striped">
         <thead>
            <tr>
               <th width="20" class="text-center">S.No</th>
               <th width="80" class="text-center">Date</th>
               <th width="80"class="text-center">Work</th>
               <th width="150" class="text-center">Details</th>
               <th width="80" class="text-center">Action</th>
            </tr>
         </thead>
         <tbody>
             <?php $i=1; foreach ($works as $work) { ?>
            <tr>
               <td class="text-center"><?php  echo $i++; ?></td>
               <td class="text-center"><?php echo $work['date']; ?></td>
               <td class="text-center"><?php echo $work['work']; ?></td>
               <td class="text-center"><?php echo $work['details']; ?></td>
               <td class="text-center">
                  <a href="<?php echo base_url(); ?>Admin/workDone/<?php echo $work['id']; ?>" class="done"><button type="button"
                     class="btn  bg-gradient-success"><i
                     class="fa fa-check"></i> Done</button></a>
                  <a href="<?php echo base_url(); ?>Admin/workCancel/<?php echo $work['id']; ?>" 
                     class="btn bg-gradient-danger cancel " >
                  <i class="fa fa-times"></i> Cancel
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
            <h4 class="modal-title">Large Modal</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <form action="Admin/workSubmit" id="work">
         <div class="modal-body row">
            <div class="col-4">
               <label>Date </label>
               <input class="form-control sf-form-control datepicker" type="date"  id="date" min="<?php echo date('Y-m-d');?>" name="date" datepicker="">
            </div>
            <div class="col-8">
                <label >Work</label>
               <input type="text" class="form-control" name="work" placeholder="Enter Work">
            </div>
            <div class="col-12">
                <label >Details</label>
               <input type="text" class="form-control" name="details" placeholder="Describe your work">
            </div>
         </div>
         <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
         </div>
         </form>
         
      </div>
   </div>
</div>

<script>
        $(document).ready(function () {
      
      $(".done").click(function(event) {
               event.preventDefault(); 
   
               var deleteLink = $(this).attr('href');
   
               Swal.fire({
                   title: "Confirmation",
                   text: "Has this work been completed?",
                   icon: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#28a745",
                   cancelButtonColor: "#d33",
                   confirmButtonText: "Yes, completed !",
               }).then((result) => {
                   if (result.isConfirmed) {
                      
                       window.location.href = deleteLink;
                   }
               });
           });
       });
        $(document).ready(function () {
      
      $(".cancel").click(function(event) {
               event.preventDefault(); 
   
               var deleteLink = $(this).attr('href');
   
               Swal.fire({
                   title: "Confirmation",
                   text: "Are you sure you want to Cancel this work?",
                   icon: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#3085d6",
                   cancelButtonColor: "#d33",
                   confirmButtonText: "Yes, Cancel it!",
               }).then((result) => {
                   if (result.isConfirmed) {
                       
                       window.location.href = deleteLink;
                   }
               });
           });
       });
      $(document).ready(function () {
    
    $("#work").submit(function (e) {
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
                  $('#work')[0].reset();
                  Swal.fire({
                      title: "Successful",
                      text: "Your Request Sent Successfully",
                      icon: "success",
                  }).then(function () {
                      window.location.href="<?php echo base_url('work-list'); ?>";
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