package com.example.msa.member.domain;


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
public class SellerApplication extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String category;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.DISALLOWED;
}
