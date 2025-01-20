import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../Store/actions/auth.action";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

export default function Login() {
  const { isLoading, isError, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate("/admin");
  }, [token]);
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
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    if (!email || !password) return
    dispatch(adminLogin(email, password, openSnackbar));
  };
  return (
    <main className="p-8 mt-28 grid justify-center gap-4">
      <h1 className="text-4xl text-center font-semibold ">Admin Panel</h1>
      <form onSubmit={handleLogin} className="w-fit grid gap-2">
        <input
          type="email"
          placeholder="Enter E-mail"
          className="placeholder:text-black border-black min-w-[250px] rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="placeholder:text-black border-black min-w-[250px] rounded-lg"
          required
        />
        {isError && <p className="text-red-400 text-center">{isError}</p>}
        <button
        disabled={isLoading}
          type="submit"
          className="bg-secondary text-white text-lg py-2 rounded-lg disabled:opacity-75 disabled:cursor-progress"
        >
          {isLoading ? <CircularProgress/> : <p>Login</p>}
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
