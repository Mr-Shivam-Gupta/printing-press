<?php

class Printing_model extends CI_Model
{
	
	public function getUserAuthentication($tbl){

		$result = $this->db->get('admin_tbl');
		return $result;

}



}


?>
