"use client";
import { Quicklink } from "@/lib/types";
import { Card } from "../card";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import { getFavicons } from "get-website-favicon";

function QuicklinkCard({ quicklink }: { quicklink: Quicklink }) {
  const getFaviconData = async (url: string) => {
    const domain = url.replace("https://", "").replace("http://", "");
    const data = await fetch(
      `https://www.google.com/s2/favicons?domain=${domain}`
    ).then((res) => console.log(res));
  };

  getFaviconData("github.com");

  return (
    <a href={quicklink.linkurl}>
      <Card className="max-w-48 p-4 mr-2 ">
        <p>{quicklink.linktitle}</p>
      </Card>
    </a>
  );
}

export default QuicklinkCard;
