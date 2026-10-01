

깃허브
프로젝트
https://github.com/cheonbo1389/msa_parkcheonbo2.git

config
https://github.com/cheonbo1389/ibm05_spring_cloud_config2.git




-------------------------------------------------------

db생성
create database memberdb character set utf8;
create database orderingdb character set utf8;
create database productdb character set utf8;
create database communitydb character set utf8;


-------------------------------------------------------------------
DDL 


CREATE TABLE `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER', 'SELLER') DEFAULT NULL,
  `created_time` datetime(6) NOT NULL,
  `updated_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKmbmcqelty0fbrvxp1q58dn57t` (`email`)
)

CREATE TABLE `seller_application` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `status` enum('ALLOWED', 'DISALLOWED', 'PENDING') DEFAULT NULL,
  `created_time` datetime(6) NOT NULL,
  `updated_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `ordering` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_status` enum('CANCELED','ORDERED') DEFAULT NULL,
  `created_time` datetime(6) NOT NULL,
  `updated_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
)


CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  `member_id` bigint(20) NOT NULL,
  `product_status` enum('ALLOWED', 'DISALLOWED') DEFAULT NULL,
  `created_time` datetime(6) NOT NULL,
  `updated_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
)




-------------------------------------------------------------------

0926 해야할일
1. db 분리 - 완료
2. ddl 작성 - 완료
3. 테이블 명세서
4. 관리자 기능 3개 이상
    - 판매자 판매 물품 허용/정지 >> 완료
    - 판매자 계정 등록
    - 공지/이벤트 게시글 생성 및 관리
    - 문의하기/답변
5. 할수 있다면 여러상품 주문




-------------------------------
판매자 판매 물품 허용/비허용 >> 완료
- product > domain 에 ProductStatus 추가 >> 완료
내용
Allowed, Disallowed

허용/비허용
ALLOWED
DISALLOWED


public enum ProductStatus {
    ALLOWED,DISALLOWED
}


- product에 추가 >> 완료
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ProductStatus productStatus = ProductStatus.DISALLOWED;


- ddl 변경 >> 완료
productStatus 추가


(1) 관리자가 Disallowed > Allowed로 변경하는 기능 - 완료
    - 모든 제품 가져와서 버튼 누르면 2개중 하나로 변경하는 기능
    

(2) 제품 리스트 가져올때, Allowed인 제품들만 가져와야함. - 완료


-----------------------------------------------------------------
- 판매자 계정 등록

public enum Role { >> 완료
    ADMIN, USER
}
에 SELLER 추가

멤버 ddl 변경 >> 완료


멤버db에 신청 테이블 추가 >> 완료
CREATE TABLE `seller_application` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `category` varchar(255) NOT NULL,
  `status` enum('ALLOWED', 'DISALLOWED', 'PENDING') DEFAULT NULL,
  `created_time` datetime(6) NOT NULL,
  `updated_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
);
public enum Status { >> 완료
    ALLOWED, DISALLOWED
}


SellerApplication 클래스 생성 >> 완료

SellerApplyRepository 생성 >> 완료

판매자 신청 요청
멤버 컨트롤러 - sellerapply 추가
멤버 서비스 - sellerapply 추가
>> 완료


판매자 신청 프론트 작업 시작
SellerForm.js
>> 완료

남은거
>> 신청자 이름, 이메일도 db에 같이 넣는 방식으로 변경?
>> 테이블 변경완료
>> 백, 프론트 변경 완료

관리자가 판매자 허용
>> 완료
>> 허가/비허가시 버튼 비활성화 시키는 것 추가했음
>> 강제 USER/SELLER 전환 기능 추가 완료

판매자가 아닐때, 제품 추가 기능 접근시 접근 불가로 하기
>> 완료

-----------------------------------------------------------------
- 문의하기/답변
- 공지/이벤트 게시글 생성 및 관리

- 문의 
- 답변
- 공지
- 이벤트

community-service 로 묶기
 ├─ inquiry 
 │   ├─ Inquiry
 │   ├─ Answer
 │   └─ InquiryStatus
 │
 ├─ notice
 │   └─ Notice
 │
 └─ event
     └─ Event

apigateway - yml 파일 추가
            - id: community-service
              predicates:
                - Path=/community-service/**
              filters:
                - StripPrefix=1
              uri: lb://community-service


깃허브 config 추가
https://github.com/cheonbo1389/ibm05_spring_cloud_config2.git

community-service.yam

server:
  port: 8090

spring :
  datasource:
    driver-class-name: org.mariadb.jdbc.Driver
    url: jdbc:mariadb://localhost:3306/communitydb
    username: root
    password: admin



db 생성
create database communitydb character set utf8;

테이블 ddl
CREATE TABLE `notice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` TEXT NOT NULL,
  `adminid` bigint(20) NOT NULL,
  `noticecategory` enum('NOTICE', 'EVENT') DEFAULT NULL,
  `created_time` datetime(6) NOT NULL,
  `updated_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
)


community 서버 추가
서버 동작 확인완료
포스트맨에서 공지글추가 및 조회 테스트 완료
프론트에서 공지글 조회/추가 작업 진행
<!-- 참고 -->
<!-- https://react-bootstrap.netlify.app/docs/components/table -->

공지글 전체 조회는 완료

남은거
공지 상세 조회 >> 완료

공지 추가 >> 완료

>> 관리자만 형태 다른 페이지 추가중 >> 완료
공지 수정 >> 완료
공지 삭제 >> 기능완료. 프론트 리턴 받는부분 수정해야함

문의하기
답변