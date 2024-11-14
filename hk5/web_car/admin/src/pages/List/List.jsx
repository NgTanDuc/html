import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import './List.css'
const List = ({ url }) => {
  

  const [showFormUpdate, setShowFormUpdate] = useState(false)
  const [list, setList] = useState([]);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [image, setImage] = useState(false);
  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`);
    console.log(response.data);

    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  const removeProduct = async (productId) => {
    const response = await axios.post(`${url}/api/product/remove`, { id: productId })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error(`Error`)
    }
  }
  const updateProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('image', data.image);
    try {
      const response = await axios.put(`${url}/api/product/update/${data._id}`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setShowFormUpdate(false);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error updating product', error);
    }
  };


  return (
    <div className='condition'>
      <div className='list '>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img className='image' src={`${url}/images/` + item.image} alt="" />
              <p className='item'>{item.name}</p>
              <p className='item'>${item.price}</p>
              <div className="button">
                <p onClick={() => {
                  setShowFormUpdate(true);
                  setData(item);
                }} className='cursor'><img className='upl_img' src={assets.update_icon} alt="" /></p>
                <p onClick={() => removeProduct(item._id)} className='cursor'><img className='del_img' src={assets.delete_icon} alt="" /></p>
              </div>
            </div>
          )
        })}
      </div>
      {showFormUpdate && (
        <div className='update'>
          <form onSubmit={updateProduct}>
            <div className="title">
              <h2>Upload Image</h2>
              <img src={assets.delete_icon} onClick={() => setShowFormUpdate(false)} alt="" />
            </div>

            <div className="update-img-upload">
              <label htmlFor="image">
                <img src={`${url}/images/${data.image}`} alt="" className='image_up' />
              </label>
            </div>

            <div className="update-product-name ">
              <p>Product Name</p>
              <input type="text" name='name' placeholder='Type here' onChange={onChangeHandle} value={data.name} />
            </div>

            <div className="update-product-description ">
              <p>Product Description</p>
              <textarea name="description" rows='10' placeholder='Write content here !!!' onChange={onChangeHandle} value={data.description} required></textarea>
            </div>

            <div className="update-price ">
              <p>Product Price</p>
              <input type="Number" name='price' placeholder='$20' onChange={onChangeHandle} value={data.price} />
            </div>
            <button type='submit' className='update-button'>Update</button>
          </form>
        </div>

      )}
    </div>

  )
}

export default List
