import { Accordion } from "../../components/Accordion";
import { useAccordionGroup } from "../../hooks/useAccordionGroup";
import { useUser } from "../../hooks/useUser";
import { JobSection } from "./JobSection";
import { SectionDetail } from "./SectionDetail";

enum AccordionSectionNames {
  PersonalDesc = 'personal_desc',
  Employment = 'employment'
}

export const Profile = () => {
  const { logoutUser } = useUser();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' }).slice(0, 3);

  const {
    nameOfOpenAccordion,
    onAccordionToggled
  } = useAccordionGroup(AccordionSectionNames.PersonalDesc);

  return (
    <div className="min-h-screen border-t-[20px] border-t-app-main" >
      <nav className="[&>*]:font-roboto mt-[42px] px-base flex items-center justify-between flex-col md:flex-row" >
        <h1 className="text-black text-center text-[26px] font-bold leading-7 mb-4 md:mb-0" >
          Welcome Back, Mateo!
        </h1>
        <button onClick={logoutUser} className="text-base-text text-base font-bold leading-5 md:mr-[30px]" >
          Logout
        </button>
      </nav>

      <main className="px-base mt-[60px]" >
        <section className="max-w-[646px] mx-auto grid grid-cols-1 gap-base rounded-lg-xl md:bg-[#BEBEC01A] md:py-[26px] md:px-9 md:grid-cols-2 md:gap-3" >
          <div className="grid gap-base md:gap-3" >
            <SectionDetail
              label="Full Name:"
              value="Mateo Malaj"
            />
            <SectionDetail
              label="Email:"
              value='malajmateo@gmail.com'
              asLink
              to='mailto:malajmateo@gmail.com'
            />
          </div>
          <div className="grid gap-base md:gap-3" >
            <SectionDetail
              label="Phone:"
              value='+355699675522'
              asLink
              to="tel:+355699675522"
            />
            <SectionDetail
              label="Position:"
              value="Software Developer"
            />
          </div>
        </section>
        <hr className="bg-grey-5 m-[30px] md:hidden" />
        <div className="mx-auto max-w-[737px]" >
          <Accordion
            name={AccordionSectionNames.PersonalDesc}
            className='md:mt-20'
            title="About Me:"
            open={nameOfOpenAccordion === AccordionSectionNames.PersonalDesc}
            onToggleAccordionState={onAccordionToggled}
          >
            <p className="text-black font-roboto text-base font-normal" >
              I have always had an interest on software and how it works. After I finished my studies, I decided the software field suited me more and i learned some android development first, then to move to javascript, to which i decided to base my career as an app developer. Since I started learning JS, I've been very dedicated and have managed to learn quite a lot.
            </p>
          </Accordion>
          <Accordion
            name={AccordionSectionNames.Employment}
            title="Employment history"
            className="mt-4 md:mt-5"
            open={nameOfOpenAccordion === AccordionSectionNames.Employment}
            onToggleAccordionState={onAccordionToggled}
          >
            <div className="md:px-6" >
              <JobSection
                company="Sisal Albania"
                position="Software Developer"
                dateRange={`Dec 2021 - ${currentMonth} ${new Date().getFullYear()}`}
              />
              <JobSection
                company="Freelancer"
                position="Frontend Developer"
                dateRange="Apr 2022 - Jul 2023"
                className="mt-3"
              />
              <JobSection
                company="Atis Albania"
                position="Frontend Developer"
                dateRange="Aug 2021 - Dec 2021"
                className="mt-3"
              />
            </div>
          </Accordion>
        </div>
      </main>
    </div>
  )
}
