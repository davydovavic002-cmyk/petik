export type Language = "ru" | "en" | "am";

export type PetType = "cat" | "dog" | "exotic";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "status";
  content: string;
}

export interface AppointmentSelection {
  date: Date | null;
  time: string | null;
  petType: PetType | null;
}

export interface HealthAnswer {
  questionId: string;
  value: boolean | null;
}
