import * as React from 'react';
import { History } from 'history';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import BEMHelper from 'common/util/bem';
import Sak from '../../../types/Sak';
import EkspanderbarSaksoversiktHeader from './EkspanderbarSaksoversiktHeader';
import Person from '../../../types/Personinfo';
import Saksoversikt from '../saksoversikt-main/Saksoversikt';

import './ekspanderbarSaksoversikt.less';

interface Props {
    person?: Person;
    sak: Sak;
    history: History;
}

const EkspanderbarSaksoversikt: React.FunctionComponent<Props> = (props) => {
    const { sak, person, history } = props;
    const cls = BEMHelper('ekspanderbar-saksoversikt');
    return (
        <div className={cls.className}>
            <EkspanderbartpanelBase
                heading={<EkspanderbarSaksoversiktHeader sak={sak} />}
                ariaTittel="">
                <Saksoversikt sak={sak} history={history} person={person} />
            </EkspanderbartpanelBase>
        </div>
    );
};

export default EkspanderbarSaksoversikt;