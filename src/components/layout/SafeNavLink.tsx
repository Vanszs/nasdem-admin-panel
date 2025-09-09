import { ReactNode } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";

interface SafeNavLinkProps {
  to: string;
  children: ReactNode;
  className?: string | ((props: { isActive: boolean }) => string);
}

export function SafeNavLink({ to, children, className }: SafeNavLinkProps) {
  // Check if we're in a router context
  let isInRouter = true;
  let currentPath = "";
  
  try {
    const location = useLocation();
    currentPath = location.pathname;
  } catch {
    isInRouter = false;
  }

  if (!isInRouter) {
    // Fallback to regular link behavior when not in router context
    const computedClassName = typeof className === "function" 
      ? className({ isActive: false })
      : className;
      
    return (
      <a href={to} className={computedClassName}>
        {children}
      </a>
    );
  }

  // Use actual NavLink when in router context
  return (
    <RouterNavLink to={to} className={className}>
      {children}
    </RouterNavLink>
  );
}