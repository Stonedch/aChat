import { createSlice } from '@reduxjs/toolkit';


export const counterSlice = createSlice({
    name: 'user',
    initialState: {
        themes: JSON.parse(window.localStorage.getItem('themes')) || [
            {
                id: Math.floor(Math.random() * 1000),
                value: 'Общение',
                cls: ' button_blue',
                boxShadow: '-5px 5px 2px #5EC6D9'
            },
            {
                id: Math.floor(Math.random() * 1000),
                value: 'Трабл',
                cls: '  button_orange',
                boxShadow: ''
            },
            {
                id: Math.floor(Math.random() * 1000),
                value: '...',
                cls: ' button_red',
                boxShadow: ''
            }
        ],
        activeTheme: window.localStorage.getItem('activeTheme') || 'talk',
        gender: JSON.parse(window.localStorage.getItem('gender')) || {
            title: [
                {
                    id: Math.floor(Math.random() * 1000),
                    title: 'Ваш пол:'
                },
                {
                    id: Math.floor(Math.random() * 1000),
                    title: 'Пол собеседника:'
                }
            ],
            property: {
                mine: [
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '?',
                        cls: 'background__button_active',
                        name: 'gender'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: 'М',
                        cls: '',
                        name: 'gender'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: 'Ж',
                        cls: '',
                        name: 'gender'
                    }
                ],
                find: [
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '?',
                        cls: 'background__button_active',
                        name: 'genderFind'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: 'М',
                        cls: '',
                        name: 'genderFind'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: 'Ж',
                        cls: '',
                        name: 'genderFind'
                    }
                ]
            }


        },
        age: JSON.parse(window.localStorage.getItem('age')) || {
            title: [
                {
                    id: Math.floor(Math.random() * 1000),
                    title: 'Ваш возраст: '
                },
                {
                    id: Math.floor(Math.random() * 1000),
                    title: 'Возраст собеседника: '
                }
            ],
            property: {
                mine: [
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '?',
                        cls: 'background__button_active',
                        column: 1,
                        name: 'age'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '< 16',
                        cls: '',
                        column: 1,
                        name: 'age'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '17 - 21',
                        cls: '',
                        column: 1,
                        name: 'age'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '22 - 27',
                        cls: '',
                        column: 2,
                        name: 'age'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '28 - 35',
                        cls: '',
                        column: 2,
                        name: 'age'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '36 <',
                        cls: '',
                        column: 2,
                        name: 'age'
                    }

                ],
                find: [
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '?',
                        cls: 'background__button_active',
                        column: 1,
                        name: 'ageFind'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '< 16',
                        cls: '',
                        column: 1,
                        name: 'ageFind'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '17 - 21',
                        cls: '',
                        column: 1,
                        name: 'ageFind'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '22 - 27',
                        cls: '',
                        column: 2,
                        name: 'ageFind'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '28 - 35',
                        cls: '',
                        column: 2,
                        name: 'ageFind'
                    },
                    {
                        id: Math.floor(Math.random() * 1000),
                        value: '36 <',
                        cls: '',
                        column: 2,
                        name: 'ageFind'
                    }

                ]
            }
        },
        description: '' || window.localStorage.getItem('describe'),
        color: window.localStorage.getItem('color') || 'blue',
        boxShadowProperty: {
            blue: '-5px 5px 2px #5EC6D9',
            orange: '-5px 5px 2px #FFDE79',
            red: '-5px 5px 2px #CF5959'
        },
        allow: JSON.parse(window.localStorage.getItem('allow')) || [
            {
                name: 'genderFind',
                cls: 'grey',
                value: true
            },
            {
                name: 'age',
                cls: 'grey',
                value: true
            },
            {
                name: 'ageFind',
                cls: 'grey',
                value: true
            },
        ],
        setIsOpen: false,
        rules: {
            talk: 0,
            problem: 0,
            flirt: 0
        },
        user: {}
    },
    reducers: {
        setDescrition: (state, action) => {
            state.description = action.payload
            window.localStorage.setItem('describe', state.description)
        },
        setTheme: (state, action) => {

            state.themes.forEach(item => item.boxShadow = '')
            switch (action.payload) {
                case 'Трабл':
                    state.color = 'orange'
                    state.themes[1].boxShadow = state.boxShadowProperty.orange
                    state.activeTheme = 'problem'
                    break;
                case '...':
                    state.color = 'red'
                    state.themes[2].boxShadow = state.boxShadowProperty.red
                    state.activeTheme = 'flirt'
                    break;
                default:
                    state.color = 'blue'
                    state.themes[0].boxShadow = state.boxShadowProperty.blue
                    state.activeTheme = 'talk'
                    break;
            }
            state.activeTheme = action.payload
            window.localStorage.setItem('color', state.color)
            window.localStorage.setItem('themes', JSON.stringify(state.themes))
            window.localStorage.setItem('activeTheme', state.activeTheme)
        },
        setActiveToggle: (state, action) => {
            state[action.payload.arr].property[action.payload.name]
                .filter(item => item.id === action.payload.id)
                .forEach(item => item.cls === '' ? item.cls = 'background__button_active' : item.cls = '')
        },
        setQuestionToggle: (state, action) => {
            let arr = action.payload.arr,
                name = action.payload.name,
                stateArray = state[arr].property[name]

            if (name === 'mine' && stateArray[0].id !== action.payload.id) {
                stateArray
                    .filter(item => item.id !== action.payload.id)
                    .forEach(item => item.cls = '')
            } else if (stateArray[0].id === action.payload.id) {
                stateArray.forEach(item => item.id === action.payload.id ? item.cls = 'background__button_active' : item.cls = '')
            } else {
                stateArray[0].cls = ''
            }

            if (stateArray.every(item => item.cls === '')) {
                stateArray[0].cls = 'background__button_active'
            }

        },
        setGrey: state => {
            if (state.gender.property.mine[0].cls === '') {
                state.allow.forEach(item => {
                    item.cls = '';
                    item.value = false

                })
            } else {
                state.allow.forEach(item => {
                    let arr = [
                        {
                            arr: 'gender',
                            name: 'find'
                        },
                        {
                            arr: 'age',
                            name: 'mine'
                        },
                        {
                            arr: 'age',
                            name: 'find'
                        }
                    ]
                    item.cls = 'grey'
                    item.value = true
                    arr.forEach(item => {
                        state[item.arr].property[item.name].forEach(item => item.cls = '')
                        state[item.arr].property[item.name][0].cls = 'background__button_active'
                    })
                })
            }

            if (state.age.property.mine[0].cls !== '') {
                state.allow[2].cls = 'grey'
                state.allow[2].value = true
                state.age.property.find.forEach(item => item.cls = '')
                state.age.property.find[0].cls = 'background__button_active'
            }

            window.localStorage.setItem('allow', JSON.stringify(state.allow))
        },
        closeModal: state => {
            state.setIsOpen = false
        },
        openModal: state => {
            if (state.rules[state.activeTheme] !== 1) {
                state.setIsOpen = true
            }
        },
        acceptRules: state => {
            state.rules = { ...state.rules, [state.activeTheme]: 1 }
        },
        formationUser: state => {
            state.user = {
                myself: {
                    description: state.description,
                    gender: state.gender.property.mine.filter(item => item.cls !== '').map(item => item.value)[0],
                    year: state.age.property.mine.filter(item => item.cls !== '').map(item => item.value)[0]
                },
                companion: {
                    themes: state.activeTheme,
                    gender: [state.gender.property.find.filter(item => item.cls !== '').map(item => item.value)],
                    year: [state.age.property.find.filter(item => item.cls !== '').map(item => item.value)]
                }
            }
        },
        saveOptions: (state, action) => {
            window.localStorage.setItem(`${action.payload}`, JSON.stringify(state[action.payload]))
        }
    }
},
);

export const {
    setDescrition,
    setTheme,
    setActive,
    setActiveToggle,
    setQuestionToggle,
    setGrey,
    openModal,
    closeModal,
    rulesContainer,
    acceptRules,
    formationUser,
    saveOptions
} = counterSlice.actions;

export const setChoose = state => dispatch => {
    let arr, name;

    switch (state.name) {
        case 'gender':
            arr = 'gender'
            name = 'mine'
            break;
        case 'genderFind':
            arr = 'gender'
            name = 'find'
            break;
        case 'age':
            arr = 'age'
            name = 'mine'
            break;
        default:
            arr = 'age'
            name = 'find'
            break;
    }

    dispatch(setActiveToggle({ arr, name, id: state.id }))
    dispatch(setQuestionToggle({ arr, name, id: state.id }))
    dispatch(setGrey())
    dispatch(saveOptions(arr))
    
}




export const selectTheme = state => state.user.themes;
export const selectAge = state => state.user.age;
export const selectGender = state => state.user.gender;
export const selectDescription = state => state.user.description;
export const selectColor = state => state.user.color;
export const selectAllow = state => state.user.allow;
export const selectActiveTheme = state => state.user.activeTheme;
export const selectModal = state => state.user.setIsOpen;
export const selectUser = state => state.user.user;




export default counterSlice.reducer;