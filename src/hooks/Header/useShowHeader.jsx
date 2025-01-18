import { useState, useEffect, useRef } from "react";

function useShowHeader() {
  const [showHeader, setShowHeader] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShowHeader(true);
  }, []);

  return { showHeader, nodeRef };
}

export default useShowHeader;
