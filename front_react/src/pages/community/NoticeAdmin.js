import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import '../../css/notice.css';



const NoticeAdmin = () => {
    const [noticeList, setNoticeList] = useState([]);
    const navigate = useNavigate();
    const typeText = {
        NOTICE: "공지",
        EVENT : "이벤트"
    };


    useEffect(() => {
        fetch("http://localhost:8081/community-service/notice/allnotice",{
            method: "GET" 
        }) 
        .then(res => res.json())
        .then(res => {
            console.log("API 응답:", res);
            setNoticeList(res);
                
        });
    }, [])


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
                        <th></th>
                        <th></th>
                        </tr>
                </thead>
                <tbody>    
                    {/* {noticeList.map(notice => 
                        <tr key={notice.id} onClick={() => navigate(`/notice/${notice.id}`)}>
                            <td>{notice.id}</td>
                            <td>{typeText[notice.noticecategory]}</td>
                            <td className="notice-title" >
                                {notice.title}
                            </td>
                            <td>{notice.createdTime?.split("T")[0]}</td>
                            
                        </tr>                 
                    )} */}

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