const handleCancelButton = async ({ type, email }) => {
  const url =
    type === "customer"
      ? "http://localhost:3000/api/service/cancelWorker"
      : "http://localhost:3000/api/service/cancelCustomer";

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  console.log(data);
};

export default handleCancelButton;
