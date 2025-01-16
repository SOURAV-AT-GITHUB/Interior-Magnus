import { Fragment, useState } from "react";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import axios from "axios";
import {
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginExpired } from "../../Store/auth.action";
export default function UpdatePortfolios() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const [category, setCategory] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openSnackbar = (message, severity) => {
    setSnackbarState({ open: true, severity, message });
  };
  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };
  const handleNewImageSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    const file = event.target[1].files[0];
    formData.append("file", file);
    try {
      await axios.post(
        `${BACKEND_URL}/portfolio/${category
          .toLowerCase()
          .split(" ")
          .join("-")}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      openSnackbar(`Image added in ${category}'s portfolio`, "success");
    } catch (error) {
      if (error.status === 401) {
        dispatch(
          loginExpired({
            message: error.response?.data.message || error.message,
            status: error.status,
          })
        );
      }
      openSnackbar(
        `Failed to add the image in ${category}'s portfolio`,
        "error"
      );
    } finally {
      setIsUploading(false);
    }
  };
  const [portfolio, setPortFolio] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  console.log(selectedImage);

  const handleLoadImages = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const category = event.target[0].value.toLowerCase().split(" ").join("-");

    try {
      setSelectedImage({ category });
      const response = axios.get(`${BACKEND_URL}/portfolio/${category}`);
      setPortFolio([...(await response).data.data]);
    } catch (error) {
      openSnackbar(
        `Failed to load ${category}'s portfolio, please try again!`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const openDeleteDialog = (item) => {
    setSelectedImage((prev) => ({ ...prev, ...item }));
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setSelectedImage((prev) => ({ category: prev.category }));
    setDeleteDialogOpen(false);
    setSelectedImage((prev) => ({ category: prev.category }));
  };
  const confirmDelete = async () => {
    if (!selectedImage.storagePath) {
      alert("This is a default image, can not be deleted!!");
      return;
    }
    setIsDeleting(true);
    try {
      await axios.delete(
        `${BACKEND_URL}/portfolio/${selectedImage.category}/${selectedImage.id}`,
        {headers:{
          Authorization:`Bearer ${token}`
        }}
      );
      setPortFolio((prev) => prev.filter((ele) => ele.id !== selectedImage.id));
      setSelectedImage((prev) => ({ category: prev.category }));
      openSnackbar(`Image deleted successfully`, "success");
      closeDeleteDialog();
    } catch (error) {
      if (error.status === 401) {
        dispatch(
          loginExpired({
            message: error.response?.data.message || error.message,
            status: error.status,
          })
        );
      }
      openSnackbar(error.response?.data.message || error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <main>
      <section>
        <div className=" w-fit m-auto flex gap-2 items-center text-4xl font-medium  mb-5">
          <p className="px-2">Add/Edit Portfolio Images</p>
          <AddToDriveIcon fontSize="" />
        </div>
        <form
          onSubmit={handleNewImageSubmit}
          className="w-fit m-auto grid gap-4"
        >
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border w-fit  p-2 bg-primary text-white rounded-xl  text-center"
              required
            >
              <option value="">Select Image Category</option>
              <option value="End-to-End Offerings">End-to-End Offerings</option>
              <option value="Modular Kitchen">Modular Kitchen</option>
              <option value="Living Room">Living Room</option>
              <option value="Wardrob">Wardrob</option>
            </select>
          </div>
          <input
            className="w-fit rounded-xl"
            type="file"
            accept=".jpg, .jpeg, .png, .jfif"
            required
          />
          <button
            type="submit"
            className="bg-secondary text-white py-2 px-4 rounded-xl text-lg font-medium disabled:opacity-60 disabled:cursor-progress"
            disabled={isUploading}
          >
            {isUploading ? (
              <CircularProgress color="white" />
            ) : (
              `Upload Image ${category && `to ${category}`} `
            )}
          </button>
        </form>
      </section>

      {""}

      <section className="mt-10">
        <p className="text-4xl font-medium mb-4 text-center">
          Load Portfolio Images
        </p>
        <form
          onSubmit={handleLoadImages}
          className="w-fit m-auto grid sm:flex gap-4"
        >
          <select
            className="  border w-fit  p-2 bg-primary text-white rounded-xl  text-center"
            required
          >
            <option value="">Select Image Category</option>
            <option value="End-to-End Offerings">End-to-End Offerings</option>
            <option value="Modular Kitchen">Modular Kitchen</option>
            <option value="Living Room">Living Room</option>
            <option value="Wardrob">Wardrob</option>
          </select>
          <button
            type="submit"
            className="bg-secondary text-white py-2 px-4 rounded-xl  font-medium disabled:opacity-60 disabled:cursor-progress"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress color="white" />
            ) : portfolio ? (
              "Sync Portfolio"
            ) : (
              "Load Portfolio"
            )}
          </button>
        </form>
        {portfolio && (
          <Fragment>
            <p className="text-center text-secondary opacity-50">
              *Hover/click on image for delete option
            </p>
            <div className="grid   sm:grid-cols-2  md:grid-cols-3 gap-3 p-4">
              {portfolio.map((item, index) => (
                <div key={index} className="relative group">
                  <img
                    src={item.image}
                    alt={`image-${index + 1}`}
                    className="h-full m-auto"
                  />
                  <button
                    onClick={() => openDeleteDialog(item)}
                    className="absolute top-[50%]   left-[50%] -translate-x-[50%] -translate-y-[50%] left bg-red-500 bg-opacity-80  text-white text-2xl  p-3 px-5 rounded-md  duration-300 transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </Fragment>
        )}
        <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
          <DialogTitle>
            <p className="text-3xl font-semibold">Delete Image</p>
          </DialogTitle>
          {selectedImage?.image ? (
            <Fragment>
              <DialogContent>
                <p className="text-xl mb-">
                  Are you sure want to delete this image ?
                </p>
                <p className="text-red-500 mb-4">
                  *This action cannot be undone.
                </p>
                <img src={selectedImage.image} alt="Image" />
              </DialogContent>
              <DialogActions>
                <button
                  onClick={closeDeleteDialog}
                  className="p-2 px-4 text-lg rounded-md bg-primary  text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="p-2 px-4 text-lg rounded-md bg-red-500  text-white disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isDeleting}
                >
                  {isDeleting ? <CircularProgress color="white" /> : "Delete"}
                </button>
              </DialogActions>
            </Fragment>
          ) : (
            <DialogContent>
              <p>Something went wrong, please try again!!</p>
              <button onClick={closeDeleteDialog}>Close</button>
            </DialogContent>
          )}
        </Dialog>
      </section>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarState.severity}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </main>
  );
}
