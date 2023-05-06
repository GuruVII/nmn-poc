export type TranslatedText = {sl_m: string, sl_f?: string, en?: string};
export type OptionallyTranslatedText = string | TranslatedText;

export function getOptionallyTranslatedText(text: OptionallyTranslatedText, locale: any): string {
  if (typeof text === 'string') {
    return text;
  }

  return text[locale as unknown as 'sl_m' | 'sl_f' | 'en'] ?? text['sl_m'];
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
  encryption?: {correctPassword: string, decodedMessage: string}
}



export type HintCardData = {
  title: OptionallyTranslatedText,
  name: OptionallyTranslatedText,
  externalSite?: {href: string, title?: string} // title should probably be removed!
  hintCards: HintCard[],
  grants: number,
}

export const availableCards: {[x: string]: HintCardData} = {
  artefakt: {
    title: 'ARTEFAKT',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://www.artefakt.si',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/artefakt.jpg',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Trgovina z nakitom, dodatki in dekorativnimi izdelki za vse ljubitelje zgodovine, fantazije, mitologije, srednjega veka, gotike, čarobnih kamnov, zmajev, vil in ostalih mističnih bitij.',
          sl_f: 'Trgovina z nakitom, dodatki in dekorativnimi izdelki za vse ljubitelje zgodovine, fantazije, mitologije, srednjega veka, gotike, čarobnih kamnov, zmajev, vil in ostalih mističnih bitij.',
          en: 'Shop with jewelry, accessories and decorative products for all lovers of history, fantasy, mythology, the Middle Ages, Gothic style, magical stones, dragons, fairies and other mystical creatures.',
        },

      },
    ],
    grants: 1
  },
  belaanabyanabela: {
    title: 'BelaanaByAnabela',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://www.instagram.com/belaanabyanabela/',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/bela.png',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Za kristale velja, da imajo zdravilno moč. Lahko pa te tudi poškodujejo, če jih dobiš v glavo. Tako, da svojo pot nadaljuj previdno.',
          sl_f: 'Za kristale velja, da imajo zdravilno moč. Lahko pa te tudi poškodujejo, če jih dobiš v glavo. Tako, da svojo pot nadaljuj previdno.',
          en: 'They say that crystal have healing powers. But they can also hurt you if you get them in the head. So continue your journey carefully.',
        },
      },
    ],
    grants: 1
  },
  anyanary: {
    title: 'Anyanary',
    name: '',
    externalSite: {
      href: 'https://www.instagram.com/anyanary/',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/anyanary.jpg',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Tu boste našli različne izdelke na tematiko anime, iger, risank in originalnih dizajnov. Pa tudi veliko muc.',
          sl_f: 'Tu boste našli različne izdelke na tematiko anime, iger, risank in originalnih dizajnov. Pa tudi veliko muc.',
          en: 'Here you will find many items, from original designs to anime, game and cartoon themed art. As well a many cats.',
        },
      },
    ],
    grants: 1
  },
  ashiewolfe: {
    title: 'Ashiewolfe',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://www.instagram.com/ashiewolfe/',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/ashie.jpg',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Haii! Sem Ashiewolfe. le prikupen mali volk, poln veselja in strasti do risanja. Risanje je bil del mojega življenja že od malih nog in zdaj sem tu, da svoje prikupne risbe delim z vsemi! Obiščite me na moji stojnici, da boste dobili srečo :)',
          sl_f: 'Haii! Sem Ashiewolfe. le prikupen mali volk, poln veselja in strasti do risanja. Risanje je bil del mojega življenja že od malih nog in zdaj sem tu, da svoje prikupne risbe delim z vsemi! Obiščite me na moji stojnici, da boste dobili srečo :)',
          // eslint-disable-next-line quotes
          en: `Haii! I'm Ashiewolfe. Just a cute little wolf filled with joy and passion for art. Drawing has been a part of my life ever since I was a little cub and now I'm here to share my cute little art with all of you! Come visit me at my stand, to get lucky :)`,
        },
      },
    ],
    grants: 1
  },
  mofucon: {
    title: 'MofuCon',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://mofucon.si/',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/mufocon.png',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'MofuCon je največja anime konvencija v Sloveniji. Na naši stojnici se lahko potopite v našo manga knjižnico in spremljate dogodivščine vaših najljubših anime likov. A to ni vse. Na stojnici bomo igrali japonsko igro s kartami imenovano karuta, ki je podobna igri spomina. Pozor, dodali smo ji namreč anime pridih! Pridružite se nam!',
          en: 'MofuCon is the largest anime convention in Slovenia. At our stand, you can immerse yourself in our manga library and follow the adventures of your favourite anime characters. But that\'s not all. At thstand we will play a Japanese card game called karuta, which is similar to a game of memory. Attention, we have added an anime touch to it! Join us!',
        },
      },
    ],
    grants: 1
  },
  cheekyorchid: {
    title: 'Cheeky Orchid',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://www.cheekyorchid.art',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/cheeky.png',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Med grozljivim in prikupnim, fantastičnim in neumnim.',
          sl_f: 'Med grozljivim in prikupnim, fantastičnim in neumnim.',
          en: 'Home of the horrific and the fantastic.',
        },
      },
    ],
    grants: 1
  },
  wargamingslovenija: {
    title: 'Wargaming Slovenija',
    name: '',
    externalSite: {
      href: 'https://wargaming.si/',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/ws.png',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: ' Wargaming Slovenija, kocke, miniature in dobra družba! Pew pew!',
          sl_f: ' Wargaming Slovenija, kocke, miniature in dobra družba! Pew pew!',
          en: 'Wargaming Slovenia, dice, miniatures and good company! Pew pew!',
        },
      },
    ],
    grants: 1
  },
  umiko: {
    title: 'Kulturno društvo UMIKO',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://www.umiko.si/',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/umiko.jpg',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Smo kulturno društvo iz Kopra, ki združuje ljubitelje japonske pop kulture. Vsako leto organiziramo anime konvencijo UmiKo. Za člane organiziramo igranje družabnih iger in izlete na anime konvencije.',
          sl_f: 'Smo kulturno društvo iz Kopra, ki združuje ljubitelje japonske pop kulture. Vsako leto organiziramo anime konvencijo UmiKo. Za člane organiziramo igranje družabnih iger in izlete na anime konvencije.',
          en: 'We are a cultural association from Koper, which brings together fans of Japanese pop culture. Every year we organize an anime convention UmiKo. For members we organize board games and trips to anime conventions.',
        },
      },
    ],
    grants: 1
  },
  'gil-galad': {
    title: 'Slovensko Tolkienovo društvo Gil-galad',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://www.drustvogil-galad.si/',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/gg.png',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Fantazijski kotiček za slikanje',
          sl_f: 'Fantazijski kotiček za slikanje',
          en: 'Fantasy photobooth',
        },
      },
    ],
    grants: 1
  },
  larp: {
    title: 'Slovenska LARP skupnost',
    name: '',
    externalSite: {
      href: 'https://linktr.ee/larpskupnostslovenije',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/larp.png',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Si že kdaj spoznal orka? Ali pa ti je pot prekrižal pirat? Si se že kdaj usedel na popoldanski čaj s kraljico ali pa se mečeval s vitezinjo sosednje kraljevine? Kaj pa videl čisto pravega vampirja? ✨ Dobrodošel na igre LARP, kjer je vse to možno! "Akcijsko igranje vlog" ali LARP, je oblika iger vlog, kjer se s pomočjo kostuma v svoj lik zares preleviš ter s preostalimi igralci okoli sebe soustvariš fantazijski svet poln dogodivščin. ',
          sl_f: 'Si že kdaj spoznal orka? Ali pa ti je pot prekrižal pirat? Si se že kdaj usedel na popoldanski čaj s kraljico ali pa se mečeval s vitezinjo sosednje kraljevine? Kaj pa videl čisto pravega vampirja? ✨ Dobrodošel na igre LARP, kjer je vse to možno! "Akcijsko igranje vlog" ali LARP, je oblika iger vlog, kjer se s pomočjo kostuma v svoj lik zares preleviš ter s preostalimi igralci okoli sebe soustvariš fantazijski svet poln dogodivščin. ',
          en: 'Have you ever met an orc? Or crossed paths with a pirate? Have you had the chance to sit down for an afternoon tea with the queen, or have dueled with a knight from a neighboring kingdom? What about seen a real vampire? ✨ Welcome to LARP games, where all of this is possible! "Live action role playing" or LARP, is a form of role-playing games where, with the help of a costume, you transform into your character and with your fellow players co-create a fantasy world full of adventures. ',
        },
      },
    ],
    grants: 2
  },
  imshynka: {
    title: 'ImShyka',
    name: '',
    externalSite: {
      href: 'https://www.instagram.com/imshyka/',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/shyka.jpg',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Odkrijte domišljiski svet, ki ga je ustvarila Shyka.',
          sl_f: 'Odkrijte domišljiski svet, ki ga je ustvarila Shyka.',
          en: 'discover a fantasy world created by Shyka.',
        },
      },
    ],
    grants:1
  },
  lonelywolf: {
    title: 'lonelywolfJ',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://linktr.ee/Lonelywolfj',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/lonely.jpg',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Sva slovenska cosplayerja katero strast do iger izrazava v obliki kostumov! Aktivno tekmujema in tudi ponujama moznost narocil kostumov ali rekvizitov iz katere koli zanre ali sveta domislije!',
          sl_f: 'Sva slovenska cosplayerja katero strast do iger izrazava v obliki kostumov! Aktivno tekmujema in tudi ponujama moznost narocil kostumov ali rekvizitov iz katere koli zanre ali sveta domislije!',
          // eslint-disable-next-line quotes
          en: `We're Slovenian cosplayers that express our love for games is cosplay! We actively compete and we are open for any kind of commission work be it prop or costume and sky's the limit to what can be made!`,
        },
      },
    ],
    grants:1
  },
  sitri: {
    title: 'Sitri',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://linktr.ee/sitri',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/sitri.png',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Sitri z vero v povezavo med umetnostjo in tehnologijo ustvarja maksimalistične dodatke za vsak outfit in vsak dom. Ponujamo potiskane majice in ročno izdelane preproge s cyberpunk in kjut motivi, sick nakit in okusno čudaške usnjene chokerje.',
          sl_f: 'Sitri z vero v povezavo med umetnostjo in tehnologijo ustvarja maksimalistične dodatke za vsak outfit in vsak dom. Ponujamo potiskane majice in ročno izdelane preproge s cyberpunk in kjut motivi, sick nakit in okusno čudaške usnjene chokerje.',
          en: 'Sitri with faith in the connection between art and technology creates maximalist accessories for every outfit and every home. We offer printed t-shirts and handmade rugs with cyberpunk and cute motives, sick jewelry and tasty quirky leather chokers.',
        },
      },
    ],
    grants:1
  },
  questgiver: {
    title: 'The Questgiver',
    name: '(visit for reward after finishing the quest)',
    externalSite: {
      href: 'https://d20.si/en/',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/questgiver2.png',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Pozdravljen, sem vsemogočno bitje znano pod imenom The Questgiver.',
          sl_f: 'Pozdravljena, sem vsemogočno bitje znano pod imenom The Questgiver.',
          en: 'Greetings fellow human, I am the omnipotent being known as the Questgiver.',
        },
      },
    ],
    grants:2
  },
  orcwmd: {
    title: 'Tajni podatki',
    name: 'Red šepetov',
    externalSite: {
      href: 'https://instagram.com/shaman_urkog/',
      title: 'website'
    },
    hintCards: [
      {
        imageUrl: '/images/cards/orcwmd-0.webp',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'V gorah proti severu so se začele pojavljati čudne kovinske stebre. Zdi se, da orki zanje zelo dobro skrbijo. Na prvi pogled ni videti, da bi te stvari predstavljale kakšno nevarnost.',
          en: 'Strange steel towers have started to appear in the mountains to the north. Orcs seem to care for them ... reasonably well. At the first glance it doesn\'t seem dangerous.'
        }
      },
      {
        imageUrl: '/images/cards/orcwmd-1.webp',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Prvi pogled pogosto zavaja. Skupina potikavcev je sledila stebrom in odkrila, da vodijo do ene izmed višjih gora. Na vrhu gore sedi velikanska stavba, iz katere se v nebo dvigajo mogočne vrvi, na katere so vpete košare. Njihovega namena niso odkrili, vendar pa verjetno ne pomeni nič dobrega.',
          en: 'A group of rangers followed the steel towers — they lead to one of the highest mountains in the area. At the top of the mountains is a giant building, from which giant ropes rise into the sky, with giant baskets attached to them. Their purpose is so far still unknown, but it cannot be good.'
        }
      }
    ],
    grants: 1
  }
};
