import type { Character } from './characters';

export interface EpisodeScene {
  illust?: string;
  title: string;
  body: string;
}

export interface Episode {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  duration: string;
  status: 'online' | 'soon';
  cover: string;
  audio?: string;
  banner?: string;
  color: string;
  excerpt: string;
  intro: string;
  scenes: EpisodeScene[];
  body?: string;
  charactersInScene: string[];
  characterChips?: { id: string; role: string }[];
  next?: { title: string; status: 'online' | 'soon' };
}

import { characters } from './characters';

const charMap = (id: string): Character => characters.find(c => c.id === id)!;

export const episodes: Episode[] = [
  {
    slug: '1-冰火仙子',
    number: 1,
    title: '冰火仙子',
    subtitle: '光明之心被夺之夜',
    duration: '约 12 分钟',
    status: 'online',
    cover: '/assets/covers/1-冰火仙子.jpg',
    audio: '/audio/1-冰火仙子.mp3',
    color: 'ice',
    excerpt: '冰仙子召出地下之石砸向巫婆，火仙子甩起火绳转圈舞套住巫婆——两位小勇士第一次出击，但光明之心已经变成了黑暗核心。阿玛利亚温柔地说：「下次，肯定能找到。」',
    intro: '从前森林里住着一群仙子，仙子首领叫阿玛利亚，她守护着最珍贵的光明之心。直到巫巫女的到来——',
    scenes: [
      {
        illust: '/assets/characters/仙子首领-阿玛利亚.jpg',
        title: '森林仙子村',
        body: '阿玛利亚是妈妈首领，紫色长卷发、粉色蝴蝶结、蓝色眼眸。光明之心蕴含三种元素——紫、绿、橙，对应三个宝宝。',
      },
      {
        illust: '/assets/characters/女巫-巫巫女.jpg',
        title: '巫巫女的偷袭',
        body: '巫巫女趁夜偷走了三个宝宝和光明之心，把光明之心变成黑暗核心。黑暗魔法还污染了梦梦的紫光。',
      },
      {
        illust: '/assets/characters/冰仙子-冰冰.jpg',
        title: '冰仙子出击',
        body: '冰冰释放冰雾为阿玛利亚降温，然后和火火一起飞向黑暗城堡。冰冰召唤地下之石砸向巫婆，但被黑暗核心挡住了。',
      },
      {
        illust: '/assets/characters/火仙子-火火.jpg',
        title: '火仙子的火绳',
        body: '火火用火绳转圈舞套住了巫婆，但巫婆挣脱出来，反击把冰冰和火火逼退。两位小勇士第一次出击失败。',
      },
      {
        illust: '/assets/characters/仙子首领-阿玛利亚.jpg',
        title: '阿玛利亚的鼓励',
        body: '「没关系。魔法没了可以再练，下次会更努力。」——阿玛利亚温柔地摸了摸冰冰和火火的头。明天，月月和境境会出战。',
      },
    ],
    charactersInScene: ['amalia', 'mengmeng', 'miaomiao', 'youyou', 'bingbing', 'huohuo', 'witch'],
    next: { title: '植物梦幻仙子', status: 'online' },
  },
  {
    slug: '2-植物梦幻仙子',
    number: 2,
    title: '植物梦幻仙子',
    subtitle: '藤蔓与幻梦',
    duration: '约 11 分钟',
    status: 'online',
    cover: '/assets/covers/2-植物梦幻仙子.jpg',
    audio: '/audio/2-植物梦幻仙子.mp3',
    color: 'dream',
    excerpt: '月月用藤蔓缠住巫婆，境境用梦幻魔法把藤蔓变成紫金色，光明之心回归，三个宝宝得救，巫婆被关进了库克多监狱。',
    intro: '第二天一早，阿玛利亚还在发烫。月月和境境来救梦梦了——',
    scenes: [
      {
        illust: '/assets/characters/植物仙子-月月-正常模式.jpg',
        title: '月月的藤蔓',
        body: '月月召唤无数绿色藤蔓从地下钻出来，把巫巫女裹得严严实实。巫婆拼命挣扎，藤蔓开始"咔咔"作响。',
      },
      {
        illust: '/assets/characters/梦幻仙子-境境.jpg',
        title: '境境的梦幻变换',
        body: '境境举起玫瑰盾牌释放梦幻变换术，把绿色藤蔓变成紫金色！藤蔓变得又坚固又柔软，巫婆的黑暗魔法也震不开。',
      },
      {
        illust: '/assets/characters/宝宝仙子-梦梦.jpg',
        title: '救出梦梦',
        body: '境境冲进黑暗城堡深处，用梦幻净化术净化梦梦身上的黑暗魔法。光明之心回归，三种元素重新平衡。',
      },
      {
        illust: '/assets/characters/女巫-巫巫女.jpg',
        title: '巫婆入狱',
        body: '巫婆被押送到了库克多监狱。梦梦、苗苗、悠悠都回到了妈妈身边。明天，会有新的保护者到来。',
      },
    ],
    charactersInScene: ['amalia', 'mengmeng', 'miaomiao', 'youyou', 'yueyue', 'jingjing', 'witch'],
    next: { title: '白雪仙子', status: 'online' },
  },
  {
    slug: '3-白雪仙子',
    number: 3,
    title: '白雪仙子',
    subtitle: '冰雪山脉救援',
    duration: '约 13 分钟',
    status: 'online',
    cover: '/assets/covers/3-白雪仙子.jpg',
    audio: '/audio/3-白雪仙子.mp3',
    color: 'snow',
    excerpt: '巫婆越狱了！她把宝宝藏在冰雪山脉。蓉蓉带着阿玛利亚的冰之力宝石，独自飞越雪山救出三个宝宝，精灵王子健健和小豆包仙子包包也来到了仙子村。',
    intro: '巫婆从库克多监狱里逃了出来——',
    scenes: [
      {
        illust: '/assets/characters/白雪仙子-蓉蓉.jpg',
        title: '蓉蓉出战',
        body: '巫婆把三个宝宝藏在冰雪山脉的最高峰。阿玛利亚把冰之力宝石交给蓉蓉，让蓉蓉独自出战。',
      },
      {
        illust: '/assets/characters/女巫-巫巫女.jpg',
        title: '冰冻巫婆',
        body: '冰之力宝石释放出强大的冰雪能量，冰晶像暴风雪一样冻住了巫婆。阿玛利亚用阳光把冰之力宝石变成金黄色，三个宝宝得救。',
      },
      {
        illust: '/assets/characters/仙子首领-阿玛利亚.jpg',
        title: '新伙伴到来',
        body: '库克多带着精灵王子健健来到仙子村。小豆包仙子包包通过传送门回归。仙子村的队伍又壮大了！',
      },
    ],
    charactersInScene: ['amalia', 'mengmeng', 'miaomiao', 'youyou', 'rongrong', 'witch', 'kukeduo', 'jianjian', 'baobao'],
    next: { title: '恶魔王大战斗', status: 'online' },
  },
  {
    slug: '4-恶魔王大战斗',
    number: 4,
    title: '恶魔王大战斗',
    subtitle: '黑暗城堡毒液',
    duration: '约 10 分钟',
    status: 'online',
    cover: '/assets/covers/4-恶魔王大战斗.jpg',
    audio: '/audio/4-恶魔王大战斗.mp3',
    color: 'witch',
    excerpt: '巫婆的 boss 恶魔王和女蝙蝠侠出现了！包包用豆包甜品转转枪，健健用精灵弓。但冰火仙子的魔法被毒液腐蚀了，三花猫仙子 Niki 来了。',
    intro: '更大的威胁正在逼近——恶魔王来了！',
    scenes: [
      {
        illust: '/assets/characters/女巫-巫巫女.jpg',
        title: '恶魔王降临',
        body: '恶魔王和女蝙蝠侠从黑暗城堡飞出，比巫婆强大百倍！包包用豆包甜品转转枪，健健用精灵弓迎敌。',
      },
      {
        illust: '/assets/characters/冰仙子-冰冰.jpg',
        title: '冰火魔法被腐蚀',
        body: '黑暗城堡喷出紫色浓液和绿色毒液，冰冰的冰系魔法和火火的火系魔法都被腐蚀了！阿玛利亚安慰她们："没关系的，下次会更努力。"',
      },
      {
        illust: '/assets/characters/仙子首领-阿玛利亚.jpg',
        title: 'Niki 加入',
        body: '库克多又来了，这次带来了猫咪仙子国的三花猫仙子 Niki。新的战斗即将开始。',
      },
    ],
    charactersInScene: ['amalia', 'mengmeng', 'miaomiao', 'youyou', 'bingbing', 'huohuo', 'witch', 'baobao', 'jianjian', 'demon', 'batwoman', 'kukeduo', 'kiki'],
    next: { title: '第五集', status: 'soon' },
  },
];

export const getEpisodeBySlug = (slug: string) => episodes.find(e => e.slug === slug);

export const getCharactersInScene = (ep: Episode) => ep.charactersInScene.map(id => charMap(id));

export const allCharacters = characters;