import imgVisionReactPro1 from "figma:asset/3ae42de1bdcb17ec3906184f111c4f549a90498b.png";
import imgVisionReactPro2 from "figma:asset/d531b83ad126d6ed928f95763451d2469aebf826.png";
import imgVisionReactPro3 from "figma:asset/b8261b15e7d32bfa70e3f0090347cd65707aade2.png";
import imgVisionReactPro4 from "figma:asset/85d8854107ef73baf69ee41de8f68047644ebfd6.png";
import imgVisionReactProMain from "figma:asset/7d96433ad0ac1db03284356dbd7a784babf22880.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[1200px] left-[1750px] rounded-[40px] top-0 w-[1600px]" data-name="visionReactPRO1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgVisionReactPro1} />
      </div>
      <div className="absolute h-[1200px] left-[3500px] rounded-[40px] top-0 w-[1600px]" data-name="visionReactPRO2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgVisionReactPro2} />
      </div>
      <div className="absolute h-[1200px] left-[5250px] rounded-[40px] top-0 w-[1600px]" data-name="visionReactPRO3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgVisionReactPro3} />
      </div>
      <div className="absolute h-[1200px] left-[7000px] rounded-[40px] top-0 w-[1600px]" data-name="visionReactPRO4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgVisionReactPro4} />
      </div>
      <div className="absolute h-[1200px] left-0 rounded-[40px] top-0 w-[1600px]" data-name="visionReactPROMain">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgVisionReactProMain} />
      </div>
    </div>
  );
}