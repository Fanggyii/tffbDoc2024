import Link from 'next/link'
import SocialHandle from './SocialHandle'
import { sectionTitles } from '../utils/helpers'
export default function Footer({ language }) {
    return (
        <footer className="w-full flex flex-col gap-10 items-center my-[10rem]">
          <div className="cursor-pointer z-50">
            <a href='https://www.impressiontaiwan.org/sponsors' target='_blank'>
              <img src="../img/social_impressiontaiwan.svg" />
            </a>
          </div>
          <div className="socials w-full flex justify-center gap-5 z-50 items-center py-8 relative">
            <SocialHandle logo="../img/social_fb.svg" link="https://www.facebook.com/ImpressionTaiwan/" />
            <SocialHandle logo="../img/social_ig.svg" link="https://www.instagram.com/impressiontaiwan/" />
            <SocialHandle logo="../img/social_yt.svg" link="https://www.youtube.com/@taiwanfilmfestivalberlinby1737" />
            <SocialHandle logo="../img/social_calendar.svg" link="https://calendar.google.com/calendar/u/0/embed?src=a155c1623d738c727a5e1a35da5940f9b9f5393594e27056ec9a865e06bdf0b2@group.calendar.google.com&ctz=Asia/Taipei" />
            
          </div>
          <div className="z-50">
            <Link href={`/${language}/about`}><button className="border-2 border-secondary py-3 px-5 rounded-full text-h4 font-special font-medium">{sectionTitles[language].aboutUs}</button>
            </Link>
          </div>
        </footer>
    )
}