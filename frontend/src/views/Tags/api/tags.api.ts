import { ITag } from "@/interfaces/ITag";

export const getAllTagsRequest = () => ({
  method: "get",
  url: "/tags",
});

export const createTagRequest = (Tag: ITag) => ({
  method: "post",
  url: "/tags",
  data: Tag,
});

export const updateTagRequest = (id: Pick<ITag, 'id'>, Tag: ITag) => ({
  method: "post",
  url: `/tags/${id}`,
  data: Tag,
});

export const deleteTagRequest = (id: Pick<ITag, 'id'>) => ({
  method: "delete",
  url: `/tags/${id}`,
});

export const getTagRequest = (id: Pick<ITag, 'id'>) => ({
  method: "get",
  url: `/tags/${id}`,
});
