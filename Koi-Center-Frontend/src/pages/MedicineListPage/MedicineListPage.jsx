import {
  Form,
  Input,
  message,
  Popconfirm,
  Table,
  AutoComplete,
//  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  fetchMedicinesAPI,
//  createMedicineAPI,
  updateMedicineByIdAPI,
  deleteMedicineByIdAPI,
  createPrescriptionAPI,
} from "../../apis";
import "./MedicineListPage.css";

function MedicineListPage({ appointmentId, onPrescriptionCreated }) {
  console.log(appointmentId);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    medicineId: "",
    name: "",
    description: "",
    dosage: "",
    quantity: "",
    medUnit: "",
  });
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    name: "",
    note: "",
  });
  const [editingMedicines, setEditingMedicines] = useState({});
  const [isEditing, setIsEditing] = useState({}); // Trạng thái cho từng thuốc
  // const [isCreating, setIsCreating] = useState(false); // Trạng thái mở/đóng form tạo thuốc
  // const [newMedicineData, setNewMedicineData] = useState({
  //   name: "",
  //   description: "",
  //   medUnit: "",
  // });

  // // Mở form tạo thuốc
  // const handleOpenCreateMedicineForm = () => {
  //   setIsCreating(true);
  // };

  // // Đóng form tạo thuốc và reset dữ liệu
  // const handleCloseCreateMedicineForm = () => {
  //   setIsCreating(false);
  //   setNewMedicineData({ name: "", description: "", medUnit: "" });
  // };

  // // Xử lý thay đổi dữ liệu trong form
  // const handleNewMedicineInputChange = (field, value) => {
  //   setNewMedicineData((prev) => ({ ...prev, [field]: value }));
  // };

  // // Gọi API để tạo thuốc mới
  // const handleCreateMedicine = async () => {  
  //   const { name, description, medUnit } = newMedicineData;

  //   if (!name || !description || !medUnit) {
  //     message.error("Please fill in all fields.");
  //     return;
  //   }

  //   try {
  //     await createMedicineAPI(newMedicineData); // Gọi API để tạo thuốc
  //     message.success("Medicine created successfully.");

  //     // Cập nhật lại danh sách thuốc
  //     const updatedMedicines = await fetchMedicinesAPI();
  //     setAvailableMedicines(updatedMedicines.data || []);

  //     handleCloseCreateMedicineForm(); // Đóng form sau khi tạo thành công
  //   } catch (error) {
  //     message.error("Failed to create medicine.");
  //   }
  // };

  useEffect(() => {
    // Fetch all medicines for search suggestion
    const fetchAllMedicines = async () => {
      const response = await fetchMedicinesAPI();
      setAvailableMedicines(response.data || []);
      console.log(response.data);
    };
    fetchAllMedicines();
  }, []);

  // Add new medicine row with empty fields
  const handleAddNewMedicine = () => {
    setIsAdding(true);
    setNewMedicine({
      medicineId: "",
      name: "",
      description: "",
      dosage: "",
      quantity: "",
      medUnit: "",
    });
  };

  // Handle searching for medicines by name
  const handleSearchMedicine = (value) => {
    setSearchTerm(value);
    // Filter available medicines based on search term
    const filteredMedicines = availableMedicines.filter(
      (medicine) =>
        medicine.name && // Ensure name is not null or undefined
        medicine.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMedicines(filteredMedicines); // Set the filtered list for suggestions
  };

  // Handle selecting a medicine from the suggestions
  const handleSelectMedicine = (value) => {
    const selectedMedicine = availableMedicines.find(
      (medicine) => medicine.medicineId === value
    );
    setNewMedicine((prev) => ({
      ...prev,
      medicineId: selectedMedicine.medicineId, // Keep medicineId for later usage
      name: selectedMedicine.name, // Display name in the input field
      description: selectedMedicine.description,
      medUnit: selectedMedicine.medUnit,
    }));
  };

  // Handle dosage and quantity input changes
  const handleInputChange = (field, value) => {
    setNewMedicine((prev) => ({ ...prev, [field]: value }));
  };

  // Add the selected medicine to the list of medicines
  const handleDone = () => {
    if (newMedicine.medicineId && newMedicine.dosage && newMedicine.quantity) {
      setSelectedMedicines([...selectedMedicines, { ...newMedicine }]);
      setIsAdding(false);
      setNewMedicine({
        medicineId: "",
        name: "",
        description: "",
        dosage: "",
        quantity: "",
        medUnit: "",
      });
    } else {
      message.error("Please fill in all fields.");
    }
  };

  // Hàm bắt đầu chỉnh sửa
  const handleEdit = (record) => {
    setEditingMedicines((prev) => ({
      ...prev,
      [record.medicineId]: { ...record },
    }));
    setIsEditing((prev) => ({
      ...prev,
      [record.medicineId]: true, // Bật chế độ chỉnh sửa
    }));
  };

  const handleSave = async (medicineId) => {
    const originalMedicine = selectedMedicines.find(
      (medicine) => medicine.medicineId === medicineId
    );

    const updatedMedicine = {
      ...originalMedicine, // Giữ lại các thông tin cũ nếu không chỉnh sửa
      ...editingMedicines[medicineId], // Ghi đè các trường đã chỉnh sửa (dosage, quantity)
    };

    try {
      await updateMedicineByIdAPI(medicineId, updatedMedicine);
      message.success("Medicine updated successfully.");

      // Cập nhật danh sách thuốc đã chọn sau khi lưu thành công
      setSelectedMedicines((prev) =>
        prev.map((medicine) =>
          medicine.medicineId === medicineId ? updatedMedicine : medicine
        )
      );

      // Tắt chế độ chỉnh sửa
      setIsEditing((prev) => ({
        ...prev,
        [medicineId]: false,
      }));
    } catch (error) {
      message.error("Failed to update medicine.");
    }
  };

  // Xử lý khi người dùng nhấn nút Delete
  const handleDeleteMedicine = async (medicineId) => {
    try {
      await deleteMedicineByIdAPI(medicineId); // Gọi API để xóa thuốc
      message.success("Medicine deleted successfully.");

      // Cập nhật lại danh sách thuốc đã chọn sau khi xóa
      setSelectedMedicines((prev) =>
        prev.filter((medicine) => medicine.medicineId !== medicineId)
      );
    } catch (error) {
      message.error("Failed to delete medicine.");
    }
  };

  // Create prescription
  const handleCreatePrescription = async () => {
    if (selectedMedicines.length === 0 || !prescriptionDetails.name) {
      message.error("Please complete the prescription form.");
      return;
    }

    const prescriptionData = {
      name: prescriptionDetails.name,
      note: prescriptionDetails.note,
      appointmentId: appointmentId,
      createdDate: new Date(),
      prescriptionMedicines: selectedMedicines.map((medicine) => ({
        medicineId: medicine.medicineId,
        name: medicine.name,
        description: medicine.description,
        dosage: medicine.dosage,
        quantity: medicine.quantity,
        medUnit: medicine.medUnit,
      })),
    };

    try {
      await createPrescriptionAPI(prescriptionData);
      message.success("Prescription created successfully.");
      // Reset state after creation
      setSelectedMedicines([]);
      setPrescriptionDetails({ name: "", note: "" });
      onPrescriptionCreated();
    } catch (error) {
      message.error("Failed to create prescription.");
    }
  };

  const handleSelectedMedicineChange = (medicineId, field, value) => {
    setEditingMedicines((prev) => ({
      ...prev,
      [medicineId]: {
        ...prev[medicineId],
        [field]: value,
      },
    }));
  };

  // Columns for the medicine table
  const columns = [
    {
      title: "Medicine ID",
      dataIndex: "medicineId",
      key: "medicineId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      render: (_, record) => (
        <Input
          value={
            editingMedicines[record.medicineId]?.dosage ?? record.dosage // Dùng "??" để tránh lỗi ghi đè không cần thiết
          }
          onChange={(e) =>
            handleSelectedMedicineChange(
              record.medicineId,
              "dosage",
              e.target.value
            )
          }
          disabled={!isEditing[record.medicineId]} // Chỉ cho phép chỉnh sửa nếu đang ở chế độ chỉnh sửa
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <Input
          value={
            editingMedicines[record.medicineId]?.quantity ?? record.quantity // Dùng "??" để lấy giá trị hợp lệ hoặc giữ nguyên giá trị gốc
          }
          onChange={(e) =>
            handleSelectedMedicineChange(
              record.medicineId,
              "quantity",
              e.target.value
            )
          }
          disabled={!isEditing[record.medicineId]} // Chỉ cho phép chỉnh sửa nếu đang ở chế độ chỉnh sửa
        />
      ),
    },
    {
      title: "Unit",
      dataIndex: "medUnit",
      key: "medUnit",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {isEditing[record.medicineId] ? (
            <Button onClick={() => handleSave(record.medicineId)}>Save</Button>
          ) : (
            <Button onClick={() => handleEdit(record)}>Edit</Button>
          )}
          {/* Nút Delete với xác nhận xóa */}
          <Popconfirm
            title="Are you sure you want to delete this medicine?"
            onConfirm={() => handleDeleteMedicine(record.medicineId)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <h2 className="text-center mb-4">Prescription Form</h2>
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Form>
            <Form.Item label="Prescription Name" required>
              <Input
                value={prescriptionDetails.name}
                onChange={(e) =>
                  setPrescriptionDetails({
                    ...prescriptionDetails,
                    name: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Note">
              <Input
                value={prescriptionDetails.note}
                onChange={(e) =>
                  setPrescriptionDetails({
                    ...prescriptionDetails,
                    note: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      

      

      {/* Medicines table */}
      <Table
        columns={columns}
        dataSource={selectedMedicines}
        rowKey="medicineId"
        pagination={false}
      />

      {/* Create prescription button */}
      <Button
        onClick={handleCreatePrescription}
        disabled={selectedMedicines.length === 0}
        className="mt-4"
      >
        Create Prescription
      </Button>
      {/* {isCreating ? (
        <Row className="mt-4">
          <Col md={12}>
            <Form>
              <Form.Item label="Medicine Name" required>
                <Input
                  placeholder="Enter medicine name"
                  value={newMedicineData.name}
                  onChange={(e) =>
                    handleNewMedicineInputChange("name", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Description" required>
                <Input
                  placeholder="Enter description"
                  value={newMedicineData.description}
                  onChange={(e) =>
                    handleNewMedicineInputChange("description", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Unit" required>
                <Select
                  placeholder="Select unit"
                  value={newMedicineData.medUnit}
                  onChange={(value) =>
                    handleNewMedicineInputChange("medUnit", value)
                  }
                  style={{ width: "100%" }}
                >
                  <Select.Option value="PACKAGE">PACKAGE</Select.Option>
                  <Select.Option value="PILL">PILL</Select.Option>
                  <Select.Option value="BOTTLE">BOTTLE</Select.Option>
                </Select>
              </Form.Item>

              <div style={{ display: "flex", gap: "8px" }}>
                <Button onClick={handleCreateMedicine} type="primary">
                  Create Medicine
                </Button>
                <Button onClick={handleCloseCreateMedicineForm}>Cancel</Button>
              </div>
            </Form>
          </Col>
        </Row>
      ) : (
        <Button onClick={handleOpenCreateMedicineForm} className="mt-4">
          Create Medicine
        </Button>
      )} */}

      {/* Add new medicine button */}
      <Button onClick={handleAddNewMedicine} disabled={isAdding} style={{margin: '24px 10px 0 0', float: 'right'}}>
        + Medicine
      </Button>

      {/* If adding a new medicine */}
      {isAdding && (
        <Row className="mt-4">
          <Col md={12}>
            <AutoComplete
              options={filteredMedicines.map((med) => ({
                value: med.medicineId, // Use medicineId as the value to select (this is for internal tracking)
                label: med.name, // Display medicine name in the dropdown
              }))}
              onSearch={handleSearchMedicine}
              onSelect={handleSelectMedicine}
              placeholder="Search and select medicine"
              value={newMedicine.name} // Set the selected name as the value to display in the input
              onChange={(value) => {
                // Cập nhật trạng thái khi người dùng nhập hoặc xóa
                setNewMedicine((prev) => ({ ...prev, name: value }));
              }}
              allowClear // Thêm thuộc tính để cho phép xóa nhanh bằng nút xóa
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <Form>
              <Form.Item label="Dosage" required>
                <Input
                  placeholder="Dosage"
                  value={newMedicine.dosage}
                  onChange={(e) => handleInputChange("dosage", e.target.value)}
                  style={{ marginBottom: "16px" }}
                />
              </Form.Item>
              <Form.Item label="Quantity" required>
                <Input
                  placeholder="Quantity"
                  value={newMedicine.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                />
              </Form.Item>
            </Form>

            <Button onClick={handleDone}>Done</Button>
          </Col>
        </Row>
      )}

      
    </Container>
  );
}

export default MedicineListPage;
