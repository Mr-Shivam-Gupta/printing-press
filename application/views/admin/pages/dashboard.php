<section class="content">
   <div class="container-fluid">
      <div class="row">
         <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
               <div class="inner">
                  <h1><?php echo $Image_count;?></h1>
                  <p>Total Images</p>
               </div>
               <div class="icon">
                  <i class="far fa-images"></i>
               </div>
               <a href="<?php echo base_url('upload');?>" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
         </div>
         <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
               <div class="inner">
                  <h1><?php echo $D_type_count;?></h1>
                  <p>Total Design Type</p>
               </div>
               <div class="icon">
                  <i class="icon fa fa-folder-open"></i>
               </div>
               <a href="<?php echo base_url('design-type');?>" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
         </div>
         <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
               <div class="inner">
                  <h1><?php echo $Product_count;?></h1>
                  <p>Total Products</p>
               </div>
               <div class="icon">
                  <i class="ion fa fa-file"></i>
               </div>
               <a href="<?php echo base_url('manage-product');?>" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
         </div>
         <div class="col-lg-3 col-6">
            <div class="small-box bg-danger">
               <div class="inner">
                  <h3>65</h3>
                  <p>Total Enquiry Form </p>
               </div>
               <div class="icon">
                  <i class="ion fa fa-edit"></i>
               </div>
               <a href="<?php echo base_url('');?>" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
         </div>
      </div>
      <div class="card">
         <div class="card-body ">
            <div class="row">
               <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                  <div class="info-box mb-3 bg-dark">
                     <span class="info-box-icon bg-danger  elevation-1"><i class="fa fa-calendar"></i></span>
                     <div class="info-box-content">
                        <span class="info-box-text">Upcoming Work</span>
                        <span class="info-box-number"><?php echo $upcoming_work_count;?></span>
                     </div>
                  </div>
               </div>
               <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                  <div class="info-box mb-3 bg-dark">
                     <span class="info-box-icon bg-info elevation-1"><i class="fa fa-calendar-plus"></i></span>
                     <div class="info-box-content">
                        <span class="info-box-text">Delivered Work : <b><?php echo date('F');?> </b>  </span>
                        <span class="info-box-number">
                        <?php echo $current_month_count;?>
                        </span>
                     </div>
                  </div>
               </div>
               <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                  <div class="info-box mb-3 bg-dark">
                     <span class="info-box-icon bg-success elevation-1"><i class="fa fa-calendar-check"></i></span>
                     <div class="info-box-content">
                        <span class="info-box-text">Delivered Work : <b><?php echo date('F', strtotime('last month'));?></b></span>
                        <span class="info-box-number">
                        <?php echo $last_month_count;?>
                        </span>
                     </div>
                  </div>
               </div>
               <!-- <div class="clearfix hidden-md-up"></div> -->
               <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                  <div class="info-box mb-3 bg-dark">
                     <span class="info-box-icon  bg-warning  elevation-1"><i class="fa fa-calendar"></i></span>
                     <div class="info-box-content">
                        <span class="info-box-text">Total Delivered Work</span>
                        <span class="info-box-number">
                        <?php echo $deliverd_count;?>
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="card bg-dark w-100">
            <div class="card-header border-transparent">
               <h3 class="card-title">Pending Works</h3>
               <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse" fdprocessedid="hhtvo">
                  <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove" fdprocessedid="wbd3f9">
                  <i class="fas fa-times"></i>
                  </button>
               </div>
            </div>
            <div class="card-body p-0" style="display: block;">
               <div class="table-responsive">
                  <table class="table m-0">
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Number</th>
                           <th>Work</th>
                           <th>Status</th>
                           <th>Date</th>
                        </tr>
                     </thead>
                     <tbody>
                        <?php foreach ($works as  $work) { ?>
                            <?php $customer = $this->db->get_where('customer_tbl',['id'=>$work['customer_id']])->row();?>
                            <tr>
                           <td ><a href="<?php echo base_url(); ?>Admin/workView/<?php echo $work['id']; ?>" class="text-white">  <i class="fas fa-eye"></i> <?php if (isset($customer)) { echo $customer->customer;}; ?></a></td>
                           <td><?php if (isset($customer)) { echo $customer->phone;}; ?></td>
                           <td>
                               <div class="sparkbar" data-color="#f39c12" data-height="20"><?php echo $work['work'];?></div>
                            </td>
                            <td><span class="badge badge-warning">Pending</span></td>
                           <td>
                              <div class="sparkbar" data-color="#f39c12" data-height="20"><?php echo date('d-m-Y', strtotime($work['date']));?></div>
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

