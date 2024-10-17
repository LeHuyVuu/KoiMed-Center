package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.mapper.appointment.AppointmentMapper;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.entity.Customer;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.enums.AppointmentStatus;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.request.veterinarian.VetScheduleRequest;
import com.koicenter.koicenterbackend.model.response.appointment.AppointmentResponse;
import com.koicenter.koicenterbackend.model.response.veterinarian.VetScheduleResponse;
import com.koicenter.koicenterbackend.model.response.veterinarian.VeterinarianResponse;
import com.koicenter.koicenterbackend.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;
    CustomerRepository customerRepository;
    ServicesRepository servicesRepository;
    VeterinarianRepository veterinarianRepository;
    AppointmentMapper appointmentMapper;
    VetScheduleService vetScheduleService;
    UserRepository userRepository ;

    public List<AppointmentResponse> getAllAppointmentsByCustomerId(String customerId, String status) {
        List<Appointment> appointments = appointmentRepository.findByCustomer_CustomerIdOrderByCreatedAtDesc(customerId);
        List<AppointmentResponse> appointmentResponses = new ArrayList<>();


        for (Appointment appointment : appointments) {
            if (appointment.getStatus().name().equals(status) || status.equals("ALL")) {
                AppointmentResponse response = AppointmentResponse.builder()
                        .appointmentId(appointment.getAppointmentId())
                        .appointmentDate(appointment.getAppointmentDate())
                        .endTime(appointment.getEndTime())
                        .status(appointment.getStatus())
                        .location(String.valueOf(appointment.getLocation()))
                        .createdAt(appointment.getCreatedAt())
                        .depositedMoney(appointment.getDepositedMoney())
                        .location(String.valueOf(appointment.getLocation()))
                        .result(String.valueOf(appointment.getResult()))
                        .startTime(appointment.getStartTime())
                        .status(appointment.getStatus())
                        .type(appointment.getType())
                        .customerId(appointment.getCustomer().getCustomerId())
                        .customerName(appointment.getCustomer().getUser().getFullName())
                        .serviceId(appointment.getService().getServiceId())
                        .serviceName(appointment.getService().getServiceName())
                        .code(appointment.getCode())
                        .distance(appointment.getDistance())
                        .build();
                        if(appointment.getVeterinarian()!=null) {
                            response.setVetId(appointment.getVeterinarian().getVetId());
                            response.setVetName(appointment.getVeterinarian().getUser().getFullName());
                        }
                appointmentResponses.add(response);
            }
        }
        return appointmentResponses;
    }


    public AppointmentResponse getAppointmentByAppointmentId(String appointmentId) {
        AppointmentResponse appointmentResponses ;
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);

        AppointmentResponse response = AppointmentResponse.builder()
                .appointmentId(appointment.getAppointmentId())
                .appointmentDate(appointment.getAppointmentDate())
                .endTime(appointment.getEndTime())
                .status(appointment.getStatus())
                .location(String.valueOf(appointment.getLocation()))
                .createdAt(appointment.getCreatedAt())
                .depositedMoney(appointment.getDepositedMoney())
                .location(String.valueOf(appointment.getLocation()))
                .result(String.valueOf(appointment.getResult()))
                .startTime(appointment.getStartTime())
                .status(appointment.getStatus())
                .type(appointment.getType())
                .customerId(appointment.getCustomer().getCustomerId())
                .customerName(appointment.getCustomer().getUser().getFullName())
                .serviceName(appointment.getService().getServiceName())
                .serviceId(appointment.getService().getServiceId())
                .distance(appointment.getDistance())
                .code(appointment.getCode())
                .depositedMoney(appointment.getDepositedMoney())
                .build();
        if(appointment.getVeterinarian()!=null){

            response.setVetId(appointment.getVeterinarian().getVetId());
            response.setVetName(appointment.getVeterinarian().getUser().getFullName());
        }
        return response;
    }

    public List<AppointmentResponse> getAllAppointmentByVetId(String vetId, String status) {
        List<Appointment> appointments = appointmentRepository.findByVeterinarian_VetIdOrderByCreatedAtDesc(vetId);
        List<AppointmentResponse> appointmentResponses = new ArrayList<>();

        if (appointments == null) { // Thêm kiểm tra null
            throw new AppException(ErrorCode.SERVICE_NOT_EXITS.getCode(), "No appointments found", HttpStatus.NOT_FOUND);
        }

        appointments.sort(Comparator
                .comparing(Appointment::getAppointmentDate)
                .thenComparing(Appointment::getCreatedAt)
                .reversed());

        for (Appointment appointment : appointments) {
            if (appointment.getStatus().name().equals(status) || status.equals("ALL")) {
                AppointmentResponse response = AppointmentResponse.builder()
                        .appointmentId(appointment.getAppointmentId())
                        .appointmentDate(appointment.getAppointmentDate())
                        .endTime(appointment.getEndTime())
                        .status(appointment.getStatus())
                        .location(String.valueOf(appointment.getLocation()))
                        .createdAt(appointment.getCreatedAt())
                        .depositedMoney(appointment.getDepositedMoney())
                        .location(String.valueOf(appointment.getLocation()))
                        .result(String.valueOf(appointment.getResult()))
                        .startTime(appointment.getStartTime())
                        .status(appointment.getStatus())
                        .type(appointment.getType())
                        .customerId(appointment.getCustomer().getCustomerId())
                        .serviceName(appointment.getService().getServiceName())
                        .customerName(appointment.getCustomer().getUser().getFullName())
                        .serviceId(appointment.getService().getServiceId())
                        .vetId(appointment.getVeterinarian().getVetId())
                        .code(appointment.getCode())
                        .distance(appointment.getDistance())
                        .build();
                appointmentResponses.add(response);
            }
        }
        return appointmentResponses;
    }
    //CREATE APPOINTMENT
    public AppointmentResponse createAppointment(AppointmentRequest appointmentRequest) {
        Customer customer = customerRepository.findByCustomerId(appointmentRequest.getCustomerId());
        Veterinarian veterinarian = null;
        if (!appointmentRequest.getVetId().equalsIgnoreCase("SKIP")) {
            veterinarian = veterinarianRepository.findByVetId(appointmentRequest.getVetId());
//            log.info("Veterian ID " + veterinarian.getVetId());

            VetScheduleRequest vetScheduleRequest = VetScheduleRequest.builder()
                    .vet_id(appointmentRequest.getVetId())
                    .endTime(appointmentRequest.getEndTime())
                    .startTime(appointmentRequest.getStartTime())
                    .date(appointmentRequest.getAppointmentDate())
                    .appointmentType(appointmentRequest.getType())
                    .build();
            vetScheduleService.slotDateTime(vetScheduleRequest,"add");
        }
        com.koicenter.koicenterbackend.model.entity.Service service = servicesRepository.findByServiceId(appointmentRequest.getServiceId());
        log.info("service ID " + service.getServiceId());
        Appointment appointment = new Appointment();
        appointment = appointmentMapper.toAppointment(appointmentRequest);
        if(appointmentRequest.getResult() == null){
            appointment.setResult(null);
        }else {
            appointment.setResult(appointmentRequest.getResult());
        }
        appointment.setCustomer(customer);
        appointment.setVeterinarian(veterinarian);
        appointment.setService(service);
        appointment.setDepositedMoney(service.getBasePrice());
        appointment.setCode(getCode(appointmentRequest.getType()));
        appointmentRepository.save(appointment);
        AppointmentResponse appointmentResponse = appointmentMapper.toAppointmentResponse(appointment);
        appointmentResponse.setCustomerId(appointment.getCustomer().getCustomerId());
//        appointmentResponse.setVetId(appointment.getVeterinarian().getVetId());
        appointmentResponse.setServiceId(appointment.getService().getServiceId());
        log.info("appoimtID" + appointmentResponse.getAppointmentId());
        if (appointment.getVeterinarian() != null) {
            appointmentResponse.setVetId(appointment.getVeterinarian().getVetId());
        } else {
            appointmentResponse.setVetId("SKIP");
        }
        return appointmentResponse;
    }
    public AppointmentResponse updateAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentRequest.getAppointmentId());
        if (appointment != null) {
            LocalDate date = appointmentRequest.getAppointmentDate();
            LocalTime startTime = appointmentRequest.getStartTime();
            LocalTime endTime = appointmentRequest.getEndTime();
            String vetId = appointmentRequest.getVetId();
            Customer customer = customerRepository.findByCustomerId(appointmentRequest.getCustomerId());
            Veterinarian veterinarian = null;
            if (appointmentRequest.getVetId()!=null) {
                veterinarian = veterinarianRepository.findByVetId(appointmentRequest.getVetId());
                log.info("vetId "+ veterinarian.getVetId());
            }

            com.koicenter.koicenterbackend.model.entity.Service service = servicesRepository.findByServiceId(appointmentRequest.getServiceId());

            if (appointment.getAppointmentDate().equals(date) && appointment.getStartTime().equals(startTime) && appointment.getEndTime().equals(endTime) && appointment.getVeterinarian() == null || !appointment.getAppointmentDate().equals(date) && appointment.getVeterinarian()== null|| !appointment.getStartTime().equals(startTime) && appointment.getVeterinarian()== null||  !appointment.getEndTime().equals(endTime) &&  appointment.getVeterinarian()== null) {
                log.info("If 1 ");
                VetScheduleRequest vetScheduleRequest1 = VetScheduleRequest.builder()
                        .vet_id(appointmentRequest.getVetId())
                        .startTime(appointmentRequest.getStartTime())
                        .endTime(appointmentRequest.getEndTime())
                        .date(appointmentRequest.getAppointmentDate())
                        .appointmentType(appointmentRequest.getType())
                        .build();
                List<VetScheduleResponse> vetScheduleResponse = vetScheduleService.slotDateTime(vetScheduleRequest1,"add");
            }
             else if (appointment.getAppointmentDate().equals(date) && appointment.getStartTime().equals(startTime) && appointment.getEndTime().equals(endTime) && appointment.getVeterinarian().getVetId().equals(vetId)) {
                //NEU KHONG DOI THOI GIAN , KHONG DOI BAC SI
                log.info("If2 ");
            }
             else if ( appointmentRequest.getType().equals(AppointmentStatus.CANCEL)||!appointment.getAppointmentDate().equals(date) && appointmentRequest.getVetId()== null|| !appointment.getStartTime().equals(startTime) &&  appointmentRequest.getVetId()== null||  !appointment.getEndTime().equals(endTime) &&   appointmentRequest.getVetId()== null){
                log.info("If3 ");
                 if (appointment.getVeterinarian() !=null ){
                     VetScheduleRequest vetScheduleRequest = VetScheduleRequest.builder()
                             .vet_id(appointment.getVeterinarian().getVetId())
                             .endTime(appointment.getEndTime())
                             .startTime(appointment.getStartTime())
                             .date(appointment.getAppointmentDate())
                             .appointmentType(appointment.getType())
                             .build();
                     List<VetScheduleResponse> vetScheduleResponse = vetScheduleService.slotDateTime(vetScheduleRequest,"less");
                 }
            }
            else  if (!appointment.getAppointmentDate().equals(date) || !appointment.getStartTime().equals(startTime) ||  !appointment.getEndTime().equals(endTime) || !appointment.getVeterinarian().getVetId().equals(vetId)){
                log.info("if 4 ");
                VetScheduleRequest vetScheduleRequest = VetScheduleRequest.builder()
                        .vet_id(appointment.getVeterinarian().getVetId())
                        .endTime(appointment.getEndTime())
                        .startTime(appointment.getStartTime())
                        .date(appointment.getAppointmentDate())
                        .appointmentType(appointment.getType())
                        .build();
                List<VetScheduleResponse> vetScheduleResponse = vetScheduleService.slotDateTime(vetScheduleRequest,"less");
                VetScheduleRequest vetScheduleRequest1 = VetScheduleRequest.builder()
                        .vet_id(appointmentRequest.getVetId())
                        .startTime(appointmentRequest.getStartTime())
                        .endTime(appointmentRequest.getEndTime())
                        .date(appointmentRequest.getAppointmentDate())
                        .appointmentType(appointmentRequest.getType())
                        .build();
                vetScheduleService.slotDateTime(vetScheduleRequest1,"add");
            }

            appointment = appointmentMapper.toAppointment(appointmentRequest);
            if (appointmentRequest.getVetId()!=null) {
                appointment.setVeterinarian(veterinarian);
            }
            if(appointmentRequest.getResult()!=null ){
                appointment.setResult(appointmentRequest.getResult());
            }
            if(appointmentRequest.getCode()!=null){
                appointment.setCode(appointmentRequest.getCode());
            }
            if(appointmentRequest.getCreatedAt()!=null){
                appointment.setCreatedAt(appointmentRequest.getCreatedAt());
            }
            appointment.setCustomer(customer);
            appointment.setService(service);

            appointmentRepository.save(appointment);
//appointment.getCode()

            AppointmentResponse appointmentResponse = appointmentMapper.toAppointmentResponse(appointment);
            appointmentResponse.setCustomerId(appointment.getCustomer().getCustomerId());

            if(appointmentRequest.getVetId()!=null){
                appointmentResponse.setVetId(appointmentRequest.getVetId());
            }
            appointmentResponse.setServiceId(appointment.getService().getServiceId());
            return appointmentResponse;
        } else {
            throw new AppException(
                    ErrorCode.APPOINTMENT_ID_NOT_FOUND.getCode(),
                    ErrorCode.APPOINTMENT_ID_NOT_FOUND.getMessage(),
                    HttpStatus.NOT_FOUND);
        }
    }
    public List<AppointmentResponse> getAllAppointments(String status,int offset,int pageSize) {
        Page<Appointment> appointments;
        ZonedDateTime createdAt;
        Pageable pageable = PageRequest.of(offset, pageSize).withSort(Sort.by(Sort.Direction.DESC, "createdAt"));
        if (status.equalsIgnoreCase("ALL")) {
         appointments = appointmentRepository.findAll(pageable);
        } else {//PageRequest.of()
            appointments = appointmentRepository.findByStatusOrderByCreatedAtDesc(AppointmentStatus.valueOf(status),pageable);
        }

        List<AppointmentResponse> appointmentResponses = new ArrayList<>();

        for (Appointment appointment : appointments) {

            AppointmentResponse response = AppointmentResponse.builder()
                    .appointmentId(appointment.getAppointmentId())
                    .appointmentDate(appointment.getAppointmentDate())
                    .endTime(appointment.getEndTime())
                    .status(appointment.getStatus())
                    .location(String.valueOf(appointment.getLocation()))
                    .createdAt(appointment.getCreatedAt())
                    .depositedMoney(appointment.getDepositedMoney())
                    .location(String.valueOf(appointment.getLocation()))
                    .result(appointment.getResult())
                    .startTime(appointment.getStartTime())
                    .status(appointment.getStatus())
                    .type(appointment.getType())
                    .customerId(appointment.getCustomer().getCustomerId())
                    .customerName(appointment.getCustomer().getUser().getFullName())
                    .serviceName(appointment.getService().getServiceName())
                    .serviceId(appointment.getService().getServiceId())
                    .code(appointment.getCode())
                    .distance(appointment.getDistance())
                    .build();
            if (appointment.getVeterinarian() != null) {
                response.setVetId(appointment.getVeterinarian().getVetId());
                response.setVetName(appointment.getVeterinarian().getUser().getFullName());
            }
            appointmentResponses.add(response);

        }
        return appointmentResponses;
    }
    private  String getCode(AppointmentType appointmentType){
        List<Appointment> appointments = appointmentRepository.findAll();
        int count = 1 ;
        String aphabet ="";
        if (appointmentType.equals(AppointmentType.HOME))
            aphabet="H";
        else if (appointmentType.equals(AppointmentType.CENTER))
            aphabet="C";
        else
            aphabet="O";

        for (Appointment appointment : appointments ){
            count++ ;
        }
        return aphabet+count;
    }
    public List<AppointmentResponse> getAppointmentByUserName(String full_name) {
        List<Appointment> appointments = new ArrayList<>();
        if (full_name!= null){
            User user = userRepository.findByFullName(full_name);
            if (user != null) {
                Customer customer = customerRepository.findByUser_UserId(user.getUserId());
                if (customer != null) {
                    appointments = appointmentRepository.findAllByCustomerId(customer.getCustomerId());
                }else {
                    throw new AppException(ErrorCode.CUSTOMER_NOT_FOUND.getCode(),ErrorCode.CUSTOMER_NOT_FOUND.getMessage(),HttpStatus.NOT_FOUND);
                }
            }else{
                throw new AppException(ErrorCode.USER_NOT_EXISTS.getCode(),ErrorCode.USER_NOT_EXISTS.getMessage(),HttpStatus.NOT_FOUND);
            }
        }else{
            appointments = appointmentRepository.findAll();
        }



        List<AppointmentResponse> appointmentResponses = new ArrayList<>();
        for (Appointment appointment : appointments) {
            appointmentResponses.add(appointmentMapper.toAppointmentResponse(appointment));
        }
        return appointmentResponses ;
    }
    public List<AppointmentResponse> getAppointmentByVetId(String vetId, LocalDate date){
        List<Appointment> appointments = appointmentRepository.findByVeterinarian_VetIdAndAppointmentDate(vetId,date);
        List<AppointmentResponse> appointmentResponses = new ArrayList<>();
        if (appointments != null) {
            for (Appointment appointment : appointments ){
                appointmentResponses.add(appointmentMapper.toAppointmentResponse(appointment));
            }
        }else {
            throw new AppException(ErrorCode.APPOINTMENT_NOT_FOUND.getCode(),
                    ErrorCode.APPOINTMENT_NOT_FOUND.getMessage(),
                    HttpStatus.NOT_FOUND);
        }
        return appointmentResponses ;
    }


}


