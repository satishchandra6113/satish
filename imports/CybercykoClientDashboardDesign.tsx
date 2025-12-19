import svgPaths from "./svg-b3fjcfnyxs";
import { imgVector } from "./svg-pq4cu";

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44.094px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[44.094px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Users</p>
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#0f0f0f] h-[46px] left-0 rounded-[10px] top-0 w-[320px]" data-name="Text Input">
      <div className="box-border content-stretch flex h-[46px] items-center overflow-clip pl-[44px] pr-[16px] py-[10px] relative rounded-[inherit] w-[320px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#d5ffd6] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Search users...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1a1a1a] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M15.75 15.75L12.495 12.495" id="Vector" stroke="var(--stroke-0, #D5FFD6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p126da180} id="Vector_2" stroke="var(--stroke-0, #D5FFD6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="absolute h-[46px] left-0 top-[0.5px] w-[320px]" data-name="SearchBar">
      <TextInput />
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[122.73px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #D5FFD6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="absolute bg-[#0f0f0f] h-[46px] left-[332px] rounded-[10px] top-[0.5px] w-[155.734px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border border-[#1a1a1a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[66px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[10.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">More Actions</p>
      <Icon1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#181818] h-[47px] left-[499.73px] rounded-[12px] top-0 w-[106.891px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#6dff40] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[53.5px] not-italic text-[#6dff40] text-[14px] text-center text-nowrap top-[13px] tracking-[-0.0504px] translate-x-[-50%] whitespace-pre">New User</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[47px] relative shrink-0 w-[606.625px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[47px] relative w-[606.625px]">
        <SearchBar />
        <Dropdown />
        <Button />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[47px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[56.5px] left-0 top-0 w-[378.5px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[24px] not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[15.5px] tracking-[0.4875px] uppercase whitespace-pre">{`User (Name & Email)`}</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[56.5px] left-[378.5px] top-0 w-[301.156px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[24px] not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[15.5px] tracking-[0.4875px] uppercase whitespace-pre">Roles / Groups</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute h-[56.5px] left-[679.66px] top-0 w-[165.047px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[24px] not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[15.5px] tracking-[0.4875px] uppercase whitespace-pre">Status</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute h-[56.5px] left-[844.7px] top-0 w-[232.297px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[24px] not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[15.5px] tracking-[0.4875px] uppercase whitespace-pre">Last Login</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[56.5px] left-0 top-0 w-[1077px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#1a1a1a] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[56.5px] left-0 top-0 w-[1077px]" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#1a1a1a] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#d5ffd6] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">AC</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Alexa CSM</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">alexa@oneLogin.com</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[48px] relative shrink-0 w-[153.867px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[48px] items-start relative w-[153.867px]">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center left-[24px] top-[16.5px] w-[330.5px]" data-name="Container">
      <Container2 />
      <Container5 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[81px] left-0 top-0 w-[378.5px]" data-name="Table Cell">
      <Container6 />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[rgba(15,95,60,0.3)] box-border content-stretch flex h-[34px] items-center left-[24px] px-[13px] py-[5px] rounded-[1.67772e+07px] top-[23.5px] w-[162.063px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[rgba(15,95,60,0.5)] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#00ff66] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Customer Success</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[81px] left-[378.5px] top-0 w-[301.156px]" data-name="Table Cell">
      <Badge />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[24px] top-[31px] w-[55.398px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#00ff66] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Verified</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[81px] left-[679.66px] top-0 w-[165.047px]" data-name="Table Cell">
      <Text />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[81px] left-[844.7px] top-0 w-[232.297px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[28px] tracking-[-0.3125px] whitespace-pre">30d ago</p>
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute h-[81px] left-0 top-0 w-[1077px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#1a1a1a] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#1a1a1a] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#d5ffd6] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">AS</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Alexa Sling</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">alexa@slinginc.com</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[48px] relative shrink-0 w-[142.453px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[48px] items-start relative w-[142.453px]">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center left-[24px] top-[16.5px] w-[330.5px]" data-name="Container">
      <Container7 />
      <Container10 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[81px] left-0 top-0 w-[378.5px]" data-name="Table Cell">
      <Container11 />
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bg-[rgba(15,95,60,0.3)] box-border content-stretch flex h-[34px] items-center left-0 px-[13px] py-[5px] rounded-[1.67772e+07px] top-0 w-[65.023px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[rgba(15,95,60,0.5)] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#00ff66] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Sales</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-[rgba(15,95,60,0.3)] box-border content-stretch flex h-[34px] items-center left-[73.02px] px-[13px] py-[5px] rounded-[1.67772e+07px] top-0 w-[71.789px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[rgba(15,95,60,0.5)] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#00ff66] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Admin</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[34px] left-[24px] top-[23.5px] w-[253.156px]" data-name="Container">
      <Badge1 />
      <Badge2 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[81px] left-[378.5px] top-0 w-[301.156px]" data-name="Table Cell">
      <Container12 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[24px] top-[31px] w-[55.398px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#00ff66] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Verified</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[81px] left-[679.66px] top-0 w-[165.047px]" data-name="Table Cell">
      <Text1 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[81px] left-[844.7px] top-0 w-[232.297px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[28px] tracking-[-0.3125px] whitespace-pre">Never logged in</p>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute h-[81px] left-0 top-[81px] w-[1077px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#1a1a1a] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#1a1a1a] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#d5ffd6] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Alicia Keys</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">alicia@engineers.com</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[48px] relative shrink-0 w-[157.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[48px] items-start relative w-[157.875px]">
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center left-[24px] top-[16.5px] w-[330.5px]" data-name="Container">
      <Container13 />
      <Container16 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[81px] left-0 top-0 w-[378.5px]" data-name="Table Cell">
      <Container17 />
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute bg-[rgba(15,95,60,0.3)] box-border content-stretch flex h-[34px] items-center left-[24px] px-[13px] py-[5px] rounded-[1.67772e+07px] top-[23.5px] w-[97.688px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[rgba(15,95,60,0.5)] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#00ff66] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Engineers</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[81px] left-[378.5px] top-0 w-[301.156px]" data-name="Table Cell">
      <Badge3 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[24px] top-[31px] w-[55.398px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#00ff66] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Verified</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[81px] left-[679.66px] top-0 w-[165.047px]" data-name="Table Cell">
      <Text2 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[81px] left-[844.7px] top-0 w-[232.297px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[28px] tracking-[-0.3125px] whitespace-pre">400d ago</p>
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute h-[81px] left-0 top-[162px] w-[1077px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#1a1a1a] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#1a1a1a] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#d5ffd6] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">DP</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">David Paul</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">david@cybercyko.com</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[48px] relative shrink-0 w-[164.016px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[48px] items-start relative w-[164.016px]">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center left-[24px] top-[16.5px] w-[330.5px]" data-name="Container">
      <Container18 />
      <Container21 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[81px] left-0 top-0 w-[378.5px]" data-name="Table Cell">
      <Container22 />
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute bg-[rgba(15,95,60,0.3)] box-border content-stretch flex h-[34px] items-center left-[24px] px-[13px] py-[5px] rounded-[1.67772e+07px] top-[23.5px] w-[71.789px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[rgba(15,95,60,0.5)] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#00ff66] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Admin</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[81px] left-[378.5px] top-0 w-[301.156px]" data-name="Table Cell">
      <Badge4 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[24px] top-[31px] w-[55.398px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#00ff66] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Verified</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[81px] left-[679.66px] top-0 w-[165.047px]" data-name="Table Cell">
      <Text3 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[81px] left-[844.7px] top-0 w-[232.297px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[24px] not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[28px] tracking-[-0.3125px] whitespace-pre">20m ago</p>
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute h-[81px] left-0 top-[243px] w-[1077px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#1a1a1a] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[324px] left-0 top-[56.5px] w-[1077px]" data-name="Table Body">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[381px] relative shrink-0 w-full" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function UserTable() {
  return (
    <div className="bg-[#0f0f0f] h-[383px] relative rounded-[10px] shrink-0 w-full" data-name="UserTable">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[383px] items-start p-px relative w-full">
          <Table />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1a1a1a] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d5ffd6] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Showing demo data. Replace with your backend or Firestore integration.</p>
    </div>
  );
}

function UsersPage() {
  return (
    <div className="absolute bg-[#050505] box-border content-stretch flex flex-col gap-[32px] h-[887px] items-start left-0 pb-0 pt-[105px] px-[32px] top-0 w-[1143px]" data-name="UsersPage">
      <Container1 />
      <UserTable />
      <Container23 />
    </div>
  );
}

function CybercykoLogo1() {
  return (
    <div className="absolute contents inset-0" data-name="Cybercyko logo 1">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[100px_100px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector"></g>
        </svg>
      </div>
      <div className="absolute inset-[28.97%_51.91%_32.95%_18.66%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-18.66px_-28.969px] mask-size-[100px_100px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 39">
          <path d={svgPaths.p258a4bc0} fill="var(--fill-0, #85FF72)" id="Vector_2" />
        </svg>
      </div>
      <div className="absolute inset-[42.39%_20.81%_46.49%_70.8%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-70.798px_-42.39px] mask-size-[100px_100px]" data-name="Vector_3" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 12">
          <path d={svgPaths.pe3bec00} fill="var(--fill-0, #85FF72)" id="Vector_3" />
        </svg>
      </div>
      <div className="absolute inset-[42.39%_30.7%_46.49%_62.02%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-62.025px_-42.39px] mask-size-[100px_100px]" data-name="Vector_4" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12">
          <path d={svgPaths.p30791280} fill="var(--fill-0, #85FF72)" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[42.39%_39.84%_46.49%_52.21%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-52.214px_-42.39px] mask-size-[100px_100px]" data-name="Vector_5" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12">
          <path d={svgPaths.p2933bb80} fill="var(--fill-0, #85FF72)" id="Vector_5" />
        </svg>
      </div>
      <div className="absolute inset-[42.39%_48.93%_46.49%_41.66%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-41.655px_-42.39px] mask-size-[100px_100px]" data-name="Vector_6" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
          <path d={svgPaths.p359d9400} fill="var(--fill-0, #85FF72)" id="Vector_6" />
        </svg>
      </div>
      <div className="absolute inset-[54.59%_33.43%_36.16%_59.42%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-59.418px_-54.589px] mask-size-[100px_100px]" data-name="Vector_7" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 10">
          <path d={svgPaths.p194ec300} fill="var(--fill-0, #FF5858)" id="Vector_7" />
        </svg>
      </div>
      <div className="absolute inset-[55.01%_30.36%_38.99%_64.57%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-64.566px_-55.007px] mask-size-[100px_100px]" data-name="Vector_8" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d={svgPaths.p179bc7c0} fill="var(--fill-0, #7DFF56)" id="Vector_8" />
        </svg>
      </div>
      <div className="absolute inset-[54.84%_25.6%_38.41%_69.05%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-69.049px_-54.841px] mask-size-[100px_100px]" data-name="Vector_9" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 7">
          <path d={svgPaths.p2003db80} fill="var(--fill-0, #36C9FF)" id="Vector_9" />
        </svg>
      </div>
      <div className="absolute inset-[54.42%_19.72%_36.34%_72.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-72.817px_-54.415px] mask-size-[100px_100px]" data-name="Vector_10" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 10">
          <path d={svgPaths.p25ab1340} fill="var(--fill-0, #E6FF47)" id="Vector_10" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <CybercykoLogo1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[100px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function CybercykoLogo() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-30px] size-[100px] top-[-14px]" data-name="CybercykoLogo">
      <Icon2 />
    </div>
  );
}

function Container24() {
  return <div className="absolute bg-[#00ff66] h-[2px] left-0 top-[70px] w-[51.078px]" data-name="Container" />;
}

function Button1() {
  return (
    <div className="absolute h-[72px] left-0 top-0 w-[51.078px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[26px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[23.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Users</p>
      <Container24 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[72px] left-[75.08px] top-0 w-[99.859px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[50px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[23.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Applications</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[72px] left-[198.94px] top-0 w-[66.719px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[33.5px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[23.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Devices</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[72px] left-[289.66px] top-0 w-[116.266px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[58.5px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[23.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Authentication</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[72px] left-[429.92px] top-0 w-[63.711px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[32px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[23.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Activity</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[72px] left-[517.63px] top-0 w-[69.469px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[35px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[23.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Security</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[72px] left-[611.1px] top-0 w-[69.664px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[35px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[23.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Settings</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[72px] left-[704.77px] top-0 w-[91.547px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[46px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[23.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Developers</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[72px] left-[88px] top-0 w-[796.313px]" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[72px] relative shrink-0 w-[884.313px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[72px] relative w-[884.313px]">
        <CybercykoLogo />
        <Container25 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[87.5%_42.78%_8.33%_42.78%]" data-name="Vector">
        <div className="absolute inset-[-100.03%_-28.87%_-100.01%_-28.87%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 3">
            <path d={svgPaths.p1f8ebe00} id="Vector" stroke="var(--stroke-0, #D5FFD6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_29.17%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.67%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 15">
            <path d={svgPaths.p259fd370} id="Vector" stroke="var(--stroke-0, #D5FFD6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[36px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[10.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[10.781px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[5px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">A</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#4a5568] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[24px] not-italic text-[#d5ffd6] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Admin</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center relative w-full">
        <Container27 />
        <Text5 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[36px] relative shrink-0 w-[139.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[36px] items-center relative w-[139.07px]">
        <Button9 />
        <Button10 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[72px] items-center justify-between px-[32px] py-0 relative w-full">
          <Container26 />
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="absolute bg-[#0d0d0d] box-border content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-0 px-0 top-0 w-[1143px]" data-name="TopNav">
      <div aria-hidden="true" className="absolute border-[#1a1a1a] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container29 />
    </div>
  );
}

export default function CybercykoClientDashboardDesign() {
  return (
    <div className="bg-[#050505] relative size-full" data-name="Cybercyko Client Dashboard Design">
      <UsersPage />
      <TopNav />
    </div>
  );
}