import React from "react";

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <span className="flex items-center rounded-full bg-blue-200 px-4 py-2 text-base text-blue-600">
        {children}
      </span>
    </div>
  );
};

export default Tag;
