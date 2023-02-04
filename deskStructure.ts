import { JsonView } from "./components/views/JsonView";
import {
  CogIcon,
  EditIcon,
  EyeOpenIcon,
  DocumentIcon,
  RocketIcon,
} from "@sanity/icons";
import { SocialMediaView } from "./components/views/SocialMediaView";
import type { StructureBuilder, StructureResolverContext } from "sanity/desk";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const excludedDocumentTypes = ["video", "siteSettings", "media.tag", "link"];

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext
) => {
  return S.list()
    .title("Content")
    .items([
      // S.listItem()
      //   .title("Personal Videos")
      //   .schemaType("video")
      //   .child(
      //     S.documentTypeList("video")
      //       .title("Videos by Category")
      //       .filter('_type == "video" && category == "personal"')
      //   ),

      // S.listItem()
      //   .title("Work")
      //   .schemaType("video")
      //   .child(
      //     S.documentTypeList("video")
      //       .title("Work")
      //       .filter('_type == "video" && category != "personal"')
      //   ),

      orderableDocumentListDeskItem({
        type: "video",
        title: "Work",
        icon: RocketIcon as any,
        S,
        context,
        filter: '_type == "video" && category != "personal"',
      }),

      orderableDocumentListDeskItem({
        type: "video",
        id: "personal-video",
        title: "Personal Work",
        icon: RocketIcon as any,
        S,
        context,
        filter: '_type == "video" && category == "personal"',
      }),

      S.divider(),
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon as any)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .views([
              S.view
                .form()
                .title("Edit")
                .icon(EditIcon as any),
              S.view
                .component(SocialMediaView)
                .title("Preview")
                .icon(EyeOpenIcon as any),
              S.view
                .component(JsonView)
                .title("JSON")
                .icon(DocumentIcon as any),
            ])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !excludedDocumentTypes.includes(listItem.getId() || "")
      ),
    ]);
};

export const getDefaultDocumentNode = (S: StructureBuilder) => {
  return S.document().views([
    S.view.form().icon(CogIcon as any),
    S.view
      .component(JsonView)
      .title("JSON")
      .icon(DocumentIcon as any),
  ]);
};
