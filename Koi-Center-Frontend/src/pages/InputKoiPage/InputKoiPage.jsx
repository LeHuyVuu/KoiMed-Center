import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookingData } from "../../../src/store/bookingSlice";
import "./InputKoiPage.css";
import { useNavigate } from "react-router-dom";
// Import the sample data
const sampleKoiData = [
  {
    koiId: 1,
    name: "Kohaku",
    type: "Kohaku",
    age: 3,
    length: 45,
    weight: 2.5,
    color: "White with red patterns",
    description: "A beautiful Kohaku with vibrant red markings",
  },
  {
    koiId: 2,
    name: "Taisho",
    type: "Sanke",
    age: 2,
    length: 35,
    weight: 1.8,
    color: "White with red and black patterns",
    description: "A young Sanke with promising color development",
  },
  {
    koiId: 3,
    name: "Showa",
    type: "Showa Sanshoku",
    age: 4,
    length: 50,
    weight: 3.2,
    color: "Black with red and white patterns",
    description: "An elegant Showa with balanced color distribution",
  },
  {
    koiId: 4,
    name: "Platinum",
    type: "Ogon",
    age: 1,
    length: 25,
    weight: 0.8,
    color: "Solid platinum",
    description: "A young Ogon with a lustrous platinum sheen",
  },
  {
    koiId: 5,
    name: "Butterfly",
    type: "Butterfly Koi",
    age: 5,
    length: 60,
    weight: 4.0,
    color: "Orange and white with long fins",
    description: "A majestic Butterfly Koi with flowing fins",
  },
  {
    koiId: 6,
    name: "Azure",
    type: "Asagi",
    age: 3,
    length: 40,
    weight: 2.2,
    color: "Blue scales with red highlights",
    description: "An Asagi with a striking blue netted pattern",
  },
  {
    koiId: 7,
    name: "Tancho",
    type: "Tancho Kohaku",
    age: 2,
    length: 30,
    weight: 1.5,
    color: "White with a red circle on head",
    description: "A Tancho Kohaku with a perfect circular red patch",
  },
];

const InputKoiPage = () => {
  const [existingKoi] = useState(sampleKoiData); // Use sample data
  const dispatch = useDispatch();
  const selectedKois = useSelector(
    (state) => state.booking.bookingData.selectedKoi
  );
  const navigate = useNavigate();

  const handleAddKoi = (koiId) => {
    if (!selectedKois.includes(koiId)) {
      const updatedselectedKois = [...selectedKois, koiId];
      dispatch(setBookingData({ selectedKoi: updatedselectedKois }));
    }
  };

  const handleRemoveKoi = (koiId) => {
    const updatedselectedKois = selectedKois.filter((id) => id !== koiId);
    dispatch(setBookingData({ selectedKoi: updatedselectedKois }));
  };

  const handleAddNewKoi = () => {
    // Implement logic to add a new Koi
    navigate("/admin/koidetail");
    console.log("Add new Koi clicked");
  };

  return (
    <div className="col-md-9">
      <h3 className="mb-4">Select Koi for Appointment</h3>

      <div className="card mb-4">
        <div className="card-header input-info-title">
          <h5 className="mb-0 title">Your Existing Koi</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {existingKoi.map((koi) => (
                  <tr key={koi.koiId}>
                    <td>{koi.name}</td>
                    <td>{koi.type}</td>
                    <td>{koi.age}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAddKoi(koi.koiId)}
                        disabled={selectedKois.includes(koi.koiId)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header input-info-title">
          <h5 className="mb-0 title">Selected Koi for Appointment</h5>
        </div>
        <div className="card-body">
          {selectedKois.length === 0 ? (
            <p>No Koi selected yet.</p>
          ) : (
            <ul className="list-group">
              {selectedKois.map((koiId) => {
                const koi = existingKoi.find((k) => k.koiId === koiId);
                return (
                  <li
                    key={koiId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {koi.name} - {koi.type}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveKoi(koiId)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Add New Koi Button */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleAddNewKoi}>
          Add New Koi
        </button>
      </div>
    </div>
  );
};

export default InputKoiPage;
