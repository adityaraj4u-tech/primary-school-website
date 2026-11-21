export type Grade = {
  id: number;
  label: string;
  ageRange: string;
  focus: string;
  verified: boolean;
};

export const grades: Grade[] = [
  { id: 1, label: "Grade 1", ageRange: "Approx. 6 years", focus: "Foundations of reading, counting and classroom routines.", verified: false },
  { id: 2, label: "Grade 2", ageRange: "Approx. 7 years", focus: "Growing independence in literacy, numbers and group work.", verified: false },
  { id: 3, label: "Grade 3", ageRange: "Approx. 8 years", focus: "Deeper reading, problem-solving and first research habits.", verified: false },
  { id: 4, label: "Grade 4", ageRange: "Approx. 9 years", focus: "Stronger writing, multi-step maths and collaborative projects.", verified: false },
  { id: 5, label: "Grade 5", ageRange: "Approx. 10 years", focus: "Preparation for middle school with confidence and curiosity intact.", verified: false },
];
