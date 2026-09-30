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

}

