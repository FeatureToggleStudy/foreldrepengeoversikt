import * as React from 'react';
import LukkInfoIkon from 'common/components/ikoner/LukkInfoIkon';
import InfoIkon from 'common/components/ikoner/InfoIkon';
import { Collapse } from 'react-collapse';
const classNames = require('classnames');
import './infoboks.less';
import Sirkelknapp, { Stil } from 'common/components/sirkelknapp/Sirkelknapp';

interface InfoboksProps {
    tekst: string;
    stil?: Stil;
}

interface InfoboksState {
    isExpanded: boolean;
}

class Infoboks extends React.Component<InfoboksProps, InfoboksState> {
    constructor(props: InfoboksProps) {
        super(props);

        this.state = {
            isExpanded: false
        };

        this.toggleIsExpanded = this.toggleIsExpanded.bind(this);
    }

    toggleIsExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    render() {
        const { tekst, stil = 'info' } = this.props;
        const { isExpanded } = this.state;

        const ikon = isExpanded ? <LukkInfoIkon /> : <InfoIkon />;

        return (
            <React.Fragment>
                <Sirkelknapp
                    stil={stil}
                    ariaLabel={tekst}
                    onClick={this.toggleIsExpanded}
                    ikon={ikon}
                    toggle={{ pressed: isExpanded }}
                />
                <Collapse
                    hasNestedCollapse={true}
                    className={classNames('infoboks', {
                        'infoboks--open': isExpanded
                    })}
                    isOpened={isExpanded}
                    springConfig={{ stiffness: 250, damping: 30 }}>
                    <div className="infoboks__wrapper">{tekst}</div>
                </Collapse>
            </React.Fragment>
        );
    }
}

export default Infoboks;
