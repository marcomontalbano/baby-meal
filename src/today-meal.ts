import dayjs, { Dayjs } from 'dayjs'
import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { getDinnerMeal, getLunchMeal } from './meal'
import sun from './images/sunny.svg'
import moon from './images/full-moon.svg'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('today-meal')
export class TodayMeal extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      height: calc(100% - 40px);
      background: rgb(161,214,252);
      background: linear-gradient(135deg, rgba(161,214,252,1) 0%, rgba(65,143,239,1) 50%, rgba(49,53,101,1) 50%, rgba(1,0,17,1) 100%);
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
    }

    .date {
      height: 40px;
      position: absolute;
      top: -40px;
      left: 0;
      width: 100%;
      line-height: 40px;
      text-align: center;
    }

    .day, .night {
      position: absolute;
      width: 50%;
      height: 50%;
      display: flex;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 18px;
      min-width: 250px;
    }

    .day img {
      width: 150px;
    }

    .night img {
      width: 100px;
    }

    .day {
      top: 0;
      left: 0;
    }

    .night {
      bottom: 0;
      right: 0;
      color: white;
    }
  `

  @property({ type: Number })
  seed = 0

  renderMeal(date: Dayjs = dayjs()) {
    const seed = dayjs(0).add(this.seed, 'day')

    const { carbohydrate: lunchMealCarbohydrate, protein: lunchMealProtein } = getLunchMeal({ seed, date })
    const { carbohydrate: dinnerMealCarbohydrate } = getDinnerMeal({ seed, date })

    return html`
        <div>
          <div class="date">${date.format('dddd, DD MMMM YYYY')}</div>
          <div class="day">
            <div>
              <img src=${sun} />
              <div>${lunchMealProtein.name}</div>
              <div>${lunchMealCarbohydrate.name}</div>
            </div>
          </div>
          <div class="night">
            <div>
              <img src=${moon} />
              <div>${dinnerMealCarbohydrate.name}</div>
            </div>
          </div>
        </div>
      `
  }

  renderCalendar() {
    return Array(30).fill(undefined).map((_, i) => {
      return html`
        ${this.renderMeal(dayjs().add(i, 'day'))}
        <hr />
      `
    })
  }

  render() {
    return this.renderMeal()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'today-meal': TodayMeal
  }
}
