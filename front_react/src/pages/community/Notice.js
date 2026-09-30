import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import { Button} from 'react-bootstrap';




const Notice = () => {
    const [noticeList, setNoticeList] = useState([]);

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


    const check = () =>{
        console.log(noticeList);
        console.log(noticeList.length);
    }
    return (
    <div>
        <Container>
            <br />
            <h3>공지</h3>
            <Card>
                <Card.Body>    
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>번호</th>
                    <th>분류</th>
                    <th>제목</th>
                    <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td></td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
                </Table>
                </Card.Body>
            <Button variant="primary" className="me-3" onClick={check} >허가</Button>
                
            </Card>
        </Container>
    </div>
    );
};

export default Notice;