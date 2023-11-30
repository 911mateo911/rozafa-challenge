import classNames from 'classnames';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import ArrowIcon from '../assets/arrow.svg?react';
import { throttle } from '../helpers/throttle';

interface AccordionProps {
  title: string;
  children: ReactNode;
  className?: string;
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

export const Accordion = ({ title, children, className }: AccordionProps) => {
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

  useEffect(() => {
    // USED THIS TO RECALCULATE THE CHILD Height if changed due to screen resizing
    const resizeListener = throttle(() => {
      if (childWrapperRef.current) {
        setAccordionStyles(previousStyles => {
          const isAccordionOpen = !!previousStyles.wrapperStyles.height;

          if (isAccordionOpen) {
            return {
              ...previousStyles,
              wrapperStyles: {
                height: childWrapperRef.current?.offsetHeight
              }
            }
          } else {
            return previousStyles;
          }
        })
      }
    }, 500)

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, []);

  return (
    <div className={className} >
      <div
        className='font-roboto font-bold text-black text-base leading-5 flex justify-between items-center cursor-pointer pb-4 md:pb-2.5 md:text-xl'
        onClick={onToggleAccordion}
      >
        {title}
        <ArrowIcon
          className={classNames('transition-all w-3', accordionStyles.wrapperStyles.height ? 'rotate-0' : '-rotate-180')}
        />
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
