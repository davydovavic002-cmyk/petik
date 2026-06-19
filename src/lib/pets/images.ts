export const PET_IMAGES = {
  hero: "/hero-clinic.png",
  dog: "/pet-dog.png",
  cat: "/pet-cat.png",
  bird: "/pet-bird.png",
  rabbit: "/pet-rabbit.png",
} as const;

export const TOUR_IMAGES = {
  reception: "/tour-reception.png",
  lab: "/tour-lab.png",
  surgery: "/tour-surgery.png",
} as const;

export type PetImageId = keyof Omit<typeof PET_IMAGES, "hero">;
export type TourRoomId = keyof typeof TOUR_IMAGES;

export const GALLERY_PETS: {
  id: PetImageId;
  image: string;
  labelKey: "galleryPet_dog" | "galleryPet_cat" | "galleryPet_bird" | "galleryPet_rabbit";
}[] = [
  { id: "dog", image: PET_IMAGES.dog, labelKey: "galleryPet_dog" },
  { id: "cat", image: PET_IMAGES.cat, labelKey: "galleryPet_cat" },
  { id: "bird", image: PET_IMAGES.bird, labelKey: "galleryPet_bird" },
  { id: "rabbit", image: PET_IMAGES.rabbit, labelKey: "galleryPet_rabbit" },
];
