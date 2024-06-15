import { Transform } from 'class-transformer'
import * as xss from 'xss'

const { filterXSS: libFilterXSS } = xss

const whiteList = (xss.default as any).whiteList

export const filterXSS = (value: string) =>
  libFilterXSS(value, {
    stripIgnoreTag: true,
    stripIgnoreTagBody: true,
  }).replace(/\[removed\]/gim, '')

/**
 * Filtra da string sintaxes perigosas
 * que possibilitem ataque XSS.
 *
 * @returns Retorna uma string limpa
 * de comandos maliciosos.
 */
export const FilterXSS = () => Transform(({ value }) => filterXSS(value))

/**
 * Filtra da string sintaxes perigosas, mas neste
 * caso libera mais tags para poder ser usável em
 * editores HTML.
 */
export const filterXSSEditor = (value: string) =>
  libFilterXSS(value, {
    stripIgnoreTag: true,
    stripIgnoreTagBody: true,
    css: true,
    whiteList: { ...whiteList, style: [], link: ['rel', 'href'] },
    onIgnoreTagAttr: (tag, name, value, isWhiteAttr) => {
      if (name === 'style' || name === 'class' || isWhiteAttr)
        return `${name}="${value}"`
      return null
    },
  })

/**
 * Filtra da string sintaxes perigosas, mas neste
 * caso libera mais tags para poder ser usável em
 * editores HTML.
 */
export const FilterXSSEditor = () =>
  Transform(({ value }) => filterXSSEditor(value))
