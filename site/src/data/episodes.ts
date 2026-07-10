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
    excerpt: '巫婆的 boss 恶魔王和女蝙蝠侠出现了！包包用豆包甜品转转枪，健健用精灵弓。但冰火仙子的魔法被毒液腐蚀了，三花猫仙子 Kiki 来了。',
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
        title: 'Kiki 加入',
        body: '库克多又来了，这次带来了猫咪王国的三花猫仙子 Kiki。新的战斗即将开始。',
      },
    ],
    charactersInScene: ['amalia', 'mengmeng', 'miaomiao', 'youyou', 'bingbing', 'huohuo', 'witch', 'baobao', 'jianjian', 'demon', 'batwoman', 'kukeduo', 'kiki'],
    next: { title: '仙子朋友的故事', status: 'online' },
  },
  {
    slug: '5-仙子朋友的故事',
    number: 5,
    title: '仙子朋友的故事',
    subtitle: '树桥边的新朋友',
    duration: '约 12 分钟',
    status: 'online',
    cover: '/assets/covers/5-仙子朋友的故事.jpg',
    audio: '/audio/5-仙子朋友的故事.mp3',
    color: 'snow',
    excerpt: 'Kiki想回猫咪王国看好朋友花花、泡泡、毛毛了。蓉蓉送给她传送门小包包，以后随时可以来仙子森林玩，还可以带朋友们一起来！',
    intro: 'Kiki想回猫咪王国了——她有几个好朋友在等她，花花、泡泡、毛毛是谁呢？',
    scenes: [
      {
        illust: '/assets/characters/三花猫仙子-Kiki.jpg',
        title: 'Kiki想家了',
        body: '自从库克多带来Kiki后，她一直和大家住在一起。可是今天Kiki想回猫咪王国了，她想念好朋友花花、泡泡、毛毛。',
      },
      {
        illust: '/assets/characters/精灵王子守卫-库克多.jpg',
        title: '库克多的朋友',
        body: '花花、泡泡、毛毛都是库克多介绍给Kiki认识的！花花会变魔术，泡泡会吹泡泡，毛毛会做毛线玩具。',
      },
      {
        illust: '/assets/characters/白雪仙子-蓉蓉.jpg',
        title: '传送门小包包',
        body: '蓉蓉送给Kiki一个传送门小包包。想朋友的时候，说一声"去仙子森林"，传送门嘟嘟嘟嘟嘟，嗖的一下就到了！',
      },
      {
        illust: '/assets/characters/三花猫仙子-Kiki.jpg',
        title: '回到猫咪王国',
        body: '传送门嘟嘟嘟嘟嘟——"到猫咪王国，乘客请下车。"Kiki挥手告别，下次一定会带花花、泡泡、毛毛一起来！',
      },
    ],
    charactersInScene: ['rongrong', 'kiki', 'kukeduo', 'bingbing', 'huohuo', 'amalia'],
    next: { title: '仙子交了新朋友的故事', status: 'online' },
  },
  {
    slug: '6-仙子交了新朋友的故事',
    number: 6,
    title: '仙子交了新朋友的故事',
    subtitle: '蔬菜王国的西兰花仙子',
    duration: '约 10 分钟',
    status: 'online',
    cover: '/assets/covers/6-仙子交了新朋友的故事.jpg',
    audio: '/audio/6-仙子交了新朋友的故事.mp3',
    color: 'leaf',
    excerpt: '阿玛利亚在树桥另一边遇到了迷路的西兰花仙子兰兰。兰兰来自蔬菜王国，阿玛利亚用传送门送她回家，还送了她一个仙子小手表。朋友越来越多，仙子森林越来越热闹！',
    intro: '阿玛利亚去树桥另一边查看花草地的恢复情况——',
    scenes: [
      {
        illust: '/assets/characters/仙子首领-阿玛利亚.jpg',
        title: '阿玛利亚出发',
        body: '恶魔王的毒液破坏了森林，阿玛利亚去树桥另一边查看花草地的恢复情况。清晨的花草地美极了，到处都是五颜六色的小花。',
      },
      {
        illust: '/assets/characters/西兰花仙子-兰兰.jpg',
        title: '迷路的兰兰',
        body: '花丛后面蹲着一个小姑娘——橙红色双丸子头别着西兰花发饰，红色蓬蓬裙，琥珀金色大眼睛里挂着泪珠。她是蔬菜王国的西兰花仙子兰兰。',
      },
      {
        illust: '/assets/characters/仙子首领-阿玛利亚.jpg',
        title: '仙子小手表',
        body: '阿玛利亚送给兰兰传送门小包包和仙子小手表。想朋友的时候，按一下表上的小仙子，传送门就会打开！',
      },
      {
        illust: '/assets/characters/西兰花仙子-兰兰.jpg',
        title: '回到蔬菜王国',
        body: '传送门嘟嘟嘟嘟嘟——"到蔬菜王国，乘客请下车。"兰兰蹦蹦跳跳地跳进传送门，回到了蔬菜王国！',
      },
    ],
    charactersInScene: ['amalia', 'lanlan', 'rongrong', 'bingbing', 'huohuo', 'mengmeng', 'miaomiao', 'youyou'],
    next: { title: '凯蒂猫仙子翠翠用凯蒂猫攻击魔法打败僵尸魔法师', status: 'online' },
  },
  {
    slug: '7-凯蒂猫仙子翠翠用凯蒂猫攻击魔法打败僵尸魔法师',
    number: 7,
    title: '凯蒂猫仙子翠翠用凯蒂猫攻击魔法打败僵尸魔法师',
    subtitle: '八仙子彩虹力量',
    duration: '约 12 分钟',
    status: 'online',
    cover: '/assets/covers/7-凯蒂猫仙子翠翠用凯蒂猫攻击魔法打败僵尸魔法师.jpg',
    audio: '/audio/7-凯蒂猫仙子翠翠用凯蒂猫攻击魔法打败僵尸魔法师.mp3',
    color: 'leaf',
    excerpt: '仙子村来了八位新仙子——翠翠、彤彤、妮妮、可可、妙妙、彩彩、虹虹、晶晶！可是地下沉睡的僵尸魔法师醒来了，他是黑暗魔王和女蝙蝠侠的 BOSS。八位新仙子把专属颜色力量合在一起，用彩虹力量打败了僵尸魔法师！',
    intro: '仙子森林越来越热闹了——八位新仙子从装扮森林来了！',
    scenes: [
      {
        illust: '/assets/characters/凯蒂猫仙子-翠翠.jpg',
        title: '新仙子到来',
        body: '翠翠是凯蒂猫仙子，翡翠绿眼睛、黑色单马尾、白色凯蒂猫衣服。彤彤是美乐蒂仙子，棕色粉双马尾、橙色美乐蒂衣服。还有妮妮、可可、妙妙、彩彩、虹虹、晶晶！',
      },
      {
        illust: '/assets/characters/仙子首领-阿玛利亚.jpg',
        title: '阿玛利亚的欢呼',
        body: '八位新仙子从装扮森林来到仙子森林，阿玛利亚高兴地欢呼："哇！来了好多人呀！"大家一起玩耍，翠翠教凯蒂猫舞，彤彤教美乐蒂歌。',
      },
      {
        illust: '/assets/characters/僵尸魔法师.jpg',
        title: '僵尸魔法师苏醒',
        body: '地下沉睡的僵尸魔法师醒来了！他是黑暗魔王和女蝙蝠侠的 boss，穿着破烂黑色长袍，灰白脸色，绿色发光眼睛。他要打败仙子们！',
      },
      {
        illust: '/assets/characters/凯蒂猫仙子-翠翠.jpg',
        title: '彩虹力量',
        body: '八位新仙子把自己的专属颜色力量合在一起——红色、深蓝、深绿力量汇聚，彩虹的元素可以打败僵尸魔法师！大家欢呼："你们真厉害！"',
      },
    ],
    charactersInScene: ['amalia', 'cuicui', 'tongtong', 'nini', 'keke', 'mmiaomiao', 'caicai', 'honghong', 'crystaljj', 'zombie', 'rongrong', 'bingbing', 'huohuo', 'mengmeng', 'miaomiao', 'youyou'],
    next: { title: '美乐蒂仙子彤彤用美乐蒂魔法攻击打败僵尸魔法师和他的女朋友', status: 'online' },
  },
  {
    slug: '8-美乐蒂仙子彤彤用美乐蒂魔法攻击打败僵尸魔法师和他的女朋友',
    number: 8,
    title: '美乐蒂仙子彤彤用美乐蒂魔法攻击打败僵尸魔法师和他的女朋友',
    subtitle: '美乐蒂的温柔力量',
    duration: '约 11 分钟',
    status: 'online',
    cover: '/assets/covers/8-美乐蒂仙子彤彤用美乐蒂魔法攻击打败僵尸魔法师和他的女朋友.jpg',
    audio: '/audio/8-美乐蒂仙子彤彤用美乐蒂魔法攻击打败僵尸魔法师和他的女朋友.mp3',
    color: 'amber',
    excerpt: '僵尸魔法师带着女朋友来破坏仙子村！彤彤用美乐蒂攻击魔法打败了他们。新来的仙子们是从装扮村来的，装扮森林是装扮仙子的家，她们住在花朵树屋里。僵尸魔法师和女朋友被健健关进了墓碑牢笼。',
    intro: '第八天，僵尸魔法师带着他的女朋友来了——',
    scenes: [
      {
        illust: '/assets/characters/僵尸魔法师.jpg',
        title: '僵尸魔法师归来',
        body: '僵尸魔法师带着女朋友来破坏仙子村！女朋友穿着破烂紫色长袍，灰白脸色，紫色发光眼睛。阿玛利亚紧张地握紧了拳头。',
      },
      {
        illust: '/assets/characters/凯蒂猫仙子-翠翠.jpg',
        title: '翠翠的安慰',
        body: '翠翠轻轻地摸了摸阿玛利亚的头发说："阿玛利亚，别怕。今天轮到我了。"可是彤彤站了出来："翠翠姐姐，今天让我来吧！"',
      },
      {
        illust: '/assets/characters/美乐蒂仙子-彤彤.jpg',
        title: '美乐蒂攻击魔法',
        body: '彤彤释放美乐蒂攻击魔法，温暖的橙色光芒像巨大的美乐蒂花一样绽放！美乐蒂的力量既温柔又强大，净化了僵尸魔法师的黑暗力量。',
      },
      {
        illust: '/assets/characters/精灵王子-健健.jpg',
        title: '墓碑牢笼',
        body: '健健用精灵弓术做出墓碑牢笼，把僵尸魔法师和女朋友都关在了里面。新仙子们是从装扮村来的，住在花朵树屋里。',
      },
    ],
    charactersInScene: ['amalia', 'tongtong', 'cuicui', 'nini', 'keke', 'mmiaomiao', 'caicai', 'honghong', 'crystaljj', 'zombie', 'zombie_gf', 'jianjian', 'rongrong', 'bingbing', 'huohuo', 'mengmeng', 'miaomiao', 'youyou'],
    next: { title: '冰火能量回归', status: 'online' },
  },
  {
    slug: '9-冰火能量回归',
    number: 9,
    title: '冰火能量回归',
    subtitle: '四人联手大冒险',
    duration: '约 12 分钟',
    status: 'online',
    cover: '/assets/covers/9-冰火能量回归.jpg',
    audio: '/audio/9-冰火能量回归.mp3',
    color: 'leaf',
    excerpt: '恶魔王和女蝙蝠侠又来了！冰冰和火火的魔法还没有恢复，Kiki和兰兰站了出来。她们用猫咪守护魔法和蔬菜守护魔法唤醒了冰冰和火火沉睡的魔法力量，四个人一起打败了恶魔王和女蝙蝠侠！库克多赶来庆祝冰火魔法回归。',
    intro: '冰冰和火火的魔法还没有恢复，恶魔王和女蝙蝠侠又来了——',
    scenes: [
      {
        illust: '/assets/characters/冰仙子-冰冰.jpg',
        title: '冰火的失落',
        body: '冰冰和火火坐在池塘边发呆。自从第四集被恶魔王的毒液腐蚀后，她们的冰系魔法和火系魔法到现在还没有恢复。',
      },
      {
        illust: '/assets/characters/三花猫仙子-Kiki.jpg',
        title: 'Kiki和兰兰来访',
        body: 'Kiki从猫咪王国带来了甜甜的豆包，兰兰从蔬菜王国带来了新鲜的西兰花。她们握住了冰冰和火火的手说："好朋友就要互相帮助！"',
      },
      {
        illust: '/assets/characters/恶魔王.jpg',
        title: '恶魔王再袭',
        body: '恶魔王和女蝙蝠侠又来了！Kiki释放猫咪守护魔法，兰兰释放蔬菜守护魔法。两道光芒不仅挡住了恶魔王，还唤醒了冰冰和火火体内沉睡的魔法力量！',
      },
      {
        illust: '/assets/characters/火仙子-火火.jpg',
        title: '冰火魔法回归',
        body: '冰冰的冰之力和火火的火之力回来了！四道光芒汇聚成巨龙，打败了恶魔王和女蝙蝠侠。健健用墓碑牢笼关住了他们。库克多赶来庆祝冰火魔法回归！',
      },
    ],
    charactersInScene: ['amalia', 'bingbing', 'huohuo', 'kiki', 'lanlan', 'demon', 'batwoman', 'rongrong', 'jianjian', 'kukeduo', 'cuicui', 'tongtong', 'mengmeng', 'miaomiao', 'youyou'],
    next: { title: '仙子首领阿玛克斯', status: 'online' },
  },
  {
    slug: '10-仙子首领阿玛克斯',
    number: 10,
    title: '仙子首领阿玛克斯',
    subtitle: '新首领和小宝宝',
    duration: '约 11 分钟',
    status: 'online',
    cover: '/assets/covers/10-仙子首领阿玛克斯.jpg',
    audio: '/audio/10-仙子首领阿玛克斯.mp3',
    color: 'dream',
    excerpt: '传送门打开了，走出来的不是坏人，而是仙子森林的另一位首领——阿玛克斯！橙色短发、蓝色眼眸、绿色小帽子。阿玛利亚惊喜地扑进他的怀里。就在这时，阿玛利亚的肚子发光了，一个粉棕丸子头的小宝宝蹦了出来——朵朵！仙子森林有四个宝宝啦！',
    intro: '传送门慢慢地打开了——是那些反派回来了吗？',
    scenes: [
      {
        illust: '/assets/characters/仙子首领-阿玛利亚.jpg',
        title: '传送门打开',
        body: '仙子森林中央突然出现了传送门，阿玛利亚紧张地护住三个宝宝。可是从传送门里走出来的不是坏人，而是仙子森林的另一位首领——阿玛克斯！',
      },
      {
        illust: '/assets/characters/仙子首领-阿玛克斯.jpg',
        title: '阿玛克斯回归',
        body: '阿玛克斯是仙子森林的另一位首领，橙色短发、蓝色眼眸、绿色小帽子、绿紫色小套装。他一直在远方守护着其他仙子王国，今天终于通过传送门回到了仙子森林。',
      },
      {
        illust: '/assets/characters/仙子首领-阿玛利亚.jpg',
        title: '朵朵出生',
        body: '阿玛利亚的肚子突然发出了粉色的光芒，一个粉棕丸子头的小宝宝从光芒中蹦了出来！她穿着粉色洛丽塔小兔裙，有一对小小的粉色翅膀。阿玛利亚和阿玛克斯惊喜地喊："我们又生小宝宝啦！"',
      },
      {
        illust: '/assets/characters/宝宝仙子-朵朵.jpg',
        title: '四个宝宝',
        body: '新宝宝叫朵朵，粉色眼眸像两颗闪闪发光的宝石。她扑扑扑地扇动小翅膀，虽然飞不高但特别爱飞。梦梦、苗苗和悠悠三个姐姐都抢着要照顾她。仙子森林越来越热闹了！',
      },
    ],
    charactersInScene: ['amalia', 'amakesi', 'duoduo', 'mengmeng', 'miaomiao', 'youyou', 'bingbing', 'huohuo', 'kiki', 'lanlan', 'rongrong', 'cuicui', 'tongtong', 'yueyue', 'jingjing', 'jianjian', 'baobao'],
  },
];

export const getEpisodeBySlug = (slug: string) => episodes.find(e => e.slug === slug);

export const getCharactersInScene = (ep: Episode) => ep.charactersInScene.map(id => charMap(id));

export const allCharacters = characters;