import React, { useState, useEffect, useReducer } from "react"
import './Home.css';
import reducer from './reducer'

export const Home = () => {

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


  const show = () => {

    console.log(user);
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

  const themesClass = (cls) => {
    const blueShadow = '#5EC6D9'
    const orangeShadow = '#FFDE79'
    const redShadow = '#CF5959'
    if (cls.className.includes('blue')) { changeColorForms(cls, 'blue', blueShadow) }
    else if (cls.className.includes('red')) { changeColorForms(cls, 'red', redShadow) }
    else { changeColorForms(cls, 'orange', orangeShadow) }
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

  const addActive = (e) => {
    removeClass(e.target.name)
    if (e.target.name === 'themes') { themesClass(e.target) }
    else {
      e.target.classList.add('background__button_active')
    }
  }


  const addClassFirstElement = name => {
    const names = document.getElementsByName(name);
    names[0].classList.add('background__button_active')
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

  const addActiveF = (e) => {
    const name = e.target.name
    e.target.classList.toggle('background__button_active')
    if (checkClassArray(name)) {
      removeClassFirstElement(name)
    } else {
      addClassFirstElement(name)
    }
  }



  return (
    <section className="home">
      <form action="searching" method='post' className="form grid">
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
                  onClick={e => updateState(setCompanion, { [e.target.name]: 'talk' }, addActive(e))}
                />
                <input
                  name='themes'
                  type="button"
                  value="Проблемы"
                  className={`button shadow button_orange orange`}
                  onClick={e => updateState(setCompanion, { [e.target.name]: 'problem' }, addActive(e))}
                />
                <input
                  name='themes'
                  type="button"
                  value="..."
                  className={`button shadow button_red red`}
                  onClick={e => updateState(setCompanion, { [e.target.name]: 'flirt' }, addActive(e))}
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
                  onChange={e => updateState(setMyself, { [e.target.name]: e.target.value })}
                  placeholder='Танцую, играю на скрипке.'
                  autoComplete='off'
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
                      onClick={e => updateState(setMyself, { [e.target.name]: e.target.value }, addActive(e))}
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
                      onClick={e => updateState(setCompanion, { 'gender': arrayGender(e.target.value) })}
                    />
                    <input
                      name='genderF'
                      type="button"
                      value="М"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'gender': arrayGender(e.target.value) }, addActiveF(e))}
                    />
                    <input
                      name='genderF'
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
                      onClick={e => updateState(setMyself, { [e.target.name]: 0 }, addActive(e))}

                    />
                    <input
                      name='year'
                      type="button"
                      value="< 16"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 16 }, addActive(e))}
                    />
                    <input
                      name='year'
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
                      type="button"
                      value="22 - 27"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 22 }, addActive(e))}
                    />
                    <input
                      name='year'
                      type="button"
                      value="28 - 35"
                      className="blue button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 28 }, addActive(e))}
                    />
                    <input
                      name='year'
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
                      onClick={e => updateState(setCompanion, { 'year': 0 })}
                    />
                    <input
                      name='yearF'
                      type="button"
                      value="< 16"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'year': findNumber(e.target.value) }, addActiveF(e))}
                    />
                    <input
                      name='yearF'
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
                      type="button"
                      value="22 - 27"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'year': findNumber(e.target.value) }, addActiveF(e))}
                    />
                    <input
                      name='yearF'
                      type="button"
                      value="28 - 35"
                      className="blue button  background__button"
                      onClick={e => updateState(setCompanion, { 'year': findNumber(e.target.value) }, addActiveF(e))}
                    />
                    <input
                      name='yearF'
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
        <input type="button" onClick={show} className='button blue' value='test' />
        <button type="submit" className='button shadow button-submit'>Поиск</button>
      </form>

    </section>
  )
}