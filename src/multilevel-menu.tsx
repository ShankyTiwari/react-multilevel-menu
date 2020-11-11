import React, { useEffect, useState } from 'react';

import CONSTANTS from './constants';
import {
  MultilevelNodes,
  BackgroundStyle,
  MultiLevelMenuProps,
} from './interfaces';
import { MultilevelMenuService } from './multilevel-menu.service';
import { ListItem } from './list-item/list-item';

import './multilevel-menu.scss';
const multilevelMenuService = new MultilevelMenuService();

export const MultilevelMenu = ({
  list,
  configuration,
  selectedListItem,
  selectedLabel,
}: MultiLevelMenuProps) => {
  let isInvalidConfig =
    configuration === null ||
    configuration === undefined ||
    configuration === '';
  const [currentNode, setCurrentNode] = useState<MultilevelNodes>({});
  const [memorizedList, setMemorizedList] = useState<MultilevelNodes[]>([]);

  (() => {
    if (!list || (Array.isArray(list) && list.length < 1)) {
      isInvalidConfig = true;
    }
  })();

  useEffect(() => {
    list = list.filter(n => !n.hidden);
    multilevelMenuService.addRandomId(list);
    setMemorizedList(list);
  }, []);

  const getClassName = (): string => {
    if (isInvalidConfig) {
      return CONSTANTS.DEFAULT_CLASS_NAME;
    } else {
      if (
        configuration.classname !== '' &&
        configuration.classname !== null &&
        configuration.classname !== undefined
      ) {
        return `${CONSTANTS.DEFAULT_CLASS_NAME} ${configuration.classname}`;
      } else {
        return CONSTANTS.DEFAULT_CLASS_NAME;
      }
    }
  };

  const getGlobalStyle = (): BackgroundStyle => {
    if (
      !isInvalidConfig &&
      configuration.backgroundColor !== '' &&
      configuration.backgroundColor !== null &&
      configuration.backgroundColor !== undefined
    ) {
      return {
        background: configuration.backgroundColor,
      };
    }
    return {};
  };

  const selectedChildItems = (event: any) => {
    if (event.onSelected && typeof event.onSelected === 'function') {
      event.onSelected();
      setCurrentNode(event);
    } else if (event.items === undefined) {
      setCurrentNode(event);
      selectedListItem(event);
    } else if (
      selectedLabel &&
      event.items !== undefined &&
      (!event.onSelected || typeof event.onSelected !== 'function')
    ) {
      selectedLabel(event);
    }
    if (configuration.highlightOnSelect) {
      setCurrentNode(event);
    }
  };

  if (isInvalidConfig) {
    return (
      <div className={`${getClassName()}`}>
        <div className={CONSTANTS.DEFAULT_ERROR_CLASS_NAME}>
          {CONSTANTS.ERROR_MESSAGE}
        </div>
      </div>
    );
  }

  return (
    <div className={`${getClassName()}`} style={getGlobalStyle()}>
      {memorizedList.map((node: MultilevelNodes, index: number) => (
        <ListItem
          key={node.label}
          nodeConfiguration={configuration}
          level={0}
          submenuLevel={index}
          selectedNode={currentNode}
          selectedItem={selectedChildItems}
          node={node}
        />
      ))}
    </div>
  );
};
