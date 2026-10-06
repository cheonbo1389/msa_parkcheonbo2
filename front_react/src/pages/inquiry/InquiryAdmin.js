import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Card, Container, Button} from 'react-bootstrap';


const InquiryAdmin = () => {
    const { id } = useParams();
    const [inquiry, setInquiry] = useState();
    const [answer, setAnswer ] = useState();
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
                if(res.inquirystatus === "ANSWERED"){
                    console.log("답변 완료");
                    fetch("http://localhost:8081/community-service/answer/selectanswer/"+id,{
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                        }) 
                        .then(res2 => res2.json())
                        .then(res2 => {
                            console.log("API 응답2:", res2);
                            setAnswer(res2);
                    });
                };
            });

        };
    
    useEffect(() => {
        getMyInquiry();
    }, [])


    const toInquiryList = () => {
        navigate("/answerlist");
    }

    
    const updateAnswer = (id) => {
        navigate(`/updateanswer/${id}`)
    }

    const deleteAnswer = (id) => {
        if (!window.confirm("해당 답변을 삭제하시겠습니까?")) {
            return;
        }
        fetch("http://localhost:8081/community-service/answer/delete/"+id,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if (res.status === 403) {
                throw new Error("FORBIDDEN");
            }
             else {
                throw new Error(`답변 삭제 실패: ${res.status}`);
            }
        })
        .then((res)  => {
            alert("답변 삭제에 성공했습니다.");
            window.location.reload();
        })
        .catch((error) => {
            console.error("실패:", error);
            if (error.message === "FORBIDDEN") {
                alert("답변 삭제 권한이 없습니다.");
            } else {
                alert("답변 삭제에 실패했습니다.");
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
                <Button variant="primary" onClick={toInquiryList}>문의목록</Button>
            </Card.Body>
            </Card>
            {answer && (
                <>
                    <br />
                    <Card>
                        <Card.Body>
                            <Card.Title>{answer.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted small">
                                등록일자 : {answer.createdTime?.split("T")[0]}
                            </Card.Subtitle>
                            <hr />
                            <Card.Text>
                                {answer.content}
                            </Card.Text>
                            <hr />
                            <Button variant="warning" className="me-1" onClick={(e) => {e.stopPropagation(); updateAnswer(inquiry.id); }}>수정</Button>
                            <Button variant="danger" className="me-1" onClick={(e) => { e.stopPropagation(); deleteAnswer(inquiry.id); }}>삭제</Button>
                        </Card.Body>
                    </Card>
                </>
            )}
        </Container>
    </div>
    );
};

export default InquiryAdmin;