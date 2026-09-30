import React from 'react';
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import { Button} from 'react-bootstrap';


const MemberRoleItem = (props) => {
    const {Id, name, email, role} = props.member;
    const token = localStorage.getItem("Token");
    const roleText = {
        ADMIN: "관리자",
        USER: "일반 회원",
        SELLER: "판매자"
    };

    const changeRoleToUser = (e) => {
        if (!window.confirm("해당 회원를 일반 회원으로 전환하시겠습니까?")) {
            return;
        }

        fetch("http://localhost:8081/member-service/member/changetouser/"+Id,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
                ,"Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.status === 200){
                return res.text();
            }else{
                return null;
            }   
        })
        .then((res) => {
            if(res != null){
                alert("일반 회원 전환에 성공했습니다.");
                window.location.reload();
            }else{
              alert("일반 회원 전환에 실패했습니다.");
            }
        })
        .catch((error) => {
            console.log('실패', error);
            
        })
    }


    const changeRoleToSeller = (e) => {
        if (!window.confirm("해당 회원를 판매자 회원으로 전환하시겠습니까?")) {
            return;
        }

        fetch("http://localhost:8081/member-service/member/changetoseller/"+Id,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
                ,"Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.status === 200){
                return res.text();
            }else{
                return null;
            }   
        })
        .then((res) => {
            if(res != null){
                alert("판매자 전환에 성공했습니다.");
                window.location.reload();
            }else{
              alert("판매자 전환에 실패했습니다.");
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
                    <Card.Title>회원번호 : {Id}</Card.Title>
                    <Card.Title>회원 이름 : {name}</Card.Title>
                    <Card.Title>회원 이메일 : {email}</Card.Title>
                    <Card.Title>권한 : {roleText[role]}</Card.Title>
                    <Card>
                        <Card.Body>
                            <Card.Title>권한수정</Card.Title>
                            <Button variant="primary" className="me-3" onClick={changeRoleToUser} disabled={role === "ADMIN"}>일반회원</Button>
                            <Button variant="primary" className="me-3" onClick={changeRoleToSeller} disabled={role === "ADMIN"}>판매자</Button>
                        </Card.Body>
                    </Card>
                    
                    {/* <Button variant="primary" className="me-3" onClick={changeStatusToAllowed} disabled={status === "ALLOWED" || status === "DISALLOWED"}>허가</Button>
                    <Button variant="danger" className="me-3" onClick={changeStatusToDisAllowed} disabled={status === "ALLOWED" || status === "DISALLOWED"}>비허가</Button>
                     */}
                    </Card.Body>
            </Card>
            <br />
        </div>
    );
};

export default MemberRoleItem;