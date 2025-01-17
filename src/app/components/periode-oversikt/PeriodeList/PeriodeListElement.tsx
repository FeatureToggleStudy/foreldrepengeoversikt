import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
const moment = require('moment');
import UttakIkon from 'app/components/ikoner/UttakIkon';
import AnnenPart from 'app/api/types/sak/AnnenPart';

import './periodeListElement.less';

interface Props {
    isOpen?: boolean;
    tittel: string | React.ReactNode;
    ikon: React.ReactNode | undefined;
    beskrivelse?: string | React.ReactNode;
    melding?: string;
    tidsperiode?: any;
    erSamtidigUttak?: boolean;
    annenPart?: AnnenPart;
}

const BEM = BEMHelper('periodelisteItemHeader');

const renderDagMnd = (dato: string): JSX.Element => {
    const d = moment.utc(dato);
    return dato ? (
        <div className={BEM.element('dagmnd')}>
            <span className={BEM.element('dagmnd__dato')}>
                {d.get('date')}. {d.format('MMM')}
            </span>
            <EtikettLiten tag="span" className={BEM.element('dagmnd__mnd')}>
                <abbr title={`${d.format('MMM')} ${d.format('YYYY')}`}>{d.format('YYYY')}</abbr>
            </EtikettLiten>
        </div>
    ) : (
        <div className={BEM.element('dagmnd')}>-</div>
    );
};

const PeriodeListElement: React.FunctionComponent<Props> = ({
    ikon,
    tittel,
    beskrivelse,
    melding,
    tidsperiode,
    erSamtidigUttak,
    annenPart
}) => {
    return (
        <li className={BEM.modifier('periode')}>
            <div className={classnames(BEM.className, 'typo-normal')}>
                <div className={BEM.element('ikon')} role="presentation" aria-hidden={true}>
                    {ikon}
                </div>
                <div className={BEM.element('beskrivelse')}>
                    <div className={BEM.element('beskrivelse__tekst')}>
                        <Element tag="h1">{tittel}</Element>
                        {beskrivelse && <Normaltekst>{beskrivelse}</Normaltekst>}
                    </div>
                    {erSamtidigUttak && (
                        <div className={BEM.element('samtidig-uttak-punkt')}>
                            {annenPart ? annenPart.navn.fornavn : 'Samtidig uttak'}
                        </div>
                    )}
                </div>
                {melding && (
                    <div className={BEM.element('advarsel')}>
                        <span role="presentation">
                            <UttakIkon />
                        </span>
                    </div>
                )}
                {tidsperiode && (
                    <div className={BEM.element('tidsrom')}>
                        {renderDagMnd(tidsperiode.fom)}
                        {renderDagMnd(tidsperiode.tom)}
                    </div>
                )}
            </div>
        </li>
    );
};

export default PeriodeListElement;
