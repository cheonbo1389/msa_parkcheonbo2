package com.example.msa.inquiry.controller;


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

        answerSaveReqDto.setAdminid(Long.valueOf(userid));

        return new ResponseEntity<>(answerService.saveAnswer(answerSaveReqDto), HttpStatus.CREATED);
    }


}
