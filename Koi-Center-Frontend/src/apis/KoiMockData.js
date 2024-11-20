const sampleKoiData = [
    {
        koiId: "05b619fa-9931-482f-b9d3-6c44802d09ae",
        name: "Kohaku",
        breed: "Kohaku",
        age: 3,
        height: 45,
        weight: 2.5,
        color: "White with red patterns",
        description: "A beautiful Kohaku with vibrant red markings",
        appointmentId: "APT12345"
    },
    {
        koiId: "0b5f88dc-aad7-4a7c-aa6c-67cc6d8c3278",
        name: "Taisho",
        breed: "Sanke",
        age: 2,
        height: 35,
        weight: 1.8,
        color: "White with red and black patterns",
        description: "A young Sanke with promising color development",
        appointmentId: "APT12345"
    },
    {
        koiId: "0e6e420e-bfae-47d4-8c17-354fa5536ef4",
        name: "Showa",
        breed: "Showa Sanshoku",
        age: 4,
        height: 50,
        weight: 3.2,
        color: "Black with red and white patterns",
        description: "An elegant Showa with balanced color distribution",
        appointmentId: "APT003"
    },
    {
        koiId: "1ed5a15c-e368-48f9-9086-598871688738",
        name: "Platinum",
        breed: "Ogon",
        age: 1,
        height: 25,
        weight: 0.8,
        color: "Solid platinum",
        description: "A young Ogon with a lustrous platinum sheen",
        appointmentId: "APT12345"
    },
    {
        koiId: "1ee946de-51ed-4c28-84fb-ab55ca04737f",
        name: "Butterfly",
        breed: "Butterfly Koi",
        age: 5,
        height: 60,
        weight: 4.0,
        color: "Orange and white with long fins",
        description: "A majestic Butterfly Koi with flowing fins",
        appointmentId: "APT002"
    },
    {
        koiId: "23e68796-102c-49c9-911b-7ebb12cf12e1",
        name: "Azure",
        breed: "Asagi",
        age: 3,
        length: 40,
        weight: 2.2,
        color: "Blue scales with red highlights",
        description: "An Asagi with a striking blue netted pattern",
        appointmentId: "APT003"
    },
    {
        koiId: "7f8d6e5a-9c4b-3a2d-1e0f-8b7a6c5d4e3f",
        name: "Tancho",
        breed: "Tancho Kohaku",
        age: 2,
        length: 30,
        weight: 1.5,
        color: "White with a red circle on head",
        description: "A Tancho Kohaku with a perfect circular red patch",
        appointmentId: "APT001"
    }
];

export const fetchKoiByCustomerIdAPI = (customerId) => {
 
      return Promise.resolve({ data: sampleKoiData });
    }

export const fetchKoisByAppointmentIdAPI = (appointmentId) => {
    const filteredKoi = sampleKoiData.filter(koi => koi.appointmentId === appointmentId);
    return Promise.resolve({ data: filteredKoi });
}
export const fetchKoiByKoiIdAPI = (koiId) => {
    const foundKoi = sampleKoiData.find(koi => koi.koiId === koiId);
    console.log(foundKoi);
    return Promise.resolve({ data: foundKoi });
 }
