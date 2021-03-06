import { MultilevelNodes } from './interfaces';

export class MultilevelMenuService {
  foundLinkObject: MultilevelNodes | null = null;
  generateId(): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  addRandomId(nodes: MultilevelNodes[]): void {
    nodes.forEach((node: MultilevelNodes) => {
      node.id = this.generateId();
      if (node.items !== undefined) {
        this.addRandomId(node.items);
      }
    });
  }
  recursiveCheckId(node: MultilevelNodes, nodeId: string): boolean {
    if (node.id === nodeId) {
      return true;
    }
    if (node.items !== undefined) {
      return node.items.some((nestedNode: MultilevelNodes) => {
        return this.recursiveCheckId(nestedNode, nodeId);
      });
    } else {
      return false;
    }
  }
}
