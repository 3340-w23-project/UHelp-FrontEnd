import { store } from "@/redux/store";
import { Post, Reply } from "@/utils/Types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from "next-auth/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.user?.access_token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getPosts: build.query<Post[], string>({
      query: (channelID) => {
        return `channel/${channelID}/posts`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
      transformErrorResponse: (error) => {
        if (error.status === 401) {
          signOut();
          window.location.href = "/signin";
        }
      },
    }),
    addPost: build.mutation<
      void,
      { channelID: string; title: string; content: string }
    >({
      query: ({ channelID, title, content }) => {
        return {
          url: `/post/new`,
          method: "POST",
          body: {
            channel_id: channelID,
            title: title,
            content: content,
          },
        };
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    addReply: build.mutation<
      void,
      { postID: number; parentID: number | null; content: string }
    >({
      query: ({ postID, parentID, content }) => {
        return {
          url: `/reply/${postID}`,
          method: "POST",
          body: {
            content: content,
            post_id: postID,
            parent_reply_id: parentID,
          },
        };
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    editItem: build.mutation<
      void,
      { id: number; isReply: boolean; title?: string; content: string }
    >({
      query: ({ id, isReply, ...patch }) => {
        return {
          url: `edit/${isReply ? "reply" : "post"}/${id}`,
          method: "POST",
          body: patch,
        };
      },
      async onQueryStarted(
        { id, isReply, ...patch },
        { dispatch, queryFulfilled }
      ) {
        const channelID = String(store.getState().channel.channelID);
        const result = dispatch(
          postsApi.util.updateQueryData("getPosts", channelID, (draft) => {
            if (!isReply) {
              const post = draft?.find((post) => post.id === id);
              if (post) {
                post.title = patch.title ?? post.title;
                post.content = patch.content;
                post.edited = true;
                post.edited_date = new Date().toISOString();
              }
            } else {
              const findReply: any = (replies: Post[] | Reply[]) => {
                for (let i = 0; i < replies.length; i++) {
                  if (replies[i].id === id) return replies[i];
                  if (replies[i].replies) {
                    const reply = findReply(replies[i].replies!);
                    if (reply) return reply;
                  }
                }
                return null;
              };

              const reply = findReply(draft!);
              if (reply) {
                reply.content = patch.content;
                reply.edited = true;
                reply.edited_date = new Date().toISOString();
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    deleteItem: build.mutation<
      void,
      { id: number; parentID?: number; isReply: boolean }
    >({
      query: ({ id, isReply }) => {
        return {
          url: `delete/${isReply ? "reply" : "post"}/${id}`,
          method: "POST",
        };
      },
      async onQueryStarted(
        { id, parentID, isReply },
        { dispatch, queryFulfilled }
      ) {
        const channelID = String(store.getState().channel.channelID);
        const result = dispatch(
          postsApi.util.updateQueryData("getPosts", channelID, (draft) => {
            if (!isReply) return draft?.filter((post) => post.id !== id);
            else {
              const parentPost = draft?.find((post) => post.id === parentID);

              const deleteReply = (replies: Post[] | Reply[]) => {
                for (let i = 0; i < replies.length; i++) {
                  if (replies[i].id === id) {
                    replies.splice(i, 1);
                    return true;
                  }
                  if (replies[i].replies && deleteReply(replies[i].replies!))
                    return true;
                }
                return false;
              };

              deleteReply(parentPost!.replies!);

              return draft;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    rateItem: build.mutation<
      void,
      { id: number; isReply: boolean; isLike: boolean }
    >({
      query: ({ id, isReply, isLike }) => {
        return {
          url: `${isLike ? "like" : "dislike"}/${
            isReply ? "reply" : "post"
          }/${id}`,
          method: "POST",
        };
      },
      async onQueryStarted(
        { id, isReply, isLike },
        { dispatch, queryFulfilled }
      ) {
        const channelID = String(store.getState().channel.channelID);
        const result = dispatch(
          postsApi.util.updateQueryData("getPosts", channelID, (draft) => {
            const handleUpdatingRating = (item: Post | Reply) => {
              const isDisliked = item.disliked;
              const isLiked = item.liked;
              let likes = item.likes;
              let dislikes = item.dislikes;

              if (isLike) {
                if (!isLiked && !isDisliked) likes++;
                else if (isLiked) likes--;
                else {
                  likes++;
                  dislikes--;
                }
              } else {
                if (!isLiked && !isDisliked) dislikes++;
                else if (isDisliked) dislikes--;
                else {
                  dislikes++;
                  likes--;
                }
              }

              item.liked = isLike ? !isLiked : false;
              item.disliked = !isLike ? !isDisliked : false;
              item.likes = likes;
              item.dislikes = dislikes;
            };

            if (!isReply) {
              const post = draft?.find((post) => post.id === id);
              handleUpdatingRating(post!);
            } else {
              const findReply: any = (replies: Post[] | Reply[]) => {
                for (let i = 0; i < replies.length; i++) {
                  if (replies[i].id === id) return replies[i];
                  if (replies[i].replies) {
                    const reply = findReply(replies[i].replies!);
                    if (reply) return reply;
                  }
                }
                return null;
              };

              const reply = findReply(draft!);
              handleUpdatingRating(reply!);
            }

            return draft;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useAddReplyMutation,
  useEditItemMutation,
  useDeleteItemMutation,
  useRateItemMutation,
} = postsApi;
