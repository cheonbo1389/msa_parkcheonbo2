import React, { useEffect, useState  } from 'react';
import { Card, Container, Badge, Button  } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import '../../css/inquiry.css';

const AnswerList = () => {
    const [inquiryList, setInquirtList] = useState([]);
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();
    const typeText = {
        NOTANSWERED: "미답변",
        ANSWERED : "답변 완료"
    };

    const getInquiryList = () => {
        fetch("http://localhost:8081/community-service/inquiry/allmyinquiry",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }) 
        .then(res => res.json())
        .then(res => {
            console.log("API 응답:", res);
            setInquirtList(res);
        });
    };



    const createAnswer = (id) => {
        navigate(`/createanswer/${id}`)
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


    useEffect(() => {
        getInquiryList();
    }, [])


    
    if (!inquiryList) {
        return <div><Container>문의사항을 불러오는 중...</Container></div>;
    }

    return (
        <div>
        <Container>
            <br />
            <h3>문의/답변</h3>
            <Card>
            <Card.Body>
                <Table responsive  hover>
                <thead>
                        <tr>
                            <th>번호</th>
                            <th>문의 제목</th>
                            <th>문의 상태</th>
                            <th>날짜</th>
                            <th>답변 관리</th>
                        </tr>
                </thead>
                <tbody>    
                    {/* createdTime 순 정렬 */}
                {[...inquiryList]
                    .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
                    .map(inquiry =>
                        <tr
                            key={inquiry.id}
                            onClick={() => navigate(`/inquiryadmin/${inquiry.id}`)}
                        >
                            <td>{inquiry.id}</td>
                            <td className="inquiry-title">
                                {inquiry.title}
                            </td>
                            <td >
                                <Badge bg={inquiry.inquirystatus === "NOTANSWERED" ? "secondary" : "success"} className="inquiry-badge" >
                                    {typeText[inquiry.inquirystatus]}
                                </Badge>
                            </td>
                            <td>{inquiry.createdTime?.split("T")[0]}</td>
                            <td>
                                <Button variant="primary" className="me-1" onClick={(e) => { e.stopPropagation(); createAnswer(inquiry.id); }}>생성</Button>
                                <Button variant="warning" className="me-1" onClick={(e) => {e.stopPropagation(); updateAnswer(inquiry.id); }}>수정</Button>
                                <Button variant="danger" className="me-1" onClick={(e) => { e.stopPropagation(); deleteAnswer(inquiry.id); }}>삭제</Button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
                </Table>    
            </Card.Body>
            </Card>
        </Container>
    </div>
    );
};

export default AnswerList;