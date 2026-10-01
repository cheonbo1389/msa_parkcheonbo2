import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Card, Container, Button} from 'react-bootstrap';


const NoticeDetail = () => {

    const { id } = useParams();
    const [notice, setNotice] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8081/community-service/notice/"+id,{
            method: "GET" 
        }) 
        .then(res => res.json())
        .then(res => {
            console.log("API 응답:", res);
            setNotice(res);
        });
    }, [])


    const toNotice = () => {
        navigate("/notice");
    }

    if (!notice) {
        return <div><Container>공지사항을 불러오는 중...</Container></div>;
    }

    return (
    <div>
        <Container>
            <br />
        <Card>
        <Card.Body>
            <Card.Title>{notice.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted small">등록일자 : {notice.createdTime?.split("T")[0]}</Card.Subtitle>
            <hr />
            <Card.Text>
            {notice.content}
            </Card.Text>
            <Button variant="primary" onClick={toNotice}>공지 목록</Button>
        </Card.Body>
        </Card>
        </Container>
    </div>
    );
};

export default NoticeDetail;