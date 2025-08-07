import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center; // Căn giữa các phần tử theo chiều dọc
    gap: 24px; // Khoảng cách giữa các phần tử
    justify-content: flex-start; // Căn giữa các phần tử theo chiều ngang
    height: 44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: rgb(13, 92, 182);
        span {
          color: #fff;
        }
    }
    width: 100%;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;  
`