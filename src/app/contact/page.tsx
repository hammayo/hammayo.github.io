import { Container } from "@/components/container";
import { PageHeading } from "@/components/page-heading";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Hammayo's Portfolio",
  description: "Get in touch with me through various channels.",
};

export default function ContactPage() {
  return (
    <PageTransitionWrapper>
      <Container>
        <PageHeading
          title="Contact"
          description="Feel free to reach out through any of these platforms."
        />

        <div className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-3 lg:gap-16">
          {/* GitHub */}
          <div className="rounded-xl overflow-hidden border dark:border-zinc-800/50 border-zinc-200/50 dark:bg-black/20 bg-white/20 backdrop-blur-lg p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group hover:border-purple-500/30">
            {/* Glassmorphic gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 from-purple-500/20 via-cyan-500/10 transition-opacity duration-700 group-hover:opacity-100 -z-10"
                 style={{ maskImage: "radial-gradient(240px at center, white, transparent)", WebkitMaskImage: "radial-gradient(240px at center, white, transparent)" }} />

            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 flex items-center justify-center border rounded-full dark:border-purple-500/30 border-purple-300/30 dark:bg-black/30 bg-white/30 backdrop-blur-md group-hover:border-purple-500/50 transition-all duration-300">
                <svg viewBox="0 0 128 128" width="40" height="40">
                  <g fill="#6e5494"><path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path></g>
                </svg>
              </div>
              <div className="flex flex-col items-center mt-2">
                <h3 className="text-xl font-medium dark:text-zinc-200 text-zinc-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-cyan-500 group-hover:to-green-500 transition-all duration-300 tracking-tight">hammayo</h3>
                <span className="mt-4 text-sm text-center dark:text-zinc-400 text-zinc-600 tracking-tight">GitHub</span>
              </div>
              <a href="https://github.com/hammayo" target="_gh" rel="noopener noreferrer" className="mt-6 px-5 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 hover:from-purple-600 hover:via-cyan-600 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 tracking-tight">
                View Profile
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="rounded-xl overflow-hidden border dark:border-zinc-800/50 border-zinc-200/50 dark:bg-black/20 bg-white/20 backdrop-blur-lg p-8 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group hover:border-cyan-500/30 relative">
            {/* Glassmorphic gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 from-cyan-500/20 via-blue-500/10 transition-opacity duration-700 group-hover:opacity-100 -z-10"
                 style={{ maskImage: "radial-gradient(240px at center, white, transparent)", WebkitMaskImage: "radial-gradient(240px at center, white, transparent)" }} />

            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 flex items-center justify-center border rounded-full dark:border-cyan-500/30 border-cyan-300/30 dark:bg-black/30 bg-white/30 backdrop-blur-md group-hover:border-cyan-500/50 transition-all duration-300">
                <svg width="36" height="28" viewBox="0 0 512 384" fill="none">
                  <path d="M464 64H48C21.49 64 0 85.49 0 112V352C0 378.51 21.49 400 48 400H464C490.51 400 512 378.51 512 352V112C512 85.49 490.51 64 464 64ZM464 112L256 224L48 112H464ZM464 352H48V160L256 272L464 160V352Z" fill="#ea4335" />
                </svg>
              </div>
              <div className="flex flex-col items-center mt-2">
                <h3 className="text-xl font-medium dark:text-zinc-200 text-zinc-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-teal-500 transition-all duration-300 tracking-tight">hammy@hammayo.co.uk</h3>
                <span className="mt-4 text-sm text-center dark:text-zinc-400 text-zinc-600 tracking-tight">Email</span>
              </div>
              <a href="mailto:hammy@hammayo.co.uk" className="mt-6 px-5 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 tracking-tight">
                Send Email
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="rounded-xl overflow-hidden border dark:border-zinc-800/50 border-zinc-200/50 dark:bg-black/20 bg-white/20 backdrop-blur-lg p-8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group hover:border-blue-500/30 relative">
            {/* Glassmorphic gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 from-blue-500/20 via-indigo-500/10 transition-opacity duration-700 group-hover:opacity-100 -z-10"
                 style={{ maskImage: "radial-gradient(240px at center, white, transparent)", WebkitMaskImage: "radial-gradient(240px at center, white, transparent)" }} />

            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 flex items-center justify-center border rounded-full dark:border-blue-500/30 border-blue-300/30 dark:bg-black/30 bg-white/30 backdrop-blur-md group-hover:border-blue-500/50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" width="36" height="36">
                  <path fill="#0077b5" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v319.4C0 401.5 14.3 416 31.9 416H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 320H92V186.6h43.4V320zm-21.7-150.8c-14.1 0-25.6-11.5-25.6-25.6s11.5-25.6 25.6-25.6 25.6 11.5 25.6 25.6-11.5 25.6-25.6 25.6zm166.9 150.8h-43.4v-67c0-16.1-.3-36.9-22.5-36.9-22.5 0-25.9 17.6-25.9 35.7V320h-43.4V186.6h41.7v19.1h.6c5.8-11 19.9-22.5 41-22.5 43.8 0 52 28.9 52 66.4V320z" />
                </svg>
              </div>
              <div className="flex flex-col items-center mt-2">
                <h3 className="text-xl font-medium dark:text-zinc-200 text-zinc-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-indigo-500 group-hover:to-purple-500 transition-all duration-300 tracking-tight">hammayo</h3>
                <span className="mt-4 text-sm text-center dark:text-zinc-400 text-zinc-600 tracking-tight">LinkedIn</span>
              </div>
              <a href="https://linkedin.com/in/hammayo" target="_in" rel="noopener noreferrer" className="mt-6 px-5 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 tracking-tight">
                View Profile
              </a>
            </div>
          </div>
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
