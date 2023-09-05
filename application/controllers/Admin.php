<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Admin extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->helper('custom_helper');
    $this->load->model('Printing_model');
    date_default_timezone_set('Asia/Kolkata');
  }

  public function index()
  {
    $data['page_name'] = 'dashboard';
    $this->load->view('admin/index', $data);
  }
  public function  DesignType($id = Null)
  {
    $data['edit'] = "";
    $data['page_name'] = 'design-type';
    $data['tbl_data']=$this->db->get('design_tbl')->result_array();
    $this->load->view('admin/index', $data);
  }
  public function  EditDesignType($id = Null)
  {
    $data['edit'] = "edit";
    $data['page_name'] = 'design-type';
    $data['tbl_data']=$this->db->get('design_tbl')->result_array();
    $data['desList'] = $this->db->where(['id'=>$id])->get('design_tbl')->row();
    $this->load->view('admin/index', $data);
  }
  public function  DtypeSubmit()
  {
    if ($this->input->post()) {
      $this->form_validation->set_rules('Dtype','Dtype','trim|required');
      $this->form_validation->set_rules('url','url','trim|required');
      
      if ($this->form_validation->run() == false) {
        echo" validation error";
      }else{
        $type = $this->input->post('Dtype');
        $url = $this->input->post('url');

        $checkType =$this->db->where(['type'=> $type])->get('design_tbl')->num_rows();
        $checkUrl =$this->db->where(['type'=> $url])->get('design_tbl')->num_rows();
        if ($checkType > 0) {
          echo "This design type already exist!";
        } else {
          if ($checkUrl > 0) {
            echo "This Url already exist!";
          }else{
            $formData = [
              'type' => $type,
              'url' => $url
            ];
            $dbSubmit = $this->Printing_model->DtypeSubmit('design_tbl', $formData);
            if ($dbSubmit == true) {
              echo "1";
            }
          }
        }
      }
      
    }else {
      echo "Please fill all fields ";
    }
  }
  public function DtypeEdit($id){
    if ($this->input->post()) {
      $this->form_validation->set_rules('Dtype','Dtype','trim|required');
      $this->form_validation->set_rules('url','url','trim|required');
      
      if ($this->form_validation->run() == false) {
        echo" validation error";
      }else{
        $type = $this->input->post('Dtype');
        $url = $this->input->post('url');
        $checkType =$this->db->where(['type'=> $type])->where_not_in(['id'=>$id])->get('design_tbl')->num_rows();
        $checkUrl =$this->db->where(['type'=> $url])->where_not_in(['id'=>$id])->get('design_tbl')->num_rows();
        if ($checkType > 0) {
          echo "This design type already exist!";
        } else {
          if ($checkUrl > 0) {
            echo "This Url already exist!";
          }else{
            $formData = [
              'type' => $type,
              'url' => $url
            ];
            $dbSubmit = $this->Printing_model->DtypeEdit('design_tbl',$id, $formData);
            if ($dbSubmit == true) {
              echo "1";
            }
          }
        }
      }
      
    }else {
      echo "Please fill all fields ";
    }
  }
  public function upload($id = Null)
  {
      $data['edit'] = "";
      $data['page_name'] = 'upload';
      $data['tbl_data']=$this->db->get('image_tbl')->result_array();
      $this->load->view('admin/index', $data);
  }
  public function editUpload($id = Null){
    $data['page_name'] = 'upload';
    $data['tbl_data']=$this->db->get('image_tbl')->result_array();
    $data['imgList'] = $this->db->where(['id'=>$id])->get('image_tbl')->row();
    $data['edit'] = "edit";
    $this->load->view('admin/index', $data);
  }


  public function imageUpload()
  {
    if ($this->input->post()) {
      if (!empty($_FILES['image']['name'])) {
        $config['upload_path'] = './web-include/design/';
        $config['allowed_types'] = 'png|jpg|gif|jpeg';
        $config['max_size']             = 300;
        $config['max_width']            = 1024;
        $config['max_height']           = 1024;
        $config['encrypt_name'] = true;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        if ($this->upload->do_upload('image')) {
          $data = $this->upload->data();
        } else {
          $error = $this->upload->display_errors();
          echo "Please select correct image file";
          die();
        }
        $formData = [
          'image' => $data['file_name'],
          'Dtype' => $this->input->post('Dtype')
        ];
        $dbSubmit = $this->Printing_model->imageUpload('image_tbl', $formData);
        if ($dbSubmit == true) {
          echo "1";
        }
      } else {
        echo "Please select image";
      }
    } else {
      echo "Please select design type and image";
    }
  }
  public function imageUpdate($id)
  {
  
    if ($this->input->post()) {
      if (!empty($_FILES['image']['name'])) {
        $config['upload_path'] = './web-include/design/';
        $config['allowed_types'] = 'png|jpg|gif|jpeg';
        $config['max_size']             = 300;
        $config['max_width']            = 1024;
        $config['max_height']           = 1024;
        $config['encrypt_name'] = true;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        if ($this->upload->do_upload('image')) {
          $data = $this->upload->data();
        } else {
          $error = $this->upload->display_errors();
          echo "Please select correct image file";
          die();
        }
        $formData = [
          'image' => $data['file_name'],
          'Dtype' => $this->input->post('Dtype')
        ];
        $dbSubmit = $this->Printing_model->imageUpdate('image_tbl',$id, $formData);
        if ($dbSubmit == true) {
          echo "1";
        }
      } else {
        $formData = [
          'Dtype' => $this->input->post('Dtype')
        ];
        $dbSubmit = $this->Printing_model->imageUpdate('image_tbl',$id, $formData);
        if ($dbSubmit == true) {
          echo "1";
        }
      }
    } else {
      echo "Please select design type and image";
    }
  }
  public function deleteUpload($id){
    $this->db->where(['id'=>$id])->delete('image_tbl');
    redirect('upload');
  }
}
