import React, { useState } from "react";
import { Facebook, GitHub, Google } from "@mui/icons-material";
import { getDatabase, ref, child, onValue, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";

const auth = getAuth(app);

const LoginForm = ({ isLogin, setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setLogin(true);
  };

  const getUser = async (id) => {
    // try {

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          if (snapshot.val().role === "Candidate") {
            navigate(`/${id}/candidates`);
          } else {
            navigate(`/${id}/interviewer`);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    //   const db = getDatabase();
    //   const usersRef = ref(db, 'users/'+id);
    //   const snapshot = await get(child(usersRef, auth.currentUser.uid));
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     return snapshot.val();
    //   } else {
    //     console.log("No data available");
    //     return null;
    //   }
    // } catch (error) {
    //   console.error("Error fetching user data:", error);
    //   return null;
    // }
  };

  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User is Logged In: ", user.uid);

      await getUser(user.uid);
      alert("Login Suceessfull")

   
     
        
      
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
      <h2 className="p-3 text-3xl font-bold text-pink-400">Horiz</h2>
      <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
      <h3 className="text-xl font-semibold text-blue-400 pt-2">Sign In!</h3>
      <div className="flex space-x-2 m-4 items-center justify-center">
        <div className="socialIcon">
          <Facebook />
        </div>
        <div className="socialIcon">
          <GitHub />
        </div>
        <div className="socialIcon">
          <Google />
        </div>
      </div>
      {/* Inputs */}
      <div className="flex flex-col items-center justify-center">
        <input
          type="email"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          type="password"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button
          className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in"
          onClick={loginUser}
        >
          Sign In
        </button>
      </div>
      <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
      <p className="text-blue-400 mt-4 text-sm">Don't have an account?</p>
      <p
        className="text-blue-400 mb-4 text-sm font-medium cursor-pointer"
        onClick={handleSignUpClick}
      >
        Create a New Account?
      </p>
    </div>
  );
};

export default LoginForm;
