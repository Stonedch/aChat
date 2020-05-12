import React from "react"
import './Home.css';


export const Home = () => {
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
                <input type="button" value="Общение" className="button shadow button_blue blue active" />
                <input type="button" value="Проблемы" className="button shadow button_orange orange" />
                <input type="button" value="..." className="button shadow button_red red" />
              </div>
            </div>
          </section>

          <section className="body">
            <div className="body__container">
              <div className="body__title title">
                <h4>О Себе : </h4>
              </div>
              <div className="body__data">
                <input className='blue body__input' type="text" name="" id="" placeholder='Танцую, играю на скрипке.' />
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
                    <input type="button" value="?" className="button  background__button" />
                    <input type="button" value="М" className="button  background__button" />
                    <input type="button" value="Ж" className="button  background__button" />

                  </div>
                </div>
              </div>

              <div className="body__container">
                <div className="body__title title">
                  <h4>Пол собеседника: </h4>
                </div>
                <div className="body__data">
                  <div className="background">
                    <input type="button" value="?" className="button  background__button" />
                    <input type="button" value="М" className="button  background__button" />
                    <input type="button" value="Ж" className="button  background__button" />
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
                    <input type="button" value="?" className="button  background__button" />
                    <input type="button" value="< 16" className="button  background__button" />
                    <input type="button" value="17 - 21" className="button  background__button" />
                  </div>
                </div>
                <div className="none"></div>
                <div className="body__data">
                  <div className="background ">
                    <input type="button" value="22 - 27" className="button  background__button" />
                    <input type="button" value="28 - 35" className="button  background__button" />
                    <input type="button" value="36 <" className="button  background__button" />
                  </div>
                </div>
              </div>

              <div className="body__container">
                <div className="body__title title">
                  <h4>Возраст собеседника: </h4>
                </div>
                <div className="body__data">
                  <div className="background ">
                    <input type="button" value="?" className="button  background__button" />
                    <input type="button" value="< 16" className="button  background__button" />
                    <input type="button" value="17 - 21" className="button  background__button" />
                  </div>
                </div>
                <div className="none"></div>
                <div className="body__data">
                  <div className="background ">
                    <input type="button" value="22 - 27" className="button  background__button" />
                    <input type="button" value="28 - 35" className="button  background__button" />
                    <input type="button" value="36 <" className="button  background__button" />
                  </div>
                </div>
              </div>


            </section>

          </section>
        </section>


        <button type="submit" className='button shadow button-submit' >Поиск</button>
      </form>

    </section>
  )
}