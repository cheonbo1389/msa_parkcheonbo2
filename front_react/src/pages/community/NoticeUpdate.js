import { Button, Form, Container} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const NoticeUpdate = () => {

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
    }, [id])

    const changeValue = (e) => {
        setNotice({
            ...notice,
            [e.target.name] : e.target.value
        });
    }


       const submitToUpdate = (e) => {
        e.preventDefault();
        fetch("http://localhost:8081/community-service/notice/update/"+ id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(notice)
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if (res.status === 403) {
                throw new Error("FORBIDDEN");
            }
             else {
                throw new Error(`공지글 등록 실패: ${res.status}`);
            }
        })
        .then((res)  => {
            alert("공지글 수정에 성공했습니다.");
            navigate("/notice/"+id);
        })
        .catch((error) => {
            console.error("실패:", error);
            if (error.message === "FORBIDDEN") {
                alert("공지글 수정 권한이 없습니다.");
            } else {
                alert("공지글 수정에 실패했습니다.");
            }
        });
    }

    //이전 페이지로
    const backpage = () => {
        navigate(-1);
    }

    if (!notice) {
        return <div><Container>기존 공지 내용을 불러오는 중...</Container></div>;
    }

    return (
        <div>
            <Container>
            <br />
            <h3>공지글 수정</h3>
            <Form onSubmit={submitToUpdate}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" placeholder="공지 제목을 입력해주세요"  onChange={changeValue} name="title" value={notice.title}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>공지 분류 선택</Form.Label>
                    <Form.Select aria-label="category select" onChange={changeValue} name="noticecategory" value={notice.noticecategory}>
                        <option value="NOTICE">공지</option>
                        <option value="EVENT">이벤트</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={10} placeholder="공지 내용을 입력해주세요" onChange={changeValue} name="content" value={notice.content} />
                </Form.Group>
                <Button variant="warning" className="me-3" onClick={backpage}>이전페이지로</Button>
                <Button variant="success" className="me-3" type="submit">작성</Button>   
            </Form>
            </Container>
        </div>
    );
};

export default NoticeUpdate;