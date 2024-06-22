import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Função para criar classes para o atributo class do HTML.
 * @param classnames classes CSS
 * @returns classes
 */
export const classNames = (...classnames: ClassValue[]) => {
  return twMerge(clsx(classnames))
}
