import React, { useEffect, useState } from "react";
import "./VeterinarianPage.css";
import { fetchVetsAPI } from "../../apis";
import Veterinarian from "../../components/Veterinarian/Veterinarian";
import BannerTop from "../../components/BannerTop/BannerTop";
import PreLoader from "../../components/Preloader/Preloader";

function VeterinarianPage() {
  const [veterinarians, setVeterinarians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchVeterinarians = async () => {
      try {
        const response = await fetchVetsAPI();
        console.log({ response });
        setVeterinarians(response?.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    fetchVeterinarians();
  }, [])

  return (
    <>
      <BannerTop title="Our Veterinarians" subTitle="Home / Veterinarians" />

      <div className="container text-center my-5">
        <div className="container mt-5">
          <div className="text-center mb-5">
          </div>
          {isLoading ? <PreLoader /> : null}
          <div className="row">
            {
              veterinarians?.map((vet) => {
                console.log({ vet });
                return <Veterinarian image={vet.imageVeterinarian} vetId={vet.vetId} name={vet?.user?.fullName} isBooking={false} services={vet?.serviceNames} />
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default VeterinarianPage;
