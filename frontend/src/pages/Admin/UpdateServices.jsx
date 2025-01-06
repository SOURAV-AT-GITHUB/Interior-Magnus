import { Fragment, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UpdateServices(props) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { services, setServices } = props;
const {isLoading,isError,allServices} = useSelector(store=>store.allServices)
  const [selectedService, setSelectedService] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState(false);
  const openDeleteDialog = (item) => {
    setSelectedService(item);
    setOpenDeleteDialog(true);
  };
  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedService(null);
  };
  const confirmDelete = async (id) => {
    setIsDeleting(true);
    try {
      await axios.delete(`${BACKEND_URL}/services/all-categories/${id}`);
      setServices(
        services.map((innerArray) => {
          return innerArray.filter((ele) => ele.id !== id);
        })
      );
      openSnackbar(
        `${selectedService.service} deletd from column ${selectedService.column}.`,
        "success"
      );
    } catch (error) {
      console.log(error);
      openSnackbar(
        `Failed to delete ${selectedService.service} from column ${selectedService.column}.`,
        "error"
      );
    } finally {
      setIsDeleting(false);
      closeDeleteDialog();
    }
  };

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const openSnackbar = (message, severity) => {
    setSnackbarState({ open: true, severity, message });
  };
  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const [isAddnewDialogOpen, setAddnewDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const openAddnewDialog = () => setAddnewDialog(true);
  const closeAddnewDialog = () => setAddnewDialog(false);
  const handleNewServiceSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const newService = {
      column: Number(event.target[0].value),
      service: event.target[1].value,
    };
    try {
      await axios.post(`${BACKEND_URL}/services/all-categories`, newService);
      let temp = [...services];
      temp[newService.column - 1].push(newService);
      setServices([...temp]);
      openSnackbar(
        `${newService.service} added to column ${newService.column}`
      );
    } catch (error) {
      console.log(error);
      openSnackbar(
        `Failed to ${newService.service} add to column ${newService.column}`
      );
    } finally {
      setIsSubmitting(false);
      closeAddnewDialog();
    }
  };
  const [isEditServiceDialogOpen, setEditServiceDialogOpen] = useState(false);
  const openEditServiceDialog = (item) => {
    setSelectedService(item);
    setEditServiceDialogOpen(true);
  };
  const closeEditServiceDialog = () => {
    setSelectedService(null);
    setEditServiceDialogOpen(false);
  };
  const handleEditServiceSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const updatedService = {
      column: selectedService.column,
      service: selectedService.service,
    };
    try {
      await axios.patch(
        `${BACKEND_URL}/services/all-categories/${selectedService.id}`,
        updatedService
      );
      let temp = services.map((innerArray) => {
        return innerArray.filter((ele) => ele.id !== selectedService.id);
      });
      temp[selectedService.column - 1].push(updatedService);
      setServices([...temp]);
      openSnackbar(
        `Service updated as ${updatedService.service} to column ${updatedService.column}`,
        "success"
      );
    } catch (error) {
      console.log(error);
      openSnackbar(
        `Faild to update ${updatedService.service} to column ${updatedService.column}`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
      setEditServiceDialogOpen(false);
    }
  };
  return (
    <div>
      <p className="text-4xl font-medium w-fit m-auto mb-4">Update Services</p>
      <div className="w-fit m-auto mb-4">
        <button
          onClick={openAddnewDialog}
          className="flex gap-2  bg-secondary text-white text-xl  p-1 px-2 rounded-md"
        >
          <p>Add New Service</p>
          <DesignServicesIcon />
        </button>
      </div>
      <Dialog open={isAddnewDialogOpen} onClose={closeAddnewDialog}>
        <DialogTitle>
          <p className="font-semibold text-3xl">Add New Service</p>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleNewServiceSubmit}
            className="grid gap-4  w-fit m-auto mb-6"
          >
            <select
              required
              className="p-1 border rounded-md bg-primary text-white text-xl"
            >
              <option value="">Select Column Number</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <input
              required
              type="text"
              placeholder="Enter Service Name"
              className="rounded-md border text-xl font-medium text-secondary  border-secondary placeholder:text-secondary placeholder:font-medium"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-secondary text-white py-1 rounded text-xl"
            >
              {isSubmitting ? (
                <CircularProgress color="white" />
              ) : (
                <p className="text-2xl">Add</p>
              )}
            </button>
            <button
              onClick={closeAddnewDialog}
              type="button"
              className="bg-red-500 text-white text-2xl rounded py-1"
            >
              Close
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <table className="m-auto border-collapse">
        <thead>
          <tr className="text-center bg-primary text-white ">
            <th className="px-2 border border-secondary ">SL. NO.</th>
            <th className="px-2 border border-secondary ">Service</th>
            <th className="px-2 border border-secondary ">Column</th>
            <th className="px-2 border border-secondary ">Update</th>
            <th className="px-2 border border-secondary ">Delete</th>
          </tr>
        </thead>
        <tbody>
          {services.map((column, index) => (
            <Fragment key={index}>
              <tr className="text-center w-full bg-secondary text-white px-1 border border-secondary">
                <td colSpan={5}>Column {index + 1}</td>
              </tr>
              {(column[0] ? column : Array.from({length:5})).map((item, index) => (
          item ?      <tr key={index}>
                  <td className="border border-secondary p-1 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-secondary p-1 text-center">
                    {item.service}
                  </td>
                  <td className="border border-secondary p-1 text-center">
                    {item.column}
                  </td>
                  <td className="border border-secondary p-1 text-center">
                    <button
                      onClick={() => openEditServiceDialog({ ...item, index })}
                      className="border p-1 px-4 bg-primary text-white rounded"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-secondary p-1 text-center">
                    <button
                      onClick={() => openDeleteDialog(item)}
                      className="border p-1 px-4 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr> : <tr key={index}> 
                  <td colSpan={5} ><Skeleton /></td>
                  
                   </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      <Dialog open={isEditServiceDialogOpen} onClose={closeEditServiceDialog}>
        <DialogTitle>
          {" "}
          <p className="font-semibold text-3xl">Edit Service</p>
        </DialogTitle>
        {selectedService ? (
          <DialogContent>
            <form
              onSubmit={handleEditServiceSubmit}
              className="grid gap-4  w-fit m-auto mb-6"
            >
              <select
                required
                className="p-1 border rounded-md bg-primary text-white text-xl"
                value={selectedService.column}
                onChange={(e) =>
                  setSelectedService((prev) => ({
                    ...prev,
                    column: Number(e.target.value),
                  }))
                }
              >
                <option value="">Select Column Number</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <input
                required
                type="text"
                placeholder="Enter Service Name"
                className="rounded-md border text-xl font-medium text-secondary  border-secondary placeholder:text-secondary placeholder:font-medium"
                value={selectedService.service}
                onChange={(e) =>
                  setSelectedService((prev) => ({
                    ...prev,
                    service: e.target.value,
                  }))
                }
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-secondary text-white py-1 rounded text-xl"
              >
                {isSubmitting ? (
                  <CircularProgress color="white" />
                ) : (
                  <p className="text-2xl">Updated</p>
                )}
              </button>
              <button
                onClick={closeEditServiceDialog}
                type="button"
                className="bg-red-500 text-white text-2xl rounded py-1"
              >
                Close
              </button>
            </form>
          </DialogContent>
        ) : (
          <Fragment>
            <DialogContent>
              <p>Something went wrong!!</p>
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={closeEditServiceDialog}>
                Close
              </Button>
            </DialogActions>
          </Fragment>
        )}
      </Dialog>

      <Dialog open={isOpenDeleteDialog} onClose={closeDeleteDialog}>
        <DialogTitle>
          <p className="font-semibold text-3xl">Delete Item</p>
        </DialogTitle>
        {selectedService ? (
          <Fragment>
            <DialogContent>
              <p className="text-red-400 ">*This action cannot be undone.</p>
              <p className="sm:text-nowrap">
                {" "}
                Are you sure you want to delete{" "}
                <span className="font-medium text-lg">
                  {selectedService?.service}
                </span>{" "}
                from column{" "}
                <span className="font-medium text-lg">
                  {selectedService?.column}
                </span>{" "}
                ?
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => confirmDelete(selectedService.id)}
                color="error"
                disabled={isDeleting}
              >
                {isDeleting ? <CircularProgress /> : <p>Delete</p>}
              </Button>
            </DialogActions>
          </Fragment>
        ) : (
          <Fragment>
            <DialogContent>
              <p>Something went wrong!!</p>
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={closeDeleteDialog}>
                Close
              </Button>
            </DialogActions>
          </Fragment>
        )}
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
    </div>
  );
}
