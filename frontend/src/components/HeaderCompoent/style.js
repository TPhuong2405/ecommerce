import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: rgb(26, 148, 255);
    align-items: center; // căn giữa các phần tử theo chiều dọc
    gap: 16px;
    flex-wrap: nowrap; // cho phép các phần tử con xuống dòng nếu không đủ chỗ
    width: 1270px;
    padding: 10px 0; // khoảng cách trên và dưới
`

export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: blod; 
    // text-align: center;
    text-align: left; // căn chỉnh văn bản sang bên trái
`

export const WrapperHeaderAccount = styled.div`
    display: flex; // hiển thị các phần tử con theo hàng ngang
    align-items: center;
    color: #fff;
    gap: 10px; // khoảng cách giữa các phần tử
    // font-size: 12px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    // white-space: nowrap; // không cho phép xuống dòng
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        background: rgb(26, 148, 255);
        color: #fff
    }
`







