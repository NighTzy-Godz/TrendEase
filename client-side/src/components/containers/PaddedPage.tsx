import React from "react";

interface PaddedPageProps {
  className?: string;
  children: React.ReactNode;
}

function PaddedPage({ children, className = "" }: PaddedPageProps) {
  return <div className={`${className} padded_page`}>{children}</div>;
}

export default PaddedPage;
