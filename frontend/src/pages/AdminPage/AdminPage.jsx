import React, { useState } from 'react'
import { Menu } from 'antd'
import { getItem } from '../../utils'
import { UserOutlined, ShopOutlined } from '@ant-design/icons'
import HeaderCompoent from '../../components/HeaderCompoent/HeaderCompoent'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminProduct from '../../components/AdminProduct/AdminProduct'

const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <ShopOutlined  />),
  ];

  const [keySelected, setKeySelected] = useState('')

  const renderPage = (key) => {
    switch(key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      default:
        return <></>
    }
  }

  const handleOnClick = ({ key }) => {
    setKeySelected(key);  
  }

  return (
    <>
      <HeaderCompoent isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          style={{ 
            width: '256px',
            height: '100vh',
            boxshadow: '1px 2px 2px #ccc',
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: '15px' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage
