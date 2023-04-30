import { TextOrUnknown } from '../TextOrUnknow.type';

export interface ApiLocation {
    id?: string;
    name: TextOrUnknown;
    type?: string;
    dimension?: TextOrUnknown;
}
