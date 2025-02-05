"use client";

import { useState, useEffect } from "react";

const Nssr = ({ children }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return loading ? <div >{children}</div> : null;
};

export default Nssr;
