package com.example.msa.inquiry.domain;

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
public class Inquiry extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Long userid;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false)
    private Inquirystatus inquirystatus = Inquirystatus.NOTANSWERED;

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateInquirystatus (Inquirystatus inquirystatus) {
        this.inquirystatus = inquirystatus;
    }
}
