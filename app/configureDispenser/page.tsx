import React from "react";
import DashboardPage from "./screen";

const page = async () => {
  const getResponse = await getHistory();
  //console.log(getResponse)
  return <DashboardPage serverData={getResponse} />;
};

async function getHistory() {
  const url = "http://localhost:3000/getConfigure"; // Replace with your API endpoint

  try {
    const response = await fetch(url, {
      method: "GET", // Specify the request method
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache", // Prevent caching
        "Pragma": "no-cache", // HTTP 1.0 backward compatibility for no-cache
        "Expires": "0", // Ensure the resource expires immediately
      },
    });

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parse the JSON from the response
    return data; // Return the data for further processing
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export default page;
