import { Link, useNavigate, useLocation } from "react-router-dom";
import Classes from "./auth.module.css";
import { auth } from "../../Utility/firebase";
import { useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { BeatLoader } from "react-spinners";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate( navStateData.state?.redirect || "/");
        })
        .catch((err) => {
          setLoading({ ...loading, signIn: false });
          setErr(err.message);
          console.log(err);
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData.state.redirect || "/");
        })
        .catch((err) => {
          setLoading({ ...loading, signUp: false });
          setErr(err.message);
          console.log(err);
        });
    }
  };

  return (
    <section className={Classes.login}>
      <Link to="/">
        <img src="https://wallpapercave.com/wp/wp7771146.png" alt="" />
      </Link>
      <div className={Classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={Classes.login_signinbtn}
          >
            {loading.signIn ? <BeatLoader color="#000" size={8} /> : "Sign In"}
          </button>
        </form>
        <p>
          By Signing-in, you agree to Amazon FAKE CLONE Conditions of Use and
          Privacy Notice.
        </p>
        <button
          type="submit"
          name="register"
          onClick={authHandler}
          className={Classes.login_registerbtn}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
        {err && (
          <small style={{ paddingTop: "5px", color: "red" }}>{err}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
