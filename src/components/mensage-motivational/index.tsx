import { Lightbulb } from "lucide-react";
export default function MensageMotivational(){
   return (
    <div className="bg-blue-200 rounded-2xl text-blue-500 mx-3">
        <div className="flex p-3 relative right-8">
            <Lightbulb style={{width: "10em"}}/>
            <h1 className="font-bold text-blue-500 w-full relative right-8">
                Motivação do dia
            </h1>
        </div>
        <div className="text-gray-500 w-full block px-4 mt-3 leading-4.5 relative bottom-4 text-sm font-semibold ">
            Talvez seu primeiro passo não te leve onde você já quer chegar, mas com certeza, ele já te dirá o lugar!
        </div>
    </div>
   )
}