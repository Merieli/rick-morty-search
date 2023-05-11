import { TextOrUnknown } from '../TextOrUnknow.type';

export interface ApiLocation {
    id: string | null;
    name: TextOrUnknown;
    type: string | null;
    dimension: TextOrUnknown | null;
}
