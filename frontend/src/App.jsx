import { useQuery } from "@apollo/client";
import { BackgroundBeamsWithCollision } from "./components/ui/BackgroundBeamsWithCollision";
import {
  HomePage,
  LoginPage,
  NotFound,
  SignUpPage,
  TransactionPage,
} from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { GET_AUTH_USERS } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
  const { loading, data, error } = useQuery(GET_AUTH_USERS);
  if(loading)return null;

  console.log(data);
  return (
    <BackgroundBeamsWithCollision>
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data.authUser ? <LoginPage /> : <Navigate to="/" />}
        />{" "}
        <Route
          path="/signup"
          element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BackgroundBeamsWithCollision>
  );
}

export default App;
