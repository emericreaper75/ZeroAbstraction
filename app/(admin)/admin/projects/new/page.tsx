import AdminPageHeader from "@/components/admin/admin-page-header";
import ProjectForm from "@/components/admin/project-form";

import { createProject } from "@/actions/project-actions";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl">
      <AdminPageHeader
        title="New Project"
        description="Create a new portfolio project."
      />

      <ProjectForm action={createProject} />
    </div>
  );
}