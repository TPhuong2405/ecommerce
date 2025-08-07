import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductDetaialsComponent from '../../components/ProductDetaialsComponent/ProductDetaialsComponent'
// import { Style } from './style'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  return (
    <div style={{ height: '100vh', width: '100%', background: 'efefef' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3><span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => {navigate('/')}}>Trang chủ</span> - Chi tiết sản phẩm</h3>
        <ProductDetaialsComponent idProduct={id}/>
      </div>
    </div>
  )
}

export default ProductDetailsPage
