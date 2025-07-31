import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponents from "../../components/SliderComponents/SliderComponents";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.png";
import slider3 from "../../assets/images/slider3.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";



const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 1000)
  const refSearch = useRef()
  const [loading, setLoading] = useState(false)
  const [stateProducts, setStateProducts] = useState([])
  const [limit, setLitmit] = useState(6)
  const arr = ["TV", "Tủ Lạnh", "Laptop", "Điện Thoại"];
  const fetchProductAll = async (content) => {
    const limit = content?.queryKey && content?.queryKey[1]
    const search = content?.queryKey && content?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit);
    if (search.length > 0 || refSearch.current) {
      setStateProducts(res?.data)
      return []
    } else {
      return res
    }
  }

  // const fetchProductAll = async (search) => {
  //   const res = await ProductService.getAllProduct(search);
  //   if (search.length > 0 || refSearch.current) {
  //     setStateProducts(res?.data)
  //   } else {
  //     return res
  //   }
  // }

  // useEffect(() => {
  //   if (refSearch.current) {
  //     setLoading(true)
  //     fetchProductAll(searchDebounce)
  //   }
  //   refSearch.current = true
  //     setLoading(false)
  // }, [searchDebounce])

  const {isLoading, data: products} = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000 });
  console.log("data", searchProduct);

  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProducts(products?.data)
      // return []
    }
  }, [products])

  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div className="body" style={{ width: '100%', backgroundColor: "#efefef" }} >
        <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
          <SliderComponents arrImages={[slider1, slider2, slider3]} />
          <WrapperProducts>
            {stateProducts?.map((product) => {
              return (
                <CardComponent 
                  key={product._id} 
                  countInstock={product.countInstock} 
                  description={product.description} 
                  image={product.image} 
                  name={product.name} 
                  price={product.price} 
                  rating={product.rating} 
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                />
              )
            })}
          </WrapperProducts>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
              border: "1px solid rgb(11, 116, 229)",
              color: "rgb(11, 116, 229)",
              width: "240px",
              height: "38px",
              borderRadius: "4px",
            }}
              styleTextButton={{ fontWeight: "500" }}
              onClick={() => setLitmit((prev) => prev + 6)}
          />
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
