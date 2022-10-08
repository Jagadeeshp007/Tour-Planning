package com.tour.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.app.model.TourDetails;

public interface TourRepository extends JpaRepository<TourDetails, Integer> {

}
