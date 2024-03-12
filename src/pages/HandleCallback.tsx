// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import authHandler from "../services/auth.services";

// const HandleCallback: React.FC = () => {
//   const [query] = useSearchParams();
//   const code1 = query.get("code");

//   useEffect(() => {
//     const exchangeCode = async (code: string) => {
//       try {
//         if (code && typeof code === "string") {
//           const token = await authHandler.exchangeCodeForToken(code);
//           console.log("Token:", token);
//         }
//       } catch (error) {
//         console.error("Error exchanging code for token:", error);
//       }
//     };

//     if (code1) {
//       exchangeCode(code1);
//     }

//   }, [code1]);

//   return <div>Wait a sec srrrr</div>;
// };

// export default HandleCallback;

