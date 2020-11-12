# react-multilevel-menu

Multi-Level Menu for React Projects.

## Why react-multilevel-menu?

The main goal of this package is to deliver a slim and Skinny Multi-Level Menu for React Projects. That can fit into any kind of projects with no muss, no fuss. Within few lines, you will get an animation ready multilevel list that just works.

## Demo

Check the Multi-Level Menu in action, [click here](https://demo.codershood.info/react-multilevel-menu/).

## Features
2. [FontAwesome Icons](https://fontawesome.com/v4.7.0/icons/) are supported.
3. Use images as icons in the list.

## Installation
You can use either the npm or yarn command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

#### NPM
```  
npm install --save react-multilevel-menu
```
        
#### YARN
```          
yarn add --save react-multilevel-menu
```
        
## Usage
Follow below steps to add multi level list in your project

#### 1. Import `MultilevelMenu` fromm `react-multilevel-menu`

```tsx
import { MultilevelMenu } from 'react-multilevel-menu';

import {list, configurations} from './constants'; // Your Menu Array and configuration Object


const App = () => {
  const selectedItem = (event) => {
    console.log(event);
  }

  return (
    <div className="app__page-container">
        <MultilevelMenu 
        list={list} 
        configuration={configurations} 
        selectedListItem={selectedItem} 
        selectedLabel={selectedItem}
      />
    </div>
  );
};

export default App
```  

#### 2. Structure of array to display the list

Make sure you structure of array should look like array shown below,     
```typescript
const list: MultilevelNodes[] = [
    {
        label: 'NPM',
        faIcon: 'fab fa-500px',
        link: 'https://www.npmjs.com/package/ng-material-multilevel-menu',
        hrefTargetType: '_blank' // _blank|_self|_parent|_top|framename
    },
    {
        label: 'Item 1 (with Font awesome icon)',
        imageIcon: '/batman.jpg',
        activeImageIcon: '/ironman.jpg',
        items: [
            {
                label: 'Item 1.1',
                faIcon: 'fab fa-accusoft',
                onSelected: function() {
                    console.log('Item 1.2.2.1');
                }
            },
            {
                label: 'Item 1.2',
                faIcon: 'fab fa-accessible-icon',
                items: [
                    {
                        label: 'Item 1.2.1',
                        faIcon: 'fas fa-allergies',
                        onSelected: function() {
                            console.log('Item 1.2.2.1');
                        }
                    },
                    {
                        label: 'Item 1.2.2',
                        faIcon: 'fas fa-ambulance',
                        items: [
                            {
                                label: 'Item 1.2.2.1',
                                faIcon: 'fas fa-anchor',
                                onSelected: function() {
                                    console.log('Item 1.2.2.1');
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Item 2',
        faIcon: 'fas fa-anchor', 
        items: [
            {
                label: 'Item 2.1',
                faIcon: 'fab fa-accusoft',
                activeFaIcon: 'fab fa-accusoft',
                disabled: true,
            },
            {
                label: 'Item 2.2',
                faIcon: 'fas fa-anchor', 
                activeFaIcon: 'fab fa-accusoft',
            }
        ]
    },
    {
        label: 'Item 3',
        faIcon: 'fab fa-accusoft',
        activeFaIcon: 'fas fa-anchor', 
        onSelected: function() {
            console.log('Item 3');
        }
    },
    {
        label: 'Item 4',
        link: '/item-4',
        faIcon: 'fab fa-accusoft',
        hidden: true
    }
];
```

## Menu Configuration

- Using ```configuration```, You can customise the appearance of the list.
    * ```paddingAtStart: boolean``` => *[optional]* If you don't want padding at the start of the list item, then you can give ```false```. The default value will be ```true```.
    * ```highlightOnSelect: boolean``` => *[optional]* If you want to highlight the clicked item in the list, then you can do that by making it ```true```. The default value will be ```false```.
    * ```useDividers: boolean``` => *[optional]* If you want to the list to have dividers. The default value will be ```true```.
    * ```classname: string;``` => *[optional]* You can give your own custom class name in order to modify the list appearance. 
    * ```listBackgroundColor: string;``` => *[optional]* You can apply custom color to the background of the list.
    * ```fontColor: string;``` => *[optional]* Changes the color of Text and icons inside the list.
    * ```backgroundColor: string;``` => *[optional]* This will change the background color list container.
    * ```selectedListFontColor: string;``` => *[optional]* This will change the font color of selected list item.

Below is example how you can apply different background and Font colors,
```typescript
config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: `rgb(208, 241, 239)`,
    fontColor: `rgb(8, 54, 71)`,
    backgroundColor: `rgb(208, 241, 239)`,
    selectedListFontColor: `red`,
    highlightOnSelect: true,
    useDividers: false,
};
```

## Default classes
* ```selected-amml-item```: This class will be applied to currently selected link and it's father links.
* ```active-amml-item```: This class will be applied to currently selected link.

## Contribution

I welcome you to fork and add more features into it. If you have any bugs or feature request, please create an issue at [github repository](https://github.com/ShankyTiwari/react-multilevel-menu/issues).


## Thanks

This Project is build using [tsdx](https://tsdx.io/).

## License

MIT
