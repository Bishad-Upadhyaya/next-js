"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface IssueProps {
  title: string;
  description: string;
  status: string;
}

const Issues = () => {
  const [issues, setIssues] = useState([]);

  const loadData = async () => {
    const response = await axios.get("/api/issues/");
    console.log(response.data);
    setIssues(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {issues.map((issue: IssueProps, index) => (
        <div
          key={index}
          className="p-2 mb-4 border-b rounded-md shadow-md space-y-6"
        >
          <h2 className="font-bold text-lg">{issue?.title}</h2>
          <p className="text-sm text-zinc-500">{issue?.description}</p>
          <p className="text-sm font-semibold">{issue?.status}</p>
        </div>
      ))}
    </>
  );
};

export default Issues;
