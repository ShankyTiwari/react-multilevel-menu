import React, { useState } from 'react';

import { DownArrow, RightArrow } from './../indicator-arrows';
import CONSTANTS from './../constants';
import { ListItemProps, ListStyle, MultilevelNodes } from './../interfaces';
import { MultilevelMenuService } from '../multilevel-menu.service';

import './list-item.scss';

const multilevelMenuService = new MultilevelMenuService();

export const ListItem = ({
  node,
  nodeConfiguration,
  level,
  submenuLevel,
  selectedItem,
  selectedNode,
}: ListItemProps) => {
  let children = null;
  const [expanded, setExpandStatus] = useState(false);

  const makeMeVisible = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    subItem: MultilevelNodes
  ) => {
    event.stopPropagation();

    if (node.disabled) {
      return;
    }

    subItem.expanded = !subItem.expanded;
    setExpandStatus(subItem.expanded);
    selectedItem(node);
  };

  const hasItems = (item: MultilevelNodes) => {
    return Array.isArray(item.items) && item.items.length;
  };

  const getPaddingAtStart = (): boolean => {
    return nodeConfiguration.paddingAtStart ? true : false;
  };

  const getSubMenuClasses = () => {
    if (hasItems(node) && getPaddingAtStart()) {
      return `level-${level + 1} ${CONSTANTS.DEFAULT_SUBMENU_CLASS_NAME}`;
    } else {
      return `level-${level + 1}`;
    }
  };

  const isSelected = (): boolean => {
    if (nodeConfiguration.highlightOnSelect) {
      return selectedNode.id === node.id;
    }
    return multilevelMenuService.recursiveCheckId(
      node,
      selectedNode.id as string
    );
  };

  const getListIcon = (): string => {
    if (
      node.faIcon !== null &&
      node.faIcon !== undefined &&
      node.faIcon !== ''
    ) {
      return `faicon`;
    } else if (
      node.imageIcon !== null &&
      node.imageIcon !== undefined &&
      node.imageIcon !== ''
    ) {
      return `imageicon`;
    } else {
      return ``;
    }
  };

  const getListMenuClasses = (): string => {
    let className = `${CONSTANTS.DEFAULT_LIST_CLASS_NAME} level-${level} level-${level}-submenulevel-${submenuLevel}`;
    if (node.disabled) {
      className = `${className} ${CONSTANTS.DISABLED_ITEM_CLASS_NAME}`;
    }
    return className;
  };

  if (node && hasItems(node)) {
    children = (
      <div className={getSubMenuClasses()}>
        {node?.items?.map((node: MultilevelNodes, index: number) => (
          <ListItem
            key={node.label}
            nodeConfiguration={nodeConfiguration}
            level={level + 1}
            submenuLevel={index}
            selectedNode={selectedNode}
            selectedItem={selectedItem}
            node={node}
          />
        ))}
      </div>
    );
  }

  const getSelectedFaIcon = (type: string): string => {
    switch (type) {
      case 'faicon':
        if (isSelected() && node.activeFaIcon) {
          return node.activeFaIcon;
        }
        return node.faIcon as string;
      case 'imageicon':
        if (isSelected() && node.activeImageIcon) {
          return node.activeImageIcon;
        }
        return node.imageIcon as string;
      default:
        return '';
    }
  };

  const getListStyle = (): ListStyle => {
    const styles = {
      background: CONSTANTS.DEFAULT_LIST_BACKGROUND_COLOR,
      color: CONSTANTS.DEFAULT_LIST_FONT_COLOR,
    };

    if (nodeConfiguration.listBackgroundColor) {
      styles.background = nodeConfiguration.listBackgroundColor as string;
    }
    if (isSelected() && selectedNode.items === undefined) {
      nodeConfiguration.selectedListFontColor
        ? (styles.color = nodeConfiguration.selectedListFontColor as string)
        : (styles.color = CONSTANTS.DEFAULT_SELECTED_FONT_COLOR);
    } else if (nodeConfiguration.fontColor) {
      styles.color = nodeConfiguration.fontColor as string;
    }
    return styles;
  };

  const getIconJsx = () => {
    switch (getListIcon()) {
      case 'faicon':
        return (
          <div
            className={`${CONSTANTS.DEFAULT_LIST_ICON_CLASS_NAME} ${CONSTANTS.DEFAULT_LIST_ICON_FA_CLASS_NAME}`}
          >
            <i className={`${getSelectedFaIcon('faicon')}`}></i>
          </div>
        );
      case 'imageicon':
        return (
          <img
            className={CONSTANTS.DEFAULT_LIST_ICON_CLASS_NAME}
            src={getSelectedFaIcon('imageicon')}
            alt={node.label}
          />
        );
      default:
        return null;
    }
  };

  const getListDataJSX = () => {
    return (
      <div
        className={CONSTANTS.DEFAULT_LIST_WRAPPER_CLASS_NAME}
        title={node.label}
        style={getListStyle()}
        onClick={event => {
          makeMeVisible(event, node);
        }}
      >
        <div className={CONSTANTS.DEFAULT_LIST_DATA_CLASS_NAME}>
          <div className={CONSTANTS.DEFAULT_LIST_ICON_CONTAINER_CLASS_NAME}>
            {getIconJsx()}
          </div>
          {node.link ? (
            <a
              href={node.link}
              target={
                node.hrefTargetType
                  ? node.hrefTargetType
                  : CONSTANTS.DEFAULT_HREF_TARGET_TYPE
              }
              className={CONSTANTS.DEFAULT_LIST_LABEL_CLASS_NAME}
            >
              {node.label}
            </a>
          ) : (
            <div className={CONSTANTS.DEFAULT_LIST_LABEL_CLASS_NAME}>
              {node.label}
            </div>
          )}
        </div>

        {hasItems(node) && (
          <div className={CONSTANTS.DEFAULT_DIRECTION_ICON_CLASS_NAME}>
            {expanded ? <DownArrow /> : <RightArrow />}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`${getListMenuClasses()}`}>
      {getListDataJSX()}
      {nodeConfiguration.useDividers && (
        <div className={CONSTANTS.DEFAULT_DIVIDER_CLASS_NAME}></div>
      )}
      {expanded && children}
    </div>
  );
};
