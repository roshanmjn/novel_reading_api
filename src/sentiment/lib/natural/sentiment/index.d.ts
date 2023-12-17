

import { Stemmer } from '../stemmers'

export type AfinnLanguageType = 'afinn'
export type AfinnLanguage = 'English' | 'Spanish' | 'Portuguese'

export type SenticonLanguageType = 'senticon'
export type SenticonLanguage = 'Spanish' | 'English' | 'Galician' | 'Catalan' | 'Basque'

export type PatternLanguageType = 'pattern'
export type PatternLanguage = 'Dutch' | 'Italian' | 'English' | 'French' | 'German'

export declare class SentimentAnalyzer {
  constructor (language: AfinnLanguage, stemmer: Stemmer, type: AfinnLanguageType)
  constructor (language: SenticonLanguage, stemmer: Stemmer, type: SenticonLanguageType)
  constructor (language: PatternLanguage, stemmer: Stemmer, type: PatternLanguageType)
  getSentiment (words: string[]): number
}
