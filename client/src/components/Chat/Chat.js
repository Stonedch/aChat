import React from "react";
import style from './Chat.module.css'

import cancel from './cancel.svg'


function Chat() {


  return (
    <div className={` ${style.container}`}>
      <div className={style.chat}>

        <div className={`${style.chat__header} ${style.flex}`}>
          <div className={`${style.chat__profile} ${style.flex}`}>

            <div className={`${style.img} ${style.flex}`}>
              <div className={style.circle}>
                <p className={style.hashtag} >#</p>
              </div>

              <div className={style.describes}>
                <h1 className={style.name}>Аноним</h1>
                <p className={style.hobbies}>Танцую, играю на скрипке.</p>
              </div>
            </div>

          </div>

          <div className={style.chat__header_warning}>
            <img src={cancel} alt="cancel" />
          </div>
        </div>

        <div className={style.chat__messages}>
          <ul className={style.chat__list}>
            <li className={`${style.chat__message} ${style.flex}`}>

              <div className={`${style.view} ${style.flex}`}></div>

              <div className={style.img}>
                <div className={style.circle}>
                  <p className={style.hashtag} >#</p>
                </div>
              </div>

              <div className={style.chat__message_text}>
                Привет, как дела ?
              </div>

              <div className={style.chat__mesage_time}>
                <p>20:32</p>
              </div>
            </li>
          </ul>

        </div>

        <div className={`${style.chat__warnings} ${style.flex}`}>
          <button className={style.chat__warnings_text}>Пожаловатся</button>
          <button className={style.chat__warnings_text}>Отключиться</button>
          <button className={style.chat__warnings_text}>Отмена</button>
        </div>

        <div className={style.chat__form}>
          <textarea id='message' class={style.message} autoComplete='off' placeholder='Введите сообщение...' />
          <div className={style.chat__formContainer}>
            <button className={style.chat__form_button}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
