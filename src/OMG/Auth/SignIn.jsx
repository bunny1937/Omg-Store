import { useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { isMobile } from "react-device-detect";
import {
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { firebaseApp } from "../db/Firebase";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
// import Dialog from "@mui/material/Dialog"; // For dialog box
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import UserContext from "./UserContext";
import "./SignUp.css";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function SignIn({ onClose, open }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { setUser, user, setIsAdmin } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Corrected import
  const provider = new GoogleAuthProvider(); // Corrected declaration

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // Persist user data
      } else {
        localStorage.removeItem("user"); // Clear user data
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  const signIn = async () => {
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
      localStorage.setItem("user", JSON.stringify(user)); // Persist user data
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
      resetForm("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Use session persistence for better handling across sessions
      await setPersistence(auth, browserSessionPersistence);

      // Trigger sign-in flow
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Set the user in context and localStorage
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      // Check Firestore for existing user data
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      // If user doesn't exist, create a new Firestore document
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          firstName: "",
          lastName: "",
          phoneNumber: "",
          createdAt: new Date(),
        });
      }

      navigate("/Home"); // Navigate after successful login
    } catch (error) {
      console.error("Google Sign-In Error:", error);

      // User-Friendly Error Messages
      switch (error.code) {
        case "auth/network-request-failed":
          alert(
            "Network error occurred while trying to sign in. Please check your internet connection and try again."
          );
          break;

        case "auth/popup-closed-by-user":
          alert(
            "It seems like you closed the sign-in popup before completing the process. Please try again."
          );
          break;

        case "auth/cancelled-popup-request":
          alert(
            "Another sign-in process was initiated before the previous one completed. Please wait and try again."
          );
          break;

        case "auth/operation-not-allowed":
          alert(
            "Google Sign-In is currently disabled. Please contact support or try again later."
          );
          break;

        case "auth/unauthorized-domain":
          alert(
            "The current domain is not authorized for Google Sign-In. Please contact support."
          );
          break;

        case "auth/invalid-credential":
          alert(
            "An invalid credential was provided. Please refresh the page and try again."
          );
          break;

        default:
          alert(
            "An unexpected error occurred during sign-in. Please try again later. Error: " +
              error.message
          );
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleDialogSubmit = async () => {
  //   try {
  //     const user = auth.currentUser;
  //     if (user) {
  //       await updateDoc(doc(db, "users", user.uid), {
  //         firstName,
  //         lastName,
  //         phoneNumber,
  //       });
  //       setOpenDialog(false);
  //       alert("Profile Updated Successfully");
  //       navigate("/Home"); // Ensure that `navigate` is used correctly
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("Failed to update profile: " + error.message);
  //   }
  // };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    // setFirstName("");
    // setLastName("");
    // setPhoneNumber("");
  };

  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className="signup-container">
        <div className="logo"></div>
        <div className="signup-form">
          <div className="header">
            <h1 className="title">Sign In</h1>
          </div>
          {/* <div className="input-field">
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
          </div> */}
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
            <button onClick={signIn} className="btn" disabled={loading}>
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
            <h2>
              Already have an account? <Link to={"/SignUp"}>Sign Up</Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
