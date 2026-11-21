export type Facility = {
  id: string;
  title: string;
  description: string;
  verified: boolean;
};

export const facilities: Facility[] = [
  { id: "classrooms", title: "Bright classrooms", description: "Age-appropriate spaces designed for focused learning and group activity.", verified: false },
  { id: "library", title: "Library & reading corner", description: "A quiet place with books chosen for early and growing readers.", verified: false },
  { id: "playground", title: "Outdoor play area", description: "Safe space for free play, games and physical development.", verified: false },
  { id: "activity", title: "Activity rooms", description: "Dedicated areas for art, craft, music and indoor co-curricular work.", verified: false },
];
