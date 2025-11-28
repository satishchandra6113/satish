export default function ButtonSecondary() {
  return (
    <div className="bg-[#181818] relative rounded-[12px] size-full" data-name="Button / Secondary">
      <div aria-hidden="true" className="absolute border border-[#6dff40] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6dff40] text-[14px] text-center text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[20px] whitespace-pre">Label</p>
          </div>
        </div>
      </div>
    </div>
  );
}