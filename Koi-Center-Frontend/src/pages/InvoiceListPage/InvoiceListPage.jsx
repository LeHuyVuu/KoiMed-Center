import React, {  } from "react";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
// import { useSelector } from "react-redux";
// import { ROLE } from "../../utils/constants";
// import { Link } from "react-router-dom";

function InvoiceListPage() {
  //   const role = useSelector((state) => state.user.role);
  return (
    <>
      <>
        <AdminHeader />

        <div className="row mb-3 justify-content-center">
          <div className="col-md-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <button className="btn btn-primary" type="button">
                Search <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm tableleft">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Date</th>
                <th>Quantity Koi-Pond</th>
                <th>Total price</th>
              </tr>
            </thead>
            <tbody>
              {/* {appointments.map((appointmentDetail, index) => ( */}
              {/* <tr key={index}> */}
              <tr>
                <td>1</td>
                <td>10/10/2024</td>
                <td>10</td>
                <td>3000000</td>
                {/* <td>
            {role === ROLE.CUSTOMER ?
              <Link
                to={`/appointment/${appointmentDetail.appointmentId}`}
                className="btn btn-sm btn-outline-dark"
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
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
          </td> */}
              </tr>
              {/* )}} */}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
}

export default InvoiceListPage;
