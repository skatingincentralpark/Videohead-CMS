import { DocumentIcon, RocketIcon } from "@sanity/icons";
import { JsonView } from "../components/views/JsonView";
import S from "@sanity/desk-tool/structure-builder";

export default {
  name: "musicVideo",
  title: "Music Video",
  type: "document",
  icon: RocketIcon,
  views: [S.view.component(JsonView).title("JSON").icon(DocumentIcon)],
  fields: [
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "gifs",
      title: "GIFS",
      description:
        "These will appear on the landing page, place a maximum of 4",
      type: "array",
      of: [
        {
          title: "Image",
          type: "mainImage",
        },
      ],
      validation: (Rule) => Rule.max(4),
    },
    // {
    //   name: "gifsCloudinary",
    //   title: "Gifs (Cloudinary)",
    //   description: "POC to serve assets from Cloudinary",
    //   type: "array",
    //   of: [{ type: "cloudinary.asset" }],
    // },
    {
      name: "category",
      title: "Category",
      description: "Category of your video",
      type: "string",
      options: {
        list: [
          { title: "Music Video", value: "music-video" },
          { title: "Film", value: "film" },
          { title: "Commercial", value: "commercial" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "source",
      title: "Video Source",
      description: "Where is this video uploaded?",
      type: "string",
      options: {
        list: [
          { title: "Youtube", value: "youtube" },
          { title: "Vimeo", value: "vimeo" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "videoId",
      title: "Video ID",
      type: "string",
      description:
        'When you click share, it is the ID at the end of the URL.  E.g. "https://youtu.be/98yFlEQ6reQ", "https://vimeo.com/390907489"',
      validation: (Rule) => Rule.required(),
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
      client: "client",
    },
    prepare(selection) {
      const { client } = selection;
      return Object.assign({}, selection, {
        subtitle: client && `${client}`,
      });
    },
  },
};
