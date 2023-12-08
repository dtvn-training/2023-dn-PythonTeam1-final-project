import React, { useEffect, useState } from "react";
import "./imageUploader.scss";
import PictureCropForm from "../PictureCropForm/PictureCropForm";
import { Button } from "@mui/material";

const ImageUploader = ({ getImagePreview, error }) => {
  const [imagePreview, setImagePreview] = useState();
  const [isOpenCrop, setIsOpenCrop] = useState(false);

  //Clean image upload
  useEffect(() => {
    imagePreview && getImagePreview(imagePreview);
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleOpenForm = () => {
    setIsOpenCrop(true);
  };

  const handleCloseForm = () => {
    setIsOpenCrop(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="image-uploader-container">
      {isOpenCrop && (
        <PictureCropForm
          handleClose={handleCloseForm}
          imageSrc={imagePreview}
          setImageCrop={setImagePreview}
        />
      )}
      <label className="upload-label">
        {imagePreview ? "" : "Click to Upload Image"}
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handleImageChange}
        />
      </label>
      {imagePreview && (
        <>
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" className="preview-image" />
          </div>
        </>
      )}
      {imagePreview && (
        <Button
          className="crop_button"
          variant="contained"
          onClick={handleOpenForm}
        >
          Crop
        </Button>
      )}
      {!imagePreview && <span>Required creative image.</span>}
    </div>
  );
};

export default ImageUploader;
