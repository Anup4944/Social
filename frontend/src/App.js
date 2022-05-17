import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/header/Header";
import Login from "./component/login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "./Actions/User";
import Home from "./component/home/Home";
import Account from "./component/Account/Account";
import NewPost from "./component/newPost/NewPost";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);
  const { isAuth } = useSelector((state) => state.user);

  return (
    <Router>
      {isAuth && <Header />}

      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/account" element={isAuth ? <Account /> : <Login />} />
        <Route path="/newpost" element={isAuth ? <NewPost /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
