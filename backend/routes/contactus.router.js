const express = require("express");
const axios = require("axios");
const { database, databaseBasePath } = require("../config/firebase.config");
const verifyToken = require("../middlewares/verifyToken");
const contactusRouter = express.Router();

contactusRouter.get("/:year/:month", verifyToken, async (req, res) => {
  const { year, month } = req.params;
  try {
    const dataRef = database.ref(
      `${databaseBasePath}/contact_requests/${year}/${month}`
    );
    const snapshot = await dataRef.once("value");
    if (!snapshot.exists()) {
      return res
        .status(404)
        .json({ message: `No requests are there in ${month} ${year}` });
    } else {
      const rawData = snapshot.val();
      const headers = Object.keys(rawData[Object.keys(rawData)[0]]);
      const data = [
        headers,
        ...Object.values(rawData).map((requests) =>
          headers.map((header) => requests[header])
        ),
      ];
      res.json({ message: "Request resolved", data });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
});
contactusRouter.post("/submit-form", async (req, res) => {
  try {
    const { first_name, last_name, email, contact_number, date, message } =
      req.body;
    const authRef = database.ref(`${databaseBasePath}/zoho_auth`);
    const snapshot = await authRef.once("value");
    if (!snapshot.exists())
      return res
        .status(404)
        .json({ message: "Credentials not found in database" });
    else {
      let {
        access_token,
        refresh_token,
        expires_at,
        client_id,
        client_secret,
      } = snapshot.val();
      if (Date.now() > expires_at) {
        const tokenResponse = await axios.post(
          `https://accounts.zoho.in/oauth/v2/token?refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&grant_type=refresh_token`
        );
        access_token = tokenResponse.data.access_token;
        let expires_at = Date.now() + tokenResponse.data.expires_in * 1000;
        await authRef.update({ access_token, expires_at });
      }
      const leadData = {
        data: [
          {
            Company: "Interior Magnus",
            Last_Name: last_name,
            First_Name: first_name,
            Email: email,
            Phone: contact_number,
            Lead_Source: "Website",
            Description: message,
          },
        ],
      };
      await axios.post(`https://www.zohoapis.in/crm/v7/Leads`, leadData, {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      await database
        .ref(`${databaseBasePath}/contact_requests/${date.year}/${date.month.toLowerCase()}`)
        .push()
        .set({
          first_name,
          last_name,
          email,
          contact_number,
          date: `${date.date}/${date.month}/${date.year}`,
          message,
          time: `${String(date.hours).padStart(2, "0")}:${String(
            date.minutes
          ).padStart(2, "0")}`,
        });
      return res.json({
        message: "Form submitted successfully, we'll get back to you soon",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = contactusRouter;
