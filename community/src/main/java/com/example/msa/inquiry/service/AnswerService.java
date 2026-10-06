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

    //문의 답변 조회
    public Answer getAnswer(Long inquiryid){
        System.out.println("<<< AnswerService - getAnswer >>>");

        return answerRepository.findByInquiryid(inquiryid);
    }

//   답변 존재 확인
    public boolean existsAnswer(Long inquiryid) {
        System.out.println("<<< AnswerService - existsAnswer >>>");

        return answerRepository.existsByInquiryid(inquiryid);
    }

    //문의 답변 수정
    public Long updateAnswer(AnswerSaveReqDto answerSaveReqDto){
        System.out.println("<<< AnswerService - updateAnswer >>>");

        Answer answer = answerRepository.findByInquiryid(answerSaveReqDto.getInquiryid());
        answer.updateTitle(answerSaveReqDto.getTitle());
        answer.updateContent(answerSaveReqDto.getContent());

        return answer.getId();
    }


    //문의 답변 삭제
    public Long deleteAnswer(Long inquiryid){
        System.out.println("<<< AnswerService - deleteAnswer >>>");
        Answer answer = answerRepository.findByInquiryid(inquiryid);
        Inquiry inquiry = inquiryRepository.findById(answer.getInquiryid())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문의입니다."));

        inquiry.updateInquirystatus(Inquirystatus.NOTANSWERED);

        answerRepository.deleteByInquiryid(inquiryid);

        return inquiryid;
    }
}
