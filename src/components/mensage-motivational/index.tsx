import { Lightbulb } from "lucide-react";

export default function MensageMotivational(){
   return (
    <div className="bg-blue-200 rounded-2xl text-blue-600">
        <div className="flex p-2">
            <Lightbulb size={20} className="flex-shrink-0"/>
            <h1 className="font-bold text-blue-600 w-full pl-2 text-sm truncate">
                Motivação do dia
            </h1>
        </div>
        <div className="text-gray-500 w-full block px-3 pb-2 leading-tight text-xs font-semibold">
            Talvez seu primeiro passo não te leve onde você já quer chegar, mas com certeza, ele já te dirá o lugar!
        </div>
    </div>
   )
}