import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Dialog from './Dialog';
import IDialogProps from './IDialogProps';

export default Dialog;

export function dialog(props: IDialogProps): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const portal = document.createElement('div');
    document.body.appendChild(portal);

    const element: JSX.Element = React.createElement(
      Dialog,
      {
        ...props,
        buttons: props.buttons.map((btn) => {
          return {
            ...btn,
            action: () => {
              resolve(null);
              if (btn.closeModal) {
                unmountComponentAtNode(portal);
              }
              return btn.action();
            }
          };
        })
      }
    );

    render(
      element,
      portal
    );
  });
}