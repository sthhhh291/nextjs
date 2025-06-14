const CustomerLoading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      </div>
    </div>
  );
};
export default CustomerLoading;
