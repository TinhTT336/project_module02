import React, { useEffect, useState } from 'react'
import HeaderWithNavbar from '../../../components/user/header/HeaderWithNavbar'
import Banner from '../../../components/user/banner/Banner'
import Footer from '../../../components/user/footer/Footer'
import axios from 'axios';
import { formatMoney } from '../../../utils/formatData';
import { Modal } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

export default function Cart() {
    // const [carts, setCarts] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [idDelete, setIdDelete] = useState();
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    // const userLoginCart = JSON.parse(localStorage.getItem("userLogin.cart"));
    const [cartLocal, setCartLocal] = useState((userLogin.cart) || []);

    // Nội dung của toast message
    const notify = () =>
        toast.warning("Số lượng vượt quá tồn kho, vui lòng kiểm tra lại", {
            position: "top-right",
        });

    const loadData = async () => {
        try {
            const cartsDB = await axios.get("http://localhost:3000/carts")
            console.log(cartsDB);
            const userLoginCart = cartsDB.data.find(c => c.userId === userLogin.id);
            console.log(userLoginCart);
            if (userLoginCart) {
                const productOfCartUser = await Promise.all(
                    userLoginCart.cartDetails.map(async (item) => {
                        //lay thong tin san pham dua tren productId
                        const response = await axios.get(`http://localhost:3000/products/${item.productId}`);
                        // console.log(response.data);
                        const data = response.data;
                        // const newCart = cartLocal.push(data)
                        // setCartLocal(newCart)
                        // setCartLocal({ ...cartLocal, data })
                        // console.log(cartLocal);
                        return { ...item, data }
                    })
                )
                setListProduct(productOfCartUser)
                // console.log(productOfCartUser, "phan tu cua cart nguoi dung");
            }
            // localStorage.setItem("cartLocal", JSON.stringify(cartLocal))
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadData()
    }, [])

    //ham xoa san pham=========================================
    // ham hien modal xac nhan xoa
    const handleShowModalDelete = (id) => {
        console.log(id);
        setIdDelete(id)
        setIsModalOpenDelete(true);
    };
    const handleCancelDelete = () => {
        setIdDelete()
        setIsModalOpenDelete(false);
    };
    const handleOkDelete = async () => {
        try {
            //lay ra tat ca gio hang
            const carts = await axios.get("http://localhost:3000/carts")
            //tim ra gio hang cua nguoi dung
            const userLoginCart = carts.data.find(c => c.userId === userLogin.id);
            if (userLoginCart) {
                //loc ra nhung sp co productId khac IdDelete
                const cartDetailsAfterDelete = userLoginCart.cartDetails.filter(c => c.productId !== idDelete)
                userLoginCart.cartDetails = cartDetailsAfterDelete;
                console.log(userLoginCart);
                //cap nhat gio hang len server
                await axios.put(`http://localhost:3000/carts/${userLoginCart.id}`, userLoginCart);
                //cap nhat lai giao dien sau khi xoa
                loadData();
                handleCancelDelete();
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    //ham giam so luong========================================
    const handleDecrease = async (id) => {
        try {
            setIdDelete(id)
            //lay du lieu carts tren DB ve
            const carts = await axios.get("http://localhost:3000/carts")
            //tim ra gio hang cua nguoi dung
            const userLoginCart = carts.data.find(c => c.userId === userLogin.id);
            if (userLoginCart) {
                //kiem tra vi tri san pham muon giam so luong trong gio hang nguoi dung
                const indexProduct = userLoginCart.cartDetails.findIndex(c => c.productId === id);
                // console.log(indexProduct);
                if (indexProduct !== -1) {
                    //kiem tra xem so luong muon giam co >1 khong
                    if (userLoginCart.cartDetails[indexProduct].quantity > 1) {
                        userLoginCart.cartDetails[indexProduct].quantity -= 1;
                        //cap nhat gio hang tren server
                        await axios.put(`http://localhost:3000/carts/${userLoginCart.id}`, userLoginCart);
                        loadData(); //cap nhat lai du lieu
                    } else {
                        handleOkDelete();
                    }

                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //ham tang so luong========================================
    const handleIncrease = async (id) => {
        try {
            //lay ra tat ca san pham de so sanh luong tang voi so luong ton kho
            const products = await axios.get("http://localhost:3000/products");
            // console.log(products);
            //lay du lieu carts tren DB ve
            const carts = await axios.get("http://localhost:3000/carts")
            //tim ra gio hang cua nguoi dung
            const userLoginCart = carts.data.find(c => c.userId === userLogin.id);
            console.log(userLoginCart);
            if (userLoginCart) {
                //kiem tra vi tri san pham muon tang so luong trong gio hang nguoi dung
                const indexProduct = userLoginCart.cartDetails.findIndex(c => c.productId === id);
                if (indexProduct !== -1) {
                    //kiem tra xem san pham muon tang co vi tri nao trong mang products
                    const indexIncreaseProduct = products.data.findIndex(product => product.id === userLoginCart.cartDetails[indexProduct].productId);
                    // console.log(indexIncreaseProduct);
                    //kiem tra xem so luong muon tang co vuot qua so luong ton kho khong
                    if (userLoginCart.cartDetails[indexProduct].quantity < products.data[indexIncreaseProduct].stock) {
                        // console.log(products.data[indexIncreaseProduct]);
                        userLoginCart.cartDetails[indexProduct].quantity++;
                        //cap nhat gio hang tren server
                        await axios.put(`http://localhost:3000/carts/${userLoginCart.id}`, userLoginCart);
                        loadData(); //cap nhat lai du lieu
                    } else {
                        notify();
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    //ham tinh tong tien============================================================
    // console.log(userLoginCart);
    const total = listProduct.reduce((prevValue, currentValue) => {
        return prevValue += currentValue.data.price * currentValue.quantity;
    }, 0)

    return (
        <>
            {/* Modal xoa*/}
            <Modal title="Xoá Danh mục sản phẩm" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete} idDelete={idDelete}>
                <p>Bạn có chắc chắn muốn xoá không?</p>
            </Modal>
            <ToastContainer />

            <HeaderWithNavbar cartLocal={cartLocal} loadData={loadData} />
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className=" text-dark card-header ">
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>Xoá</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {listProduct ? (listProduct.map((pro, index) => (
                                    <tr key={index}>
                                        <td className="text-left  gap-1">
                                            <img src={pro.data.image} alt="" style={{ width: 50, borderRadius: "50%" }} />{" "}
                                            {pro.data.product_name}
                                        </td>
                                        <td className="align-middle">{formatMoney(pro.data.price)}</td>
                                        <td className="align-middle">
                                            <div
                                                className="input-group quantity mx-auto"
                                                style={{ width: 100 }}
                                            >
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-minus" onClick={() => handleDecrease(pro.productId)}>
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                </div>
                                                <span
                                                    type="text"
                                                    className="form-control form-control-sm  text-center"
                                                    defaultValue={1}
                                                >{pro.quantity}</span>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-plus" onClick={() => handleIncrease(pro.productId)}>
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">{formatMoney(pro.data.price * pro.quantity)}</td>
                                        <td className="align-middle">
                                            <button className="btn btn-sm btn-primary" onClick={() => handleShowModalDelete(pro.productId)}>
                                                <i className="fa fa-times" />
                                            </button>
                                        </td>
                                    </tr>
                                ))) : (<tr><td colSpan={5}>Chưa có sản phẩm nào</td></tr>)}

                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-secondary mb-5">
                            <div className="card-header border-0">
                                <h4 className="font-weight-semi-bold m-0">Giá trị đơn hàng </h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6 className="font-weight-medium">Số lượng sản phẩm</h6>
                                    <h6 className="font-weight-medium">{listProduct.length}</h6>
                                </div>
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Tổng tiền</h6>
                                    <h6 className="font-weight-medium">{formatMoney(total)}</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Tổng</h5>
                                    <h5 className="font-weight-bold">{formatMoney(total)}</h5>
                                </div>
                                <Link to={"/checkout"}> <button className="btn btn-block btn-primary my-3 py-3">
                                    Tiến hành thanh toán
                                </button></Link>
                                <Link to={"/list-product"}><i className="fa-solid fa-arrow-left"></i>  Tiếp tục mua hàng</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

