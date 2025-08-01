import { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup } from "./style";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading'
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderCompoent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate(); // Thêm hook useNavigate có tác dụng để điều hướng đến trang đăng nhập
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in'); // Sử dụng navigate để chuyển hướng đến trang đăng nhập
  }
  const handleLogout = async () => {
    try {
      setLoading(true)
      await UserService.logoutUser().unwrap()
      dispatch(resetUser())
      setLoading(false)
    }
    catch (error) {
      console.log("lỗi đăng xuất")
    }
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  ); 

  const onSearch = (e) => {
    setSearch(e.target.value) 
    dispatch(searchProduct(e.target.value))
  }

  return (
    <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center'}}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <WrapperTextHeader onClick={() => navigate('/')} style={{ cursor: 'pointer'}}>
            LAPTRINHTHATDE
          </WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch 
              size="large"
              bordered={false}
              textButton="Tìm kiếm"
              placeholder="input search text"
              onChange={onSearch}
            />
          </Col>
        )} 
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: "center"}}>
        <Loading isLoading={loading}>
          <WrapperHeaderAccount>
            {userAvatar ? (
              <img src={userAvatar} alt="avatar" style={{
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                objectFit: 'cover',
              }} />
            ) : (
              <UserOutlined style={{ fontSize: '30px'}} />
            )}
            {user?.access_token ? (
              <>
                <Popover content={content} trigger="click" >
                  <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
        </Loading>
        {!isHiddenCart && (
          <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff'}}/>
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderCompoent;
