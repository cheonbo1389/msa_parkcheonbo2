import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Card, Container, Button} from 'react-bootstrap';

const Inquiry = () => {
    const { id } = useParams();
    const [inquiry, setInquiry] = useState();
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();

    const getMyInquiry = () => {
            fetch("http://localhost:8081/community-service/inquiry/myinquiry/"+id,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }) 
            .then(res => res.json())
            .then(res => {
                console.log("API 응답:", res);
                setInquiry(res);
            });
        };
    
    useEffect(() => {
        getMyInquiry();
    }, [])


    const toInquiryList = () => {
        navigate("/myinquiry");
    }

    if (!inquiry) {
        return <div><Container>문의사항을 불러오는 중...</Container></div>;
    }

    return (
    <div>
        <Container>
            <br />
        <Card>
        <Card.Body>
            <Card.Title>{inquiry.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted small">등록일자 : {inquiry.createdTime?.split("T")[0]}</Card.Subtitle>
            <hr />
            <Card.Text>
            {inquiry.content}
            </Card.Text>
            <hr />
            <Button variant="primary" onClick={toInquiryList}>문의목록</Button>
        </Card.Body>
        </Card>
        </Container>
    </div>
    );
};

export default Inquiry;