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
    public ResponseEntity<?> noticeCreate(@RequestHeader("X-User-Id") String adminId,  @RequestHeader("X-User-Role") String userRole, @RequestBody NoticeSaveReqDto noticeSaveReqDto){
        System.out.println("<<< NoticeController - /create >>>");


        if (!userRole.equals("ROLE_ADMIN")){
//            403 전달
            return new ResponseEntity<>(userRole,HttpStatus.FORBIDDEN);
        }

        noticeSaveReqDto.setAdminid(Long.valueOf(adminId));

        return new ResponseEntity<>(noticeService.saveNotice(noticeSaveReqDto), HttpStatus.CREATED);
    }

    //공지글 조회
    @GetMapping("/allnotice")
    public ResponseEntity<?> noticeGetAll() {
        System.out.println("<<< NoticeController - /allnotice >>>");

        return new ResponseEntity<>(noticeService.getAllNotice(),HttpStatus.OK);
    }

    //공지글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> noticeDetail(@PathVariable Long id) {
        System.out.println("<<< NoticeController - /noticeDetail >>>");

        return new ResponseEntity<>(noticeService.getNoticeDetail(id),HttpStatus.OK);
    }


    //공지글 수정
    @PutMapping("/update/{id}")
    public ResponseEntity<?> noticeUpdate(@RequestHeader("X-User-Id") String adminId,  @RequestHeader("X-User-Role") String userRole, @PathVariable Long id, @RequestBody NoticeSaveReqDto noticeSaveReqDto){
        System.out.println("<<< NoticeController - /update >>>");


        if (!userRole.equals("ROLE_ADMIN")){
//            403 전달
            return new ResponseEntity<>("권한없음",HttpStatus.FORBIDDEN);
        }

        noticeSaveReqDto.setAdminid(Long.valueOf(adminId));

        return new ResponseEntity<>(noticeService.updateNotice(id, noticeSaveReqDto), HttpStatus.OK);
    }

    //공지글 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> noticeDelete(@RequestHeader("X-User-Role") String userRole, @PathVariable Long id) {

        if (!userRole.equals("ROLE_ADMIN")){
//            403 전달
            return new ResponseEntity<>("권한없음",HttpStatus.FORBIDDEN);
        }

        noticeService.deleteNotice(id);

        return new ResponseEntity<>(id,HttpStatus.OK);
    }
}
