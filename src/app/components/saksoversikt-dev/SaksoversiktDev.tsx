import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import Sak from '../../types/Sak';
import Behandling from '../../types/Behandling';
import { Status } from '../../types/Status';

import './saksoversiktDev.less';

interface Props {
    title: string;
    sakstatus: Status;
    saker: Sak[];
}

class SaksoversiktDev extends React.Component<Props> {
    renderSaksinformasjon(sak: Sak) {
        return (
            <div className={'saksoversiktListDev__item'}>
                <Normaltekst> Saksnummer: {sak.saksnummer}</Normaltekst>
                <Normaltekst> Behandlingstema: {sak.behandlingTema}</Normaltekst>
                <Normaltekst> Behandlinger: </Normaltekst>
                <ul className="behandlingerDev">
                    {sak.behandlinger.map((behandling: Behandling) => (
                        <li className={'behandlingerDev__item'} key={behandling.id}>
                            <Normaltekst> Status: {behandling.status}</Normaltekst>
                            <Normaltekst> Id: {behandling.id}</Normaltekst>
                            <Normaltekst> Type: {behandling.type}</Normaltekst>
                            <Normaltekst> Tema: {behandling.tema}</Normaltekst>
                            <Normaltekst> BehandlendeEnhet Id: {behandling.behandlendeEnhet}</Normaltekst>
                            <Normaltekst> Behandlende Enhet: {behandling.behandlendeEnhetNavn}</Normaltekst>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    renderSaksoversikt() {
        const saker = this.props.saker.filter((sak: Sak) => sak.status === this.props.sakstatus);
        return saker.length > 0
            ? saker.map((sak: Sak) => <li key={sak.saksnummer}>{this.renderSaksinformasjon(sak)}</li>)
            : <Normaltekst>Ingen saker med denne statusen</Normaltekst>;
    }

    render() {
        return (
            <React.Fragment>
                <Undertittel>{this.props.title}</Undertittel>
                <ul className="saksoversiktListDev">{this.renderSaksoversikt()}</ul>
            </React.Fragment>
        );
    }
}
export default SaksoversiktDev;