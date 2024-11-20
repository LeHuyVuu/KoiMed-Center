import { APPOINTMENT_STATUS } from '../utils/constants';

// This file contains mock data for all appointments.

export const mockAppointments = [
    {
      appointmentId: "APT001",
      customerName: "Đặng Mai Anh Tú",
      serviceName: "General Checkup",
      startTime: "14:30",
      appointmentDate: "2023-05-15",
      status: APPOINTMENT_STATUS.BOOKING_COMPLETE,
      vetId: "20796b2d-4f1c-47bb-801d-721010a361b9",
      customerId: "0f4e5514-079e-4ed1-8df1-ff3d53221a52"
    },
    {
      appointmentId: "APT002",
      customerName: "Đặng Mai Anh Tú",
      serviceName: "Vaccination",
      startTime: "10:00",
      appointmentDate: "2023-05-16",
      status: APPOINTMENT_STATUS.FINISH,
      vetId: "20796b2d-4f1c-47bb-801d-721010a361b9",
      customerId: "0f4e5514-079e-4ed1-8df1-ff3d53221a52"
    },
    {
      appointmentId: "APT003",
      customerName: "Alice Johnson",
      serviceName: "Dental Cleaning",
      startTime: "11:30",
      appointmentDate: "2023-05-17",
      status: APPOINTMENT_STATUS.BOOKING_COMPLETE,
      vetId: "20796b2d-4f1c-47bb-801d-721010a361b9",
      customerId: "CUST003"
    },
    // Add more mock appointments as needed
  ];
  
  export const fetchAllAppointmentAPI = () => {
    return Promise.resolve({ data: mockAppointments });
  };
  
  export const fetchAllAppointmentByVetIdAPI = (vetId,status) => {
    if(status === "ALL"){
      const filteredAppointments = mockAppointments.filter(apt => apt.vetId === vetId);
      return Promise.resolve({ data: filteredAppointments });
    }
    const filteredAppointments = mockAppointments.filter(apt => apt.vetId === vetId && apt.status === status);
    return Promise.resolve({ data: filteredAppointments });
  };
  
  export const fetchAppointmentByCustomerIdAPI = (customerId,status) => {
    if(status === "ALL"){
      const filteredAppointments = mockAppointments.filter(apt => apt.customerId === customerId);
      return Promise.resolve({ data: filteredAppointments });
    }
    const filteredAppointments = mockAppointments.filter(apt => apt.customerId === customerId && apt.status === status);
    return Promise.resolve({ data: filteredAppointments });
  };

  export const fetchAppointmentByIdAPI = (appointmentId) => {
    const filteredAppointments = mockAppointments.filter(apt => apt.appointmentId === appointmentId);
    return Promise.resolve({ data: filteredAppointments });
  };

  export const updateAppointmentAPI = (appointmentId, updatedAppointment) => {
    const index = mockAppointments.findIndex(apt => apt.appointmentId === appointmentId);
    if (index !== -1) {
      mockAppointments[index] = updatedAppointment;
    }
    return Promise.resolve({ data: updatedAppointment });
  };
