import React, { useRef, useState } from 'react';
import { IonButtons, IonIcon, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonList, IonModal, IonSearchbar } from '@ionic/react';
import { home, bagAdd, informationCircle, call, construct, person, briefcaseSharp, codeSlash } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { IAuthReducers } from '../redux/reducers/auhReducers';
import ActionType from '../resources/enums';
import storage from '../utils/storage';
import { searchProduct } from '../services/product';

function Header() {
    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState([]);

    const dispatch = useDispatch()
    const userData: IAuthReducers = useSelector(
        (state: RootState) => state.AuthReducers
    );

    const modal = useRef<HTMLIonModalElement>(null);
    const history = useHistory()

    function dismiss() {
        modal.current?.dismiss();
    }

    const logout = async () => {
        modal.current?.dismiss();
        await dispatch({
            type: ActionType.LOGOUT
        })
        storage.clear()
        history.push("/login");
    }

    const search = async (event: any) => {
        try {
            console.log("heloo");
            const text = event.target.value
            const value = {
                product_name: text
            }
            console.log("first-----------", text.length);
            if (typeof text === "string" && text.length === 0 || text === null) {
                setSearchData([]);
            } else {
                setSearchText("open-model")
                const search = await searchProduct(value);
                if (search?.data?.success) {
                    setSearchData(search?.data?.data);
                }
                else{
                    setSearchData([]);
                }
            }

        } catch (error) {
            console.log("Error>>>>>>>>>>>>>", error);
        }
    }


    // const handleSearchKeyPress = (event: any) => {
    //     if (event.key === 'Enter') {
    //         // Here, you can access the searchQuery value and perform your desired actions.
    //         console.log('Search query:', searchText);
    //     }
    // };

    return (
        <>

            <IonMenu contentId="main-content" >
                <IonContent fullscreen={true} className="ion-padding">
                    <IonHeader>
                        <IonList>
                            <IonItem>
                                <IonLabel><IonIcon icon={home} /> <IonButton color="light" fill="default"><Link to='/home' className="text-decoration-none text-dark">Home</Link></IonButton></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><IonIcon icon={informationCircle} slot="start" /><IonButton color="light" fill="default"><Link to='/about' className="text-decoration-none text-dark">About</Link></IonButton></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><IonIcon icon={call} slot="start" /><IonButton color="light" fill="default">Contact</IonButton></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><IonIcon icon={construct} slot="start" /><IonButton color="light" fill="default">Term and Condition</IonButton></IonLabel>
                            </IonItem>
                            {userData?.isLoggedIn ? (
                                <>
                                    <IonItem>
                                        <IonLabel><IonIcon icon={person} slot="start" /><IonButton color="light" fill="default">Account</IonButton></IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel><IonIcon icon={bagAdd} slot="start" /><IonButton color="light" fill="default">Order</IonButton></IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel><IonIcon icon={bagAdd} slot="start" /><IonButton color="light" fill="default">Add Product</IonButton></IonLabel>
                                    </IonItem>

                                    <IonItem>
                                        <IonLabel><IonIcon icon={codeSlash} slot="start" /><IonButton color="light" fill="default" id="open-modal" ><span className='text-dark'>Logout</span></IonButton></IonLabel>

                                    </IonItem>
                                </>
                            ) :
                                <IonItem>
                                    <IonLabel><IonIcon icon={bagAdd} slot="start" /><IonButton color="light" fill="default"><Link to='/login' slot="start" className="text-decoration-none text-dark">Login</Link></IonButton></IonLabel>
                                </IonItem>}
                        </IonList>
                    </IonHeader>
                </IonContent>
            </IonMenu>
            <IonPage id="main-content">
                <IonHeader className='text-warning'>
                    <IonToolbar>
                        <IonButtons slot="start" >
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle className='text-light bg-success'>

                            <h4 className='text-light text-center' >Katariya
                            </h4>
                            {/* <IonSearchbar className='w-25 p-0 m-0'
                                    onIonInput={(ev) => search(ev)} id='open-modal-searchData'
                                />
                                {searchData && searchData.length && searchData.map((item: any, index) => {
                                    return (
                                        <>
                                            <div className="container">
                                                <div className="w-25">
                                                    <div className="p-5 text-center btn-center">
                                                        <IonList lines="full">
                                                            <IonItem>
                                                                <IonLabel>{item.product_name}</IonLabel>
                                                            </IonItem>
                                                        </IonList>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })} */}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding" id='main-content'>
                    {searchData && searchData.length && searchData.map((item: any, index) => {
                        return (
                            <>
                                <div className="container">
                                    <IonModal>
                                        <div className="p-5 mt-5 text-center btn-center">
                                            <IonList lines="full">
                                                <IonItem>
                                                    <IonLabel>{item.product_name}</IonLabel>
                                                    <small>hello</small>
                                                </IonItem>
                                            </IonList>
                                        </div>
                                    </IonModal>
                                </div>
                            </>
                        )
                    })}
                </IonContent>
            </IonPage>

            <div className="w-25 w-25">
                <IonModal ref={modal} trigger="open-modal" >
                    <div >
                        <p className='text-center'>Are you sure. you want to logout this app?</p>
                        <div className="p-5 text-center btn-center">
                            <IonButton shape="round" className='text-center' onClick={dismiss}>No</IonButton>
                            <IonButton shape="round" className='text-center' onClick={logout}>Yes</IonButton>
                        </div>
                    </div>
                </IonModal>
            </div>


        </>
    );
}
export default Header;