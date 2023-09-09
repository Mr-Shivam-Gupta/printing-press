<div class="card">
   <div class="card-header ">
      <!-- <h3 class="card-title flot-left">Work List</h3> -->
      <a href="<?php echo base_url('today-work');?>"><button type="button" class="btn flot-right mr-4 bg-gradient-info">Today Work List</button></a>
      <a href="<?php echo base_url('upcoming-work');?>"><button type="button" class="btn flot-right mr-4 bg-gradient-info">Upcoming Work List</button></a>
      <a href="<?php echo base_url('done-work');?>"><button type="button" class="btn flot-right mr-4 bg-gradient-info">Done Work List</button></a>
      <!-- <a href="<?php echo base_url('cencel-work');?>"><button type="button" class="btn flot-right mr-4 bg-gradient-info">Canceled Work List</button></a> -->
      
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
               <th width="10" class="text-center">S.No</th>
               <th width="50" class="text-center">Name</th>
               <th width="50"class="text-center">Number</th>
               <th width="80" class="text-center">Work</th>
               <th width="50" class="text-center">Date</th>
               <th width="100" class="text-center">action</th>
            </tr>
         </thead>
         <tbody>
             <?php $i=1; foreach ($works as $work) { ?>
                <?php $customer = $this->db->get_where('customer_tbl',['id'=>$work['customer_id']])->row();?>
                <tr>
                    <td class="text-center"><?php  echo $i++; ?></td>
                    <td class="text-center"><?php if (isset($customer)) { echo $customer->customer;}; ?></td>
                    <td class="text-center"><?php if (isset($customer)) { echo $customer->phone;}; ?></td>
                    <td class="text-center"><?php echo $work['work']; ?></td>
                    <td class="text-center"><?php echo $work['date']; ?></td>
               <td class="text-center">
                  <a href="<?php echo base_url(); ?>Admin/workView/<?php echo $work['id']; ?>"><button type="button" title="View"
                     class="btn  bg-gradient-primary"><i
                     class="fas fa-eye"></i> </button></a>
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
            <h4 class="modal-title">Add Work</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <form action="Admin/workSubmit" id="work">
         <div class="modal-body row">
            
            <!-- <div class="col-6">
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
            </div> -->
                <div class="col-6"> 
                <div class="form-group" data-select2-id="95">
                <label>Customer Name & Customer Contact </label>
                <select class="form-control select2bs4 select2-hidden-accessible" name="c_id" required style="width: 100%;">
                <option selected="selected" disabled value="">Please select customer name</option>
                <?php foreach ($customers as  $customer) { ?>
                    <option value="<?php echo $customer['id'];?>"><?php echo $customer['customer']." - ".$customer['phone']; ?></option>
               <?php  }?>
                
                
                </select>
                </div>
                </div>
            
        <div class="col-6">
               <label>Work Completion Date *</label>
               <input class="form-control sf-form-control datepicker" type="date" required id="date" min="<?php echo date('Y-m-d');?>" name="date" datepicker="">
            </div>
            <div class="col-6">
                <label >Work *</label>
               <input type="text" class="form-control" name="work" required placeholder="Enter Work">
            </div>
            <div class="col-6">
        <label>Total Cost *</label>
        <input type="text" class="form-control" name="cost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  required placeholder="Enter total cost of work">
        </div>
        <div class="col-6">
            <label>Advance Payment *</label>
            <input type="text" class="form-control" name="advance" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  required placeholder="Enter advance payment of work">
        </div>
        <div class="col-6">
            <label>Remaining Payment *</label>
            <input type="text" class="form-control" disabled name="remain" required value="0.00">
        </div>
            <!-- <div class="col-6">
                <label >Discount *</label>
               <input type="text" class="form-control" name="advance" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required placeholder="Enter discount payment of work">
            </div>
            <div class="col-6">
                <label >Remain Payment *</label>
               <input type="text" class="form-control" disabled value="0" name="advance" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
            </div> -->
            <div class="col-12">
                <label >Description *</label>
                <textarea name="details" class="form-control" id="" placeholder="Describe customer's work" cols="10" rows="3"></textarea>
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
     $(document).ready(function() {
            // Function to update the remaining payment
            function updateRemainingPayment() {
                var totalCost = parseFloat($("input[name='cost']").val()) || 0;
                var advancePayment = parseFloat($("input[name='advance']").val()) || 0;
                var remainingPayment = totalCost - advancePayment;

                // Update the Remaining Payment field
                $("input[name='remain']").val(remainingPayment.toFixed(2));
            }

            // Attach the updateRemainingPayment function to the input fields' input event
            $("input[name='cost'], input[name='advance']").on("input", updateRemainingPayment);
        });
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