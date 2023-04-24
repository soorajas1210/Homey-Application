import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";


export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "profile",
    label: "Profile",
    path: "/admin/profile",
    icon: <HiOutlineCube />,
  },
  {
    key: "taskers",
    label: "Service Providers",
    path: "/admin/serviceProvider",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/admin/customers",
    icon: <HiOutlineUsers />,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/admin/transactions",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "serviceVerification",
    label: "Services Verification",
    path: "/admin/verifyService",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "ServiceManagement",
    label: "ServiceManagement",
    path: "/admin/serviceManagement",
    icon: <HiOutlineDocumentText />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/admin/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
