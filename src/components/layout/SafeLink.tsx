import { ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface SafeLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export function SafeLink({ to, children, className }: SafeLinkProps) {
  // Check if we're in a router context
  let isInRouter = true;
  
  try {
    useLocation();
  } catch {
    isInRouter = false;
  }

  if (!isInRouter) {
    // Fallback to regular link behavior when not in router context
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  }

  // Use actual Link when in router context
  return (
    <RouterLink to={to} className={className}>
      {children}
    </RouterLink>
  );
}