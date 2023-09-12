<section class="content">
   <div class="container-fluid">
<div class="row">
         <div class="card bg-dark w-100">
            <div class="card-header border-transparent">
               <h3 class="card-title">Enquiry Details</h3>
               <div class="card-tools">
                
                  
               </div>
            </div>
            <div class="card-body p-0" style="display: block;">
               <div class="table-responsive">
                  <table class="table m-0">
                     <thead>
                        <tr>
                           <th width='50'>Name</th>
                           <th width='50'>Number</th>
                           <th width='50'>Email</th>
                           <th width='100'>Addrss</th>
                           <th width='100'>Message</th>
                        </tr>
                     </thead>
                     <tbody>
                        <?php foreach ($enquiry as  $E_list) { ?>
                            
                            <tr>
                           <td ><?php echo $E_list['name'];?></td>
                           <td><?php echo $E_list['contact'];?></td>
                           <td>
                           <?php if($E_list['email'] != ''){echo $E_list['email'];}else{ echo "<b>N/A</b>";}?>
                            </td>
                            <td><?php echo $E_list['address'];?></td>
                           <td>
                           <?php echo $E_list['message'];?>
                           </td>
                        </tr>
                       <?php  } ?>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
      </div>
</section>