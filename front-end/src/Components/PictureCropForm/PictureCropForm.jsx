import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import "./PictureCropForm.scss";
import "react-image-crop/src/ReactCrop.scss";
import { useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

const PictureCropForm = ({ handleClose, imageSrc, setImageCrop }) => {
  // const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({
    unit: "%",
    aspect: 4 / 1,
  });
  const [isHovered, setIsHovered] = useState(false);

  const cropRef = useRef(null);

  const onCropComplete = (crop, pixelCrop) => {};

  const onImageLoad = (e) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        4 / 1,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  };

  const onCropChange = (newCrop, pixelCrop) => {
    const adjustedCrop = { ...newCrop, height: newCrop.width / 4 };
    cropRef.current = { crop, pixelCrop };
    setCrop(adjustedCrop);
  };

  const handleClickSaveCropImage = () => {
    const { crop, pixelCrop } = cropRef.current;

    if (crop && pixelCrop) {
      // Get the cropped image data using the HTML canvas
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.src = imageSrc;

      // Convert unit from percentage(%) to px
      const sourceImageWidth = image.width;
      const sourceImageHeight = image.height;
      const x_canvas = (pixelCrop.x / 100) * sourceImageWidth;
      const y_canvas = (pixelCrop.y / 100) * sourceImageHeight;
      const width = (pixelCrop.width / 100) * sourceImageWidth;
      const height = (pixelCrop.height / 100) * sourceImageHeight;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        x_canvas,
        y_canvas,
        width,
        height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          // Create a Blob URL for the cropped image
          const croppedImageUrl = URL.createObjectURL(blob);
          setImageCrop(croppedImageUrl);
          handleClose();
          setImageCrop(croppedImageUrl);
          // You can now use 'croppedImageUrl' as needed (e.g., upload to a server, display in UI, etc.)
        } else {
          console.error("Failed to create Blob from canvas.");
        }
      }, "image/jpeg");
    } else {
      console.log("No crop data available.");
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={true} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" fontWeight={500}>
            Crop Image
          </Typography>
          <ClearIcon
            onClick={handleClose}
            style={{
              cursor: "pointer",
              fontSize: "2.4rem",
              color: isHovered ? "#000" : "#ccc",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Box>
      </DialogTitle>

      <DialogContent>
        <div>
          <ReactCrop
            crop={crop}
            onChange={onCropChange}
            onComplete={onCropComplete}
          >
            <img src={imageSrc} alt="" onLoad={onImageLoad} />
          </ReactCrop>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            marginLeft: "1.5rem",
            fontSize: "1.2rem",
            width: "10rem",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            marginLeft: "1.5rem",
            backgroundColor: "#468faf",
            fontSize: "1.2rem",
            width: "10rem",
          }}
          onClick={handleClickSaveCropImage}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PictureCropForm;
