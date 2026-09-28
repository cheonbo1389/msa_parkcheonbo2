import React from 'react';
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import { Button} from 'react-bootstrap';

const ProductAllowItem = (props) => {
    const  { id, name, price, productStatus, stockQuantity} = props.product
    const member = props.member; 
    const token = localStorage.getItem("Token");
    const statusText = {
        ALLOWED: "허용",
        DISALLOWED: "비허용",
        PROHIBITED: "판매금지"
    };

    const changeStatusToAllowed = (e) => {
        fetch("http://localhost:8081/product-service/product/productallow/"+id,{
            method : "POST",
            headers: {
                "Content-Type": "application/json"
                ,"Authorization": `Bearer ${token}`
            }
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
                alert("제품 판매 허용에 성공했습니다.");
                window.location.reload();
            }else{
              alert("제품 판매 허용에 실패했습니다.");
            }
        })
        .catch((error) => {
            console.log('실패', error);
            
        })
    }

    const changeStatusToDisAllowed = () => {
                fetch("http://localhost:8081/product-service/product/productdisallow/"+id,{
            method : "POST",
            headers: {
                "Content-Type": "application/json"
                ,"Authorization": `Bearer ${token}`
            }
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
                alert("제품 판매 비허용에 성공했습니다.");
                window.location.reload();
            }else{
              alert("제품 판매 비허용에 실패했습니다.");
            }
        })
        .catch((error) => {
            console.log('실패', error);
            
        })
    }

    return (
        <div>
            <Card>
                <Card.Body>               
                    <Card.Title>제품번호 : {id}</Card.Title>
                    <Card.Title>제품명 : {name}</Card.Title>
                    <Card.Title>제품가격 : {price}</Card.Title>
                    <Card.Title>재고 : {stockQuantity}</Card.Title>
                    <Card.Title>제품 허가 상태 : {statusText[productStatus]}</Card.Title>
                    <Card.Title>판매자 : {member?.name}</Card.Title>


                    <Button variant="primary" className="me-3" onClick={changeStatusToAllowed}>허용</Button>
                    <Button variant="danger" className="me-3" onClick={changeStatusToDisAllowed}>비허용</Button>
                    
                    </Card.Body>
            </Card>
            <br />
        </div>
    );
};

export default ProductAllowItem;