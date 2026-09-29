package com.example.msa.member.repository;

import com.example.msa.member.domain.SellerApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerApplyRepository extends JpaRepository<SellerApplication, Long> {
    Optional<SellerApplication> findById(Long Id);
    SellerApplication findBymemberId(Long memberId);
}
