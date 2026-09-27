db생성
create database memberdb character set utf8;
create database orderingdb character set utf8;
create database productdb character set utf8;


-------------------------------------------------------------------
DDL 


CREATE TABLE `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `created_time` datetime(6) NOT NULL,
  `updated_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKmbmcqelty0fbrvxp1q58dn57t` (`email`)
)

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
  `product_status` enum('ALLOWED', 'DISALLOWED', 'PROHIBITED') DEFAULT NULL,
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
    - 판매자 판매 물품 허용/정지
    - 공지/이벤트 게시글 생성 및 관리
    - 문의하기/답변
5. 할수 있다면 여러상품 주문




-------------------------------
판매자 판매 물품 허용/비허용
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


(1) 관리자가 Disallowed > Allowed로 변경하는 기능 - 진행 중
    - 모든 제품 가져와서 버튼 누르면 2개중 하나로 변경하는 기능

(2) 제품 리스트 가져올때, Allowed인 제품들만 가져와야함.


---------------------------------------------------------------------------------------------------------------


- 공지/이벤트 게시글 생성 및 관리

- 문의하기/답변