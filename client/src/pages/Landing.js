// import React from "react";
// import { Signup, Login } from "../components";
// export default function Landing() {
//   return (
//     <div className="page-container">
//       <p>Landing</p>
//       <Signup />
//       <Login />
//     </div>
//   );
// }

import React from "react";
import { Signup, Login } from "../components";
export default function Landing({ userState, setUserState }) {
  return (
    <div className="page-container">
      <p>Landing</p>
      <Signup userState={userState} setUserState={setUserState} />
      <Login userState={userState} setUserState={setUserState} />
    </div>
  );
}
