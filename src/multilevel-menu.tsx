import React, { useEffect, useRef, useState } from 'react';

import CONSTANTS from './constants';
import { MultilevelNodes, Configuration, BackgroundStyle, MultiLevelMenuProps }  from './interfaces';
import { MultilevelMenuService } from './multilevel-menu.service';
import { ListItem } from './list-item/list-item';

import './multilevel-menu.scss';
const multilevelMenuService = new MultilevelMenuService();

const detectInvalidConfig = (configuration: Configuration): { nodeConfig: Configuration, isInvalidConfig: boolean } => {
  const nodeConfig: Configuration =  {};
  let isInvalidConfig = true;
  if (configuration === null || configuration === undefined || configuration === '') {
    isInvalidConfig = true;
  } else {
    isInvalidConfig = false;
    const config = configuration;
    if (config.paddingAtStart !== undefined && config.paddingAtStart !== null && typeof config.paddingAtStart === 'boolean') {
      nodeConfig.paddingAtStart = config.paddingAtStart;
    }
    if (config.listBackgroundColor !== '' &&
      config.listBackgroundColor !== null &&
      config.listBackgroundColor !== undefined) {
      nodeConfig.listBackgroundColor = config.listBackgroundColor;
    }
    if (config.fontColor !== '' &&
      config.fontColor !== null &&
      config.fontColor !== undefined) {
      nodeConfig.fontColor = config.fontColor;
    }
    if (config.selectedListFontColor !== '' &&
      config.selectedListFontColor !== null &&
      config.selectedListFontColor !== undefined) {
      nodeConfig.selectedListFontColor = config.selectedListFontColor;
    }
    if (config.highlightOnSelect !== null &&
      config.highlightOnSelect !== undefined &&
      typeof config.highlightOnSelect === 'boolean') {
      nodeConfig.highlightOnSelect = config.highlightOnSelect;
    }
    if (config.useDividers !== null &&
      config.useDividers !== undefined &&
      typeof config.useDividers === 'boolean') {
      nodeConfig.useDividers = config.useDividers;
    }
  }
  return {
    nodeConfig,
    isInvalidConfig,
  };
}

const doDataPreprocesing = (list: MultilevelNodes[]) => {
  list = list.filter(n => !n.hidden);
  multilevelMenuService.addRandomId(list);
  return list;
}

export const MultilevelMenu = ( {list, configuration, selectedListItem, selectedLabel }: MultiLevelMenuProps) => {
  const menuRefContainer = useRef({
    isInvalidConfig: false,
  });

  const [currentNode, setCurrentNode] = useState({});

  list = doDataPreprocesing(list)

  useEffect( () => {
    const nodeConfig = detectInvalidConfig(configuration);
    console.log(nodeConfig);
  }, [configuration]);

  const getClassName = (): string => {
    if (menuRefContainer.current.isInvalidConfig) {
      return CONSTANTS.DEFAULT_CLASS_NAME;
    } else {
      if (configuration.classname !== '' && configuration.classname !== null && configuration.classname !== undefined) {
        return `${CONSTANTS.DEFAULT_CLASS_NAME} ${configuration.classname}`;
      } else {
        return CONSTANTS.DEFAULT_CLASS_NAME;
      }
    }
  }

  const getGlobalStyle = (): BackgroundStyle => {
    if (!menuRefContainer.current.isInvalidConfig &&
      configuration.backgroundColor !== '' &&
      configuration.backgroundColor !== null &&
      configuration.backgroundColor !== undefined) {
      return {
        background: configuration.backgroundColor
      }
    }
    return {}
  }

  const selectedChildItems = (event: any) => {
    if(event.onSelected && typeof event.onSelected === 'function'){
      event.onSelected();
      setCurrentNode(event);
    } else if (event.items === undefined) {
      setCurrentNode(event);
      selectedListItem(event);
    } else if(selectedLabel && event.items !== undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
      selectedLabel(event);
    }
  }

  return (
    <div className={`${getClassName()}`} style={getGlobalStyle()}>
      {list.map((node: MultilevelNodes, index: number) => (
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
