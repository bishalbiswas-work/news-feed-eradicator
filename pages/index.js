import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [htmlContent, setHtmlContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/content/index.html")
      .then((response) => response.text())
      .then((data) => {
        setHtmlContent(data);
      });

    // Add an event listener to the document to catch clicks on the specific div
    const clickHandler = (event) => {
      // Check if the clicked element or any of its parents have the class 'try-unhook-app'
      let element = event.target;
      while (element) {
        if (element.classList && element.classList.contains("try-unhook-app")) {
          router.push("/qr");
          return;
        }
        element = element.parentElement;
      }
    };

    document.addEventListener("click", clickHandler);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [router]);

  return (
    <div>
      <Head>
        <title>DF Tube | Use YouTube Without Getting Used by it.</title>
        {/* <link rel="stylesheet" href="/content/global.css" /> */}
        <link rel="stylesheet" href="/content/index.css" />
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"
        /> */}
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
