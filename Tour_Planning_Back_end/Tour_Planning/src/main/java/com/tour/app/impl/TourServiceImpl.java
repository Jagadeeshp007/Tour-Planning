package com.tour.app.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tour.app.model.TourDetails;
import com.tour.app.repository.TourRepository;
import com.tour.app.services.TourService;

@Service
public class TourServiceImpl implements TourService {

	@Autowired
	private TourRepository tourRepo;

	@Override
	public List<TourDetails> listDetails() {
		// TODO Auto-generated method stub
		return tourRepo.findAll();
	}

	@Override
	public TourDetails addTourDetail(TourDetails tourDetails) {
		// TODO Auto-generated method stub
		return tourRepo.save(tourDetails);
	}

	@Override
	public ResponseEntity<Object> getTourDetail(int tripID) {
		// TODO Auto-generated method stub
		TourDetails tourDetails = tourRepo.findById(tripID).orElse(new TourDetails());

		if (tourDetails.getId() == tripID) {
			System.out.println(" get tour details");
			return new ResponseEntity<Object>(tourDetails, HttpStatus.OK);
		} else {
			System.out.println("get value not found");
			return new ResponseEntity<Object>("Error: Tour Details Not Found for this ID: " + tripID,
					HttpStatus.NOT_FOUND);
		}

	}

	@Override
	public ResponseEntity<String> deleteTourDetail(int tripID) {
		// TODO Auto-generated method stub
		TourDetails tourDetails = tourRepo.findById(tripID).orElse(new TourDetails());
		if (tourDetails.getId() == tripID) {
			System.out.println("value is found");
			tourRepo.delete(tourDetails);
			return new ResponseEntity<String>("Tour Details Deleted successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Error: Tour Details Not Found for this ID: " + tripID,
					HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public ResponseEntity<String> updateTourDetail(int tripID, TourDetails tourDetails) {
		// TODO Auto-generated method stub
		TourDetails updateTour = tourRepo.findById(tripID).orElse(new TourDetails());

		if (updateTour.getId() == tripID) {
			System.out.println("updated value");
			updateTour.setFromPlace(tourDetails.getFromPlace());
			updateTour.setToPlace(tourDetails.getToPlace());
			updateTour.setDuration(tourDetails.getDuration());
			updateTour.setHours(tourDetails.getHours());

			tourRepo.save(updateTour);
			return new ResponseEntity<String>("Tour Details Updated successfully", HttpStatus.OK);
		} else {
			System.out.println("update value not found");
			return new ResponseEntity<String>("Error: Tour Details Not Found for this ID: " + tripID,
					HttpStatus.NOT_FOUND);
		}
	}

}
