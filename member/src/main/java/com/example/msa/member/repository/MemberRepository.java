package com.example.msa.member.repository;


import com.example.msa.member.domain.Member;
import com.example.msa.member.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findById(Long Id);

    ArrayList<Member> findByRoleNot(Role role);
}
