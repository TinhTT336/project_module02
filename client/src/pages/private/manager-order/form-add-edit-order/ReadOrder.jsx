import React from 'react'

export default function ReadOrder() {
    return (
        <>
            <div className='form-container-admin-crud'>
                <form className='p-4' >
                    <h3>Thông tin đơn hàng</h3>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="fullname">Họ và tên</label>
                        <input type="text" name="fullname" id="fullname" />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="image">Hình ảnh</label>
                        <input type="file" name="image" id="image" />
                        <img />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className='d-flex justify-content-start align-items-center gap-3'>
                        <label htmlFor="gender">Giới tính</label>
                        <div className='d-flex gap-1'>
                            <input type="radio" name="gender" id="gender" />
                            <span>Nam</span>
                        </div>
                        <div className='d-flex gap-1'>
                            <input type="radio" name="gender" id="gender" />
                            <span>Nữ</span>
                        </div>
                        <div className='d-flex gap-1'>
                            <input type="radio" name="gender" id="gender" />
                            <span>Khác</span>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text" name="address" id="address" />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="dateOfBirth">Ngày sinh</label>
                        <input type="text" name="dateOfBirth" id="dateOfBirth" />
                    </div>

                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="user_status">Trạng thái</label>
                        <input type="text" name="user_status" id="user_status" />
                    </div>
                    <div className='d-flex justify-content-end gap-2 mt-2'>
                        <button className='btn-form-admin bg-secondary' onClick={handleCloseCheck}><i className="fa-solid fa-xmark  "></i> Huỷ bỏ</button>
                        <button className='btn-form-admin btn-add-product'><i className="fa-solid fa-user-lock  "></i> Khoá tài khoản</button>
                    </div>
                </form>
            </div>
        </>
    )
}
