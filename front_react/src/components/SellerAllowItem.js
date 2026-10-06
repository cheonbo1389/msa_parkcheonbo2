import React from 'react';
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import { Button} from 'react-bootstrap';

const SellerAllowItem = (props) => {
    const {id, name, email ,category, status, memberId} = props.seller;
    const token = localStorage.getItem("Token");
    const statusText = {
        ALLOWED: "허용",
        DISALLOWED: "비허용",
        PENDING: "신청"
    };

    const changeStatusToAllowed = (e) => {
        if (!window.confirm("판매자 전환을 허가하시겠습니까?")) {
            return;
        }

        fetch("http://localhost:8081/member-service/member/sellerallow/"+id,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
                ,"Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.status === 200){

                return res.json();
            }else{
                return null;
            }   
        })
        .then((res) => {
            if(res != null){
                alert("판매자 전환을 허가했습니다.");
                window.location.reload();
            }else{
              alert("판매자 전환을 실패했습니다.");
            }
        })
        .catch((error) => {
            console.log('실패', error);
            
        })
    }

    const changeStatusToDisAllowed = () => {
        if (!window.confirm("판매자 전환을 비허가하시겠습니까?")) {
            return;
        }

        fetch("http://localhost:8081/member-service/member/sellerdisallow/"+id,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
                ,"Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.status === 204){
                
                return res.json();
            }else{
                return null;
            }   
        })
        .then((res) => {
            if(res != null){
                alert("판매자 전환 신청을 비허가했습니다.");
                window.location.reload();
            }else{
              alert("판매자 전환 신청을 비허가를 실패했습니다.");
            }
        })
        .catch((error) => {
            console.log('실패', error);
            
        })
    }

    return (
        <div>
            <Card>
                <Card.Body>               
                    <Card.Title>신청번호 : {id}</Card.Title>
                    <Card.Title>회원번호 : {memberId}</Card.Title>
                    <Card.Title>이름 : {name}</Card.Title>
                    <Card.Title>이메일 : {email}</Card.Title>
                    <Card.Title>제품 카테고리 : {category}</Card.Title>
                    <Card.Title>허가 상태 : {statusText[status]}</Card.Title>
                    <Button variant="primary" className="me-3" onClick={changeStatusToAllowed} disabled={status === "ALLOWED" || status === "DISALLOWED"}>허가</Button>
                    <Button variant="danger" className="me-3" onClick={changeStatusToDisAllowed} disabled={status === "ALLOWED" || status === "DISALLOWED"}>비허가</Button>
                    
                    </Card.Body>
            </Card>
            <br />
        </div>
    );
};

export default SellerAllowItem;