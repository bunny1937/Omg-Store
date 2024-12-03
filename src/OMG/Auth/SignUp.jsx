import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { firebaseApp } from "../db/Firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "./SignUp.css";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Initialize Google Auth provider
  const provider = new GoogleAuthProvider();

  const signup = async () => {
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      phoneNumber === ""
    ) {
      return alert("Please fill all fields");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user details in Firestore under "users" collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
      });

      alert("Signup Successful");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user ID in Firestore if it's a new user
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName: firstName || "N/A",
        lastName: lastName || "N/A",
        phoneNumber: phoneNumber || "N/A",
        createdAt: new Date(),
      });

      alert("Google Signup Successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            name="firstName"
            className="input"
            placeholder="First Name"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            className="input"
            placeholder="Last Name"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="phoneNumber"
            className="input"
            placeholder="Phone Number"
          />
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
          <h2 className="text">
            Already have an account?
            <Link className="link" to={"/SignIn"}>
              Sign In
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
