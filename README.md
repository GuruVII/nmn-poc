# nmn-poc

* node 16
* `npm ci`
* `npm run dev`
* `npm run build`

Konfiguracija za kartice v `/src/config/card.js`.

Format podatkov:

```ts
export type HintCardData = {
  title: OptionallyTranslatedText,
  name: OptionallyTranslatedText,
  externalSite?: {href: string, title?: string} // title should probably be removed!
  hintCards: HintCard[],
  grants: {path: string, z?: number}
}

export enum HintCardFormat {
  Text = 1,
  ImageText = 2,
  Image = 3,
}

export type HintCard = {
  cardFormat: HintCardFormat,
  imageUrl?: string;
  text?: TranslatedText
}

export type TranslatedText = {sl_m: string, sl_f?: string, en?: string};

export type OptionallyTranslatedText = string | TranslatedText;
```

Prevodi v `/src/i18n/*`.
