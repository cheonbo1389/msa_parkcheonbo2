package com.example.msa.inquiry.repository;


import com.example.msa.inquiry.domain.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    // 문의 ID로 답변 조회
    Answer findByInquiryid(Long inquiryid);

    // 답변 존재 확인
    boolean existsByInquiryid(Long inquiryid);

    // 답변 삭제
    void deleteByInquiryid(Long inquiryid);
}
