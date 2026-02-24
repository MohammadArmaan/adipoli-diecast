import { Skeleton } from "./ui/skeleton";

export default function LoadingSkeleton() {
    return (
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-8 w-64" />
          <Skeleton className="mx-auto h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[26rem] w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }