import { Button, Form, Container} from 'react-bootstrap';
import React,{useState} from 'react';
import {  useNavigate } from 'react-router-dom';


const NoticeCreate = () => {
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();

    const [notice, setNotice ] = useState({
        title : '',
        content : '',
        noticecategory: 'NOTICE'
    })


    const changeValue = (e) => {
        setNotice({
            ...notice,
            [e.target.name] : e.target.value
        });
    }


    const submitToCreate = (e) => {
        e.preventDefault();
        fetch("http://localhost:8081/community-service/notice/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(notice)
        })
        .then((res) => {
            if (res.status === 201) {
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
            alert("공지글 등록에 성공했습니다.");
            navigate("/noticeadmin");
        })
        .catch((error) => {
            console.error("실패:", error);
            if (error.message === "FORBIDDEN") {
                alert("공지글 등록 권한이 없습니다.");
            } else {
                alert("공지글 등록에 실패했습니다.");
            }
        });
    }


    return (
        <div>
            <Container>
            <br />
            <h3>공지글 작성</h3>
            <Form onSubmit={submitToCreate}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" placeholder="공지 제목을 입력해주세요"  onChange={changeValue} name="title"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>공지 분류 선택</Form.Label>
                    <Form.Select aria-label="category select" onChange={changeValue} name="noticecategory" >
                        <option value="NOTICE">공지</option>
                        <option value="EVENT">이벤트</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={10} placeholder="공지 내용을 입력해주세요" onChange={changeValue} name="content" />
                </Form.Group>
                <Button variant="success" className="me-3" type="submit">작성</Button>   
            </Form>
            </Container>
        </div>
    );
};

export default NoticeCreate;