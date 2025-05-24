import React, { useState } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Action Figures',
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) return toast.error('Image not selected');

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({ ...data, name: '', description: '', price: '' });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-container">
      <form className="add-form" onSubmit={onSubmitHandler}>
        <h2>Add New Item</h2>

        <div className="form-group image-upload">
          <label htmlFor="image">
            <p>Upload Image</p>
            <div className="upload-box">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload"
              />
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </label>
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label>Product Description</label>
          <textarea
            name="description"
            rows={5}
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Write description..."
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={data.category} onChange={onChangeHandler}>
              <option value="Action Figures">Action Figures</option>
              <option value="Educational Toys">Educational Toys</option>
              <option value="Dolls">Dolls</option>
              <option value="Building Blocks">Building Blocks</option>
              <option value="Remote Control">Remote Control</option>
              <option value="Creative Kits">Outdoor Play</option>
              <option value="Board Games">Board Games</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="Enter price"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">Add Item</button>
      </form>
    </div>
  );
};

export default Add;
