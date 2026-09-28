package com.example.msa.member.dto;


import com.example.msa.member.domain.SellerApplication;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SellerSaveReqDto {
    private Long memberId;
    private String category;

    public SellerApplication toEntity(){
        return SellerApplication.builder()
                .memberId(memberId)
                .category(category)
                .build();
    }
}
