package com.example.msa.product.repository;

import com.example.msa.product.domain.Product;
import com.example.msa.product.domain.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    //유저가 추가한 제품 조회
    ArrayList<Product> findByMemberId(Long memberId);

    // 유저가 추가한 제품 중 ALLOWED 상태인 제품 조회
    ArrayList<Product> findByProductStatus(ProductStatus productStatus);
}
