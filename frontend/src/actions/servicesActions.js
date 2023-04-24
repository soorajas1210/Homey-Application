import axios from "axios";
import {
  providerRegFail,
  providerRegReq,
  providerRegSuccess,
} from "../Redux/Service-Providers/providerRegistrationSlice";

import {
  toVerifyListFail,
  toVerifyListReq,
  toVerifyListSuccess,
} from "../Redux/Service-Providers/toVerifyListSlice";
import {
  providerBookedDetailsFail,
  providerBookedDetailsSuccess,
} from "../Redux/Service-Providers/providerBookedDetailsSlice";
import {
  sendInvoiceFail,
  sendInvoiceReq,
  sendInvoiceSuccess,
} from "../Redux/Service-Providers/sendInvoiceSlice";

export const providerReg =
  (
    serviceCategory,
    workLocation,
    profileImage,
    serviceCharge,
    workHours,
    experience,
    phoneNumber,
    idProof,
    city,
    country,
    state,
    streetAddress,
    pin
  ) =>
  async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      dispatch(providerRegReq());

      const { data } = await axios.post(
        "/api/provider/toVerify",
        {
          serviceCategory,
          workLocation,
          profileImage,
          serviceCharge,
          workHours,
          experience,
          phoneNumber,
          idProof,
          city,
          country,
          state,
          streetAddress,
          pin,
        },
        config
      );

      dispatch(providerRegSuccess(data));
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(providerRegFail(errorIs));
    }
  };

export const toVerifyList = () => async (dispatch, getState) => {
  try {
    dispatch(toVerifyListReq());

    const {
      userSignin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/provider/toVerifyList", config);

    console.log(data);

    dispatch(toVerifyListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(toVerifyListFail(message));
  }
};

export const providerBookingHandler =
  (id, status) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const config = {
        headers: {
          " Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.patch(
        "/api/provider/providerBookingHandler",
        { id, status },
        config
      );
      console.log(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

export const bookedServiceDetails = (id) => async (dispatch, getState) => {
  try {
    console.log("Ooked id", id);
    const {
      userSignin: { userInfo },
    } = getState();

    const config = {
      headers: {
        " Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/provider/serviceDetails/${id}`,
      config
    );
    console.log("service Details", data);

    dispatch(providerBookedDetailsSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerBookedDetailsFail(message));
  }
};

export const Invoice = (newData) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(sendInvoiceReq());

    const { data } = await axios.post(
      "/api/provider/sendInvoice",
      {
        newData,
      },
      config
    );
    console.log("sendInvoice", data);
    dispatch(sendInvoiceSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(sendInvoiceFail(message));
  }
};