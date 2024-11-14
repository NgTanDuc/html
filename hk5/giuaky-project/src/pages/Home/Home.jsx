import React, { useState, useEffect } from 'react'
import './Home.css'
import axios from "axios";
import { assets } from '../../assets/assets';

const Home = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [currState, setCurrState] = useState('Add');
    const [listproduct, setListProduct] = useState([]);
    const [editProduct, setEditProduct] = useState({ id: "", title: "", price: "", description: "", image: "" });

    useEffect(() => {
        const LayDulieutuBackend = async () => {
            try {
                const res = await axios.get("https://fakestoreapi.com/products");
                setListProduct(res.data);
            } catch (err) {
                console.log(err.message);
            }
        };
        LayDulieutuBackend();
    }, []);

    // Xử lí thay đổi input
    const change = (e) => {
        const { name, value } = e.target;
        setEditProduct((prevEditProduct) => ({ ...prevEditProduct, [name]: value }))
    }



    // xoa

    const delProduct = async (id) => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            setListProduct(listproduct.filter((phantu) => phantu.id != id));
        } catch (error) {
            console.error("Error product:", error);
        }
    }

    const resetForm = () => {
        try {
            setEditProduct({ id: "", title: "", price: "", description: "", image: "" });
            setShowAdd(false);
        } catch (error) {
            console.error("Error product:", error);
        };
    }

    const openForm = (product = null) => {
        try {
            if (product) {
                setEditProduct(product);
                setCurrState('Update')
            } else {
                resetForm();
                setCurrState('Add')
                setShowAdd(true)
            }
        } catch (error) {
            console.error("Error product:", error);
        };
    }

    const saveProduct = async () => {
        try {
            // nếu có id thì thực hiện thay đổi dữ liệu
            if (editProduct.id) {
                const response = await axios.put(`https://fakestoreapi.com/products/${editProduct.id}`, editProduct);
                setListProduct(listproduct.map((phantu) => (phantu.id === editProduct.id ? response.data : phantu)));
                // Ngược lại thực hiện xóa dữ liệu
            } else {
                const response = await axios.post("https://fakestoreapi.com/products", editProduct);
                setListProduct([...listproduct, response.data])
            }
            setEditProduct({ id: "", title: "", price: "", description: "", image: "" });
        } catch (error) {
            console.error("Error product:", error);
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveProduct(); // Ngăn chặn hành vi gửi biểu mẫu mặc định
        // Xử lý dữ liệu biểu mẫu ở đây
        console.log("Biểu mẫu đã được gửi!");
        setCurrState(currState === 'Add' ? 'Update' : 'Add');
    };


    return (
        <div className='condition'>
            {/* Phần đầu */}
            <div className='navbar'>
                <div className="logo">
                    <img src={assets.logo} alt="" />
                </div>
                <div className="navbar-menu">
                    <ul>
                        <li>Home</li>
                        <li>Menu</li>
                        <li>Mobile</li>
                        <li>Contact_us</li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <img onClick={() => openForm()} src={assets.image} alt="" />
                    <img src={assets.menu} alt="" />
                </div>
            </div>

            {/* Form add */}
            {showAdd && (
                <div>
                    <div className="form">
                        <form className="form-condition" onSubmit={handleSubmit}>
                            <div className="form-add">
                                <h2>{currState}</h2>
                                <img onClick={() => setShowAdd(false)} src={assets.cross_icon} alt="" />
                            </div>
                            <div className="form-add-input">
                                <div className="input-box">
                                    <input type="text" name='title' id='title' required placeholder='' value={editProduct.title} onChange={change} />
                                    <label htmlFor="title">Title</label>
                                </div>
                                <div className="input-box">
                                    <input type="number" name='price' id='price' required placeholder='' value={editProduct.price} onChange={change} />
                                    <label htmlFor="price">Price</label>
                                </div>
                                <div className="input-box">
                                    <textarea
                                        name="description"
                                        id='description'
                                        placeholder=""
                                        required
                                        value={editProduct.description}
                                        onChange={change}
                                    />
                                    <label htmlFor="description">Description</label>
                                </div>
                                <div className="input-box">
                                    <input type="text" name='image' id='image' required placeholder='' value={editProduct.image} onChange={change} />
                                    <label htmlFor="image">Url image</label>
                                </div>
                            </div>
                            <button type='submit'>
                                {currState === 'Add' ? <img src={assets.image} alt='Add' /> : <img src={assets.refresh} alt='Update' />}
                            </button>
                            {/* {currState === 'Add'
                                ? <p>Update data? <span onClick={() => setCurrState('Update')}> Click here</span></p>
                                : <p>Add data? <span onClick={() => openForm()}> Click here</span></p>
                            } */}
                        </form>
                    </div>
                </div>
            )}
            {/* Giữa */}
            <div className="product-list"> {
                <ul>
                    {listproduct.map(phantu => { // Lặp qua từng phần tử trong mảng listproduct và render từng sản phẩm.
                        return (
                            <li key={phantu.id} className='product'>
                                <img src={phantu.image} alt={phantu.title} /> {/* Hiển thị hình ảnh sản phẩm */}
                                <div className="product-info"> {/* Khối chứa thông tin chi tiết của sản phẩm */}
                                    <h2 className="product-title">{phantu.title}</h2> {/* Hiển thị tiêu đề sản phẩm */}
                                    <p className="product-price">Price: ${phantu.price}</p> {/* Hiển thị giá sản phẩm */}
                                    <p className="product-description">{phantu.description}</p> {/* Hiển thị mô tả sản phẩm */}
                                    <div className='add_product'>
                                        <button
                                            onClick={() => {
                                                setShowAdd(true);
                                                setEditProduct(phantu);
                                                setCurrState('Update');
                                            }}>
                                            <img src={assets.refresh} /></button>
                                        <button onClick={() => delProduct(phantu.id)}><img src={assets.delete1} /></button>
                                    </div>

                                </div>

                            </li>
                        );
                    })}
                </ul>
            }
            </div>
            <div className='footer' id='footer'>
                <div className="footer-content">
                    <div className="footer-content-left">
                        <img src={assets.logo} alt="" />
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <div className="footer-social-icons">
                            <img src={assets.facebook_icon} alt="" />
                            <img src={assets.twitter_icon} alt="" />
                            <img src={assets.linkedin_icon} alt="" />
                        </div>
                    </div>
                    <div className="footer-content-center">
                        <h2>COMPANY</h2>
                        <ul>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            <li>_1-212-456-7890</li>
                            <li>contact@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className='footer-copyright'>Copyright 2024 @ canhan.com - All right reserved</p>

            </div>
        </div>

    );
}

export default Home
