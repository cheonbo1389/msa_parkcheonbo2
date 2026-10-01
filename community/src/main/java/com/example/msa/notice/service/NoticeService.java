package com.example.msa.notice.service;


import com.example.msa.notice.domain.Notice;
import com.example.msa.notice.dto.NoticeSaveReqDto;
import com.example.msa.notice.repository.NoticeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class NoticeService {
    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    //공지글 작성
    public Long saveNotice(NoticeSaveReqDto noticeSaveReqDto){
        System.out.println("<<< NoticeService - saveNotice >>>");

        Notice notice = noticeRepository.save(noticeSaveReqDto.toEntity());

        return notice.getId();
    }


    //공지글 조회
    public ArrayList<Notice> getAllNotice(){
        System.out.println("<<< NoticeService - getAllNotice >>>");

        return (ArrayList<Notice>) noticeRepository.findAll();
    }

    //공지글 상세 조회
    public Notice getNoticeDetail(Long id){
        System.out.println("<<< NoticeService - getNoticeDetail >>>");

        return noticeRepository.findById(id).get();
    }

    //공지글 수정
    public Long updateNotice(Long id, NoticeSaveReqDto dto) {

        System.out.println("<<< NoticeService - updateNotice >>>");

        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 공지입니다."));

        notice.updateTitle(dto.getTitle());
        notice.updateContent(dto.getContent());
        notice.updateNoticeCategory(dto.getNoticecategory());

        return notice.getId();
    }

    //공지글 삭제
    public void deleteNotice(Long id){
        System.out.println("<<< NoticeService - deleteNotice >>>");

        noticeRepository.deleteById(id);
    }
}

