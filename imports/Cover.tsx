import imgVisionUiFreeReact from "figma:asset/addee01c8ff56e6b96ac0d67738f4c1817b592b0.png";

export default function Cover() {
  return (
    <div className="overflow-clip relative rounded-[40px] size-full" data-name="Cover">
      <div className="absolute h-[1200px] left-0 top-0 w-[1600px]" data-name="vision-ui-free-react">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgVisionUiFreeReact} />
      </div>
    </div>
  );
}