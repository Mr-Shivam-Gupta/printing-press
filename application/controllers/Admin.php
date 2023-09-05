<?php
defined('BASEPATH') or exit('No direct script access allowed');
 class Admin extends CI_Controller {
  public function index(){
    $data['page_name'] = 'dashboard';
    $this->load->view('admin/index',$data);
  }
  public function upload(){
    $data['page_name'] = 'upload';
    $this->load->view('admin/index',$data);
  }


  public function imageUpload()
  {
     
    echo 'here';

              //  if (!empty($_FILES['image1']['name'])) 
              // { $config['upload_path'] = './assets/image/';
              //  $config['allowed_types'] = 'png|jpg|gif|jpeg';
              //  $config['encrypt_name'] = true;
              //  $this->load->library('upload', $config);
              //  $this->upload->initialize($config);
              //  if ($this->upload->do_upload('image1')) {
              //      $data1 = $this->upload->data();
              //  } else {
              //      $error = $this->upload->display_errors();
              //  }
              //  $this->db->where(['title'=>$this->input->post('name'),'status'=>1])->update('package_tbl', [
              //      'image1' =>$data1['file_name'],
              //     'ip_address' => $this->input->ip_address(),
              //     'oprating_system' => $this->agent->platform(),
              //      'browser' => $this->agent->browser().' '.$this->agent->version(),
              //     'create_date' => date('Y-m-d H:i:s'),
              //      'status'=>0]);
              //  redirect('package');
                  
  }

 }