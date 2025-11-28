import svgPaths from "./svg-08bt8cln1v";
import imgWp96499302 from "figma:asset/c4c4eca424f7dfcdec68ff554dfed783b9abbc09.png";
import imgRichardHorvathNWaeTf6Qo0Unsplash2 from "figma:asset/3ba68ebca794d6d97d617807d5448758406dcbad.png";
import imgTexture from "figma:asset/7007946560060ca9880e8e9ffd6e2658f2bc6c6b.png";
import { imgShadow, imgWp96499301, imgRichardHorvathNWaeTf6Qo0Unsplash1, imgRichardHorvathNWaeTf6Qo0Unsplash3 } from "./svg-8bo62";

function Balance({ className }: { className?: string }) {
  return (
    <div className={className} data-name="Balance">
      <div className="absolute backdrop-blur-[60px] backdrop-filter h-[103px] left-0 right-0 rounded-[20px] top-0" data-name="Card" />
      <div className="absolute h-[212px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-192px_61px] mask-size-[368px_103px] right-[-18px] top-[-61px] w-[194px]" data-name="Shadow" style={{ maskImage: `url('${imgShadow}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 194 212">
          <path d={svgPaths.p380d1b72} fill="url(#paint0_linear_17_6882)" id="Shadow" opacity="0.1" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_17_6882" x1="126.954" x2="100.438" y1="-30.7796" y2="195.643">
              <stop stopColor="white" />
              <stop offset="0.0001" stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute h-[17.026px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-289px_-49px] mask-size-[368px_103px] right-[20px] top-[49px] w-[59px]" data-name="Graph" style={{ maskImage: `url('${imgShadow}')` }}>
        <div className="absolute inset-[-5.87%_-1.69%_-5.87%_-1.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 61 20">
            <path d={svgPaths.p13a7f680} id="Graph" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[20px] left-[15px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15px_-18px] mask-size-[368px_103px] not-italic text-[#e9edf7] text-[12px] text-nowrap top-[18px] tracking-[-0.24px] whitespace-pre" style={{ maskImage: `url('${imgShadow}')` }}>
        Credit Balance
      </p>
      <p className="absolute font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[42px] left-[15px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15px_-38px] mask-size-[368px_103px] not-italic text-[34px] text-nowrap text-white top-[38px] whitespace-pre" style={{ maskImage: `url('${imgShadow}')` }}>
        $25,215
      </p>
      <div className="absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-327px_-15px] mask-size-[368px_103px] right-[17px] size-[24px] top-[15px]" data-name="More" style={{ maskImage: `url('${imgShadow}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g clipPath="url(#clip0_17_6862)" id="More">
            <g id="Vector"></g>
            <path d={svgPaths.p1aa02900} fill="var(--fill-0, white)" id="Vector_2" />
          </g>
          <defs>
            <clipPath id="clip0_17_6862">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Background">
      <div className="absolute h-[1174px] left-px top-0 w-[1917px]" />
      <div className="absolute blur-[136px] filter h-[1875px] left-[-330px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[330px_170px] mask-size-[1920px_1174px] top-[-170px] w-[2526px]" data-name="wp9649930 1" style={{ maskImage: `url('${imgWp96499301}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgWp96499302} />
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute contents font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1645px] not-italic text-[14px] text-nowrap text-white top-[1127px] whitespace-pre" data-name="Menu">
      <p className="absolute left-[1847px] top-[1127px]">License</p>
      <p className="absolute left-[1771px] top-[1127px]">Blog</p>
      <p className="absolute left-[1645px] top-[1127px]">Marketplace</p>
    </div>
  );
}

function Copyright() {
  return (
    <div className="absolute contents left-[298px] top-[1127px]" data-name="Copyright">
      <p className="absolute font-['Helvetica:Regular',sans-serif] leading-[1.5] left-[298px] not-italic text-[0px] text-[14px] text-nowrap text-white top-[1127px] whitespace-pre">
        <span className="font-['Plus_Jakarta_Display:Regular',sans-serif]">{`@ 2021, Made with ❤️ by `}</span>
        <span className="font-['Plus_Jakarta_Display:Medium',sans-serif]">{`Simmmple & Creative Tim`}</span>
        <span className="font-['Plus_Jakarta_Display:Regular',sans-serif]">{` for a better web`}</span>
      </p>
    </div>
  );
}

function FooterMenu() {
  return (
    <div className="absolute contents left-[298px] top-[1127px]" data-name="Footer Menu">
      <Menu />
      <Copyright />
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute contents left-[1222px] top-[561px]" data-name="Background">
      <div className="absolute backdrop-blur-[60px] backdrop-filter h-[538.5px] left-[1222px] rounded-[20px] top-[561px] w-[674px]" />
    </div>
  );
}

function Title() {
  return (
    <div className="absolute contents left-[1292px] not-italic text-[14px] text-nowrap top-[1028.5px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1292px] text-[#a0aec0] top-[1052.5px]">25 March 2020, at 16:30 PM</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1292px] text-white top-[1028.5px]">Microsoft</p>
    </div>
  );
}

function Price() {
  return (
    <div className="absolute contents left-[1832px] top-[1037px]" data-name="Price">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1832px] not-italic text-[#a0aec0] text-[14px] text-nowrap top-[1037px] whitespace-pre">-$987</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative size-[35px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="Icon">
          <circle cx="17.5" cy="17.5" id="Ellipse 50" r="17" stroke="var(--stroke-0, #E31A1A)" />
          <g id="IONIcon/A/arrow/forward">
            <path d={svgPaths.p2ac44000} id="Vector" stroke="var(--stroke-0, #E31A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p22b35ba0} id="Vector_2" stroke="var(--stroke-0, #E31A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component3() {
  return (
    <div className="absolute contents left-[1243px] top-[1028.5px]" data-name="4">
      <Title />
      <Price />
      <div className="absolute flex items-center justify-center left-[1243px] size-[35px] top-[1031px]">
        <div className="flex-none rotate-[180deg]">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div className="absolute contents left-[1292px] not-italic text-[14px] text-nowrap top-[962.5px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1292px] text-[#a0aec0] top-[986.5px]">26 March 2020, at 05:00 AM</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1292px] text-white top-[962.5px]">Webflow</p>
    </div>
  );
}

function Price1() {
  return (
    <div className="absolute contents left-[1819px] top-[971px]" data-name="Price">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1819px] not-italic text-[#a0aec0] text-[14px] text-nowrap top-[971px] whitespace-pre">Pending</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[1243px] size-[35px] top-[965px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="Icon">
          <circle cx="17.5" cy="17.5" id="Ellipse 50" r="17" stroke="var(--stroke-0, #A0AEC0)" />
          <g clipPath="url(#clip0_17_6997)" id="priority_high">
            <g id="Vector"></g>
            <path d={svgPaths.p19955680} fill="var(--fill-0, #A0AEC0)" id="Vector_2" />
            <path d={svgPaths.p28104600} fill="var(--fill-0, #A0AEC0)" id="Vector_3" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_17_6997">
            <rect fill="white" height="14" transform="translate(10.5001 10.5)" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute contents left-[1243px] top-[962.5px]" data-name="3">
      <Title1 />
      <Price1 />
      <Icon1 />
    </div>
  );
}

function Title2() {
  return (
    <div className="absolute contents left-[1292px] not-italic text-[14px] text-nowrap top-[896.5px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1292px] text-[#a0aec0] top-[920.5px]">26 March 2020, at 12:30 PM</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1292px] text-white top-[896.5px]">HubSpot</p>
    </div>
  );
}

function Price2() {
  return (
    <div className="absolute contents left-[1823px] top-[905px]" data-name="Price">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1823px] not-italic text-[#01b574] text-[14px] text-nowrap top-[905px] whitespace-pre">+$1700</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[1243px] size-[35px] top-[899px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="Icon">
          <circle cx="17.5" cy="17.5" id="Ellipse 50" r="17" stroke="var(--stroke-0, #01B574)" />
          <g id="IONIcon/A/arrow/forward">
            <path d={svgPaths.p14081600} id="Vector" stroke="var(--stroke-0, #01B574)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p22391100} id="Vector_2" stroke="var(--stroke-0, #01B574)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute contents left-[1243px] top-[896.5px]" data-name="2">
      <Title2 />
      <Price2 />
      <Icon2 />
    </div>
  );
}

function Title3() {
  return (
    <div className="absolute contents left-[1292px] not-italic text-[14px] text-nowrap top-[830.5px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1292px] text-[#a0aec0] top-[854.5px]">26 March 2020, at 13:45 PM</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1292px] text-white top-[830.5px]">Stripe</p>
    </div>
  );
}

function Price3() {
  return (
    <div className="absolute contents left-[1828px] top-[839px]" data-name="Price">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1828px] not-italic text-[#01b574] text-[14px] text-nowrap top-[839px] whitespace-pre">+$800</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative size-[35px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="Icon">
          <circle cx="17.5" cy="17.5" id="Ellipse 50" r="17" stroke="var(--stroke-0, #01B574)" />
          <g id="IONIcon/A/arrow/forward">
            <path d={svgPaths.pcd8c280} id="Vector" stroke="var(--stroke-0, #01B574)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p250e3a00} id="Vector_2" stroke="var(--stroke-0, #01B574)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute contents left-[1243px] top-[830.5px]" data-name="1">
      <Title3 />
      <Price3 />
      <div className="absolute flex items-center justify-center left-[1243px] size-[35px] top-[833px]">
        <div className="flex-none rotate-[180deg]">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function Yesterday() {
  return (
    <div className="absolute contents left-[1243px] top-[798px]" data-name="Yesterday">
      <Component3 />
      <Component2 />
      <Component1 />
      <Component />
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] h-[15px] leading-[1.5] left-[1243px] not-italic text-[#a0aec0] text-[10px] top-[798px] w-[60.5px]">YESTERDAY</p>
    </div>
  );
}

function Title4() {
  return (
    <div className="absolute contents left-[1292px] not-italic text-[14px] text-nowrap top-[730px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1292px] text-[#a0aec0] top-[754px]">27 March 2020, at 12:30 PM</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1292px] text-white top-[730px]">Apple</p>
    </div>
  );
}

function Price4() {
  return (
    <div className="absolute contents left-[1820px] top-[738.5px]" data-name="Price">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1820px] not-italic text-[#01b574] text-[14px] text-nowrap top-[738.5px] whitespace-pre">+$2500</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[1243px] size-[35px] top-[732.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="Icon">
          <circle cx="17.5" cy="17.5" id="Ellipse 50" r="17" stroke="var(--stroke-0, #01B574)" />
          <g id="IONIcon/A/arrow/forward">
            <path d={svgPaths.p21e54700} id="Vector" stroke="var(--stroke-0, #01B574)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p9c6f000} id="Vector_2" stroke="var(--stroke-0, #01B574)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component5() {
  return (
    <div className="absolute contents left-[1243px] top-[730px]" data-name="2">
      <Title4 />
      <Price4 />
      <Icon4 />
    </div>
  );
}

function Title5() {
  return (
    <div className="absolute contents left-[1292px] not-italic text-[14px] text-nowrap top-[664px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1292px] text-[#a0aec0] top-[688px]">27 March 2020, at 12:30 PM</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1292px] text-white top-[664px]">Netflix</p>
    </div>
  );
}

function Price5() {
  return (
    <div className="absolute contents left-[1821px] top-[672.5px]" data-name="Price">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1821px] not-italic text-[#a0aec0] text-[14px] text-nowrap top-[672.5px] whitespace-pre">-$2500</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[1243px] size-[35px] top-[666.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="Icon">
          <circle cx="17.5" cy="17.5" id="Ellipse 50" r="17" stroke="var(--stroke-0, #E31A1A)" />
          <g id="IONIcon/A/arrow/forward">
            <path d={svgPaths.p2b78400} id="Vector" stroke="var(--stroke-0, #E31A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p173b8a40} id="Vector_2" stroke="var(--stroke-0, #E31A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component6() {
  return (
    <div className="absolute contents left-[1243px] top-[664px]" data-name="1">
      <Title5 />
      <Price5 />
      <Icon5 />
    </div>
  );
}

function Newest() {
  return (
    <div className="absolute contents left-[1243px] top-[631.5px]" data-name="Newest">
      <Component5 />
      <Component6 />
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] h-[15px] leading-[1.5] left-[1243px] not-italic text-[#a0aec0] text-[10px] top-[631.5px] w-[43px]">NEWEST</p>
    </div>
  );
}

function List() {
  return (
    <div className="absolute contents left-[1243px] top-[631.5px]" data-name="List">
      <Yesterday />
      <Newest />
    </div>
  );
}

function IonIconCCalendarOutline() {
  return (
    <div className="absolute left-[1724px] size-[15px] top-[594px]" data-name="IONIcon/C/calendar/outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="IONIcon/C/calendar/outline">
          <path d={svgPaths.p2a8c5700} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #2D3748)" strokeLinejoin="round" strokeWidth="0.75" />
          <path d={svgPaths.p214b0f0} fill="var(--fill-0, #2D3748)" id="Vector_2" />
          <path d={svgPaths.p10f29700} fill="var(--fill-0, #2D3748)" id="Vector_3" />
          <path d={svgPaths.p11cc9a70} fill="var(--fill-0, #2D3748)" id="Vector_4" />
          <path d={svgPaths.p21bf4500} fill="var(--fill-0, #2D3748)" id="Vector_5" />
          <path d={svgPaths.p3d6a1e00} fill="var(--fill-0, #2D3748)" id="Vector_6" />
          <path d={svgPaths.pa7fdd00} fill="var(--fill-0, #2D3748)" id="Vector_7" />
          <path d={svgPaths.p14b55b80} fill="var(--fill-0, #2D3748)" id="Vector_8" />
          <path d={svgPaths.p251239f0} fill="var(--fill-0, #2D3748)" id="Vector_9" />
          <path d={svgPaths.p32d9e100} fill="var(--fill-0, #2D3748)" id="Vector_10" />
          <path d={svgPaths.p2fd10880} fill="var(--fill-0, #2D3748)" id="Vector_11" />
          <path d="M3.74989 1.40559V2.34309" id="Vector_12" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d="M11.25 1.40559V2.34309" id="Vector_13" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Date() {
  return (
    <div className="absolute contents left-[1724px] top-[592px]" data-name="Date">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1745px] not-italic text-[#a0aec0] text-[14px] text-nowrap top-[592px] whitespace-pre">23 - 30 March 2020</p>
      <IonIconCCalendarOutline />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute contents left-[1243px] top-[589px]" data-name="Text">
      <p className="absolute font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[1.4] left-[1243px] not-italic text-[18px] text-nowrap text-white top-[589px] whitespace-pre">Your Transactions</p>
      <Date />
    </div>
  );
}

function YourTransactions() {
  return (
    <div className="absolute contents left-[1222px] top-[561px]" data-name="Your Transactions">
      <Background1 />
      <List />
      <Text />
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute contents left-[298px] top-[561px]" data-name="Background">
      <div className="absolute backdrop-blur-[60px] backdrop-filter h-[538.5px] left-[298px] rounded-[20px] top-[561px] w-[900px]" />
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute contents left-[320.5px] top-[944.5px]" data-name="Background">
      <div className="absolute backdrop-blur-[60px] backdrop-filter h-[132.5px] left-[320.5px] rounded-[20px] top-[944.5px] w-[855px]" />
    </div>
  );
}

function Delete() {
  return (
    <div className="absolute left-[1031px] size-[15px] top-[972.5px]" data-name="delete">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6951)" id="delete">
          <g id="Vector"></g>
          <path d={svgPaths.p3016f900} fill="var(--fill-0, #F53C2B)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6951">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Delete1() {
  return (
    <div className="absolute contents left-[1031px] top-[971px]" data-name="Delete">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1049.5px] not-italic text-[#f53c2b] text-[12px] text-nowrap top-[971px] whitespace-pre">DELETE</p>
      <Delete />
    </div>
  );
}

function Edit() {
  return (
    <div className="absolute left-[1110.5px] size-[12px] top-[974.5px]" data-name="edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6969)" id="edit">
          <g id="Vector"></g>
          <path d={svgPaths.pe1f480} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6969">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Edit1() {
  return (
    <div className="absolute contents left-[1110.5px] top-[972px]" data-name="Edit">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1126.5px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[972px] whitespace-pre">EDIT</p>
      <Edit />
    </div>
  );
}

function Details() {
  return (
    <div className="absolute contents left-[347.5px] top-[970.5px]" data-name="Details">
      <div className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[0] left-[348.5px] not-italic text-[#a0aec0] text-[0px] text-nowrap top-[995.5px] whitespace-pre">
        <p className="leading-[1.5] mb-0 text-[12px]">
          <span>{`Company Name: `}</span>Viking Burrito
        </p>
        <p className="leading-[1.5] mb-0 text-[12px]">
          <span>{`Email Address: `}</span>oliver@burrito.com
        </p>
        <p className="leading-[1.5] text-[12px]">
          <span>{`VAT Number: `}</span>FRB1235476
        </p>
      </div>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[347.5px] not-italic text-[14px] text-nowrap text-white top-[970.5px] whitespace-pre">Oliver Liam</p>
      <Delete1 />
      <Edit1 />
    </div>
  );
}

function Component7() {
  return (
    <div className="absolute contents left-[320.5px] top-[944.5px]" data-name="3">
      <Background3 />
      <Details />
    </div>
  );
}

function Background4() {
  return (
    <div className="absolute contents left-[320.5px] top-[788px]" data-name="Background">
      <div className="absolute backdrop-blur-[60px] backdrop-filter h-[132.5px] left-[320.5px] rounded-[20px] top-[788px] w-[855px]" />
    </div>
  );
}

function Delete2() {
  return (
    <div className="absolute left-[1031px] size-[15px] top-[816px]" data-name="delete">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6951)" id="delete">
          <g id="Vector"></g>
          <path d={svgPaths.p3016f900} fill="var(--fill-0, #F53C2B)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6951">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Delete3() {
  return (
    <div className="absolute contents left-[1031px] top-[814.5px]" data-name="Delete">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1049.5px] not-italic text-[#f53c2b] text-[12px] text-nowrap top-[814.5px] whitespace-pre">DELETE</p>
      <Delete2 />
    </div>
  );
}

function Edit2() {
  return (
    <div className="absolute left-[1110.5px] size-[12px] top-[818px]" data-name="edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6961)" id="edit">
          <g id="Vector"></g>
          <path d={svgPaths.pe1f480} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6961">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Edit3() {
  return (
    <div className="absolute contents left-[1110.5px] top-[815.5px]" data-name="Edit">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1126.5px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[815.5px] whitespace-pre">EDIT</p>
      <Edit2 />
    </div>
  );
}

function Details1() {
  return (
    <div className="absolute contents left-[347.5px] top-[814px]" data-name="Details">
      <div className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[0] left-[348.5px] not-italic text-[#a0aec0] text-[0px] text-nowrap top-[839px] whitespace-pre">
        <p className="leading-[1.5] mb-0 text-[12px]">
          <span>{`Company Name: `}</span>Viking Burrito
        </p>
        <p className="leading-[1.5] mb-0 text-[12px]">
          <span>{`Email Address: `}</span>oliver@burrito.com
        </p>
        <p className="leading-[1.5] text-[12px]">
          <span>{`VAT Number: `}</span>FRB1235476
        </p>
      </div>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[347.5px] not-italic text-[14px] text-nowrap text-white top-[814px] whitespace-pre">Oliver Liam</p>
      <Delete3 />
      <Edit3 />
    </div>
  );
}

function Component8() {
  return (
    <div className="absolute contents left-[320.5px] top-[788px]" data-name="2">
      <Background4 />
      <Details1 />
    </div>
  );
}

function Background5() {
  return (
    <div className="absolute contents left-[320.5px] top-[631.5px]" data-name="Background">
      <div className="absolute backdrop-blur-[60px] backdrop-filter h-[132.5px] left-[320.5px] rounded-[20px] top-[631.5px] w-[855px]" />
    </div>
  );
}

function Delete4() {
  return (
    <div className="absolute left-[1031px] size-[15px] top-[659.5px]" data-name="delete">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6951)" id="delete">
          <g id="Vector"></g>
          <path d={svgPaths.p3016f900} fill="var(--fill-0, #F53C2B)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6951">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Delete5() {
  return (
    <div className="absolute contents left-[1031px] top-[658px]" data-name="Delete">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1049.5px] not-italic text-[#f53c2b] text-[12px] text-nowrap top-[658px] whitespace-pre">DELETE</p>
      <Delete4 />
    </div>
  );
}

function Edit4() {
  return (
    <div className="absolute left-[1110.5px] size-[12px] top-[661.5px]" data-name="edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6969)" id="edit">
          <g id="Vector"></g>
          <path d={svgPaths.pe1f480} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6969">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Edit5() {
  return (
    <div className="absolute contents left-[1110.5px] top-[659px]" data-name="Edit">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1126.5px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[659px] whitespace-pre">EDIT</p>
      <Edit4 />
    </div>
  );
}

function Details2() {
  return (
    <div className="absolute contents left-[347.5px] top-[657.5px]" data-name="Details">
      <div className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[0] left-[348.5px] not-italic text-[#a0aec0] text-[0px] text-nowrap top-[682.5px] whitespace-pre">
        <p className="leading-[1.5] mb-0 text-[12px]">
          <span>{`Company Name: `}</span>Viking Burrito
        </p>
        <p className="leading-[1.5] mb-0 text-[12px]">
          <span>{`Email Address: `}</span>oliver@burrito.com
        </p>
        <p className="leading-[1.5] text-[12px]">
          <span>{`VAT Number: `}</span>FRB1235476
        </p>
      </div>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[347.5px] not-italic text-[14px] text-nowrap text-white top-[657.5px] whitespace-pre">Oliver Liam</p>
      <Delete5 />
      <Edit5 />
    </div>
  );
}

function Component9() {
  return (
    <div className="absolute contents left-[320.5px] top-[631.5px]" data-name="1">
      <Background5 />
      <Details2 />
    </div>
  );
}

function Items() {
  return (
    <div className="absolute contents left-[320.5px] top-[631.5px]" data-name="Items">
      <Component7 />
      <Component8 />
      <Component9 />
    </div>
  );
}

function List1() {
  return (
    <div className="absolute contents left-[320.5px] top-[631.5px]" data-name="List">
      <Items />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute contents left-[319px] top-[589px]" data-name="Text">
      <p className="absolute font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[1.4] left-[319px] not-italic text-[18px] text-nowrap text-white top-[589px] whitespace-pre">Billing Information</p>
    </div>
  );
}

function BillingInformation() {
  return (
    <div className="absolute contents left-[298px] top-[561px]" data-name="Billing Information">
      <Background2 />
      <List1 />
      <Text1 />
    </div>
  );
}

function ContentCards() {
  return (
    <div className="absolute contents left-[298px] top-[561px]" data-name="Content Cards">
      <YourTransactions />
      <BillingInformation />
    </div>
  );
}

function Background6() {
  return (
    <div className="absolute h-[436px] left-[1222px] top-[101px] w-[674px]" data-name="Background">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 674 436">
        <g id="Background">
          <foreignObject height="676" width="914" x="-120" y="-120">
            <div style={{ backdropFilter: "blur(60px)", clipPath: "url(#bgblur_0_17_6932_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          <path d={svgPaths.p3cd62d80} data-figma-bg-blur-radius="120" fill="url(#paint0_linear_17_6932)" id="Rectangle 9" />
        </g>
        <defs>
          <clipPath id="bgblur_0_17_6932_clip_path" transform="translate(120 120)">
            <path d={svgPaths.p3cd62d80} />
          </clipPath>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_17_6932" x1="186.794" x2="473.107" y1="36.7558" y2="371.383">
            <stop stopColor="#060B28" stopOpacity="0.94" />
            <stop offset="1" stopColor="#0A0E23" stopOpacity="0.49" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Title6() {
  return (
    <div className="absolute contents left-[1247.5px] not-italic text-nowrap top-[447.5px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1247.5px] text-[#a0aec0] text-[12px] top-[471.5px]">#AR-803481</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1247.5px] text-[14px] text-white top-[447.5px]">March, 01, 2019</p>
    </div>
  );
}

function IonIconDDocumentText() {
  return (
    <div className="absolute left-[1829px] size-[15px] top-[460px]" data-name="IONIcon/D/document/text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6925)" id="IONIcon/D/document/text">
          <path d={svgPaths.p24c27bc0} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p4567680} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6925">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Document() {
  return (
    <div className="absolute contents left-[1783px] top-[458px]" data-name="Document">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1783px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[458px] whitespace-pre">$300</p>
      <IonIconDDocumentText />
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1847.5px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[458.5px] whitespace-pre">PDF</p>
    </div>
  );
}

function Component4() {
  return (
    <div className="absolute contents left-[1247.5px] top-[447.5px]" data-name="5">
      <Title6 />
      <Document />
    </div>
  );
}

function Title7() {
  return (
    <div className="absolute contents left-[1247.5px] not-italic text-nowrap top-[381px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1247.5px] text-[#a0aec0] text-[12px] top-[405px]">#QW-103578</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1247.5px] text-[14px] text-white top-[381px]">June, 25, 2019</p>
    </div>
  );
}

function IonIconDDocumentText1() {
  return (
    <div className="absolute left-[1829px] size-[15px] top-[393.5px]" data-name="IONIcon/D/document/text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6925)" id="IONIcon/D/document/text">
          <path d={svgPaths.p24c27bc0} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p4567680} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6925">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Document1() {
  return (
    <div className="absolute contents left-[1786px] top-[391.5px]" data-name="Document">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1786px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[391.5px] whitespace-pre">$120</p>
      <IonIconDDocumentText1 />
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1847.5px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[392px] whitespace-pre">PDF</p>
    </div>
  );
}

function Component10() {
  return (
    <div className="absolute contents left-[1247.5px] top-[381px]" data-name="4">
      <Title7 />
      <Document1 />
    </div>
  );
}

function Title8() {
  return (
    <div className="absolute contents left-[1247.5px] not-italic text-nowrap top-[314.5px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1247.5px] text-[#a0aec0] text-[12px] top-[338.5px]">#FB-212562</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1247.5px] text-[14px] text-white top-[314.5px]">April, 05, 2020</p>
    </div>
  );
}

function IonIconDDocumentText2() {
  return (
    <div className="absolute left-[1829px] size-[15px] top-[327px]" data-name="IONIcon/D/document/text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6925)" id="IONIcon/D/document/text">
          <path d={svgPaths.p24c27bc0} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p4567680} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6925">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Document2() {
  return (
    <div className="absolute contents left-[1784px] top-[325px]" data-name="Document">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1784px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[325px] whitespace-pre">$560</p>
      <IonIconDDocumentText2 />
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1847.5px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[325.5px] whitespace-pre">PDF</p>
    </div>
  );
}

function Component11() {
  return (
    <div className="absolute contents left-[1247.5px] top-[314.5px]" data-name="3">
      <Title8 />
      <Document2 />
    </div>
  );
}

function Title9() {
  return (
    <div className="absolute contents left-[1247.5px] not-italic text-nowrap top-[248px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1247.5px] text-[#a0aec0] text-[12px] top-[272px]">#RV-126749</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1247.5px] text-[14px] text-white top-[248px]">February, 10, 2021</p>
    </div>
  );
}

function IonIconDDocumentText3() {
  return (
    <div className="absolute left-[1829px] size-[15px] top-[260.5px]" data-name="IONIcon/D/document/text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6833)" id="IONIcon/D/document/text">
          <path d={svgPaths.pf54700} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p4567680} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6833">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Document3() {
  return (
    <div className="absolute contents left-[1784px] top-[258.5px]" data-name="Document">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1784px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[258.5px] whitespace-pre">$250</p>
      <IonIconDDocumentText3 />
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1847.5px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[259px] whitespace-pre">PDF</p>
    </div>
  );
}

function Component12() {
  return (
    <div className="absolute contents left-[1247.5px] top-[248px]" data-name="2">
      <Title9 />
      <Document3 />
    </div>
  );
}

function Title10() {
  return (
    <div className="absolute contents left-[1247.5px] not-italic text-nowrap top-[181.5px] whitespace-pre" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] left-[1247.5px] text-[#a0aec0] text-[12px] top-[205.5px]">#MS-415646</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[1247.5px] text-[14px] text-white top-[181.5px]">March, 01, 2020</p>
    </div>
  );
}

function IonIconDDocumentText4() {
  return (
    <div className="absolute left-[1829px] size-[15px] top-[194px]" data-name="IONIcon/D/document/text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6833)" id="IONIcon/D/document/text">
          <path d={svgPaths.pf54700} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p4567680} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6833">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Document4() {
  return (
    <div className="absolute contents left-[1786px] top-[192px]" data-name="Document">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1786px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[192px] whitespace-pre">$180</p>
      <IonIconDDocumentText4 />
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[1847.5px] not-italic text-[#a0aec0] text-[12px] text-nowrap top-[192.5px] whitespace-pre">PDF</p>
    </div>
  );
}

function Component13() {
  return (
    <div className="absolute contents left-[1247.5px] top-[181.5px]" data-name="1">
      <Title10 />
      <Document4 />
    </div>
  );
}

function Items1() {
  return (
    <div className="absolute contents left-[1247.5px] top-[181.5px]" data-name="Items">
      <Component4 />
      <Component10 />
      <Component11 />
      <Component12 />
      <Component13 />
    </div>
  );
}

function List2() {
  return (
    <div className="absolute contents left-[1247.5px] top-[181.5px]" data-name="List">
      <Items1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute contents left-[1246px] top-[129px]" data-name="Text">
      <p className="absolute font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[1.4] left-[1246px] not-italic text-[18px] text-nowrap text-white top-[129px] whitespace-pre">Invoices</p>
    </div>
  );
}

function ButtonBody() {
  return (
    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0" data-name="Button Body">
      <div className="flex flex-col font-['Plus_Jakarta_Display:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[47.5px]">
        <p className="leading-[1.5]">VIEW ALL</p>
      </div>
    </div>
  );
}

function HeightStructure() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0" data-name="Height Structure">
      <ButtonBody />
    </div>
  );
}

function MinWidth() {
  return (
    <div className="box-border content-stretch flex items-start overflow-clip px-[12px] py-0 relative shrink-0" data-name="🔛MinWidth">
      <div className="bg-[#c4c4c4] shrink-0 size-[0.005px]" data-name="Content" />
    </div>
  );
}

function WidthStructure() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="Width Structure">
      <HeightStructure />
      <MinWidth />
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="absolute bg-[#0075ff] box-border content-stretch flex inset-[10.56%_2.42%_86.46%_91.82%] items-center justify-center px-[8px] py-0 rounded-[12px]" data-name="_Button/Base">
      <WidthStructure />
    </div>
  );
}

function Invoices() {
  return (
    <div className="absolute contents left-[1222px] top-[101px]" data-name="Invoices">
      <Background6 />
      <List2 />
      <Text2 />
      <ButtonBase />
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute contents left-[298px] top-[367px]" data-name="Background">
      <div className="absolute backdrop-blur-[60px] backdrop-filter h-[172px] left-[298px] rounded-[20px] top-[367px] w-[900px]" />
    </div>
  );
}

function VisaIcon() {
  return (
    <div className="h-[8.522px] relative shrink-0 w-[24.5px]" data-name="Visa Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 9">
        <g id="Visa Icon">
          <path clipRule="evenodd" d={svgPaths.p375a2c80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MinWidth1() {
  return (
    <div className="box-border content-stretch flex items-center justify-center overflow-clip px-[74px] py-0 relative shrink-0" data-name="🔛MinWidth">
      <div className="shrink-0 size-[0.005px]" data-name="Content" />
    </div>
  );
}

function InputFieldText() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center overflow-clip pl-[15px] pr-0 py-0 relative shrink-0 w-[328px]" data-name="_Input/FieldText">
      <p className="font-['Plus_Jakarta_Display:Medium',sans-serif] h-[19.5px] leading-[1.4] not-italic relative shrink-0 text-[14px] text-white w-[143px]">7812 2139 0823 XXXX</p>
      <MinWidth1 />
    </div>
  );
}

function Edit6() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6938)" id="edit">
          <g id="Vector"></g>
          <path d={svgPaths.pe1f480} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6938">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Visa() {
  return (
    <div className="absolute backdrop-blur-[21px] backdrop-filter inset-[38.16%_38.85%_56.3%_39.69%] rounded-[20px]" data-name="Visa">
      <div className="box-border content-stretch flex items-center overflow-clip px-[20px] py-0 relative rounded-[inherit] size-full">
        <VisaIcon />
        <InputFieldText />
        <Edit6 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[22px]" />
    </div>
  );
}

function MastercardIcon() {
  return (
    <div className="h-[13.263px] relative shrink-0 w-[21px]" data-name="Mastercard Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 14">
        <g id="Mastercard Icon">
          <circle cx="6.63158" cy="6.63158" fill="var(--fill-0, #EB001B)" id="Ellipse 48" r="6.63158" />
          <circle cx="14.3685" cy="6.63158" fill="var(--fill-0, #F79E1B)" id="Ellipse 49" r="6.63158" />
        </g>
      </svg>
    </div>
  );
}

function MinWidth2() {
  return (
    <div className="box-border content-stretch flex items-center justify-center overflow-clip px-[74px] py-0 relative shrink-0" data-name="🔛MinWidth">
      <div className="shrink-0 size-[0.005px]" data-name="Content" />
    </div>
  );
}

function InputFieldText1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center overflow-clip pl-[15px] pr-0 py-0 relative shrink-0 w-[332px]" data-name="_Input/FieldText">
      <p className="font-['Plus_Jakarta_Display:Medium',sans-serif] h-[19.5px] leading-[1.4] not-italic relative shrink-0 text-[14px] text-white w-[143px]">7812 2139 0823 XXXX</p>
      <MinWidth2 />
    </div>
  );
}

function Edit7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6938)" id="edit">
          <g id="Vector"></g>
          <path d={svgPaths.pe1f480} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6938">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Mastercard() {
  return (
    <div className="absolute backdrop-blur-[21px] backdrop-filter inset-[38.16%_61.77%_56.3%_16.77%] rounded-[20px]" data-name="Mastercard">
      <div className="box-border content-stretch flex items-center overflow-clip px-[20px] py-0 relative rounded-[inherit] size-full">
        <MastercardIcon />
        <InputFieldText1 />
        <Edit7 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[22px]" />
    </div>
  );
}

function ButtonBody1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0" data-name="Button Body">
      <div className="flex flex-col font-['Plus_Jakarta_Display:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[89px]">
        <p className="leading-[1.5]">ADD A NEW CARD</p>
      </div>
    </div>
  );
}

function HeightStructure1() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0" data-name="Height Structure">
      <ButtonBody1 />
    </div>
  );
}

function MinWidth3() {
  return (
    <div className="box-border content-stretch flex items-start overflow-clip px-[12px] py-0 relative shrink-0" data-name="🔛MinWidth">
      <div className="bg-[#c4c4c4] shrink-0 size-[0.005px]" data-name="Content" />
    </div>
  );
}

function WidthStructure1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="Width Structure">
      <HeightStructure1 />
      <MinWidth3 />
    </div>
  );
}

function ButtonBase1() {
  return (
    <div className="absolute bg-[#0075ff] box-border content-stretch flex inset-[33.13%_38.85%_63.88%_54.17%] items-center justify-center px-[8px] py-0 rounded-[12px]" data-name="_Button/Base">
      <WidthStructure1 />
    </div>
  );
}

function Title11() {
  return (
    <div className="absolute contents left-[322px] top-[389px]" data-name="Title">
      <p className="absolute font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[1.4] left-[322px] not-italic text-[18px] text-nowrap text-white top-[389px] whitespace-pre">Payment Method</p>
    </div>
  );
}

function PaymentMethod() {
  return (
    <div className="absolute contents left-[298px] top-[367px]" data-name="Payment Method">
      <Background7 />
      <Visa />
      <Mastercard />
      <ButtonBase1 />
      <Title11 />
    </div>
  );
}

function AnalyticsCards() {
  return (
    <div className="absolute contents left-[298px] top-[101px]" data-name="Analytics Cards">
      <Invoices />
      <PaymentMethod />
    </div>
  );
}

function Background8() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Background">
      <div className="absolute bottom-[0.41%] left-0 right-[0.33%] rounded-[20px] top-0" />
      <div className="absolute blur-[15.5px] filter h-[615px] left-[-621px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[620.5px_251.5px] mask-size-[461px_240.004px] top-[-252px] w-[1098px]" data-name="richard-horvath-_nWaeTF6qo0-unsplash 1" style={{ maskImage: `url('${imgRichardHorvathNWaeTf6Qo0Unsplash1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRichardHorvathNWaeTf6Qo0Unsplash2} />
      </div>
      <div className="absolute inset-[-37.05%_-7.93%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[36.1px_88.418px] mask-size-[461px_240.004px] mix-blend-soft-light opacity-40" data-name="Texture" style={{ maskImage: `url('${imgRichardHorvathNWaeTf6Qo0Unsplash1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgTexture} />
      </div>
    </div>
  );
}

function Cvv() {
  return (
    <div className="absolute bottom-[37.19px] contents left-[123.5px] not-italic text-nowrap text-white whitespace-pre" data-name="CVV">
      <p className="absolute bottom-[72px] font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[123.5px] text-[10px] translate-y-[100%]">{`CVV `}</p>
      <p className="absolute bottom-[57.19px] font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[1.4] left-[123.5px] text-[14px] translate-y-[100%]">09X</p>
    </div>
  );
}

function ValidThru() {
  return (
    <div className="absolute bottom-[37.19px] contents left-[31px] not-italic text-nowrap text-white whitespace-pre" data-name="Valid Thru">
      <p className="absolute bottom-[72px] font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[31px] text-[10px] translate-y-[100%]">VALID THRU</p>
      <p className="absolute bottom-[57.19px] font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[1.4] left-[31px] text-[14px] translate-y-[100%]">05/24</p>
    </div>
  );
}

function Number() {
  return (
    <div className="absolute bottom-[84.5px] contents left-[31px]" data-name="Number">
      <p className="absolute bottom-[118.5px] font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[1.4] left-[31px] not-italic text-[24px] text-nowrap text-white translate-y-[100%] whitespace-pre">7812 2139 0823 XXXX</p>
    </div>
  );
}

function Circles() {
  return (
    <div className="absolute h-[32.81px] right-[25.78px] top-[22px] w-[49.215px]" data-name="Circles">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 33">
        <g id="Circles">
          <circle cx="16.4047" cy="16.4052" fill="var(--fill-0, white)" id="Ellipse 11" opacity="0.4" r="16.4047" />
          <circle cx="32.8106" cy="16.4047" fill="var(--fill-0, white)" id="Ellipse 12" opacity="0.4" r="16.4047" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute contents left-[31px] top-[26px]" data-name="Logo">
      <p className="absolute font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[1.4] left-[31px] not-italic text-[18px] text-nowrap text-white top-[26px] whitespace-pre">Vision UI</p>
    </div>
  );
}

function Details3() {
  return (
    <div className="absolute contents left-[31px] top-[22px]" data-name="Details">
      <Cvv />
      <ValidThru />
      <Number />
      <Circles />
      <Logo />
    </div>
  );
}

function CreditCard() {
  return (
    <div className="absolute h-[240px] left-[298px] top-[101px] w-[461.5px]" data-name="Credit Card">
      <Background8 />
      <Details3 />
    </div>
  );
}

function NameDate() {
  return (
    <div className="absolute contents left-[859px] not-italic text-[14px] text-nowrap top-[271px] whitespace-pre" data-name="Name & Date">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[859px] text-white top-[271px]">{`Bill & Taxes`}</p>
      <p className="absolute font-['Plus_Jakarta_Display:Bold',sans-serif] leading-[24px] right-[746px] text-right text-white top-[280px]">-$154.50</p>
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.5] left-[859px] text-[#a0aec0] top-[293px]">Today, 16:36</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[806px] size-[42px] top-[271px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
        <g id="Icon">
          <circle cx="21" cy="21" fill="var(--fill-0, white)" id="Icon background" opacity="0.08" r="21" />
          <g clipPath="url(#clip0_17_6898)" id="domain">
            <g id="Vector"></g>
            <path d={svgPaths.p17d79070} fill="var(--fill-0, #01B574)" id="Vector_2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_17_6898">
            <rect fill="white" height="24" transform="translate(9 9)" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="absolute contents left-[806px] top-[271px]" data-name="Content1">
      <NameDate />
      <Icon6 />
    </div>
  );
}

function Subtitle() {
  return (
    <div className="absolute contents left-[806px] top-[248px]" data-name="Subtitle">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] h-[15px] leading-[1.5] left-[806px] not-italic text-[#a0aec0] text-[10px] top-[248px] w-[43px]">NEWEST</p>
    </div>
  );
}

function Balance1() {
  return (
    <div className="absolute contents left-[806px] right-[746px] top-[126px]" data-name="Balance">
      <Balance className="absolute h-[103px] left-[806px] overflow-clip right-[746px] rounded-[14px] top-[126px]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[782px] top-[101px]">
      <div className="absolute backdrop-blur-[60px] backdrop-filter h-[240px] left-[782px] rounded-[20px] top-[101px] w-[416px]" />
      <Content />
      <Subtitle />
      <Balance1 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p160fd80} fill="var(--fill-0, #2D3748)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Addon() {
  return (
    <div className="box-border content-stretch flex gap-[5px] h-[20px] items-center overflow-clip px-[6px] py-[4px] relative shrink-0" data-name="Addon">
      <Icon7 />
    </div>
  );
}

function AutoAddedFrame() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[37.5px]" data-name="Auto-added frame">
      <Addon />
    </div>
  );
}

function MinWidth4() {
  return (
    <div className="box-border content-stretch flex items-center justify-center overflow-clip px-[74px] py-0 relative shrink-0" data-name="🔛MinWidth">
      <div className="shrink-0 size-[0.006px]" data-name="Content" />
    </div>
  );
}

function InputFieldText2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="_Input/FieldText">
      <p className="font-['Plus_Jakarta_Display:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#a0aec0] text-[12px] text-nowrap whitespace-pre">Type here...</p>
      <MinWidth4 />
    </div>
  );
}

function InputWithAddons() {
  return (
    <div className="absolute bg-[#0f1535] inset-[1.7%_9.53%_94.93%_80.1%] rounded-[15px]" data-name="_Input/WithAddons">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <AutoAddedFrame />
        <InputFieldText2 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(226,232,240,0.3)] border-solid inset-0 pointer-events-none rounded-[15px]" />
    </div>
  );
}

function IonIconPPersonDefault() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="IONIcon/P/person/default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="IONIcon/P/person/default">
          <path d={svgPaths.p1f1addf0} fill="var(--fill-0, #718096)" id="Vector" />
          <path d={svgPaths.p30f98072} fill="var(--fill-0, #718096)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function ListItemDefault() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[1755px] overflow-clip top-[31.5px] w-[58px]" data-name="List/Item/Default">
      <IonIconPPersonDefault />
      <div className="flex flex-col font-['Plus_Jakarta_Display:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#718096] text-[12px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Sign In</p>
      </div>
    </div>
  );
}

function IonIconSSettingsSharp() {
  return (
    <div className="absolute left-[1832px] size-[12px] top-[34px]" data-name="IONIcon/S/settings/sharp">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6948)" id="IONIcon/S/settings/sharp">
          <path d={svgPaths.p21f08400} fill="var(--fill-0, #718096)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_17_6948">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IonIconNNotificationsDefault() {
  return (
    <div className="absolute left-[1861px] size-[12px] top-[34px]" data-name="IONIcon/N/notifications/default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6858)" id="IONIcon/N/notifications/default">
          <path d={svgPaths.p10717d00} fill="var(--fill-0, #718096)" id="Vector" />
          <path d={svgPaths.p27983200} fill="var(--fill-0, #718096)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6858">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Menu1() {
  return (
    <div className="absolute contents left-[1538px] top-[20px]" data-name="Menu">
      <InputWithAddons />
      <ListItemDefault />
      <IonIconSSettingsSharp />
      <IonIconNNotificationsDefault />
    </div>
  );
}

function BreadcrumbItemPrevious() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] items-start left-[315.5px] top-[34.5px] w-[113px]" data-name="Breadcrumb/Item/Previous">
      <p className="font-['Helvetica:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[0px] text-[24px] text-nowrap text-white whitespace-pre">
        <span className="font-['Plus_Jakarta_Display:Regular',sans-serif] text-[#a0aec0]">{`Pages `}</span>
        <span className="font-['Plus_Jakarta_Display:Regular',sans-serif]"> </span>
        <span className="font-['Plus_Jakarta_Display:Medium',sans-serif]">{`/  Billing`}</span>
      </p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute contents left-[315px] top-[34.5px]" data-name="Text">
      <p className="absolute font-['Plus_Jakarta_Display:Medium',sans-serif] leading-[1.4] left-[315px] not-italic text-[14px] text-nowrap text-white top-[52.5px] whitespace-pre">Billing</p>
      <BreadcrumbItemPrevious />
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="absolute contents left-[315px] top-[20px]" data-name="Breadcrumb">
      <Menu1 />
      <Text3 />
    </div>
  );
}

function MainDashboard() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Main Dashboard">
      <Background />
      <FooterMenu />
      <ContentCards />
      <AnalyticsCards />
      <CreditCard />
      <Group1 />
      <Breadcrumb />
    </div>
  );
}

function NewDesign() {
  return (
    <div className="absolute contents left-0 top-0" data-name="New Design">
      <MainDashboard />
    </div>
  );
}

function Background9() {
  return (
    <div className="absolute contents left-[34px] top-[952px]" data-name="Background">
      <div className="absolute bg-[#0075ff] h-[169.5px] left-[34px] rounded-[15px] top-[952px] w-[218px]" />
      <div className="absolute h-[264px] left-[-159px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[193px_86.5px] mask-size-[218px_169.5px] top-[865.5px] w-[471px]" data-name="richard-horvath-_nWaeTF6qo0-unsplash 1" style={{ maskImage: `url('${imgRichardHorvathNWaeTf6Qo0Unsplash3}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRichardHorvathNWaeTf6Qo0Unsplash2} />
      </div>
    </div>
  );
}

function ButtonBody2() {
  return (
    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0" data-name="Button Body">
      <div className="flex flex-col font-['Plus_Jakarta_Display:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-nowrap text-white">
        <p className="leading-none whitespace-pre">DOCUMENTATION</p>
      </div>
    </div>
  );
}

function HeightStructure2() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0" data-name="Height Structure">
      <ButtonBody2 />
    </div>
  );
}

function MinWidth5() {
  return (
    <div className="box-border content-stretch flex items-start overflow-clip px-[12px] py-0 relative shrink-0" data-name="🔛MinWidth">
      <div className="bg-[#c4c4c4] shrink-0 size-[0.006px]" data-name="Content" />
    </div>
  );
}

function WidthStructure2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="Width Structure">
      <HeightStructure2 />
      <MinWidth5 />
    </div>
  );
}

function ButtonBase2() {
  return (
    <div className="absolute backdrop-blur-[5px] backdrop-filter box-border content-stretch flex inset-[91.18%_87.71%_5.83%_2.6%] items-center justify-center px-[8px] py-0 rounded-[12px]" data-name="_Button/Base">
      <WidthStructure2 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute contents leading-[0] left-[50px] not-italic text-nowrap text-white top-[1023.5px]" data-name="Text">
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Regular',sans-serif] justify-center left-[50.5px] text-[12px] top-[1053px] translate-y-[-50%]">
        <p className="leading-none text-nowrap whitespace-pre">Please check our docs</p>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Bold',sans-serif] justify-center left-[50px] text-[14px] top-[1033.5px] translate-y-[-50%]">
        <p className="leading-[1.4] text-nowrap whitespace-pre">Need help?</p>
      </div>
    </div>
  );
}

function IonIconHHelpCircle() {
  return (
    <div className="absolute left-[56px] size-[24px] top-[973.5px]" data-name="IONIcon/H/help/circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="IONIcon/H/help/circle">
          <path d={svgPaths.p25cab100} fill="var(--fill-0, #0075FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute contents left-[50.5px] top-[968px]" data-name="Icon">
      <div className="absolute bg-white left-[50.5px] rounded-[12px] size-[35px] top-[968px]" />
      <IonIconHHelpCircle />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[34px] top-[952px]">
      <Background9 />
      <ButtonBase2 />
      <Text4 />
      <Icon8 />
    </div>
  );
}

function NeedHelp() {
  return (
    <div className="absolute contents left-[34px] top-[952px]" data-name="Need Help">
      <Group />
    </div>
  );
}

function IonIconRRocketSharp() {
  return (
    <div className="absolute left-[56.5px] size-[15px] top-[499.5px]" data-name="IONIcon/R/rocket/sharp">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6851)" id="IONIcon/R/rocket/sharp">
          <path d={svgPaths.p14985ef2} fill="var(--fill-0, #0075FF)" id="Vector" />
          <path d={svgPaths.p277c3300} fill="var(--fill-0, #0075FF)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6851">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SignUp() {
  return (
    <div className="absolute contents left-[49px] top-[492px]" data-name="Sign Up">
      <div className="absolute bg-[#1a1f37] left-[49px] rounded-[12px] shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] size-[30px] top-[492px]" />
      <IonIconRRocketSharp />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Medium',sans-serif] justify-center leading-[0] left-[94.5px] not-italic text-[14px] text-nowrap text-white top-[507px] translate-y-[-50%]">
        <p className="leading-none whitespace-pre">Sign Up</p>
      </div>
    </div>
  );
}

function IonIconDDocumentDefault() {
  return (
    <div className="absolute left-[56.5px] size-[15px] top-[445.5px]" data-name="IONIcon/D/document/default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="IONIcon/D/document/default">
          <path d={svgPaths.p3ab7af80} fill="var(--fill-0, #0075FF)" id="Vector" />
          <path d={svgPaths.p2d056f00} fill="var(--fill-0, #0075FF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function SignIn() {
  return (
    <div className="absolute contents left-[49px] top-[438px]" data-name="Sign In">
      <div className="absolute bg-[#1a1f37] left-[49px] rounded-[12px] shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] size-[30px] top-[438px]" />
      <IonIconDDocumentDefault />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Medium',sans-serif] justify-center leading-[0] left-[94.5px] not-italic text-[14px] text-nowrap text-white top-[453px] translate-y-[-50%]">
        <p className="leading-none whitespace-pre">Sign In</p>
      </div>
    </div>
  );
}

function IonIconPPersonDefault1() {
  return (
    <div className="absolute left-[56.5px] size-[15px] top-[391.5px]" data-name="IONIcon/P/person/default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="IONIcon/P/person/default">
          <path d={svgPaths.p39d39800} fill="var(--fill-0, #0075FF)" id="Vector" />
          <path d={svgPaths.p3f13b470} fill="var(--fill-0, #0075FF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Profile() {
  return (
    <div className="absolute contents left-[49px] top-[384px]" data-name="Profile">
      <div className="absolute bg-[#1a1f37] left-[49px] rounded-[12px] shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] size-[30px] top-[384px]" />
      <IonIconPPersonDefault1 />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Medium',sans-serif] justify-center leading-[0] left-[94.5px] not-italic text-[14px] text-nowrap text-white top-[399px] translate-y-[-50%]">
        <p className="leading-none whitespace-pre">Profile</p>
      </div>
    </div>
  );
}

function IonIconBBuildDefault() {
  return (
    <div className="absolute left-[56.5px] size-[15px] top-[295.5px]" data-name="IONIcon/B/build/default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6837)" id="IONIcon/B/build/default">
          <path d={svgPaths.pc4dd600} fill="var(--fill-0, #0075FF)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_17_6837">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Rtl() {
  return (
    <div className="absolute contents left-[49px] top-[288px]" data-name="RTL">
      <div className="absolute bg-[#1a1f37] left-[49px] rounded-[12px] shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] size-[30px] top-[288px]" />
      <IonIconBBuildDefault />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Medium',sans-serif] justify-center leading-[0] left-[94.5px] not-italic text-[14px] text-nowrap text-white top-[303px] translate-y-[-50%]">
        <p className="leading-none whitespace-pre">RTL</p>
      </div>
    </div>
  );
}

function IonIconCCardDefault() {
  return (
    <div className="absolute left-[56.5px] size-[15px] top-[241.5px]" data-name="IONIcon/C/card/default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="IONIcon/C/card/default">
          <path d={svgPaths.p1e8a4900} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p39a904d0} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Billing() {
  return (
    <div className="absolute contents left-[33px] top-[222px]" data-name="Billing">
      <div className="absolute bg-[#1a1f37] h-[54px] left-[33px] rounded-[15px] shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] top-[222px] w-[219.5px]" />
      <div className="absolute bg-[#0075ff] left-[49px] rounded-[12px] size-[30px] top-[234px]" />
      <IonIconCCardDefault />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Medium',sans-serif] justify-center leading-[0] left-[94.5px] not-italic text-[14px] text-nowrap text-white top-[249px] translate-y-[-50%]">
        <p className="leading-none whitespace-pre">Billing</p>
      </div>
    </div>
  );
}

function IonIconSStatsChart() {
  return (
    <div className="absolute left-[56.5px] size-[15px] top-[187.5px]" data-name="IONIcon/S/stats/chart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="IONIcon/S/stats/chart">
          <path d={svgPaths.p398bbc0} fill="var(--fill-0, #0075FF)" id="Vector" />
          <path d={svgPaths.p15d6ba80} fill="var(--fill-0, #0075FF)" id="Vector_2" />
          <path d={svgPaths.paa9640} fill="var(--fill-0, #0075FF)" id="Vector_3" />
          <path d={svgPaths.p75e1180} fill="var(--fill-0, #0075FF)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Tables() {
  return (
    <div className="absolute contents left-[49px] top-[180px]" data-name="Tables">
      <div className="absolute bg-[#1a1f37] left-[49px] rounded-[12px] shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] size-[30px] top-[180px]" />
      <IonIconSStatsChart />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Medium',sans-serif] justify-center leading-[0] left-[94.5px] not-italic text-[14px] text-nowrap text-white top-[195px] translate-y-[-50%]">
        <p className="leading-none whitespace-pre">Tables</p>
      </div>
    </div>
  );
}

function IonIconHHomeDefault() {
  return (
    <div className="absolute left-[56.5px] size-[15px] top-[133.5px]" data-name="IONIcon/H/home/default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_17_6844)" id="IONIcon/H/home/default">
          <path d={svgPaths.p1750ef00} fill="var(--fill-0, #0075FF)" id="Vector" />
          <path d={svgPaths.p3c13600} fill="var(--fill-0, #0075FF)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_6844">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="absolute contents left-[49px] top-[126px]" data-name="Dashboard">
      <div className="absolute bg-[#1a1f37] left-[49px] rounded-[12px] shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] size-[30px] top-[126px]" />
      <IonIconHHomeDefault />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Medium',sans-serif] justify-center leading-[0] left-[94px] not-italic text-[14px] text-nowrap text-white top-[141px] translate-y-[-50%]">
        <p className="leading-none whitespace-pre">Dashboard</p>
      </div>
    </div>
  );
}

function Menu2() {
  return (
    <div className="absolute contents left-[33px] top-[126px]" data-name="Menu">
      <SignUp />
      <SignIn />
      <Profile />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Display:Medium',sans-serif] h-[18px] justify-center leading-[0] left-[49px] not-italic text-[12px] text-white top-[351px] translate-y-[-50%] w-[105px]">
        <p className="leading-[1.5]">ACCOUNT PAGES</p>
      </div>
      <Rtl />
      <Billing />
      <Tables />
      <Dashboard />
    </div>
  );
}

function Logo1() {
  return (
    <div className="absolute contents left-[75px] top-[46px]" data-name="Logo">
      <p className="absolute bg-clip-text font-['Plus_Jakarta_Display:Medium',sans-serif] leading-none left-[142.5px] not-italic text-[14px] text-center text-nowrap top-[46px] tracking-[2.52px] translate-x-[-50%] whitespace-pre" style={{ WebkitTextFillColor: "transparent" }}>
        VISION UI FREE
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute contents left-[11px] top-[10px]" data-name="Sidebar">
      <div className="absolute backdrop-blur-[60px] backdrop-filter h-[1135px] left-[11px] rounded-[20px] top-[10px] w-[264px]" />
      <NeedHelp />
      <Menu2 />
      <Logo1 />
      <div className="absolute h-0 left-[26px] top-[91.5px] w-[233.25px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 1">
            <path d="M0 0.5H233.25" id="Vector 6" stroke="url(#paint0_linear_17_6823)" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_17_6823" x1="0" x2="231" y1="0.5" y2="0.5">
                <stop stopColor="#E0E1E2" stopOpacity="0" />
                <stop offset="0.5" stopColor="#E0E1E2" />
                <stop offset="1" stopColor="#E0E1E2" stopOpacity="0.15625" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function BillingScreen() {
  return (
    <div className="bg-[#060b26] relative size-full" data-name="Billing Screen">
      <Sidebar />
      <NewDesign />
    </div>
  );
}