import { Link } from "react-router-dom";

function getUserAddress(userAddress: string | undefined) {
  return () => {
    if (userAddress) {
      return (
        <>
          <h3>Your Local Address</h3>
          <p>{userAddress}</p>
        </>
      );
    }

    return (
      <>
        <h3>Oops! Looks like you don't set your address yet</h3>
        <p>
          <Link to="/">Click here </Link> to set your address
        </p>
      </>
    );
  };
}

export default getUserAddress;
