package com.tour.app.services;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.tour.app.model.LoginDetails;
import com.tour.app.model.LoginInput;

public interface LoginService {

	ResponseEntity<Object> save(LoginDetails loginDetails);
	
	Map<String, Object> login(LoginInput loginInput);
}
