import styled from "styled-components";
import { Col, Image, InputNumber } from "antd";

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`

export const WrapperStyleColImall = styled(Col)`
    flex-basis: unset; // khởi tạo lại giá trị flex-basis
    display: flex;
`

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 300; // độ đậm của chữ
    line-height: 32px; // chiều cao dòng
    word-break: break-word; // ngắt chữ khi quá dài
`

export const WrapperStyleTextSell = styled.span`
    color: rgb(120, 120, 120);
    font-size: 15px;
    line-height: 24px; // chiều cao dòng
`

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500; 
    padding: 10px;
    margin-top: 10px;
`

export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline; // gạch chân
        font-size: 15px;
        line-height: 24px;
        font-weight: 500; 
        white-space: nowrap; // không ngắt dòng
        overflow: hidden; // ẩn phần thừa
        text-overflow: ellipsis; // hiển thị dấu ba chấm khi quá dài
    };
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;    
    }
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

// ...existing code...
export const WrapperInputNumber = styled(InputNumber)`
    width: 60px !important;
    border-top: none;
    border-bottom: none;
    
    /* Ẩn nút tăng giảm của Ant Design */
    .ant-input-number-handler-wrap {
        display: none !important;
    }
`
// ...existing code... 
