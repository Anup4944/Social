import { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "./Actions/User";

// import Header from "./component/header/Header";
// import Home from "./component/home/Home";
import Login from "./component/login/Login";

// const Login = lazy(() =>
//   import("../component/login/Login")
// );
import Account from "./component/Account/Account";
import NewPost from "./component/newPost/NewPost";
import Register from "./component/Register/Register";
import UpdateProfile from "./component/UpdateProfile/UpdateProfile";
import UpdatePassword from "./component/UpdatePassword/UpdatePassword";
// import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import UserProfile from "./component/UserProfile/UserProfile";
import Search from "./component/Search/Search";
import NotFound from "./component/NotFound/NotFound";
import Loader from "./component/loader/Loader";

const Home = lazy(() => import("./component/home/Home"));
const ForgetPassword = lazy(() =>
  import("./component/ForgetPassword/ForgetPassword")
);
const Header = lazy(() => import("./component/header/Header"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);
  const { isAuth } = useSelector((state) => state.user);

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        {isAuth && <Header />}

        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route path="/account" element={isAuth ? <Account /> : <Login />} />
          <Route path="/newpost" element={isAuth ? <NewPost /> : <Login />} />
          <Route
            path="/register"
            element={isAuth ? <Account /> : <Register />}
          />
          <Route
            path="/update/profile"
            element={isAuth ? <UpdateProfile /> : <Login />}
          />
          <Route
            path="/update/password"
            element={isAuth ? <UpdatePassword /> : <Login />}
          />
          <Route
            path="/forget/password"
            element={isAuth ? <UpdatePassword /> : <ForgetPassword />}
          />
          <Route
            path="/password/reset/:token"
            element={isAuth ? <UpdatePassword /> : <ResetPassword />}
          />
          <Route
            path="/user/:id"
            element={isAuth ? <UserProfile /> : <Login />}
          />
          <Route path="/search" element={isAuth ? <Search /> : <Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
