package com.example.msa.inquiry.repository;


import com.example.msa.inquiry.domain.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    ArrayList<Inquiry> findByUserid(Long userid);
}
