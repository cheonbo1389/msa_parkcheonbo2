import React, { useEffect, useState  } from 'react';
import { Card, Container, Badge  } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import '../../css/inquiry.css';


const InquiryList = () => {
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
            <h3>내 문의하기 목록</h3>
            <Card>
            <Card.Body>
                <Table responsive  hover>
                <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>문의상태</th>
                            <th>날짜</th>
                        </tr>
                </thead>
                <tbody>    
                    {/* createdTime 순 정렬 */}
                {[...inquiryList]
                    .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
                    .map(inquiry =>
                        <tr
                            key={inquiry.id}
                            onClick={() => navigate(`/inquiry/${inquiry.id}`)}
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

export default InquiryList;