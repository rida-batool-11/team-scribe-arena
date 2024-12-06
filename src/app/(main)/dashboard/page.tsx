import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import db from "@/lib/supabase/db";
import { getUserFirstWorkspace } from "../../../lib/supabase/queries";
import { redirect, permanentRedirect } from "next/navigation";
import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";
import { getUserSubscriptionStatus } from "@/lib/supabase/queries";
import { workspace } from "../../../lib/supabase/supabase.types";

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // const workspace = await db.query.workspaces.findFirst({
  //   where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  // });

  // const { data: subscription, error: subscriptionError } =
  //   await getUserSubscriptionStatus(user.id);

  // if (subscriptionError) return;

  const [workspace, { data: subscription, error: subscriptionError }] =
    await Promise.all([
      db.query.workspaces.findFirst({
        where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
      }),
      getUserSubscriptionStatus(user.id),
    ]);

  if (subscriptionError) {
    console.error("Subscription fetch error:", subscriptionError);
  }

  if (!workspace)
    return (
      <div
        className="bg-background
        h-screen
        w-screen
        flex
        justify-center
        items-center
  "
      >
        <DashboardSetup user={user} subscription={null} />
      </div>
    );

  return redirect(`/dashboard/${workspace.id}`);
};

export default DashboardPage;

// import React from "react";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import db from "@/lib/supabase/db";
// import { redirect } from "next/navigation";
// import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";
// import { getUserSubscriptionStatus } from "@/lib/supabase/queries";

// const DashboardPage = async () => {
//   // Correctly handle cookies by passing a function
//   const supabase = createServerComponentClient({
//     cookies: () => cookies(),
//   });

//   // Fetch the user
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     // Redirect to login if user is not authenticated
//     redirect("/login");
//     return;
//   }

//   // Fetch the user's workspace
//   const workspace = await db.query.workspaces.findFirst({
//     where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
//   });

//   // Fetch subscription status
//   const { data: subscription, error: subscriptionError } =
//     await getUserSubscriptionStatus(user.id);

//   if (subscriptionError) {
//     console.error("Error fetching subscription:", subscriptionError);
//     return;
//   }

//   if (!workspace) {
//     return (
//       <div className="bg-background h-screen w-screen flex justify-center items-center">
//         <DashboardSetup user={user} subscription={subscription} />
//       </div>
//     );
//   }

//   // Redirect to the user's workspace
//   redirect(`/dashboard/${workspace.id}`);
// };

// export default DashboardPage;

// import React from "react";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import db from "@/lib/supabase/db";
// import { redirect } from "next/navigation";
// import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";
// import { getUserSubscriptionStatus } from "@/lib/supabase/queries";

// const DashboardPage = async () => {
//   const cookieStore = cookies();
//   const supabase = createServerComponentClient({
//     cookies: () => cookieStore,
//   });

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/login");
//   }

//   const workspace = await db.query.workspaces.findFirst({
//     where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
//   });
//   console.log(workspace);
//   const { data: subscription, error: subscriptionError } =
//     await getUserSubscriptionStatus(user.id);

//   if (subscriptionError) {
//     throw new Error("Failed to fetch subscription status");
//   }

//   if (!workspace) {
//     return (
//       <div className="flex h-screen w-screen items-center justify-center bg-background">
//         <DashboardSetup user={user} subscription={subscription} />
//       </div>
//     );
//   }
//   console.log("WKID:", workspace.id);
//   redirect(`/dashboard/${workspace.id}`);
// };

// export default DashboardPage;

// import { Suspense } from "react";
// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { redirect } from "next/navigation";
// import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";

// import {
//   getUserSubscriptionStatus,
//   getUserFirstWorkspace,
// } from "@/lib/supabase/queries";
// import db from "@/lib/supabase/db";

// async function DashboardContent() {
//   let path = null;
//   try {
//     const cookieStore = cookies();
//     const supabase = createServerComponentClient({
//       cookies: () => cookieStore,
//     });

//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (userError || !user) {
//       return redirect("/login");
//     }

//     // const workspace = await getUserFirstWorkspace(user.id);
//     const workspace = [
//       {
//         id: "28f3914d-681f-4169-8984-23fae9d0f537",
//         createdAt: "2024-11-22 14:58:55.578+00",
//         workspaceOwner: "dfd04245-03bf-4b69-b382-46bd9b41efcf",
//         title: "Hello",
//         iconId: "💼",
//         data: null,
//         inTrash: "",
//         logo: null,
//         bannerUrl: "",
//       },
//     ];
//     // console.log("WORKSPACE", workspace);
//     // const { data: subscription } = await getUserSubscriptionStatus(user.id);

//     // If workspace exists and has an ID, redirect to it
//     if (workspace.length > 0) {
//       console.log("WORKSPACE TEST", workspace, workspace[0].id);
//       path = "/dashboard/" + workspace[0].id;
//     } else {
//       // If no workspace exists or no valid ID, show setup
//       return (
//         <div className="bg-background min-h-screen flex items-center justify-center p-4">
//           <DashboardSetup user={user} subscription={null} />
//         </div>
//       );
//     }
//   } catch (error) {
//     console.log("Dashboard error:", error);
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
//           <p className="text-muted-foreground">
//             Please try refreshing the page
//           </p>
//         </div>
//       </div>
//     );
//   } finally {
//     if (path) {
//       redirect(path);
//     }
//   }
// }

// export default function DashboardPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="h-screen w-screen flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
//         </div>
//       }
//     >
//       <DashboardContent />
//     </Suspense>
//   );
// }
