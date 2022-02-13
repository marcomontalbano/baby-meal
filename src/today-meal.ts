import dayjs, { Dayjs } from 'dayjs'
import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { getDinnerMeal, getLunchMeal } from './meal'

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
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
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
          <div>${date.format('dddd DD MMMM YYYY')}</div>
          <div>${lunchMealProtein.name} - ${lunchMealCarbohydrate.name}</div>
          <div>${dinnerMealCarbohydrate.name}</div>
        </div>
      `
  }

  render() {
    return Array(30).fill(undefined).map((_, i) => {
      return html`
        ${this.renderMeal(dayjs().add(i, 'day'))}
        <hr />
      `
    })
  }

  rendder() {
    return this.renderMeal()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'today-meal': TodayMeal
  }
}
