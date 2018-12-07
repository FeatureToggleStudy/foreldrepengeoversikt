import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import BEMHelper from '../../../common/util/bem';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { annenInformasjonLenker } from '../../utils/lenker';

import './annenInformasjon.less';
import ExternalLinkIcon from '../ikoner/ExternalLinkIcon';

const AnnenInformasjon = () => {
    const cls = BEMHelper('annenInformasjon');
    return (
        <>
            <Undertittel className={cls.element('subheader')}>
                <FormattedMessage id={'annenInformasjon.header'} />
            </Undertittel>
            <div className={cls.className}>
                <nav className={cls.element('links')}>
                    {Object.values(annenInformasjonLenker).map((link) => (
                        <div key={link.href} className={cls.element('link-container')}>
                            <Lenke className={cls.element('link')} href={link.href}>
                                <Normaltekst>{link.text}</Normaltekst>
                                <ExternalLinkIcon className={cls.element('link-icon')} height={15} width={15}/>
                            </Lenke>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};
export default AnnenInformasjon;
