import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddressItem from "./components/AddressItem";
import AddressList from "./components/AddressList"; 
import NftCoinsParent from './components/NftCoinsParent'; 
import Header from "./layout/Header";
import Footer from "./layout/Footer"; 
import RecordAddress from "./layout/RecordAddress";
import UserComponent from "./components/UserComponent"; 
import UsersListComponent from "./components/UsersListComponent";
 
const RoutesDaily = () => (
  <BrowserRouter>
    <Header />
    <main className="app-main">
      <Routes>
        <Route path="/addresses" element={<AddressList />} />
        <Route path="/addresses/:id" element={<AddressItem />} />
        <Route path="/address" element={<RecordAddress />} />
        <Route path="/users" element={<UsersListComponent />} />
        <Route path="/users/:id" element={<UserComponent />} />
        <Route path="/add-user" element={<UserComponent />} />
        <Route path="/nftCoins" element={<NftCoinsParent />} />
        <Route path="*" element={<h3>Ooops, page not found</h3>} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default RoutesDaily;


// = [
//   {
//     path: "/",
//     name: "Dashboard",
//     icon: "tim-icons icon-chart-pie-36",
//     component: Dashboard,
//     layout: "/admin"
//   },
//   {
//     collapse: true,
//     name: "Pages",
//     icon: "tim-icons icon-image-02",
//     state: "pagesCollapse",
//     views: [
//       {
//         path: "/addresses",
//         name: "Addresses",
//         mini: "P",
//         component: AddressList, // Changed to AddressList
//         layout: "/admin"
//       },
//     ]
//   }
// ];

