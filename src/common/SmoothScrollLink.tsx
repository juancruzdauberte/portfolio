import { FC, MouseEvent, ReactNode, useEffect, useState } from "react";

interface SmoothScrollLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  offset?: number;
  duration?: number;
  spy?: boolean;
  onClick?: () => void;
}

export const SmoothScrollLink: FC<SmoothScrollLinkProps> = ({
  to,
  children,
  className = "",
  offset = 80,
  spy = false,
  onClick,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!spy) return;

    const handleScroll = () => {
      const element = document.getElementById(to);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const elementHeight = element.offsetHeight;

      // Considera el elemento activo si está cerca del top del viewport
      const isInView =
        elementPosition <= offset + 100 &&
        elementPosition + elementHeight > offset;

      setIsActive(isInView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [to, offset, spy]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const element = document.getElementById(to);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Callback opcional
      onClick?.();
    }
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className={`${className} ${isActive ? "active" : ""}`}
    >
      {children}
    </a>
  );
};
