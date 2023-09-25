import React, { useState } from 'react'
import Footer from '../../../components/user/footer/Footer'
import "./profile.css";
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase/firebaseConfig';
import HeaderCopy from '../../../components/user/header/HeaderCopy';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


export default function Profile() {
    // lay thong tin userLogin tu local ve
    const [userLogin, setUserLogin] = useState(() => (
        JSON.parse(localStorage.getItem('userLogin')) || []
    ));
    console.log(userLogin);

    //up anh len firebase================================================
    //   // Tạo một tham chiếu đến thư mục chưa kho ảnh trên firebase
    const imageListRef = ref(storage, "users/");

    // Props của Upload
    const props = {
        name: "file",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                // console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                // Lấy đường dẫn của ảnh sau khi hoàn tất quá trình tải
                const downloadURL = info.file.response.url;
                // Lưu đường dẫn vào trong một state
                setImageURL(downloadURL);
                // Hiển
                // message.success("Tải lên hình ảnh thành công.");
            } else if (info.file.status === "error") {
                message.error("Tải lên hình ảnh thất bại.");
            }
        },
        customRequest: async ({ file, onSuccess, onError }) => {
            try {
                // Tạo một tham chiếu đến kho ảnh trên firebase
                const imageRef = ref(imageListRef, file.name);

                // Tải ảnh lên firebase
                await uploadBytes(imageRef, file);

                // Lấy url từ firebase về sau khi upload thành công
                const downloadURL = await getDownloadURL(imageRef);
                setUserLogin(pre => ({
                    ...pre,
                    image: downloadURL
                }))
                onSuccess({ url: downloadURL });
            } catch (error) {
                onError(error);
            }
        },
    };

    //ham lay du lieu tu o input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLogin({ ...userLogin, [name]: value })
    }
    console.log(userLogin);

    const handleCancel = () => {
        Navigate("/")
    }

    const handleUpdate = async () => {
        await axios.get("http://localhost:3000/users")
            .then(response => {
                const user = response.data.find(u => u.id === userLogin.id);
                console.log(user);
                if (user === undefined) {
                    axios.post("http://localhost:3000/users", userLogin);
                    // Lưu thông tin lên local
                    localStorage.setItem("userLogin", JSON.stringify(userLogin));
                    Navigate("/");
                } else {
                    if (userLogin.newPassword !== "" && userLogin.newPassword === userLogin.password) {
                        axios.put(`http://localhost:3000/users/${user.id}`, userLogin);
                        // Lưu thông tin lên local
                        localStorage.setItem("userLogin", JSON.stringify(userLogin));
                        // Chuyển hướng về trang home
                        Navigate("/");

                    }
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <HeaderCopy />

            <div className="container rounded bg-white mt-5 mb-4 container-profile">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                                className="rounded-circle mt-5"
                                width="150px"
                                src={userLogin.image}
                            />
                            <span className="font-weight-bold fs-3">{userLogin.fullname}</span>
                            <span className="text-black-50">{userLogin.email}</span>
                            <Upload {...props} className='mt-3'>
                                <Button icon={<UploadOutlined />}>Thay đổi hình ảnh</Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="col-md-8 ms-5 border-right">
                        <div className="p-3 py-2">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">THÔNG TIN TÀI KHOẢN</h4>
                            </div>
                            <div className="row mt-3">
                                <div className='d-flex justify-content-between'>
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor='fullname' className="labels">Họ và tên</label>
                                        <input id='fullname' onChange={handleChange}
                                            name='fullname'
                                            type="text"
                                            className="form-control"
                                            value={userLogin.fullname}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor='phone_number' className="labels">Số điện thoại</label>
                                        <input id='phoneNumber' onChange={handleChange}
                                            name='phoneNumber'
                                            type="text"
                                            className="form-control"
                                            value={userLogin.phoneNumber}
                                        />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor='email' className="labels">Email</label>
                                        <input id='email' onChange={handleChange}
                                            name='email'
                                            type="text"
                                            className="form-control"
                                            value={userLogin.email}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor='dateOfBirth' className="labels">Ngày sinh</label>
                                        <input id='dateOfBirth' onChange={handleChange}
                                            name='dateOfBirth'
                                            type="text"
                                            className="form-control"
                                            value={userLogin.dateOfBirth}
                                        />
                                    </div>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <div className="col-md-12 mt-1">
                                        <label htmlFor='address' className="labels">Địa chỉ</label>
                                        <input id='address' onChange={handleChange}
                                            name='address'
                                            type="text"
                                            className="form-control"
                                            value={userLogin.address}
                                        />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor='email' className="labels">Mật khẩu hiện tại</label>
                                        <input id='password' onChange={handleChange}
                                            name='password'
                                            type="text"
                                            className="form-control"
                                            value={userLogin.confirmPassword}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor='newPassword' className="labels">Mật khẩu mới</label>
                                        <input id='newPassword' onChange={handleChange}
                                            name='newPassword'
                                            type="text"
                                            className="form-control"
                                            value={userLogin.newPassword}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 ms-3 d-flex">
                                    <button onClick={handleUpdate} className="btn btn-primary profile-button me-2 rounded" type="button">
                                        Cập nhật
                                    </button>
                                    <button onClick={handleCancel} className="btn btn-secondary profile-button rounded" type="button">
                                        Huỷ bỏ
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}
