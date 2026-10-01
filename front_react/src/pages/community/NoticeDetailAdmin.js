import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Card, Container, Button} from 'react-bootstrap';


const NoticeDetailAdmin = () => {

    const { id } = useParams();
    const [notice, setNotice] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");

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

    const updateNotice = () => {
        navigate(`/noticeupdate/${id}`)
    }


    const deleteNotice = (e) => {
        e.preventDefault();

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
            navigate("/notice");
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
            <Button variant="primary"  className="me-3" onClick={toNotice}>공지 목록</Button>
            <Button variant="warning" className="me-3" onClick={updateNotice}>수정</Button>
            <Button variant="danger" className="me-3" onClick={deleteNotice}>삭제</Button>
        </Card.Body>
        </Card>
        </Container>
    </div>
    );
};

export default NoticeDetailAdmin;