<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Welcome extends CI_Controller
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
		$this->load->view('index');
	}
	public function designs()
	{
		$this->load->view('designs');
	}
	public function contact()
	{
		$this->load->view('contact');
	}
	public function login()
	{
		$this->load->view('admin/login');
	}
	public function userAuthentication()
	{
		$data['title'] = "User Authentication";
		if ($this->input->post()) {
			$this->form_validation->set_rules('username', 'User Name', 'trim|required');
			$this->form_validation->set_rules('userpassword', 'User Password', 'trim|required');
			if ($this->form_validation->run() == false) {
				$this->session->set_flashdata('error', 'Please enter correct user name & password');
				return redirect('admin-login');
			} else {
				$uname = $this->input->post('username');
				$cond = array('user_name' => $uname);
				$record = $this->Printing_model->getUserAuthentication('admin_tbl', $cond);
				if ($record->num_rows() == 0) {
					$this->session->set_flashdata('error', 'Please enter correct  user name');
					return redirect('admin-login');
				} else {
					$details = $record->row();
					$dbname = $details->user_name;
					$enpass = hash('SHA512', $this->input->post('userpassword'));
					$encapass = hash('SHA512', $enpass);
					$dbpass = $details->user_password;
					$endbpass = hash('SHA512', $dbpass);

					if ($encapass != $endbpass) {
						$this->session->set_flashdata('error', 'Please enter correct password');
						return redirect('admin-login');
					} else {
						if ($uname != $dbname && $encapass != $endbpass) {
							$this->session->set_flashdata('error', 'Please enter correct user name & password');
							return redirect('admin-login');
						} else {
							$user_id = $details->id;
							$sessData = array('UserName' => $details->full_name, 'user_email' => $details->user_name, 'user_type' => $details->user_type, 'user_id' => $details->id);
							$this->session->set_userdata('login', $sessData);
							AntiFixationInit();
							$cookiester = "";
							$this->session->salt = generateSalt();
							$this->load->helper('cookie');
							$duration = 30 * 60;
							set_cookie("AuthoToken", $this->session->salt, $duration);
							return redirect('admin-dashboard');
						}
					}
				}
			}
		} else {
			echo 'post error';
		}
	}
}
