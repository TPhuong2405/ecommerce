import { Col, Image, Rate, Row } from 'antd'
import React, { useState } from 'react'
import imageProductSmall from '../../assets/images/anh2.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImall, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from "../../services/ProductService";
import { useQuery } from 'react-query'
import Loading from '../LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'


const ProductDetaialsComponent = ({idProduct}) => {
  const [numProduct, setNumProduct] = useState(1)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const onChange = (value) => {
    setNumProduct(Number(value))
  }
  const fetchGetDetailsProduct = async (content) => {
  const id = content?.queryKey && content?.queryKey[1]
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  }

  const handleChangeCount = (type) => {
    if(type === 'increase') {
      setNumProduct(numProduct + 1)
    } else {
      setNumProduct(numProduct - 1)
    }
  }

  const handleAddOrderProduct = () => {
    if(!user?.id) {
      navigate('/sign-in', {state: location?.pathname})
    }
  }

  const {isLoading, data: productsDetails, isPreviousData } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, { enabled: !!idProduct });
  
  return (
    <Loading isLoading={isLoading}>
      <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
        <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '16px' }}>
          <Image src={productsDetails?.image} alt="image product" preview={false}/>
          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            <WrapperStyleColImall span={4}>
            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
            </WrapperStyleColImall>
            <WrapperStyleColImall span={4}>
            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
            </WrapperStyleColImall>
            <WrapperStyleColImall span={4}>
            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
            </WrapperStyleColImall>
            <WrapperStyleColImall span={4}>
            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
            </WrapperStyleColImall>
            <WrapperStyleColImall span={4}>
            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
            </WrapperStyleColImall>
            <WrapperStyleColImall span={4}>
            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
            </WrapperStyleColImall>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: '6px' }}>
          <WrapperStyleNameProduct>{productsDetails?.name}</WrapperStyleNameProduct>
          <div>
            <Rate allowHalf defaultValue={productsDetails?.rating} value={productsDetails?.rating}/>
            <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{productsDetails?.price?.toLocaleString('vi-VN')}</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className='address'>{user?.address}</span> - 
            <span className='change-address'> Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1p solod #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ marginBottom: '10px' }}>Số lượng</div>
            <WrapperQualityProduct>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
              <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size='small' />
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ButtonComponent
              size={20}
              styleButton={{ 
                background: "rgb(255, 57, 69)",
                height: '48px', 
                width: '220px',
                border: 'none',
                borderRadius: '4px',
              }}
              onClick={handleAddOrderProduct}
              textButton={'Chọn mua'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            >
            </ButtonComponent>
            <ButtonComponent
              size={20}
              styleButton={{ 
                background: "#fff",
                height: '48px', 
                width: '220px',
                border: '1px solid rgb(13, 92, 182)',
                borderRadius: '4px',
              }}
              textButton={'Mua trả sau'}
              styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15p', fontWeight: '700' }}
            >
            </ButtonComponent>
          </div>
        </Col>
      </Row>
    </Loading>
  )
}

export default ProductDetaialsComponent
