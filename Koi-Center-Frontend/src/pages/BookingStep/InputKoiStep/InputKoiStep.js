import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBookingData } from '../../../store/bookingSlice';
import './InputKoiStep.css'

import Koi from '../../../components/Koi/Koi';
import Modal from '../../../components/Modal/Modal';
import KoiDetail from '../../KoiDetail/KoiDetail';


const InputKoiStep = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [koiUpdateTrigger, setKoiUpdateTrigger] = useState(0);
  const dispatch = useDispatch();
  const selected = useSelector(state => state.booking.bookingData.selected);
  const customerId = useSelector(state => state.user?.customer?.customerId);
  const handleAddKoiToBooking = (koiId) => {
    if (selected.includes(koiId)) {
      // If already selected, remove it
      dispatch(setBookingData({ selected: selected.filter(id => id !== koiId) }));
    } else {
      // If not selected, add it
      dispatch(setBookingData({ selected: [...selected, koiId] }));
    }
  };

  

  //open modal for when click add new koi BTN
  const handleAddNewKoi = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //update trigger for koi list
  const handleKoiUpdate = () => {
    setKoiUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Select Koi for Appointment</h3>
      {/* Existing Koi Table */}
      <Koi
        isBooking={true}
        title={"Your Kois"}
        updateTrigger={koiUpdateTrigger}
        handleAddKoiToBooking={handleAddKoiToBooking}
        selectedKois={selected}
      />
      {/* Add New Koi Button */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleAddNewKoi}>
          Add New Koi
        </button>
      </div>

      {/* Modal for KoiDetail */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <KoiDetail
          isCreate={true}
          isBooking={true}
          customerId={customerId}
          onClose={handleCloseModal}
          onUpdate={handleKoiUpdate}
        />
      </Modal>
    </div>
  );
};

export default InputKoiStep;
