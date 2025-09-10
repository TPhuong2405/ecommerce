import React, { useState, useMemo, useEffect } from 'react'
import { WrapperContainer, WrapperInfo, Label, WrapperValue, WrapperItemOrder, WrapperItemOrderInfo } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPridce } from '../../utils';


const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location

  console.log("location.state:", state);
  // console.log("state.orders:", state?.orders);
  // console.log("location", location);

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh'}}>
      <Loading isLoading={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Đơn hàng đã đặt thành công</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Label>Phương thức giao hàng</Label>
                  <WrapperValue>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng nhanh
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Label>Phương thức thanh toán</Label>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state?.orders?.map((order) => {
                  return (
                    <WrapperItemOrder >
                      <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }}/>
                        <div style={{ 
                          width: 260, 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          display: '-webkit-box', 
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: 'vertical',
                          fontWeight: 'bold'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPridce(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  )  
                })}
              </WrapperItemOrderInfo>
              <div style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '26px', color: 'red' }}>Tổng tiền: {convertPridce(state?.totalPriceMemo)}</span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default OrderSuccess
