package com.koicenter.koicenterbackend.model.request;

import com.koicenter.koicenterbackend.model.entity.Customer;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PondRequest {
    String pondId;
    String status;
    float depth;
    float perimeter;
    float temperature;
    String notes;
    String image;
    String waterQuality; // Chất lượng nước
    String filterSystem; // Hệ thống lọc
    String customerId;


}