import { BASE_URL } from "./helper";
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
import {
  getProviderInfoFail,
  getProviderInfoSuccess,
} from "../Redux/Service-Providers/getProviderInfoSlice";

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
        `${BASE_URL}/api/provider/toVerify`,
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

    const { data } = await axios.get(
     ` ${BASE_URL}/api/provider/toVerifyList`,
      config
    );

  

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
        ` ${BASE_URL}/api/provider/providerBookingHandler`,
        { id, status },
        config
      );
      console.log(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          console.log(message);
    }
  };

export const bookedServiceDetails = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.get(
      `${BASE_URL}/api/provider/serviceDetails/${id}`,
      config
    );
   

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
     ` ${BASE_URL}/api/provider/sendInvoice`,
      {
        newData,
      },
      config
    );
  
    dispatch(sendInvoiceSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(sendInvoiceFail(message));
  }
};

export const providerDetails = (pid) => async (dispatch, getState) => {

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

    const { data } = await axios.get(
      `${BASE_URL}/api/provider/providerInfo/${pid}`,
      config
    );
   
    dispatch(getProviderInfoSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getProviderInfoFail(message));
  }
};
