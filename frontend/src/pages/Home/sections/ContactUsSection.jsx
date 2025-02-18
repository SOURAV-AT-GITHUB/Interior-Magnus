import { useEffect, useState } from "react";
import doorImage from "/contact-us-images/door-image.png";
import doorBehindImage from "/contact-us-images/door-behind.jfif";
import padlockHead from "/contact-us-images/padlock-head.svg";
import padlockBody from "/contact-us-images/padlock-body.svg";
import Button from "../../../components/Button";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import {
  CONTACTUS_FORM_UPDATE,
  CONTACTUS_FORM_CLEAR,
} from "../../../Store/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import indianFlag from "/contact-us-images/indian-flag.png";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export default function ContactUsSection() {
  /*____________Hooks and states_____________ */
  const [isLeft, setIsLeft] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { first_name, last_name, email, contact_number, message,project_name } = useSelector(
    (store) => store.contactusForm
  );
  const [numberError, setNumberError] = useState(false);
  /*______________Pure functions________________ */
  function getCurrentDate() {
    const now = new Date();

    const date = now.getDate();
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return {
      date,
      month,
      year,
      hours,
      minutes,
    };
  }
  const openSnackbar = (message, severity) => {
    setSnackbarState({ open: true, severity, message });
  };
  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  /*_____________async functions________________ */
  // const handleMailSending =(event)=>{
  //   event.preventDefault()
  //   const subject = "Inquiry about your product";
  //   const firstname = event.target[0].value
  //   const lastname = event.target[1].value
  //   const email = event.target[2].value
  //   const contact = event.target[3].value
  //   const message = event.target[4].value
  //   let body = `Hello,%0D%0A%0D%0A${message.split(' ').join("%20")}%0D%0A%0d%0A${firstname}%20${lastname}%0D%0AContact%20Number%20%3A%20${contact}`
  //   if(email) body += `%0D%0AEmail%20%3A%20${email}`
  //   const mailToLink =`mailto:hello@interiormagnus.com?subject=${encodeURIComponent(subject)}&body=${body}`
  //   window.location.href = mailToLink
  // }

  const handleSubmission = async (event) => {
    event.preventDefault();
    if (contact_number.length < 10) {
      setNumberError(true);
      return;
    }
    setIsSubmitting(true);
    const date = getCurrentDate();
    try {
      await axios.post(
        `${BACKEND_URL}/contactus/submit-form`,
        {
          first_name,
          last_name,
          email,
          contact_number: `+91 ${contact_number}`,
          message,
          date,
          project_name
        }
      );
      dispatch({ type: CONTACTUS_FORM_CLEAR });
      openSnackbar(
        "Form submitted successfully, we'll get back to you soon",
        "success"
      );
    } catch (/* eslint-disable-line no-unused-vars */ error) {
      openSnackbar("Failed to submit form, please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /*_____________useEffects________________ */
  useEffect(() => {
    let interval = setInterval(() => setIsLeft((prev) => !prev), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home-contactus"
      className=" relative bg-white py-10 lg:pb-0 lg:pt-20 px-5 lg:px-28 flex flex-col gap-6 lg:grid grid-cols-2 grid-rows-4 overflow-hidden "
    >
      <div className="lg:order-2 grid gap-4 text-center lg:text-left ">
        <div className="self-center">
          <p className="text-secondary">Contact Us</p>
          <p className="text-xl  lg:text-4xl">
            Let&apos;s Start Your Design Journey
          </p>
        </div>
        <p className="font-light text-sm  lg:text-xl  text-slate-400 self-center">
          Ready to bring your vision to life? Reach out to us today to start the
          conversation. We look forward to creating a space that’s uniquely
          yours!
        </p>
      </div>

      <div className="lg:order-1 col-span-1 row-span-4 h-full   relative z-0 flex flex-col justify-end   overflow-hidden ">
        <img
          src={doorImage}
          alt="door-image"
          className="w-[65%] h-full  z-[1] lg:-mb-1 "
        />
        <img
          src={doorBehindImage}
          alt="dor-behind"
          className={`${
            isLeft
              ? "right-[60%] -bottom-[30%] "
              : "right-[13%] rotate-[15deg] -bottom-[5%]"
          } w-[55%] h-[95%]  ease-in-out duration-1000  absolute border-4 border-black`}
        />

        <div className="bg-secondary p-2 px-3   lg:max-h-max  lg:max-w-max   lg:p-4 lg:px-6  grid  absolute top-[60%] right-[37%] z-[1] rounded-full border border-black shadow-buttonShadow">
          <img
            src={padlockHead}
            alt="padlock-head"
            className={`m-auto w-10/12 lg:w-auto  h-4 lg:h-max  ${
              isLeft ? "" : "rotate-[45deg] "
            } -mb-1   ease-in-out duration-1000`}
          />
          <img
            src={padlockBody}
            alt="padlock-body"
            className="m-auto  h-4 lg:h-max"
          />
        </div>
      </div>

      <div className="lg:order-3 row-span-3">
        <form onSubmit={handleSubmission}>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <input
                value={first_name}
                onChange={(e) =>
                  dispatch({
                    type: CONTACTUS_FORM_UPDATE,
                    payload: { first_name: e.target.value },
                  })
                }
                type="text"
                placeholder=" "
                name="first-name"
                required
              />
              <label htmlFor="first-name">First Name</label>
            </div>
            <div className="relative">
              <input
                value={last_name}
                onChange={(e) =>
                  dispatch({
                    type: CONTACTUS_FORM_UPDATE,
                    payload: { last_name: e.target.value },
                  })
                }
                type="text"
                placeholder=" "
                name="last-name"
                required
              />
              <label htmlFor="last-name">Last Name</label>
            </div>
            <div className="relative col-span-2">
              <input
                value={email}
                onChange={(e) =>
                  dispatch({
                    type: CONTACTUS_FORM_UPDATE,
                    payload: { email: e.target.value },
                  })
                }
                type="email"
                placeholder=" "
                name="email"
                required
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="error-wrapper col-span-2">
              <div className=" flex items-center gap-2">
                <div className="flex items-center justify-center p-[10px] gap-1 border border-solid border-[#ccc] h-full">
                  <img src={indianFlag} alt="" className="h-5" />
                  <p>+91</p>
                </div>

                <div className="relative w-full">
                  <input
                    value={contact_number}
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        dispatch({
                          type: CONTACTUS_FORM_UPDATE,
                          payload: { contact_number: e.target.value },
                        });
                      }
                      if (numberError && e.target.value.length === 10) {
                        setNumberError(false);
                      }
                    }}
                    type="number"
                    placeholder=" "
                    name="contact-number"
                    required
                  />
                  <label htmlFor="contact-number">Contact Number</label>
                </div>
              </div>
              {numberError && (
                <p className="text-red-600 text-sm">
                  *Please Enter a valid Number
                </p>
              )}
            </div>

            <div className="relative col-span-2">
              <input
                value={project_name}
                onChange={(e) =>
                  dispatch({
                    type: CONTACTUS_FORM_UPDATE,
                    payload: { project_name: e.target.value },
                  })
                }
                type="text"
                placeholder=" "
                name="project_name"
                required
              />
              <label htmlFor="project_name">Project Name</label>
            </div>

            <div className="relative col-span-2">
              {/* <input  type="text" placeholder=" " name="your-message-here" className="h-20" required/> */}
              <textarea
                value={message}
                onChange={(e) =>
                  dispatch({
                    type: CONTACTUS_FORM_UPDATE,
                    payload: { message: e.target.value },
                  })
                }
                placeholder=" "
                name="your-message-here"
                className="relative col-span-2 w-full border-2 min-h-24"
                required
              />
              <label htmlFor="your-message-here">Your Message Here</label>
            </div>
          </div>
          <div className="w-fit m-auto mt-4">
            <Button
              text={isSubmitting ? <CircularProgress /> : "Submit"}
              isDisabled={isSubmitting}
              color="primary"
            />
          </div>
        </form>
      </div>


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
    </section>
  );
}
