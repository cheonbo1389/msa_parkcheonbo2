show tables;
select * from `member` m ;

create database memberdb character set utf8;
create database orderingdb character set utf8;
create database productdb character set utf8;
create database communitydb character set utf8;

show tables;
drop table inquiry;
drop table notice;



-- 공지 ddl
CREATE TABLE `notice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` TEXT NOT NULL,
  `adminid` bigint(20) NOT NULL,
  `noticecategory` enum('NOTICE', 'EVENT') DEFAULT NULL,
  `created_time` datetime(6) NOT NULL,
  `updated_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
);


-- 문의 ddl
CREATE TABLE inquiry (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  content TEXT NOT NULL,
  userid bigint(20) NOT NULL,
  inquirystatus enum('NOTANSWERED', 'ANSWERED') NOT NULL,
  created_time datetime(6) NOT NULL,
  updated_time datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
);

-- 답변 ddl
CREATE TABLE answer (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  content TEXT NOT NULL,
  adminid bigint(20) NOT NULL,
  inquiryid bigint(20) NOT NULL,
  created_time datetime(6) NOT NULL,
  updated_time datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
);



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

CREATE TABLE `seller_application` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `category` varchar(255) NOT NULL,
  `status` enum('ALLOWED', 'DISALLOWED') DEFAULT NULL,
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

drop table product ;