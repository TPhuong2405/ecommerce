import styled from 'styled-components';

export const WrapperLableText = styled.div`
    color: rgb(56, 56, 61);
    font-weight: 500;
    font-size: 14px;
`

export const WrapperTextValue = styled.span`
    color: rgb(56, 56, 61);
    font-weight: 400;
    font-size: 12px;
`

export const WrapperContent = styled.div`
    display: flex;
    // align-items: center;
    flex-direction: column; // đổin từ row sang column
    gap: 12px;
    
`
export const WrapperTextPrice = styled.div`
    padding: 4px;
    color: rgb(56, 56, 61); 
    border-radius: 10px;
    background-color: rgb(238, 238, 238);
    width: fit-content // để tự động điều chỉnh chiều rộng theo nội dung
`


