import React from "react";
import PostsList from "@/components/Forum/Posts/PostsList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Category, Channel } from "@/utils/Types";
import Sidebar from "@/components/Forum/Sidebar/Sidebar";
import { AppConfig } from "@/utils/AppConfig";

async function Forum(context: any) {
  const session = await getServerSession(authOptions);
  const channelID = context.params.channelID;
  
  const categories: Category[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    }
  ).then((res) => res.json().then((data) => data.categories));

  const channel: Channel = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/channel/${channelID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    }
  ).then((res) => res.json().then((data) => data));

  return (
    <>
      <Sidebar categories={categories} />
      <PostsList channelID={channelID} channel={channel} session={session} />
    </>
  );
}

export const metadata = {
  title: `${AppConfig.siteName} | Forum`,
};

export default Forum;
