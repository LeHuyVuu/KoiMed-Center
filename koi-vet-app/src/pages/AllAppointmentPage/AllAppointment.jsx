import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllAppointment.css";
import {
  fetchAllAppointmentAPI,
  fetchAllAppointmentByVetIdAPI,
  fetchAppointmentByCustomerIdAPI,
} from "../../apis";
import { ROLE, APPOINTMENT_STATUS, ROW_PER_PAGE } from "../../utils/constants";
import { useSelector } from "react-redux";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import Loading from "../../components/Loading/Loading";
import { Pagination, PaginationItem, Typography } from "@mui/material";

function AllAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [pageSize, setPageSize] = useState(10);
  const customerId = useSelector((state) => state?.user?.customer?.customerId);
  const [title, setTitle] = useState("All Appointments");
  const vetId = useSelector((state) => state?.user?.veterinarian?.vetId);
  const role = useSelector((state) => state.user.role);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const fetchAppointmentForVet = async (vetId, status) => {
      const response = await fetchAllAppointmentByVetIdAPI(vetId, status);
      setAppointments(response?.data);
      setIsLoading(false);
      console.log(response?.data)
    };

    const fetchAppointmentForStaff = async () => {
      const response = await fetchAllAppointmentAPI(status, page-1, pageSize);
      setAppointments(response?.data);
      setIsLoading(false);
    };

    const fetchAppointmentForCustomer = async (customerId) => {
      const response = await fetchAppointmentByCustomerIdAPI(customerId, status);
      setAppointments(response?.data);
      setIsLoading(false);
      setTitle("My Appointments");
    };
    if (role === ROLE.VETERINARIAN) {
      fetchAppointmentForVet(vetId, status);
      setTitle("All My Appointments");
    } else if (role === ROLE.STAFF) {
      fetchAppointmentForStaff();
      setTitle("All Veterinarian Appointments");
    } else if (role === ROLE.CUSTOMER) {
      fetchAppointmentForCustomer(customerId, status);
      setTitle("My Appointments");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, customerId, status, pageSize,page]);

  const handleChangeStatus = (status) => {
    setStatus(status);
    setAppointments([]);
    console.log("status", status)
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };
  return (
    <>

      <AdminHeader title={title} />

      <div className="row mb-3 justify-content-center">
        <div className="col-md-8">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" />
            <button className="btn btn-primary" type="button">
              Search <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <nav className="w-100">
          <div className="nav nav-tabs " id="nav-tab" role="tablist">
            <button className="nav-link active custom-text-color" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => handleChangeStatus("ALL")}>
              <i className="fas fa-list-ul me-2"></i>All
            </button>
            <button className="nav-link custom-text-color" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.CREATED)}>
              <i className="fa-solid fa-hourglass-start "></i> Waiting Confirm
            </button>
            <button className="nav-link custom-text-color" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.BOOKING_COMPLETE)}>
              <i className="fas fa-user-md me-2"></i>Veterinarian Assigned
            </button>
            <button className="nav-link custom-text-color" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.PROCESS)}>
              <i className="fas fa-spinner me-2"></i>Process
            </button>
            <button className="nav-link custom-text-color" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.READY_FOR_PAYMENT)}>
              <i className="fas fa-dollar-sign me-2 text-warning"></i>Ready For Payment
            </button>
            <button className="nav-link custom-text-color" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.FINISH)}>
              <i className="fas fa-flag-checkered me-2 text-success"></i>Completed
            </button>
            <button className="nav-link custom-text-color" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.CANCEL)}>
              <i className="fas fa-ban me-2 text-danger"></i>Cancel
            </button>
          </div>
        </nav>


      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm tableleft">
          <thead>
            <tr>
              <th>Code</th> <th>Customer</th> <th>Service</th><th>Create Date</th> <th>Type</th> <th>Time</th><th>Date</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>



            {isLoading ?

              <td colSpan="7" className="text-center">
                <Loading />
              </td>

              :
              appointments.length === 0 ?
                <tr>
                  <td colSpan="9" className="text-center">No appointments found</td>
                </tr>
                :
                appointments.map((appointmentDetail, index) => (
                  <tr key={index}>
                    <td>{appointmentDetail.code}</td>
                    <td>{appointmentDetail.customerName}</td>
                    <td>{appointmentDetail.serviceName}</td>
                    <td>{new Date(appointmentDetail.createdAt).toLocaleString()}</td>
                    <td>{appointmentDetail.type}</td>
                    <td>{formatTime(appointmentDetail.startTime)}</td>
                    <td>{formatDate(appointmentDetail.appointmentDate)}</td>
                    <td>
                      {(() => {
                        switch (appointmentDetail.status) {
                          case APPOINTMENT_STATUS.CREATED:
                            return <button className="btn btn-sm btn-warning"> <i className="fa-solid fa-hourglass-start me-2"></i>Waiting Confirm</button>;
                          case APPOINTMENT_STATUS.BOOKING_COMPLETE:
                            return <button className="btn btn-sm btn-info "> <i className="fas fa-user-md me-2"></i>Veterinarian Assigned</button>;
                          case APPOINTMENT_STATUS.PROCESS:
                            return <button className="btn btn-sm btn-primary"> <i className="fas fa-spinner me-2"></i>Process</button>;
                          case APPOINTMENT_STATUS.READY_FOR_PAYMENT:
                            return <button className="btn btn-sm btn-warning"> <i className="fas fa-dollar-sign me-2"></i>Ready For Payment</button>;
                          case APPOINTMENT_STATUS.FINISH:
                            return <button className="btn btn-sm btn-success"> <i className="fas fa-flag-checkered me-2"></i>Completed</button>;
                          case APPOINTMENT_STATUS.CANCEL:
                            return <button className="btn btn-sm btn-danger"> <i className="fas fa-ban me-2"></i>Cancel</button>;
                          default:
                            return <button className="btn btn-sm btn-secondary">Unknown Status</button>;
                        }
                      })()}
                    </td>
                    <td>
                      {role === ROLE.CUSTOMER ?
                        <Link
                          to={`/profile/appointment/${appointmentDetail.appointmentId}`}
                          className="btn btn-sm btn-outline-dark"
                        >
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </Link>
                        :
                        <Link
                          to={`/admin/appointment/${appointmentDetail.appointmentId}`}
                          className="btn btn-sm btn-outline-dark"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                      }
                      {role === ROLE.STAFF && (
                        <button className="btn btn-sm btn-outline-dark">
                          <i className="fas fa-user-md"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
            }


          </tbody>
        </table>
        <div className="d-flex justify-content-center mt-3">
        <Pagination count={10} page={page} onChange={handleChangePage} />
        </div>

      </div>
    </>

  );
}

export default AllAppointment;
