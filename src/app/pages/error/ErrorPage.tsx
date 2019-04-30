import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';

import BEMHelper from 'common/util/bem';
import Feilsidemelding from 'common/components/feilsidemelding/Feilsidemelding';
import getMessage from 'common/util/i18nUtils';
import { lenker } from '../../utils/lenker';

import './errorPage.less';

export interface ErrorPageProps {
    errorMessage?: string;
    uuid?: string;
}

type Props = ErrorPageProps & InjectedIntlProps;
class ErrorPage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { errorMessage, intl, uuid } = this.props;
        const cls = BEMHelper('error-page');
        return (
            <div className={cls.className}>
                <Feilsidemelding
                    illustrasjon={{
                        tittel: getMessage(intl, 'feilside.bobletittel'),
                        tekst: getMessage(intl, 'feilside.bobletekst')
                    }}
                    tittel={getMessage(intl, 'feilside.tittel')}
                    ingress={
                        errorMessage ? (
                            errorMessage
                        ) : (
                            <FormattedMessage
                                id="feilside.ingress"
                                values={{
                                    lenke: (
                                        <Lenke href={lenker.brukerstøtte}>
                                            {getMessage(intl, 'feilside.ingress.lenke')}
                                        </Lenke>
                                    )
                                }}
                            />
                        )
                    }
                    uuid={uuid}
                />
            </div>
        );
    }
}

export default injectIntl(ErrorPage);
