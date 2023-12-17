

declare interface Stemmer {
  stem: (token: string) => string
  addStopWord: (stopWord: string) => void
  addStopWords: (moreStopWords: string[]) => void
  removeStopWord: (stopWord: string) => void
  removeStopWords: (moreStopWords: string[]) => void
  tokenizeAndStem: (text: string, keepStops?: boolean) => string[]
}

export let CarryStemmerFr: Stemmer
export let LancasterStemmer: Stemmer
export let PorterStemmer: Stemmer
export let PorterStemmerDe: Stemmer
export let PorterStemmerEs: Stemmer
export let PorterStemmerFa: Stemmer
export let PorterStemmerFr: Stemmer
export let PorterStemmerIt: Stemmer
export let PorterStemmerNl: Stemmer
export let PorterStemmerNo: Stemmer
export let PorterStemmerPt: Stemmer
export let PorterStemmerRu: Stemmer
export let PorterStemmerSv: Stemmer
export let StemmerId: Stemmer
export let StemmerJa: Stemmer
