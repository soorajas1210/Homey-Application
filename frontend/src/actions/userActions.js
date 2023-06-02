import axios from "axios";
import {
  getCategoryDetailsFail,
  getCategoryDetailsSuccess,
} from "../Redux/Users/getCategoryDetailsSlice";
import {
  getServiceDetailsFail,
  getServiceDetailsSuccess,
} from "../Redux/Users/getServiceDetailsSlice";

import {
  userLoginFail,
  userLoginReq,
  userLoginSuccess,
  userLogout,
} from "../Redux/Users/UserSigninSlice";
import {
  userSignupFail,
  userSignupReq,
  userSignupSuccess,
} from "../Redux/Users/UserSignupSlice";
import {
  serviceSearchFail,
  serviceSearchReq,
  serviceSearchSuccess,
} from "../Redux/Users/serviceSearchSlice";
import {
  searchProviderFail,
  searchProviderReq,
  searchProviderSuccess,
} from "../Redux/Users/searchProviderSlice";
import {
  recommendationListFail,
  recommendationListReq,
  recommendationListSuccess,
} from "../Redux/Users/recommendationListSlice";

import {
  selectedProviderFail,
  selectedProviderReq,
  selectedProviderSuccess,
} from "../Redux/Users/selectedProviderSlice";
import {
  getBookingDataFail,
  getBookingDataSuccess,
} from "../Redux/Users/getBookingDataSlice";
import {
  bookServiceFail,
  bookServiceReq,
  bookServiceSuccess,
} from "../Redux/Users/bookServiceSlice";
import {
  userbookedListFail,
  userbookedListSuccess,
} from "../Redux/Users/userbookedListSlice";
import {
  getUserInfoFail,
  getUserInfoSuccess,
} from "../Redux/Users/getUserInfoSlice";
import {
  providerbookedListFail,
  providerbookedListSuccess,
} from "../Redux/Service-Providers/providerBookedListSlice";
import {
  getInvoiceFail,
  getInvoiceSuccess,
} from "../Redux/Users/getInvoiceSlice";
import {
  clientSecreteFail,
  clientSecreteSuccess,
} from "../Redux/Users/clientSecreteSlice";
import {
  paymentDataFail,
  paymentDataReq,
  paymentDataSuccess,
} from "../Redux/Users/paymentDataSlice";
import { userChatFail, userChatSuccess } from "../Redux/Users/userChatSlice";
import {
  fetchMessagesFail,
  fetchMessagesSuccess,
} from "../Redux/Users/fetchMessagesSlice";
import {
  sendMessageFail,
  sendMessageSuccess,
} from "../Redux/Users/sendMessageSlice";
import {
  getChatUserInfoFail,
  getChatUserInfoSuccess,
} from "../Redux/Users/getChatUserInfoSlice";
import {
  createChatFail,
  createChatSuccess,
} from "../Redux/Users/chatCreateSlice";
import { BASE_URL } from "./helper";
import { userEditFail, userEditSuccess } from "../Redux/Users/userEditSlice";

export const signin = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

    const { data } = await axios.post(
      `${BASE_URL}/api/users/signin`,
      {
        email,
        password,
      },
      config
    );
  
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));
  }
};

export const gsignin = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

    const { data } = await axios.post(
      ` ${BASE_URL}/api/users/signinWithGoogle`,
      {
        email,
      },
      config
    );
 
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

export const signup =
  (firstName, lastName, email, mobileno, password) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      dispatch(userSignupReq());

      const { data } = await axios.post(
        `${BASE_URL}/api/users/signup`,
        {
          firstName,
          lastName,
          email,
          mobileno,
          password,
        },
        config
      );

      dispatch(userSignupSuccess(data));
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userSignupFail(errorIs));
    }
  };

export const serviceDetails = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/users/getServiceDetails/${id}`,
      config
    );
  
    dispatch(getServiceDetailsSuccess(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getServiceDetailsFail(errorIs));
  }
};

export const serviceTypeDetails = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/users/getCategoryDetails/${id}`,
      config
    );
   
    dispatch(getCategoryDetailsSuccess(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getCategoryDetailsFail(errorIs));
  }
};

export const handleServiceSearch = (id) => async (dispatch) => {
  try {
    dispatch(serviceSearchReq());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/users/serviceSearch/${id}`,
      config
    );


    dispatch(serviceSearchSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(serviceSearchFail(message));
  }
};

export const searchProvider =
  (id, location, taskSize, details) => async (dispatch, getState) => {
    try {
      dispatch(searchProviderReq());
      const {
        userSignin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/users/searchProvider`,
        {
          id,
          location,
          taskSize,
          details,
        },
        config
      );

      dispatch(searchProviderSuccess(data));

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(searchProviderFail(message));
    }
  };

export const getrecommendationList =
  (newDate, taskTime) => async (dispatch, getState) => {
    try {
      dispatch(recommendationListReq());
      const {
        userSignin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/users/providerRecommendations`,
        { newDate, taskTime },
        config
      );

      dispatch(recommendationListSuccess(data));
      console.log('recdata', data)

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(recommendationListFail(message));
    }
  };



export const selectedProvider =
  (newDate, taskTime, sProvider) => async (dispatch, getState) => {
    try {
      dispatch(selectedProviderReq());
      const {
        userSignin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        ` ${BASE_URL}/api/users/selectedProvider`,
        {
          newDate,
          taskTime,
          sProvider,
        },
        config
      );

      dispatch(selectedProviderSuccess(data));

   
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(selectedProviderFail(message));
    }
  };

export const getBookingData = () => async (dispatch, getState) => {
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
      `${BASE_URL}/api/users/getBookingData`,
      config
    );

    dispatch(getBookingDataSuccess(data));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getBookingDataFail(message));
  }
};

export const bookService = (newData) => async (dispatch, getState) => {
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

    dispatch(bookServiceReq());

    const { data } = await axios.post(
      `${BASE_URL}/api/users/bookService`,
      {
        newData,
      },
      config
    );

    dispatch(bookServiceSuccess(data));
    if (data) {
      dispatch(selectedProviderSuccess(null));
      dispatch(getBookingDataSuccess(null));
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(bookServiceFail(message));
  }
};

export const userbookedList = () => async (dispatch, getState) => {
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
      `${BASE_URL}/api/users/userbookedList`,
      config
    );

    dispatch(userbookedListSuccess(data));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userbookedListFail(message));
  }
};

export const getFullUserInfo = (id) => async (dispatch, getState) => {
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
      `${BASE_URL}/api/users/getUserInfo/${id}`,
      config
    );

    dispatch(getUserInfoSuccess(data));
 
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getUserInfoFail(message));
  }
};

export const providerbookedList = () => async (dispatch, getState) => {
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
      `${BASE_URL}/api/users/providerbookedList`,
      config
    );

    dispatch(providerbookedListSuccess(data));
 
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerbookedListFail(message));
  }
};

export const cancelBooking = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.patch(
      `${BASE_URL}/api/users/cancelBooking`,
      { id },
      config
    );

    console.log("canceled", data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message);
  }
};

export const checkInvoice = (id) => async (dispatch, getState) => {
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
      `${BASE_URL}/api/users/getInvoice/${id}`,
      config
    );

   
    dispatch(getInvoiceSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getInvoiceFail(message));
  }
};

export const checkoutService = (product) => async (dispatch, getState) => {
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

    const data = await axios.post(
      `${BASE_URL}/api/users/checkout`,
      { product },
      config
    );

    dispatch(clientSecreteSuccess(data.data.clientSecret));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(clientSecreteFail(message));
  }
};

export const paymentSuccess = (newData) => async (dispatch, getState) => {
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
    dispatch(paymentDataReq());
    const payed = await axios.post(
      `${BASE_URL}/api/users/paymentSuccess`,
      { newData },
      config
    );
 
    dispatch(paymentDataSuccess(payed));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(paymentDataFail(message));
  }
};

export const createChat =
  (senderId, receiverId, serviceId) => async (dispatch, getState) => {
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
      const { data } = await axios.post(
        `${BASE_URL}/api/users/createChat`,
        { senderId, receiverId, serviceId },
        config
      );
   
      dispatch(createChatSuccess(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(createChatFail(message));
    }
  };

export const getChats = (bookedId) => async (dispatch, getState) => {
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
    const { data } = await axios.post(
      `${BASE_URL}/api/users/chat/${userInfo._id}`,
      { bookedId },
      config
    );
   
    dispatch(userChatSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userChatFail(message));
  }
};

export const fetchMessages = (id) => async (dispatch, getState) => {
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
      `${BASE_URL}/api/users/getMessages/${id}`,
      config
    );
 

    dispatch(fetchMessagesSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    fetchMessagesFail(message);
  }
};

export const addMessage = (message) => async (dispatch, getState) => {
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
    const { data } = await axios.post(
      `${BASE_URL}/api/users/messages`,
      message,
      config
    );


    dispatch(sendMessageSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    sendMessageFail(message);
  }
};

export const getChatUserInfo = (id) => async (dispatch, getState) => {
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
      `${BASE_URL}/api/users/getChatInfo/${id}`,
      config
    );

    dispatch(getChatUserInfoSuccess(data));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getChatUserInfoFail(message));
  }
};

export const editUser = (editData) => async (dispatch, getState) => {
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

    const data = await axios.patch(
      `${BASE_URL}/api/users/editUser`,
      { editData },
      config
    );
dispatch(userEditSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message);
    dispatch(userEditFail(message))
  }
};
