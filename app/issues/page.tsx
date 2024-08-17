import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import Issues from "./_components/Issues";

const IssuesPage = () => {
  return (
    <div>
      <div>
        {/* List of issues */}
        <Issues />
      </div>
      <div>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssuesPage;
