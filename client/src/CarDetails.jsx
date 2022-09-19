import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
  } from 'firebase/storage';
  import app from './firebase';

const CarDetails = () => {
    const [carModel, setCarModel] = useState('');
    const [phone, setPhone] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [file, setFile] = useState([]);
    const [pic, setPic] = useState([]);

    const id = localStorage.getItem('id');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(carModel.length < 2) return alert('Minimum 3 Characters Required');
        if(phone.length !== 11) return alert('Phone Number is equal to 11 Digits');
        const data = {
            userId: id,
            carModel,
            phone,
            price,
            city,
            pic
        };
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
            },
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    data.pic = downloadURL
                });
            }
        );
        try {
            setTimeout(async () => {
                const res = await axios.post('https://testapptestxyz.herokuapp.com/api/car/register', data);
                alert('Data Uploaded Successfully')
                console.log(res.data);  
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container mt-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1"
                        onChange={(e) => setCarModel(e.target.value)}
                        placeholder="Honda Civic" />
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Price</label>
                    <input type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control" id="exampleFormControlInput1" placeholder="10000" />
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Phone Number</label>
                    <input type="number"
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control" id="exampleFormControlInput1" placeholder="03245678911" />
                </div>
                <label for="exampleFormControlInput1" className="form-label">City</label>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="radio" value={'Lahore'}
                        onChange={(e) => setCity(e.target.value)}
                        name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" for="flexRadioDefault1">
                        Lahore
                    </label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input"
                        onChange={(e) => setCity(e.target.value)} value={'Karachi'}
                        type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" for="flexRadioDefault1">
                        Karachi
                    </label>
                </div>
                <div className="mb-3">
                    <label for="formFile" className="form-label">Upload Image</label>
                    <input className="form-control" type="file"
                        onChange={e => setFile(e.target.files[0])}
                        id="formFile" multiple />
                </div>
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}

export default CarDetails