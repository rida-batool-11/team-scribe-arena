// "use client";
// import { Menu } from "lucide-react";
// import React, { useState } from "react";
// import CypressPageIcon from "../icons/cypressPageIcon";
// import clsx from "clsx";

// interface MobileSidebarProps {
//   children: React.ReactNode;
// }

// export const nativeNavigations = [
//   {
//     title: "Sidebar",
//     id: "sidebar",
//     customIcon: Menu,
//   },
//   {
//     title: "Pages",
//     id: "pages",
//     customIcon: CypressPageIcon,
//   },
// ] as const;

// const MobileSidebar: React.FC<MobileSidebarProps> = ({ children }) => {
//   const [selectedNav, setSelectedNav] = useState("sidebar");
//   return (
//     <>
//       {selectedNav === "sidebar" && <>{children}</>}
//       <nav
//         className="bg-black/10
//       backdrop-blur-lg
//       sm:hidden
//       fixed
//       z-50
//       bottom-0
//       right-0
//       left-0
//       "
//       >
//         <ul
//           className="flex
//         justify-between
//         items-center
//         p-4"
//         >
//           {nativeNavigations.map((item) => (
//             <li
//               className="flex
//               items-center
//               flex-col
//               justify-center
//             "
//               key={item.id}
//               onClick={() => {
//                 setSelectedNav(item.id);
//               }}
//             >
//               <item.customIcon></item.customIcon>
//               <small
//                 className={clsx("", {
//                   "text-muted-foreground": selectedNav !== item.id,
//                 })}
//               >
//                 {item.title}
//               </small>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default MobileSidebar;

// "use client";
// import { Menu } from "lucide-react";
// import React, { useState } from "react";
// import CypressPageIcon from "../icons/cypressPageIcon";
// import clsx from "clsx";

// interface MobileSidebarProps {
//   children: React.ReactNode;
// }

// export const nativeNavigations = [
//   {
//     title: "Sidebar",
//     id: "sidebar",
//     customIcon: Menu,
//   },
//   {
//     title: "Pages",
//     id: "pages",
//     customIcon: CypressPageIcon,
//   },
// ] as const;

// const MobileSidebar: React.FC<MobileSidebarProps> = ({ children }) => {
//   const [selectedNav, setSelectedNav] = useState("sidebar");

//   return (
//     <>
//       {/* Render the Sidebar on large screens (hidden on small screens) */}
//       <div className="hidden sm:block">{children}</div>

//       {/* Mobile navigation bar for small screens */}
//       <nav className="bg-black/10 backdrop-blur-lg sm:hidden fixed z-50 bottom-0 right-0 left-0">
//         <ul className="flex justify-between items-center p-4">
//           {nativeNavigations.map((item) => (
//             <li
//               className="flex items-center flex-col justify-center"
//               key={item.id}
//               onClick={() => {
//                 setSelectedNav(item.id);
//               }}
//             >
//               <item.customIcon />
//               <small
//                 className={clsx("", {
//                   "text-muted-foreground": selectedNav !== item.id,
//                 })}
//               >
//                 {item.title}
//               </small>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default MobileSidebar;

"use client";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import CypressPageIcon from "../icons/cypressPageIcon";
import clsx from "clsx";

interface MobileSidebarProps {
  children: React.ReactNode;
}

export const nativeNavigations = [
  {
    title: "Sidebar",
    id: "sidebar",
    customIcon: Menu,
  },
  {
    title: "Pages",
    id: "pages",
    customIcon: CypressPageIcon,
  },
] as const;

const MobileSidebar: React.FC<MobileSidebarProps> = ({ children }) => {
  const [selectedNav, setSelectedNav] = useState("sidebar");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="h-full ">
      {/* Render the Sidebar on large screens */}
      <div
        className={`sm:block ${sidebarVisible ? "block" : "hidden"} h-full `}
      >
        {children}
      </div>

      {/* Mobile navigation bar */}
      <nav className="bg-black/10 backdrop-blur-lg sm:hidden fixed z-50 bottom-0 right-0 left-0">
        <ul className="flex justify-between items-center p-4">
          {nativeNavigations.map((item) => (
            <li
              className="flex items-center flex-col justify-center"
              key={item.id}
              onClick={() => {
                if (item.id === "sidebar") {
                  setSidebarVisible(!sidebarVisible); // Toggle the Sidebar visibility
                }
                setSelectedNav(item.id);
              }}
            >
              <item.customIcon />
              <small
                className={clsx("", {
                  "text-muted-foreground": selectedNav !== item.id,
                })}
              >
                {item.title}
              </small>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileSidebar;
