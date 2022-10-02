import { PlayIcon } from "@sanity/icons";

export default {
  title: "Video Source",
  name: "videoSource",
  type: "document",
  icon: PlayIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Please generate a slug so I can handle this video source in the code 🤝",
      options: {
        source: "name",
      },
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
