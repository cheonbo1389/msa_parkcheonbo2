import { React, useState, useEffect} from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

const SellerForm = () => {
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();

    const [myinfo, setMyinfo] = useState({
        'Id' : '',
        'email' : '',
        'name' : ''
    });
    
    const [seller, setSeller ] = useState({
        memberId : '',
        name: '',
        email: '',
        category : ''
    });
    
    useEffect(() => {
        fetch("http://localhost:8081/member-service/member/mypage",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }) 
        .then(res => res.json())
        .then(res => {
            setMyinfo(res);
        });
    }, []);


    const changeValue = (e) => {
        setSeller({
            ...seller,
            memberId : myinfo.Id,
            name : myinfo.name,
            email : myinfo.email,
            [e.target.name] : e.target.value
        });
    }

    const sellerSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8081/member-service/member/sellerapply",
        { 
          method : "POST",
          headers : {
            "Content-Type" : "application/json;charset-utf-8",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(seller)
        })
        .then((res) => {
            if(res.status === 200){
                return res.json();
            }else{
                return null;
            }   
        })
        .then((res) => {
            if(res != null){
            console.log(res);
            
              alert("판매자 신청에 성공했습니다.");
              navigate('/home');
            }else{
              alert("판매자 신청에 실패했습니다.");
            }
        })
        .catch((error) => {
            console.log('실패', error);
            
        })
    }
    

    return (
    <Container>
      <br />
      <h3>판매자 신청</h3>
      <Form onSubmit={sellerSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="이메일을 입력해주세요"  value={myinfo.email} name="email" disabled/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" placeholder="이름를 입력해주세요" value={myinfo.name} name="name" disabled/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>판매 카테고리</Form.Label>
          <Form.Control type="text" placeholder="주 판매 카테고리를 입력해주세요" onChange={changeValue} name="category" />
        </Form.Group>

        <Button variant="primary" type="submit">
          신청
        </Button>
      </Form>
    </Container>
    );
};

export default SellerForm;