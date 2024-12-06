// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import React from "react";

// import { cookies } from "next/headers";
// import {
//   getCollaboratingWorkspaces,
//   getFolders,
//   getPrivateWorkspaces,
//   getSharedWorkspaces,
//   getUserSubscriptionStatus,
// } from "@/lib/supabase/queries";
// import { redirect } from "next/navigation";
// import { twMerge } from "tailwind-merge";
// import WorkspaceDropdown from "./workspace-dropdown";
// import PlanUsage from "./plan-usage";
// import NativeNavigation from "./native-navigation";
// import { ScrollArea } from "../ui/scroll-area";
// import FoldersDropdownList from "./folders-dropdown-list";
// import UserCard from "./user-card";

// interface SidebarProps {
//   params: { workspaceId: string };
//   className?: string;
// }

// const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
//   const supabase = createServerComponentClient({ cookies });
//   //user

//   if (!supabase) {
//     console.log("NO SUPABASE");
//     return;
//   }
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) return;

//   //subscr
//   // const { data: subscriptionData, error: subscriptionError } =
//   //   await getUserSubscriptionStatus(user.id);

//   //folders
//   const { data: workspaceFolderData, error: foldersError } = await getFolders(
//     params.workspaceId
//   );
//   // const workspaceFolderData = [
//   //   {
//   //     id: "d692ccbb-ddd0-4ba9-8dc9-ccc36dd32ce9",
//   //     createdAt: "2024-11-22 16:53:53.718+00",
//   //     title: "Test",
//   //     iconId: "📄",
//   //     data: null,
//   //     inTrash: null,
//   //     bannerUrl: "",
//   //     workspaceId: "28f3914d-681f-4169-8984-23fae9d0f537",
//   //   },
//   // ];
//   //error
//   // if (subscriptionError || foldersError) redirect('/dashboard');

//   const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
//     await Promise.all([
//       getPrivateWorkspaces(user.id),
//       getCollaboratingWorkspaces(user.id),
//       getSharedWorkspaces(user.id),
//     ]);
//   console.log("privateWorkspaces", privateWorkspaces);
//   console.log("collaboratingWorkspaces", collaboratingWorkspaces);
//   console.log("sharedWorkspaces", sharedWorkspaces);
//   //get all the different workspaces private collaborating shared
//   return (
//     <aside
//       className={twMerge(
//         "hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between",
//         className
//       )}
//     >
//       <div>
//         <WorkspaceDropdown
//           privateWorkspaces={privateWorkspaces}
//           sharedWorkspaces={sharedWorkspaces}
//           collaboratingWorkspaces={collaboratingWorkspaces}
//           defaultValue={[
//             ...privateWorkspaces,
//             ...collaboratingWorkspaces,
//             ...sharedWorkspaces,
//           ].find((workspace) => workspace.id === params.workspaceId)}
//         />
//         <PlanUsage
//           foldersLength={workspaceFolderData.length}
//           subscription={null}
//         />
//         <NativeNavigation myWorkspaceId={params.workspaceId} />
//         {/*TODO:CHANGED THIS @AbdurRehman*/}
//         <ScrollArea
//           className="overflow-scroll relative
//           h-auto
//         "
//         >
//           <div
//             className="pointer-events-none
//           w-full
//           absolute
//           bottom-0
//           h-20
//           bg-gradient-to-t
//           from-background
//           to-transparent
//           z-40"
//           />
//           <FoldersDropdownList
//             workspaceFolders={workspaceFolderData || []}
//             workspaceId={params.workspaceId}
//           />
//         </ScrollArea>
//       </div>
//       <UserCard subscription={null} />
//     </aside>
//   );
// };

// export default Sidebar;

import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { twMerge } from "tailwind-merge";

import WorkspaceDropdown from "./workspace-dropdown";
import PlanUsage from "./plan-usage";
import NativeNavigation from "./native-navigation";
import { ScrollArea } from "../ui/scroll-area";
import FoldersDropdownList from "./folders-dropdown-list";
import UserCard from "./user-card";

import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";

interface SidebarProps {
  params: { workspaceId: string };
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });

  // Step 1: Validate Supabase instance
  if (!supabase) {
    console.error("Supabase client is not available.");
    return null;
  }

  // Step 2: Get User
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching user:", userError?.message);
    return null; // Optionally redirect to login if needed
  }

  try {
    // Step 3: Fetch all necessary data in parallel

    const [
      privateWorkspaces,
      collaboratingWorkspaces,
      sharedWorkspaces,
      { data: workspaceFolders, error: foldersError },
      { data: subscriptionData, error: subscriptionError },
    ] = await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
      getFolders(params.workspaceId),
      getUserSubscriptionStatus(user.id),
    ]);

    // Handle folder fetching error
    if (foldersError) {
      console.error("Error fetching folders:", foldersError);
      redirect("/dashboard"); // Redirect in case of critical folder fetch errors
    }

    // Step 4: Validate fetched data
    if (!privateWorkspaces || !collaboratingWorkspaces || !sharedWorkspaces) {
      console.warn("One or more workspace lists are empty.");
    }

    const allWorkspaces = [
      ...privateWorkspaces,
      ...collaboratingWorkspaces,
      ...sharedWorkspaces,
    ];

    const defaultWorkspace = allWorkspaces.find(
      (workspace) => workspace.id === params.workspaceId
    );

    // Step 5: Render component
    return (
      <aside
        className={twMerge(
          "hidden flex flex-col w-[280px] shrink-0 p-4 md:gap-4 justify-between h-full  relative ",
          className
        )}
      >
        <div className="flex flex-col grow ">
          <WorkspaceDropdown
            privateWorkspaces={privateWorkspaces}
            sharedWorkspaces={sharedWorkspaces}
            collaboratingWorkspaces={collaboratingWorkspaces}
            defaultValue={defaultWorkspace}
          />
          <PlanUsage
            foldersLength={workspaceFolders?.length || 0}
            subscription={subscriptionData}
          />
          <NativeNavigation myWorkspaceId={params.workspaceId} />
          <ScrollArea className="overflow-scroll relative h-auto">
            <div
              className="pointer-events-none w-full absolute bottom-0 h-20 
            bg-gradient-to-t from-background to-transparent z-40"
            />
            <FoldersDropdownList
              workspaceFolders={workspaceFolders || []}
              workspaceId={params.workspaceId}
            />
          </ScrollArea>
        </div>

        {/* User card stays at the bottom */}
        <div className=" absolute bottom-5 left-0 right-0 ml-2 mr-2">
          <UserCard subscription={subscriptionData} />
        </div>
      </aside>
    );
  } catch (error) {
    console.error("Error fetching data in Sidebar:", error);
    redirect("/dashboard"); // Redirect in case of major errors
    return null; // Fallback for SSR
  }
};

export default Sidebar;
