package com.example.msa.inquiry.dto;


import com.example.msa.inquiry.domain.Inquiry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class InquirySaveReqDto {
    private String title;
    private String content;
    private Long userid;

    public Inquiry toEntity(){
        return Inquiry.builder()
                .title(title)
                .content(content)
                .userid(userid)
                .build();
    }
}
