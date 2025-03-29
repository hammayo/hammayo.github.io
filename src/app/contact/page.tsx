import { Container } from "@/components/container";
import { PageHeading } from "@/components/page-heading";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";
import { ContactCard } from "@/components/contact-card";
import { SOCIAL } from "@/lib/constants";
import type { Metadata } from "next";
import { PageViewEvent } from "@/components/analytics-event";

export const metadata: Metadata = {
  title: "Contact | Hammayo's Portfolio",
  description: "Get in touch with me",
};

export default function ContactPage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="contact" />
      <Container>
        <PageHeading
          title="Contact"
          description="Feel free to reach out through any of these platforms."
        />

        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-16 lg:mt-44 sm:grid-cols-3 lg:gap-16">
          {/* GitHub */}
          <ContactCard
            icon={
              <svg viewBox="0 0 128 128" width="40" height="40">
                <g fill="#6e5494">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                  />
                </g>
              </svg>
            }
            title="hammayo"
            subtitle="GitHub"
            link={SOCIAL.github}
            linkText="View Profile"
            variant="github"
          />

          {/* LinkedIn */}
          <ContactCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" width="36" height="36">
                <path
                  fill="#0077b5"
                  d="M416 32H31.9C14.3 32 0 46.5 0 64.3v319.4C0 401.5 14.3 416 31.9 416H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 320H92V186.6h43.4V320zm-21.7-150.8c-14.1 0-25.6-11.5-25.6-25.6s11.5-25.6 25.6-25.6 25.6 11.5 25.6 25.6-11.5 25.6-25.6 25.6zm166.9 150.8h-43.4v-67c0-16.1-.3-36.9-22.5-36.9-22.5 0-25.9 17.6-25.9 35.7V320h-43.4V186.6h41.7v19.1h.6c5.8-11 19.9-22.5 41-22.5 43.8 0 52 28.9 52 66.4V320z"
                />
              </svg>
            }
            title="hammayo"
            subtitle="LinkedIn"
            link={SOCIAL.linkedin}
            linkText="View Profile"
            variant="linkedin"
          />

          {/* Email */}
          <ContactCard
            icon={
              <svg width="36" height="28" viewBox="0 0 512 384" fill="none">
                <path
                  d="M464 64H48C21.49 64 0 85.49 0 112V352C0 378.51 21.49 400 48 400H464C490.51 400 512 378.51 512 352V112C512 85.49 490.51 64 464 64ZM464 112L256 224L48 112H464ZM464 352H48V160L256 272L464 160V352Z"
                  fill="#ea4335"
                />
              </svg>
            }
            title={SOCIAL.email}
            subtitle="Email"
            link={`mailto:${SOCIAL.email}`}
            linkText="Send Email"
            variant="email"
          />
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
