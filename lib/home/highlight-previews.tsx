import { PreviewHighlight } from "#/types";

export const getPreviewHighlights = async (): Promise<PreviewHighlight[]> => {
  // get familys' highlight images to display

  return [
    {
      name: "The Okoro Family",
      description: "A day at the park.",
      members: [
        {
          username: "Chukwuemeka",
          imageUrl: "",
        },
        {
          username: "Ngozi",
          imageUrl: "",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1596510914965-9ae08acae566?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxhY2slMjBmYW1pbHl8ZW58MHx8MHx8fDA%3D",
      dateTaken: "2024-01-20",
      location: "Central Park, Lagos",
    },
    {
      name: "Celebrating Ileya",
      description: "Family celebration.",
      members: [
        {
          username: "Babatunde",
          imageUrl: "",
        },
        {
          username: "Funmilayo",
          imageUrl: "",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1586463460313-1062ffc385e9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      dateTaken: "2023-12-24",
      location: "Ibadan Home",
    },
    {
      name: "Family Time in Abuja",
      description: "Quality time together.",
      members: [
        {
          username: "Ifeanyi",
          imageUrl: "",
        },
        {
          username: "Chinwe",
          imageUrl: "",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1596510915124-38eaa5517966?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBmYW1pbHl8ZW58MHx8MHx8fDA%3D",
      dateTaken: "2023-11-15",
      location: "Millennium Park, Abuja",
    },
    {
      name: "Precious Moments in Enugu",
      description: "Capturing precious moments.",
      members: [
        {
          username: "Chibuike",
          imageUrl: "",
        },
        {
          username: "Amara",
          imageUrl: "",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1624272864537-8ecc72b67958?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBmYW1pbHl8ZW58MHx8MHx8fDA%3D",
      dateTaken: "2023-10-01",
      location: "Nsukka Hills, Enugu",
    },
    {
      name: "Joyful Family in Port Harcourt",
      description: "Experiencing joy together.",
      members: [
        {
          username: "Tamuno",
          imageUrl: "",
        },
        {
          username: "Ibiere",
          imageUrl: "",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1597524678053-5e6fef52d8a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2slMjBmYW1pbHl8ZW58MHx8MHx8fDA%3D",
      dateTaken: "2023-09-10",
      location: "Bonny Island, Rivers",
    },
    {
      name: "Family Vacation in Calabar",
      description: "Enjoying a family vacation.",
      members: [
        {
          username: "Etim",
          imageUrl: "",
        },
        {
          username: "Abasiama",
          imageUrl: "",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1596510914914-e14c6f59f925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwZmFtaWx5fGVufDB8fDB8fHww",
      dateTaken: "2023-08-01",
      location: "Tinapa Resort, Cross River",
    },
    {
      name: "Happy Family in Kano",
      description: "A happy family moment.",
      members: [
        {
          username: "Mustapha",
          imageUrl: "",
        },
        {
          username: "Fatima",
          imageUrl: "",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1614317354806-860a3bf79069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJsYWNrJTIwZmFtaWx5fGVufDB8fDB8fHww",
      dateTaken: "2023-07-15",
      location: "Gidan Makama Museum, Kano",
    },
    {
      name: "Family Portrait in Benin",
      description: "A beautiful family portrait.",
      members: [
        {
          username: "Osaze",
          imageUrl: "",
        },
        {
          username: "Eki",
          imageUrl: "",
        },
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1580377968103-84cadc052dc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJsYWNrJTIwZmFtaWx5fGVufDB8fDB8fHww",
      dateTaken: "2023-06-01",
      location: "Benin City Studio",
    },
  ];
};
