import * as React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { History } from 'history';
import { guid } from 'nav-frontend-js-utils';
import moment from 'moment';

import Sak from '../../api/types/sak/Sak';
import EkspanderbarSaksoversikt from '../../components/saksoversikt/saksoversikt-ekspanderbar/EkspanderbarSaksoversikt';
import Header from '../../components/header/Header';
import BEMHelper from '../../../common/util/bem';
import RelatertInformasjon from 'app/components/relatert-informasjon/RelatertInformasjon';
import IngenSaker from 'app/components/ingen-saker/IngenSaker';
import {
    erInfotrygdSak,
    opprettFiktivSak,
    harSøkt,
    skalKunneSøkeOmEndring,
    erSvangerskapepengesak
} from '../../utils/sakerUtils';
import Sidepanel from '../../components/sidepanel/Sidepanel';
import Saksoversikt from '../../components/saksoversikt/saksoversikt-main/Saksoversikt';

import { StorageKvittering } from '../../api/types/StorageKvittering';
import Behandling from 'app/api/types/sak/Behandling';
import { State } from 'app/redux/store';
import { getData } from 'app/redux/util/fetchFromState';
import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';

import MinidialogLenkepanel from 'app/components/minidialog-lenkepanel/MinidialogLenkepanel';
import { MinidialogInnslag } from 'app/api/types/MinidialogInnslag';
import { Søkerinfo } from 'app/types/Søkerinfo';

import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedHTMLMessage } from 'react-intl';
import { Hendelse } from 'app/api/types/historikk/Hendelse';

import './dineForeldrepenger.less';

interface Props {
    saker: Sak[];
    storageKvittering?: StorageKvittering;
    søkerinfo?: Søkerinfo;
    history: History;
    historikkInnslagListe: HistorikkInnslag[];
    minidialogInnslagListe: MinidialogInnslag[];
}

export class DineForeldrepenger extends React.Component<Props> {
    shouldRenderStorageKvitteringAsSak(): boolean {
        const { saker, storageKvittering } = this.props;
        if (storageKvittering === undefined || storageKvittering.innsendingstidspunkt === undefined) {
            return false;
        }

        if (saker.length === 0) {
            return true;
        }

        if (erInfotrygdSak(saker[0])) {
            return saker.every((sak: Sak) => moment(sak.opprettet).isBefore(storageKvittering.innsendingstidspunkt));
        }

        return (
            saker.every((sak: Sak) => moment(sak.opprettet).isBefore(storageKvittering.innsendingstidspunkt)) &&
            saker[0].behandlinger !== undefined &&
            saker[0].behandlinger.every((b: Behandling) =>
                moment(b.endretTidspunkt).isBefore(storageKvittering.innsendingstidspunkt, 'days')
            )
        );
    }

    renderSaksoversiktList(nyesteSak: Sak) {
        const { saker, history, historikkInnslagListe, søkerinfo } = this.props;
        const cls = BEMHelper('saksoversikt-list');
        return (
            <ul className={cls.className}>
                {saker
                    .filter((s: Sak) => s.saksnummer !== nyesteSak.saksnummer)
                    .map((sak: Sak) => {
                        return (
                            <li className={cls.element('element')} key={sak.saksnummer}>
                                <EkspanderbarSaksoversikt
                                    søkerinfo={søkerinfo}
                                    sak={sak}
                                    history={history}
                                    historikkInnslagListe={historikkInnslagListe}
                                />
                            </li>
                        );
                    })}
            </ul>
        );
    }

    renderSidepanel(sak?: Sak) {
        const cls = BEMHelper('sak-info-panel');
        return (
            <div className={cls.className}>
                <Sidepanel sak={sak} />
            </div>
        );
    }

    shouldRenderAlertStripe(sak: Sak): boolean {
        return (
            (!this.props.historikkInnslagListe.find(({ hendelse }) => hendelse === Hendelse.InitiellForeldrepenger) &&
                (harSøkt(sak) && !skalKunneSøkeOmEndring(sak) && !erSvangerskapepengesak(sak))) ||
            erInfotrygdSak(sak)
        );
    }

    renderAlertStripe() {
        return (
            <AlertStripe type="info">
                <FormattedHTMLMessage id="dineForeldrepenger.alertstripe" />
            </AlertStripe>
        );
    }

    render() {
        const {
            saker,
            history,
            storageKvittering,
            søkerinfo,
            historikkInnslagListe,
            minidialogInnslagListe
        } = this.props;
        const nyesteSak: Sak | undefined = this.shouldRenderStorageKvitteringAsSak()
            ? opprettFiktivSak(storageKvittering!)
            : saker.slice().shift();

        const cls = BEMHelper('dine-foreldrepenger');
        return (
            <>
                <Header saker={saker} history={this.props.history} />
                <div className={cls.className}>
                    <div className={cls.element('main-content')}>
                        {nyesteSak === undefined && <IngenSaker />}
                        {nyesteSak && this.shouldRenderAlertStripe(nyesteSak) && this.renderAlertStripe()}

                        {minidialogInnslagListe &&
                            minidialogInnslagListe.map((minidialogInnslag) => (
                                <MinidialogLenkepanel key={guid()} minidialogInnslag={minidialogInnslag} />
                            ))}

                        {nyesteSak && (
                            <>
                                <Saksoversikt
                                    sak={nyesteSak}
                                    søkerinfo={søkerinfo}
                                    history={history}
                                    historikkInnslagListe={historikkInnslagListe}
                                    withHeader={true}
                                />
                                {this.renderSaksoversiktList(nyesteSak)}
                            </>
                        )}

                        <MediaQuery maxWidth={1114}>{this.renderSidepanel(nyesteSak)}</MediaQuery>
                        <RelatertInformasjon />
                    </div>

                    <MediaQuery minWidth={1115}>
                        <div className={cls.element('sidepanel-desktop')}>{this.renderSidepanel(nyesteSak)}</div>
                    </MediaQuery>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    søkerinfo: getData(state.api.søkerinfo, {}),
    saker: getData(state.api.saker, []),
    storageKvittering: getData(state.api.storageKvittering, undefined),
    historikkInnslagListe: getData(state.api.historikk, undefined),
    minidialogInnslagListe: getData(state.api.minidialogInnslagListe, [])
});

export default connect(mapStateToProps)(DineForeldrepenger);
