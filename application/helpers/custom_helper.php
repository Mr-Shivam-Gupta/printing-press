<?php defined('BASEPATH') OR exit('No direct script access allowed');
function generateSalt($length = 6) {
        $str = "";
        $characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
        $max = count($characters) - 1;
        for ($i = 0; $i < $length; $i++) {
            $rand = mt_rand(0, $max);
            $str .= $characters[$rand];
        }
        $str = hash('sha512',$str);
        return $str;
    }
    
    function AntiFixationInit()
    {
        $obj =& get_instance();
        $value = generateSalt();
        $obj->load->helper('cookie');
        set_cookie("ci_fixation",$value,30*60);        
        $obj->session->ci_fixation = $value;
    }
