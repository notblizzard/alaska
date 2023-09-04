"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const submit = (draft: boolean) => {
    fetch("/api/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, draft }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push(`/user/${data.post.user.username}`);
      });
  };

  return (
    <>
      {session && (
        <div className="flex flex-col p-4 items-center content-start bg-slate-100 min-h-screen w-full text-black">
          <div className="flex flex-row">
            <button
              onClick={() => submit(false)}
              className="bg-emerald-400/75 rounded-lg p-4 text-slate-100 hover:bg-emerald-400 mr-4"
            >
              Publish
            </button>
            <button
              onClick={() => submit(true)}
              className="bg-emerald-400/75 rounded-lg p-4 text-slate-100 hover:bg-emerald-400"
            >
              Save As Draft
            </button>
          </div>

          <input
            className="border-transparent focus:border-transparent focus:outline-none text-4xl w-4/6 bg-slate-100"
            size={50}
            type="text"
            value={data.title}
            placeholder="Title...."
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <textarea
            className="resize-none border-transparent mt-4 focus:border-transparent focus:outline-none text-4xl w-4/6 bg-slate-100"
            rows={10}
            value={data.content}
            placeholder="Your amazing story...."
            onChange={(e) => setData({ ...data, content: e.target.value })}
          />
        </div>
      )}
    </>
  );
}
