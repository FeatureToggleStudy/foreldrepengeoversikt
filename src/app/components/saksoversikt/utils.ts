import moment from 'moment';
import { FagsakStatus } from '../../types/FagsakStatus';
import Sak from 'app/types/Sak';
import { erInfotrygdSak } from 'app/utils/sakerUtils';

export const isSakTooOldForEttersendelse = (sak: Sak): boolean => {
    return !moment(sak.opprettet).isSameOrAfter(moment().subtract(150, 'days'));
};

export const isSakEligableForEttersendelse = (sak: Sak): boolean => {
    const { opprettet, saksnummer } = sak;
    if(saksnummer === undefined) {
        return false;
    }

    if (erInfotrygdSak(sak)) {
        return moment(opprettet).isSameOrAfter(moment().subtract(150, 'days'));
    }

    if(sak.status) {
        return sak.status !== FagsakStatus.AVSLUTTET;
    }
    return false;
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

export const getEtikettTypeForSaksstatus = (sak: Sak): 'suksess' | 'fokus' => 
    sak.status === FagsakStatus.LOPENDE || sak.status === FagsakStatus.AVSLUTTET ? 'suksess' : 'fokus';