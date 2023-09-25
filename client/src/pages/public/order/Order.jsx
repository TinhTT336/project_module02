import React, { useEffect, useState } from 'react'
import HeaderCopy from '../../../components/user/header/HeaderCopy'
import Banner from '../../../components/user/banner/Banner'
import Footer from '../../../components/user/footer/Footer'
import axios from 'axios';
import { Button, Modal } from 'antd';

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);
    const [open, setOpen] = useState(false);
    const [idDetail, setIdDetail] = useState();
    console.log("orders", orders);

    //kiem tra va hien thi trang thai don hang
    const handleStatusCodeOrder = (statusCode) => {
        switch (statusCode) {
            case 1:
                // return ` <button type="button" class="btn btn_edit waiting"> Đang chờ xác nhận</button> `
                return `  Đang chờ xác nhận `
            case 2:
                // return ` <button type="button" class="btn btn_edit accepted"> Đã xác nhận</button> `
                return ` Đã xác nhận`
            case 3:
                // return ` <button type="button" class="btn btn_edit denied"> Bị từ chối</button> `
                return ` Bị từ chối`
        }
    }
    //lay tat ca order tren DB ve
    const getOrder = async () => {
        try {
            const orderDB = await axios.get("http://localhost:3000/orders");
            console.log('order', orderDB.data);
            setOrders(orderDB.data)
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getOrder()
    }, [])

    //mo modal chi tiet don hang
    const handleShowModal = (id) => {
        console.log(id);
        setOpen(true);
        setOrderDetail(id);
    }
    // console.log(orderDetail);
    // useEffect(() => {
    //     handleShowModal()
    // }, [])
    // //xem chi tiet tung don hang
    // const handleShowDetail = () => {
    //     const detailOrder = orders.find(order => order.id === idDetail);
    //     console.log(detailOrder);
    //     setOrderDetail(detailOrder);
    // }
    // useEffect(() => {
    //     handleShowDetail();
    // }, [])
    //ham dong modal
    const handleCloseModal = () => {
        setOpen(false);
    }

    return (
        <>
            {/* Modal xem chi tiet don hang */}
            <Modal
                title="Chi tiết đơn hàng"
                centered
                open={open}
                onOk={() => handleCloseModal()}
                onCancel={() => handleCloseModal()}
                width={800}
            >
                {orderDetail && (

                    <div>
                        <h3 className='text-center'>Chi tiết đơn hàng</h3>
                        <hr />
                        <div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <h5>Thông tin đặt hàng</h5>
                                    <div className='d-flex'>
                                        <div className='d-flex flex-column me-3'>
                                            <span>Tên người đặt hàng</span>
                                            <span>Email</span>
                                            <span>Số điện thoại</span>
                                        </div>
                                        {/* {orderDetail && (
                                            <div className='d-flex flex-column'>
                                                <span>{orderDetail.userLogin.fullname}</span>
                                                <span>{orderDetail.userLogin.email}</span>
                                                <span>{orderDetail.userLogin.phoneNumber}</span>
                                            </div>
                                        )} */}
                                        {/* <div className='d-flex flex-column'>
                                            <span>{orderDetail.userLogin.fullname}</span>
                                            <span>{orderDetail.userLogin.email}</span>
                                            <span>{orderDetail.userLogin.phoneNumber}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div>
                                    <h5>Thông tin nhận hàng hàng</h5>
                                    <div className='d-flex'>
                                        {/* {orderDetail && (
                                            <div className='d-flex flex-column me-3'>
                                                <span>{orderDetail.userOrder.fullname}</span>
                                                <span>{orderDetail.userOrder.address}</span>
                                                <span>{orderDetail.userOrder.phoneNumber}</span>
                                            </div>
                                        )} */}
                                        {/* <div className='d-flex flex-column me-3'>
                                            <span>{orderDetail.userOrder.fullname}</span>
                                            <span>{orderDetail.userOrder.address}</span>
                                            <span>{orderDetail.userOrder.phoneNumber}</span>
                                        </div> */}
                                        <div className='d-flex flex-column'>
                                            <span>Tên người đặt hàng</span>
                                            <span>Email</span>
                                            <span>Số điện thoại</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr />
                            {/* <div className='d-flex justify-content-between align-items-center'>
                                <div>

                                </div>
                            </div> */}

                        </div>

                    </div>
                )}
            </Modal>

            <HeaderCopy />
            <Banner />
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className=" table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className=" text-dark card-header ">
                                <tr>
                                    <th>#</th>
                                    <th>Mã đơn hàng</th>
                                    <th>Ngày đặt hàng</th>
                                    <th>Giá trị đơn hàng</th>
                                    <th>Trạng thái đơn hàng</th>
                                    <th>Chi tiết đơn hàng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {orders ?
                                    (orders.map((o, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{o.id}</td>
                                            <td>{o.order_at}</td>
                                            <td></td>
                                            <td>{handleStatusCodeOrder(o.status)}</td>
                                            <td><button onClick={() => handleShowModal(o.id)}><i className="fa-solid fa-circle-info"></i>  Xem chi tiết</button></td>
                                            <td>{o.status === 1 ? (<button> &times; Huỷ đơn hàng</button>) : (<></>)}</td>
                                        </tr>
                                    ))
                                    ) :
                                    (<><tr><td>Chưa có đơn hàng nào</td></tr></>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
