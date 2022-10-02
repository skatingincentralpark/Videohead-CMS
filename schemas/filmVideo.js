import { DocumentIcon, RocketIcon } from "@sanity/icons";
import { JsonView } from "../components/views/JsonView";
import S from "@sanity/desk-tool/structure-builder";

export default {
  name: "filmVideo",
  title: "Film Video",
  type: "document",
  icon: RocketIcon,
  views: [S.view.component(JsonView).title("JSON").icon(DocumentIcon)],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "videoId",
      title: "Vimeo Video ID",
      type: "string",
      description:
        "When you click share, it is the ID at the end of the URL.  E.g. https://vimeo.com/390907489",
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
      videoId: "videoId",
    },
    prepare(selection) {
      const { videoId } = selection;
      return Object.assign({}, selection, {
        subtitle: videoId && `Video ID: ${videoId}`,
      });
    },
  },
};
