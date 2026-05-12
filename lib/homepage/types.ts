import type { PublicPostCard } from "@/lib/public/post-card";
import type { Project } from "@prisma/client";

export type HomepageSection =
  | {
      type: "featuredPosts";
      title: string;
      posts: PublicPostCard[];
    }
  | {
      type: "latestPosts";
      title: string;
      posts: PublicPostCard[];
    }
  | {
      type: "featuredProjects";
      title: string;
      projects: Project[];
    };

