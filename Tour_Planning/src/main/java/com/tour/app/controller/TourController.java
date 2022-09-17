package com.tour.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tour.app.model.LoginDetails;
import com.tour.app.model.LoginInput;
import com.tour.app.model.TourDetails;
import com.tour.app.services.LoginService;
import com.tour.app.services.TourService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/tour")
public class TourController {

	@Autowired
	private LoginService loginService;

	@Autowired
	private TourService tourService;

	@GetMapping("/list")
	public List<TourDetails> getAllTourDetails() {
		return tourService.listDetails();
	}

	@PostMapping("/add")
	public TourDetails createTourDetails(@RequestBody TourDetails tourDetials) {
		return tourService.addTourDetail(tourDetials);
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<Object> getTourDetails(@PathVariable(value = "id") int tripID) {
		return tourService.getTourDetail(tripID);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteTourDetails(@PathVariable(value = "id") int tripID) {
		return tourService.deleteTourDetail(tripID);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateTourDetails(@PathVariable(value = "id") int tripID,
			@RequestBody TourDetails tourDetails) {

		return tourService.updateTourDetail(tripID, tourDetails);
	}

	@PostMapping("/reg")
	public ResponseEntity<Object> userReg(@RequestBody LoginDetails loginDetails) {
		return loginService.save(loginDetails);
	}

	@PostMapping("/login")
	public Map<String, Object> userLogin(@RequestBody LoginInput loginInput) {
		return loginService.login(loginInput);
	}
}
