import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";
import DatetimePicker from "../DatetimePicker/DatetimePicker";
import buildAPI from "../../const/buildAPI";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import ImageUploader from "../ImageUploader/ImageUploader";
import imageStorage from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const defaultState = {
  campaignId: "",
  campaignName: "",
  userStatus: true,
  startDate: undefined,
  endDate: undefined,
  budget: undefined,
  bidAmount: undefined,
  title: "",
  description: "",
  creativePreview: "",
  finalURL: undefined,
};
const UserStatus = [
  {
    value: true,
    label: "ACTIVE",
  },
  {
    value: false,
    label: "INACTIVE",
  },
];

const CampaignDialog = ({ title, onClose, initialState = defaultState }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isHovered, setIsHovered] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState();

  // console.log("**************************************", initialState);
  const addNewCampaign = (campaignData) => {
    buildAPI
      .post("/api/campaigns", campaignData)
      .then((response) => {
        toast.success("Campaign is created");
        console.log(response);
        onClose();
      })
      .catch((error) => {
        toast.error("Campaign isn't created");
        console.log(error);
      });
  };

  const updateCampaign = (campaignData) => {
    buildAPI
      .put("/api/campaigns", campaignData)
      .then((response) => {
        toast.success("Campaign is updated");
        console.log(response);
        onClose();
      })
      .catch((error) => {
        toast.error("Campaign isn't updated");
        console.log(error);
      });
  };

  const fetchImageBlobToFile = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const fileName = "creative.jpg";
      const imageFile = new File([blob], fileName, { type: blob.type });

      return imageFile;
    } catch (error) {
      console.error("Error fetching Blob data:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  };

  const uploadImageFileToFirebase = async (imageFile) => {
    try {
      const fileUploadName = v4();
      const imageRef = ref(imageStorage, "creative/" + fileUploadName);

      const snapshot = await uploadBytes(imageRef, imageFile);

      console.log("uploaded");
      return snapshot;
    } catch (error) {
      console.log("upload failed", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  };

  const getLinkImage = async (snapshot) => {
    try {
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error getting download URL:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  };

  const submitCampaignData = (url, values) => {
    let campaignData = {
      campaign_name: values.campaignName,
      status: values.userStatus === true || values.userStatus === "true",
      start_date: startDate,
      end_date: endDate,
      budget: values.budget,
      bid_amount: values.bidAmount,
      creative: {
        title: values.title,
        description: values.description,
        img_preview: url,
        url: values.finalURL,
      },
    };

    if (title && title.indexOf("Create") !== -1) {
      console.log("====================", campaignData);
      addNewCampaign(campaignData);
    } else if (title && title.indexOf("Edit") !== -1) {
      // get update time
      const updateAt = dayjs().format("YYYY-MM-DD HH:mm");

      campaignData = {
        ...campaignData,
        campaign_id: values.campaignId,
        update_at: updateAt,
      };
      console.log("====================", campaignData);
      updateCampaign(campaignData);
    }
  };

  const handleFormSubmit = async (values) => {
    if (!imageUrl) return;
    //Upload creative preview to firebase
    if (imageUrl.includes("firebasestorage"))
      submitCampaignData(imageUrl, values);
    else {
      let imageFile = await fetchImageBlobToFile(imageUrl);
      let snapshot = await uploadImageFileToFirebase(imageFile);
      getLinkImage(snapshot)
        .then((url) => {
          submitCampaignData(url, values);
        })
        .finally(() => {
          onClose();
        });
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialState}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Dialog
          // fullScreen
          fullWidth
          maxWidth="md"
          bgcolor="white"
          open={true}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4" fontWeight={500}>
                {title}
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
          <DialogContent dividers={true}>
            <Box>
              <form>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  {/* DETAILS */}
                  <Accordion
                    defaultExpanded
                    sx={{
                      gridColumn: "span 4",
                      marginBottom: "2rem",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          style={{ color: "#fff", fontSize: "4rem" }}
                        />
                      }
                      sx={{
                        bgcolor: "#468faf",
                        borderRadius: ".8rem .8rem 0 0",
                      }}
                    >
                      <Typography color="#fff" variant="h5" fontWeight={700}>
                        Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 3fr"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            textAlign: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          Name:
                        </Typography>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.campaignName}
                          defaultValue={initialState.campaignName}
                          name="campaignName"
                          error={
                            !!touched.campaignName && !!errors.campaignName
                          }
                          helperText={
                            touched.campaignName && errors.campaignName
                          }
                          inputProps={{
                            style: {
                              fontSize: "1.8rem",
                              padding: "1rem",
                            },
                          }}
                          FormHelperTextProps={{
                            style: {
                              fontSize: "1.4rem",
                            },
                          }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 3fr"
                        alignItems="center"
                        mt={2}
                      >
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            textAlign: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          User status:
                        </Typography>
                        <TextField
                          select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.userStatus}
                          defaultValue={initialState.userStatus}
                          name="userStatus"
                          error={!!touched.userStatus && !!errors.userStatus}
                          SelectProps={{
                            native: true,
                            style: {
                              fontSize: "1.6rem",
                            },
                          }}
                        >
                          {UserStatus.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {/* SCHEDULE */}
                  <Accordion
                    defaultExpanded
                    sx={{
                      gridColumn: "span 4",
                      marginBottom: "2rem",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          style={{ color: "#fff", fontSize: "4rem" }}
                        />
                      }
                      sx={{
                        bgcolor: "#468faf",
                        borderRadius: ".8rem .8rem 0 0",
                      }}
                    >
                      <Typography color="#fff" variant="h5" fontWeight={700}>
                        Schedule:
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 4fr"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            textAlign: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          Schedule:
                        </Typography>
                        <DatetimePicker
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.dateTime}
                          name="dateTime"
                          error={!!touched.dateTime && !!errors.dateTime}
                          helperText={touched.dateTime && errors.dateTime}
                          passStartDate={setStartDate}
                          passEndDate={setEndDate}
                          initialStartDate={initialState.startDate}
                          initialEndDate={initialState.endDate}
                          // changeStartDate={}
                        />
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {/* BUDGET */}
                  <Accordion
                    defaultExpanded
                    sx={{ gridColumn: "span 4", marginBottom: "2rem" }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          style={{ color: "#fff", fontSize: "4rem" }}
                        />
                      }
                      sx={{
                        bgcolor: "#468faf",
                        borderRadius: ".8rem .8rem 0 0",
                      }}
                    >
                      <Typography color="#fff" variant="h5" fontWeight={700}>
                        Budget
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 3fr"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            textAlign: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          Budget:
                        </Typography>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="tel"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.budget}
                          defaultValue={initialState.defaultValue}
                          name="budget"
                          error={!!touched.budget && !!errors.budget}
                          helperText={touched.budget && errors.budget}
                          inputProps={{
                            style: {
                              fontSize: "1.8rem",
                              padding: "1rem",
                            },
                          }}
                          FormHelperTextProps={{
                            style: {
                              fontSize: "1.4rem",
                            },
                          }}
                        />
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {/* BIDDING */}
                  <Accordion
                    defaultExpanded
                    sx={{ gridColumn: "span 4", marginBottom: "2rem" }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          style={{ color: "#fff", fontSize: "4rem" }}
                        />
                      }
                      sx={{
                        bgcolor: "#468faf",
                        borderRadius: ".8rem .8rem 0 0",
                      }}
                    >
                      <Typography color="#fff" variant="h5" fontWeight={700}>
                        Bidding
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 3fr"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            textAlign: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          Bid Amount:
                        </Typography>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="tel"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.bidAmount}
                          defaultValue={initialState.bidAmount}
                          name="bidAmount"
                          error={!!touched.bidAmount && !!errors.bidAmount}
                          helperText={touched.bidAmount && errors.bidAmount}
                          inputProps={{
                            style: {
                              fontSize: "1.8rem",
                              padding: "1rem",
                            },
                          }}
                          FormHelperTextProps={{
                            style: {
                              fontSize: "1.4rem",
                            },
                          }}
                        />
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {/* CREATIVE */}
                  <Accordion
                    defaultExpanded
                    sx={{ gridColumn: "span 4", marginBottom: "2rem" }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          style={{ color: "#fff", fontSize: "4rem" }}
                        />
                      }
                      sx={{
                        bgcolor: "#468faf",
                        borderRadius: ".8rem .8rem 0 0",
                      }}
                    >
                      <Typography color="#fff" variant="h5" fontWeight={700}>
                        Creative
                      </Typography>
                    </AccordionSummary>
                    {/* TITLE */}
                    <AccordionDetails>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 3fr"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            textAlign: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          Title:
                        </Typography>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title}
                          defaultValue={initialState.title}
                          name="title"
                          error={!!touched.title && !!errors.title}
                          helperText={touched.title && errors.title}
                          inputProps={{
                            style: {
                              fontSize: "1.8rem",
                              padding: "1rem",
                            },
                          }}
                          FormHelperTextProps={{
                            style: {
                              fontSize: "1.4rem",
                            },
                          }}
                        />
                      </Box>
                    </AccordionDetails>

                    {/* DESCRIPTION */}
                    <AccordionDetails>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 3fr"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            textAlign: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          Description:
                        </Typography>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          defaultValue={initialState.description}
                          name="description"
                          error={!!touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                          inputProps={{
                            style: {
                              fontSize: "1.8rem",
                              padding: "1rem",
                            },
                          }}
                          FormHelperTextProps={{
                            style: {
                              fontSize: "1.4rem",
                            },
                          }}
                        />
                      </Box>
                    </AccordionDetails>

                    {/* CREATIVE PREVIEW */}
                    <AccordionDetails>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 3fr"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            textAlign: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          Creative Preview:
                        </Typography>
                        <ImageUploader
                          getImagePreview={setImageUrl}
                          initialImagePreview={initialState.creativePreview}
                        ></ImageUploader>
                      </Box>
                    </AccordionDetails>

                    {/* FINAL URL */}
                    <AccordionDetails>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 3fr"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            textAlign: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          Final URL:
                        </Typography>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.finalURL}
                          defaultValue={initialState.finalURL}
                          name="finalURL"
                          error={!!touched.finalURL && !!errors.finalURL}
                          helperText={touched.finalURL && errors.finalURL}
                          inputProps={{
                            style: {
                              fontSize: "1.8rem",
                              padding: "1rem",
                            },
                          }}
                          FormHelperTextProps={{
                            style: {
                              fontSize: "1.4rem",
                            },
                          }}
                        />
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </form>
            </Box>
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
              onClick={handleSubmit}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

const checkoutSchema = yup.object({
  campaignName: yup.string().required("Campaign is required"),
  budget: yup
    .number()
    .integer("Please enter a integer")
    .typeError("Please enter a integer")
    .positive("Budget must be greater than 0")
    .required("Please enter budget")
    .moreThan(
      yup.ref("bidAmount"),
      "Budget must be equal or greater than bid amount"
    ),
  bidAmount: yup
    .number()
    .integer("Please enter a integer")
    .typeError("Please enter a integer")
    .positive("Budget must be greater than 0")
    .required("Please enter bid amount")
    .lessThan(
      yup.ref("budget"),
      "Bid amount must be equal or less than budget"
    ),
  title: yup.string().required("Title is required required"),
  description: yup.string().required("Description is required"),
  finalURL: yup.string().required("Final url is required"),
});

export default CampaignDialog;
