"use client";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/clerk-react";
import Header from "../components/Header";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const inter = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

// "use client";
// import { Inter, Montserrat } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/clerk-react";
// import Header from "@/components/Header.js";
// import Head from "next/head"; // ✅ Import Head

// const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
// const inter = Montserrat({
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider publishableKey={publishableKey}>
//       <html lang="en">
//         <Head>
//           {/* ✅ Razorpay script */}
//           <script
//             src="https://checkout.razorpay.com/v1/checkout.js"
//             async
//           ></script>
//         </Head>
//         <body className={inter.className}>
//           <Header />
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }
