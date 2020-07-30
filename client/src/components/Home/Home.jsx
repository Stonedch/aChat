import React from "react"
import Modal from 'react-modal';
import './Home.css';
import { useHTTP } from "../../hooks/http";
import { useDispatch, useSelector } from 'react-redux';

import {
    selectAge,
    selectGender,
    selectTheme,
    setDescrition,
    selectDescription,
    setTheme,
    selectColor,
    selectAllow,
    setChoose,
    selectModal,
    openModal,
    closeModal,
    selectActiveTheme,
    acceptRules,
    formationUser,
    selectUser
} from './userSlicer'




export const Home = () => {

    const dispatch = useDispatch()

    const { request } = useHTTP()

    const themes = useSelector(selectTheme)
    const gender = useSelector(selectGender)
    const age = useSelector(selectAge)
    const color = useSelector(selectColor)
    const allow = useSelector(selectAllow)
    const description = useSelector(selectDescription)
    const modalOpen = useSelector(selectModal)
    const activeTheme = useSelector(selectActiveTheme)
    const user = useSelector(selectUser)

    Modal.setAppElement(document.getElementById('home'));


    const rulesContainer = () => {

        if (activeTheme === 'Общение' || activeTheme === 'Трабл') {
            return (
                <div>
                    <h1>Правила чата "{activeTheme}"</h1>
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
                    <h1>Правила чата "{activeTheme}"</h1>
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


    const sendData = async (e) => {
        dispatch(acceptRules())
        dispatch(formationUser())
        e.preventDefault()
        try {
            // const data = await request('/add', 'POST', user )
            await request('/add', 'POST', user)
        } catch (e) { }
    }




    return (
        <section id='home'>
            <form className="form grid">
                <section className="home__container">
                    <section className="body">
                        <div className="body__container">
                            <div className="body__title title">
                                <h4>Тема: </h4>
                            </div>
                            <div className="body__data buttons grid">
                                {
                                    themes.map(item => {
                                        return (
                                            <input
                                                key={item.id}
                                                name='themes'
                                                type="button"
                                                value={item.value}
                                                style={{ boxShadow: `${item.boxShadow}` }}
                                                className={`button shadow ${item.cls}`}
                                                onClick={() => dispatch(setTheme(item.value))}
                                            />
                                        )
                                    })
                                }
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
                                    id='inputMyself'
                                    className={`${color} body__input`}
                                    type="text"
                                    name="description"
                                    placeholder='Танцую, играю на скрипке.'
                                    autoComplete='off'
                                    maxLength='35'
                                    value={description}
                                    onChange={(e) => { dispatch(setDescrition(e.target.value)) }}
                                    required />
                            </div>
                        </div>
                    </section>

                    <section className="body">
                        <section className="body__columns grid">


                            <div className="body__container"
                            >
                                <div className="body__title title">
                                    <h4>Ваш пол: </h4>
                                </div>
                                <div className="body__data space">
                                    {
                                        gender.property.mine.map(item => {
                                            return (
                                                <input
                                                    className={` background__button button ${item.cls} ${color}`}
                                                    key={item.id}
                                                    name={item.name}
                                                    type="button"
                                                    value={item.value}
                                                    onClick={() => dispatch(setChoose({ id: item.id, name: item.name }))}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="body__container"
                            >
                                <div className="body__title title">
                                    <h4>Пол собеседника: </h4>
                                </div>
                                <div className="body__data space">
                                    {
                                        gender.property.find.map(item => {
                                            return (
                                                <input
                                                    className={` background__button button ${item.cls} ${color} ${allow[0].cls}`}
                                                    key={item.id}
                                                    name={item.name}
                                                    type="button"
                                                    value={item.value}
                                                    disabled={allow[0].value}
                                                    onClick={() => dispatch(setChoose({ id: item.id, name: item.name }))}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>

                        </section>
                    </section>

                    <section className="body">
                        <section className="body__columns grid">


                            <div className="body__container"

                            >
                                <div className="body__title title">
                                    <h4>Ваш возраст: </h4>
                                </div>
                                <div className="body__data change">
                                    {
                                        age.property.mine.map(item => {
                                            if (item.column === 1) {
                                                return (
                                                    <input
                                                        name={item.name}
                                                        key={item.id}
                                                        type="button"
                                                        value={item.value}
                                                        disabled={allow[1].value}
                                                        className={`${color} button background__button ${item.cls} ${allow[1].cls}`}
                                                        onClick={() => dispatch(setChoose({ id: item.id, name: item.name }))}

                                                    />
                                                )
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </div>
                                <div className="none"></div>
                                <div className="body__data change">
                                    {
                                        age.property.mine.map(item => {
                                            if (item.column === 2) {
                                                return (
                                                    <input
                                                        name={item.name}
                                                        key={item.id}
                                                        type="button"
                                                        value={item.value}
                                                        disabled={allow[1].value}
                                                        className={`${color} button background__button ${item.cls} ${allow[1].cls}`}
                                                        onClick={() => dispatch(setChoose({ id: item.id, name: item.name }))}

                                                    />
                                                )
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className="body__container">
                                <div className="body__title title">
                                    <h4>Возраст собеседника: </h4>
                                </div>
                                <div className="body__data change">
                                    {
                                        age.property.find.map(item => {
                                            if (item.column === 1) {
                                                return (
                                                    <input
                                                        name={item.name}
                                                        key={item.id}
                                                        type="button"
                                                        value={item.value}
                                                        disabled={allow[2].value}
                                                        className={`${color} button background__button ${item.cls} ${allow[2].cls}`}
                                                        onClick={() => dispatch(setChoose({ id: item.id, name: item.name }))}

                                                    />
                                                )
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </div>
                                <div className="none"></div>
                                <div className="body__data  change">
                                    {
                                        age.property.find.map(item => {
                                            if (item.column === 2) {
                                                return (
                                                    <input
                                                        name={item.name}
                                                        key={item.id}
                                                        type="button"
                                                        value={item.value}
                                                        disabled={allow[2].value}
                                                        className={`${color} button background__button ${item.cls} ${allow[2].cls}`}
                                                        onClick={() => dispatch(setChoose({ id: item.id, name: item.name }))}

                                                    />
                                                )
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </div>
                            </div>

                        </section>
                    </section>


                </section>
                <input
                    type="button"
                    id='ruledone'
                    className='button shadow button-submit'
                    value='Поиск'
                    onClick={() => dispatch(openModal())}
                />

            </form>

            <Modal
                className="Modal"
                overlayClassName="Overlay"
                isOpen={modalOpen}
                onRequestClose={() => dispatch(closeModal())}
                closeTimeoutMS={500}
            >
                <section className="rules modal-show " id='modal'>
                    {rulesContainer()}
                    <div className="rules__buttons flex">
                        <button
                            className='button shadow button-submit button-find'
                            onClick={e => sendData(e)}
                        >
                            Принять
                        </button>
                        <button onClick={() => dispatch(closeModal())} className='button  button-cancel button_red red'>Отмена</button>
                    </div>

                </section>

            </Modal>

        </section>
    )
}