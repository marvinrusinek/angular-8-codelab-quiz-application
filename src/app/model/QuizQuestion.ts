import { Option } from './Option';

export interface QuizQuestion {
  questionId: number;
  question: string;
  options: Option[];
  answer: string;
  explanation: string;
}
