import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import Firebaseapp from "../db/Firebaseapp";
import AddProducts from "../db/AddProduct";

function AdminDash() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("Shirts"); // Add a category state
  const [categoryChanged, setCategoryChanged] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const { isAdmin } = useContext(UserContext);

  if (!isAdmin) {
    return <p>You are not an admin.</p>;
  }
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setCategoryChanged(true); // Set categoryChanged to true when category changes
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setCategoryChanged(false); // Reset categoryChanged to false when file changes
  };
  return (
    <div>
      <h1>Hello Admin</h1>
      {/* <input
        type="file"
        value={selectedFile ? "" : undefined}
        onChange={handleFileChange}
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="Shirts">Shirts</option>
        <option value="Tshirts">Tshirts</option>
        <option value="Oversize">Oversize</option>
        <option value="Pants">Pants</option>
        <option value="Jeans">Jeans</option>
      </select>

      {selectedFile && !fileUploaded && !categoryChanged && (
        <Firebaseapp
          file={selectedFile}
          category={category}
          onUploadComplete={() => {
            setSelectedFile(null);
            setFileUploaded(true); // Set fileUploaded to true when upload is complete
          }}
        />
      )}
      <button
        onClick={() => {
          setSelectedFile(null);
          setCategory("Shirts"); // Reset to default category
        }}
      >
        clear
      </button> */}
      <AddProducts />
    </div>
  );
}

export default AdminDash;
