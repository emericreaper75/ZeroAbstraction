import AdminPageHeader from "@/components/admin/admin-page-header";
import ContentPostForm from "@/components/admin/content-post-form";

import { createContentPost } from "@/actions/content-post-actions";

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <AdminPageHeader
        title="New Post"
        description="Create a new content post."
      />

      <ContentPostForm action={createContentPost} />
    </div>
  );
}