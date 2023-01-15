import Head from "next/head";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "../lib/store/authStore";
import { auth } from "/lib/firebase";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function MyApp({ Component, pageProps }) {
  const logIn = useAuthStore((state) => state.logIn);
  const logOut = useAuthStore((state) => state.logOut);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        logIn(user);
      } else {
        logOut();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Mood Tracker - DSC Backend Workshop</title>
        <meta name="description" content="Backend Workshop for DSC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </>
  );
}

export default MyApp;
