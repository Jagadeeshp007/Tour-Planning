package com.tour.app.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.tour.app.model.TourDetails;

public interface TourService {

	List<TourDetails> listDetails();

	TourDetails addTourDetail(TourDetails tourDetails);

	ResponseEntity<Object> getTourDetail(int tripID);

	ResponseEntity<String> deleteTourDetail(int tripID);

	ResponseEntity<String> updateTourDetail(int tripID, TourDetails tourDetails);
}
