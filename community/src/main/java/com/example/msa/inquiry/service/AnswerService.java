package com.example.msa.inquiry.service;

import com.example.msa.inquiry.domain.Inquirystatus;
import com.example.msa.inquiry.domain.Answer;
import com.example.msa.inquiry.domain.Inquiry;
import com.example.msa.inquiry.dto.AnswerSaveReqDto;
import com.example.msa.inquiry.repository.AnswerRepository;
import com.example.msa.inquiry.repository.InquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Transactional
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final InquiryRepository inquiryRepository;

    public AnswerService(AnswerRepository answerRepository, InquiryRepository inquiryRepository) {
        this.answerRepository = answerRepository;
        this.inquiryRepository = inquiryRepository;
    }

    //문의 답변 작성
    public Long saveAnswer(AnswerSaveReqDto answerSaveReqDto){
        System.out.println("<<< AnswerService - saveAnswer >>>");

        Answer answer = answerRepository.save(answerSaveReqDto.toEntity());
        Inquiry inquiry = inquiryRepository.findById(answer.getInquiryid())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문의입니다."));

        inquiry.updateInquirystatus(Inquirystatus.ANSWERED);

        return answer.getId();
    }
}
