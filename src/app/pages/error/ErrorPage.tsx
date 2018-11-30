import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import Lenke from 'nav-frontend-lenker';
import { History } from 'history';

import BEMHelper from 'common/util/bem';
import Feilsidemelding from 'common/components/feilsidemelding/Feilsidemelding';
import getMessage from 'common/util/i18nUtils';
import { lenker } from '../../utils/lenker';
import './errorPage.less';

export interface ErrorPageProps {
    history: History;
}

export interface State {
    errorStatusCode?: number;
    errorMessage: string;
    timeout?: boolean;
}

type Props = ErrorPageProps & InjectedIntlProps;
class ErrorPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...this.props.history.location.state
        };
    }

    componentWillMount(): void {
        if (!this.state.errorStatusCode && !this.state.timeout) {
            this.props.history.push('/');
        }
    }

    render() {
        const { intl } = this.props;
        const errorMessage =
            this.state.errorStatusCode === 413 && this.state.errorMessage ? (
                this.state.errorMessage
            ) : (
                <FormattedMessage
                    id={'feilside.ingress'}
                    values={{
                        lenke: (
                            <Lenke href={lenker.brukerstøtte.href}>{getMessage(intl, 'feilside.ingress.lenke')}</Lenke>
                        )
                    }}
                />
            );

        const cls = BEMHelper('error-page');
        return (
            <div id={cls.className}>
                <Feilsidemelding
                    illustrasjon={{
                        tittel: getMessage(intl, 'feilside.bobletittel'),
                        tekst: getMessage(intl, 'feilside.bobletekst')
                    }}
                    tittel={getMessage(intl, 'feilside.tittel')}
                    ingress={errorMessage}
                />
            </div>
        );
    }
}

export default injectIntl(ErrorPage);
