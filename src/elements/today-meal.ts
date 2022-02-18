import dayjs, { Dayjs } from 'dayjs'
import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { getDinnerMeal, getLunchMeal } from '../meal'
import sun from '../images/sunny.svg'
import moon from '../images/full-moon.svg'

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
      top: 60px;
      left: 0;
      width: 100%;
      height: calc(100% - 60px);
      background: rgb(161,214,252);
      background: linear-gradient(135deg, rgba(220,240,255,1) 0%, rgba(65,143,239,1) 50%, rgba(49,53,101,1) 50%, rgba(1,0,17,1) 100%);
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
    }

    .date {
      height: 60px;
      position: absolute;
      top: -60px;
      left: 0;
      width: 100%;
      line-height: 60px;
      text-align: center;
    }

    .day, .night {
      position: absolute;
      width: 50%;
      height: 65%;
      display: flex;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 18px;
      min-width: 250px;
      overflow: hidden;
    }

    .day img, .night img {
      position: absolute;
    }

    .day img {
      width: 150px;
      width: 400px;

      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
    }

    .night img {
      width: 100px;
      width: 350px;

      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
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
  seed = -7

  @property({ type: Dayjs })
  date = dayjs()

  renderMeal(date: Dayjs) {
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

  private handleSwipe() {

    let xDown: number | null = null
    let yDown: number | null = null

    document.addEventListener('touchstart', (event: TouchEvent) => {
      xDown = event.changedTouches[0].screenX
      yDown = event.changedTouches[0].screenY
    });

    document.addEventListener('touchend', (event: TouchEvent) => {
      if (!xDown || !yDown) {
        return;
      }

      const xUp = event.changedTouches[0].screenX;
      const yUp = event.changedTouches[0].screenY;

      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) { // right swipe
          this.date = this.date.add(1, 'day')
        } else { // left swipe
          this.date = this.date.add(-1, 'day')
        }
      } else {
        // if (yDiff > 0) { // down swipe
        //   this.seed--
        // } else { // up swipe
        //   this.seed++
        // }
      }

      xDown = null;
      yDown = null;
    });
  }

  constructor() {
    super()

    this.handleSwipe()
  }

  render() {
    return this.renderMeal(this.date)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'today-meal': TodayMeal
  }
}
