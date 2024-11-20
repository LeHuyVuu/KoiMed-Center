import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import { createServiceAPI, deleteServiceAPI, fecthAllServicesAPI, updateServiceAPI } from '../../apis';
import ServiceForm from '../../components/ServiceForm/ServiceForm';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import PreLoader from '../../components/Preloader/Preloader';

const ServiceManagementPage = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state cho ô tìm kiếm
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fetchServices = async () => {
    const response = await fecthAllServicesAPI();
    setServices(response.data);
    setIsLoading(false);
  }
  const handleOkEdit = async () => {
    console.log(selectedService)
    const res = await updateServiceAPI(selectedService?.serviceId, selectedService, selectedImage);
    if (res.status === 200) {
      fetchServices()
      setSelectedService(null)
      setSelectedImage(null)
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
    setShowUpdateModal(false);
  }
  const handleEdit = (service) => {
    setSelectedService(service);
    setShowUpdateModal(true);
  }
  const handleAdd = async () => {
    await setSelectedService(null);
    setShowAddModal(true);
  }
  const handleCancelEdit = () => {
    setShowUpdateModal(false);
  }
  const handleCancelAdd = () => {
    setShowAddModal(false);
  }
  const handleDelete = async (serviceId, serviceName) => {
    Modal.confirm({
      title: `Are you sure you want to delete this service: ${serviceName}?`,
      onOk: async () => {
        const res = await deleteServiceAPI(serviceId);
        if (res.status === 200) {
          fetchServices()
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      },
      onCancel: () => {
        toast.info('Canceled')
      }
    })
  }
  const handleOkAdd = async () => {
    const res = await createServiceAPI(selectedService, selectedImage);
    if (res.status === 200) {
      fetchServices()
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }
  useEffect(() => {
    fetchServices();
  }, []);

  if (isLoading) return <PreLoader />
  return (
    <div>
      <AdminHeader title="Service Management" />
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
              className="form-control mb-3" // Thêm class cho ô input
            />
          </div>
          <div className='col-md-12'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Base Price</th>
                  <th>Koi Price</th>
                  <th>Pond Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  services
                    .filter(service => service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())) // Lọc dịch vụ theo giá trị tìm kiếm
                    .map((service) => (
                      <tr key={service?.serviceId}>
                        <td><strong>{service?.serviceName}</strong></td>
                        <td>{service?.serviceFor}</td>
                        <td>{service?.basePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        <td>{service?.serviceFor === 'FISH' ? service?.koiPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</td>
                        <td>{service?.serviceFor === 'POND' ? service?.pondPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</td>
                        <td className='d-flex gap-2'>
                          <button className='btn btn-primary' onClick={() => handleEdit(service)}>Edit</button>
                          <button className='btn btn-danger' onClick={() => handleDelete(service?.serviceId, service?.serviceName)}>Delete</button>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
              <button className='btn btn-primary mt-3' onClick={handleAdd}>Create Service</button>
            </table>
            <Modal 
              open={showUpdateModal} 
              onCancel={handleCancelEdit} 
              onOk={handleOkEdit}
              title="Edit Service" 
              width={1000} // Adjust the width as needed
            >
              <ServiceForm selectedService={selectedService} setSelectedService={setSelectedService} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
            </Modal>
            <Modal
              open={showAddModal}
              onCancel={handleCancelAdd}
              onOk={handleOkAdd}
              title="Add Service"
              width={1000} // Adjust the width as needed
            >
              <ServiceForm selectedService={selectedService} setSelectedService={setSelectedService} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceManagementPage
