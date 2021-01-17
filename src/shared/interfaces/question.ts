export interface Question {
  title: string;
  alternatives: Array<string>;
  flag: boolean;
  answered: boolean;
  correctAnswer: string;
  selectedAlternative: string | null;
}
