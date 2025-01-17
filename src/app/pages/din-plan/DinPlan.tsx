import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';

import { getData } from 'app/redux/util/fetchFromState';
import { State } from 'app/redux/store';
import BEMHelper from 'common/util/bem';
import Page from '../page/Page';
import CalendarIkon from 'app/components/ikoner/CalendarIkon';
import { Routes } from 'app/utils/routes';

import Person from 'app/types/Person';
import Sak from 'app/api/types/sak/Sak';
import PeriodeOversikt from 'app/components/periode-oversikt/PeriodeOversikt';
import {
    finnNåværendePerioder,
    finnFremtidigePerioder,
    finnTidligerePerioder
} from 'app/components/periode-oversikt/periodeUtils';

import './dinPlan.less';

interface Props {
    history: History;
    søker?: Person;
    sak?: Sak;
}

export const DinPlan: React.StatelessComponent<Props> = ({ history, sak, søker }) => {
    if (sak === undefined || søker === undefined || sak.perioder === undefined) {
        history.push(Routes.DINE_FORELDREPENGER);
        return null;
    }

    const { perioder } = sak;
    const cls = BEMHelper('din-plan');
    return (
        <Page
            className={cls.className}
            pageTitle={<FormattedMessage id="dinPlan.pageTitle" />}
            icon={() => <CalendarIkon />}
            title={<FormattedMessage id="dinPlan.title" />}
            onBackClick={() => history.push(Routes.DINE_FORELDREPENGER)}>
            <PeriodeOversikt
                søker={søker}
                annenPart={sak.annenPart}
                tidligerePerioder={finnTidligerePerioder(perioder!)}
                nåværendePerioder={finnNåværendePerioder(perioder!)}
                fremtidigePerioder={finnFremtidigePerioder(perioder!)}
            />
        </Page>
    );
};

const mapStateToProps = (state: State, ownProps: Props) => {
    const params = new URLSearchParams(ownProps.history.location.search);
    return {
        søker: getData(state.api.søkerinfo, {}).person,
        sak: getData(state.api.saker, []).find((saker) => saker.saksnummer === params.get('saksnummer'))
    };
};

export default connect(mapStateToProps)(DinPlan);
