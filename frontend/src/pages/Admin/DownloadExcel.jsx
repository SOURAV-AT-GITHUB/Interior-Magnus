import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from 'xlsx';
import { loginExpired } from "../../Store/actions/auth.action";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function DownloadExcel() {
  /*____________constant values______________ */
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  /*____________hooks and states */
  const { token } = useSelector((store) => store.auth);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  /*_____________Pure functions */
  const openSnackbar = (message, severity) => {
    setSnackbarState({ open: true, severity, message });
  };
  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };
  /*____________async functions_____________ */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const month = event.target[0].value;
    const year = event.target[1].value;
    setIsSubmitting(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/contactus/${year}/${month}`,{headers:{Authorization:`Bearer ${token}`}}
      );
      const ws = XLSX.utils.aoa_to_sheet(response.data.data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb,ws,'Sheet1')
      XLSX.writeFile(wb,`${month}-${year}-requests.xlsx`)
    } catch (error) {
      if (error.status === 401) {
        dispatchEvent(
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
  return (
    <main>
      <div className="flex items-end gap-2 w-fit m-auto text-secondary">
        <h1 className="text-4xl font-medium">Download Contact Requests</h1>
        <FileDownloadIcon fontSize="large" className=" "/>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-fit m-auto p-4 flex flex-col md:flex-row items-center gap-4"
      >
        <select
          name=""
          required
          className="bg-primary text-white w-full rounded-md p-1 text-lg"
        >
          <option value="">Select month</option>
          {months.map((month) => (
            <option value={month.toLowerCase()} key={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          name=""
          required
          className="bg-primary text-white w-full rounded-md p-1 text-lg"
        >
          <option value="">Select year</option>
          <option value="2025">2025</option>
        </select>
        <button
          type="submit"
          className="bg-secondary text-white w-full rounded-md p-2 flex justify-center gap-2 disabled:opacity-70 disabled:cursor-progress"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress color=""/>
          ) : (
            <Fragment>
              <p>Download</p>
              <FileDownloadIcon />
            </Fragment>
          )}
        </button>
      </form>
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
