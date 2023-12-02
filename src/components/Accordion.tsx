import classNames from 'classnames';
import { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import ArrowIcon from '../assets/arrow.svg?react';
import { throttle } from '../helpers/throttle';

interface AccordionProps {
  name: string;
  title: string;
  children: ReactNode;
  className?: string;
  open: boolean;
  onToggleAccordionState: (name: string, isOpen: boolean) => void;
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

const openAccordionChildClass: AccordionStyles['childClasses'] = 'visible z-auto';

export const Accordion = ({
  title,
  children,
  open,
  onToggleAccordionState,
  className,
  name
}: AccordionProps) => {
  const childWrapperRef = useRef<HTMLDivElement | null>(null);
  const [accordionStyles, setAccordionStyles] = useState<AccordionStyles>(initialAccordionStyles);

  const childWrapperRefSetter = useCallback((divElement: HTMLDivElement) => {
    setAccordionStyles(open ?
      {
        childClasses: openAccordionChildClass,
        wrapperStyles: {
          height: divElement?.offsetHeight
        }
      } : initialAccordionStyles
    );

    childWrapperRef.current = divElement
  }, [open]);

  const onToggleAccordion = () => {
    if (!childWrapperRef.current) {
      return;
    }
    const isAccordionOpen = accordionStyles.wrapperStyles.height;
    requestAnimationFrame(() => {
      if (isAccordionOpen) {
        setAccordionStyles(initialAccordionStyles);
        onToggleAccordionState(name, false);
      } else {
        setAccordionStyles({
          wrapperStyles: {
            height: childWrapperRef.current?.offsetHeight
          },
          childClasses: openAccordionChildClass
        });
        onToggleAccordionState(name, true);
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
          ref={childWrapperRefSetter}
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
