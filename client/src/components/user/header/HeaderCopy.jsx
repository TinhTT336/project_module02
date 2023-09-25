import React, { useEffect, useState } from 'react';
import "./header.css";
import { Avatar, Badge, Modal, Carousel } from 'antd';
import { Link, NavLink, Navigate } from 'react-router-dom';

export default function HeaderCopy() {


    // lay thong tin userLogin tu local ve
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    // const [count, setCount] = useState();
    // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cartLocal")) || []);

    // const showCount = () => {
    //     setCount(cart.length)
    //     // console.log(count);
    // }
    // useEffect(() => {
    //     showCount();
    // }, [cart.length])

    // ham dang xuat
    const handleLogout = () => {
        localStorage.removeItem('userLogin');
        localStorage.removeItem('cartLocal');
        Navigate("/");
    }

    // ham hien modal xac nhan dang xuat
    const showModalLogout = () => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn đăng xuất?",
            onOk() {
                handleLogout();
            },

            onCancel() {
                cancelText: "Huỷ bỏ";
                okText: "Đăng xuất";
            }
        }

        )
    }
    return (
        <>
            <div className='header-container'>
                <div className='t-header'>
                    <Carousel autoplay effect="fade">
                        <div>
                            <p className='content-style' >Tmestics - Môi xinh đón mua về</p>
                        </div>
                        <div>
                            <p className='content-style' >Tmestics - Giảm 10% cho đơn hàng đầu tiên</p>
                        </div>
                        <div>
                            <p className='content-style' >Tmestics - Giảm giá lên tới 20%</p>
                        </div>
                        <div>
                            <p className='content-style' >Tmestics - Ưu đãi ngập tràn</p>
                        </div>
                    </Carousel>
                </div>

                <div className="container-fluid t-container-navbar">
                    <div className="row border-top px-xl-5 pt-3 pb-2">
                        <div className="col-lg-3 d-none d-lg-block">
                            <Link to={"/"} className="text-decoration-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold">
                                    <span className="text-primary font-weight-bold border px-3 mr-1">
                                        T
                                    </span>
                                    mestics
                                </h1>
                            </Link>
                        </div>
                        <div className="col-lg-9">
                            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                                <a href="" className="text-decoration-none d-block d-lg-none">
                                    <h1 className="m-0 display-5 font-weight-semi-bold">
                                        <span className="text-primary font-weight-bold border px-3 mr-1">
                                            T
                                        </span>
                                        mestics
                                    </h1>
                                </a>
                                <button
                                    type="button"
                                    className="navbar-toggler"
                                    data-toggle="collapse"
                                    data-target="#navbarCollapse"
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div
                                    className="collapse navbar-collapse justify-content-between"
                                    id="navbarCollapse"
                                >
                                    <div className="navbar-nav mr-auto py-0">
                                        <NavLink to={"/"} className="nav-item nav-link">
                                            <i className="fas fa-home"></i> Trang chủ
                                        </NavLink>

                                        <div className="nav-item dropdown">
                                            <NavLink to={"/list-product"}
                                                href="#"
                                                className="nav-link "
                                                data-toggle="dropdown"
                                            >
                                                <i className="fa-brands fa-product-hunt"></i>  Sản phẩm
                                            </NavLink>
                                        </div>
                                        <NavLink to={"/contact"} className="nav-item nav-link">
                                            <i className="fa-solid fa-id-badge"></i> Liên hệ
                                        </NavLink>
                                        <NavLink to={"/blog"} className="nav-item nav-link ">
                                            <i className="fa-solid fa-blog"></i>  Về Tmestics
                                        </NavLink>
                                    </div>
                                    <div className="navbar-nav ml-auto py-0">
                                        {userLogin !== null ?
                                            //neu da co thong tin userLogin kiem tra active va role
                                            (userLogin.active === true && userLogin.role === 1 ?
                                                (<><div className="nav-item dropdown  " >
                                                    <span
                                                        className="nav-link dropdown-toggle account-dropdown"
                                                        data-toggle="dropdown"
                                                        data-bs-display="static" aria-expanded="false"
                                                    >
                                                        <img src={userLogin.image} width={30} height={30} className='rounded-circle' /> {userLogin.fullname}
                                                    </span>
                                                    <div className="dropdown-menu rounded m-0  custom-dropdown-menu dropdown-menu-right">
                                                        <NavLink to={"/profile"} className="dropdown-item ">
                                                            <i className="fa-solid fa-user me-2"></i>  Thông tin tài khoản
                                                        </NavLink>
                                                        <NavLink to={"/order-history"} className="dropdown-item">
                                                            <i className="fa-solid fa-money-bills me-2"></i>  Lịch sử mua hàng
                                                        </NavLink>
                                                        <span className="dropdown-item" onClick={showModalLogout}>
                                                            <i className="fa-solid fa-right-from-bracket me-2" ></i>  Đăng xuất
                                                        </span>
                                                    </div>
                                                </div></>) : (<> <NavLink to={"/login"} className="nav-item nav-link">
                                                    <i className="fas fa-sign-in-alt"></i>   Đăng nhập
                                                </NavLink>
                                                    <NavLink to={"/register"} className="nav-item nav-link">
                                                        <i className="fa-solid fa-user-plus"></i>  Đăng ký
                                                    </NavLink></>)) :
                                            //neu chua co thong tin thi hien dang nhap+ dang ky
                                            (<>
                                                {/* <NavLink to={"/login"} className="nav-item nav-link">
                                        <i className="fas fa-sign-in-alt"></i>   Đăng nhập
                                    </NavLink> */}
                                                <NavLink to={"/login"} className="nav-item nav-link">
                                                    <i className="fa-solid fa-user-plus"></i>  Đăng nhập
                                                </NavLink></>)
                                        }

                                        <NavLink to={"/wishlist"} className=" px-3 nav-item nav-link ">
                                            <Badge size="small" count={0} offset={[7, 1]}>
                                                <i className="fas fa-heart text-black nav-item-icon" style={{ fontSize: "18px", lineHeight: "100%" }} />
                                            </Badge>
                                        </NavLink>
                                        <NavLink to={"/cart"} className=" px-3 nav-item nav-link ">
                                            <Badge size="small" count="" offset={[7, 1]} height="60%">
                                                <i className="fas fa-shopping-cart text-black nav-item-icon" style={{ fontSize: "18px", color: "black" }} />
                                            </Badge>
                                        </NavLink>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div >
                </div >
            </div>
        </>

    )
}
