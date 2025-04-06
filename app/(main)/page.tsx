import Higghligher from "#/components/home/highlighter";
import UploaderComp from "#/components/home/uploader";
import { getPreviewHighlights } from "#/lib/home/highlight-previews";
import React from "react";

type Props = {};

const HomePage = async (props: Props) => {
  const previewHighlights = await getPreviewHighlights();

  return (
    <div className={"text-3xl w-full h-full "}>
      <Higghligher highlights={previewHighlights} />
      <UploaderComp />
    </div>
  );
};

export default HomePage;
