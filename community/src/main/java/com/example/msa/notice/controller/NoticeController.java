package com.example.msa.notice.controller;


import com.example.msa.notice.dto.NoticeSaveReqDto;
import com.example.msa.notice.service.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/notice")
public class NoticeController {
    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    //공지글 작성
    @PostMapping("/create")
    public ResponseEntity<?> noticeCreate(@RequestBody NoticeSaveReqDto noticeSaveReqDto){
        System.out.println("<<< NoticeController - /create >>>");

        return new ResponseEntity<>(noticeService.saveNotice(noticeSaveReqDto), HttpStatus.CREATED);
    }

    //공지글 조회
    @GetMapping("/allnotice")
    public ResponseEntity<?> noticeGetAll() {
        System.out.println("<<< NoticeController - /allnotice >>>");

        return new ResponseEntity<>(noticeService.getAllNotice(),HttpStatus.OK);
    }
}
