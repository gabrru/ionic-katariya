import React, { useEffect, useState } from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLoading, IonSpinner, IonTitle, IonSearchbar } from '@ionic/react';
import { useHistory } from "react-router-dom";
import b1 from "../../src/assest/image/b1.jpg";
import b2 from "../../src/assest/image/b2.jpg";
import b3 from "../../src/assest/image/b3.jpg";
import b4 from "../../src/assest/image/b4.jpg";
import { all_Product, searchProduct } from '../services/product';
import { IProduct } from '../interfaces/productInterface';


function Index2() {

    const [allProduct, setAllProduct] = useState([]);
    const [bkLoading, setBkLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState([{
        data : "data"
    }]);

    const navigate = useHistory();

    // fetch Man Product
    const allProducts = async () => {
        setBkLoading(true);
        const mProduct = await all_Product();
        if (mProduct.data?.success) {
            setAllProduct(mProduct.data?.data);
            setBkLoading(false);
        } else {
            setBkLoading(false);
            console.log("mProduct.data?.success", mProduct.data?.success);
        }
        setBkLoading(false);
        return mProduct;
    };

    useEffect(() => {
        allProducts();
    }, []);

    const productDetail = (data: IProduct) => {
        navigate.push("/product-details", { state: data });
    };
    const search = async (event: any) => {
        console.log("heloo");
        const value = event.target.value
        console.log("first-----------", value);
        setSearchText(event.target.value)
        setAllProduct(allProduct.filter((f :any) =>{
            console.log("fdata>>>>>>>>>>>>>>..", f.product_name.toLowerCase().includes(value.toLowerCase()));
            f.product_name.toLowerCase().includes(value);
        }))
        // const search = await searchProduct(event.target.value);
        // if (search?.data?.success) {
        //     setSearchData(search?.data?.data);
        // }
        
    }
    // console.log("allproduct>>>>>>>>>>>>>", allProduct);
    return (
        <>
            {/* <IonTitle className='text-light bg-success'>

                <span ><IonSearchbar
                    onIonInput={(ev) => search(ev)}
                /></span>
            </IonTitle> */}
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
                    </IonRow>
                </IonGrid>
            )}

            {/* </IonContent> */}
        </>
    );
}
export default Index2;