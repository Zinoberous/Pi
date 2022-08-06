import React, { useState, useEffect } from 'react';
import IPiProps from './IPiProps';
import styles from './Pi.module.scss';

import { dialog } from '../../controls/Dialog';

// https://www.codegrepper.com/code-examples/typescript/numbers+of+pi
const pi: string = /*3,14*/'15926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

const Pi = (props: IPiProps) => {
  // state
  const [ value, setValue ] = useState('');
  const [ score, setScore ] = useState(0);
  const [ readonly, setReadonly ] = useState(false);

  // set background
  useEffect(() => {
    const backgrounds: string[] = [
      'https://t3.ftcdn.net/jpg/00/88/98/18/360_F_88981880_YjJManMJ6hJmKr5CZteFJAkEzXIh8mxW.jpg',
      'https://cdn.pixabay.com/photo/2020/03/22/06/57/game-background-4956017_1280.jpg',
      'https://img.itch.zone/aW1nLzMzODYxNzIucG5n/original/YN33A5.png',
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/03d6d1a5-7133-460b-a65f-b403f180281d/d5vi8b0-9925c151-97d4-4318-8a23-af91c8f561d5.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAzZDZkMWE1LTcxMzMtNDYwYi1hNjVmLWI0MDNmMTgwMjgxZFwvZDV2aThiMC05OTI1YzE1MS05N2Q0LTQzMTgtOGEyMy1hZjkxYzhmNTYxZDUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.SfgmKdiABXpQz-k-iP3SigdD7kEKyW751j81SvoZD3Y',
      'https://i.ytimg.com/vi/f9OSSl3ndRo/maxresdefault.jpg',
      'https://pressstart.vip/images/uploads/assets/cityskyline.png',
      'https://wallpaperaccess.com/full/3995243.jpg',
      'https://cdn.wallpapersafari.com/99/68/Hbios0.png',
      'https://cdnb.artstation.com/p/assets/images/images/026/540/413/large/vinayak-chetti-main-file.jpg?1589045389',
      'https://www.pewpewpew.de/wp-content/uploads/2013/04/oUMTTo6.gif'
    ];

    (document.body as any).style = `
      background-image: url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]});
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: 100% 100%;
    `;
  }, []);

  // handle value change
  useEffect(() => {
    if (value && value.trim() !== '') {
      if (compareValueToPi(value)) {
        if (value.length > score) {
          setScore(value.length);
        }
      } else {
        setReadonly(true);
        dialog({
          content: (
            <>
              <div>
                <span>3,14{value.substring(0,value.length-1)}</span>
                <span style={{ color: 'lightpink', fontWeight: 'bold' }}>{value.slice(-1)}</span>
              </div>
              <div>
                <span>3,14{pi.substring(0,value.length-1)}</span>
                <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>{pi.substring(0,value.length).slice(-1)}</span>
              </div>
            </>
          ),
          buttons: [{
            label: 'OK',
            action: () => Promise.resolve(),
            closeModal: true,
            align: 'end'
          }],
          className: styles.modal
        }).then(() => {
          setValue('');
          setReadonly(false);
        })
      }
    }
  }, [value]);

  // handle keypress
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (!readonly && [0,1,2,3,4,5,6,7,8,9].includes(parseInt(e.key))) {
        const input: string = value + e.key;

        // set button color
        const target = document.querySelector(`[data-value='${e.key}']`) as any;
        if (compareValueToPi(input)) {
          target.style = 'background-color: lightgreen; border: unset;';
        } else {
          target.style = 'background-color: lightpink; border: unset';
        }

        setValue(input);
      }
    }

    // reset button color
    const handleKeyUp = (e: any) => {
      Array.from(document.getElementsByClassName(styles.numpad)[0].childNodes).forEach((node: any) => {
        node.style = '';
      });
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [value,readonly])

  const compareValueToPi = (val: string) => {
    if (pi.substring(0, val.length) === val) {
      return true;
    } else {
      return false;
    }
  }

  const showPi = () => {
    setReadonly(true);
    dialog({
      title: 'Pi',
      content: (
        <>
          <span style={{ fontWeight: 'bold' }}>3,14</span>
          <span style={{ color: '#4ce74c' }} >{pi.toString().substring(0,score)}</span>
          <span>{pi.substring(score)}</span>
        </>
      ),
      buttons: [{
        label: 'OK',
        action: () => Promise.resolve(),
        closeModal: true,
        align: 'end'
      }],
      className: styles.modal
    }).then(() => {
      setValue('');
      setReadonly(false);
    });
  }

  return (
    <div
      className={styles.pi}
      onMouseDown={(e) => {
        const target = (e.target as any);
        if (target.parentElement?.className === styles.numpad) {
          if (compareValueToPi(value + target.innerHTML)) {
            target.style = 'background-color: lightgreen; border: unset;';
          } else {
            target.style = 'background-color: lightpink; border: unset';
          }
        }
      }}
      onMouseUp={() => {
        Array.from(document.getElementsByClassName(styles.numpad)[0].childNodes).forEach((node: any) => {
          node.style = '';
        });
      }}
    >
      <div className={styles.header}>
        <p>Pi Vaccine<span>©</span></p>
        <img src='./assets/pie.png' />
      </div>

      <div className={styles.score}>
        Hi-Score: {score}
      </div>

      <div className={styles.value}>
        <span><b>3,14</b> {value}</span>
      </div>

      <div className={styles.numpad}>
        <button onClick={() => setValue(value + '7')} data-value={7}>7</button>
        <button onClick={() => setValue(value + '8')} data-value={8}>8</button>
        <button onClick={() => setValue(value + '9')} data-value={9}>9</button>
        <button onClick={() => setValue(value + '4')} data-value={4}>4</button>
        <button onClick={() => setValue(value + '5')} data-value={5}>5</button>
        <button onClick={() => setValue(value + '6')} data-value={6}>6</button>
        <button onClick={() => setValue(value + '1')} data-value={1}>1</button>
        <button onClick={() => setValue(value + '2')} data-value={2}>2</button>
        <button onClick={() => setValue(value + '3')} data-value={3}>3</button>
        <button onClick={() => setValue(value + '0')} data-value={0}>0</button>

        <button>
          <img
            src='./assets/pi.png'
            alt='π'
            title='Schauen Sie sich Pi an, aber Ihr aktueller Fortschritt geht verloren!'
            onClick={() => showPi()}
          />
        </button>

      </div>
    </div>
  );
}

export default Pi;