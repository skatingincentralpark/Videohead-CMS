import { defineType, defineField, defineArrayMember } from "sanity";
import { RocketIcon } from "@sanity/icons";

export default defineType({
  name: "video",
  title: "Video",
  type: "document",
  icon: RocketIcon as any,
  fields: [
    defineField({
      name: "orderRank",
      title: "Order",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "award",
      title: "Award",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          title: "Won",
          name: "won",
          type: "boolean",
          initialValue: false,
        },
        {
          title: "URL",
          description: "Link to the article or publication of award",
          name: "url",
          type: "url",
          initialValue: "",
        },
      ],
    }),
    defineField({
      name: "gifs",
      title: "GIFS",
      description:
        "These will appear on the landing page, place a maximum of 4",
      type: "array",
      of: [
        defineArrayMember({
          title: "Image",
          type: "mainImage",
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
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
    }),
    defineField({
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
    }),
    defineField({
      name: "videoId",
      title: "Video ID",
      type: "string",
      description:
        'When you click share, it is the ID at the end of the URL.  E.g. "https://youtu.be/98yFlEQ6reQ", "https://vimeo.com/390907489"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
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
});
