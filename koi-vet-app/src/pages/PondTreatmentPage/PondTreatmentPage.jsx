import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchPrescriptionByAppointmentIdAPI } from '../../apis';
import Pond from '../../components/Pond/Pond';
import PondDetail from '../PondDetail/PondDetail';


const PondTreatmentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [pondUpdateTrigger, setPondUpdateTrigger] = useState(0);
  const { appointmentId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get('customerId');
  console.log("customerId", customerId)
  const navigate = useNavigate();
  //open modal for when click add new pond BTN
  const handleAddNewPond = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //update trigger for pond list
  const handlePondUpdate = () => {
    setPondUpdateTrigger(prev => prev + 1);
  };
  useEffect(() => {
    const fetchPrescription = async () => {
      const response = await fetchPrescriptionByAppointmentIdAPI(appointmentId)
      setPrescriptions(response.data)
    }
    fetchPrescription()
  }, [appointmentId])

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Pond in this appointment</h3>
      {/* Existing Pond Table */}
     <Pond
        isVeterinarian={true}
        isBooking={false} // đây không phải là booking mà là appointment
        isAppointment={true} // đây là appointment
        appointmentId={appointmentId}
        title={"Pond in this appointment"}
        prescriptions={prescriptions}
        updateTrigger={pondUpdateTrigger} //trigger update pond list
        onUpdateTreatment={handlePondUpdate}
      />


      {/* Add New Pond Button */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => handleAddNewPond()}>
          Add New Pond
        </button>
      </div>

      {/* Modal for PondDetail */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PondDetail
          cusId={customerId}
          isCreate={true}
          isBooking={false}
          isVeterinarian={true}
          isAppointment={true}
          appointmentId={appointmentId}
          onClose={handleCloseModal}
          onUpdate={handlePondUpdate}
        />
      </Modal>
      <br />
      <section className="mb-5">
        <h2 className="h4 font-weight-bold mb-4">PRESCRIPTION</h2>
        <div className="overflow-auto">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Prescription ID </th>
                <th>Prescription Name </th>
                <th >Note</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Chạy vòng for ở đây */}
              {prescriptions.map(prescription => (
                <tr key={prescription.id}>
                  <td>{prescription.id}</td>
                  <td>{prescription.name}</td>
                  <td>{prescription.note}</td>
                  <td>
                    <button className="btn btn-primary">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary">
            Add Prescription
          </button>
        </div>
      </section>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default PondTreatmentPage;