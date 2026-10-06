package com.example.msa.inquiry.controller;


import com.example.msa.inquiry.domain.Answer;
import com.example.msa.inquiry.dto.AnswerSaveReqDto;
import com.example.msa.inquiry.service.AnswerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/answer")
public class AnswerController {
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    //문의 답변 작성
    @PostMapping("/create")
    public ResponseEntity<?> answerCreate(@RequestHeader("X-User-Id") String userid,
                                          @RequestHeader("X-User-Role") String userRole,
                                          @RequestBody AnswerSaveReqDto answerSaveReqDto){
        System.out.println("<<< AnswerController - /create >>>");

        if (!userRole.equals("ROLE_ADMIN")){
//            403 전달
            return new ResponseEntity<>(userRole,HttpStatus.FORBIDDEN);
        }

        // 이미 답변이 존재하는지 확인
        if (answerService.existsAnswer(answerSaveReqDto.getInquiryid())) {
            //409 Conflict(충돌)
            return new ResponseEntity<>(answerSaveReqDto.getInquiryid(), HttpStatus.CONFLICT);
        }

        answerSaveReqDto.setAdminid(Long.valueOf(userid));

        return new ResponseEntity<>(answerService.saveAnswer(answerSaveReqDto), HttpStatus.CREATED);
    }

    //문의 답변 조회
    @GetMapping("/selectanswer/{id}")
    public ResponseEntity<?> answerGet(@PathVariable Long id){
        System.out.println("<<< AnswerController - /selectanswer >>>");

        return new ResponseEntity<>(answerService.getAnswer(id), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> answerUpdate(@RequestHeader("X-User-Id") String userid,
                                          @RequestHeader("X-User-Role") String userRole,
                                          @RequestBody AnswerSaveReqDto answerSaveReqDto){
        System.out.println("<<< AnswerController - /update >>>");

        if (!userRole.equals("ROLE_ADMIN")){
//            403 전달
            return new ResponseEntity<>(userRole,HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(answerService.updateAnswer(answerSaveReqDto), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> answerDelete(@RequestHeader("X-User-Role") String userRole,
                                          @PathVariable Long id){
        System.out.println("<<< AnswerController - /delete >>>");

        if (!userRole.equals("ROLE_ADMIN")){
//            403 전달
            return new ResponseEntity<>(userRole,HttpStatus.FORBIDDEN);
        }


        return new ResponseEntity<>(answerService.deleteAnswer(id), HttpStatus.OK);
    }
}
