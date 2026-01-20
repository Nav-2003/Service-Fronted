const Api=import.meta.env.VITE_BACKEND_API;
const handleCancelButton = async ({ bookingId }) => {
      const response= await fetch(`${Api}/api/service/cancelBooking`,{
         method:"PUT",
         headers:{
           "Content-Type":"application/json"
         },
         body:JSON.stringify({bookingId})
      });
      const data=await response.json();
      console.log(data);
};

export default handleCancelButton;
