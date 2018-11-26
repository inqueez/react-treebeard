'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { VelocityComponent } from 'velocity-react';

const Loading = ({ style }) => {
    return <div style={style}>loading...</div>;
};
Loading.propTypes = {
    style: PropTypes.object
};

const Toggle = ({ style, onArrowClick }) => {
    const { height, width } = style;
    const midHeight = height * 0.5;
    const points = `0,0 0,${height} ${width},${midHeight}`;

    return (
        <div className="Arrow" style={style.base} onClick={onArrowClick}>
            <div style={style.wrapper}>
                <svg height={height} width={width}>
                    <polygon points={points}
                        style={style.arrow} />
                </svg>
            </div>
        </div>
    );
};

Toggle.propTypes = {
    style: PropTypes.object,
    onArrowClick: PropTypes.func
};

const Header = ({ node, style, onDoubleClick, onClick }) => {
    return (
        <div style={style.base} onDoubleClick={onDoubleClick} onClick={onClick}>
            <div style={style.title}>
                {node.name}
            </div>
        </div>
    );
};
Header.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func
};

class Container extends React.Component {
    render() {
        const { style, decorators, terminal, onClick, onDoubleClick, node } = this.props;

        return (
            <div
                ref={ref => this.clickableRef = ref}
                style={style.container}>
                {!terminal ? this.renderToggle() : null}

                <decorators.Header node={node}
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    style={style.header} />
            </div>
        );
    }

    renderToggle() {
        const { animations } = this.props;

        if (!animations) {
            return this.renderToggleDecorator();
        }

        return (
            <VelocityComponent animation={animations.toggle.animation}
                duration={animations.toggle.duration}
                ref={ref => this.velocityRef = ref}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }

    renderToggleDecorator() {
        const { style, decorators, onArrowClick } = this.props;

        return <decorators.Toggle style={style.toggle} onArrowClick={onArrowClick} />;
    }
}
Container.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onArrowClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired
};

export default {
    Loading,
    Toggle,
    Header,
    Container
};
