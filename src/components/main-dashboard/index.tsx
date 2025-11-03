import Image from "next/image";
import Verify from "@/src/assets/verify.svg";

export default function MainDashboard ()  {

    return(
        <div className="bg-transparent  ">
            <Image src={Verify} alt="simbolo de verificado" width={80}/>
        </div>
    )
}