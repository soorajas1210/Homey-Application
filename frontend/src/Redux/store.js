import { configureStore } from "@reduxjs/toolkit";
import UserSigninReducer from "./Users/UserSigninSlice";
import UserSignupReducer from "./Users/UserSignupSlice";
import usersListReducer from "./Admin/usersListSlice";
import adminSigninReducer from "./Admin/adminSigninSlice";
import userBlockRegiser from "./Users/userBlockSlice";
import addServiceTypeReducer from "./Admin/addServiceTypeSlice";
import serviceTypeListReducer from "./Admin/serviceTypeListSlice";
import addServiceReducer from "./Admin/addServiceSlice";
import servicesListReducer from "./Admin/servicesListSlice";
import providerRegistrationReducer from "./Service-Providers/providerRegistrationSlice";
import toVerifyListReducer from "./Service-Providers/toVerifyListSlice";
import providerVerifReducer from "./Admin/providerVerifySlice";
import providerRejectReducer from "./Admin/providerRejectSlice";
import providerListReducer from "./Admin/providerListSlice";
import providerBlockReducer from "./Admin/providerBlockSlice";
import getServiceDetailsReducer from "./Users/getServiceDetailsSlice";
import getCategoryDetailsReducer from "./Users/getCategoryDetailsSlice";
import addLocationReducer from "./Admin/addLocationSlice";
import locationListReducer from "./Admin/locationListSlice";
import serviceSearchReducer from "./Users/serviceSearchSlice";
import searchProviderReducer from "./Users/searchProviderSlice";
import recommendationListReducer from "./Users/recommendationListSlice";
import selectedProviderReducer from "./Users/selectedProviderSlice";
import getBookingDataReducer from "./Users/getBookingDataSlice";
import bookServiceReducer from "./Users/bookServiceSlice";
import userbookedListReducer from "./Users/userbookedListSlice";
import getUserInfoReducer from "./Users/getUserInfoSlice";
import providerBookedListReducer from "./Service-Providers/providerBookedListSlice";
import providerBookedDetailsReducer from "./Service-Providers/providerBookedDetailsSlice";
import sendInvoiceReducer from "./Service-Providers/sendInvoiceSlice";
import getInvoiceReducer from "./Users/getInvoiceSlice";
import clientSecreteReducer from "./Users/clientSecreteSlice";
import paymentDataReducer from "./Users/paymentDataSlice";


export const store = configureStore({
  reducer: {
    // users
    userSignin: UserSigninReducer,
    userSignup: UserSignupReducer,
    serviceDetails: getServiceDetailsReducer,
    categoryDetails: getCategoryDetailsReducer,
    searchService: serviceSearchReducer,
    searchProvider: searchProviderReducer,
    recommendationList: recommendationListReducer,
    selectedProvider: selectedProviderReducer,
    getBookingData: getBookingDataReducer,
    bookService: bookServiceReducer,
    userbookedList: userbookedListReducer,
    getUserInfo: getUserInfoReducer,
    getInvoice: getInvoiceReducer,
    clientSecrete : clientSecreteReducer,
    paymentCompletd : paymentDataReducer,

    // admin
    adminUsersList: usersListReducer,
    adminSignin: adminSigninReducer,
    userBlock: userBlockRegiser,
    addServiceType: addServiceTypeReducer,
    serviceTypeList: serviceTypeListReducer,
    addService: addServiceReducer,
    servicesList: servicesListReducer,
    providerVerify: providerVerifReducer,
    providerReject: providerRejectReducer,
    providerList: providerListReducer,
    providerBlock: providerBlockReducer,
    addLocation: addLocationReducer,
    locationsList: locationListReducer,

    // service Provider
    providerRegistration: providerRegistrationReducer,
    toVerifyList: toVerifyListReducer,
    providerBookedList: providerBookedListReducer,
    providerBookedDetails: providerBookedDetailsReducer,
    sendInvoice: sendInvoiceReducer,
  },
});
