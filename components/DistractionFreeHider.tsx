"use client";

import React from "react";
import { useDistractionFree } from "@/components/DistractionFreeProvider";

interface DistractionFreeHiderProps {
  children: React.ReactNode;
}

export function DistractionFreeHider({ children }: DistractionFreeHiderProps) {
  const { isDistractionFree } = useDistractionFree();

  if (isDistractionFree) return null;

  return <>{children}</>;
}
