import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tempt_img from '../../assets/img/veterinarian.png'
import { useDispatch } from 'react-redux'
import { nextStep, setBookingData } from '../../store/bookingSlice'
const Veterinarian = ({ image, vetId, name, isBooking ,services}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [serviceNames, setServiceNames] = useState([])
  const handleChooseVeterinarian = () => {
    dispatch(setBookingData({ vetId: vetId }))
    dispatch(nextStep())
  }
  useEffect(() => {
    let serviceNames = []
    for (let i = 0; i < 2; i++) {
      if (services[i]) {
        serviceNames.push(services[i])
      }
    }
    setServiceNames(serviceNames)
  }, [services])
  const handleViewProfileVet = () => {
    navigate(`/vetprofile/${vetId}`)
  }


  return (
    <>

      {/* <!-- Doctor Card 1 --> */}
      <div className="col-md-4 mb-4">
        <div className="doctor-card">
          <img src={image || tempt_img} alt="Doctor 1" />
          <div className="p-3 d-flex flex-column justify-content-between description-container">
            <h5>{name}</h5>
            <p>{serviceNames?.join(" & ")},...</p>
            <div className="icon-group">
              <i className="fas fa-user"></i>
              <i className="fas fa-phone"></i>
              <i className="fas fa-envelope"></i>
            </div>
            <div className="d-flex justify-content-center gap-2" >
              <button className="btn-view-profile mt-3 mr-2" onClick={() => handleViewProfileVet()}>
                View Profile
              </button>

              {isBooking ? <button onClick={() => handleChooseVeterinarian()} className="btn-view-profile  mt-3">
                Choose
              </button>

                : null}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Veterinarian