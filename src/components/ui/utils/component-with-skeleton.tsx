import React from "react";

interface ComponentWithSkeletonProps<T> {
  loading: boolean;
  data?: T | null;
  Component: React.FC<{ data: T }>;
  Skeleton: React.FC;
}

function ComponentWithSkeleton<T>({
  loading,
  data,
  Component,
  Skeleton,
}: ComponentWithSkeletonProps<T>) {
  if (loading || !data) {
    return <Skeleton />;
  }

  return <Component data={data} />;
}

export default ComponentWithSkeleton;
