import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SellerAllowItem from '../../components/SellerAllowItem';

const SellerAllow = () => {
    const [sellerlist, setSellerlist] = useState([]);
    const token = localStorage.getItem("Token");

    useEffect(() => {
        fetch("http://localhost:8081/member-service/member/sellerlist",{
            method: "GET" ,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }) 
        .then(res => res.json())
        .then(res => {
            console.log(res);
            
            setSellerlist(res); 
        });
    }, [])

    return (
        <div>
            <Container> 
                <br />
                <h3>판매자 신청 리스트</h3>
                <br />
                {sellerlist.map(seller => 
                    <SellerAllowItem key={seller.id} seller={seller}/> )
                }
            </Container>
        </div>
    );
};

export default SellerAllow;


