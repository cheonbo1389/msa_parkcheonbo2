import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProductAllowItem from '../../components/ProductAllowItem';

const ProductAllow = () => {
    const [productList, setProductList] = useState([]);
    const [member, setMember] =  useState();
    const token = localStorage.getItem("Token");

    useEffect(() => {
        fetch("http://localhost:8081/product-service/product/list",{
            method: "GET" 
        }) 
        .then(res => res.json())
        .then(res => {
            console.log(res);
            
            setProductList(res); 

            fetch("http://localhost:8081/member-service/member/mypage",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            }) 
            .then(res2 => res2.json())
            .then(res2 => {
                setMember(res2); 
            });
        });
    }, [])

    return (
        <div>
            <Container> 
                <br />
                <h3>제품 리스트</h3>
                <br />
                {productList.map(product => 
                    <ProductAllowItem key={product.id} product={product} member={member}/> )
                }
            </Container>
        </div>
    );
};

export default ProductAllow;


