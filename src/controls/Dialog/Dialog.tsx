import * as React from 'react';
import IDialogProps from './IDialogProps';
import styles from './Dialog.module.scss';

export default class Dialog extends React.Component<IDialogProps, {}> {
  constructor(props: IDialogProps) {
    super(props);
    this.state = {};
  }

  // public componentDidMount() {
  //   document.addEventListener('keydown', this.keydownEventListener);
  // }

  // public componentWillUnmount() {
  //   document.removeEventListener('keydown', this.keydownEventListener);
  // }

  // private keydownEventListener(e: any) {
  //   switch (e.key) {
  //     case 'Enter':
  //       (document
  //         .getElementsByClassName(styles.dialog)[0]
  //         .getElementsByClassName(styles.modalFooter)[0]
  //         .querySelector('[data-action="confirm"]') as any)
  //         .click();
  //       break;
  //     case 'Escape':
  //       break;
  //   }
  // }

  public render(): JSX.Element {
    console.log(this.props);
    const { title, content, buttons } = this.props;

    return (
      <div className={[styles.dialog, this.props.className].join(' ')}>
        <div className={styles.modal}>

          {
            title && title.trim() !== '' &&
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>{title}</span>
            </div>

          }

          <div className={styles.modalBody}>
            {content}
          </div>

          <div className={styles.modalFooter}>
            <div>
              {
                buttons.filter((btn) => btn.align === 'start').map((btn) => (
                  <button
                    data-action={btn.label}
                    onClick={btn.action}
                    disabled={btn.disabled}
                  >
                    {btn.label}
                  </button>
                ))
              }
            </div>
            <div>
              {
                buttons.filter((btn) => btn.align === 'center').map((btn) => (
                  <button
                    data-action={btn.label}
                    onClick={btn.action}
                    disabled={btn.disabled}
                  >
                    {btn.label}
                  </button>
                ))
              }
            </div>
            <div>
              {
                buttons.filter((btn) => btn.align === 'end').map((btn) => (
                  <button
                    data-action={btn.label}
                    onClick={btn.action}
                    disabled={btn.disabled}
                  >
                    {btn.label}
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}