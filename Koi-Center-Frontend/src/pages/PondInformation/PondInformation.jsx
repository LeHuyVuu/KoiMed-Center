import React from "react";
import "./PondInformation.css";

function PondInformation() {
  return (
    <div className="pond-info-container container">
      <div className="pond-info-form">
        <h1 className="pond-info-title text-center mb-4">
          Enter Pond Information
        </h1>
        <form>
          <div className="mb-3">
            <h3 className="pond-info-subtitle pond-info-text-left">
              Pond Quantity
            </h3>
            <input
              type="number"
              className="pond-info-input form-control"
              placeholder="Enter number of ponds"
              required
            />
          </div>
          <div className="mb-3">
            <h3 className="pond-info-subtitle pond-info-text-left">
              Tank Quantity
            </h3>
            <input
              type="number"
              className="pond-info-input form-control"
              placeholder="Enter number of tanks"
              required
            />
          </div>
          <div className="mb-3">
            <h3 className="pond-info-subtitle pond-info-text-left">
              Home Address
            </h3>
            <input
              type="text"
              className="pond-info-input form-control"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="mb-3">
            <h3 className="pond-info-subtitle pond-info-text-left">
              Koi Health Status
            </h3>
            <textarea
              className="pond-info-textarea form-control"
              rows="4"
              placeholder="Describe the health status of your koi"
            ></textarea>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="pond-info-button btn btn-secondary"
            >
              Previous
            </button>
            <button
              type="submit"
              className="pond-info-button btn btn-secondary"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PondInformation;
