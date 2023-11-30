import { Accordion } from "../../components/Accordion"
import { useUser } from "../../hooks/useUser"
import { JobSection } from "./JobSection"
import { SectionDetail } from "./SectionDetail"

export const Profile = () => {
  const { user, logoutUser } = useUser();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' }).slice(0, 3);

  return (
    <div className="min-h-screen border-t-[20px] border-t-app-main" >
      <nav className="[&>*]:font-roboto mt-[42px] px-base flex items-center justify-between flex-col md:flex-row" >
        <h1 className="text-black text-center text-[26px] font-bold leading-7 mb-4 md:mb-0" >
          Welcome Back {user?.email}
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
              value={user?.email}
              asLink
              to={`mailto:${user?.email}`}
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
        <Accordion className='lg:mt-20' title="About Me:" >
          <p className="text-black font-roboto text-base font-normal" >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Urna neque viverra justo nec. Vulputate ut pharetra sit amet aliquam id. Duis ultricies lacus sed turpis. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper. Iaculis urna id volutpat lacus laoreet. Vitae semper quis lectus nulla at volutpat diam. Tincidunt augue interdum velit euismod in pellentesque. Elementum pulvinar etiam non quam lacus suspendisse. Eget magna fermentum iaculis eu.
          </p>
        </Accordion>
        <Accordion
          title="Employment history"
          className="mt-4 lg:mt-5"
        >
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
        </Accordion>
      </main>
    </div>
  )
}
