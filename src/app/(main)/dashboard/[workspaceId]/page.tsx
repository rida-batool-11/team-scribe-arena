// export const dynamic = "force-dynamic";

// import QuillEditor from "@/components/quill-editor/quill-editor";
// import { getWorkspaceDetails } from "@/lib/supabase/queries";
// import { redirect } from "next/navigation";
// import { workspace } from "../../../../lib/supabase/supabase.types";
// import React from "react";

// const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
//   console.log("PARAMS ID", params.workspaceId);
//   const { data, error } = await getWorkspaceDetails(params.workspaceId);
//   console.log("WORKSPACE:", error, data);
//   // const data = [
//   //   {
//   //     id: "28f3914d-681f-4169-8984-23fae9d0f537",
//   //     createdAt: "2024-11-22 14:58:55.578+00",
//   //     workspaceOwner: "dfd04245-03bf-4b69-b382-46bd9b41efcf",
//   //     title: "Hello",
//   //     iconId: "💼",
//   //     data: null,
//   //     inTrash: "",
//   //     logo: null,
//   //     bannerUrl: "",
//   //   },
//   // ];

//   // if (error || !data.length) redirect("/dashboard");
//   return (
//     <div className="relative">
//       <QuillEditor
//         dirType="workspace"
//         fileId={params.workspaceId}
//         dirDetails={data[0] || {}}
//       />
//     </div>
//   );
// };

// export default Workspace;

// export const dynamic = "force-dynamic";

// import QuillEditor from "@/components/quill-editor/quill-editor";
// import { getWorkspaceDetails } from "@/lib/supabase/queries";
// import { redirect } from "next/navigation";

// const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
//   // Log for debugging (optional)
//   console.log("PARAMS ID:", params.workspaceId);

//   // Fetch workspace details
//   const { data, error } = await getWorkspaceDetails(params.workspaceId);

//   // Handle errors or missing data
//   if (error || !data || data.length === 0) {
//     console.error("Error fetching workspace details:", error);
//     return redirect("/dashboard");
//   }

//   // Render workspace with QuillEditor
//   return (
//     <div className="relative">
//       <QuillEditor
//         dirType="workspace"
//         fileId={params.workspaceId}
//         dirDetails={data[0]} // Safely pass the first workspace object
//       />
//     </div>
//   );
// };

// export default Workspace;

export const dynamic = "force-dynamic";

import QuillEditor from "@/components/quill-editor/quill-editor";
import { getWorkspaceDetails } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  // Fetch workspace details
  const { data, error } = await getWorkspaceDetails(params.workspaceId);

  // Handle errors or missing data
  if (error || !data || data.length === 0) {
    console.error("Error fetching workspace details:", error);
    return redirect("/dashboard");
  }

  // Render workspace with QuillEditor
  return (
    <div className="relative">
      <QuillEditor
        dirType="workspace"
        fileId={params.workspaceId}
        dirDetails={data[0]} // Safely pass the first workspace object
      />
    </div>
  );
};

export default Workspace;
