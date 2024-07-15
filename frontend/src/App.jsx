import { Routes, Route } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import LandingScreen from "./screens/LandingScreen";
import HomeScreen from "./screens/HomeScreen";

import Home from "./components/Home/Home";
import Groups from "./components/Groups/Groups";
import Transact from "./components/Transact/Transact";
import GroupById from "./components/Groups/GroupById";
import TransactionById from "./components/Groups/TransactionById";
import PaymentById from "./components/Home/PaymentById";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {

  return (
    <Routes>
      <Route index element={<LandingScreen />} />
      <Route element={<PrivateRoute Component={HomeScreen} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/payments/:paymentId" element={<PaymentById />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:groupId" element={<GroupById />} />
        <Route path="/transactions/:transactionId" element={<TransactionById />} />
        <Route path="/transact" element={<Transact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegistrationScreen />} />
    </Routes>
  )
}
