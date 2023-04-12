
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
}



export type HintCardData = {
  title: OptionallyTranslatedText,
  name: OptionallyTranslatedText,
  externalSite?: {href: string, title?: string} // title should probably be removed!
  hintCards: HintCard[],
  grants: {path: string, z?: number}
}

export const availableCards: {[x: string]: HintCardData} = {
  tam: {
    title: 'The Engineer',
    name: 'Tamius',
    externalSite: {
      href: 'http://tamius.net',
      title: 'website',
    },
    hintCards: [
      {
        imageUrl: '/images/cards/varrus.webp',
        cardFormat: HintCardFormat.ImageText,
        text: {
          sl_m: 'Pred tabo stoji ponosni borec za Ascalon, ki po pravici ne pripada ljudem. Zate ima namig.',
          sl_f: 'Pred tabo stoji ponosni borec za Ascalon, ki po pravici ne pripada ljudem. Zate ima namig.',
          en: 'A proud fighter for Ascalon — which is rightful charr clay — stands before you with a hint.',
        },
      },
      {
        cardFormat: HintCardFormat.Text,
        text: {
          sl_m: `Kva za kurca si ti lih kar reku o meni, ti prekleta pizda? Sam tok da veš, jst sm diplomiral kot najboljši v svojem razredu v Krvni legiji,
                  bil sem del neštevnih napadov na Plamensko Legijo, in imam čez 300 potrjenih ubojev. Izurjen sem v gorilskem vojskovanju, hkrati pa sm tudi
                  najboljši ostrostrelec iz vseh Askalonskih bojnih sil. Ti zame nis nič drugega kot še ena tarča. Jst te bom pobrisal z natančnostjo, kakršne
                  cela jebena Tirija ne pomni v celi svoji zgodovini. Dobr si zapomn, kva ti pravm. Misliš, da loh brez posledic blatiš mene bolj kot določen
                  folk blati črno luknjo? Premisl še enkat, pedr pofukan. Trenutno kontaktiram celotn red šepeta in legijo pepela, k mata svoje agente skrite
                  po celmu Askalonu, pa tvojmu IP naslovu sledimo prav ta moment tko da se priprav na vihar, ki prihaja prot teb. Vihar, ki bo spihov stran to
                  bedno stvar, ki ji pravš svoje življenje. Gotof si, mali. Jst sm loh kjerkol, kadarkol, in te loh sam s svojim šapam fentam na prek sedemsto
                  različnih načinov. Ne le da sm dobro izurjen v neoboroženem spopadu, ampak mam tud dostop do celga arsenala Železne Legije in kar verjem d
                  ga bom ponucal v največjem možnem obsegu, sam zato da zbrišem tvojo žalostno rt iz obličja tega kontinenta, preklet drek mali. Če bi le vedu,
                  kašn nesvet povračilo bo prinesu tvoj "pametn" komentar, potem bi mogoče držu svoj jezik u svoj gofl. Ampak nisi mogu, nisi? Zdej pa jokaš
                  k plačuješ za svoje šalabajzerije, preklet kreten. Svojo jezo bom sral prek tebe in ti boš utonu u njej. Gotof si, mladič.`,
          sl_f: `Kva za kurca si ti lih kar rekla o meni, ti prekleta pizda? Sam tok da veš, jst sm diplomiral kot najboljši v svojem razredu v Krvni legiji,
                  bil sem del neštevnih napadov na Plamensko Legijo, in imam čez 300 potrjenih ubojev. Izurjen sem v gorilskem vojskovanju, hkrati pa sm tudi
                  najboljši ostrostrelec iz vseh Askalonskih bojnih sil. Ti zame nis nič drugega kot še ena tarča. Jst te bom pobrisal z natančnostjo, kakršne
                  cela jebena Tirija ne pomni v celi svoji zgodovini. Dobr si zapomn, kva ti pravm. Misliš, da loh brez posledic blatiš mene bolj kot določen
                  folk blati črno luknjo? Premisl še enkat, kuzla pofukana. Trenutno kontaktiram celotn red šepeta in legijo pepela, k mata svoje agente skrite
                  po celmu Askalonu, pa tvojmu IP naslovu sledimo prav ta moment tko da se priprav na vihar, ki prihaja prot teb. Vihar, ki bo spihov stran to
                  bedno stvar, ki ji pravš svoje življenje. Gotova si, malia. Jst sm loh kjerkol, kadarkol, in te loh sam s svojim šapam fentam na prek sedemsto
                  različnih načinov. Ne le da sm dobro izurjen v neoboroženem spopadu, ampak mam tud dostop do celga arsenala Železne Legije in kar verjem d
                  ga bom ponucal v največjem možnem obsegu, sam zato da zbrišem tvojo žalostno rt iz obličja tega kontinenta, prekleta dreklina mala. Če bi le vedu,
                  kašn nesvet povračilo bo prinesu tvoj "pametn" komentar, potem bi mogoče držala svoj jezik u svoj gofl. Ampak nisi mogla, nisi? Zdej pa jokaš
                  k plačuješ za svoje šalabajzerije, prekleta lajdra neumna. Svojo jezo bom sral prek tebe in ti boš utonila u njej. Fertik si, mladič.`,
          en: `What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Blood Legion,
                  and I've been involved in numerous secret raids on Flame Legion, and I have over 300 confirmed kills. I am trained in gorilla warfare
                  and I'm the top sniper in the entire Ascalon armed forces. You are nothing to me but just another target. I will wipe you the fuck out
                  with the precision the like of which has never been seen before in Tyria, mark my fucking words. You think you can get away with saying
                  that shit to me over the internet? Think again, fucker. As we speak I am contacting the order of whispers spread all over Ascalon and
                  your IP address is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little
                  thing you call your life. You're fucking dead, cub. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and
                  that's just with my bare paws. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the Iron
                  Legion and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could
                  have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking
                  tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will
                  drown in it. You're fucking dead, cubbo.`
        }
      },
      {
        cardFormat: HintCardFormat.Image,
        imageUrl: '/images/cards/drau.jpg'
      }
    ],
    grants: {
      path: '/images/mosaic/l3.webp',
      z: 2,
    }
  },
  vrark: {
    title: 'The Goblin',
    name: 'Vrark',
    externalSite: {
      href: 'https://steamcommunity.com/id/tamius-han/stats/355790/achievements/',
    },
    hintCards: [{
      cardFormat: HintCardFormat.ImageText,
      imageUrl: '/images/cards/vrark.webp',
      text: {
        sl_m: 'Alora pronto, pri meni je skonto',
        sl_f: 'Alora pronto, pri meni je skonto',
        en: 'Alora pronto, pls disconto'
      }
    }],
    grants: {
      path: '/images/mosaic/l2.webp',
      z: 1,
    }
  },
  urkog: {
    title: 'The Shaman',
    name: 'Urkôg of clan Kulšodôbri',
    externalSite: {
      href: 'https://github.com/tamius-han/'
    },
    hintCards: [{
      cardFormat: HintCardFormat.ImageText,
      imageUrl: '/images/cards/orgrim.webp',
      text: {
        sl_m: 'Jst sm ork, ki spamma. Ni tle modov, tud ne bana.',
        sl_f: 'Jst sm ork, ki spamma. Ni tle modov, tud ne bana.',
        en: 'me orc. me spam. no mods. no ban'
      }
    }],
    grants: {
      path: '/images/mosaic/l1.webp',
    }
  }
};
