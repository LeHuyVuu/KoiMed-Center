import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookingData } from "../../../src/store/bookingSlice";
import "./InputPondPage.css";
import { useNavigate } from "react-router-dom";

// Sample pond data
const samplePondData = [
  {
    pondId: 1,
    name: "Main Koi Pond",
    depth: 1.5,
    perimeter: 20,
    temperature: 22,
    notes: "Filtered weekly, plants added last month",
    image: "https://example.com/pond1.jpg",
  },
  {
    pondId: 2,
    name: "Japanese Garden Pond",
    depth: 1.2,
    perimeter: 15,
    temperature: 21,
    notes: "New filtration system installed",
    image: "https://example.com/pond2.jpg",
  },
  {
    pondId: 3,
    name: "Quarantine Pond",
    depth: 0.8,
    perimeter: 8,
    temperature: 23,
    notes: "Used for new koi arrivals",
    image: "https://example.com/pond3.jpg",
  },
];

const InputPondPage = () => {
  const [existingPonds] = useState(samplePondData);
  const dispatch = useDispatch();
  const selectedPondIds = useSelector(
    (state) => state.booking.bookingData.selectedPondIds || []
  );
  const navigate = useNavigate();

  const handleSelectPond = (pondId) => {
    let updatedSelectedPondIds;
    if (selectedPondIds.includes(pondId)) {
      updatedSelectedPondIds = selectedPondIds.filter((id) => id !== pondId);
    } else {
      updatedSelectedPondIds = [...selectedPondIds, pondId];
    }
    dispatch(setBookingData({ selectedPondIds: updatedSelectedPondIds }));
  };

  const handleAddNewPond = () => {
    // Implement logic to add a new pond
    navigate("/admin/ponddetail");
    console.log("Add new pond clicked");
  };

  return (
    <div className="col-9">
      <h3 className="mb-4">Select Ponds for Appointment</h3>

      {/* Existing Ponds Table */}
      <div className="card mb-4">
        <div className="card-header input-info-title text-white">
          <h5 className="mb-0">Your Existing Ponds</h5>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Depth (m)</th>
                <th>Perimeter (m)</th>
                <th>Temperature (°C)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {existingPonds.map((pond) => (
                <tr key={pond.pondId}>
                  <td>{pond.name}</td>
                  <td>{pond.depth}</td>
                  <td>{pond.perimeter}</td>
                  <td>{pond.temperature}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        selectedPondIds.includes(pond.pondId)
                          ? "btn-success"
                          : "btn-primary"
                      }`}
                      onClick={() => handleSelectPond(pond.pondId)}
                    >
                      {selectedPondIds.includes(pond.pondId)
                        ? "Selected"
                        : "Select"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Ponds Details */}
      {selectedPondIds.length > 0 && (
        <div className="card mb-4">
          <div className="card-header input-info-title text-white">
            <h5 className="mb-0">Selected Pond Details</h5>
          </div>
          <div className="card-body">
            {selectedPondIds.map((pondId) => {
              const selectedPond = existingPonds.find(
                (p) => p.pondId === pondId
              );
              return (
                <div key={pondId} className="mb-4 pb-3 border-bottom">
                  <h4>{selectedPond.name}</h4>
                  <p>
                    <strong>Depth:</strong> {selectedPond.depth} m
                  </p>
                  <p>
                    <strong>Perimeter:</strong> {selectedPond.perimeter} m
                  </p>
                  <p>
                    <strong>Temperature:</strong> {selectedPond.temperature} °C
                  </p>
                  <p>
                    <strong>Notes:</strong> {selectedPond.notes}
                  </p>
                  <img
                    src={selectedPond.image}
                    alt={selectedPond.name}
                    className="img-fluid mt-3"
                    style={{ maxWidth: "300px" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add New Pond Button */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleAddNewPond}>
          Add New Pond
        </button>
      </div>
    </div>
  );
};

export default InputPondPage;
