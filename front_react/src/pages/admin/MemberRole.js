import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import MemberRoleItem from '../../components/MemberRoleItem';

const MemberRole = () => {
    const [memberlist, setMemberlist] = useState([]);
    const token = localStorage.getItem("Token");

    useEffect(() => {
        fetch("http://localhost:8081/member-service/member/allmemberlist",{
            method: "GET" ,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }) 
        .then(res => res.json())
        .then(res => {
            setMemberlist(res); 
        });
    }, [])

    return (
        <div>
            <Container> 
                <br />
                <h3>전체 회원 리스트</h3>
                <br />
                {memberlist.map(member => 
                    <MemberRoleItem key={member.Id} member={member}/> )
                }
            </Container>
        </div>
    );
};

export default MemberRole;