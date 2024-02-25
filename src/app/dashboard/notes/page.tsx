"use client";

import { Card } from "@/components/ui/card";
import Markdown from "react-markdown";

function Page() {
  return (
    <Card className="mx-4 px-2">
      <Markdown>**Markdown**</Markdown>
    </Card>
  );
}

export default Page;
