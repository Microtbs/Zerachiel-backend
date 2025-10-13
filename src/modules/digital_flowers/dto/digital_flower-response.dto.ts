export class SenderDTO {
  id: number;
  first_name: string;
  last_name: string;
}
export class DeceasedDTO {
  first_name: string;
  last_name: string;
}
export class GraveDTO {
  id: number;
  deceased: DeceasedDTO[];
}

export class DigitalFlowerResponseDTO {
  id: number;
  type: string;
  created_at: Date;
  sender: SenderDTO;
  grave: GraveDTO; 
}


