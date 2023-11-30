import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SectionDetailProps {
  label: string;
  // or string
  value: ReactNode;
  asLink?: boolean;
}

// Conditional Type
type LinkOrDefaultType =
  | {
    asLink?: true;
    to: string;
  }
  | {
    asLink?: never;
    to?: never;
  };

export const SectionDetail = ({ label, value, asLink, to }: SectionDetailProps & LinkOrDefaultType) => {
  return (
    <p className="font-roboto text-base leading-5 font-normal text-black flex flex-col gap-1 md:flex-row md:leading-4" >
      <b>{label}</b>
      {asLink ? (
        <Link to={to} className="underline" >
          {value}
        </Link>
      ) : value}
    </p>
  )
}
