package com.koicenter.koicenterbackend.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String delivery_id;
    float from_place;
    float to_place;
    float price;

}