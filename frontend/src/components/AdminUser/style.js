import { Upload } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled.h1`
	color: #000;
    font-size: 14px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload ant-upload-select {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-container {
        display: none
    }
    & .ant-upload-list-item {
        display: none;
    }
`