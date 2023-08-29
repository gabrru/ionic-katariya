import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { IAuthReducers } from '../../redux/reducers/auhReducers';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { getUserOrder } from '../../services/order';
import { IUserOrder } from '../../interfaces/commonInterface';

const OrderPage = () => {

    const [orderData, setOrderData] = useState([]);

    const authReducer: IAuthReducers = useSelector(
        (state: RootState) => state.AuthReducers
    );

    const userOrder = async () => {
        const data = {
            user_id: authReducer.authData?.id as unknown as number,
        };
        const getOrder = await getUserOrder(data as IUserOrder);
        if (getOrder.data?.success) {
            setOrderData(getOrder.data?.data);
        }
    };

    useEffect(() => {
        userOrder();
    }, []);

    return (
        <>
            <IonContent fullscreen={true} className="">
                <div className="container-fluid">
                    <div className="mt-1 pt-2">
                        <IonGrid className="">
                            <IonRow>
                                <IonCol>
                                    {orderData && orderData.length > 0 ? (
                                        <>
                                            <h1 className="text-center align-center text-info"> Order Details</h1>
                                            <div className="col-11">
                                                {orderData.map((item: IUserOrder, index) => {
                                                    return (
                                                        <>
                                                            <table className="table table table-success table-striped col-11">
                                                                <thead key={index}>
                                                                    <tr className="text-danger">
                                                                        <th scope="col" className="">
                                                                            Product
                                                                        </th>
                                                                        <th scope="col">Quantity</th>
                                                                        <th scope="col">Total Amount</th>
                                                                        <th scope="col">Status</th>
                                                                        <th scope="col">Address</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="">
                                                                        <th scope="row" className="p-0 m-0">
                                                                            <img
                                                                                src={item.product_id.image}
                                                                                alt=""
                                                                                className=""
                                                                                style={{
                                                                                    height: "100px",
                                                                                    width: "150px",
                                                                                }}
                                                                            />
                                                                            <span className=" mx-3 text-info">
                                                                                {" "}
                                                                                {item.product_id.product_name}
                                                                            </span>
                                                                        </th>
                                                                        <td>{item.quantity}</td>
                                                                        <td>₹{item.product_id.prize * item.quantity}</td>
                                                                        <td className="text-capitalize">
                                                                            {item.shipping_status}
                                                                        </td>
                                                                        <td className="text-capitalize">
                                                                            <p>
                                                                                {item.address_id?.address} {item.address_id?.city}{" "},
                                                                            </p>
                                                                            {item.address_id?.state} {item.address_id?.country} {item.address_id?.zip}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h1 className="text-center m-5 p-5 text-danger">
                                                {" "}
                                                No Order Found
                                            </h1>
                                        </>
                                    )}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                </div>
            </IonContent>
        </>
    )
}

export default OrderPage