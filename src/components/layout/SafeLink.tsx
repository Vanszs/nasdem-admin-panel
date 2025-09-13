import { Link, LinkProps } from "react-router-dom";
import { forwardRef } from "react";

export const SafeLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <Link ref={ref} {...props}>
        {children}
      </Link>
    );
  }
);

SafeLink.displayName = "SafeLink";