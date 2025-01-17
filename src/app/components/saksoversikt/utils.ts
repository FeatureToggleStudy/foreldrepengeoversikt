import moment from 'moment';
import { FagsakStatus } from '../../api/types/sak/FagsakStatus';
import Sak from 'app/api/types/sak/Sak';
import { erInfotrygdSak, getNyesteBehandling } from 'app/utils/sakerUtils';
import { BehandligType } from 'app/api/types/sak/Behandling';

export const isSakTooOldForEttersendelse = (sak: Sak): boolean => {
    return !moment(sak.opprettet).isSameOrAfter(moment().subtract(150, 'days'));
};

export const isSakEligableForEttersendelse = (sak: Sak): boolean => {
    if (sak.saksnummer === undefined) {
        return false;
    };

    if (erInfotrygdSak(sak)) {
        return !isSakTooOldForEttersendelse(sak);
    };

    return sak.status ? sak.status !== FagsakStatus.AVSLUTTET : false; 
};

export function formatDate(dato: string, datoformat?: string): string {
    return moment(dato).format(datoformat || 'D. MMMM YYYY');
}

export const getIntlKeyForStatus = (status: FagsakStatus): string => {
    switch (status) {
        case FagsakStatus.OPPRETTET:
        case FagsakStatus.UNDER_BEHANDLING:
            return 'saksoversikt.heading.underBehandling';
        case FagsakStatus.LOPENDE:
            return 'saksoversikt.heading.løpende';
        case FagsakStatus.AVSLUTTET:
            return 'saksoversikt.heading.avsluttet';
    }
};

export const getEtikettTypeForSaksstatus = (sak: Sak): 'suksess' | 'fokus' =>
    sak.status === FagsakStatus.LOPENDE || sak.status === FagsakStatus.AVSLUTTET ? 'suksess' : 'fokus';

export const getSaksoversiktTitle = (sak: Sak): string => {
    const nyesteBehandlig = getNyesteBehandling(sak);
    const type = nyesteBehandlig && nyesteBehandlig.type;
    switch (type) {
        case BehandligType.ENDRINGSSØKNAD:
        case BehandligType.FORELDREPENGESØKNAD:
            return 'saksoversikt.heading.top.foreldrepenger';
        case BehandligType.ENGANGSSØNAD:
            return 'saksoversikt.heading.top.engangsstønad';
        case BehandligType.SVANGERSKAPSPENGESØKNAD:     
            return 'saksoversikt.heading.top.svangerskapspengesoknad';
        default:
            return 'saksoversikt.heading.top.ukjent';
    }
};
