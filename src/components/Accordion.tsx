import classNames from 'classnames';
import { CSSProperties, ReactNode, useRef, useState } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

type AccordionWrapperStyles = Pick<CSSProperties, 'height'>;

interface AccordionStyles {
  wrapperStyles: AccordionWrapperStyles;
  childClasses: string;
}

const initialAccordionStyles: AccordionStyles = {
  wrapperStyles: {
    height: 0
  },
  childClasses: 'invisible z-[-1]'
};

export const Accordion = ({ title, children }: AccordionProps) => {
  const childWrapperRef = useRef<HTMLDivElement>(null);
  const [accordionStyles, setAccordionStyles] = useState<AccordionStyles>(initialAccordionStyles);

  const onToggleAccordion = () => {
    if (!childWrapperRef.current) {
      return;
    }
    const isAccordionOpen = accordionStyles.wrapperStyles.height;
    requestAnimationFrame(() => {
      if (isAccordionOpen) {
        setAccordionStyles(initialAccordionStyles);
      } else {
        setAccordionStyles({
          wrapperStyles: {
            height: childWrapperRef.current?.offsetHeight
          },
          childClasses: 'visible z-auto'
        });
      }
    });
  };

  return (
    <div>
      <div
        className='p-3 rounded-md cursor-pointer bg-grey-10 font-semibold tracking-wide flex justify-between items-center'
        onClick={onToggleAccordion}
      >
        {title}
      </div>
      <div
        style={accordionStyles.wrapperStyles}
        className='transition-all relative w-full overflow-y-hidden duration-300'
      >
        <div
          ref={childWrapperRef}
          className={classNames(
            accordionStyles.childClasses,
            'absolute w-full overflow-hidden bottom-0 left-0'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
