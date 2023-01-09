import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect, useCallback } from "react";

export default function Home() {
  const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === "IFRAME";

  const postCrossDomainMessage = useCallback((msg: unknown) => {
    var win = document.getElementById("ifr");

    if (isIFrame(win) && win.contentWindow) {
      win.contentWindow.postMessage(
        msg,
        "https://info-cross-domain-2.vercel.app/"
      );
    }
  }, []);

  useEffect(() => {
    var postMsg = { login: "user from website1" }; // this is just example
    postCrossDomainMessage(postMsg);
  }, [postCrossDomainMessage]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className={styles.main}>
        <h1>this is the: domain 1</h1>
        <button onClick={() => postCrossDomainMessage("opa, foi pelo botao")}>
          post cross domain
        </button>
        <iframe
          style={{ width: "300px", height: "300px" }}
          src="https://info-cross-domain-2.vercel.app/getlocalstorage.html"
          id="ifr"
        ></iframe>
      </main>
    </>
  );
}
