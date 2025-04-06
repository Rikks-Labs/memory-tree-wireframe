export type PreviewHighlight = {
  name: string;
  description: string;
  members: {
    username: string;
    imageUrl: string;
  }[];
  imageUrl: string;
  dateTaken: string;
  location: string;
};
