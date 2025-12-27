const Api=import.meta.env.VITE_BACKEND_API;
const handleCancelButton = async ({ type, email }) => {
  const url =
    type === "customer"
      ? `${Api}/api/service/cancelWorker`
      : `${Api}/api/service/cancelCustomer`;

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
