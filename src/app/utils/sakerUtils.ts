import Sak, { SakType } from '../api/types/sak/Sak';
import { FagsakStatus } from '../api/types/sak/FagsakStatus';
import Behandling, { BehandlingStatus, BehandlingÅrsak, BehandligType } from '../api/types/sak/Behandling';
import { StorageKvittering } from '../api/types/StorageKvittering';

export const sakByDescendingOrder = (a: Sak, b: Sak) => b.opprettet.localeCompare(a.opprettet);
export const behandlingByDescendingOrder = (a: Behandling, b: Behandling) =>
    b.opprettetTidspunkt.localeCompare(a.opprettetTidspunkt);

export const erUnderBehandling = (sak: Sak): boolean => {
    return (
        sak.status !== undefined &&
        (sak.status === FagsakStatus.OPPRETTET || sak.status === FagsakStatus.UNDER_BEHANDLING)
    );
};

export const erLøpende = (sak: Sak): boolean => {
    return sak.status !== undefined && sak.status === FagsakStatus.LOPENDE;
};

export const erAvsluttet = (sak: Sak): boolean => {
    return sak.status !== undefined && sak.status === FagsakStatus.AVSLUTTET;
};

export const getNyesteSak = (saker: Sak[]): Sak | undefined => {
    return saker.sort(sakByDescendingOrder)[0];
};

export const getNyesteBehandling = (sak: Sak): Behandling | undefined => {
    if (sak.behandlinger !== undefined && sak.behandlinger.length > 0) {
        return sak.behandlinger.sort(behandlingByDescendingOrder)[0];
    }
    return undefined;
};

export const getAlleBehandlinger = (saker: Sak[]): Behandling[] => {
    const behandlinger: Behandling[] = [];
    saker.forEach((sak: Sak) => {
        if (sak.behandlinger) {
            behandlinger.push(...sak.behandlinger);
        }
    });
    return behandlinger;
};

export const finnNyesteBehandling = (sak: Sak): Behandling | undefined => {
    return sak.behandlinger && sak.behandlinger.sort(behandlingByDescendingOrder)[0];
};

export const harSendtInnEndringssøknad = (sak: Sak) => {
    return sak.behandlinger === undefined
        ? false
        : sak.behandlinger.some((b: Behandling) => b.årsak === BehandlingÅrsak.ENDRING_FRA_BRUKER);
};

export const erForeldrepengesak = (sak: Sak): boolean => {
    const behandling = getNyesteBehandling(sak);
    return behandling === undefined ? true : behandling.type === BehandligType.FORELDREPENGESØKNAD;
};

export const erEngangsstønad = (sak: Sak): boolean => {
    const behandling = getNyesteBehandling(sak);
    return behandling === undefined ? false : behandling.type === BehandligType.ENGANGSSØNAD;
};

export const erSvangerskapepengesak = (sak: Sak): boolean => {
    const behandlig = getNyesteBehandling(sak);
    return behandlig === undefined ? false : behandlig.type === BehandligType.SVANGERSKAPSPENGESØKNAD;
};

export const harEnAvsluttetBehandling = (sak: Sak): boolean => {
    return sak.behandlinger
        ? sak.behandlinger.some((behandling: Behandling) => behandling.status === BehandlingStatus.AVSLUTTET)
        : false;
};

export const skalKunneSøkeOmEndring = (sak: Sak): boolean => {
    if (!erForeldrepengesak(sak) || sak.saksnummer === undefined) {
        return false;
    }

    return (
        (sak.status !== FagsakStatus.AVSLUTTET && harEnAvsluttetBehandling(sak)) ||
        erInfotrygdSak(sak)
    );
};

export const erInfotrygdSak = (sak: Sak): boolean => {
    return sak.type === SakType.SAK;
};

export const opprettFiktivSak = (storageKvittering: StorageKvittering) => {
    const sak: Sak = {
        saksnummer: '',
        type: SakType.SAK,
        erJornalført: false,
        opprettet: storageKvittering.innsendingstidspunkt
    };
    return sak;
};

export const harSøkt = (sak: Sak): boolean => {
    return !erInfotrygdSak(sak) ? sak.behandlinger !== undefined && sak.behandlinger.length > 0 : true;
};
