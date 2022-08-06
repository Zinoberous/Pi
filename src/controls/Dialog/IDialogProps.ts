export default interface IDialogProps {
  title?: string;
  content: string | JSX.Element;
  buttons: {
    label: string;
    action: () => Promise<any>;
    closeModal: boolean;
    align: 'start'|'center'|'end';
    disabled?: boolean;
  }[];
  className?: string
}