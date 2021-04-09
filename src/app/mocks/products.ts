import { Product } from '../models/product';
import { Lang } from '../models/lang';

const PRODUCTS_MOCK_RU: Array<Product> = [
  {
    name: 'Австралийская овчарка',
    description: `Австралийская овчарка или аусси (англ. Australian Shepherd, Aussie) порода собак среднего размера, выведенная на ранчо в западных штатах США. Несмотря на название, они не имеют отношения к Австралии, родина их Америка.`,
    picture: 'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg',
  },
  {
    name: 'Австралийская пастушья собака',
    description:
      'Австралийская пастушья собака или австралийский хилер (англ. Australian Cattle Dog) порода изначально появившаяся в Австралии. Пастушья собака, которая помогала перегонять стада через суровые земли. Среднего размера и короткошерстные, они бывают двух окрасов — голубого и красного.',
    picture:
      'https://lh3.googleusercontent.com/proxy/1DNxAKCTIoz2T_tHbSXu8A7xzdAmWAZX5ini_f4Jg9aOsoVXSaHnEVZnWrtbkgWL8dyg3Oqe2c0uEvuZyEDpC_AeRqlpuGN2Ke5P2SNDjVwAeUQ',
  },
  {
    name: 'Австралийский келпи',
    description:
      'Австралийский келпи (англ. Australian Kelpie) это пастушья собака родом из Австралии, которая мастерски управляется со стадом без помощи хозяина. Среднего размера, она может быть практически любого окраса и сейчас в основном используется по своему назначению.',
    picture:
      'https://lh3.googleusercontent.com/proxy/Luu_RtvtnkAXfEOwLV6HIJqlwGeErNaoPee0ot41bCEBwxQ9Z505hkaUfwCTPHzFRkIs04QS5kmrXn4',
  },
  {
    name: 'Аляскинский маламут',
    description:
      'Аляскинский маламут (англ. Alaskan Malamute) это крупная собака, предназначенная для работы в упряжке на Аляске. Считается что это одна из древнейших пород собак, выведенная эскимосским племенем малемьют сначала как обычная, а затем как ездовая собака. Зачастую их путают с сибирскими хаски, так как у них схожие окрасы, но маламуты значительно крупнее и обладают более доминантным характером.',
    picture:
      'https://mybarbos.com/wp-content/uploads/2016/08/aljaskinskij-malamut-03.jpg',
  },
  {
    name: 'Американский булли',
    description:
      'Американский булли (англ. American Bully) — молодая порода собак, которая впервые появилась в 1990 годах и внезапно приобрела большую популярность. Эти собаки известны своей суровой и пугающей внешностью, но дружелюбным характером.',
    picture: 'https://sobaky.info/wp-content/uploads/2020/04/7-7.jpg',
  },
  {
    name: 'Басенджи',
    description:
      'Басенджи или африканская нелающая собака (англ. Basenji) это древнейшая порода охотничьих собак, родом из центральной Африки. Эти собаки издают необычные звуки, схожие с урчанием, так как у них необычная форма гортани. За это их еще называют не лающими собаками, а звуки, которые они издают — “barroo”.',
    picture: 'https://petsi.net/images/dogbreed/26.jpg',
  },
];

const PRODUCTS_MOCK_EN: Array<Product> = [
  {
    name: 'Australian shepherd',
    description: `The Australian Shepherd, Aussie is a medium-sized ranch bred in the western states of the United States. Despite the name, they are not related to Australia, their homeland is America.`,
    picture: 'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg',
  },
  {
    name: 'Australian cattle dog',
    description:
      'The Australian Cattle Dog breed originally originated in Australia. A herding dog who helped drive herds across the harsh lands. Medium in size and short-haired, they come in two colors - blue and red.',
    picture:
      'https://lh3.googleusercontent.com/proxy/1DNxAKCTIoz2T_tHbSXu8A7xzdAmWAZX5ini_f4Jg9aOsoVXSaHnEVZnWrtbkgWL8dyg3Oqe2c0uEvuZyEDpC_AeRqlpuGN2Ke5P2SNDjVwAeUQ',
  },
  {
    name: 'Australian kelpie',
    description:
      'The Australian Kelpie is a herding dog native to Australia that is adept at handling a herd without the help of an owner. Medium in size, it can be of almost any color and is now mostly used for its intended purpose.',
    picture:
      'https://lh3.googleusercontent.com/proxy/Luu_RtvtnkAXfEOwLV6HIJqlwGeErNaoPee0ot41bCEBwxQ9Z505hkaUfwCTPHzFRkIs04QS5kmrXn4',
  },
  {
    name: 'Alaskan Malamute',
    description:
      'The Alaskan Malamute is a large sled dog in Alaska. It is believed that this is one of the oldest dog breeds, bred by the Eskimo tribe Malemute, first as an ordinary dog, and then as a sled dog. They are often confused with Siberian huskies, as they have similar colors, but malamutes are much larger and have a more dominant character.',
    picture:
      'https://mybarbos.com/wp-content/uploads/2016/08/aljaskinskij-malamut-03.jpg',
  },
  {
    name: 'American bully',
    description:
      'The American Bully is a young dog breed that first appeared in the 1990s and suddenly became very popular. These dogs are known for their harsh and intimidating appearance but friendly disposition.',
    picture: 'https://sobaky.info/wp-content/uploads/2020/04/7-7.jpg',
  },
  {
    name: 'Basenji',
    description:
      'Basenji or African barking dog (English Basenji) is the oldest breed of hunting dogs, originally from central Africa. These dogs make unusual rumbling sounds as they have an unusual larynx shape. For this they are also called not barking dogs, but the sounds they make are “barroo”.',
    picture: 'https://petsi.net/images/dogbreed/26.jpg',
  },
];

export function getProducts(lang: Lang): Array<Product> {
  switch (lang) {
    case 'en':
      return PRODUCTS_MOCK_EN;
    case 'ru':
      return PRODUCTS_MOCK_RU;
  }

  return [];
}
