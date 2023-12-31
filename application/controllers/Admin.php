<?php
defined("BASEPATH") or exit("No direct script access allowed");
class Admin extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper("custom_helper");
        $this->load->model("Printing_model");
        date_default_timezone_set("Asia/Kolkata");
        if ($this->session->login["user_type"] != "admin") {
            $this->session->set_flashdata("error", "No direct  access allowed");
            return redirect("admin-login");
        }
    }

    public function index()
    {
        $data["page_name"] = "admin-dashboard";
        $data["D_type_count"] =$this->db->get('design_tbl')->num_rows();
        $data["Image_count"] =$this->db->get('image_tbl')->num_rows();
        $data["Product_count"] =$this->db->get('stock_tbl')->num_rows();
        $data["upcoming_work_count"] = $this->db->get_where("work_tbl", ["status" => "0","date >" => date("Y-m-d"),])->num_rows();
        $data["current_month_count"] = $this->db->get_where("work_tbl",["is_delivered" => "1","YEAR(date)" => date("Y"),"MONTH(date)" => date("m")])->num_rows();
        $data["last_month_count"] = $this->db->get_where("work_tbl",["is_delivered" => "1","YEAR(date)" => date("Y", strtotime("last month")),"MONTH(date)" => date("m", strtotime("last month"))])->num_rows();
        $data["deliverd_count"] = $this->db->get_where("work_tbl",["is_delivered" => "1"])->num_rows();
        $data["works"] = $this->db->get_where("work_tbl", ["status" => "0"])->result_array();
         $data["products"] = $this->db->get('stock_tbl')->result_array();

        $this->load->view("admin/index", $data);
    }
    public function dashboard()
    {
        $data["page_name"] = "dashboard";
        $data["D_type_count"] =$this->db->get('design_tbl')->num_rows();
        $data["Image_count"] =$this->db->get('image_tbl')->num_rows();
        $data["Product_count"] =$this->db->get('stock_tbl')->num_rows();
        $data["upcoming_work_count"] = $this->db->get_where("work_tbl", ["status" => "0","date >" => date("Y-m-d"),])->num_rows();
        $data["current_month_count"] = $this->db->get_where("work_tbl",["is_delivered" => "1","YEAR(date)" => date("Y"),"MONTH(date)" => date("m")])->num_rows();
        $data["last_month_count"] = $this->db->get_where("work_tbl",["is_delivered" => "1","YEAR(date)" => date("Y", strtotime("last month")),"MONTH(date)" => date("m", strtotime("last month"))])->num_rows();
        $data["deliverd_count"] = $this->db->get_where("work_tbl",["is_delivered" => "1"])->num_rows();
        $data["works"] = $this->db->get_where("work_tbl", ["status" => "0"])->result_array();
        $this->load->view("admin/index", $data);
    }
    public function enquiry()
    {
        $data["page_name"] = "enquiry-details";
        $data["enquiry"] = $this->db->order_by('id','DESC')->get("enquiry_tbl")->result_array();
        $this->load->view("admin/index", $data);
    }
    public function addCustomer()
    {
        $data["page_name"] = "add-customer";
        $data["customer_list"] = $this->db->get("customer_tbl")->result_array();
        $this->load->view("admin/index", $data);
    }
    public function customerSubmit()
    {
        if ($this->input->post() == true) {
            $this->form_validation->set_rules("name", "name", "trim|required");
            $this->form_validation->set_rules(
                "number",
                "number",
                "trim|required"
            );
            $this->form_validation->set_rules(
                "address",
                "address",
                "trim|required"
            );
            if ($this->form_validation->run() == false) {
                echo "Please fill all required(*) fields";
            } else {
                $phone = $this->input->post("number");
                $email = $this->input->post("email");
                $customerNumber = $this->db->get_where('customer_tbl',['phone'=>$phone])->num_rows();
                $customerEmail = $this->db->get_where('customer_tbl',['email'=>$email])->num_rows();
                if ($customerNumber > 0) {
                    echo 'This number already exits! ';
                }else{
                    $formData = [
                        "customer" => $this->input->post("name"),
                        "phone" => $phone,
                        "email" => $email,
                        "address" => $this->input->post("address"),
                        "ip_address" => $this->input->ip_address(),
                        "browser" => $this->agent->browser(),
                        "create_date" => date("y-m-d H:i:s"),
                    ];
                    $submit = $this->Printing_model->customerSubmit(
                        "customer_tbl",
                        $formData
                    );
                    if ($submit == true) {
                        echo "1";
                    }
                }
                
            }
        } else {
            echo "Please fill all required(*) fields";
        }
    }
    public function customerEdit()
    {
        $id = $this->input->post("id");
        if ($this->input->post() == true) {
            $this->form_validation->set_rules("name", "name", "trim|required");
            $this->form_validation->set_rules(
                "number",
                "number",
                "trim|required"
            );
            $this->form_validation->set_rules(
                "address",
                "address",
                "trim|required"
            );
            if ($this->form_validation->run() == false) {
                echo "Please fill all required(*) fields";
            } else {
                $formData = [
                    "customer" => $this->input->post("name"),
                    "phone" => $this->input->post("number"),
                    "email" => $this->input->post("email"),
                    "address" => $this->input->post("address"),
                    "ip_address" => $this->input->ip_address(),
                    "browser" => $this->agent->browser(),
                    "submit_date" => date("y-m-d H:i:s"),
                ];
                $submit = $this->Printing_model->customerEdit(
                    "customer_tbl",
                    $id,
                    $formData
                );
                if ($submit == true) {
                    echo "1";
                }
            }
        } else {
            echo "Please fill all required(*) fields";
        }
    }

    public function todayWork()
    {
        $data["page_name"] = "today-work";
        $data["works"] = $this->db
            ->order_by("id", "DESC")
            ->get_where("work_tbl", ["status" => "0", "date" => date("Y-m-d")])
            ->result_array();
        $this->load->view("admin/index", $data);
    }
    public function upcomingWork()
    {
        $data["page_name"] = "upcoming-work";
        $data["works"] = $this->db
            ->order_by("id", "DESC")
            ->get_where("work_tbl", [
                "status" => "0",
                "date >" => date("Y-m-d"),
            ])
            ->result_array();
        $this->load->view("admin/index", $data);
    }
    public function doneWork()
    {
        $data["page_name"] = "done-work";
        $data["works"] = $this->db
            ->order_by("id", "DESC")
            ->get_where("work_tbl", ["status" => "1"])
            ->result_array();
        $this->load->view("admin/index", $data);
    }
    public function cencelWork()
    {
        $data["page_name"] = "canceled-work";
        $data["works"] = $this->db
            ->order_by("id", "DESC")
            ->get_where("work_tbl", ["status" => "2"])
            ->result_array();
        $this->load->view("admin/index", $data);
    }
    public function workLIst()
    {
        $data["page_name"] = "work-list";
        $data["customers"] = $this->db->get('customer_tbl')->result_array();
        $data["works"] = $this->db
            ->order_by("id", "DESC")
            ->get_where("work_tbl", ["status" => "0"])
            ->result_array();
        $this->load->view("admin/index", $data);
    }
    public function workView($id){
        $data["page_name"] = "work-view";
        $data["works"] = $this->db->get_where("work_tbl", ["id" => $id])->row_array();
        $this->load->view("admin/index", $data);
    }

    public function workSubmit()
    {
         
        if ($this->input->post()) {
            $this->form_validation->set_rules("date", "date", "trim|required");
            $this->form_validation->set_rules("work", "work", "trim|required");
            $this->form_validation->set_rules("details", "details", "trim|required");
            $this->form_validation->set_rules("cost", "cost", "trim|required");
            $this->form_validation->set_rules("advance", "advance", "trim|required");
            if ($this->form_validation->run() == false) {
                echo "Validation error";
            } else {
                $formData = [
                    "customer_id" => $this->input->post("c_id"),
                    "date" => $this->input->post("date"),
                    "work" => $this->input->post("work"),
                    "details" => $this->input->post("details"),
                    "cost" => $this->input->post("cost"),
                    "advance" => $this->input->post("advance"),
                    "ip_address" => $this->input->ip_address(),
                    "browser" => $this->agent->browser(),
                    "create_date" => date("y-m-d H:i:s"),
                ];
                $submit = $this->Printing_model->workSubmit(
                    "work_tbl",
                    $formData
                );
                if ($submit == true) {
                    echo "1";
                }
            }
        } else {
            echo "Please fill all fields!";
        }
    }
    public function calulateStock()
    {
        $this->form_validation->set_rules("plush", "plush", "trim");
        $this->form_validation->set_rules("minus", "minus", "trim");
        $id = $this->input->post("id");
        $data = $this->db
            ->where(["id" => $id])
            ->get("stock_tbl")
            ->row();
        $availData = $data->available;
        $plush = $this->input->post("plush");
        $minus = $this->input->post("minus");

        if ($plush != "") {
            $addition = $availData + $plush;
            $formData = [
                "available" => $addition,
            ];
            $this->db->where(["id" => $id])->update("stock_tbl", $formData);
            echo "1";
        }
        if ($minus != "") {
            $subtraction = $availData - $minus;
            if ($subtraction < 0) {
                echo "Product available quantity must be greater than or equal to zero.";
            } else {
                $formData = [
                    "available" => $subtraction,
                ];
                $this->db->where(["id" => $id])->update("stock_tbl", $formData);
                echo "1";
            }
        }
    }
    public function manageStock($id = null)
    {
        $data["edit"] = "";
        $data["tbl_data"] = $this->db
            ->order_by("id", "DESC")
            ->get("stock_tbl")
            ->result_array();
        $data["page_name"] = "manage-product";
        $this->load->view("admin/index", $data);
    }
    public function addStock($id = null)
    {
        $data["edit"] = "";
        $data["tbl_data"] = $this->db
            ->order_by("id", "DESC")
            ->get("stock_tbl")
            ->result_array();
        $data["page_name"] = "add-product";
        $this->load->view("admin/index", $data);
    }
    public function productSubmit()
    {
        if ($this->input->post()) {
            $this->form_validation->set_rules(
                "product",
                "product",
                "trim|required"
            );
            $this->form_validation->set_rules(
                "quantity",
                "quantity",
                "trim|required"
            );
            if ($this->form_validation->run() == false) {
                echo " validation error";
            } else {
                $product = $this->input->post("product");
                $checkProduct = $this->db
                    ->where(["product" => $product])
                    ->get("stock_tbl")
                    ->num_rows();
                if ($checkProduct > 0) {
                    echo "This Product already exist!";
                }
                $formData = [
                    "product  " => $product,
                    "quantity" => $this->input->post("quantity"),
                    "ip_address" => $this->input->ip_address(),
                    "browser" => $this->agent->browser(),
                    "create_date" => date("y-m-d H:i:s"),
                ];
                $dbSubmit = $this->Printing_model->productSubmit(
                    "stock_tbl",
                    $formData
                );
                if ($dbSubmit == true) {
                    echo "1";
                }
            }
        } else {
            echo "Please fill all fields ";
        }
    }
    public function Editproduct($id = null)
    {
        $data["edit"] = "edit";
        $data["page_name"] = "add-product";
        $data["tbl_data"] = $this->db
            ->order_by("id", "DESC")
            ->get("stock_tbl")
            ->result_array();
        $data["desList"] = $this->db
            ->where(["id" => $id])
            ->get("stock_tbl")
            ->row();
        $this->load->view("admin/index", $data);
    }
    public function productEdit($id)
    {
        if ($this->input->post()) {
            $this->form_validation->set_rules(
                "product",
                "product",
                "trim|required"
            );
            $this->form_validation->set_rules(
                "quantity",
                "quantity",
                "trim|required"
            );
            if ($this->form_validation->run() == false) {
                echo " validation error";
            } else {
                $product = $this->input->post("product");
                $checkProduct = $this->db
                    ->where(["product" => $product])
                    ->where_not_in("id", $id)
                    ->get("stock_tbl")
                    ->num_rows();
                if ($checkProduct > 0) {
                    echo "This Product already exist!";
                }
                $formData = [
                    "product  " => $product,
                    "quantity" => $this->input->post("quantity"),
                    "ip_address" => $this->input->ip_address(),
                    "browser" => $this->agent->browser(),
                    "submit_date" => date("y-m-d H:i:s"),
                ];
                $dbSubmit = $this->Printing_model->productEdit(
                    "stock_tbl",
                    $id,
                    $formData
                );
                if ($dbSubmit == true) {
                    echo "1";
                }
            }
        } else {
            echo "Please fill all fields ";
        }
    }

    public function DesignType($id = null)
    {
        $data["edit"] = "";
        $data["page_name"] = "design-type";
        $data["tbl_data"] = $this->db
            ->order_by("id", "DESC")
            ->get("design_tbl")
            ->result_array();
        $this->load->view("admin/index", $data);
    }
    public function EditDesignType($id = null)
    {
        $data["edit"] = "edit";
        $data["page_name"] = "design-type";
        $data["tbl_data"] = $this->db
            ->order_by("id", "DESC")
            ->get("design_tbl")
            ->result_array();
        $data["desList"] = $this->db
            ->where(["id" => $id])
            ->get("design_tbl")
            ->row();
        $this->load->view("admin/index", $data);
    }
    public function DtypeSubmit()
    {
        if ($this->input->post()) {
            $this->form_validation->set_rules(
                "Dtype",
                "Dtype",
                "trim|required"
            );
            $this->form_validation->set_rules("url", "url", "trim|required");

            if ($this->form_validation->run() == false) {
                echo " validation error";
            } else {
                $type = $this->input->post("Dtype");
                $url = $this->input->post("url");

                $checkType = $this->db
                    ->where(["type" => $type])
                    ->get("design_tbl")
                    ->num_rows();
                $checkUrl = $this->db
                    ->where(["type" => $url])
                    ->get("design_tbl")
                    ->num_rows();
                if ($checkType > 0) {
                    echo "This design type already exist!";
                } else {
                    if ($checkUrl > 0) {
                        echo "This Url already exist!";
                    } else {
                        $formData = [
                            "type" => $type,
                            "url" => $url,
                            "ip_address" => $this->input->ip_address(),
                            "browser" => $this->agent->browser(),
                            "create_date" => date("y-m-d H:i:s"),
                        ];
                        $dbSubmit = $this->Printing_model->DtypeSubmit(
                            "design_tbl",
                            $formData
                        );
                        if ($dbSubmit == true) {
                            echo "1";
                        }
                    }
                }
            }
        } else {
            echo "Please fill all fields ";
        }
    }
    public function DtypeEdit($id)
    {
        if ($this->input->post()) {
            $this->form_validation->set_rules(
                "Dtype",
                "Dtype",
                "trim|required"
            );
            $this->form_validation->set_rules("url", "url", "trim|required");

            if ($this->form_validation->run() == false) {
                echo "Validation error";
            } else {
                $type = $this->input->post("Dtype");
                $url = $this->input->post("url");

                $checkType = $this->db
                    ->where(["type" => $type])
                    ->where_not_in("id", $id)
                    ->get("design_tbl")
                    ->num_rows();

                $checkUrl = $this->db
                    ->where(["url" => $url])
                    ->where_not_in("id", $id)
                    ->get("design_tbl")
                    ->num_rows();

                if ($checkType > 0) {
                    echo "This design type already exists!";
                } elseif ($checkUrl > 0) {
                    echo "This URL already exists!";
                } else {
                    $formData = [
                        "type" => $type,
                        "url" => $url,
                        "ip_address" => $this->input->ip_address(),
                        "browser" => $this->agent->browser(),
                        "submit_date" => date("y-m-d H:i:s"),
                    ];
                    $dbSubmit = $this->Printing_model->DtypeEdit(
                        "design_tbl",
                        $id,
                        $formData
                    );
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

    public function DeleteDesignType($id)
    {
        $this->db->where(["id" => $id])->delete("design_tbl");
        redirect("design-type");
    }
    public function upload($id = null)
    {
        $data["edit"] = "";
        $data["page_name"] = "upload";
        $data["des_data"] = $this->db
            ->order_by("id", "DESC")
            ->get("design_tbl")
            ->result_array();
        $data["tbl_data"] = $this->db
            ->order_by("id", "DESC")
            ->get("image_tbl")
            ->result_array();
        $this->load->view("admin/index", $data);
    }
    public function editUpload($id = null)
    {
        $data["page_name"] = "upload";
        $data["des_data"] = $this->db
            ->order_by("id", "DESC")
            ->get("design_tbl")
            ->result_array();
        $data["tbl_data"] = $this->db
            ->order_by("id", "DESC")
            ->get("image_tbl")
            ->result_array();
        $data["imgList"] = $this->db
            ->where(["id" => $id])
            ->get("image_tbl")
            ->row();
        $data["edit"] = "edit";
        $this->load->view("admin/index", $data);
    }

    public function imageUpload()
    {
        if ($this->input->post()) {
            if (!empty($_FILES["image"]["name"])) {
                $config["upload_path"] = "./web-include/design/";
                $config["allowed_types"] = "webp|png|jpg|gif|jpeg";
                $config["max_size"] = 500;
                $config["max_width"] = 2024;
                $config["max_height"] = 2024;
                $config["encrypt_name"] = true;
                $this->load->library("upload", $config);
                $this->upload->initialize($config);
                if ($this->upload->do_upload("image")) {
                    $data = $this->upload->data();
                } else {
                    $error = $this->upload->display_errors();
                    echo "Please select correct image file";
                    die();
                }
                $formData = [
                    "image" => $data["file_name"],
                    "Dtype" => $this->input->post("Dtype"),
                    "ip_address" => $this->input->ip_address(),
                    "browser" => $this->agent->browser(),
                    "create_date" => date("y-m-d H:i:s"),
                ];
                $dbSubmit = $this->Printing_model->imageUpload(
                    "image_tbl",
                    $formData
                );
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
            if (!empty($_FILES["image"]["name"])) {
                $config["upload_path"] = "./web-include/design/";
                $config["allowed_types"] = "webp|png|jpg|gif|jpeg";
                $config["max_size"] = 500;
                $config["max_width"] = 2024;
                $config["max_height"] = 2024;
                $config["encrypt_name"] = true;
                $this->load->library("upload", $config);
                $this->upload->initialize($config);
                if ($this->upload->do_upload("image")) {
                    $data = $this->upload->data();
                } else {
                    $error = $this->upload->display_errors();
                    echo "Please select correct image file";
                    die();
                }
                $formData = [
                    "image" => $data["file_name"],
                    "Dtype" => $this->input->post("Dtype"),
                    "ip_address" => $this->input->ip_address(),
                    "browser" => $this->agent->browser(),
                    "submit_date" => date("y-m-d H:i:s"),
                ];
                $dbSubmit = $this->Printing_model->imageUpdate(
                    "image_tbl",
                    $id,
                    $formData
                );
                if ($dbSubmit == true) {
                    echo "1";
                }
            } else {
                $formData = [
                    "Dtype" => $this->input->post("Dtype"),
                ];
                $dbSubmit = $this->Printing_model->imageUpdate(
                    "image_tbl",
                    $id,
                    $formData
                );
                if ($dbSubmit == true) {
                    echo "1";
                }
            }
        } else {
            echo "Please select design type and image";
        }
    }
    public function deleteUpload($id)
    {
        $this->db->where(["id" => $id])->delete("image_tbl");
        redirect("upload");
    }
    public function DeleteCustomer($id)
    {
        $this->db->where(["id" => $id])->delete("customer_tbl");
        redirect("add-customer");
    }
    public function Deleteproduct($id)
    {
        $this->db->where(["id" => $id])->delete("stock_tbl");
        redirect("add-stock");
    }
    public function workDone($id)
    {
        $data = ["status" => "1"];
        $this->db->where(["id" => $id])->update("work_tbl", $data);
        redirect("work-list");
    }
    public function workCancel($id)
    {
        $data = ["status" => "2"];
        $this->db->where(["id" => $id])->update("work_tbl", $data);
        redirect("work-list");
    }
    public function deliverd($id)
    {
        
        $data = [
            "is_delivered" => "1",
            "delivered_date" => date("y-m-d H:i:s"),
    ];
        $this->db->where(["id" => $id])->update("work_tbl", $data);
        redirect("Admin/workView/".$id);
    }

    public function logout()
    {
        $this->session->sess_destroy();
        return redirect("admin-login");
    }
}
