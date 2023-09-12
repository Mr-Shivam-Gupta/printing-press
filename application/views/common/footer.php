<footer class="footer_wrap footer_custom scheme_dark" >
   <div class="sc_content sc_content_default sc_content_width_1_1">
      <div class="sc_content_container">
         <div class="sc_layouts_item">
            <button id="openPopupBtn">Enquiry Now</button>
         </div>
            <div class="footer_custom_menu">
               <div class="widget widget_nav_menu">
                  <div class="menu-footer-menu-container">
                     <p>Copyright ©2023 <a href="">Sohag</a>. Website Designed & Developed By <a href="">Simpact online service</a> </p>
                  </div>
               </div>
            </div>
            <div class="sc_layouts_item">
               <div class="sc_socials sc_socials_default sc_align_default">
                  <div class="socials_wrap">
                     <span class="social_item">
                     <a href="#" target="_blank" class="social_icons social_twitter">
                     <span class="trx_addons_icon-twitter"></span>
                     </a>
                     </span><span class="social_item">
                     <a href="#" target="_blank" class="social_icons social_facebook">
                     <span class="trx_addons_icon-facebook"></span>
                     </a>
                     </span><span class="social_item">
                     <a href="#" target="_blank" class="social_icons social_gplus">
                     <span class="trx_addons_icon-gplus"></span>
                     </a>
                     </span><span class="social_item">
                     <a href="#" target="_blank" class="social_icons social_tumblr">
                     <span class="trx_addons_icon-tumblr"></span>
                     </a>
                     </span>
                  </div>
               </div>
            </div>
            <div>
            </div>
         </div>
      </div>
</footer>
</div>
</div>
<div id="popupForm" class="popup">
   <div class="popup-content">
      <span class="close" id="closePopupBtn">&times;</span>
      <h2>Enquiry Form</h2>
      <form id="contactForm" action="welcome/contactForm">
         <input type="text" id="name" name="name" required placeholder="Name (Required) ">
         <input type="email" id="email" name="email"  placeholder=" Email (Optional) ">
         <input type="text" id="contact" name="contact" maxlength="10" minlength="10" name="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required placeholder=" Contact Number (Required) ">
         <input type="text" id="address" name="address" required placeholder=" Address (Required) ">
         <textarea id="message" name="message" rows="2" required placeholder=" Message (Required) "></textarea>
         <button type="submit">Submit</button>
      </form>
   </div>
</div>
<script>
   $(document).ready(function () {
      $("#contactForm").submit(function (e) {
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
                   $('#contactForm')[0].reset();
                   $('#popupForm').hide();
                   Swal.fire({
                       title: "Successful",
                       text: "Form Submited Successfully!",
                       icon: "success",
                        });
               } else {
                  $('#popupForm').hide();
                   Swal.fire({
                       title: "Error",
                       text: data,
                       icon: "warning",
                   });
               }
           },
           error: function () {
            $('#popupForm').hide();
               Swal.fire({
                   title: "Error!",
                   text: "An error occurred while processing the request.",
                   icon: "error",
               });
           }
       });
   });
   })
</script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/jquery/jquery.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/jquery/jquery.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/jquery/jquery-migrate.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/jquery/ui/core.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/jquery/ui/widget.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/jquery/ui/accordion.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/_main.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/vendor/essential-grid/js/lightbox.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/vendor/essential-grid/js/jquery.themepunch.tools.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/vendor/essential-grid/js/jquery.themepunch.essential.min.js"></script>
<script type='text/javascript' src='<?php echo base_url('web-include/')?>js/vendor/revslider/jquery.themepunch.revolution.min.js'></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/eg-projects.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/vendor/revslider/revsliderextensions/revolution.extension.slideanims.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/vendor/revslider/revsliderextensions/revolution.extension.actions.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/vendor/revslider/revsliderextensions/revolution.extension.layeranimation.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/vendor/revslider/revsliderextensions/revolution.extension.navigation.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/revslider-homepage.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/vendor/swiper/swiper.jquery.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/vendor/magnific/jquery.magnific-popup.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/trx_addons.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/superfish.js"></script>
<script type="text/javascript" src="<?php echo base_url('web-include/')?>js/scripts.js"></script>
<!-- <script type='text/javascript' src='http://maps.googleapis.com/maps/api/js'></script> -->
<a href="#" class="trx_addons_scroll_to_top trx_addons_icon-up" title="Scroll to top"></a>
<script defer src="<?php echo base_url('web-include/')?>https://static.cloudflareinsights.com/beacon.min.js/v8b253dfea2ab4077af8c6f58422dfbfd1689876627854" integrity="sha512-bjgnUKX4azu3dLTVtie9u6TKqgx29RBwfj3QXYt5EKfWM/9hPSAI/4qcV5NACjwAo8UtTeWefx6Zq5PHcMm7Tg==" data-cf-beacon='{"rayId":"80141b12e857f31f","version":"2023.8.0","b":1,"token":"dab7be3e6ab04952b40d6c8e93f6cc2a","si":100}' crossorigin="anonymous"></script>
<script>
   const openPopupBtn = document.getElementById('openPopupBtn');
   const closePopupBtn = document.getElementById('closePopupBtn');
   const popup = document.querySelector('.popup'); 
   
   openPopupBtn.addEventListener('click', () => {
       popup.style.display = 'block'; 
   });
   
   closePopupBtn.addEventListener('click', () => {
       popup.style.display = 'none'; 
   });
   
   popup.addEventListener('click', (event) => {
       if (event.target === popup) {
           popup.style.display = 'none'; 
       }
   });
</script>
</body>
</html>