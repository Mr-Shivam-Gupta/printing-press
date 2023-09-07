<?php include('common/header.php')?>



<div class="page_content_wrap scheme_default copypress-custom-bg-1">
   <div class="content_wrap">
      <div class="content">
         <article class="post_item_single page">
            <div class="post_content">
               <div class="empty_space height_6_67em"></div>
      
               <div class="row">
                <?php foreach ($images as $image) { ?>
                  
                    <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                       <img
                          src="<?php echo base_url('web-include/design/'); ?><?php echo $image['image']; ?>"
                          class="w-100 shadow-1-strong rounded mb-4"
                          alt="Boat on Calm Water"
                          />
                    </div>
                    <?php }?>
               </div>
        
            </div>
         </article>
      </div>
   </div>
</div>
<?php include('common/footer.php')?>