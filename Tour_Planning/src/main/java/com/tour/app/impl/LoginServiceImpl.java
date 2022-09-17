package com.tour.app.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tour.app.model.LoginDetails;
import com.tour.app.model.LoginInput;
import com.tour.app.repository.LoginRepository;
import com.tour.app.services.LoginService;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginRepository loginRepo;

	@Override
	public ResponseEntity<Object> save(LoginDetails loginDetails) {
		// TODO Auto-generated method stub
		String userName = loginDetails.getUserName();
		String role = loginDetails.getRole();
		String email = loginDetails.getEmailId();
		long mobile = loginDetails.getMobile();

		if (loginRepo.existsByUserName(userName)) {
			return new ResponseEntity<Object>(
					"Error: This " + loginDetails.getUserName() + " UserName already taken!..", HttpStatus.BAD_REQUEST);
		} else if (role.equalsIgnoreCase("user") || role.equalsIgnoreCase("admin")) {

			if (!emailValid(email)) {
				return new ResponseEntity<Object>("Error: Email Id is Not valid", HttpStatus.BAD_REQUEST);
			} else if (!mobileValid(mobile)) {
				return new ResponseEntity<Object>("Error: Mobile Number is Not valid", HttpStatus.BAD_REQUEST);
			} else {
				loginRepo.save(loginDetails);
				return new ResponseEntity<Object>(loginDetails, HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<Object>("Error: Role is Not Valid or NULL", HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public Map<String, Object> login(LoginInput loginInput) {
		// TODO Auto-generated method stub
		LoginDetails loginDetails = loginRepo.findByUserName(loginInput.getUserName());
		Map<String, Object> response = new HashMap<>();
		if (loginDetails == null) {
			response.put("ResponseStatus", Boolean.FALSE);
		} else if (loginDetails.getUserName().equals(loginInput.getUserName())
				&& loginDetails.getPassword().equals(loginInput.getPassword())) {
			String role = loginDetails.getRole();
			response.put("ResponseStatus", Boolean.TRUE);
			if (role.equalsIgnoreCase("Admin")) {
				response.put("ResponseType", "admin");
			} else if (role.equalsIgnoreCase("User")) {
				response.put("ResponseType", "user");
			}
		} else {
			response.put("ResponseStatus", Boolean.FALSE);
		}
		return response;
	}

	public boolean emailValid(String email) {
		String regex = "^[a-zA-Z0-9_+&*-]+(?:\\." + "[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-z" + "A-Z]{2,7}$";
		Pattern pat = Pattern.compile(regex);
		if (email == null)
			return false;
		return pat.matcher(email).matches();
	}

	public boolean mobileValid(long number) {
		Pattern pat = Pattern.compile("^\\d{10}$");
		String phone = Long.toString(number);
		if (phone == null)
			return false;
		return pat.matcher(phone).matches();
	}

}
