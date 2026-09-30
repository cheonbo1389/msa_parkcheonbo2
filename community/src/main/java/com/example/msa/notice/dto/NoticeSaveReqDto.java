package com.example.msa.notice.dto;


import com.example.msa.notice.domain.Notice;
import com.example.msa.notice.domain.NoticeCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class NoticeSaveReqDto {

    private String title;
    private String content;
    private Long adminid;
    private NoticeCategory noticecategory;

    public Notice toEntity() {
        return Notice.builder()
                .title(title)
                .content(content)
                .adminid(adminid)
                .noticecategory(noticecategory)
                .build();
    }
}
