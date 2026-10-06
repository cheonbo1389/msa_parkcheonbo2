import { Card, Container,  Form, Button  } from 'react-bootstrap';
import React, { useEffect, useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AnswerCreate = () => {
    const { id } = useParams();
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState();
    const [answer, setAnswer ] = useState({
        title : '',
        content : '',
        adminid : '',
        inquiryid : id
    })


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
                setInquiry(res);
            });
        };
    
    useEffect(() => {
        getMyInquiry();
    }, [])

    const toInquiryList = () => {
        navigate("/answerlist");
    }

    const changeValue = (e) => {
        setAnswer({
            ...answer,
            [e.target.name] : e.target.value
        });
    }

    const submitToCreate = (e) => {
        e.preventDefault();
        fetch("http://localhost:8081/community-service/answer/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(answer)
        })
        .then((res) => {
            if (res.status === 201) {
                return res.json();
            }
            else if (res.status === 409) {
                throw new Error("CONFLICT");
            }
            else if(res.status === 403) {
                throw new Error("FORBIDDEN");
            }
            else {
                throw new Error(`답변 작성 실패: ${res.status}`);
            }
        })
        .then((res)  => {
            alert("답변 작성에 성공했습니다.");
            navigate(`/inquiryadmin/${id}`);
        })
        .catch((error) => {
            console.error("실패:", error);
            if(error.message === "CONFLICT"){
                alert("이미 작성된 답변이 존재합니다.");
            }else if (error.message === "FORBIDDEN") {
                alert("답변 작성 권한이 없습니다.");
            }else {
                alert("답변 작성에 실패했습니다.");
            }
        });
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
            </Card.Body>
            </Card>
            <br/>
            <Card>
            <Card.Body>
                <Card.Title>답변 작성</Card.Title>
                <hr />
                <Form onSubmit={submitToCreate}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" placeholder="답변 제목을 입력해주세요"  onChange={changeValue} name="title"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formContent">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" rows={10} placeholder="답변 내용을 입력해주세요" onChange={changeValue} name="content" />
                    </Form.Group>
                    <Button variant="primary" className="me-3" type="submit">작성</Button>   
                </Form>
            </Card.Body>
            </Card>
        <br />
        <Button variant="primary" onClick={toInquiryList}>문의목록</Button>
        </Container>
    </div>
    );
};

export default AnswerCreate;