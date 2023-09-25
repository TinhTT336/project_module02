import React, { useState } from 'react'
import ReadOrder from './form-add-edit-order/ReadOrder';
import { Button } from 'antd';

export default function ManagerOrder() {
    const [showOrder, setShowOrder] = useState(false);

    //ham hien form add
    const handleShowOrder = () => {
        setShowOrder(true);
    }
    //ham dong form add
    const handleCloseEdit = (id) => {
        setShowOrder(false);
        setIdEdit(id);
    }
    return (
        <>
            {showOrder && (<ReadOrder />)}
            <div className='p-5 mb-3'>
                <div className="cart_container mb-4">
                    <h3 > <i className="bi bi-cart-check" /> QUẢN LÝ ĐƠN HÀNG</h3>
                </div>
                <div>
                    <form className='d-flex justify-content-between mb-4'>
                        <div className='d-flex  div-search justify-content-between'>
                            <input type="text" name="" id="" placeholder='Tìm kiếm theo tên sản phẩm'
                                className='p-1 input-search-product' />
                            <button className='py-1 rounded btn-search-product'><i className="fa-solid fa-magnifying-glass fs-4 "></i> </button>
                        </div>
                        <div className='d-flex gap-3 align-items-center'>
                            <div className="btn-group">
                                <button className="btn dropdown-toggle border px-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sắp xếp
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Từ A-Z</a></li>
                                    <li><a className="dropdown-item" href="#">Từ Z-A</a></li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='product-content-table'>
                    <table className="table table-hover table-content ">
                        <thead >
                            <tr >
                                <th scope="col" className='p-3'>STT</th>
                                <th scope="col" className='p-3'>Ngày tạo đơn hàng</th>
                                <th scope="col" className='p-3'>Tổng tiền</th>
                                <th scope="col" className='p-3'>Trạng thái đơn hàng</th>
                                <th scope="col" className='p-3'>Chi tiết đơn hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='p-3'> 1</td>
                                < td className='p-3'> 1</td>
                                <td className='p-3'> 1</td>
                                <td className='p-3' onClick={() => handleShowEdit()}><button className='btn btn-primary'>Trạng thái đơn hàng</button></td>
                                < td className='p-3'><button className='btn btn-primary'>Chi tiết đơn hàng</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
