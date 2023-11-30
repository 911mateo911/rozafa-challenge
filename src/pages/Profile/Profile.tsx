import { SectionDetail } from "./SectionDetail"

// TODO: remove 30px with tailwind config value
export const Profile = () => {
  return (
    <div className="min-h-screen border-t-[20px] border-t-app-main" >
      <nav className="[&>*]:font-roboto mt-[42px] px-[30px] flex items-center justify-between flex-col md:flex-row" >
        <h1 className="text-black text-center text-[26px] font-bold leading-7 mb-4 md:mb-0" >
          Welcome Back Email here
        </h1>
        <button className="text-base-text text-base font-bold leading-5 md:mr-[30px]" >
          Logout
        </button>
      </nav>

      <main className="px-[30px] mt-[60px]" >
        <section className="max-w-[646px] mx-auto grid grid-cols-1 gap-[30px] rounded-lg-xl md:bg-[#BEBEC01A] md:py-[26px] md:px-9 md:grid-cols-2 md:gap-3" >
          <div className="grid gap-[30px] md:gap-3" >
            <SectionDetail
              label="Full Name:"
              value="Mateo Malaj"
            />
            <SectionDetail
              label="Email:"
              value='malajmateo@gmail.com'
              asLink
              to="mailto:malajmateo@gmail.com"
            />
          </div>
          <div className="grid gap-[30px] md:gap-3" >
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
        <hr className="bg-[#e5e5e5] m-[30px]" />
      </main>
    </div>
  )
}
