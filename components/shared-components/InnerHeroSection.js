import { Button } from "../ui-components";
import { checkIsMobile } from "../../utils/helpers";

export default function InnerHeroSection({ preHeading, heading, textInfo, buttonText, buttonLink }) {
    const isMobile = checkIsMobile();
   return (
    <div className="text-center w-full max-w-lg m-auto">
        {
            preHeading?
            <h5 className="text-base font-bold text-text mb-0">{preHeading}</h5>
            :null
        }
        {
            heading?
            <h1 className={`text-3xl md:text-5xl font-bold text-text mb-4`} style={isMobile ? {fontSize: "26px", whiteSpace: "pre-line"} : {lineHeight:'60px'}}>{heading}</h1>
            :null
        }
        {
            textInfo?
            <p className="text-base text-text mb-6">
                {textInfo}
            </p>
            :null
        }
        {
            buttonText?
                <Button href={buttonLink} type='button' size="sm" color='primary' variant='solid' rounded={true}>
                    {buttonText}
                </Button>
            :null
        }       
    </div>
  );
}