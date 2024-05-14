import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Layout from "./Layout";
import Ragister from "./pages/Ragister";
import axios from "axios";
import Account from "./pages/Account";
import Protected from "./pages/Protected";
import PlacesPage from "./pages/PlacesPage";
import PlacesForm from "./components/PlacesForm";
import Singleplace from "./pages/Singleplace";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

// axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.baseURL = "https://realbackend.vercel.app";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Ragister />} />
        <Route
          path="/account/:subpage?"
          element={
            <Protected>
              <Account />
            </Protected>
          }
        />
        <Route
          path="/account/places"
          element={
            <Protected>
              <PlacesPage />
            </Protected>
          }
        />
        <Route
          path="/account/places/new"
          element={
            <Protected>
              <PlacesForm />
            </Protected>
          }
        />
        <Route
          path="/account/places/:id"
          element={
            <Protected>
              <PlacesForm />
            </Protected>
          }
        />
        <Route path="/singleplace/:id" element={<Singleplace />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
