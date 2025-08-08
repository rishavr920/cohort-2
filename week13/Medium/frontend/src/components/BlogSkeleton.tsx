export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse flex justify-center">
      <div className="h-2.5 bg-gray-200 rounded-full  mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
