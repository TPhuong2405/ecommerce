import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        width: 200px;
        height: 200px;
    }
    position: relative;
`



export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);

`

export const WrapperReporText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137)
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`

export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-weight: 500;
    font-size: 16px;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-weight: 500;
    font-size: 12px;
`

export const WrapperStyleTextSell = styled.span`
    color: rgb(120, 120, 120);
    font-size: 15px;
    line-height: 24px; // chiều cao dòng
`