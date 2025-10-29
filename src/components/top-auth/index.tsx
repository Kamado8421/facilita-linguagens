import Image from "next/image";
import Logo from "@/src/assets/logo.svg";

export default function TopAuth ()  {

    return(
        <div className="bg-transparent w-full p-4 ">
            <Image src={Logo} alt="Logo" width={170}/>
        </div>
    )
}