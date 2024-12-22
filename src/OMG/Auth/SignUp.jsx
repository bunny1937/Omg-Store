import { useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { firebaseApp } from "../db/Firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import UserContext from "./UserContext";
import "./SignUp.css";
import toast, { Toaster } from "react-hot-toast";

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

  // Handle Google Redirect Result
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;

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

          setUser(user); // Set user in the context
          onClose && onClose(); // Close the modal
          toast.success("Sign up successfully");
          navigate("/Home");
        }
      } catch (error) {
        toast.error(error.message);
        setError("Failed to process Google Sign-In redirect.");
      }
    };
    handleRedirectResult();
  }, [onClose, navigate, setUser]);

  const signup = async () => {
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
      toast.error("Please fill all fields");
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

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

      setUser(user); // Set user in the context
      toast.success("Signup Successful");
      resetForm();
      if (onSignUpSuccess) {
        onSignUpSuccess();
      } else {
        navigate("/Home");
      }
    } catch (error) {
      handleAuthError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

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

        setUser(user); // Set user in the context
        onClose && onClose(); // Close the modal
        navigate("/Home");
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error) => {
    let errorMessage;
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already in use.";
        break;
      case "auth/invalid-email":
        errorMessage = "The email address is invalid.";
        break;
      case "auth/weak-password":
        errorMessage = "The password is too weak.";
        break;
      case "auth/popup-closed-by-user":
        errorMessage =
          "The Google sign-up pop-up was closed before completing the process.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error occurred. Please check your connection.";
        break;
      default:
        errorMessage = error.message || "An unknown error occurred.";
    }
    setError(errorMessage);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={`modal ${open ? "open" : ""}`}>
        <div className="signup-container">
          <div className="logo"></div>
          <div className="signup-form">
            <div className="header">
              <h1 className="title">Signup</h1>
              <div className="error-message">{error && <p>{error}</p>}</div>
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
              <button onClick={signup} className="btn" disabled={loading}>
                {loading ? "Signing Up..." : "Signup"}
              </button>
            </div>
            <div className="button-field">
              <button
                onClick={signInWithGoogle}
                className="btn google-btn"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up with Google"}
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
    </>
  );
}

export default SignUp;
