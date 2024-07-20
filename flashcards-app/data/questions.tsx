interface Question {
  id: number;
  question: string;
  answer: string;
}

const questions: Question[] = [
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "What is 2 + 2?", answer: "4" },
  // Add more questions as needed
];

export default questions;
