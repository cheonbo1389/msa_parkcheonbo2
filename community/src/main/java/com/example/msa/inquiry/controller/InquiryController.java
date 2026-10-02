package com.example.msa.inquiry.controller;

import com.example.msa.inquiry.dto.InquirySaveReqDto;
import com.example.msa.inquiry.service.InquiryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/inquiry")
public class InquiryController {
    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    //문의하기 작성
    @PostMapping("/create")
    public ResponseEntity<?> inquiryCreate(@RequestHeader("X-User-Id") String userid,
                                           @RequestBody InquirySaveReqDto inquirySaveReqDto){

        System.out.println("<<< InquiryController - /create >>>");

        inquirySaveReqDto.setUserid(Long.valueOf(userid));

        return new ResponseEntity<>(inquiryService.saveInquiry(inquirySaveReqDto), HttpStatus.CREATED);
    }

    //내 문의 전체 조회
    @GetMapping("/allmyinquiry")
    public ResponseEntity<?> inquiryGetAll(@RequestHeader("X-User-Id") String userid) {
        System.out.println("<<< InquiryController - /allmyinquiry >>>");

        return new ResponseEntity<>(inquiryService.getAllInquiry(userid),HttpStatus.OK);
    }


    //내 문의 전체 조회
    @GetMapping("/myinquiry/{id}")
    public ResponseEntity<?> inquiryGetAll(@RequestHeader("X-User-Id") String userid, @PathVariable Long id) {
        System.out.println("<<< InquiryController - /myinquiry >>>");

        return new ResponseEntity<>(inquiryService.getMyInquiry(userid, id),HttpStatus.OK);
    }
}
