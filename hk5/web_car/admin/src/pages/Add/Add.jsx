import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: ''
  })

  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("image", image)

    const response = await axios.post(`${url}/api/product/add`, formData);
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }
  
  return (

    <div className='add'>
      <form className="flex-col" onSubmit={onSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.image_uploader} alt="" className='image_up' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' className='image_input' hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandle} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandle} value={data.description} name="description" rows='10' placeholder='Write content here !!!' required></textarea>
        </div>

        <div className="add-price flex-col">
          <p>Product Price</p>
          <input onChange={onChangeHandle} value={data.price} type="Number" name='price' placeholder='$20' />
        </div>


        <button type='submit' className='add-button'>Submit</button>
      </form>
    </div>
  )
}

export default Add
