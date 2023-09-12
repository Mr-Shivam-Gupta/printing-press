<?php

class Printing_model extends CI_Model
{
	
	public function getUserAuthentication($tbl,$cond){

		$result = $this->db->get('admin_tbl',$cond);
		return $result;

 }
  
 public function  imageUpload($tbl,$formData=""){
			if ($formData != ""){
			$result =$this->db->insert('image_tbl',$formData);
			return $result;
			}
 }
 public function  workSubmit($tbl,$formData=""){
			if ($formData != ""){
			$result =$this->db->insert('work_tbl',$formData);
			return $result;
			}	
 }
 public function  DtypeSubmit($tbl,$formData=""){
			if ($formData != ""){
			$result =$this->db->insert('design_tbl',$formData);
			return $result;
			}
 }
 public function  contactForm($tbl,$formData=""){
			if ($formData != ""){
			$result =$this->db->insert('enquiry_tbl',$formData);
			return $result;
			}
 }
 public function  productSubmit($tbl,$formData=""){
			if ($formData != ""){
			$result =$this->db->insert('stock_tbl',$formData);
			return $result;
			}
 }
      public function  productEdit($tbl,$id, $formData=""){
		if ($formData != ""){
		$result =$this->db->where(['id'=>$id])->update('stock_tbl',$formData);
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
 	public function customerSubmit($tbl,$formData=""){
		if ($formData != ""){
			$result =$this->db->insert($tbl,$formData);
			return $result;
			}
	}
 	public function customerEdit($tbl,$id,$formData=""){
		if ($formData != ""){
			$result =$this->db->where(['id'=>$id])->update($tbl,$formData);
			return $result;
			}
	}


}


?>
