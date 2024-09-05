// File: app/engagement-ring/[...detailRingProduct]/page.js

import Example from "./Exaple";

const fetchExample = async () => {
    let ringDetail = [];
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      ringDetail = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally, add retry logic here if needed
    }
    return ringDetail;
  };
  

export default async function RingExample() {
  const ringDetail = await fetchExample();
  console.log(ringDetail); // Log here inside the function where ringDetail is defined

  return (
    <>
      <Example ringDetail={ringDetail}/>
    </>
  );
}

// Remove the console.log(ringDetail); outside of the function as it will not work
