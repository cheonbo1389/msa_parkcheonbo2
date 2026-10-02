package com.example.msa.inquiry.service;

import com.example.msa.inquiry.domain.Inquiry;
import com.example.msa.inquiry.dto.InquirySaveReqDto;
import com.example.msa.inquiry.repository.InquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Transactional
@Service
public class InquiryService {
    private final InquiryRepository inquiryRepository;

    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }


    //문의하기 작성
    public Long saveInquiry(InquirySaveReqDto inquirySaveReqDto){
        System.out.println("<<< InquiryService - saveInquiry >>>");
        Inquiry inquiry = inquiryRepository.save(inquirySaveReqDto.toEntity());

        return inquiry.getId();
    }


    //내 문의하기 전체조회
    public ArrayList<Inquiry> getAllInquiry(String userid){
        System.out.println("<<< InquiryService - getAllInquiry >>>");

        return inquiryRepository.findByUserid(Long.valueOf(userid));
    }

    //특정 내 문의하기 조회
    public Inquiry getMyInquiry(String userid, Long id){
        System.out.println("<<< InquiryService - getMyInquiry >>>");
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문의입니다."));

        if (!inquiry.getUserid().equals(Long.valueOf(userid))) {
            throw new IllegalArgumentException("본인의 문의만 조회할 수 있습니다.");
        }

        return inquiry;
    }
}
