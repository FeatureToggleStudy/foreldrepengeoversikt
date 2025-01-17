import { Attachment } from 'common/storage/attachment/types/Attachment';

export default interface EttersendingDto {
    type: EttersendingType;
    saksnummer: string,
    vedlegg: Attachment[];
    referanseId?: string;
    brukerTekst?: {
        dokumentType: string;
        tekst: string;
        overskrift: string;
    }
}

export enum EttersendingType {
    FORELDREPENGER = 'foreldrepenger',
    ENGANGSSTØNAD = 'engangsstønad',
    SVANGERSKAPSPENGER =  'svangerskapspenger'
} 