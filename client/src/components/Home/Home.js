import React, { useState, useEffect, useReducer } from "react"
import './Home.css';
import reducer from './reducer'

export const Home = () => {
  const classes = "button shadow button_blue blue active"
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

    console.log(companion);
  }

  const updateState = (setFunction, value, classes) => {
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
    if (arr.length == 0) {
      return null
    }
    if(arr.length == 1){
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



  return (
    <section className="home">
      <form action="" className="form grid">
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
                  className={`${classes}`}
                  onClick={e => updateState(setCompanion, { [e.target.name]: 'talk'}, e.target.className) }
                />
                <input
                  name='themes'
                  type="button"
                  value="Проблемы"
                  className="button shadow button_orange orange"
                  onClick={e => updateState(setCompanion, { [e.target.name]: 'problem' },  e.target.className)}
                />
                <input
                  name='themes'
                  type="button"
                  value="..."
                  className="button shadow button_red red"
                  onClick={e => updateState(setCompanion, { [e.target.name]: 'flirt' },  e.target.className)}
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
                      className="button  background__button background__button_active"
                      onClick={e => updateState(setMyself, { [e.target.name]: e.target.value })}
                    />
                    <input
                      name='gender'
                      type="button"
                      value="М"
                      className="button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: e.target.value })}
                    />
                    <input
                      name='gender'
                      type="button"
                      value="Ж"
                      className="button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: e.target.value })}
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
                      name='gender'
                      type="button"
                      value="?"
                      className="button  background__button background__button_active"
                      onClick={e => updateState(setCompanion, { [e.target.name]: arrayGender(e.target.value) })}
                    />
                    <input
                      name='gender'
                      type="button"
                      value="М"
                      className="button  background__button"
                      onClick={e => updateState(setCompanion, { [e.target.name]: arrayGender(e.target.value) })}
                    />
                    <input
                      name='gender'
                      type="button"
                      value="Ж"
                      className="button  background__button"
                      onClick={e => updateState(setCompanion, { [e.target.name]: arrayGender(e.target.value) })}
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
                      className="button  background__button background__button_active"
                      onClick={e => updateState(setMyself, { [e.target.name]: 0 })}

                    />
                    <input
                      name='year'
                      type="button"
                      value="< 16"
                      className="button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 16 })}
                    />
                    <input
                      name='year'
                      type="button"
                      value="17 - 21"
                      className="button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 17 })}
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
                      className="button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 22 })}
                    />
                    <input
                      name='year'
                      type="button"
                      value="28 - 35"
                      className="button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 28 })}
                    />
                    <input
                      name='year'
                      type="button"
                      value="36 <"
                      className="button  background__button"
                      onClick={e => updateState(setMyself, { [e.target.name]: 36 })}
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
                      name='year'
                      type="button"
                      value="?"
                      className="button  background__button background__button_active"
                      onClick={e => updateState(setCompanion, { [e.target.name]: 0 })}
                    />
                    <input
                      name='year'
                      type="button"
                      value="< 16"
                      className="button  background__button"
                      onClick={e => updateState(setCompanion, { [e.target.name]: findNumber(e.target.value) })}
                    />
                    <input
                      name='year'
                      type="button"
                      value="17 - 21"
                      className="button  background__button"
                      onClick={e => updateState(setCompanion, { [e.target.name]: findNumber(e.target.value) })}
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
                      className="button  background__button"
                      onClick={e => updateState(setCompanion, { [e.target.name]: findNumber(e.target.value) })}
                    />
                    <input
                      name='year'
                      type="button"
                      value="28 - 35"
                      className="button  background__button"
                      onClick={e => updateState(setCompanion, { [e.target.name]: findNumber(e.target.value) })}
                    />
                    <input
                      name='year'
                      type="button"
                      value="36 <"
                      className="button  background__button"
                      onClick={e => updateState(setCompanion, { [e.target.name]: findNumber(e.target.value) })}
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