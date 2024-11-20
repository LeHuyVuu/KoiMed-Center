

export const ListPrescription = [
    {
        id: '02ff0f95-2fd5-4634-918d-6bd383a3c8fa',
        created_date: "2024-02-14",
        name: "acv",
        createdDate: new Date(),
        description: "a",
        note: "Note for prescription 1",
        appointmentId: "0a22a770-04b6-4507-be6f-74890a812386"
    },
    {
        id: 2,
        created_date: "2024-02-14",
        name: "Prescription 2",
        createdDate: new Date(),
        description: "Note for prescription 2",
        note: "Note for prescription 2",
        appointmentId: "0a22a770-04b6-4507-be6f-74890a812386"
    },
    {
        id: 3,
        created_date: "2024-02-14",
        name: "Prescription 3",
        createdDate: new Date(),
        description: "Note for prescription 3",
        note: "Note for prescription 3",
        appointmentId: "0a22a770-04b6-4507-be6f-74890a812386"
    },
]



export const fetchPrescriptionByAppointmentId = (appointmentId) => {
    return Promise.resolve({ data: ListPrescription.filter(prescription => prescription.appointmentId === appointmentId) });
}

