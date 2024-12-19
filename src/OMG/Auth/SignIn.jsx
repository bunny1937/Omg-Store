import { useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true); // Indicate the loading state
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // Persist user data

      // Check if the user already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          firstName: "",
          lastName: "",
          phoneNumber: "",
          createdAt: new Date(),
        });
      } else {
        const userData = userDoc.data();
        if (
          !userData.firstName ||
          !userData.lastName ||
          !userData.phoneNumber
        ) {
          setOpenDialog(true); // Open dialog for profile completion
        }
      }

      // Close the modal
      console.log("Firestore operation result:", userDoc.exists()); // Better error message
    } catch (error) {
      console.error("Google Signup Error:", error);
      alert("Google Signup Failed: " + error.message);
      console.log("User after Google sign-in:", user);
    } finally {
      setLoading(false);
      navigate("/Home");
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
