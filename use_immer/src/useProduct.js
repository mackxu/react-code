// mock use-immer

import { useCallback, useState } from "react";

const produce = (updater) => (val) => {
  const draft = structuredClone(val);
  updater(draft);
  return draft;
}


export default function useProduct(init) {
  const [val, updateValue] = useState(init);
  return [val, useCallback((updater) => {
    updateValue(produce(updater));
  }, [])];
}