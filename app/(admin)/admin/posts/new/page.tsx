import AdminPageHeader from "@/components/admin/admin-page-header";
import ProjectForm from "@/components/admin/project-form";

import { createPost } from "@/actions/post-actions";

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <AdminPageHeader
        title="New Post"
        description="Create a new MDX blog post."
      />

      <ProjectForm action={createPost} />
    </div>
  );
}