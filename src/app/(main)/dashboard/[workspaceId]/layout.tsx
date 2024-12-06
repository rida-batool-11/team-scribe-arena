// import MobileSidebar from "@/components/sidebar/mobile-sidebar";
// import Sidebar from "@/components/sidebar/sidebar";
// import React from "react";

// interface LayoutProps {
//   children: React.ReactNode;
//   params: any;
// }

// const Layout: React.FC<LayoutProps> = ({ children, params }) => {
//   return (
//     <main
//       className="flex overflow-hidden
//       h-screen
//       w-screen
//   "
//     >
//       {/* <Sidebar params={params} /> */}
//       <MobileSidebar>
//         <Sidebar params={params} className="w-screen inline-block sm:hidden" />
//       </MobileSidebar>
//       <div
//         className="dark:boder-Neutrals-12/70
//         border-l-[1px]
//         w-full
//         relative
//         overflow-scroll
//       "
//       >
//         {children}
//       </div>
//     </main>
//   );
// };

// export default Layout;

import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  return (
    <main className="flex overflow-hidden h-screen w-screen">
      {/* MobileSidebar will handle rendering the sidebar only on mobile devices */}
      <MobileSidebar>
        {/* Sidebar is shown on large screens and hidden on small screens */}
        <Sidebar params={params} className="hidden sm:block  inline-block" />
      </MobileSidebar>

      {/* Main content */}
      <div className="dark:border-Neutrals-12/70 border-l-[1px] w-full relative overflow-scroll">
        {children}
      </div>
    </main>
  );
};

export default Layout;
