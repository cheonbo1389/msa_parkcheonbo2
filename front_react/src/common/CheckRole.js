import { Navigate } from "react-router-dom";

//일반 유저 체크
function CheckRole({ children }) {
    const role = localStorage.getItem("role");

    if (role == "USER") {
        alert("판매 권한이 없습니다.");
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default CheckRole;