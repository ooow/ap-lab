import { Language } from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import { Product } from 'src/app/shared/model/product';

const PRODUCTS_MOCK_RU: ReadonlyArray<Product> = [
  {
    name: 'Австралийская овчарка',
    description: `Австралийская овчарка или аусси (англ. Australian Shepherd, Aussie) порода собак среднего размера, выведенная на ранчо в западных штатах США. Несмотря на название, они не имеют отношения к Австралии, родина их Америка.`,
    picture: 'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg',
    counts: [
      { location: 'США', quantityAvailable: 54, price: 1200 },
      { location: 'Канада', quantityAvailable: 112, price: 1100 },
      { location: 'Франция', quantityAvailable: 99, price: 900 },
      { location: 'Великобритания', quantityAvailable: 12, price: 1500 },
      { location: 'Австралия', quantityAvailable: 22, price: 800 },
    ],
  },
  {
    name: 'Австралийская пастушья собака',
    description:
      'Австралийская пастушья собака или австралийский хилер (англ. Australian Cattle Dog) порода изначально появившаяся в Австралии. Пастушья собака, которая помогала перегонять стада через суровые земли. Среднего размера и короткошерстные, они бывают двух окрасов — голубого и красного.',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/c/cc/ACD-blue-spud.jpg',
    counts: [
      { location: 'США', quantityAvailable: 11, price: 1400 },
      { location: 'Канада', quantityAvailable: 82, price: 1200 },
      { location: 'Франция', quantityAvailable: 0, price: 2000 },
      { location: 'Великобритания', quantityAvailable: 34, price: 1700 },
      { location: 'Австралия', quantityAvailable: 234, price: 700 },
    ],
  },
  {
    name: 'Австралийский келпи',
    description:
      'Австралийский келпи (англ. Australian Kelpie) это пастушья собака родом из Австралии, которая мастерски управляется со стадом без помощи хозяина. Среднего размера, она может быть практически любого окраса и сейчас в основном используется по своему назначению.',
    picture:
      'https://i.pinimg.com/originals/4c/21/0b/4c210bed718f49d742e9e9215d49d66c.png',
    counts: [
      { location: 'США', quantityAvailable: 54, price: 950 },
      { location: 'Канада', quantityAvailable: 45, price: 1100 },
      { location: 'Франция', quantityAvailable: 23, price: 1330 },
      { location: 'Великобритания', quantityAvailable: 4, price: 1620 },
      { location: 'Австралия', quantityAvailable: 23, price: 650 },
    ],
  },
  {
    name: 'Аляскинский маламут',
    description:
      'Аляскинский маламут (англ. Alaskan Malamute) это крупная собака, предназначенная для работы в упряжке на Аляске. Считается что это одна из древнейших пород собак, выведенная эскимосским племенем малемьют сначала как обычная, а затем как ездовая собака. Зачастую их путают с сибирскими хаски, так как у них схожие окрасы, но маламуты значительно крупнее и обладают более доминантным характером.',
    picture:
      'https://2.bp.blogspot.com/-pbdNn_1TOyI/V14_6BIJXGI/AAAAAAAAF2o/ZLRrUxl6G4AgMnWsattnhTdaoHGPwq9FwCKgB/s1600/Alaskan_Malamute_Lead_Shot.jpg',
    counts: [
      { location: 'США', quantityAvailable: 32, price: 700 },
      { location: 'Канада', quantityAvailable: 72, price: 450 },
      { location: 'Франция', quantityAvailable: 23, price: 700 },
      { location: 'Великобритания', quantityAvailable: 45, price: 900 },
      { location: 'Австралия', quantityAvailable: 86, price: 1100 },
    ],
  },
  {
    name: 'Американский булли',
    description:
      'Американский булли (англ. American Bully) — молодая порода собак, которая впервые появилась в 1990 годах и внезапно приобрела большую популярность. Эти собаки известны своей суровой и пугающей внешностью, но дружелюбным характером.',
    picture: 'https://sobaky.info/wp-content/uploads/2020/04/7-7.jpg',
    counts: [
      { location: 'США', quantityAvailable: 11, price: 500 },
      { location: 'Канада', quantityAvailable: 0, price: 550 },
      { location: 'Франция', quantityAvailable: 44, price: 780 },
      { location: 'Великобритания', quantityAvailable: 144, price: 920 },
      { location: 'Австралия', quantityAvailable: 10, price: 660 },
    ],
  },
  {
    name: 'Басенджи',
    description:
      'Басенджи или африканская нелающая собака (англ. Basenji) это древнейшая порода охотничьих собак, родом из центральной Африки. Эти собаки издают необычные звуки, схожие с урчанием, так как у них необычная форма гортани. За это их еще называют не лающими собаками, а звуки, которые они издают — “barroo”.',
    picture: 'https://petsi.net/images/dogbreed/26.jpg',
    counts: [
      { location: 'США', quantityAvailable: 22, price: 1500 },
      { location: 'Канада', quantityAvailable: 155, price: 1450 },
      { location: 'Франция', quantityAvailable: 3, price: 1400 },
      { location: 'Великобритания', quantityAvailable: 88, price: 1100 },
      { location: 'Австралия', quantityAvailable: 83, price: 1800 },
    ],
  },
  {
    name: 'Австралийская овчарка',
    description: `Австралийская овчарка или аусси (англ. Australian Shepherd, Aussie) порода собак среднего размера, выведенная на ранчо в западных штатах США. Несмотря на название, они не имеют отношения к Австралии, родина их Америка.`,
    picture: 'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg',
    counts: [
      { location: 'США', quantityAvailable: 54, price: 1200 },
      { location: 'Канада', quantityAvailable: 112, price: 1100 },
      { location: 'Франция', quantityAvailable: 99, price: 900 },
      { location: 'Великобритания', quantityAvailable: 12, price: 1500 },
      { location: 'Австралия', quantityAvailable: 22, price: 800 },
    ],
  },
  {
    name: 'Австралийская пастушья собака',
    description:
      'Австралийская пастушья собака или австралийский хилер (англ. Australian Cattle Dog) порода изначально появившаяся в Австралии. Пастушья собака, которая помогала перегонять стада через суровые земли. Среднего размера и короткошерстные, они бывают двух окрасов — голубого и красного.',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/c/cc/ACD-blue-spud.jpg',
    counts: [
      { location: 'США', quantityAvailable: 11, price: 1400 },
      { location: 'Канада', quantityAvailable: 82, price: 1200 },
      { location: 'Франция', quantityAvailable: 0, price: 2000 },
      { location: 'Великобритания', quantityAvailable: 34, price: 1700 },
      { location: 'Австралия', quantityAvailable: 234, price: 700 },
    ],
  },
  {
    name: 'Австралийский келпи',
    description:
      'Австралийский келпи (англ. Australian Kelpie) это пастушья собака родом из Австралии, которая мастерски управляется со стадом без помощи хозяина. Среднего размера, она может быть практически любого окраса и сейчас в основном используется по своему назначению.',
    picture:
      'https://i.pinimg.com/originals/4c/21/0b/4c210bed718f49d742e9e9215d49d66c.png',
    counts: [
      { location: 'США', quantityAvailable: 54, price: 950 },
      { location: 'Канада', quantityAvailable: 45, price: 1100 },
      { location: 'Франция', quantityAvailable: 23, price: 1330 },
      { location: 'Великобритания', quantityAvailable: 4, price: 1620 },
      { location: 'Австралия', quantityAvailable: 23, price: 650 },
    ],
  },
  {
    name: 'Аляскинский маламут',
    description:
      'Аляскинский маламут (англ. Alaskan Malamute) это крупная собака, предназначенная для работы в упряжке на Аляске. Считается что это одна из древнейших пород собак, выведенная эскимосским племенем малемьют сначала как обычная, а затем как ездовая собака. Зачастую их путают с сибирскими хаски, так как у них схожие окрасы, но маламуты значительно крупнее и обладают более доминантным характером.',
    picture:
      'https://2.bp.blogspot.com/-pbdNn_1TOyI/V14_6BIJXGI/AAAAAAAAF2o/ZLRrUxl6G4AgMnWsattnhTdaoHGPwq9FwCKgB/s1600/Alaskan_Malamute_Lead_Shot.jpg',
    counts: [
      { location: 'США', quantityAvailable: 32, price: 700 },
      { location: 'Канада', quantityAvailable: 72, price: 450 },
      { location: 'Франция', quantityAvailable: 23, price: 700 },
      { location: 'Великобритания', quantityAvailable: 45, price: 900 },
      { location: 'Австралия', quantityAvailable: 86, price: 1100 },
    ],
  },
  {
    name: 'Американский булли',
    description:
      'Американский булли (англ. American Bully) — молодая порода собак, которая впервые появилась в 1990 годах и внезапно приобрела большую популярность. Эти собаки известны своей суровой и пугающей внешностью, но дружелюбным характером.',
    picture: 'https://sobaky.info/wp-content/uploads/2020/04/7-7.jpg',
    counts: [
      { location: 'США', quantityAvailable: 11, price: 500 },
      { location: 'Канада', quantityAvailable: 0, price: 550 },
      { location: 'Франция', quantityAvailable: 44, price: 780 },
      { location: 'Великобритания', quantityAvailable: 144, price: 920 },
      { location: 'Австралия', quantityAvailable: 10, price: 660 },
    ],
  },
  {
    name: 'Басенджи',
    description:
      'Басенджи или африканская нелающая собака (англ. Basenji) это древнейшая порода охотничьих собак, родом из центральной Африки. Эти собаки издают необычные звуки, схожие с урчанием, так как у них необычная форма гортани. За это их еще называют не лающими собаками, а звуки, которые они издают — “barroo”.',
    picture: 'https://petsi.net/images/dogbreed/26.jpg',
    counts: [
      { location: 'США', quantityAvailable: 22, price: 1500 },
      { location: 'Канада', quantityAvailable: 155, price: 1450 },
      { location: 'Франция', quantityAvailable: 3, price: 1400 },
      { location: 'Великобритания', quantityAvailable: 88, price: 1100 },
      { location: 'Австралия', quantityAvailable: 83, price: 1800 },
    ],
  },
];

const PRODUCTS_MOCK_EN: ReadonlyArray<Product> = [
  {
    name: 'Australian shepherd',
    description:
      'The Australian Shepherd, Aussie is a medium-sized ranch bred in the western states of the United States. Despite the name, they are not related to Australia, their homeland is America.',
    picture: 'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 54, price: 1200 },
      { location: 'Canada', quantityAvailable: 112, price: 1100 },
      { location: 'France', quantityAvailable: 99, price: 900 },
      { location: 'United Kingdom', quantityAvailable: 12, price: 1500 },
      { location: 'Australia', quantityAvailable: 22, price: 800 },
    ],
  },
  {
    name: 'Australian cattle dog',
    description:
      'The Australian Cattle Dog breed originally originated in Australia. A herding dog who helped drive herds across the harsh lands. Medium in size and short-haired, they come in two colors - blue and red.',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/c/cc/ACD-blue-spud.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 11, price: 1400 },
      { location: 'Canada', quantityAvailable: 82, price: 1200 },
      { location: 'France', quantityAvailable: 0, price: 2000 },
      { location: 'United Kingdom', quantityAvailable: 34, price: 1700 },
      { location: 'Australia', quantityAvailable: 234, price: 700 },
    ],
  },
  {
    name: 'Australian kelpie',
    description:
      'The Australian Kelpie is a herding dog native to Australia that is adept at handling a herd without the help of an owner. Medium in size, it can be of almost any color and is now mostly used for its intended purpose.',
    picture:
      'https://i.pinimg.com/originals/4c/21/0b/4c210bed718f49d742e9e9215d49d66c.png',
    counts: [
      { location: 'USA', quantityAvailable: 54, price: 950 },
      { location: 'Canada', quantityAvailable: 45, price: 1100 },
      { location: 'France', quantityAvailable: 23, price: 1330 },
      { location: 'United Kingdom', quantityAvailable: 4, price: 1620 },
      { location: 'Australia', quantityAvailable: 23, price: 650 },
    ],
  },
  {
    name: 'Alaskan Malamute',
    description:
      'The Alaskan Malamute is a large sled dog in Alaska. It is believed that this is one of the oldest dog breeds, bred by the Eskimo tribe Malamute, first as an ordinary dog, and then as a sled dog. They are often confused with Siberian huskies, as they have similar colors, but malamutes are much larger and have a more dominant character.',
    picture:
      'https://2.bp.blogspot.com/-pbdNn_1TOyI/V14_6BIJXGI/AAAAAAAAF2o/ZLRrUxl6G4AgMnWsattnhTdaoHGPwq9FwCKgB/s1600/Alaskan_Malamute_Lead_Shot.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 32, price: 700 },
      { location: 'Canada', quantityAvailable: 72, price: 450 },
      { location: 'France', quantityAvailable: 23, price: 700 },
      { location: 'United Kingdom', quantityAvailable: 45, price: 900 },
      { location: 'Australia', quantityAvailable: 86, price: 1100 },
    ],
  },
  {
    name: 'American bully',
    description:
      'The American Bully is a young dog breed that first appeared in the 1990s and suddenly became very popular. These dogs are known for their harsh and intimidating appearance but friendly disposition.',
    picture: 'https://sobaky.info/wp-content/uploads/2020/04/7-7.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 11, price: 500 },
      { location: 'Canada', quantityAvailable: 0, price: 550 },
      { location: 'France', quantityAvailable: 44, price: 780 },
      { location: 'United Kingdom', quantityAvailable: 144, price: 920 },
      { location: 'Australia', quantityAvailable: 10, price: 660 },
    ],
  },
  {
    name: 'Basenji',
    description:
      'Basenji or African barking dog (English Basenji) is the oldest breed of hunting dogs, originally from central Africa. These dogs make unusual rumbling sounds as they have an unusual larynx shape. For this they are also called not barking dogs, but the sounds they make are “barroo”.',
    picture: 'https://petsi.net/images/dogbreed/26.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 22, price: 1500 },
      { location: 'Canada', quantityAvailable: 155, price: 1450 },
      { location: 'France', quantityAvailable: 3, price: 1400 },
      { location: 'United Kingdom', quantityAvailable: 88, price: 1100 },
      { location: 'Australia', quantityAvailable: 83, price: 1800 },
    ],
  },
  {
    name: 'Australian shepherd',
    description:
      'The Australian Shepherd, Aussie is a medium-sized ranch bred in the western states of the United States. Despite the name, they are not related to Australia, their homeland is America.',
    picture: 'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 54, price: 1200 },
      { location: 'Canada', quantityAvailable: 112, price: 1100 },
      { location: 'France', quantityAvailable: 99, price: 900 },
      { location: 'United Kingdom', quantityAvailable: 12, price: 1500 },
      { location: 'Australia', quantityAvailable: 22, price: 800 },
    ],
  },
  {
    name: 'Australian cattle dog',
    description:
      'The Australian Cattle Dog breed originally originated in Australia. A herding dog who helped drive herds across the harsh lands. Medium in size and short-haired, they come in two colors - blue and red.',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/c/cc/ACD-blue-spud.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 11, price: 1400 },
      { location: 'Canada', quantityAvailable: 82, price: 1200 },
      { location: 'France', quantityAvailable: 0, price: 2000 },
      { location: 'United Kingdom', quantityAvailable: 34, price: 1700 },
      { location: 'Australia', quantityAvailable: 234, price: 700 },
    ],
  },
  {
    name: 'Australian kelpie',
    description:
      'The Australian Kelpie is a herding dog native to Australia that is adept at handling a herd without the help of an owner. Medium in size, it can be of almost any color and is now mostly used for its intended purpose.',
    picture:
      'https://i.pinimg.com/originals/4c/21/0b/4c210bed718f49d742e9e9215d49d66c.png',
    counts: [
      { location: 'USA', quantityAvailable: 54, price: 950 },
      { location: 'Canada', quantityAvailable: 45, price: 1100 },
      { location: 'France', quantityAvailable: 23, price: 1330 },
      { location: 'United Kingdom', quantityAvailable: 4, price: 1620 },
      { location: 'Australia', quantityAvailable: 23, price: 650 },
    ],
  },
  {
    name: 'Alaskan Malamute',
    description:
      'The Alaskan Malamute is a large sled dog in Alaska. It is believed that this is one of the oldest dog breeds, bred by the Eskimo tribe Malamute, first as an ordinary dog, and then as a sled dog. They are often confused with Siberian huskies, as they have similar colors, but malamutes are much larger and have a more dominant character.',
    picture:
      'https://2.bp.blogspot.com/-pbdNn_1TOyI/V14_6BIJXGI/AAAAAAAAF2o/ZLRrUxl6G4AgMnWsattnhTdaoHGPwq9FwCKgB/s1600/Alaskan_Malamute_Lead_Shot.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 32, price: 700 },
      { location: 'Canada', quantityAvailable: 72, price: 450 },
      { location: 'France', quantityAvailable: 23, price: 700 },
      { location: 'United Kingdom', quantityAvailable: 45, price: 900 },
      { location: 'Australia', quantityAvailable: 86, price: 1100 },
    ],
  },
  {
    name: 'American bully',
    description:
      'The American Bully is a young dog breed that first appeared in the 1990s and suddenly became very popular. These dogs are known for their harsh and intimidating appearance but friendly disposition.',
    picture: 'https://sobaky.info/wp-content/uploads/2020/04/7-7.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 11, price: 500 },
      { location: 'Canada', quantityAvailable: 0, price: 550 },
      { location: 'France', quantityAvailable: 44, price: 780 },
      { location: 'United Kingdom', quantityAvailable: 144, price: 920 },
      { location: 'Australia', quantityAvailable: 10, price: 660 },
    ],
  },
  {
    name: 'Basenji',
    description:
      'Basenji or African barking dog (English Basenji) is the oldest breed of hunting dogs, originally from central Africa. These dogs make unusual rumbling sounds as they have an unusual larynx shape. For this they are also called not barking dogs, but the sounds they make are “barroo”.',
    picture: 'https://petsi.net/images/dogbreed/26.jpg',
    counts: [
      { location: 'USA', quantityAvailable: 22, price: 1500 },
      { location: 'Canada', quantityAvailable: 155, price: 1450 },
      { location: 'France', quantityAvailable: 3, price: 1400 },
      { location: 'United Kingdom', quantityAvailable: 88, price: 1100 },
      { location: 'Australia', quantityAvailable: 83, price: 1800 },
    ],
  },
];

export function getProducts(lang: Language): ReadonlyArray<Product> {
  switch (lang) {
    case Language.en:
      return PRODUCTS_MOCK_EN;
    case Language.ru:
      return PRODUCTS_MOCK_RU;
    default:
      return [];
  }
}
