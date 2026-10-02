import React, { useEffect, useState  } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import '../../css/notice.css';



const NoticeAdmin = () => {
    const [noticeList, setNoticeList] = useState([]);
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();
    const typeText = {
        NOTICE: "공지",
        EVENT : "이벤트"
    };

    const getNoticeList = () => {
        fetch("http://localhost:8081/community-service/notice/allnotice",{
            method: "GET" 
        }) 
        .then(res => res.json())
        .then(res => {
            console.log("API 응답:", res);
            setNoticeList(res);
                
        });
    };

    useEffect(() => {
        getNoticeList();
    }, [])


    const updateNotice = (id) => {
        navigate(`/noticeupdate/${id}`)
    }


    const deleteNotice = (id) => {

        if (!window.confirm("공지글을 삭제하시겠습니까?")) {
            return;
        }

        fetch("http://localhost:8081/community-service/notice/delete/"+ id, {
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
                throw new Error(`공지글 삭제 실패: ${res.status}`);
            }
        })
        .then((res)  => {
            alert("공지글 삭제에 성공했습니다.");
            getNoticeList();
        })
        .catch((error) => {
            console.error("실패:", error);
            if (error.message === "FORBIDDEN") {
                alert("공지글 삭제 권한이 없습니다.");
            } else {
                alert("공지글 삭제에 실패했습니다.");
            }
        });
    }



    return (
    <div>
        <Container>
            <br />
            <h3>공지</h3>
            <Card>
            <Card.Body>
                <Table responsive  hover>
                <thead>
                        <tr>
                            <th>번호</th>
                            <th>분류</th>
                            <th>제목</th>
                            <th>날짜</th>
                            <th>관리</th>
                        </tr>
                </thead>
                <tbody>    
                    {/* createdTime 순 정렬 */}
                {[...noticeList]
                    .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
                    .map(notice =>
                        <tr
                            key={notice.id}
                            onClick={() => navigate(`/noticeadmin/${notice.id}`)}
                        >
                            <td>{notice.id}</td>
                            <td>{typeText[notice.noticecategory]}</td>
                            <td className="notice-title">
                                {notice.title}
                            </td>
                            <td>{notice.createdTime?.split("T")[0]}</td>
                            <td>
                            <Button variant="warning" className="me-3" onClick={(e) => {e.stopPropagation(); updateNotice(notice.id); }}>수정</Button>
                            <Button variant="danger" className="me-3" onClick={(e) => { e.stopPropagation(); deleteNotice(notice.id); }}>삭제</Button>
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

export default NoticeAdmin;