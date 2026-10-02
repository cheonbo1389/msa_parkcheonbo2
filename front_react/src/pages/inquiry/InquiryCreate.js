import { Button, Form, Container} from 'react-bootstrap';
import React,{useState} from 'react';
import {  useNavigate } from 'react-router-dom';


const InquiryCreate = () => {
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();
    const [inquiry, setInquiry ] = useState({
        title : '',
        content : ''
    })

    const changeValue = (e) => {
        setInquiry({
            ...inquiry,
            [e.target.name] : e.target.value
        });
    }

    const submitToCreate = (e) => {
        e.preventDefault();
        fetch("http://localhost:8081/community-service/inquiry/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(inquiry)
        })
        .then((res) => {
            if (res.status === 201) {
                return res.json();
            }
             else {
                throw new Error(`문의하기 실패: ${res.status}`);
            }
        })
        .then((res)  => {
            alert("문의하기에 성공했습니다.");
            navigate("/myinquiry");
        })
        .catch((error) => {
            console.error("실패:", error);
            alert("문의하기에 실패했습니다.");
        });
    }

    return (
        <div>
            <Container>
            <br />
            <h3>문의하기</h3>
            <Form onSubmit={submitToCreate}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" placeholder="문의사항 제목을 입력해주세요"  onChange={changeValue} name="title"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={10} placeholder="문의사항 내용을 입력해주세요" onChange={changeValue} name="content" />
                </Form.Group>
                <Button variant="success" className="me-3" type="submit">작성</Button>   
            </Form>
            </Container>
        </div>
    );
};

export default InquiryCreate;