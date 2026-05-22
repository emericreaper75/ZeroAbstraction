"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { staggerContainer, fadeUpVariant } from "@/lib/design/motion";
import type { PublicPostCard } from "@/lib/public/post-card";

const categoryVariants: Record<string, "electronics" | "astrophysics" | "physics" | "communications"> = {
  electronics: "electronics",
  astrophysics: "astrophysics",
  "physics-math": "physics",
  communications: "communications",
};

const categoryLabels: Record<string, string> = {
  electronics: "Electronics",
  astrophysics: "Astrophysics",
  "physics-math": "Physics & Math",
  communications: "Communications",
};

type FeaturedPostsProps = {
  posts: PublicPostCard[];
};

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-base" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
              Latest Research
            </p>
            <h2 id="featured-heading" className="text-3xl font-serif font-bold text-zinc-100">
              Featured Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              variants={fadeUpVariant}
              className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <Surface
                variant="glass"
                interactive
                padding="none"
                asChild
                className="h-full flex flex-col group"
              >
                <Link href={`/${post.routeCategory}/${post.slug}`}>
                  {/* Gradient accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className={`flex flex-col ${index === 0 ? "p-8" : "p-6"} flex-grow`}>
                    <div className="mb-4 flex items-center gap-2">
                      <Badge variant={categoryVariants[post.routeCategory] ?? "default"}>
                        {categoryLabels[post.routeCategory] ?? post.routeCategory}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-zinc-600 font-mono">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h3
                      className={`font-serif font-semibold text-zinc-100 mb-3 group-hover:text-cyan-400 transition-colors ${
                        index === 0 ? "text-2xl md:text-3xl" : "text-lg"
                      }`}
                    >
                      {post.title}
                    </h3>

                    <p
                      className={`text-zinc-500 leading-relaxed mb-4 flex-grow ${
                        index === 0 ? "text-base line-clamp-4" : "text-sm line-clamp-2"
                      }`}
                    >
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <time dateTime={post.date} className="text-xs text-zinc-600 font-mono">
                        {formatDate(post.date)}
                      </time>
                      <span className="text-xs font-mono text-zinc-600 group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                        Read article
                        <ArrowRight
                          className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </Surface>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile "view all" link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            View all articles
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
