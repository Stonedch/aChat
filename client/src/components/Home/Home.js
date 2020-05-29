import React, { useState, useEffect, useReducer } from "react"
import Modal from 'react-modal';
import './Home.css';
import reducer from './reducer'
import { useHTTP } from "../../hooks/http";


export const Home = () => {
  Modal.setAppElement(document.getElementById('home'));

  //   const [user, setUser] = useState({
  //     myself: {
  //         description,
  //         gender: genderMine,
  //         year: yearMine,
  //         connection: false,
  //         warnings: {
  //             count: 0,
  //             banned:false,
  //             bannedTimer: ''
  //         }
  //     }, 
  //     companion: {
  //         themes,
  //         gender: genderFind,
  //         year: yearFind  
  //     }
  // })

  const [myself, setMyself] = useState({
    gender: null,
    year: null
  })
  const [companion, setCompanion] = useState({
    themes: 'talk'
  })
  const [user, setUser] = useState({ myself, companion })
  const [number, setNumber] = useState([])
  const [gender, setGender] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [rules, setRules] = useState({
    talk: 0,
    problem: 0,
    flirt: 0
  })


  const { loading, error, request } = useHTTP()


  const sendData = async (e) => {
    e.preventDefault()
    try {
      const data = await request('/add', 'POST', { ...user })
    } catch (e) { }
  }

  const updateState = (setFunction, value) => {
    setFunction(state => ({
      ...state,
      ...value
    }))
  }

  const checkDuplicateArray = (el, arr) => {
    return arr.includes(el)
  }

  const checkElementArray = (arr, setArray, val) => {
    if (checkDuplicateArray(val, arr)) {
      const newArray = arr.filter(n => n !== val)
      setArray(newArray)
    } else {
      setArray(n => ([...n, val]))
    }

  }

  const findNumber = (string) => {
    const old = +string.match(/\d+/)[0];
    checkElementArray(number, setNumber, old)
  }

  const arrayGender = str => {
    checkElementArray(gender, setGender, str)
  }

  const checkLength = arr => {
    if (arr.length === 0) {
      return null
    }
    if (arr.length === 1) {
      return arr[0]
    }
    return arr
  }

  const handlerGrey = (name, bool) => {
    const data = [...document.getElementsByName(`${name}`)].slice(1)
    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      el.disabled = bool
      if (el.disabled === true) {
        if (el.name.indexOf('year') === 0) {
          updateState(setCompanion, { year: null })
          updateState(setMyself, { year: null })
        } else {
          updateState(setCompanion, { gender: null })
        }
        removeClass(name)
        addClassFirstElement(name)
        el.classList.add('grey')
      } else {
        el.classList.remove('grey')
      }
    }
  }

  useEffect(() => {
    handlerGrey('genderF', true)
    handlerGrey('yearF', true)
    handlerGrey('year', true)
  }, [])

  useEffect(() => {
    setCompanion({ gender: checkLength(gender), year: checkLength(number) })
  }, [number, gender])


  useEffect(() => {
    setUser(u => ({
      myself: { ...u.myself, ...myself },
      companion: { ...u.companion, ...companion }
    }))

  }, [myself, companion])

  const active = {
    boxShadow: '-5px 5px 2px'
  }

  const removeClass = (name) => {
    const names = document.getElementsByName(name)
    for (let i = 0; i < names.length; i++) {
      const element = names[i];
      element.style = ''
      element.classList.remove('background__button_active')
    }
  }

  const themesClass = (e) => {
    removeClass(e.name)
    const blueShadow = '#5EC6D9'
    const orangeShadow = '#FFDE79'
    const redShadow = '#CF5959'
    if (e.className.includes('blue')) {
      changeColorForms(e, 'blue', blueShadow)
    }
    else if (e.className.includes('red')) {
      changeColorForms(e, 'red', redShadow)
    }
    else {
      changeColorForms(e, 'orange', orangeShadow)
    }
  }

  const changeColorForms = (cls, color, colorShadow) => {
    const buttonsColor = document.getElementsByClassName('background__button')
    const inputColor = document.getElementsByClassName('body__input')
    cls.style = `box-shadow: ${active.boxShadow} ${colorShadow}`
    inputColor[0].classList.remove('red', 'blue', 'orange')
    inputColor[0].classList.add(`${color}`)
    for (let i = 0; i < buttonsColor.length; i++) {
      const el = buttonsColor[i];
      el.classList.remove('red', 'blue', 'orange')
      el.classList.add(`${color}`)
    }
  }

  const addClassFirstElement = name => {
    const names = document.getElementsByName(name)
    names[0].classList.add('background__button_active')
    if (name === 'genderF') {
      updateState(setCompanion, { gender: null })
    } else {
      updateState(setCompanion, { year: null })

    }
  }
  const removeClassFirstElement = name => {
    const names = document.getElementsByName(name);
    names[0].classList.remove('background__button_active')
  }

  const checkClassArray = name => {
    const arr = []
    const names = document.getElementsByName(name)
    for (let i = 1; i < names.length; i++) {
      const element = names[i];

      arr.push(element.className.split(' ').pop())
    }

    if (arr.includes('background__button_active')) { return true }
    return false


  }

  const handlerGreyChoose = (name, bool) => {
    if (name === 'gender') {
      handlerGrey('genderF', bool)
      handlerGrey('year', bool)
    } else {
      handlerGrey('yearF', bool)
    }
  }
  const addActive = (e) => {
    if (e.target.classList.contains('background__button_active')) {
      e.target.classList.remove('background__button_active')
      addClassFirstElement(e.target.name)
      handlerGreyChoose(e.target.name, true)
    } else {
      removeClass(e.target.name)
      e.target.classList.add('background__button_active')
      handlerGreyChoose(e.target.name, false)
    }
  }

  const addActiveF = (e) => {
    const name = e.target.name
    e.target.classList.toggle('background__button_active')
    if (checkClassArray(name)) {
      removeClassFirstElement(name)
    } else {
      addClassFirstElement(name)
    }
  }


  const rulesContainer = () => {
    let themes = ''
    switch (user.companion.themes) {
      case 'talk':
        themes = "Общение"
        break;
      case 'problem':
        themes = "Проблемы"
        break;
      default:
        themes = "Флирт"
        break;
    }
    if (user.companion.themes === 'talk' || user.companion.themes === 'problem') {
      return (
        <div>
          <h1>Правила чата "{themes}"</h1>
          <h2> <b> Запрещенно:</b> </h2>
          <ul>
            <li>Рассылать спам и рекламу</li>
            <li>Продавать товары или услуги</li>
            <li>Оскорблять собеседника и угрожать</li>
            <li>Отправлять сообщения сексуально-порнографического характера</li>
            <li>Быть двуличным))</li>
          </ul> <br />
          <h2> <b> В начале общения запрещенно:</b> </h2>
          <ul>
            <li>Предлагать перейти в сторонние Мессенджеры и Соц.сети</li>
          </ul>
        </div>

      )
    } else {
      return (
        <div>
          <h1>Правила чата "{themes}"</h1>
          <h2> <b>Запрещенно:</b> </h2>
          <ul>
            <li>Рассылать спам и рекламу</li>
            <li>Продавать товары или услуги</li>
            <li>Оскорблять собеседника и угрожать</li>
          </ul> <br />
        </div>
      )
    }
  }

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const acceptRules = () => {
    closeModal()
    const theme = user.companion.themes;
    setRules(rules => ({ ...rules, [theme]: 1 }))

  }

  const handlerRulesAccept = name => {
    if (name === 0) {
      openModal()
    }
  }

  const handlerRules = () => {
    const theme = user.companion.themes;
    handlerRulesAccept(rules[theme])

  }

  const inputSave = e => {
    console.log(e.target.value);
    
  }


  return (
    <section className="home" id='home'>
      <form className="form grid">
        <section className="home__container">


          <section className="body">
            <div className="body__container">
              <div className="body__title title">
                <h4>Тема: </h4>
              </div>
              <div className="body__data grid">
                <input
                  name='themes'
                  type="button"
                  value="Общение"
                  style={{ boxShadow: '-5px 5px 2px #5EC6D9' }}
                  className={`button shadow button_blue blue`}
                  onClick={e => updateState(setCompanion, { [e.target.name]: 'talk' }, themesClass(e.target))}
                />
                <input
                  name='themes'
                  type="button"
                  value="Проблемы"
                  className={`button shadow button_orange orange`}
                  onClick={e => updateState(setCompanion, { [e.target.name]: 'problem' }, themesClass(e.target))}
                />
                <input
                  name='themes'
                  type="button"
                  value="..."
                  className={`button shadow button_red red`}
                  onClick={e => updateState(setCompanion, { [e.target.name]: 'flirt' }, themesClass(e.target))}
                />
              </div>
            </div>
          </section>

          <section className="body">
            <div className="body__container">
              <div className="body__title title">
                <h4>О Себе : </h4>
              </div>
              <div className="body__data">
                <input
                  className='blue body__input'
                  type="text"
                  name="description"
                  onChange={e => updateState(setMyself, { [e.target.name]: e.target.value }, inputSave(e))}
                  placeholder='Танцую, играю на скрипке.'
                  autoComplete='off'
                  maxLength='35'
                  required />
              </div>
            </div>
          </section>

          <section className="body">
            <section className="body__columns grid">

              <div className="body__container">
                <div className="body__title title">
                  <h4>Ваш пол: </h4>
                </div>
                <div className="body__data">
                  <div className="background">
                    <input
                      name='gender'
                      type="button"
                      value="?"
                      className="blue button  background__button background__button_active"
                      onClick={e => updateState(setMyself, { [e.target.name]: null }, addActive(e), handlerGrey('genderF', true), handlerGrey('yearF', true), handlerGrey('year', true))}
                    />
                    <input
                      name='gender'
                      type="button"
                      value="М"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: e.target.value }, addActive(e))}
                    />
                    <input
                      name='gender'
                      type="button"
                      value="Ж"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: e.target.value }, addActive(e))}
                    />

                  </div>
                </div>
              </div>

              <div className="body__container">
                <div className="body__title title">
                  <h4>Пол собеседника: </h4>
                </div>
                <div className="body__data">
                  <div className="background">
                    <input
                      name='genderF'
                      type="button"
                      value="?"
                      className="blue button  background__button background__button_active"
                      onClick={e => updateState(setCompanion, { 'gender': arrayGender(e.target.value) }, removeClass(e.target.name), addClassFirstElement(e.target.name))}
                    />
                    <input
                      name='genderF'
                      disabled={false}
                      type="button"
                      value="М"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'gender': arrayGender(e.target.value) }, addActiveF(e))}
                    />
                    <input
                      name='genderF'
                      disabled={false}
                      type="button"
                      value="Ж"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'gender': arrayGender(e.target.value) }, addActiveF(e))}
                    />
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section className="body">

            <section className="body__columns grid">


              <div className="body__container">
                <div className="body__title title">
                  <h4>Ваш возраст: </h4>
                </div>
                <div className="body__data">
                  <div className="background ">
                    <input
                      name='year'
                      type="button"
                      value="?"
                      className="blue button background__button background__button_active"
                      onClick={e => updateState(setMyself, { [e.target.name]: null }, addActive(e), handlerGrey('yearF', true))}

                    />
                    <input
                      name='year'
                      disabled={false}
                      type="button"
                      value="< 16"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 16 }, addActive(e))}
                    />
                    <input
                      name='year'
                      disabled={false}
                      type="button"
                      value="17 - 21"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 17 }, addActive(e))}
                    />
                  </div>
                </div>
                <div className="none"></div>
                <div className="body__data">
                  <div className="background ">
                    <input
                      name='year'
                      disabled={false}
                      type="button"
                      value="22 - 27"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 22 }, addActive(e))}
                    />
                    <input
                      name='year'
                      disabled={false}
                      type="button"
                      value="28 - 35"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 28 }, addActive(e))}
                    />
                    <input
                      name='year'
                      disabled={false}
                      type="button"
                      value="36 <"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 36 }, addActive(e))}
                    />
                  </div>
                </div>
              </div>

              <div className="body__container">
                <div className="body__title title">
                  <h4>Возраст собеседника: </h4>
                </div>
                <div className="body__data">
                  <div className="background ">
                    <input
                      name='yearF'
                      type="button"
                      value="?"
                      className="blue button  background__button background__button_active"
                      onClick={e => updateState(setCompanion, { 'year': 0 }, removeClass(e.target.name), addClassFirstElement(e.target.name))}
                    />
                    <input
                      name='yearF'
                      disabled={false}
                      type="button"
                      value="< 16"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'year': findNumber(e.target.value) }, addActiveF(e))}
                    />
                    <input
                      name='yearF'
                      disabled={false}
                      type="button"
                      value="17 - 21"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'year': findNumber(e.target.value) }, addActiveF(e))}
                    />
                  </div>
                </div>
                <div className="none"></div>
                <div className="body__data">
                  <div className="background ">
                    <input
                      name='yearF'
                      disabled={false}
                      type="button"
                      value="22 - 27"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'year': findNumber(e.target.value) }, addActiveF(e))}
                    />
                    <input
                      name='yearF'
                      disabled={false}
                      type="button"
                      value="28 - 35"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'year': findNumber(e.target.value) }, addActiveF(e))}
                    />
                    <input
                      name='yearF'
                      disabled={false}
                      type="button"
                      value="36 <"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'year': findNumber(e.target.value) }, addActiveF(e))}
                    />
                  </div>
                </div>
              </div>


            </section>

          </section>


        </section>
        <input type="button" id='ruledone' onClick={handlerRules} className='button shadow button-submit' value='Поиск' />

      </form>

      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={500}
      >
        <section className="rules modal-show " id='modal'>
          {rulesContainer()}
          <div className="rules__buttons flex">
            <button onClick={acceptRules} className='button shadow button-submit button-find'>Принять</button>
            <button onClick={closeModal} className='button  button-cancel button_red red'>Отмена</button>
          </div>

        </section>

      </Modal>

    </section>
  )
}