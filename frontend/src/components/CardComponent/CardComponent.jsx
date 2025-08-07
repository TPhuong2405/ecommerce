import React from 'react'
import { StarFilled } from '@ant-design/icons'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText, WrapperStyleTextSell } from './style'
import logo from '../../assets/images/logo.png'
import { useNavigate } from "react-router-dom";


const CardComponent = (props) => {
  const {countInstock, description, image, name, price, rating, type, selled, discount, id} = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  
  return (
    <WrapperCardStyle
        hoverable 
        headStyle={{ width: '200px', height: '200px'}}
        style={{ width: 200 }}
        bodyStyle={{ padding: 10 }} 
        cover={<img alt="example" src={image} />}
        onClick={() => handleDetailsProduct(id)}
    >
        <img src={logo} alt="logo" style={{ width: '68px', height: '14px', position: 'absolute', top: -1, left: -1, borderTopLeftRadius: '8px' }}/>
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReporText>
            <span style={{ marginRight: '4px' }}>
                <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }}/>
            </span>
            <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
        </WrapperReporText>
        <WrapperPriceText>
            <span style={{ marginRight: '8px' }}>{price?.toLocaleString()}</span>
            <WrapperDiscountText>
                - {discount || 5}%
            </WrapperDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent
