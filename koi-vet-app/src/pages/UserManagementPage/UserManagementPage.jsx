import React, { useEffect, useState } from "react";
import "./UserManagementPage.css";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import {
  createStaffAPI,
  createVetAPI,
  deleteUserAPI,
  fecthAllServicesAPI,
  fetchAllUsersAPI,
  updateUserAPI,
 // updateVetByIdAPI,
} from "../../apis";
import { ROLE } from "../../utils/constants";
import { Form, Image, Input, message, Modal, Select, Table, Upload } from "antd";
import { Col, Row } from "react-bootstrap";
import ImgCrop from "antd-img-crop";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Add this import
import { toast } from "react-toastify";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [role, setRole] = useState(ROLE.STAFF);
  const [services, setServices] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [visible2, setVisible2] = useState(false);
  const [description, setDescription] = useState("");
  const handleUploadImage = (file) => {
    setImage(file);
  };

  const handleOpenModal2 = () => {
    setVisible2(true);
  }

  const handleCloseModal2 = () => {
    setVisible2(false);
    form.resetFields();
  };

  const handleOk2 = () => {
    form.submit(); 
  };


  async function handleSubmit2(values) {
    try {
      const requestData = {
        ...values,
        userRequest: {
          email: values.email,
          password: values.password,
          username: values.userName,
          fullname: values.fullname,
          address: values.address,
          phone: values.phone,
        },  
      };
      const response = await createStaffAPI(requestData);
      message.success("Staff created successfully!");
      
      setDataSource([...dataSource, response]);
      handleCloseModal2();
    } catch (error) {
      console.error("Error creating staff:", error);
      message.error("Failed to create staff. Please try again.");
    }
  }


  const handleOpenModal = () => {
    setVisible(true);
  }

  const handleCloseModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
      form.submit(); 
  };

  const handleChange = (value) => {
    setSelectedServices(value);
  }

  async function handleSubmit(values) {
    try {
      const requestData = {
        ...values,
        service: selectedServices, // Use the selectedServices array
        userRequest: {
          email: values.email,
          password: values.password,
          username: values.userName,
          fullname: values.fullname,
          address: values.address,
          phone: values.phone,
          status: values.status === "true", 
          image: values.image, 
          description: description,
        },  
      };
      const response = await createVetAPI(requestData, image);
      message.success("User created successfully!");
      setDataSource([...dataSource, response]);
      handleCloseModal();
    } catch (error) {
      message.error("Failed to create user. Please try again.");
    }
  }

  useEffect(() => {
    const fetchAllServices = async () => {
      const response = await fecthAllServicesAPI();
      setServices(response.data || []);
    };
    fetchAllServices();
  }, []);

  useEffect(() => {
    const fetchAllUsersByRole = async () => {
      try {
        const response = await fetchAllUsersAPI(role);
        console.log(role);
        console.log("response", response.data);
        // Ensure the data is an array before setting it to state
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Failed to fetch users. Please try again.");
      }
    };
    fetchAllUsersByRole();
  }, [role]);


  const handleDeleteUser = async (userId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      onOk: async () => {
        const response = await deleteUserAPI(userId);
        if (response.status === 200) {
          toast.success("User deleted successfully")
          setUsers(users.filter((user) => user.user_id !== userId));
        }
      }
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (image) => (
        <img src={image} alt="user" style={{ width: "100px", height: "100px" }} />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 100,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 100,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 100,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 100,
      render: (text, user) => (
          user.role === ROLE.CUSTOMER
          ? user.customer?.phone
          : user.role === ROLE.VETERINARIAN
          ? user.veterinarian?.phone
          : user.staff?.phone || '-'
      ),
    },
   

  ...(role === ROLE.CUSTOMER
    ? [{
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 100,
        render: (text, user) => (
       
           user.role === ROLE.CUSTOMER
            ? user.customer?.address
            : '-'
        )
      }]
    : []), 

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: (text, user) => (
        <>
          
          <button className="btn btn-sm btn-outline-secondary">Edit</button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <>
      <AdminHeader title="User Management" />
      <div className="row mb-3 justify-content-center">
        <div className="col-md-8">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" />
            {role === ROLE.VETERINARIAN ? (
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleOpenModal}
            >
              Add Vet
            </button>
            ) : role === ROLE.STAFF ? (
              <button
              className="btn btn-primary"
              type="button"
              onClick={handleOpenModal2}
            >
              Add Staff
            </button>
            ) : null}
          </div>
        </div>
      </div>
      <nav className="w-100">
        <div className="nav nav-tabs " id="nav-tab" role="tablist">
          <button
            className="nav-link custom-text-color"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
            onClick={() => setRole(ROLE.STAFF)}
          >
            <i className="fas fa-user-tie me-2 text-primary"></i>Staff
          </button>
          <button
            className="nav-link custom-text-color"
            id="nav-disabled-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-disabled"
            type="button"
            role="tab"
            aria-controls="nav-disabled"
            aria-selected="false"
            onClick={() => setRole(ROLE.CUSTOMER)}
          >
            <i className="fas fa-user me-2 text-success"></i>Customer
          </button>
          <button
            className="nav-link custom-text-color"
            id="nav-disabled-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-disabled"
            type="button"
            role="tab"
            aria-controls="nav-disabled"
            aria-selected="false"
            onClick={() => setRole(ROLE.VETERINARIAN)}
          >
            <i className="fas fa-user-md me-2 text-info"></i>Veterinarian
          </button>
        </div>
      </nav>
      <div className="table-responsive">
       

        <Table 
          key={users.length} // Thêm dòng này
          dataSource={users} 
          columns={columns} 
          rowKey={(record) => record.user_id}
        />




        {/* CREATE VET MODAL */}
        <Modal open={visible} onOk={handleOk} onCancel={handleCloseModal} width={1000}>
          <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit} layout="vertical">
            <Row>
              <Col span={6}>
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
            </Col>
            
            <Col span={6}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
              </Col>
            </Row>


            <Row>
            <Col span={6}>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={6}>
              <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter phone number" },
                {
                  pattern: /^\d+$/,
                  message: "Phone number must contain only numbers"
                }
              ]}
            >
              <Input />
            </Form.Item>
              </Col>
            </Row>

            <Row>
            <Col span={6}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
              </Col>

              <Col span={6}>
              <Form.Item
              label="Google meet"
              name="google_meet"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
              </Col>
            </Row>

            <Row>
            <Col span={6}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Select>
                <Select.Option value="ACTIVE">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
              </Col>
              
              <Col span={6}>
              <Form.Item
              label="Service"
              name="service"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Please select"
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                {services.map((service) => (
                  <Select.Option
                    key={service.serviceId}
                    value={service.serviceId}
                  >
                    {service.serviceName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
              </Col>
            </Row>




            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
            
            
            
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter a description",
                },
              ]}
            >
              <ReactQuill
                theme="snow"
                value={description} 
                onChange={setDescription}
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <div className="form-group mt-3 text-center">
              <Image width={250} className="w-100 koi-profile-image rounded-3" src={(image ? URL.createObjectURL(image) : image)} alt="Koi" />
                <button className="custom-file-upload" type="button">
                  <ImgCrop rotationSlider>
                    <Upload
                      listType="picture" // Giữ nguyên để chỉ tải lên một bức ảnh
                      beforeUpload={(file) => {
                        handleUploadImage(file); // Gọi handleImageChange với tệp
                        return false; // Ngăn không cho gửi yêu cầu tải lên
                      }}
                      showUploadList={false} // Ẩn danh sách tải lên
                    >
                      <div className="custom-file-upload p-0"> <i className="fa-solid fa-upload"></i> Upload</div>
                    </Upload>
                  </ImgCrop>
                </button>
              </div>
            </Form.Item>
          </Form>
        </Modal>



        {/* CREATE STAFF MODAL */}
        <Modal open={visible2} onOk={handleOk2} onCancel={handleCloseModal2} width={1000}>
          <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit2} layout="vertical">
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username" // Changed from userName to username
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter phone number" },
                {
                  pattern: /^\d+$/,
                  message: "Phone number must contain only numbers"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default UserManagementPage;
