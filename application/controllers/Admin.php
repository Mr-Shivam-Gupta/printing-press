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
    if (($this->session->login["user_type"] != "admin")) {
      $this->session->set_flashdata("error", "No direct  access allowed");
      return redirect("admin-login");
  } 
  }

  public function index()
  {
    $data['page_name'] = 'dashboard';
    $this->load->view('admin/index', $data);
  }
  public function workLIst()
  {

    $data['page_name'] = 'work-list';
    $data['works'] = $this->db->get_where('work_tbl',['status'=>'0'])->result_array();
    $this->load->view('admin/index', $data);
  }
  public function workSubmit() {
   if ($this->input->post()) {
    $this->form_validation->set_rules('date','date','trim|required');
    $this->form_validation->set_rules('work','work','trim|required');
    $this->form_validation->set_rules('details','details','trim|required');
    if ($this->form_validation->run() == false ) {
      echo 'Validation error';
    }else{
      $formData = [
        'date'=>$this->input->post('date'),
        'work'=>$this->input->post('work'),
        'details'=>$this->input->post('details')
      ];
      $submit =$this->Printing_models->workSubmit('work_tbl',$formData);
      if ($submit == true) {
        echo '1';
      }
    }
   }else {
    echo "Please fill all fields!";
   }
  }
  public function calulateStock(){
    $this->form_validation->set_rules('plush','plush','trim');
    $this->form_validation->set_rules('minus','minus','trim');
     $id= $this->input->post('id');
     $data = $this->db->where(['id'=>$id])->get('stock_tbl')->row();
     $availData = $data->available;
     $plush = $this->input->post('plush');
     $minus = $this->input->post('minus');
    
     if ($plush !="") {
      $addition = $availData + $plush;
      $formData = [
        'available'=>$addition
      ];
      $this->db->where(['id'=>$id])->update('stock_tbl',$formData);
      echo '1';
     }
     if ($minus !="") {
      $subtraction = $availData - $minus;
      if ($subtraction < 0) {
        echo 'Product available quantity must be greater than or equal to zero.';
      }
      else {
        $formData = [
          'available'=>$subtraction
        ];
        $this->db->where(['id'=>$id])->update('stock_tbl',$formData);
        echo '1';
      }
     
     }

  }
  public function manageStock($id = Null)
  {
    $data['edit'] = "";
    $data['tbl_data']=$this->db->get('stock_tbl')->result_array();
    $data['page_name'] = 'manage-product';
    $this->load->view('admin/index', $data);
  }
  public function addStock($id = Null)
  {
    $data['edit'] = "";
    $data['tbl_data']=$this->db->get('stock_tbl')->result_array();
    $data['page_name'] = 'add-product';
    $this->load->view('admin/index', $data);
  }
  public function productSubmit(){

    if ($this->input->post()){ 
      $this->form_validation->set_rules('product','product','trim|required');
      $this->form_validation->set_rules('quantity','quantity','trim|required');
      if ($this->form_validation->run() == false) {
        echo" validation error";
      }else{
        $product = $this->input->post('product');
        $checkProduct = $this->db->where(['product'=> $product])->get('stock_tbl')->num_rows();
        if ($checkProduct > 0) {
          echo "This Product already exist!";
        }
        $formData = [
          'product  ' => $product,
          'quantity' => $this->input->post('quantity')
        ];
        $dbSubmit = $this->Printing_model->productSubmit('stock_tbl', $formData);
        if ($dbSubmit == true) {
          echo "1";
        }
      }
     }else {
      echo "Please fill all fields ";
     }
  }
  public function  Editproduct($id = Null)
  {
    $data['edit'] = "edit";
    $data['page_name'] = 'add-stock';
    $data['tbl_data']=$this->db->get('stock_tbl')->result_array();
    $data['desList'] = $this->db->where(['id'=>$id])->get('stock_tbl')->row();
    $this->load->view('admin/index', $data);
  }
  public function productEdit($id){
    if ($this->input->post()){ 
      $this->form_validation->set_rules('product','product','trim|required');
      $this->form_validation->set_rules('quantity','quantity','trim|required');
      if ($this->form_validation->run() == false) {
        echo" validation error";
      }else{
        $product = $this->input->post('product');
        $checkProduct = $this->db->where(['product'=> $product])->where_not_in('id', $id)->get('stock_tbl')->num_rows();
        if ($checkProduct > 0) {
          echo "This Product already exist!";
        }
        $formData = [
          'product  ' => $product,
          'quantity' => $this->input->post('quantity')
        ];
        $dbSubmit = $this->Printing_model->productEdit('stock_tbl',$id,$formData);
        if ($dbSubmit == true) {
          echo "1";
        }
      }
     }else {
      echo "Please fill all fields ";
     }
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

        $checkType = $this->db->where(['type'=> $type])->get('design_tbl')->num_rows();
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
  public function DtypeEdit($id) {
    if ($this->input->post()) {
        $this->form_validation->set_rules('Dtype', 'Dtype', 'trim|required');
        $this->form_validation->set_rules('url', 'url', 'trim|required');

        if ($this->form_validation->run() == false) {
            echo "Validation error";
        } else {
            $type = $this->input->post('Dtype');
            $url = $this->input->post('url');

            // Check if the new 'type' already exists except for the current record.
            $checkType = $this->db->where(['type' => $type])->where_not_in('id', $id)->get('design_tbl')->num_rows();

            // Check if the new 'url' already exists except for the current record.
            $checkUrl = $this->db->where(['url' => $url])->where_not_in('id', $id)->get('design_tbl')->num_rows();

            if ($checkType > 0) {
                echo "This design type already exists!";
            } else if ($checkUrl > 0) {
                echo "This URL already exists!";
            } else {
                $formData = [
                    'type' => $type,
                    'url' => $url
                ];
                // Assuming DtypeEdit is a function to update the database record.
                $dbSubmit = $this->Printing_model->DtypeEdit('design_tbl', $id, $formData);
                if ($dbSubmit) {
                    echo "1";
                } else {
                    echo "Error updating the record.";
                }
            }
        }
    } else {
        echo "Please fill all fields";
    }
}

public function DeleteDesignType($id){
  $this->db->where(['id'=>$id])->delete('design_tbl');
  redirect('design-type');
}
  public function upload($id = Null)
  {
      $data['edit'] = "";
      $data['page_name'] = 'upload';
      $data['des_data']=$this->db->get('design_tbl')->result_array();
      $data['tbl_data']=$this->db->get('image_tbl')->result_array();
      $this->load->view('admin/index', $data);
  }
  public function editUpload($id = Null){
    $data['page_name'] = 'upload';
    $data['des_data']=$this->db->get('design_tbl')->result_array();
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
        $config['allowed_types'] = 'webp|png|jpg|gif|jpeg';
        // $config['max_size']             = 300;
        // $config['max_width']            = 1024;
        // $config['max_height']           = 1024;
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
        $config['allowed_types'] = 'webp|png|jpg|gif|jpeg';
        // $config['max_size']             = 300;
        // $config['max_width']            = 2024;
        // $config['max_height']           = 2024;
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
  public function Deleteproduct($id){
    $this->db->where(['id'=>$id])->delete('stock_tbl');
    redirect('add-stock');
  }
  public function workDone($id){
    $data = ['status'=>'1'];
    $this->db->where(['id'=>$id])->update('work_tbl',$data);
    redirect('work-list');
  }
  public function workCancel($id){
    $data = ['status'=>'2'];
    $this->db->where(['id'=>$id])->update('work_tbl',$data);
    redirect('work-list');
  }
}
