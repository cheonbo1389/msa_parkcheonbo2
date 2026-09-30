package com.example.msa.notice.domain;

import com.example.msa.common.domain.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Notice extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Long adminid;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NoticeCategory noticecategory;

    //Category 변경
    public void updateNoticeCategory (NoticeCategory noticecategory) {
        this.noticecategory = noticecategory;
    }
}
