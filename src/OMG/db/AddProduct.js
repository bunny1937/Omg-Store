import React, { useState } from "react";
import { storage, db } from "./Firebase.js";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL as getDownloadURLFromStorage,
} from "firebase/storage";
import { collection, doc, setDoc, getDocs } from "./Firebase.js"; // Import the collection function

import "./AddProducts.css";
console.log("Storage:", storage); // Add this line

export const AddProducts = () => {
  const [Name, setProductName] = useState("");
  const [price, setProductPrice] = useState(0);
  const [Category, setProductCategory] = useState("");
  const [quantity, setProductQuantity] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const types = ["image/png", "image/jpeg"]; // image types

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
    console.log("Product Image:", productImg); // Add this line
  };

  // add product
  const addProduct = (e) => {
    e.preventDefault();
    const storage = getStorage(); // Get the default storage bucket

    let storageRef;
    switch (Category) {
      case "Jeans":
        storageRef = ref(storage, `/Products/Jeans/${productImg.name}`);
        break;
      case "Oversize":
        storageRef = ref(storage, `/Products/Oversize/${productImg.name}`);
        break;
      case "Pants":
        storageRef = ref(storage, `/Products/Pants/${productImg.name}`);
        break;
      case "Shirts":
        storageRef = ref(storage, `/Products/Shirts/${productImg.name}`);
        break;
      case "Tshirts":
        storageRef = ref(storage, `/Products/Tshirts/${productImg.name}`);
        break;
      default:
        setError("Please select a valid product category");
        return;
    }

    console.log("Storage Ref:", storageRef); // Add this line

    const uploadTask = uploadBytesResumable(storageRef, productImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (err) => setError(err.message),
      () => {
        getDownloadURLFromStorage(storageRef).then((url) => {
          const productsCollectionRef = collection(db, "Products");

          getDocs(productsCollectionRef).then((querySnapshot) => {
            const newId = querySnapshot.docs.length + 1;
            const newDocRef = doc(productsCollectionRef, String(newId));
            setDoc(newDocRef, {
              id: newId,
              Name: Name,
              price: Number(price),
              Category: Category,
              quantity: quantity,
              Img: url,
            })
              .then(() => {
                setProductName("");
                setProductCategory("");
                setProductPrice(0);
                setProductImg("");
                setProductQuantity(0);
                setError("");
                setProgress(0);
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
        });
      }
    );
  };

  return (
    <div className="add-container">
      <br />
      <h2>ADD PRODUCTS</h2>
      <hr />
      <form autoComplete="off" className="form-group" onSubmit={addProduct}>
        <label htmlFor="product-category">Product Category</label>
        <select
          className="text-input"
          required
          onChange={(e) => setProductCategory(e.target.value)}
          value={Category}
        >
          <option value="">Select Category</option>
          <option value="Jeans">Jeans</option>
          <option value="Oversize">Oversize</option>
          <option value="Pants">Pants</option>
          <option value="Shirts">Shirts</option>
          <option value="Tshirts">Tshirts</option>
        </select>
        <br />
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          className="text-input"
          required
          onChange={(e) => setProductName(e.target.value)}
          value={Name}
        />
        <br />
        <label htmlFor="product-price">Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={price}
        />
        <br />
        <label htmlFor="product-img">Product Image</label>
        <input
          type="file"
          className="form-control"
          id="file"
          required
          onChange={productImgHandler}
        />
        <br />
        <label htmlFor="product-quantity">Product Quantity</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setProductQuantity(e.target.value)}
          value={quantity}
        />
        <br />
        <button type="submit" className="btn btn-success btn-md mybtn">
          ADD
        </button>
        {progress > 0 && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progress}% uploaded
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
export default AddProducts;
