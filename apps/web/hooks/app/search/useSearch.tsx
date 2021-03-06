import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchIndex } from "../../../app/search/searchIndex";

export const useSearch = () => {
  const router = useRouter();
  const [results, setResults] = useState<Array<any>>([]);

  useEffect(() => {
    async function search() {
      let word: any = router.query.q || "";
      let withoutExtraSpace = word.replace(/\s+/g, " ").trim();

      if (withoutExtraSpace !== "" && withoutExtraSpace !== " ") {
        const search = await (await searchIndex).search(word);
        setResults(search.hits);
      }
    }

    search();
  }, [router.query]);

  return { router, results };
};
