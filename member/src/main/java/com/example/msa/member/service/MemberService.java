package com.example.msa.member.service;

import com.example.msa.member.domain.Member;
import com.example.msa.member.domain.Role;
import com.example.msa.member.domain.SellerApplication;
import com.example.msa.member.domain.Status;
import com.example.msa.member.dto.LoginDto;
import com.example.msa.member.dto.MemberSaveReqDto;
import com.example.msa.member.dto.SellerSaveReqDto;
import com.example.msa.member.repository.MemberRepository;
import com.example.msa.member.repository.SellerApplyRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final SellerApplyRepository sellerApplyRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, SellerApplyRepository sellerApplyRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.sellerApplyRepository = sellerApplyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //회원가입 시점 - save() 호출시
    public Long save(MemberSaveReqDto memberSaveReqDto){
        System.out.println("<<< MemberService - save >>>");
        Optional<Member> optionalMember = memberRepository.findByEmail(memberSaveReqDto.getEmail());
        if (optionalMember.isPresent()){
            throw new IllegalArgumentException("기존에 존재하는 회원입니다.");
        }

        //암호화
        String password = passwordEncoder.encode(memberSaveReqDto.getPassword());

        Member member = memberRepository.save(memberSaveReqDto.toEntity(password));

        return member.getId();

    }

    //로그인
    public Member login(LoginDto dto){
        System.out.println("<<< MemberService - login >>>");

        boolean check = true;

        //email 존재 여부
        Optional<Member> optionalMember = memberRepository.findByEmail(dto.getEmail());
        if(!optionalMember.isPresent()){
            check = false;
        }

        //password 일치 여부
        if (!passwordEncoder.matches(dto.getPassword(), optionalMember.get().getPassword())){
            check = false;
        }

        if(!check){
            throw new IllegalArgumentException("email 또는 비밀번호가 일치하지 않습니다.");
        }

        return optionalMember.get();
    }


    //마이페이지 - 내정보 조회
    public Member myinfo(String userId){
        System.out.println("<<< MemberService - myinfo >>>");

        Member member = memberRepository.findById(Long.valueOf(userId)).get();

        return member;
    }


    //마이페이지 - 내정보 업데이트
    public Member updatemyinfo(Member member){
        System.out.println("<<< MemberService - updatemyinfo >>>");

        return memberRepository.save(member);
    }


    // 판매자 신청
    public Long sellerapply(SellerSaveReqDto sellerSaveReqDto){
        System.out.println("<<< MemberService - sellerapply >>>");
        Optional<SellerApplication> optionalSellerApplication = sellerApplyRepository.findById(sellerSaveReqDto.getMemberId());

        SellerApplication sellerApplication = sellerApplyRepository.save(sellerSaveReqDto.toEntity());

        return sellerApplication.getId();
    }

    //판매자 리스트 조회
    public ArrayList<SellerApplication> sellerList(){
        System.out.println("<<< MemberService - sellerList >>>");

        return (ArrayList<SellerApplication>) sellerApplyRepository.findAll();
    }

    //판매자 허가
    public Long sellerallow(Long memberId){
        System.out.println("<<< MemberService - sellerallow >>>");

        Member member = memberRepository.findById(memberId).get();

        member.updateRole(Role.SELLER);

        SellerApplication sellerApplication = sellerApplyRepository.findBymemberId(memberId);
        sellerApplication.updateStatus(Status.ALLOWED);

        return sellerApplication.getId();
    }

    //판매자 비허가
    public Long sellerdisallow(Long id){
        System.out.println("<<< MemberService - sellerdisallow >>>");

        SellerApplication sellerApplication = sellerApplyRepository.findById(id).get();
        sellerApplication.updateStatus(Status.DISALLOWED);

        return sellerApplication.getId();
    }


    //일반 사용자로 전환
    public void changeToCommonUser(Long memberId){
        System.out.println("<<< MemberService - changeToCommonUser >>>");
        Member member = memberRepository.findById(memberId).get();

        member.updateRole(Role.USER);

        SellerApplication sellerApplication = sellerApplyRepository.findBymemberId(memberId);
        sellerApplyRepository.deleteById(sellerApplication.getId());
    }

}
