import React, { useRef, useState } from 'react';
import { IonButtons, IonIcon, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonList, IonModal, IonSearchbar } from '@ionic/react';
import { home, bagAdd, informationCircle, call, construct, person, briefcaseSharp, codeSlash } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { IAuthReducers } from '../redux/reducers/auhReducers';
import ActionType from '../resources/enums';
import storage from '../utils/storage';

function Header() {
    const [searchText, setSearchText] = useState('');

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

    const search = (event: any)=>{
        console.log("heloo");
        const value  = event.target.value
        console.log("first-----------", value);
        setSearchText(event.target)
    }

    const handleSearchKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            // Here, you can access the searchQuery value and perform your desired actions.
            console.log('Search query:', searchText);
        }
    };

    return (
        <>
            
                <IonMenu contentId="main-content" >
                    <IonContent fullscreen={true} className="ion-padding">
                    <IonHeader>
                        <IonList>
                            <IonItem>
                                <IonLabel><IonIcon icon={home} /> <IonButton color="light" fill="default"><Link to='/' className="text-decoration-none text-dark">Home</Link></IonButton></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><IonIcon icon={informationCircle} slot="start" /><IonButton color="light" fill="default">About</IonButton></IonLabel>
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
                                        <IonLabel><IonIcon icon={briefcaseSharp} slot="start" /><IonButton color="light" fill="default">Order</IonButton></IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel><IonIcon icon={bagAdd} slot="start" /><IonButton color="light" fill="default">Add Product</IonButton></IonLabel>
                                    </IonItem>

                                    <IonItem>
                                        <IonLabel><IonIcon icon={codeSlash} slot="start" /><IonButton color="light" fill="default" id="open-modal">Logout</IonButton></IonLabel>

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
                                
                            <p className='text-light text-center pt-3'>Katariya<span ><IonSearchbar
                                onIonInput={(ev) => search(ev)}
                            /></span></p>
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding" id='main-content'></IonContent>
                </IonPage>

                <div className="container">
                    <IonModal ref={modal} trigger="open-modal">
                        <p className='text-center'>Are you sure. you want to logout this app?</p>
                        <div className="p-5 text-center btn-center">
                            <IonButton shape="round" className='text-center' onClick={dismiss}>No</IonButton>
                            <IonButton shape="round" className='text-center' onClick={logout}>Yes</IonButton>
                        </div>
                    </IonModal>
                </div>
            
        </>
    );
}
export default Header;