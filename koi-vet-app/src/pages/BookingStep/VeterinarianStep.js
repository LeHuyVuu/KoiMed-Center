import React, { useEffect, useState } from 'react'
import Veterinarian from '../../components/Veterinarian/Veterinarian';
import { fetchVetsAPI } from '../../apis';

const VeterinarianStep = () => {
    const [veterinarians, setVeterinarians] =useState([]);
  
  useEffect(()=>{
    const fetchVeterinarians =  async () =>{
      const response = await fetchVetsAPI(); // thay bằng fetchVetByVetByServiceIdAPI
      console.log({response});
      setVeterinarians(response?.data);
    }
    fetchVeterinarians();
  },[])

  return (
    console.log({veterinarians}),
    <div className="container text-center my-5">
      <div className="container mt-5">
        <div className="text-center mb-5">
          <img src="process-image.png" alt="Process Step" />
          <h3>Choose Doctor</h3>
        </div>

        <div className="row">
          {/* <!-- Doctor Card 1 --> */}
          {
           veterinarians?.map((vet) => {
            console.log({vet});
            return <Veterinarian image={vet.image} vetId={vet.vetId} name={vet?.user?.full_name} isBooking={true} />
           })
          }
        </div>
    
      </div>
    </div>
  );
}

export default VeterinarianStep