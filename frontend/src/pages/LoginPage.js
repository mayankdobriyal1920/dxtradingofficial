import React from 'react';
import mainFrontPic from "../theme/images/hero-bg.jpg";
import {IonContent} from "@ionic/react";
import {Link} from "react-router-dom";

const LoginPage = () =>{
    const [password,setPassword] = React.useState('');
    const [error,setError] = React.useState('');

    const loginUser = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(password?.trim()?.length){
            try {
                const response = await fetch('https://api.dxofficialtrading.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password,
                        endpoint: 'login',
                    }),
                });
                const data = await response.json();
                if(data?.status !== 1){
                    setError('Please enter correct password.');
                }else{
                    localStorage.setItem('userAuthInfo',JSON.stringify(data));
                    window.location.href = "/dashboard";
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        return;
    }
    return (
        <IonContent className={"sub_page"}>
            <div className="hero_area">
                <div className="bg-box">
                    <img src={mainFrontPic} alt=""/>
                </div>
                <header className="header_section">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg custom_nav-container">
                            <Link to={"/home"} className="navbar-brand">
                                <span>
                                  Dx official
                                </span>
                            </Link>
                        </nav>
                    </div>
                </header>
            </div>
           <section className="book_section layout_padding">
                    <div className="container">
                        <div className="heading_container">
                            <h2>
                                Login
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form_container">
                                    <form onSubmit={loginUser}>
                                        <div>
                                            <input type="text"
                                                   value={"dxofficialtrading2023@gmail.com"}
                                                   className="form-control" readOnly={true}/>
                                        </div>
                                        <div>
                                            <input type="password"
                                                   onChange={(e)=>setPassword(e.target.value)}
                                                   placeholder={"Enter your password"} className="form-control"/>
                                            {(error) ?
                                                <div className={"error_login"}>{error}</div> :''
                                            }
                                        </div>
                                        <div className="btn_box">
                                            <button type={"submit"}>
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </IonContent>
    )
}
export default LoginPage;