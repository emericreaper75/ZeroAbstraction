import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/authz/require-role";
import { serialize } from "next-mdx-remote/serialize";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await requireRole("EDITOR");
  } catch {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { content } = await request.json();

    if (typeof content !== "string") {
      return NextResponse.json(
        { success: false, error: "Content must be a string" },
        { status: 400 }
      );
    }

    if (!content.trim()) {
      return NextResponse.json({
        success: true,
        mdxSource: null,
      });
    }

    // Import options dynamically if needed, or directly
    const { mdxOptions } = await import("@/lib/mdx/mdx-options");

    // Serialize the MDX for client-side rendering
    const mdxSource = await serialize(content, {
      mdxOptions: mdxOptions.mdxOptions,
      parseFrontmatter: false,
    });

    return NextResponse.json({ success: true, mdxSource });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Failed to compile MDX";
    return NextResponse.json({
      success: false,
      error: message,
    });
  }
}
