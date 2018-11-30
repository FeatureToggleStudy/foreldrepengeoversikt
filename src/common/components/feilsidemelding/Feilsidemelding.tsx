import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { VeilederProps } from '../veileder/Veileder';
import VeilederMedSnakkeboble from '../veileder-med-snakkeboble/VeilederMedSnakkeboble';
import Block from 'common/components/block/Block';

import './feilsidemelding.less';

export interface Props {
    containerId?: string;
    illustrasjon?: {
        tittel: string;
        tekst: React.ReactNode;
        lenke?: {
            url: string;
            tekst: string;
        };
        veileder?: VeilederProps;
    };
    tittel: React.ReactNode;
    ingress: React.ReactNode;
    language?: string;
    setLanguage?: (languageCode: string) => void;
}

const Feilsidemelding: React.StatelessComponent<Props> = ({
    containerId,
    illustrasjon,
    tittel,
    ingress
}) => {
    return (
        <div id={containerId}>
            {illustrasjon && (
                <VeilederMedSnakkeboble
                    veileder={illustrasjon.veileder}
                    dialog={{
                        title: illustrasjon.tittel,
                        text: (
                            <div>
                                <div>{illustrasjon.tekst}</div>

                                {illustrasjon.lenke && (
                                    <Lenke className="intro-snakkelenke" href={illustrasjon.lenke.url}>
                                        {illustrasjon.lenke.tekst}
                                    </Lenke>
                                )}
                            </div>
                        )
                    }}
                />
            )}
            <div className="responsiveContainer">
                <Block margin={'s'}>
                    <Innholdstittel>{tittel}</Innholdstittel>
                </Block>
                <Block margin={'l'}>
                    <Ingress>{ingress}</Ingress>
                </Block>
            </div>
        </div>
    );
};

export default Feilsidemelding;
