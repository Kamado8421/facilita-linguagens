'use client';

import { useEffect, useState } from "react";
import { fetchIndexRanking } from "./fetchIndexRanking";
import SimpleInsightBox from "./(components)/simpleInsightBox";
import AdvancedInsightBox from "./(components)/advancedInsightBox";

export default function Dashboard() {

  const [indexRanking, setIndexRanking] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchIndexRanking();
      setIndexRanking(data?.index || null);
    })()

  }, []);

  return (
    <div className="min-h-screen">
      <main className="pt-9 px-4 md:px-12">
       
        <AdvancedInsightBox indexRanking={indexRanking!}/>
        <SimpleInsightBox />

      </main>
    </div>
  );
}

