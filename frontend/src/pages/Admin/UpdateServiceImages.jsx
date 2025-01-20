import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { loginExpired } from "../../Store/actions/auth.action";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function UpdateServiceImages() {
  /*___________Hooks and states____________ */
  const dispatch = useDispatch();
  const services = useSelector((store) => store.allServices);
  const allServices = services.allServices.flat();
  const { token } = useSelector((store) => store.auth);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState({ text: "", value: "",index:0 });
  console.log(category);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [addNewServiceImageFrom, setAddNewServiceImageForm] = useState({
    image: null,
    title: "",
    size: "",
    isOpen: false,
  });
  const [selectedImage, setSelectedImage] = useState({
    isOpen: false,
    id: "",
    title: "",
    image: "",
    size: null,
  });
  /*__________Pure functions___________ */
  const openAddNewServiceImageDialog = () => {
    setAddNewServiceImageForm((prev) => ({ ...prev, isOpen: true }));
  };
  const closeAddNewServiceImageDialog = () => {
    setAddNewServiceImageForm((prev) => ({ ...prev, isOpen: false }));
  };
  const openSnackbar = (message, severity) => {
    setSnackbarState({ open: true, severity, message });
  };
  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };
  const openImageModificationDialog = (item) => {
    setSelectedImage((prev) => ({ ...prev, ...item, isOpen: true }));
  };
  const closeImageModificationDialog = () => {
    setSelectedImage((prev) => ({ ...prev, isOpen: false }));
  };
  const handleCategoryChange = (index) => {
    setCategory({
      text: allServices[index].service,
      value: allServices[index].service.toLowerCase().split(" ").join("-"),
      index
    });
  };
  /*__________async functions__________ */
  const handleNewServiceImageSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const { image, title, size } = addNewServiceImageFrom;
      const newServiceImageFormData = new FormData();
      newServiceImageFormData.append("file", image);
      newServiceImageFormData.append("title", title);
      if (size) newServiceImageFormData.append("size", size);

      const response = await axios.post(
        `${BACKEND_URL}/services/categories/${category.value}`,
        newServiceImageFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      openSnackbar(response.data.message, "success");
      setData((prev) => [...prev, response.data.data]);
      setAddNewServiceImageForm((prev) => ({
        ...prev,
        isOpen: false,
        title: "",
      }));
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
      setIsSubmitting(false);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/services/categories/${category.value}`
      );
      setData(response.data.data.images);
    } catch (error) {
      setData([])
      openSnackbar(error.response?.data.message || error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageDelete = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/services/categories/${category.value}/${selectedImage.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      openSnackbar(response.data.message, "success");
      setData((prev) => prev.filter((item) => item.id !== selectedImage.id));
      setSelectedImage((prev) => ({ ...prev, isOpen: false }));
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
      setIsSubmitting(false);
    }
  };

  /*___________useEffects__________ */
  useEffect(() => {
    if (allServices[0])
      setCategory({
        text: allServices[0].service,
        value: allServices[0].service.toLowerCase().split(" ").join("-"),
        index:0
      });
  }, [services]);
  useEffect(() => {
    if (category.value) loadData();
  }, [category]);
  return (
    <main className="p-8">
      <section>
        <div className=" w-fit m-auto flex gap-2 items-center text-4xl font-medium  mb-5">
          <p className="px-2">Add/Edit Service Images</p>
          <AddToDriveIcon />
        </div>
        <div className="m-auto w-fit">
          <button
            onClick={openAddNewServiceImageDialog}
            className=" bg-secondary text-white text-lg rounded-lg p-2"
          >
            Add New Service Image{" "}
          </button>
        </div>
        <Dialog
          open={addNewServiceImageFrom.isOpen}
          onClose={closeAddNewServiceImageDialog}
        >
          <form
            onSubmit={handleNewServiceImageSubmit}
            className="w-fit m-auto grid gap-4 p-5"
          >
            <div>
              <select
                value={category.index}
                onChange={(e) => handleCategoryChange(+e.target.value)}
                className="border w-full  min-w-[200px]  p-2 bg-primary text-white rounded-xl  text-center"
                required
                disabled={services.isLoading}
              >
                {(services.isLoading
                  ? Array.from({ length: 1 })
                  : allServices
                ).map((item, index) => (
                  <option value={index} key={index}>
                    {item ? item.service : "Loading..."}
                  </option>
                ))}
              </select>
            </div>
            <input
              className="w-fit rounded-xl"
              type="file"
              accept=".jpg, .jpeg, .png, .jfif, .avif, .webp"
              required
              onChange={(e) =>
                setAddNewServiceImageForm((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
            />
            <input
              required
              type="text"
              placeholder="Enter Title"
              value={addNewServiceImageFrom.title}
              onChange={(e) =>
                setAddNewServiceImageForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Enter Size"
              value={addNewServiceImageFrom.size}
              onChange={(e) =>
                setAddNewServiceImageForm((prev) => ({
                  ...prev,
                  size: e.target.value,
                }))
              }
            />
            <button
              type="submit"
              className="bg-secondary text-white py-2 px-4 rounded-xl text-lg font-medium disabled:opacity-60 disabled:cursor-progress"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? "Please wait...":isSubmitting ? (
                <CircularProgress color="white" />
              ) : (
                `Upload Image`
              )}
            </button>
          </form>
        </Dialog>
      </section>

      <section className="mt-10">
        <form className="flex gap-2 w-fit m-auto">
          <select
            value={category.index}
            onChange={(e) => handleCategoryChange(+e.target.value)}
            className="border w-full  min-w-[200px]  p-2 bg-primary text-white rounded-xl  text-center"
            required
            disabled={services.isLoading}
          >
            {(services.isLoading ? Array.from({ length: 1 }) : allServices).map(
              (item, index) => (
                <option value={index} key={index}>
                  {item ? item.service : "Loading..."}
                </option>
              )
            )}
          </select>
          {/* <button
            type="submit"
            className="text-nowrap bg-secondary text-white rounded-lg text-lg p-2"
          >
            Load Images
          </button> */}
        </form>
        {isLoading ? (
          <div className="flex justify-center items-center gap-4 m-8">
            <p className="text-3xl">Loading...</p>
            <CircularProgress size={"3rem"} />
          </div>
        ) : data[0] ? (
          <div className=" mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="border shadow-2xl flex flex-col gap-2 min-h-[350px] lg:max-h-[500px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-3/5 w-full object-cover object-center"
                />
                <div className="p-2 grid gap-2 h-2/5">
                  <p>{item.title}</p>
                  {/* {item.size && <p>{item.size}</p>} */}
                  <div className="flex justify-center gap-5 mb-2">
                    <button className="w-2/4 h-fit text-white bg-secondary rounded-lg text-lg">
                      Edit
                    </button>
                    <button
                      onClick={() => openImageModificationDialog(item)}
                      className="w-2/4 h-fit text-white bg-primary  rounded-lg text-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center w-full m-4 text-xl">
            No images present in {category.text}
          </p>
        )}
      </section>
      <Dialog
        open={selectedImage.isOpen}
        onClose={closeImageModificationDialog}
      >
        <DialogTitle className="text-red-400">
          Delete {selectedImage.title}?
        </DialogTitle>
        <DialogContent>
          <div className="">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="m-auto max-h-[400px]"
            />
            {/* <p className="my-2 text-slate-600">{selectedImage.title}</p> */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeImageModificationDialog}
                disabled={isSubmitting}
                className="py-2 px-4 text-secondary border-2 border-secondary font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleImageDelete}
                disabled={isSubmitting}
                className="py-2 px-4 bg-secondary text-white font-medium"
              >
                {isSubmitting ? <CircularProgress /> : <p>Delete</p>}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
