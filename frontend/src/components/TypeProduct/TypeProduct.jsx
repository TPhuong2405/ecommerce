import React from 'react';
import { useNavigate } from 'react-router-dom';

// Hàm chuyển tiếng Việt có dấu sang không dấu và format dạng slug
const toSlug = (str) => {
  return str
    .normalize("NFD") // chuyển chuỗi thành tổ hợp ký tự
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d") // chuyển đ -> d
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // khoảng trắng -> -
    .replace(/[^\w\-]+/g, '') // xóa ký tự đặc biệt
    .replace(/\-\-+/g, '-') // bỏ dấu gạch ngang dư
};

const TypeProduct = ({ name }) => {
  const navigate = useNavigate();

  const handleNavigatetype = (type) => {
    const slug = toSlug(type);
    navigate(`/product/${slug}`, { state: { type } });
  };

  return (
    <div style={{ padding: '0 10px', cursor: 'pointer' }} onClick={() => handleNavigatetype(name)}>
      {name}
    </div>
  );
};

export default TypeProduct;
