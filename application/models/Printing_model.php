<?php

class Printing_model extends CI_Model
{
	
	public function getUserAuthentication($tbl){

		$result = $this->db->get('admin_tbl');
		return $result;

 }
  
 public function  imageUpload($tbl,$formData=""){
			if ($formData != ""){
			$result =$this->db->insert('image_tbl',$formData);
			return $result;
			}
 }
 public function  DtypeSubmit($tbl,$formData=""){
			if ($formData != ""){
			$result =$this->db->insert('design_tbl',$formData);
			return $result;
			}
 }
      public function  DtypeEdit($tbl,$id, $formData=""){
		if ($formData != ""){
		$result =$this->db->where(['id'=>$id])->update('design_tbl',$formData);
		return $result;
		}
 }
      public function  imageUpdate($tbl,$id, $formData=""){
		if ($formData != ""){
		$result =$this->db->where(['id'=>$id])->update('image_tbl',$formData);
		return $result;
		}
 }



}


?>
