'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { VelocityTransitionGroup } from 'velocity-react';
import styled from '@emotion/styled';

import NodeHeader from './header';

const Li = styled('li', {
    shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1
})(({ style }) => style);
const Ul = styled('ul', {
    shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1
})(({ style }) => style);

class TreeNode extends React.Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.onArrowClick = this.onArrowClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }

    onClick() {
        const { node, onToggle } = this.props;
        const { toggled } = node;

        if (onToggle) {
            onToggle(node, !toggled);
        }
    }

    onArrowClick() {
        const { node, onArrowClick } = this.props;
        const { toggled } = node;
        if (onArrowClick) {
            onArrowClick(node, !toggled);
        }
    }

    onDoubleClick() {
        const { node, onDoubleClick } = this.props;
        const { toggled } = node;
        if (onDoubleClick) {
            onDoubleClick(node, !toggled);
        }
    }

    animations() {
        const { animations, node } = this.props;

        if (animations === false) {
            return false;
        }

        const anim = Object.assign({}, animations, node.animations);
        return {
            toggle: anim.toggle(this.props),
            drawer: anim.drawer(this.props)
        };
    }

    decorators() {
        // Merge Any Node Based Decorators Into The Pack
        const { decorators, node } = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }

    render() {
        const { style } = this.props;
        const decorators = this.decorators();
        const animations = this.animations();

        return (
            <Li ref={ref => this.topLevelRef = ref}
                style={style.base}>
                {this.renderHeader(decorators, animations)}

                {this.renderDrawer(decorators, animations)}
            </Li>
        );
    }

    renderDrawer(decorators, animations) {
        const { node: { toggled } } = this.props;

        if (!animations && !toggled) {
            return null;
        } else if (!animations && toggled) {
            return this.renderChildren(decorators, animations);
        }

        const { ...restAnimationInfo } = animations.drawer;
        return (
            <VelocityTransitionGroup {...restAnimationInfo}
                ref={ref => this.velocityRef = ref}>
                {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
        );
    }

    renderHeader(decorators, animations) {
        const { node, style } = this.props;

        if (!node.children && node.type === 'folder') {
            node.children = [{ name: '(Empty)', key: -1, __virtual: true }];
        }

        return (
            <NodeHeader animations={animations}
                decorators={decorators}
                node={Object.assign({}, node)}
                onClick={this.onClick}
                onArrowClick={this.onArrowClick}
                onDoubleClick={this.onDoubleClick}
                style={style} />
        );
    }

    renderChildren(decorators) {
        const { animations, decorators: propDecorators, node, style } = this.props;

        if (node.loading) {
            return this.renderLoading(decorators);
        }

        let children = node.children;
        if (!Array.isArray(children)) {
            children = children ? [children] : [];
        }

        return (
            <Ul style={style.subtree}
                ref={ref => this.subtreeRef = ref}>
                {children.map((child, index) => <TreeNode {...this._eventBubbles()}
                    animations={animations}
                    decorators={propDecorators}
                    key={child.id || index}
                    node={child}
                    style={style} />
                )}
            </Ul>
        );
    }

    renderLoading(decorators) {
        const { style } = this.props;

        return (
            <Ul style={style.subtree}>
                <li>
                    <decorators.Loading style={style.loading} />
                </li>
            </Ul>
        );
    }

    _eventBubbles() {
        const { onToggle, onArrowClick, onDoubleClick } = this.props;
        return {
            onToggle,
            onArrowClick,
            onDoubleClick
        };
    }
}

TreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    onToggle: PropTypes.func,
    onArrowClick: PropTypes.func,
    onDoubleClick: PropTypes.func
};

export default TreeNode;
