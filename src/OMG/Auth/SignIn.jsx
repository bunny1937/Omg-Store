import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseApp } from "../db/Firebase";
import UserContext from "./UserContext";
import "./SignIn.css";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsAdmin } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const signin = async () => {
    if (email === "" || password === "") {
      return alert("Please fill all fields");
    }
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      console.log("User signed in:", user);

      // Check if the user is an admin by fetching data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data from Firestore:", userData);

        if (userData.role === "admin") {
          setIsAdmin(true);
          navigate("/AdminDash");
        } else {
          setIsAdmin(false);
          navigate("/Home");
        }
      } else {
        setIsAdmin(false);
        navigate("/Home");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);

      // Check if user already exists in Firestore, if not, add them
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          role: "user", // Default role if not already assigned
          createdAt: new Date(),
        });
      }

      if (userDoc.exists() && userDoc.data().role === "admin") {
        setIsAdmin(true);
        navigate("/AdminDash");
      } else {
        setIsAdmin(false);
        navigate("/Home");
      }

      alert("Google Sign-In Successful");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <div className="header">
          <h1 className="title">Sign In</h1>
        </div>
        <div className="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="input"
            placeholder="Email"
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
          />
        </div>
        <div className="button-field">
          <button onClick={signin} className="btn" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>
        <div className="button-field">
          <button
            onClick={signInWithGoogle}
            className="btn google-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In with Google"}
          </button>
        </div>
        <div className="login-link">
          <h2 className="text">
            Don't have an account?
            <Link className="link" to={"/SignUp"}>
              SignUp
            </Link>
          </h2>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default SignIn;
