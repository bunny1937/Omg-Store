import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "../db/Firebase";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import Dialog from "@mui/material/Dialog"; // For dialog box
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import UserContext from "./UserContext";
import "./SignUp.css";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function SignUp({ onClose, open, onSignUpSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const signup = async () => {
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
      return alert("Please fill all fields");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      const sanitizedId = `${firstName.trim().toLowerCase()}-${lastName
        .trim()
        .toLowerCase()}-${phoneNumber}`.replace(/[^a-z0-9-]/g, "");

      await setDoc(doc(db, "users", sanitizedId), {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        phoneNumber,
        createdAt: new Date(),
      });

      alert("Signup Successful");
      resetForm();
      await signOut(auth);
      if (onSignUpSuccess) {
        onSignUpSuccess();
      } else {
        navigate("/SignIn");
      }
    } catch (error) {
      console.log(error);
      alert("Signup Failed");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          firstName: "",
          lastName: "",
          phoneNumber: "",
          createdAt: new Date(),
        });
      }

      onClose && onClose(); // Close the modal
    } catch (error) {
      console.log(error);
      alert("Google Signup Failed");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className="signup-container">
        <div className="logo"></div>
        <div className="signup-form">
          <div className="header">
            <h1 className="title">Signup</h1>
          </div>
          <div className="input-field">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="input"
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="input"
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="input"
            />
          </div>
          <div className="input-field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input"
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input"
            />
          </div>
          <div className="button-field">
            <button onClick={signup} className="btn">
              Signup
            </button>
          </div>
          <div className="button-field">
            <button onClick={signInWithGoogle} className="btn google-btn">
              Sign Up with Google
            </button>
          </div>
          <div className="login-link">
            <h2>
              Already have an account? <Link to={"/SignIn"}>Sign In</Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
