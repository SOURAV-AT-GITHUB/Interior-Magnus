import { useState } from "react";
import {
  // TextField,
  MenuItem,
  Select,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import FlagIcon from "react-world-flags";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function GetQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
  });
  const countries = [
    { code: "+1", flag: "US" },
    { code: "+44", flag: "GB" },
    { code: "+91", flag: "IN" },
    { code: "+61", flag: "AU" },
  ];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };
  return (
    <div className="sm:w-2/4 m-auto ">
      <h4 className="text-enter font-medium text-xl mb-3">
        Your kitchen estimate is almost ready!
      </h4>
      <form className="grid gap-6">
        <div className="relative">
          <label
            htmlFor="name"
            className={`absolute ${formData.name && "top-0"}  bg-white px-1`}
          >
            Name
          </label>
          <input
            name="name"
            type="text"
            placeholder=""
            className="py-4"
            value={formData.name}
            onInput={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="relative">
          <label
            htmlFor="email"
            className={`absolute ${formData.email && "top-0"}  bg-white px-1`}
          >
            Email ID
          </label>
          <input
            name="email"
            type="email"
            placeholder=""
            className="py-4"
            value={formData.email}
            onInput={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <FormControl className="w-full">
            <OutlinedInput
              type="number"
              le
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    appearance: "none", // Disable spin buttons
                  },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Select
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    sx={{
                      minWidth: "70px",
                      "& .MuiSelect-select": {
                        display: "flex",
                        justifyContent: "center",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", // Remove the outline border of the Select
                      },
                      backgroundColor: "transparent", // Make the background of the Select transparent
                    }}
                    disableUnderline // Remove underline from the select
                  >
                    {countries.map((country) => (
                      <MenuItem
                        key={country.code}
                        value={country.code}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FlagIcon
                          code={country.flag}
                          style={{ width: "20px", paddingRight: "3px" }}
                        />
                        <p className="mr-3 text-xs mt-1">{country.code}</p>
                      </MenuItem>
                    ))}
                  </Select>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className="flex items-center">
            {" "}
            <Checkbox
              {...label}
              defaultChecked
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[400],
                },
              }}
            />
            <p>Send me updates on Whatsapp</p>
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="property-name"
            className={`absolute ${
              formData.property && "top-0"
            } z-0  bg-white px-1`}
          >
            Property Name
          </label>
          <input
            name="property-name"
            type="text"
            placeholder=""
            className="py-4"
            value={formData.property}
            onInput={(e) =>
              setFormData({ ...formData, property: e.target.value })
            }
          />
        </div>
      </form>

      <div className="mt-8 mb-16  grid gap-2">
        <p>
          By submitting this form, you agree to the{" "}
          <a href="" className="text-red-500">
            privacy policy
          </a>{" "}
          &{" "}
          <a href="" className="text-red-500">
            terms and conditions
          </a>
        </p>

        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="" className="text-red-500">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="" className="text-red-500">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}
