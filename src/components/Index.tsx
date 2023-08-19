import React, { useEffect, useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from "react-router-dom";
import b1 from "../../src/assest/image/b1.jpg";
import b2 from "../../src/assest/image/b2.jpg";
import b3 from "../../src/assest/image/b3.jpg";
import b4 from "../../src/assest/image/b4.jpg";
import { all_Product } from '../services/product';
import { IProduct } from '../interfaces/productInterface';


function Index() {

  const [allProduct, setAllProduct] = useState([]);

  const navigate = useHistory();

  // fetch Man Product
  const allProducts = async () => {
    const mProduct = await all_Product();
    if (mProduct.data?.success) {
      setAllProduct(mProduct.data?.data)
    } else {
      console.log("mProduct.data?.success", mProduct.data?.success);
    }
    return mProduct;
  };

  useEffect(() => {
    allProducts();
  }, []);

  const productDetail = (data: IProduct) => {
    navigate.push("/product-details", { state: data });
  };

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src={b1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={b2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={b3} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={b4} className="d-block w-100" alt="..." />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bg-danger"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next "
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bg-danger"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden text-success">Next</span>
        </a>
      </div>
      {/* live On sale */}
      <hr />
      <div className="container">
        <div className="row bg-danger text-center text-white border-bottom shadow">
          <h3>SALE IS LIVE NOW</h3>
          <span>5% Instant Discount on Axis Bank Credit and Debit Card</span>
          {/* <small className="fw-lighter">
            Term and Condition Applied (For details visit Banks official
            Website)
          </small> */}
        </div>
      </div>
      <hr />
      <IonGrid>
        <IonRow className="fixed-height-row">
          {allProduct && allProduct.length && allProduct.map((item: any, index) => {
            return (
              <>
                <IonCol size="3" size-sm="4" size-xs="12" size-md="3" key={index}>
                  <div className="container" key={index}>
                    <div className="owl-carousel" id="slider1">
                      <div className="row">
                        <div className="col" key="1">
                          <form
                            action=""
                            onClick={(e) => {
                              // setUserDetail(item);
                              productDetail(item);
                              e.preventDefault();
                            }}
                          >
                            <div className="card" key={index}>
                              <img
                                src={item.image}
                                // src=""
                                className="card-img-top img-thumbnail"
                                // style={{ height: "300px", objectFit: "cover" }}
                                alt="..."
                              />
                              <div className="card-body">
                                <h5 className="card-title">
                                  {/* This is title */}
                                  {item.product_name}
                                </h5>
                                <p className="card-text">
                                  {item.description} ...

                                </p>
                                <span className="fs-5"> ₹{item.prize} </span>
                                {/* <span className="fs-5"> ₹200 </span> */}
                                <span style={{ textDecoration: "line-through" }}>
                                  {" "}
                                  {/* {location.state.discount}₹ */}
                                  {item.prize + item.discount}

                                </span>
                              </div>
                            </div>
                            <br />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </IonCol>
              </>
            )
          })}
        </IonRow>
      </IonGrid>
      {/* </IonContent> */}
    </>
  );
}
export default Index;