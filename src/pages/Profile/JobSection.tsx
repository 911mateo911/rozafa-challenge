import classNames from "classnames";

interface JobSectionProps {
  position: string;
  company: string;
  dateRange: string;
  className?: string;
}

export const JobSection = ({ position, company, dateRange, className }: JobSectionProps) => {
  return (
    <div className={classNames(
      "grid grid-cols-2 bg-[#E5E5E5] p-2 [&>p]:text-black [&>p]:text-xs [&>p]:font-light [&>p]:leading-4 [&>p]:font-font-awesome-5",
      className
    )} >
      <p>
        {position}
        <br />
        {company}
      </p>
      <p className="text-right" >{dateRange}</p>
    </div>
  )
}
