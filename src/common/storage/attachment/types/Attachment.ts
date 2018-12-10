export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    pending: boolean;
    error?: any;
    skjemanummer: Skjemanummer;
}

export enum Skjemanummer {
    BEKREFTELSE_FRA_ARBEIDSGIVER = 'I000065',
    INNTEKTSOPPLYSNINGER = 'I000026',
    ETTERLØNN_ELLER_SLUTTVEDERLAG = 'I000044',
    OMSORGSOVERTAKELSESDATO = 'I000042',
    FØDSELSATTEST = 'I000063', // will be required once we start fetching data from TPS about registered children.
    TERMINBEKREFTELSE = 'I000062',
    DOK_MILITÆR_SILVIL_TJENESTE = 'I000039',
    INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG = 'I000007',
    DOK_MORS_UTDANNING_ARBEID_SYKDOM = 'I000038',
    DOK_INNLEGGELSE = 'I000037',
    DOK_OVERFØRING_FOR_SYK = 'I000045',
    BEKREFTELSE_FRA_STUDIESTED = 'I000061',
    BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM = 'I000051',
    ANNET = 'I000060'
}

export const skjemanummerForEngangssønad = (skjemanummer: Skjemanummer) =>
    skjemanummer === Skjemanummer.ANNET ||
    skjemanummer === Skjemanummer.TERMINBEKREFTELSE ||
    skjemanummer === Skjemanummer.FØDSELSATTEST;
