import React, {useEffect, useState} from 'react';
import mainFrontPic from "../theme/images/hero-bg.jpg";
import {IonContent} from "@ionic/react";
import {Link} from "react-router-dom";

const DashboardPage = () =>{
    const [productsData,setProductsData] = useState([]);
    const [editModal,setEditModal] = useState({});
    const [name,setName] = useState('');
    const [url,setUrl] = useState('');
    const [telegramUrl,setTelegramUrl] = useState('');
    const [description,setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [price,setPrice] = useState();
    const [monthlyPrice,setMonthlyPrice] = useState();
    const [yearlyPrice,setYearlyPrice] = useState();
    const [showPriceButton,setShowPriceButton] = useState(1);
    const [showFreeButton,setShowFreeButton] = useState(1);
    const [showDirectDownloadButton,setShowDirectDownloadButton] = useState(1);
    const [loadingStatus,setLoadingStatus] = useState(false);


    useEffect(()=>{
        if(editModal?.id){
            setName(editModal?.name);
            setDescription(editModal?.description);
            setUrl(editModal?.url);
            setPrice(editModal?.price);
            setMonthlyPrice(editModal?.month_price);
            setYearlyPrice(editModal?.year_price);
            setTelegramUrl(editModal?.other_link);
        }
    },[editModal])

    const deleteProductAlert = async (id)=>{
         let confirmRes = confirm('Are you sure want to delete?');
         if(confirmRes){
             try {
                 await fetch('https://api.dxofficialtrading.com?id='+id, {
                     method: 'DELETE',
                 });
                 getProducts();
                 alert("Deleted successfully!!!")
             } catch (error) {
                 console.error('Error fetching users:', error);
             }
         }
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const getProducts = async () => {
        try {
            const response = await fetch('https://api.dxofficialtrading.com', {
                method: 'GET',
            });
            const data = await response.json();
            setProductsData(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const validate = ()=>{
        if(!name?.trim()?.length){
            return false;
        }else if(!description?.trim()?.length){
            return false;
        }else if(!url?.trim()?.trim()) {
            return false;
        }else if(!file) {
            return false;
        }
        return true;
    }
    const addProductDetail = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(validate() && !loadingStatus){
            setLoadingStatus(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("url", url);
            formData.append("price", price);
            formData.append("month_price", monthlyPrice);
            formData.append("year_price", yearlyPrice);
            formData.append("other_link", telegramUrl);
            formData.append("price", price);
            formData.append("file", file);
            formData.append("show_paid_button", showPriceButton);
            formData.append("show_free_button", showFreeButton);
            formData.append("show_download_button", showDirectDownloadButton);
            formData.append("endpoint", 'insert');

            try {
                await fetch('https://api.dxofficialtrading.com', {
                    method: 'POST',
                    body: formData,
                });
                setLoadingStatus(false);
                document.getElementById('close_add_product_popup').click();
                getProducts();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        return false;
    }

    const resetProductForm = ()=>{
        setName('');
        setDescription('');
        setPrice(0);
        setUrl('');
        setFile(null);
    }

    useEffect(()=>{
        getProducts();
    },[])
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
                                  <span className={"yellow"}>DX</span> OFFICIAL
                                  <span className={"sub"}>TRADING</span>
                                </span>
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className=""> </span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav  mx-auto ">
                                    <li className="nav-item active">
                                        <a className="nav-link"><span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"></a>
                                    </li>
                                </ul>
                                <div className="user_option">
                                    <button type={"button"} data-toggle="modal" data-target="#add_product_modal" className="order_online">
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
            </div>
            <section className="food_section layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Products
                        </h2>
                    </div>
                    <div className="filters-content">
                        <div className="row grid">
                            {(productsData?.map((product)=>(
                                <div key={product?.id} className="col-sm-6 col-lg-4 all burger">
                                    <div className="box">
                                        <div>
                                            <div className="img-box">
                                                <iframe src={product?.url}/>
                                            </div>
                                            <div className="detail-box">
                                                <h5>
                                                    {product?.name}
                                                </h5>
                                                <p>
                                                    {product?.description}
                                                </p>
                                                <div className="options">
                                                    <h6>
                                                        Monthly ${product?.month_price}
                                                    </h6>
                                                    <h6>
                                                        Yearly ${product?.year_price}
                                                    </h6>
                                                    <h6>
                                                        Lifetime ${product?.price}
                                                    </h6>
                                                    <a onClick={()=>deleteProductAlert(product?.id)}><i className={"fa fa-trash"}/></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            </section>
            {/*///////////// ADD PRODUCT MODAL ///////////////////*/}
            <div className="modal fade" id="add_product_modal" tabIndex="-1" aria-hidden="true">
                <div style={{display:'block'}} className="modal-backdrop fade show"></div>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <form onSubmit={addProductDetail}>
                            <div className="modal-body">
                                <section className="book_section">
                                    <div className="container">
                                        <div className="form_container">
                                                <div className={"row"}>
                                                <div className={"col-12"}>
                                                    <label>Name</label>
                                                    <input type="name"
                                                           className="form-control"
                                                           placeholder={"Enter name"}
                                                           value={name}
                                                           onChange={(e)=>setName(e.target.value)}/>
                                                </div>
                                                    <div className={"col-6"}>
                                                        <label>Youtube Url</label>
                                                        <input type="text"
                                                               className="form-control"
                                                               placeholder={"Enter youtube url"}
                                                               value={url}
                                                               onChange={(e)=>setUrl(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className={"col-6"}>
                                                        <label>Telegram Url</label>
                                                        <input type="text"
                                                               className="form-control"
                                                               placeholder={"Enter youtube url"}
                                                               value={telegramUrl}
                                                               onChange={(e)=>setTelegramUrl(e.target.value)}
                                                        />
                                                    </div>
                                                <div className={"col-12"}>
                                                    <label>Description</label>
                                                    <textarea
                                                           cols={3}
                                                           className="form-control"
                                                           placeholder={"description"}
                                                           value={description}
                                                           onChange={(e)=>setDescription(e.target.value)}
                                                    />
                                                </div>
                                            <div className={"col-4"}>
                                                <label>Monthly</label>
                                                <input type="number"
                                                       className="form-control"
                                                       min={0}
                                                       placeholder={"price"}
                                                       value={monthlyPrice}
                                                       onChange={(e)=>setMonthlyPrice(Number(e.target.value))}
                                                />
                                            </div>
                                            <div className={"col-4"}>
                                                <label>Yearly</label>
                                                <input type="number"
                                                       className="form-control"
                                                       min={0}
                                                       placeholder={"price"}
                                                       value={yearlyPrice}
                                                       onChange={(e)=>setYearlyPrice(Number(e.target.value))}
                                                />
                                            </div>
                                            <div className={"col-4"}>
                                                <label>Lifetime</label>
                                                <input type="number"
                                                       className="form-control"
                                                       min={0}
                                                       placeholder={"price"}
                                                       value={price}
                                                       onChange={(e)=>setPrice(Number(e.target.value))}
                                                />
                                            </div>
                                            <div className={"col-12"}>
                                                <label>Select software file</label>
                                                <input type="file"
                                                       className="form-control"
                                                       placeholder={"Select software file"}
                                                       onChange={(e)=>handleFileChange(e)}
                                                      />
                                            </div>
                                            <div className={"col-4"}>
                                                <label>Paid Button</label>
                                                <input type="checkbox"
                                                       className="form-control"
                                                       checked={!!showPriceButton}
                                                       onChange={(e)=>setShowPriceButton(showPriceButton ? 0 : 1)}
                                                />
                                            </div>
                                            <div className={"col-4"}>
                                                <label>Free Button</label>
                                                <input type="checkbox"
                                                       className="form-control"
                                                       checked={!!showFreeButton}
                                                       onChange={(e)=>setShowFreeButton(showFreeButton ? 0 : 1)}
                                                />
                                            </div>
                                            <div className={"col-4"}>
                                                <label>Download Button</label>
                                                <input type="checkbox"
                                                       className="form-control"
                                                       checked={!!showDirectDownloadButton}
                                                       onChange={(e)=>setShowDirectDownloadButton(showDirectDownloadButton ? 0 : 1)}
                                                />
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="modal-footer">
                            <button type="button" id={"close_add_product_popup"} className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="submit" disabled={!validate()} className="btn btn-primary">Save</button>
                        </div>
                       </form>
                    </div>
                </div>
            </div>
            {/*///////////// ADD PRODUCT MODAL ///////////////////*/}
        </IonContent>
    )
}
export default DashboardPage;