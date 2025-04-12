async function testRentEstimate() {
  const response = await fetch("http://localhost:5000/api/ai/rent-estimates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address: "123 Main St, New York, NY",
      bedrooms: 2,
      bathrooms: 1,
      sqft: 900,
    }),
  });

  const result = await response.json();
  console.log("Status:", response.status);
  console.log("Response:", result);
}

testRentEstimate().catch(console.error);
