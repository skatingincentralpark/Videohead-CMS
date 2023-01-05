import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  title: "Link",
  name: "link",
  type: "document",
  icon: LinkIcon as any,
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
    }),
    defineField({
      title: "URL",
      name: "href",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Open in new window",
      name: "openInNewWindow",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "href",
    },
  },
});
