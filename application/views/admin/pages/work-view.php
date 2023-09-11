<?php $i =1; $customer = $this->db->get_where('customer_tbl',['id'=>$works['customer_id']])->row();?>
<div class="card">
    <div class="card-body row">
        <div class="col-6">
        <table class="table  table-bordered table-hover table-striped">
                           <tbody>
                              <tr>
                                 <th width="200">Customer Name</th>
                                 <td style="text-transform: capitalize;"><?php echo $customer->customer;?></td>
                              </tr>
                              <tr>
                                 <th width="200">Customer Number</th>
                                 <td><?php echo $customer->phone;?></td>
                              </tr>
                              <tr>
                                 <th width="200">Email Id</th>
                                 <td><?php echo $customer->email;?></td>
                              </tr>
                              <tr>
                                 <th width="200">Address</th>
                                 <td><?php echo $customer->address;?></td>
                              </tr>
                              <tr>
                                 <th width="200">Date</th>
                                 <td><?php echo date("d-m-Y", strtotime( $works['date']));?></td>
                              </tr>
                           </tbody>
                        </table>
        </div>
        <div class="col-6">
        <table class="table  table-bordered table-hover table-striped">
                           <tbody>
                              <tr>
                                 <th width="200">Work</th>
                                 <td style="text-transform: capitalize;"><?php echo $works['work'];?></td>
                              </tr>
                              <tr>
                                 <th width="200">Work Details</th>
                                 <td><?php echo $works['details'];?></td>
                              </tr>
                              <tr>
                                 <th width="200">Total Cost</th>
                                 <td><?php echo $works['cost'];?></td>
                              </tr>
                              <tr>
                                 <th width="200">Advance Payment</th>
                                 <td><?php echo $works['advance'];?></td>
                              </tr>
                              <tr>
                                 <th width="200">Remain Payment</th>
                                 <td><?php echo $works['remain'];?></td>
                              </tr>
                           </tbody>
                        </table>
        </div>
        <?php if ($works['is_delivered'] == '1') { ?>
            <div class="mx-2">
            <a type="button" class="btn btn-block btn-success" disabled >Successfully Delivered</a>
        </div>
        <?php }?>
      
        <div class="mx-2">
            <a type="button" href="<?php if ($works['status'] == '1'){echo base_url('done-work');} else {echo base_url('work-list'); }?>" class="btn btn-block btn-dark" >Go to Work List</a>
        </div>                                
    </div>
</div>