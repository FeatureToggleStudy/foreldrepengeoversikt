import axios from 'axios';
import Environment from '../Environment';
import Ettersending from './types/ettersending/Ettersending';
import AxiosApiInterceptor from './interceptor';

export const apiBaseUrl: string = Environment.REST_API_URL;

const getPersoninfo = () => {
    return AxiosApiInterceptor.get('/personinfo');
};

const getSaker = () => {
    return AxiosApiInterceptor.get('innsyn/saker');
};

const sendEttersending = (ettersending: Ettersending) => {
    return AxiosApiInterceptor.post('/soknad/ettersend', ettersending);
};

const getStorageKvittering = () => {
    return AxiosApiInterceptor.get('/storage/kvittering/foreldrepenger', {
        timeout: 15 * 1000
    });
};

const getHistorikk = () => {
    return AxiosApiInterceptor.get('/historikk/historikk');
};

const getMiniDialog = () => {
    return AxiosApiInterceptor.get('/minidialog/minidialog');
};

const getUttaksplan = (saksnummer: string) => {
    return AxiosApiInterceptor.get('innsyn/uttaksplan', {
        params: { saksnummer }
    });
};

const log = (error: any) => {
    return axios.post('/log', error, {
        timeout: 15 * 1000,
        headers: {
            'content-type': 'application/json'
        }
    });
};

const Api = {
    getSaker,
    getPersoninfo,
    sendEttersending,
    getStorageKvittering,
    getHistorikk,
    getMiniDialog,
    getUttaksplan,
    log
};

export default Api;
