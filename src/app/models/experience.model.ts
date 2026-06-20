export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: {
    start: Date;
    end?: Date;
  };
  description: string;
  technologies?: string[];
  isCurrentRole?: boolean;
}
