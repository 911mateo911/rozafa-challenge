import { useState } from "react"

export const useAccordionGroup = (defaultOpenAccordionName: string | null = null) => {
  const [nameOfOpenAccordion, setNameOfOpenAccordion] = useState<string | null>(defaultOpenAccordionName);

  const onAccordionToggled = (name: string, isOpen: boolean) => {
    if (!isOpen && name === nameOfOpenAccordion) {
      setNameOfOpenAccordion(null);
    } else {
      setNameOfOpenAccordion(name);
    }
  };

  return {
    nameOfOpenAccordion,
    onAccordionToggled
  }
}
