import axios from "axios";
import {
  addServiceFail,
  addServiceReq,
  addServiceSuccess,
} from "../Redux/Admin/addServiceSlice";
import {
  addServiceTypeFail,
  addServiceTypeReq,
  addServiceTypeSuccess,
} from "../Redux/Admin/addServiceTypeSlice";

import {
  adminLoginFail,
  adminLoginSuccess,
  adminLoginReq,
} from "../Redux/Admin/adminSigninSlice";
import {
  servicesListFail,
  servicesListReq,
  servicesListSuccess,
} from "../Redux/Admin/servicesListSlice";
import {
  serviceTypeListFail,
  serviceTypeListReq,
  serviceTypeListSuccess,
} from "../Redux/Admin/serviceTypeListSlice";

import {
  usersListReq,
  usersListSuccess,
  userListFail,
} from "../Redux/Admin/usersListSlice";
import {
  providerVerifyFail,
  providerVerifySuccess,
} from "../Redux/Admin/providerVerifySlice";

import {
  userBlockFail,
  userBlockReq,
  userBlockSuccess,
} from "../Redux/Users/userBlockSlice";
import {
  providerRejectFail,
  providerRejectSuccess,
} from "../Redux/Admin/providerRejectSlice";
import {
  providerListFail,
  providerListReq,
  providerListSuccess,
} from "../Redux/Admin/providerListSlice";
import {
  providerBlockFail,
  providerBlockReq,
  providerBlockSuccess,
} from "../Redux/Admin/providerBlockSlice";
import {
  addLocationFail,
  addLocationReq,
  addLocationSuccess,
} from "../Redux/Admin/addLocationSlice";
import {
  locationListFail,
  locationListReq,
  locationListSuccess,
} from "../Redux/Admin/locationListSlice";
import {
  bookingListFail,
  bookingListSuccess,
} from "../Redux/Admin/bookingListSlice";
import { paymentInfoFail, paymentInfoSuccess } from "../Redux/Admin/paymentInfoSlice";
import { BASE_URL } from "./helper";



export const Signin = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    dispatch(adminLoginReq());


    const { data } = await axios.post(
    `  ${BASE_URL}/api/admin/adminLogin`,
      {
        email,
        password,
      },
      config
    );

  
    dispatch(adminLoginSuccess(data));
    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(adminLoginFail(errorIs));
  }
};

export const usersList = () => async (dispatch, getState) => {
  try {
    dispatch(usersListReq());

    const {
      adminSignin: { adminInfo },
    } = getState();

  
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/admin/usersList`, config);


    dispatch(usersListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userListFail(message));
  }
};

export const blockUserAction = (id, status) => async (dispatch, getState) => {
  try {
  
    dispatch(userBlockReq());

    const {
      adminSignin: { adminInfo },
    } = getState();



    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const sendStatus = {
      isVerified: status,
    };

    const { data } = await axios.patch(
      `${BASE_URL}/api/admin/blockUser/${id}`,
      sendStatus,
      config
    );

   
    dispatch(userBlockSuccess(data));
    // dispatch(usersListSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userBlockFail(message));
  }
};

export const addServiceType =
  (serviceType, fileLink, text) => async (dispatch) => {
    try {
    
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      dispatch(addServiceTypeReq());

      const { data } = await axios.post(
        `${BASE_URL}/api/admin/addServiceTypes`,
        {
          serviceType,
          fileLink,
          text,
        },
        config
      );
    
      dispatch(addServiceTypeSuccess(data));
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(addServiceTypeFail(errorIs));
    }
  };

export const sTypeList = () => async (dispatch) => {
  try {
    dispatch(serviceTypeListReq());

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/admin/serviceTypeList`,
      config
    );



    dispatch(serviceTypeListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(serviceTypeListFail(message));
  }
};

export const addServices =
  (stype, services, imageLink, text) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      dispatch(addServiceReq());

      const { data } = await axios.post(
        `${BASE_URL}/api/admin/addServices`,
        {
          stype,
          services,
          imageLink,
          text,
        },
        config
      );
     
      dispatch(addServiceSuccess(data));
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(addServiceFail(errorIs));
    }
  };

export const sList = () => async (dispatch) => {
  try {
    dispatch(servicesListReq());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/admin/servicesList`, config);

 

    dispatch(servicesListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(servicesListFail(message));
  }
};

export const verifyProvider = (id) => async (dispatch, getState) => {
  try {
    const {
      adminSignin: { adminInfo },
    } = getState();


    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `${BASE_URL}/api/admin/verifyProvider/${id}`,
      config
    );

    dispatch(providerVerifySuccess(data));
    // dispatch(usersListSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerVerifyFail(message));
  }
};

export const rejectProvider = (id) => async (dispatch, getState) => {
  try {
    const {
      adminSignin: { adminInfo },
    } = getState();


    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `${BASE_URL}/api/admin/rejectProvider/${id}`,
      config
    );


    dispatch(providerRejectSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerRejectFail(message));
  }
};

export const providersList = () => async (dispatch, getState) => {
  try {
    dispatch(providerListReq());

    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/admin/providersList`,
      config
    );

   

    dispatch(providerListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerListFail(message));
  }
};

export const blockProvider = (id, status) => async (dispatch, getState) => {
  try {
  
    dispatch(providerBlockReq());

    const {
      adminSignin: { adminInfo },
    } = getState();


    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const sendStatus = {
      role: status,
    };

    const { data } = await axios.patch(
      `${BASE_URL}/api/admin/blockProvider/${id}`,
      sendStatus,
      config
    );


    dispatch(providerBlockSuccess(data));
    // dispatch(usersListSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerBlockFail(message));
  }
};

export const newLocation = (location) => async (dispatch, getState) => {
  try {
    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${adminInfo.token}`,
      },
    };
    dispatch(addLocationReq());

    const { data } = await axios.post(
      `${BASE_URL}/api/admin/addLocation`,
      {
        location,
      },
      config
    );
  
    dispatch(addLocationSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(addLocationFail(message));
  }
};

export const locationList = () => async (dispatch) => {
  try {
    dispatch(locationListReq());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/admin/locationList`,
      config
    );

   

    dispatch(locationListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(locationListFail(message));
  }
};

export const getBookedList = () => async (dispatch, getState) => {
  try {
    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/admin/getBookedList`,
      config
    );
   
    dispatch(bookingListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(bookingListFail(message));
  }
};

export const deleteLocation = (locId) => async (dispatch, getState) => {
  try {
    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const data = await axios.delete(
      `${BASE_URL}/api/admin/deleteLocation`,
      { locId },
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


export const getPaymentInfo = () => async (dispatch, getState) => {
  try {
    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/admin/paymentInfo`,
      config
    );
   
    dispatch(paymentInfoSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
       dispatch(paymentInfoFail(message));
  }
};