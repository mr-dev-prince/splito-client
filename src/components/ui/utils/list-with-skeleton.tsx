import React from "react";

interface ListWithSkeletonProps<T> {
  loading: boolean;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  Skeleton: React.FC;
  skeletonCount?: number;
  getKey?: (item: T, index: number) => React.Key;
}

function ListWithSkeleton<T>({
  loading,
  data,
  renderItem,
  Skeleton,
  skeletonCount = 5,
  getKey,
}: ListWithSkeletonProps<T>) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <React.Fragment key={getKey ? getKey(item, index) : index}>
          {renderItem(item)}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ListWithSkeleton;
