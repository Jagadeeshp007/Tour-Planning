package com.tour.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tour.app.model.LoginDetails;

@Repository
public interface LoginRepository extends JpaRepository<LoginDetails, Integer> {

	LoginDetails findByUserName(String userName);

	boolean existsByUserName(String userName);
	

}
