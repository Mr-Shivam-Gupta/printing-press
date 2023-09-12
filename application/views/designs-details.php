<?php include('common/header.php')?>



<div class="page_content_wrap scheme_default copypress-custom-bg-1">
   <div class="content_wrap">
      <div class="content">
         <article class="post_item_single page">
            <div class="post_content">
               <div class="empty_space height_6_67em"></div>
      
               <div class="row">
                <?php
                $imagesPerPage = 2; // Set the number of images per page
                $totalImages = count($images);
                $totalPages = ceil($totalImages / $imagesPerPage);
                
                $currentPage = isset($_GET['page']) ? intval($_GET['page']) : 1;
                $start = ($currentPage - 1) * $imagesPerPage;
                $end = min($start + $imagesPerPage, $totalImages);
                
                for ($i = $start; $i < $end; $i++) {
                    $image = $images[$i];
                ?>
                <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                   <img
                      src="<?php echo base_url('web-include/design/') . $image['image']; ?>"
                      class="w-100 shadow-1-strong rounded mb-4"
                      alt="Boat on Calm Water"
                   />
                </div>
                <?php
                }
                ?>
               </div>
        
               <?php
               // Pagination links
               if ($totalPages > 1) {
                   echo '<div class="pagination" style="margin-top:30px ;">';
                   for ($page = 1; $page <= $totalPages; $page++) {
                       $activeClass = ($page == $currentPage) ? 'active' : '';
                       echo '<a class="' . $activeClass . '" style="margin:4px;color:white" href="?page=' . $page .  '"> ' .' '.  $page .' '. ' </a>';
                   }
                   echo '</div>';
               }
               ?>
            </div>
         </article>
      </div>
   </div>
</div>

<?php include('common/footer.php')?>