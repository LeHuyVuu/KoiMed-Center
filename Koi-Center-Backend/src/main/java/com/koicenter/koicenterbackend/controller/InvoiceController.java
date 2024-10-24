package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.enums.InvoiceType;
import com.koicenter.koicenterbackend.model.request.invoice.InvoiceRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.invoice.DashboardResponse;
import com.koicenter.koicenterbackend.model.response.invoice.InvoiceResponse;
import com.koicenter.koicenterbackend.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/invoices")
public class InvoiceController {
    @Autowired
    InvoiceService invoiceService;

    @GetMapping("/appointmentId")
    public ResponseEntity<ResponseObject> getInvoiceByAppointmentId(@RequestParam String appointmentId) {
        List<InvoiceResponse> invoiceResponse = invoiceService.getInvoiceByAppointmentId(appointmentId);
        if (invoiceResponse == null) {
            return ResponseObject.APIRepsonse(404, "Invoice not found for appointment ID: " + appointmentId, HttpStatus.NOT_FOUND, null);
        }
        return ResponseObject.APIRepsonse(200, "Invoice retrieved successfully", HttpStatus.OK, invoiceResponse);
    }
    @PutMapping("/update/{invoiceId}")
    public ResponseEntity<ResponseObject> updateInvoice (@PathVariable String invoiceId,@RequestBody InvoiceRequest invoiceRequest) {
        InvoiceResponse invoiceResponse = invoiceService.updateInvoice(invoiceId, invoiceRequest);
        if (invoiceResponse == null) {
            return ResponseObject.APIRepsonse(404, "Invoice not found for appointment ID: " + invoiceId , HttpStatus.NOT_FOUND, null);
        }
        return ResponseObject.APIRepsonse(200, "Invoice retrieved successfully", HttpStatus.OK, invoiceResponse);
    }
    @GetMapping("/dashboard")
    public ResponseEntity<ResponseObject> getInvoiceDashboard(@RequestParam LocalDate starTime , @RequestParam LocalDate endTime ,@RequestParam String time) {
        List<DashboardResponse> invoiceResponse = invoiceService.getDashBoard(starTime,endTime,time);
        if (invoiceResponse == null) {
            return ResponseObject.APIRepsonse(404, "Invoice not found for appointment ID: " , HttpStatus.NOT_FOUND, null);
        }
        return ResponseObject.APIRepsonse(200, "Invoice retrieved successfully", HttpStatus.OK, invoiceResponse);
    }
    @PostMapping("")
    public ResponseEntity<ResponseObject> createInvoiceV2(@RequestBody InvoiceRequest invoiceRequest) {
        InvoiceResponse invoiceResponse = invoiceService.createInvoiceV2(invoiceRequest);
        if (invoiceResponse != null) {
            return ResponseObject.APIRepsonse(201, "Create Invoice Successfully", HttpStatus.CREATED, invoiceResponse);
        }else {
            return ResponseObject.APIRepsonse(404, "Invoice Creation failed " + invoiceRequest, HttpStatus.NOT_FOUND, null);

        }
    }
    @GetMapping("")
    public ResponseEntity<ResponseObject> getAppointmentIdAndType(@RequestParam String appointmentId , @RequestParam InvoiceType type) {
        InvoiceResponse invoiceResponse = invoiceService.getAppointmentIdAndType(appointmentId,type);
        if (invoiceResponse != null) {
            return ResponseObject.APIRepsonse(200, "Invoice retrieved successfully", HttpStatus.OK, invoiceResponse);
        }else
            return ResponseObject.APIRepsonse(404, "Invoice not found for appointment ID: " , HttpStatus.NOT_FOUND, null);
    }
    @GetMapping("/{invoiceId}")
    public ResponseEntity<ResponseObject> getInvoiceById(@PathVariable String invoiceId ) {
        InvoiceResponse invoiceResponse = invoiceService.getInvoiceById(invoiceId);
        if (invoiceResponse != null) {
            return ResponseObject.APIRepsonse(200, "Invoice retrieved successfully", HttpStatus.OK, invoiceResponse);
        }else
            return ResponseObject.APIRepsonse(404, "Invoice not found By Invoice ID: " , HttpStatus.NOT_FOUND, null);
    }
}
