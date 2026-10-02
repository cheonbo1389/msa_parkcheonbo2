package com.example.msa.inquiry.dto;

import com.example.msa.inquiry.domain.Answer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AnswerSaveReqDto {
    private String title;
    private String content;
    private Long adminid;
    private Long inquiryid;

    public Answer toEntity(){
        return Answer.builder()
                .title(title)
                .content(content)
                .adminid(adminid)
                .inquiryid(inquiryid)
                .build();
    }
}
