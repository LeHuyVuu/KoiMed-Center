import React, { useState } from "react";
import "./KoiInformation.css";

const fishSpecies = [
  "Kohaku",
  "Hikari Muji",
  "Showa Sanshoku",
  "Shiro Utsuri",
  "Hi Utsuri",
  "Ki Utsuri",
  "Asagi",
  "Shusui",
  "Tancho",
  "Goshiki",
  "Kumonryu",
  "Ochiba Shigure",
  "Doitsu",
  "Koromo",
  "Other",
];

function KoiInformation() {
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [otherSpecies, setOtherSpecies] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [healthStatus, setHealthStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedSpecies,
      otherSpecies,
      height,
      weight,
      healthStatus,
    });
  };

  return (
    <>
      <div className="container">
        <h1>Enter the Koi's Information</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Fish species:</label>
            <div className="species-grid">
              {fishSpecies.map((species) => (
                <button
                  key={species}
                  type="button"
                  onClick={() => setSelectedSpecies(species)}
                  className={`species-button ${
                    selectedSpecies === species ? "selected" : ""
                  }`}
                >
                  {species}
                </button>
              ))}
            </div>
            {selectedSpecies === "Other" && (
              <input
                type="text"
                value={otherSpecies}
                onChange={(e) => setOtherSpecies(e.target.value)}
                placeholder="Enter other species"
              />
            )}
          </div>

          <div className="form-group">
            <label>Height</label>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
            />
          </div>

          <div className="form-group">
            <label>Weight</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
            />
          </div>

          <div className="form-group">
            <label>Koi health status</label>
            <textarea
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              rows={4}
              placeholder="Describe the koi's health status"
            />
          </div>

          <div className="button-group">
            <button type="button" className="prev-button">
              ← Previous Step
            </button>
            <button type="submit" className="create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default KoiInformation;
