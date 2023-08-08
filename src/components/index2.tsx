import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import "./home.css"
import { IonGrid, IonRow, IonCol, IonCard, IonSpinner } from '@ionic/react';
import { useHistory, useLocation } from "react-router-dom";
import b1 from "../../src/assest/image/b1.jpg";
import b2 from "../../src/assest/image/b2.jpg";
import b3 from "../../src/assest/image/b3.jpg";
import b4 from "../../src/assest/image/b4.jpg";
import { all_Product } from '../services/product';
import { IProduct } from '../interfaces/productInterface';


function Index2() {

    const [allProduct, setAllProduct] = useState([]);
    
    // const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [bkLoading, setBkLoading] = useState<boolean>(false)

    const navigate = useHistory();
    

    // fetch Man Product
    const allProducts = async (pageNumber: number) => {
        setBkLoading(true);
        const page = {
            pageNumber
        }
        const mProduct = await all_Product(page);
        if (mProduct.data?.success) {
            setAllProduct(mProduct.data?.data);
            setTotalPages(mProduct.data?.totalPages)
            setBkLoading(false);
        } else {
            setBkLoading(false);
            
        }
        setBkLoading(false);
        return mProduct;
    };

    useEffect(() => {
        allProducts(1);
    }, []);

    const productDetail = (data: IProduct) => {
        console.log("product>>>>>>>>clicked>>>>", data);
        navigate.push("/product-details", data );
    };

    const handlePageClick = async (data: any) => {
        
        // setCurrentPage(data.selected + 1);
        allProducts(data.selected + 1);
    };
    const handleClick = async (e: any) => {
        console.log(">>>>>>>>>>", e)

    }


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
            {bkLoading ? (
                <div className="container">
                    <div className="p-3 m-3 text text-center">
                        <h1><IonSpinner name="circles" className="custom-loading" /></h1>
                    </div>
                </div>

            ) : (
                <IonGrid>
                    <IonRow className="fixed-height-row">
                        {allProduct && allProduct.length && allProduct.map((item: any, index) => {
                            return (
                                <>
                                    <IonCol size="6" size-sm="6" size-md="3" key={index}>
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
                                                            <IonCard>
                                                                <div className="p-1">
                                                                    <img alt="Silhouette of mountains" src={item.image} style={{ height: "120px", objectFit: "cover" }} />
                                                                    {/* <IonCardHeader> */}
                                                                    <h3>{item.product_name}</h3>
                                                                    <span className='text text-success'>₹{item.prize}</span>
                                                                    <span style={{ textDecoration: "line-through" }} className='text text-danger'><br /> ₹{item.prize + item.discount}</span>
                                                                    <p>{item.description.substring(0, 10).concat('...')}</p>
                                                                    {/* </IonCardHeader>     */}

                                                                    {/* <IonCardContent>Here`s a...</IonCardContent> */}
                                                                </div>
                                                            </IonCard>

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
                        {/* {totalPages > 0 ? ( */}



                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            // pageRangeDisplayed={3}
                            // marginPagesDisplayed={2}
                            // renderOnZeroPageCount={null}

                            onPageChange={handlePageClick}
               
                            containerClassName="pagination"
                            // containerClassName={"pagination justify-content-center mt-4"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                        // activeClassName="active"
                        />

                        {/* // ) : ( */}
                        {/* //     <></> */}
                        {/* // )} */}
                    </IonRow>
                </IonGrid>
            )}

            {/* </IonContent> */}
        </>
    );
}
export default Index2;