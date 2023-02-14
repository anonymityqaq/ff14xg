//根据牙刷的longshi.js旧版本修改而来,无需cactbotself拓展，更改了p3、p4、p5二运横排、p6传毒dttdd、优先级以及其它一些地方小的更改
//标点默认4A1（NGA辉夜13.2、莫古力攻略）:  https://nga.178.com/read.php?tid=31807681
// 4  A  1
// D     B
// 3  C  2
//改标点的触发器已默认关闭，要改本地标点用莫灵喵的，那个更好用
//使用方法：将本文件放在(act根目录)\Plugins\ACT.OverlayPlugin\cactbot\user\raidboss文件夹里。没有raidboss文件夹就自己新建一个

//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓使用前需要更改的地方↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓修改后请重新加载cactbot
//打开队伍播放:是否头部标记，发送消息到小队聊天频道（指挥模式）-> 关闭:false,开启:true
//不建议使用此轮椅指挥，因为开关挺麻烦的不如trn方便
let 打开队伍播放=false;
//shunxu2:影响队伍的初始化、优先级
//会按order值从小到大依次分配mt st h1 h2 d1 d2 d3 d4,请根据队伍职业及位置更改order值（一般只有MTST和D1D2需要改）
//例如：默认武士order是9武僧order是10，会分配武士d1武僧d2，但假如你的队里武士是d2，武僧是d1，应将武士和武僧的order交换，即武士order：10，武僧order：9。其它职业修改同理
//黑魔默认d2近战组,打d4的话自行修改和赤魔/召唤交换order
//不改对的话会影响p2二运、p3、p5二运、p6十字火，会乱报！电椅！
let shunxu2=[
  //T
  {
    'job':'战士',
    'order':1
  },
  {
    'job':'黑骑',
    'order':2
  },
  {
    'job':'枪刃',
    'order':3
  },
  {
    'job':'骑士',
    'order':4
  },
  //奶
  {
    'job':'白魔',
    'order':5
  },
  {
    'job':'占星',
    'order':6
  },
  {
    'job':'贤者',
    'order':7
  }, 
  {
    'job':'学者',
    'order':8
  },
  //近战
  {
    'job':'武士',
    'order':9
  },
  {
    'job':'武僧',
    'order':10
  },
  {
    'job':'镰刀',
    'order':11
  },
  {
    'job':'龙骑',
    'order':12
  },
  {
    'job':'忍者',
    'order':13
  },
  {
    'job':'黑魔',
    'order':14
  },
  //远敏
  {
    'job':'诗人',
    'order':15
  },
  {
    'job':'舞者',
    'order':16
  },
  {
    'job':'机工',
    'order':17
   },
   //法系
   {
    'job':'召唤',
    'order':18
   },
   {
    'job':'赤魔',
    'order':19
   },
];
//————————————————下面的一般不需要改————————————————实在要改去cactbot config面板改，改不了的说明没想让你改
const headmarkers = {
  'hyperdimensionalSlash': '00EA',
  'firechainCircle': '0119',
  'firechainTriangle': '011A',
  'firechainSquare': '011B',
  'firechainX': '011C',
  'skywardLeap': '014A',
  'sword1': '0032',
  'sword2': '0033',
  'meteor': '011D',
  'majiang1': '013F',
  'majiang2': '0140',
  'majiang3': '0141',
  'lanbiao':'000E',
  'fuchong':'0014',
};
function nametocnjob(name,data){
  let re;
  switch (data.party.jobName(name)){
      case 'PLD':
          re = '骑士';
          break;
      case 'MNK':
          re = '武僧';
          break;
      case 'WAR':
          re = '战士';
          break;
      case 'DRG':
          re = '龙骑';
          break;
      case 'BRD':
          re = '诗人';
          break;
      case 'WHM':
          re = '白魔';
          break;
      case 'BLM':
          re = '黑魔';
          break;
      case 'SMN':
          re = '召唤';
          break;
      case 'SCH':
          re = '学者';
          break;
      case 'NIN':
          re = '忍者';
          break;
      case 'MCH':
          re = '机工';
          break;
      case 'DRK':
          re = '黑骑';
          break;
      case 'AST':
          re = '占星';
          break;
      case 'SAM':
          re = '武士';
          break;
      case 'RDM':
          re = '赤魔';
          break;
      case 'GNB':
          re = '枪刃';
          break;
      case 'DNC':
          re = '舞者';
          break;
      case 'RPR':
          re = '镰刀';
          break;
      case 'SGE':
          re = '贤者';
          break;
      case 'BLU':
          re = '青魔';
          break;
      default:
        re=name;
        break;
  };
  // 如果有重复职业，则播报职业+ID
  // t同职业
  if(data.party.roleToPartyNames_.tank[0] == data.party.roleToPartyNames_.tank[1]){
      return re + ' ' + data.ShortName(name);
  };
  // H同职业
  if(data.party.roleToPartyNames_.healer[0] == data.party.roleToPartyNames_.healer[1]){
      return re + ' ' + data.ShortName(name);
  };
  // DPS同职业
  for (let i=0;i < 3;i++ ) {
      for (let a=1 ; a < 4 ;a ++) {
          if (i==a){
              continue;
          };
          if(data.party.roleToPartyNames_.dps[i] == data.party.roleToPartyNames_.dps[a]){
              return re + ' ' + data.ShortName(name);
          };
      };       
  };
  // 没有同职业，播报职业
  return re;
};
let shunxu=[
  {
    'job':'白魔',
    'order':16
  },
  {
    'job':'占星',
    'order':17
  },
  {
    'job':'贤者',
    'order':18
 }, 
  {
    'job':'学者',
    'order':19
  },
  {
    'job':'战士',
    'order':12
 },
  {
    'job':'枪刃',
    'order':13
  },
  {
    'job':'黑骑',
    'order':14
  },
  {
    'job':'骑士',
    'order':15
  },
  {
    'job':'武士',
    'order':1
  },
  {
    'job':'武僧',
    'order':2
  },
  {
    'job':'镰刀',
    'order':3
  },
  {
    'job':'忍者',
    'order':4
  },
  {
    'job':'龙骑',
    'order':5
  },
  {
    'job':'黑魔',
    'order':6
  },
  {
    'job':'诗人',
    'order':7
  },
  {
    'job':'舞者',
    'order':8
  },
  {
    'job':'机工',
    'order':9
   }, 
   {
    'job':'召唤',
    'order':10
   },
   {
    'job':'赤魔',
    'order':11
   },
]; 
//发送消息到小队聊天框
const sendMessageToParty=(send)=>{
  if (打开队伍播放) {
    callOverlayHandler({ call: 'PostNamazu', c: 'command', p: '/p '+send });
  }
 else callOverlayHandler({ call: 'PostNamazu', c: 'command', p: '/e '+send });
}
//总是发送消息到小队聊天框
const alwaysSendMessageToParty=(send)=>{ 
  callOverlayHandler({ call: 'PostNamazu', c: 'command', p: '/p '+send }); 
}
//发送标记
const sendMark=(ActorID,MarkType,是否标记=打开队伍播放)=>{
  if (是否标记)
    callOverlayHandler({ call: 'PostNamazu', c: 'mark', p:'{"ActorID":0x'+ActorID+',"MarkType":'+MarkType+'}'});
 //else  callOverlayHandler({ call: 'PostNamazu', c: 'mark', p:'{"ActorID":0x'+ActorID+',"MarkType":'+MarkType+',LocalOnly:true}'});
}
//清除标记
const clearMark=()=>{
  for (let index = 1; index < 9; index++) {
    callOverlayHandler({ call: 'PostNamazu', c: 'command', p: '/mk clear'+' <'+index+'>' });  
  }
}
const getMark=(size)=>{
  let waymark1 = {
    B: {
      X: 100+size*Math.cos(0),
      Y: 0,
      Z: 100+size*Math.sin(0),
      Active: true
    }, 
    C: {
      X: 100+size*Math.cos(Math.PI/2),
      Y:0,
      Z: 100+size*Math.sin(Math.PI/2),
      Active: true
    },
    D: {
      X: 100+size*Math.cos(Math.PI),
      Y: 0,
      Z: 100+size*Math.sin(Math.PI),
      Active: true
    },
    A: {
      X: 100+size*Math.cos(3*Math.PI/2),
      Y: 0,
      Z: 100+size*Math.sin(3*Math.PI/2),
      Active: true
    },
};
return JSON.stringify(waymark1);
}
const tankFenZu=['战士','枪刃','黑骑','骑士'];
const matchedPositionTo4Dir = (combatant) => {
  // Positions are moved up 100 and right 100
  const y = combatant.PosY - 100;
  const x = combatant.PosX - 100;

  // During the vault knights, Adelphel will jump to one of the 4 cardinals
  // N = (100, 78), E = (122, 100), S = (100, 122), W = (78, 100)
  //
  // N = 0, E = 1, S = 2, W = 3

  return (Math.round(2 - 2 * Math.atan2(x, y) / Math.PI) % 4);
};
const matchedPositionToDir = (combatant) => {
  // Positions are moved up 100 and right 100
  const y = combatant.PosY - 100;
  const x = combatant.PosX - 100;

  // During Thordan, knight dives start at the 8 cardinals + numerical
  // slop on a radius=23 circle.
  // N = (100, 77), E = (123, 100), S = (100, 123), W = (77, 100)
  // NE = (116.26, 83.74), SE = (116.26, 116.26), SW = (83.74, 116.26), NW = (83.74, 83.74)
  //
  // Starting with northwest to favor sorting between north and south for
  // Advanced Relativity party splits.
  // Map NW = 0, N = 1, ..., W = 7

  return (Math.round(5 - 4 * Math.atan2(x, y) / Math.PI) % 8);
};
const firstMarker = {
  'doorboss': headmarkers.hyperdimensionalSlash,
  'thordan': headmarkers.skywardLeap,
};
const getHeadmarkerId = (data, matches, firstDecimalMarker) => {
  // If we naively just check !data.decOffset and leave it, it breaks if the first marker is 00DA.
  // (This makes the offset 0, and !0 is true.)
  if (data.decOffset === undefined) {
    // This must be set the first time this function is called in DSR Headmarker Tracker.
    if (firstDecimalMarker === undefined)
      throw new UnreachableCode();
    data.decOffset = parseInt(matches.id, 16) - firstDecimalMarker;
  }
  // The leading zeroes are stripped when converting back to string, so we re-add them here.
  // Fortunately, we don't have to worry about whether or not this is robust,
  // since we know all the IDs that will be present in the encounter.
  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};
const EyesPositions=[
  [0,[100,60]],
  [1,[128.28, 71.72]],
  [2,[140.00, 100.00]],
  [3,[128.28, 128.28]],
  [4,[100.00, 140.00]],
  [5,[71.72, 128.28]],
  [6,[60.00, 100.00]],
  [7,[71.72, 71.72]]
];
Options.Triggers.push({
  zoneId: ZoneId.DragonsongsRepriseUltimate,
  initData: () => {
    return {
      phase: 'doorboss',
      brightwingCounter: 1,
      传毒次数:0,
      firstAdelphelJump: true,
      p7fire:0,
      分摊次数:0,
      背对:false,
    };
  },
  timelineTriggers: [
    {
      id: "P6 初始毒之前",
      regex: /Mortal Vow/,
      suppressSeconds: 999,
      beforeSeconds: 5,
      condition: (data) => data.role === "dps",
      infoText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          cn: "散开等毒",
        },
      },
    },
  ],
  triggers: [
    {
      id: 'DSR Phase Tracker',
      type: 'StartsUsing',
      // 62D4 = Holiest of Holy
      // 63C8 = Ascalon's Mercy Concealed
      // 6708 = Final Chorus
      // 62E2 = Spear of the Fury
      // 6B86 = Incarnation
      // 6667 = unknown_6667
      // 71E4 = Shockwave
      netRegex: NetRegexes.startsUsing({ id: ['62D4', '63C8', '6708', '62E2', '6B86', '6667', '7438'], capture: true }),
      run: (data, matches) => {
        //clearMark();
        switch (matches.id) {
          case '62D4':
            data.phase = 'doorboss';
            break;
          case '63C8':
            // callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'load'});
            data.phase = 'thordan';
            break;
          case '6708':
            data.phase = 'nidhogg';
            break;
          case '62E2':
            data.phase = 'haurchefant';
            break;
          case '6B86':
            data.phase = 'thordan2';
            break;
          case '6667':
            data.phase = 'nidhogg2';
            break;
          case '71E4':
            data.phase = 'dragon-king';
            break;
        }
      },
    },
    {
      id: '是否打开鲶鱼精播报',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({id: ['62D4', '63C8']}),
      tts:null,
      alertText: (_data, _matches, output) => {
        output.text()},
      outputStrings: {
        text: {
          en:'不要队伍播报就禁用这个',
          cn:'不要队伍播报就禁用这个',
        },
      },
    },
    {
      id: '打开鲶鱼精播报',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({id: ['62D4', '63C8']}),
      disabled: true,
      delaySeconds:2,
      tts:null,
      run: (_data, _matches, output) => {
        打开队伍播放 = true;
        output.text()},

    },
    {
      id: 'DSR Headmarker Tracker',
      type: 'HeadMarker',
      netRegex: NetRegexes.headMarker({}),
      condition: (data) => data.decOffset === undefined,
      // Unconditionally set the first headmarker here so that future triggers are conditional.
      run: (data, matches) => {
        const firstHeadmarker = parseInt(firstMarker[data.phase], 16);
        getHeadmarkerId(data, matches, firstHeadmarker);
      },
    },
    {
      id: 'DSR Holiest of Holy',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62D4'}),
      response: Responses.aoe(),
    },
    {
      id: 'DSR Adelphel KB Direction',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62D4'}),  
      alertText:(data, matches, output) =>{
          let distance= Math.hypot(matches.x - 100, matches.y - 100);
          if (distance>20)
          {
            data.位置=Math.round(4 - 4 * Math.atan2(matches.x-100, matches.y-100) / Math.PI) % 8;
            switch (data.位置){
              case 0:
                return "面向上边";
                break;
              case 2:
                return "面向右边"
                break;
              case 4:
                return "面向下边"
                break;
              case 6:
                return "面向左边"
                break;
            }
          }
      }
    },
    {
      id: 'DSR Adelphel ID Tracker',
      // 62D2 Is Ser Adelphel's Holy Bladedance, casted once during the encounter
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '62D2'}),
      run: (data, matches) => data.adelphelId = matches.sourceId,
    },
    {
      id: "DSRp1安全区",
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '62CE'}),
      suppressSeconds: 10,
      duration: 3,
      promise : async (data, matches)=>{
        const me = await callOverlayHandler({
          call: 'getCombatants',
          names: [data.me,matches.source,],
        });
        data.myposX=me.combatants.find((c) => c.Name === data.me).PosX
        data.myposY=me.combatants.find((c) => c.Name === data.me).PosY;
        let p1Boss=me.combatants.find((c) => c.ID === parseInt(matches.sourceId, 16));
        data.heading=p1Boss.Heading;
      },
      alertText: (data, matches, output) => {
        let distance=Math.hypot(matches.x - data.myposX, matches.y- data.myposY);

        data.面向=Math.round(4 - 4 * parseFloat(data.heading) / Math.PI) % 8;
        let left="右右右";
        let right="左左左";
        if (distance<22) {
          switch (data.位置){
            case 0:
              if(data.面向==3) return left
              if(data.面向==5) return right
              break;
            case 2:
              if(data.面向==5) return left
              if(data.面向==7) return right
              break;
            case 4:
              if(data.面向==7) return left
              if(data.面向==1) return right
              break;
            case 6:
              if(data.面向==1) return left
              if(data.面向==3) return right
              break;
          }
        }
        else{
          switch (data.位置){
            case 0:
              if(data.面向==3) return left
              if(data.面向==5) return right
              break;
            case 2:
              if(data.面向==5) return left
              if(data.面向==7) return right
              break;
            case 4:
              if(data.面向==7) return left
              if(data.面向==1) return right
              break;
            case 6:
              if(data.面向==1) return left
              if(data.面向==3) return right
              break;
          }
        }
         
      },
    },
    {
      id: 'DSR Holiest Hallowing',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62D0'}),
      alertText: (data, matches, output) => output.text(),
      outputStrings: {
        text: {
          cn: "打断骑士",
        },
      },
    },
    {
      id: 'DSR Empty Dimension',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62DA'}),
      condition: (data, matches) => data.phase === 'doorboss' ,
      alertText: (data, _matches, output) => {
        return data.seenEmptyDimension ? output.in() : output.inAndTether();
      },
      run: (data) => data.seenEmptyDimension = true,
      outputStrings: {
        inAndTether: {
          cn: '月环+连线',
        },
        in: Outputs.in,
      },
    },
    {
      id: 'DSR Full Dimension',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62DB'}),
      response: Responses.getOut(),
    },
    {
      id: 'DSR Faith Unmoving',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62DC'}),
      response: Responses.knockback(),
    },

    {
      id: 'DSR Hyperdimensional Slash Headmarker',
      type: 'HeadMarker',
      netRegex: NetRegexes.headMarker(),
      condition: (data, matches) => data.phase === 'doorboss' && data.me === matches.target,
      alertText: (data, matches, output) => {
        const id = getHeadmarkerId(data, matches);
        if (id === headmarkers.hyperdimensionalSlash)
          return output.slashOnYou();
      },
      outputStrings: {
        slashOnYou: {
          cn: '激光点名',
        },
      },
    },
    {
      id: '获取同组',
      type: 'HeadMarker',
      netRegex: NetRegexes.headMarker(),
      tts:null,
      delaySeconds:0.1,
      alertText: (data, matches, output) => {
        if (data.color===undefined) return;
        const id = getHeadmarkerId(data, matches);
        if (id === headmarkers.firechainSquare&&data.me !== matches.target) {

        }
        switch (data.color){
          case "红":
            if (id === headmarkers.firechainCircle&&data.me !== matches.target) return "同组为"+nametocnjob(matches.target,data);
            break;
          case "绿":
            if (id === headmarkers.firechainTriangle&&data.me !== matches.target) return "同组为"+nametocnjob(matches.target,data);
            break;
          case "紫":
            if (id === headmarkers.firechainSquare&&data.me !== matches.target) return "同组为"+nametocnjob(matches.target,data);
            break;
          case "蓝":
            if (id === headmarkers.firechainX&&data.me !== matches.target) return "同组为"+nametocnjob(matches.target,data);
            break;
          default:
              return;
              break;
        } 
      },
    },
    {
      id: 'DSR Playstation Fire Chains',
      type: 'HeadMarker',
      netRegex: NetRegexes.headMarker(),
      condition: (data, matches) => data.phase === 'doorboss' && data.me === matches.target,
      alertText: (data, matches, output) => {
        const id = getHeadmarkerId(data, matches);
        if (id === headmarkers.firechainCircle)
        {
          data.color="红"
          return output.circle();
        }
          
        if (id === headmarkers.firechainTriangle)
        {
          data.color="绿"
          return output.triangle();
        }
          
        if (id === headmarkers.firechainSquare)
        {
          data.color="紫"
          return output.square();
        }
          
        if (id === headmarkers.firechainX)
        {
          data.color="蓝"
          return output.x();
        }
          
      },
      outputStrings: {
        circle: {
          en: 'Red Circle',
          de: 'Roter Kreis',
          fr: 'Cercle rouge',
          ja: '赤まる',
          cn: '红圆圈',
          ko: '빨강 동그라미',
        },
        triangle: {
          en: 'Green Triangle',
          de: 'Grünes Dreieck',
          fr: 'Triangle vert',
          ja: '緑さんかく',
          cn: '绿三角',
          ko: '초록 삼각',
        },
        square: {
          en: 'Purple Square',
          de: 'Lilanes Viereck',
          fr: 'Carré violet',
          ja: '紫しかく',
          cn: '紫方块',
          ko: '보라 사각',
        },
        x: {
          en: 'Blue X',
          de: 'Blaues X',
          fr: 'Croix bleue',
          ja: '青バツ',
          cn: '蓝X',
          ko: '파랑 X',
        },
      },
    },
    {
      id: 'DSR Brightwing Counter',
      type: 'Ability',
      // Visually, this comes from Ser Charibert.  However, ~30% of the time
      // the first set of Brightwing cleaves come from King Thordan/Ser Hermonst
      // entities.  This is likely just stale combatant data from the ffxiv plugin.
      netRegex: NetRegexes.ability({ id: '6319', capture: false }),
      // One ability for each player hit (hopefully only two??)
      suppressSeconds: 1,
      infoText: (data, _matches, output) => output[`dive${data.brightwingCounter}`](),
      run: (data) => data.brightwingCounter++,
      outputStrings: {
        // Ideally folks can customize this with who needs to run in.
        dive1: Outputs.num1,
        dive2: Outputs.num2,
        dive3: Outputs.num3,
        dive4: Outputs.num4,
      },
    },
    {
      id: 'DSR Brightwing Move',
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '6319', source: 'Ser Charibert' }),
      condition: Conditions.targetIsYou(),
      // Once hit, drop your Skyblind puddle somewhere else.
      response: Responses.moveAway('alert'),
    },
    {
      id: 'DSR Skyblind',
      // 631A Skyblind (2.2s cast) is a targeted ground aoe where A65 Skyblind
      // effect expired on the player.
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: 'A65' }),
      condition: Conditions.targetIsYou(),
      delaySeconds: (_data, matches) => parseFloat(matches.duration),
      response: Responses.moveAway(),
    },
    {
      id: 'DSR Ascalon\'s Mercy Concealed',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '63C8'}),
      suppressSeconds: 5,
      delaySeconds: (data, matches) => parseFloat(matches.castTime) - 0.7,
      response: Responses.moveAway(),
    },
    {
      id: '龙诗头部标删除',
      netRegex: NetRegexes.headMarker({}),
      suppressSeconds: 5,
      delaySeconds: 3,
      run: (data) => {
        if(data.bobao) delete data.bobao;
        
      }
  },
    {
      id: 'DSR Skyward Leap',
      netRegex: NetRegexes.headMarker({}),
      durationSeconds: 5,
      tts:null,
      alertText : (data, matches, output)=>{
        const id = getHeadmarkerId(data, matches);
        let num = parseInt(id,16);  
        if (data.bobao === undefined) data.bobao = [];
        if( id=== headmarkers.hyperdimensionalSlash)
        {
          data.bobao.push(nametocnjob(matches.target,data));
          if (data.bobao.length==4)
          {
            let abc= data.bobao.sort((a,b)=>{
              return shunxu.find((c)=>c.job==a).order-shunxu.find((c)=>c.job==b).order
            });

            return abc[0]+abc[1]+abc[2]+abc[3]
          }
        }
        if(id===headmarkers.skywardLeap)
        {
          data.bobao.push(nametocnjob(matches.target,data));
          if (data.bobao.length==3) {
            if (data.ST[3]=='贤者'||data.ST[3]=='占星'||data.ST[3]=='学者'||data.MT[3]=='贤者'||data.MT[3]=='占星'||data.MT[3]=='学者') {
              let changeParty=data.MT.concat(data.ST);
               changeParty.sort((a,b)=>{
                 return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
                 data.MT=[changeParty[0],changeParty[2],changeParty[4],changeParty[6]];
                 data.ST=[changeParty[1],changeParty[3],changeParty[5],changeParty[7]];
             }
             let abc= data.bobao.sort((a,b)=>{
              return shunxu.find((c)=>c.job==a).order-shunxu.find((c)=>c.job==b).order
            });
            data.fenzu=data.MT.concat(data.ST);
            let 除坦克外数组=data.fenzu.filter((x)=>!tankFenZu.some((item) => x === item));
            let notDianMing=除坦克外数组.filter((x)=>!abc.some((item) => x === item));  
            if (data.role==="tank") return '接线';
            if (data.bobao.includes(nametocnjob(data.me,data))) {
              return "蓝标点名"+abc[0]+abc[1]+abc[2];
            }
            else{
              return  '无点名'+notDianMing[2]+notDianMing[1]+notDianMing[0];
            }
          }
        }
      }
  },
  {
    id: 'DSR Ancient Quaga',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '63C6', capture: false }),
    response: Responses.aoe(),
  },
  {
    id: 'DSR Heavenly Heel',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '63C7' }),
    response: Responses.tankBusterSwap('alert', 'alert'),
  },
  {
    id: 'DSR Spiral Thrust Safe Spots',
    type: 'Ability',
    netRegex: NetRegexes.ability({ id: '63D3'}),
    delaySeconds: 4.5,
    promise : async (data)=>{
      const bossData = await callOverlayHandler({
        call: 'getCombatants',
      });
       data.boss1 = bossData.combatants.filter((boss) => boss.BNpcNameID===3636)[0];
       data.boss2 = bossData.combatants.filter((boss) => boss.BNpcNameID===3637)[0];
       data.boss3 = bossData.combatants.filter((boss) => boss.BNpcNameID===3638)[0];
      //  data.红色骑士=bossData.combatants.filter((boss) => boss.BNpcID===0x3139)[0];
      //  data.大剑骑士=bossData.combatants.filter((boss) => boss.BNpcID===0x3130)[0];
      return ;
    },
    alertText: (data, matches, output) => {
      if (data.一运位置 === undefined) data.一运位置 = [];
      const dirNums1 = [0, 1, 2, 3, 4, 5, 6, 7];
      data.一运位置.push(Math.round(4 - 4 * Math.atan2(data.boss1.PosX-100, data.boss1.PosY-100) / Math.PI) % 8);
      data.一运位置.push(Math.round(4 - 4 * Math.atan2(data.boss2.PosX-100, data.boss2.PosY-100) / Math.PI) % 8);
      data.一运位置.push(Math.round(4 - 4 * Math.atan2(data.boss3.PosX-100, data.boss3.PosY-100) / Math.PI) % 8);
      if (data.一运位置[0] ||data.一运位置[0] === 0) {
          delete dirNums1[( data.一运位置[0] + 4) % 8];
          delete dirNums1[ data.一运位置[0]];
        }
        if (data.一运位置[1]  ||data.一运位置[1] === 0) {
          delete dirNums1[( data.一运位置[1] + 4) % 8];
          delete dirNums1[ data.一运位置[1]];
        }
        if (data.一运位置[2]  ||data.一运位置[2] === 0) {
          delete dirNums1[( data.一运位置[2] + 4) % 8];
          delete dirNums1[ data.一运位置[2]];
        }
        if (data.partJob === undefined) data.partJob = [];
        for (let i = 0; i < 8; i++) {
          let job=nametocnjob(data.party.idToName_[data.party.partyIds_[i]],data);
           data.partJob[i]={'ID':data.party.partyIds_[i],'job': job};
        }
        if (dirNums1.includes(0)) return output.safe1();
        if (dirNums1.includes(1)) return output.safe2();
        if (dirNums1.includes(2)) return output.safe3();
        if (dirNums1.includes(3)) return output.safe4();
    },
    outputStrings: {
      作者注: { cn: "默认4A1标点" },
      safe1: {
        cn: "AC安全",
      },
      safe2: {
        cn: "1 3安全",
      },
      safe3: {
        cn: "BD安全",
      },
      safe4: {
        cn: "2 4安全",
      },
    },
  },
  {
    id: 'DSR p2二运刀分组',
    type: 'HeadMarker',
    netRegex: NetRegexes.headMarker(),
    condition: (data, matches) => data.phase === 'thordan',
    alertText: (data, matches, output) => {
      const id = getHeadmarkerId(data, matches);
      if(id!=headmarkers.sword1&&id!=headmarkers.sword2) return;
      if (data.bobao === undefined) data.bobao = [];
      if (id === headmarkers.sword1) data.bobao.push(nametocnjob(matches.target,data));
      if (id === headmarkers.sword2) data.bobao.push(nametocnjob(matches.target,data));
      if(data.bobao.length>=2){
        data.myJob=nametocnjob(data.me,data);
        let firstInMt=data.MT.includes(data.bobao[0])?'MT组':'';
        let firstInST=data.ST.includes(data.bobao[0])?'ST组':'';
        let secondInMt=data.MT.includes(data.bobao[1])?'MT组':'';
        let secondInST=data.ST.includes(data.bobao[1])?'ST组':'';
      sendMessageToParty('1刀:'+firstInMt+firstInST+data.bobao[0]+' | '+'2刀:'+secondInMt+secondInST+data.bobao[1]);
      return
      return firstInMt+firstInST+'1号点名'+data.bobao[0]+secondInMt+secondInST +'2号点名'+data.bobao[1]};
    },
  },
  {
    id: 'DSR Sanctity of the Ward Swords',
    type: 'HeadMarker',
    netRegex: NetRegexes.headMarker(),
    condition: (data, matches) => data.phase === 'thordan' && data.me === matches.target,
    alarmText: (data, matches, output) => {
      const id = getHeadmarkerId(data, matches);
      if (id === headmarkers.sword1)
        return output.sword1();
      if (id === headmarkers.sword2)
        return output.sword2();
    },
    outputStrings: {
      sword1: {
        en: '1',
        de: '1',
        ja: '1',
        cn: '1刀',
        ko: '1',
      },
      sword2: {
        en: '2',
        de: '2',
        ja: '2',
        cn: '2刀',
        ko: '2',
      },
    },
  },
  {
    id: 'DSR Sanctity of the Ward Meteor Role',
    type: 'HeadMarker',
    netRegex: NetRegexes.headMarker(),
    tts:null,
    condition: (data, matches) => data.phase === 'thordan',
    alertText: (data, matches, output) => {
      const id = getHeadmarkerId(data, matches);
      if (id === headmarkers.meteor)
        {
          if (data.bobao === undefined)  data.bobao  = [];
          data.bobao.push(nametocnjob(matches.target,data))
          if (data.bobao.length>=2) 
          
          {  let a='陨石点名'+data.bobao[0]+data.bobao [1];
          data.redIsMy=data.bobao.includes(nametocnjob(data.me,data));
          data.other=data.bobao.find((i)=>i!==nametocnjob(data.me,data));
          sendMessageToParty(a);
            return a}
        }
    },
  },

  {
    id: 'DSR 获取分组',
    type: 'Ability',
    netRegex: NetRegexes.ability({ id: '63CD'}),
    condition: (data, matches) => data.phase === 'thordan',
    run: (data, matches) => {
      let 方位=Math.round(4 - 4 * Math.atan2(matches.targetX-100, matches.targetY-100) / Math.PI) % 8;
      if (data.ST === undefined) data.ST = [];
      if (data.MT === undefined) data.MT = [];
      if (data.fenzu === undefined) data.fenzu = [];
      // if (方位===6||方位===7||方位===0||方位===1) {
      //   data.MT.push(nametocnjob(matches.target,data))
      //   if (data.MT.length>=4)  {
      //     data.MT.sort((a,b)=>{
      //       return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
      // }
      // }
      // else{
        data.ST.push(nametocnjob(matches.target,data))
        data.ST.sort((a,b)=>{
          return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
      // }

    },
  },

  //固定ac打法
  {
    id: 'DSR Sanctity of the Ward Meteor You',
    type: 'HeadMarker',
    netRegex: NetRegexes.headMarker(),
    condition: (data, matches) => data.phase === 'thordan',
    durationSeconds:5,
    alertText: (data, matches, output) => {
      const id = getHeadmarkerId(data, matches);
      if (id === headmarkers.meteor)
        {
          if(data.bobao.length>=2 )
          {
            console.log(data.fenzu);
            //       [mt,d1]
            //[h1,d3]       [h2,d4]
            //       [st,d2]
            let aPart=[data.fenzu[0],data.fenzu[2]];
            let bPart=[data.fenzu[5],data.fenzu[7]];
            let cPart=[data.fenzu[4],data.fenzu[6]];
            let dPart=[data.fenzu[1],data.fenzu[3]];

            let dianMingA=aPart.includes(data.bobao[0])||aPart.includes(data.bobao[1]);
            let dianMingB=bPart.includes(data.bobao[0])||bPart.includes(data.bobao[1]);
            let dianMingC=cPart.includes(data.bobao[0])||cPart.includes(data.bobao[1]);
            let dianMingD=dPart.includes(data.bobao[0])||dPart.includes(data.bobao[1]);
            let bobao="";;
            if (dianMingA&&dianMingB) bobao='BC互换';
            if (dianMingA&&dianMingC) bobao='不换,AC';
            if (dianMingA&&dianMingD) bobao='CD互换';
            if (dianMingB&&dianMingC) bobao='AB互换';
            if (dianMingB&&dianMingD) bobao='不换,BD';
            if (dianMingC&&dianMingD) bobao='AD互换';
            sendMessageToParty(bobao);
            return bobao
          }
        }
    },
    outputStrings: {
      注1: {
        cn: '莫古力攻略'
      },
      注2: {
        cn: '整组换,固定AC,BD不换'
      },
    },
  },

  //二运顺逆
  {
    id: 'DSR Sanctity of the Ward Direction',
    type: 'Ability',
    netRegex: NetRegexes.ability({ id: '63E1'}),
    duration:10,
    condition: (data) => data.phase === 'thordan',
    delaySeconds: 4.3,
    promise: async (data) => {
      // Only need to know one of the knights locations, Ser Janlenoux (3635)
      let combatantDataJanlenoux1 = null;
      let combatantDataJanlenoux = null;

        combatantDataJanlenoux1  = await callOverlayHandler({
          call: 'getCombatants',
        });

      combatantDataJanlenoux=combatantDataJanlenoux1.combatants.filter((boss) => boss.BNpcNameID===3635);
      // if we could not retrieve combatant data, the
      // trigger will not work, so just resume promise here

      // Sort to retreive last combatant in list
      const sortCombatants = (a ,b) => (a.ID ?? 0) - (b.ID ?? 0);
      const combatantJanlenoux =combatantDataJanlenoux.sort(sortCombatants).shift();
      if (!combatantJanlenoux)
        throw new UnreachableCode();
      data.sanctityWardDir = matchedPositionToDir(combatantJanlenoux);
    },
    infoText: (data, _matches, output) => {
      // Map of directions
      const dirs= {
        0: output.counterclock(),
        1: output.unknown(), // north position
        2: output.clockwise(),
        3: output.clockwise(),
        4: output.clockwise(),
        5: output.unknown(), // south position
        6: output.counterclock(),
        7: output.counterclock(),
        8: output.unknown(),
      };
      sendMessageToParty(dirs[data.sanctityWardDir ?? 8]);
      return dirs[data.sanctityWardDir ?? 8];
    },
    run: (data) => delete data.sanctityWardDir,
    outputStrings: {
      clockwise: {
        en: 'Clockwise',
        cn: '逆时针(左)'
      },
      counterclock: {
        en: 'Counterclockwise',
        cn: '顺时针(右)',
      },
      unknown: Outputs.unknown,
    },
  },
  {
    id: 'DSR Dragon\'s Rage',
    // 63C4 Is Thordan's --middle-- action, thordan jumps again and becomes untargetable, shortly after the 2nd 6C34 action
    type: 'Ability',
    netRegex: NetRegexes.ability({ id: '63C4', source: 'King Thordan' }),
    netRegexDe: NetRegexes.ability({ id: '63C4', source: 'Thordan' }),
    netRegexFr: NetRegexes.ability({ id: '63C4', source: 'Roi Thordan' }),
    netRegexJa: NetRegexes.ability({ id: '63C4', source: '騎神トールダン' }),
    netRegexCn: NetRegexes.ability({ id: '63C4', source: '骑神托尔丹' }),
    netRegexKo: NetRegexes.ability({ id: '63C4', source: '기사신 토르당' }),
    condition: (data) => (data.phase === 'thordan' && (data.thordanJumpCounter = (data.thordanJumpCounter ?? 0) + 1) === 2),
    delaySeconds: 0.7,
    promise: async (data, matches) => {
      // Select King Thordan
      let thordanData = null;
      thordanData = await callOverlayHandler({
        call: 'getCombatants',
        ids: [parseInt(matches.sourceId, 16)],
      });
      // if we could not retrieve combatant data, the
      // trigger will not work, so just resume promise here
      if (thordanData === null) {
        console.error(`King Thordan: null data`);
        return;
      }
      if (!thordanData.combatants) {
        console.error(`King Thordan: null combatants`);
        return;
      }
      const thordanDataLength = thordanData.combatants.length;
      if (thordanDataLength !== 1) {
        console.error(`King Thordan: expected 1 combatants got ${thordanDataLength}`);
        return;
      }

      // Add the combatant's position
      const thordan = thordanData.combatants.pop();
      if (!thordan)
        throw new UnreachableCode();
      data.thordanDir = matchedPositionToDir(thordan);
    },
    infoText: (data, _matches, output) => {
      // Map of directions
      const dirs = {
        0: output.northwest(),
        1: output.north(),
        2: output.northeast(),
        3: output.east(),
        4: output.southeast(),
        5: output.south(),
        6: output.southwest(),
        7: output.west(),
        8: output.unknown(),
      };
      return output.thordanLocation({
        dir: dirs[data.thordanDir ?? 8],
      });
    },
    run: (data) => delete data.thordanDir,
    outputStrings: {
      north: 'A点',
      northeast: '1点',
      east: 'B点',
      southeast: '2点',
      south: 'C点',
      southwest: '3点',
      west: 'D点',
      northwest: '4点',
      unknown: Outputs.unknown,
      thordanLocation: {
        en: 'Boss: ${dir}',
        cn:'骑神在: ${dir}'
      },
    },
  },
  {
    id: 'DSR Broad Swing Right',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '63C0', capture: false }),
    alertText: (_data, _matches, output) => output.text(),
    outputStrings: {
      text: {
        en: 'Behind => Right',
        de: 'Hinter ihn => Rechts',
        ja: '後ろ => 右',
        cn: '后 => 右',
        ko: '뒤 => 오른쪽',
      },
    },
  },
  {
    id: 'DSR Broad Swing Left',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '63C1', capture: false }),
    alertText: (_data, _matches, output) => output.text(),
    outputStrings: {
      text: {
        en: 'Behind => Left',
        de: 'Hinter ihn => Links',
        ja: '後ろ => 左',
        cn: '后 => 左',
        ko: '뒤 => 왼쪽',
      },
    },
  },
  //记录位置
  {
    id: 'DSR p3第一次塔位置',
    type: 'Ability',
    netRegex: NetRegexes.ability({ id:'737C'}),
    run :(data, matches) => {
      if (nametocnjob(matches?.target,data)==data.other) {
        data.otherPos=2- 2 * Math.atan2(matches.x-100, matches.y-100) / Math.PI % 4;
      }
      if (data.me === matches?.target&&data.redIsMy) {
        data.myPos=2- 2 * Math.atan2(matches.x-100, matches.y-100) / Math.PI % 4;
        data.myOpposite=Math.round(2 - 2 * Math.atan2(matches.targetX-100, matches.targetY-100) / Math.PI+2) % 4;
        if (data.myOpposite<data.myPos) {
          data.myOpposite=+4;
        }
        
      }
    },
  },
  {
    id: 'DSR p3标记',
    type: 'Ability',
    netRegex: NetRegexes.ability({ id:'737C'}),
    delaySeconds:0.5,
    run :(data, matches) => {
      if (data.me === matches?.target&&data.redIsMy) {
        if (data.otherPos<data.myPos) {
          data.otherPos=+4;
        }
        if (data.otherPos>data.myOpposite) data.otherPos=data.myOpposite
        //塔距中间18
        let 角度=Math.PI*(data.otherPos-data.myPos)/2;
        let 划分=角度/7;
        data.myPos=data.myPos-1;
        let pos1y=data.myPos*Math.PI/2;
        let pos1x=data.myPos*Math.PI+划分;
        var waymark = {
          A: {
            X: 100+18*Math.cos(data.myPos*Math.PI/2+划分),
            Y: matches.z,
            Z: 100+18*Math.sin(data.myPos*Math.PI/2+划分),
            Active: true
          }, 
          B: {
            X: 100+18*Math.cos(data.myPos*Math.PI/2+划分*2),
            Y: matches.z,
            Z: 100+18*Math.sin(data.myPos*Math.PI/2+划分*2),
            Active: true
          },
          C: {
            X: 100+18*Math.cos(data.myPos*Math.PI/2+划分*3),
            Y: matches.z,
            Z: 100+18*Math.sin(data.myPos*Math.PI/2+划分*3),
            Active: true
          },
          D: {
            X: 100+18*Math.cos(data.myPos*Math.PI/2+划分*4),
            Y: matches.z,
            Z: 100+18*Math.sin(data.myPos*Math.PI/2+划分*4),
            Active: true
          },
          One: {
            X: 100+18*Math.cos(data.myPos*Math.PI/2+划分*5),
            Y: matches.z,
            Z: 100+18*Math.sin(data.myPos*Math.PI/2+划分*5),
            Active: true
          },
          Two: {
            X: 100+18*Math.cos(data.myPos*Math.PI/2+划分*6),
            Y: matches.z,
            Z: 100+18*Math.sin(data.myPos*Math.PI/2+划分*6),
            Active: true
          },
          Three: {
            X: 100+18*Math.cos(data.myPos*Math.PI/2+划分*7),
            Y: matches.z,
            Z: 100+18*Math.sin(data.myPos*Math.PI/2+划分*7),
            Active: true
          },

      };
      //callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'save'});
      //callOverlayHandler({ call: 'PostNamazu', c: 'place', p: JSON.stringify(waymark)});

      }
    },
  },
  {
    id: 'DSR p3恢复',
    type: 'Ability',
    netRegex: NetRegexes.ability({ id:'737C'}),
    delaySeconds:20,
    run :(data, matches) => {
      if (data.me === matches?.target&&data.redIsMy) {

      //callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'load'});

      }
    },
  },
  {
    id: 'DSR Dive From Grace Number',
    type: 'HeadMarker',
    netRegex: NetRegexes.headMarker(),
    condition: (data, matches) => data.phase === 'thordan',
    alertText: (data, matches, output) => {
      const id = getHeadmarkerId(data, matches);
      if (id === headmarkers.majiang1)
      {
        if (data.majiang1 === undefined) data.majiang1 = [];
        data.majiang1.push(nametocnjob(matches.target,data));
        if (data.majiang1.length>=3)  {
          data.majiang1.sort((a,b)=>{
            return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
          //  sendMessageToParty('麻将1'+data.majiang1[0]+data.majiang1[1]+data.majiang1[2]);
        }
      }
      if (id === headmarkers.majiang2) {
        if (data.majiang2 === undefined) data.majiang2 = [];
        data.majiang2.push(nametocnjob(matches.target,data));
       if (data.majiang2.length>=2)  {
        data.majiang2.sort((a,b)=>{
          return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
          // sendMessageToParty('麻将2'+data.majiang2[0]+data.majiang2[1]);
       }
      }
      if (id === headmarkers.majiang3) {
        if (data.majiang3 === undefined) data.majiang3 = [];
        data.majiang3.push(nametocnjob(matches.target,data));
       if (data.majiang3.length>=3)   {
        data.majiang3.sort((a,b)=>{
          return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
          // sendMessageToParty('麻将3'+data.majiang3[0]+data.majiang3[1]+data.majiang3[2]);
        }
      }
     
      if (matches.target===data.me) {
      if (id === headmarkers.majiang1) {data.majiang=1;return '麻将1';}
      if (id === headmarkers.majiang2) {data.majiang=2;return '麻将2';}
      if (id === headmarkers.majiang3) {data.majiang=3;return '麻将3';}
      }
    },
  },
  {
    id: 'DSR Eyes Dive Counter',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
    condition: Conditions.targetIsYou(),
    delaySeconds: (data, matches) => parseFloat(matches.duration) - 5,
    infoText: (data, matches, output) => {
      if (matches.effectId === 'AC3') return '原地放塔'
      if (matches.effectId === 'AC4') return '向前放塔'
      if (matches.effectId === 'AC5') return '背对放塔'
      }
  },
  // {
  //   id: "DSR 获取marker",
  //   regex: /^.{15}SignMarker 1D:Add:(?<marker>\d\d?):(?:[^|]*:){2}(?<caster>.*?)$/,
  //   delaySeconds:3,
  //   run: (data, matches) => {        
  //     if (matches.caster == data.me) {
  //     data.myMark = +matches.marker;
  //   };   
  //   if (data.phase=='thordan'&&data.myMark!==undefined) {
  //       if (data.myMark >= 5 && data.myMark <= 7) data.majiang3[data.myMark - 5].job = nametocnjob(data.me, data);
  //       if (data.myMark >= 0 && data.myMark <= 2) data.majiang1[data.myMark].job = nametocnjob(data.me, data);
  //       if (data.myMark >= 8 && data.myMark <= 9) data.majiang2[data.myMark - 8].job = nametocnjob(data.me, data);
  //   } 
  //   },
  // },
  {
    id: 'DSR Dive From Grace Post Stack',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
    tts:null,
    durationSeconds: 20,
    infoText: (data, matches, output) => {
      let job=nametocnjob(matches.target,data);
      if (data.yuan=== undefined) data.yuan = [];
      if (data.shang=== undefined) data.shang = [];
      if (data.xia=== undefined) data.xia = [];
      if (data.buff=== undefined) data.buff = [];
      let majiang=null;
      if (data.majiang1.includes(job))  majiang=1;
      if (data.majiang2.includes(job))  majiang=2;
      if (data.majiang3.includes(job))  majiang=3;

      //圆圈点名
      if (matches.effectId === 'AC3') {
        data.yuan.push(job);
        data.buff.push({'majiang':majiang,'buff':'圆','job':job})
      };
      //上箭头 
      if (matches.effectId === 'AC4') {
        data.buff.push({'majiang':majiang,'buff':'上','job':job})
        if (matches.target==data.me) {
        }
        data.shang.push(job);
      };
      //下箭头 
      if (matches.effectId === 'AC5') {
        data.buff.push({'majiang':majiang,'buff':'下','job':job})
        if (matches.target==data.me) {

        }
        data.xia.push(job);
      };
      if (data.buff.length>=8) data.my=data.buff.find((a)=>a.job===data.myJob)
      if (matches.target!==data.me) return;
      if (data.yuan.includes(data.myJob)) {
        return '原地防塔'
        
      }
      if (data.shang.includes(data.myJob)) {
        return '正对放塔'
        
      }
      if (data.xia.includes(data.myJob)) {
        return '背对放塔'
      }
    },

  },
  {
    id: 'DSR Gnash and Lash',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '6712'}),
    delaySeconds:4,
    durationSeconds:15,
    response: Responses.getOutThenIn(),
  },
  {
    id: 'DSR Lash and Gnash',
    type: 'StartsUsing',
    delaySeconds:4,
    netRegex: NetRegexes.startsUsing({ id: '6713'}),
    durationSeconds:15,
    response: Responses.getInThenOut(),
  },
  {
    id: 'DSR Lash Gnash Followup',
    type: 'Ability',
    // 6715 = Gnashing Wheel
    // 6716 = Lashing Wheel
    netRegex: NetRegexes.ability({ id: ['6715', '6716']}),
    // These are ~3s apart.  Only call after the first (and ignore multiple people getting hit).
    suppressSeconds: 6,
    infoText: (_data, matches, output) => matches.id === '6715' ? output.in() : output.out(),
    outputStrings: {
      out: Outputs.out,
      in: Outputs.in,
    },
  },

  //0:11
  {
    id: 'DSR Dive From Grace Dir You',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
    delaySeconds:0.5,
    duration:7,
    condition: Conditions.targetIsYou(),
    alertText: (data, matches, output) => {
      if (data.buff.length>=8) 
      {data.mybuff=data.buff.find((i)=>i.job===data.myJob);
      data.majiang11=data.buff.filter((i)=>i.majiang===1);
      data.majiang22=data.buff.filter((i)=>i.majiang===2);
      data.majiang33=data.buff.filter((i)=>i.majiang===3);
      //让麻将用shunxu2排序
      data.majiang11.sort((a,b)=>{
        return shunxu2.find((c)=>c.job==a.job).order-shunxu2.find((c)=>c.job==b.job).order});
      data.majiang22.sort((a,b)=>{
        return shunxu2.find((c)=>c.job==a.job).order-shunxu2.find((c)=>c.job==b.job).order});
      data.majiang33.sort((a,b)=>{
        return shunxu2.find((c)=>c.job==a.job).order-shunxu2.find((c)=>c.job==b.job).order});
        //更换位置
       if (data.majiang11.find((i)=>i.buff=="上")) {
          data.majiang1[0]=data.majiang11.find((i)=>i.buff=='上');
          data.majiang1[1]=data.majiang11.find((i)=>i.buff=='下');
          data.majiang1[2]=data.majiang11.find((i)=>i.buff=='圆');
        }
        else  data.majiang1=data.majiang11;
        if (data.majiang22.find((i)=>i.buff=="上")) {
          data.majiang2[0]=data.majiang22.find((i)=>i.buff=='上');
          data.majiang2[1]=data.majiang22.find((i)=>i.buff=='下');

        }
        else  data.majiang2=data.majiang22;
        if (data.majiang33.find((i)=>i.buff=="上")) {
          data.majiang3[0]=data.majiang33.find((i)=>i.buff=='上');
          data.majiang3[1]=data.majiang33.find((i)=>i.buff=='下');
          data.majiang3[2]=data.majiang33.find((i)=>i.buff=='圆');
        }
        else  data.majiang3=data.majiang33;
      let 标记1=data.majiang1.map((i)=>data.partJob.find((j)=>j.job==i.job));
      let 标记2=data.majiang2.map((i)=>data.partJob.find((j)=>j.job==i.job));
      let 标记3=data.majiang3.map((i)=>data.partJob.find((j)=>j.job==i.job));
      //标记
      sendMark(标记1[0].ID,1);sendMark(标记1[1].ID,2);sendMark(标记1[2].ID,3);
      sendMark(标记2[0].ID,9);sendMark(标记2[1].ID,10);
      sendMark(标记3[0].ID,6);sendMark(标记3[1].ID,7);sendMark(标记3[2].ID,8);
      //  //处理标记
      //  if (data.myMark!==undefined) {
      //   if (data.myMark >= 5 && data.myMark <= 7) data.majiang3[data.myMark - 5].job = nametocnjob(data.me, data);
      //   if (data.myMark >= 0 && data.myMark <= 2) data.majiang1[data.myMark].job = nametocnjob(data.me, data);
      //   if (data.myMark >= 8 && data.myMark <= 9) data.majiang2[data.myMark - 8].job = nametocnjob(data.me, data);
      //  }
      if (data.mybuff.majiang==1&&data.mybuff.buff=='上') return output.TowerUp();
      if (data.mybuff.majiang==1&&data.mybuff.buff=='下') return output.TowerDown();
      if (data.mybuff.majiang==1&&(data.majiang1[0].buff!==data.majiang1[1].buff))  return output.TowerC();
      if (data.mybuff.majiang==1&&data.mybuff.buff=='圆'){
        switch(data.majiang1.findIndex((i)=>i.job==data.myJob)){
          case 0:
          return output.TowerB()
          case 1:
          return output.TowerD()
          case 2:
          return output.TowerC()
        }
      }
      else return output.other()
      }
    },
    outputStrings: {
      TowerUp: {
        cn: '站B点面对boss',
      },
      TowerB: {
        cn: '站在B',
      },
      TowerDown: {
        cn: '站D点背对boss',
      },
      TowerD: {
        cn: '站在D',
      },
      TowerC: {
        cn: '站在C',
      },
      other: {
        cn: 'A方向集合分摊',
      },
      注1:{
        cn:'标记优先级mtsth1h2d1d2d3d4'
      },
      注2:{
        cn:'和莫灵喵相同,初始化正确必报对'
      },
      注3:{
        cn:'报错请检查你或开标记的初始化'
      },
      注4:{
        cn:'秀吉原版没优先级,可能报错'
      }
    }
  },
 //0:20
 {
  id: 'DSR Dive From Grace Tower 2 and Stacks',
  type: 'GainsEffect',
  netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
  delaySeconds:8,
  condition: Conditions.targetIsYou(),
  alertText: (data, matches, output) => {
    if (data.majiang2[0].buff==data.majiang2[1].buff&&data.mybuff.majiang==2) {
      if (data.majiang2.findIndex((i)=>i.job==data.myJob)===0) return output.TowerUp()
      if (data.majiang2.findIndex((i)=>i.job==data.myJob)===1) return output.TowerDown()
    }
    if (data.majiang2[0].buff!=data.majiang2[1].buff&&data.mybuff.majiang==2) {
      if (data.mybuff.buff=='上') return output.TowerUp()
      if (data.mybuff.buff=='下') return output.TowerDown()
    }
    if (data.mybuff.majiang==1) return output.TowerA()
    if (data.mybuff.majiang==3&&data.mybuff.buff=='上') return output.TowerB();
    if (data.mybuff.majiang==3&&data.mybuff.buff=='下') return output.TowerD();
    if (data.mybuff.majiang==3&&(data.majiang3[0].buff!==data.majiang3[1].buff))  return output.TowerC();
    if (data.mybuff.majiang==3&&data.mybuff.buff=='圆'){
      switch(data.majiang3.findIndex((i)=>i.job==data.myJob)){
        case 0:
        return output.TowerB()
        case 1:
        return output.TowerD()
        case 2:
        return output.TowerC()
      }
    }
  },
  outputStrings: {
    TowerUp: {
      cn: '准备去1点放塔',
    },
    TowerDown:{
      cn: '准备去4点放塔',
    },
    TowerB: {
      cn: '去B点踩塔',
    },
    TowerD: {
      cn: '去D点踩塔',
    },
    TowerC: {
      cn: '去C点踩塔',
    },
    TowerA: {
      cn: '去A附近准备踩塔',
    },
  }
},
  //0:26
  {
    id: 'DSR Dive From Grace Dive Position',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
    delaySeconds:17,
    condition: Conditions.targetIsYou(),
    alertText: (data, matches, output) => {

      if (data.mybuff.majiang3==2) return output.TowerA();
      if (data.majiang2[0].buff==data.majiang2[1].buff&&data.mybuff.majiang==2) {
        if (data.majiang2.findIndex((i)=>i.job==data.myJob)===0) return output.TowerB()
        if (data.majiang2.findIndex((i)=>i.job==data.myJob)===1) return output.TowerD()
      }
      if (data.majiang2[0].buff!=data.majiang2[1].buff&&data.mybuff.majiang==2) {
        if (data.mybuff.buff=='上') return output.TowerUp()
        if (data.mybuff.buff=='下') return output.TowerDown()
      }
    },
    outputStrings: {
      TowerUp: {
        cn: '去1点向前放塔',
      },
      TowerDown:{
        cn: '去4点向后放塔',
      },
      TowerB: {
        cn: '去1点放塔',
      },
      TowerD: {
        cn: '去4点放塔',
      },
      TowerA: {
        cn: '引导武神枪朝外然后去A分摊',
      },
    }
  },
   //0:30
  {
    id: 'DSR Dive From Grace Tower 1',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
    delaySeconds:18,
    condition: Conditions.targetIsYou(),
    alertText: (data, matches, output) => {
      if (data.mybuff.majiang==1&&data.mybuff.buff=='上') return output.TowerUp();
      if (data.mybuff.majiang==1&&data.mybuff.buff=='下') return output.TowerDown();
      if (data.mybuff.majiang==1&&(data.majiang1[0].buff!==data.majiang1[1].buff)||data.mybuff.majiang==2)  return '去A点分摊';
      if (data.mybuff.majiang==1&&data.mybuff.buff=='圆'){
        switch(data.majiang1.findIndex((i)=>i.job==data.myJob)){
          case 0:
          return output.TowerUp();
          case 1:
          return output.TowerDown();
          case 2:
          return output.TowerA();
        }
      }
    },
    outputStrings: {
      TowerUp: {
        cn: '踩1点塔',
      },
      TowerDown:{
        cn: '踩4点塔',
      },
      TowerA: {
        cn: '去A点分摊',
      },
    }
  },
  //0:38
  {
    id: 'DSR Darkdragon Dive Single Tower',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
    delaySeconds:25,
    condition: Conditions.targetIsYou(),
    alertText: (data, matches, output) => {
      if (data.mybuff.majiang==1&&data.mybuff.buff=='上') return output.text();
      if (data.mybuff.majiang==1&&data.mybuff.buff=='下') return output.text();
      if (data.mybuff.majiang==1&&(data.majiang1[0].buff!==data.majiang1[1].buff))  return ;
      if (data.mybuff.majiang==1&&data.mybuff.buff=='圆'){
        switch(data.majiang1.findIndex((i)=>i.job==data.myJob)){
          case 0:
          return output.text();
          case 1:
          return output.text();
        }
      }
    },
    outputStrings: {
      text: {
        cn: '引导武神枪朝外然后去A分摊',
      },
    }
  },
  //0:30
  {
    id: 'DSR Dive From Grace Tower 3',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
    delaySeconds:19,
    condition: Conditions.targetIsYou(),
    alertText: (data, matches, output) => {
      if (data.mybuff.majiang==3&&data.mybuff.buff=='上') return output.TowerUp();
      if (data.mybuff.majiang==3&&data.mybuff.buff=='下') return output.TowerDown();
      if (data.mybuff.majiang==3&&(data.majiang3[0].buff!==data.majiang3[1].buff))  return output.TowerC();
      if (data.mybuff.majiang==3&&data.mybuff.buff=='圆'){
        switch(data.majiang3.findIndex((i)=>i.job==data.myJob)){
          case 0:
          return output.TowerB();
          case 1:
          return output.TowerD();
          case 2:
          return output.TowerC();
        }
      }
    },
    outputStrings: {
      TowerUp: {
        cn: '去B点向前放塔',
      },
      TowerDown: {
        cn: '去D点向后放塔',
      },
      TowerB: {
        cn: '去B点放塔',
      },
      TowerD: {
        cn: '去D点放塔',
      },
      TowerC: {
        cn: '去C点放塔',
      },
    }
  },
  //0:40
  {
    id: 'DSR Dive From Grace Post Dive',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
    delaySeconds:29,
    condition: Conditions.targetIsYou(),
    alertText: (data, matches, output) => {
      if (data.majiang2[0].buff==data.majiang2[1].buff&&data.mybuff.majiang==2) {
        if (data.majiang2.findIndex((i)=>i.job==data.myJob)===0) return output.TowerB()
        if (data.majiang2.findIndex((i)=>i.job==data.myJob)===1) return output.TowerD()
      }
      if (data.mybuff.majiang==1&&(data.majiang1[0].buff!==data.majiang1[1].buff)&&data.mybuff.buff=='圆')  return output.TowerC();
      if (data.majiang1.findIndex((i)=>i.job==data.myJob)==2) return output.TowerC();
      if (data.majiang2[0].buff!=data.majiang2[1].buff&&data.mybuff.majiang==2) {
        if (data.mybuff.buff=='上') return output.TowerB()
        if (data.mybuff.buff=='下') return output.TowerD()
      }
    },
    outputStrings: {
      TowerB: {
        cn: '去B踩塔',
      },
      TowerD: {
        cn: '去D踩塔',
      },
      TowerC: {
        cn: '去C点踩塔',
      },
    }
  },
  //0:45
  {
    id: '【武神枪三】引导',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC3', 'AC4', 'AC5'], capture: true }),
    delaySeconds:34,
    condition: Conditions.targetIsYou(),
    alertText: (data, matches, output) => {
      if (data.majiang2[0].buff==data.majiang2[1].buff&&data.mybuff.majiang==2) {
        if (data.majiang2.findIndex((i)=>i.job==data.myJob)===0) return output.text()
        if (data.majiang2.findIndex((i)=>i.job==data.myJob)===1) return output.text()
      }
      if (data.majiang1.findIndex((i)=>i.job==data.myJob)==2) return output.text();
      if (data.majiang2[0].buff!=data.majiang2[1].buff&&data.mybuff.majiang==2) {
        if (data.mybuff.buff=='上') return output.text()
        if (data.mybuff.buff=='下') return output.text()
      }
    },
    outputStrings: {
      text: {
        cn: '引导武神枪朝外',
      }
    }
  },
  {
    // id: 'DSR 引导枪',
    id: 'DSR Geirskogul',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '670A'}),
    promise : async (data)=>{
      const me = await callOverlayHandler({
        call: 'getCombatants',
        names: [data.me],
      });
      data.myposX=me.combatants[0]?.PosX
      data.myposY=me.combatants[0]?.PosY;
    },
    alertText:(data, matches, output) => {
      let abc=Math.hypot(matches.x - data.myposX, matches.y- data.myposY);
      if ( Math.hypot(matches.x - data.myposX, matches.y- data.myposY)<4.5) {
        return output.text()
      }
    },
    outputStrings: {
      text: {
        cn: '走走走',
      }
    }
  },
  {
    // id: 'DSR 顺劈',
    id: 'DSR Drachenlance',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '670B'}),

    alertText:(data, matches, output) => {
      {
        //clearMark();
        return output.text();
      }
    },
    outputStrings: {
      text: {
        cn: '离开正面',
      }
    }
  },
  {
    id: 'DSR 收集塔位置',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id:  ['6717', '6718', '6719', '671A']}),  
    alertText:(data, matches, output) =>{
      //左上 右上 
      //左下 右下
      let weizhi=Math.round(2- 2 * Math.atan2(matches.x-100, matches.y-100) / Math.PI) % 4;
      if (data.塔位置 === undefined) data.塔位置 =[];
      let id=parseInt(matches.id,16);
      let wantID=id-26390;
      data.塔位置[weizhi]=wantID;
      
      if (data.塔位置.filter(Boolean).length === 4) {
        return  data.塔位置[0]+'      '+data.塔位置[1]+'\n'+data.塔位置[3]+'      '+data.塔位置[2]
      }
    },

  },
  {
    id: 'DSR Eyes Steep in Rage',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '68BD', source: ['Right Eye', 'Left Eye'], capture: false }),
    // Each of the eyes (if alive) will start this aoe.  It has the same id from each eye.
    suppressSeconds: 1,
    response: Responses.bigAoe('alert'),
  },
  //   //7:31
    {
      id: 'DSR P4Buff',
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: ['AD7', 'AD8'], capture: true }),
      condition: Conditions.targetIsYou(),
      run: (data, matches, output) => {
        if (matches.effectId === 'AD7') data.p4Buff='红';
        if (matches.effectId === 'AD8') data.p4Buff='蓝';
        return ;
        }
    },
    {
      id: 'DSR Right Eye Blue Tether',
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: ['AD7', 'AD8']}),
      delaySeconds:0.1,
      suppressSeconds:120,
      condition: Conditions.targetIsYou(),
      alertText: (data, matches, output) => {
        if (data.role=='dps')  return;
        if (data.p4Buff=='红') return '红';
        if (data.p4Buff=='蓝') return '蓝';
        }
    },
    //7:37
    {
      id: 'DSR Left Eye Red tether',
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: ['AD7', 'AD8']}),
      delaySeconds:6,
      suppressSeconds:120,
      condition: Conditions.targetIsYou(),
      alertText: (data, matches, output) => {
        if (data.p4Buff='红') return '撞黄球';
        if (data.p4Buff='蓝') return '准备接buff';
        }
    },
    {
        id: "DSR 黄球",
        netRegex: NetRegexes.tether({ id: ["0033", "0034"] }),
        delaySeconds: 6,
        suppressSeconds: 120,
        alertText: (_data, _matches, output) => output.text(),
        outputStrings: {
          text: {
            cn: "撞黄球",
          },
        },
      },
   //7:44
    {
      id: 'DSR Eyes Dive Cast',
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: ['AD7', 'AD8'], capture: true }),
      delaySeconds:12,
      suppressSeconds:120,
      condition: Conditions.targetIsYou(),
      alertText: (data, matches, output) => {
        if (data.p4Buff='红') return '撞蓝球';
        }
    },
    //7:46
    {
      id: 'DSR Left Eye Red tether',
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: ['AD7', 'AD8'], capture: true }),
      delaySeconds:14,
      suppressSeconds:120,
      condition: Conditions.targetIsYou(),
      alertText: (data, matches, output) => {
       return output.text()
      },
      outputStrings: {
        text: {
          cn:'第1次站位',
        },
      },
    },
    {
      id: 'P4幻想冲',
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '68C4'}),
      suppressSeconds: 2,
      alertText: (data, matches, output) => {
        if (data.幻想冲===undefined) {
          data.幻想冲=1
        }
        if (data.幻想冲<4) {         
          data.幻想冲=data.幻想冲+1;
          return '第'+data.幻想冲+'次'+'站位'
        } 
      }
    },
  // {
  //   id: "DSR Right Eye Blue Tether",
  //   netRegex: NetRegexes.tether({ id: "0033" }),
  //   condition: (data, matches) => matches.source === data.me,
  //   infoText: (_data, _matches, output) => output.text(),
  //   tts: null,
  //   outputStrings: {
  //     text: {
  //       cn: "蓝",
  //     },
  //   },
  // },
  // {
  //   id: "DSR Left Eye Red tether",
  //   netRegex: NetRegexes.tether({ id: "0034" }),
  //   condition: (data, matches) => matches.source === data.me,
  //   infoText: (_data, _matches, output) => output.text(),
  //   tts: null,
  //   outputStrings: {
  //     text: {
  //       cn: "红",
  //     },
  //   },
  // },
  // {
  //   id: "DSR 黄球",
  //   netRegex: NetRegexes.tether({ id: ["0033", "0034"] }),
  //   delaySeconds: 6,
  //   suppressSeconds: 120,
  //   alertText: (_data, _matches, output) => output.text(),
  //   outputStrings: {
  //     text: {
  //       cn: "撞黄球",
  //     },
  //   },
  // },
  // {
  //   id: "DSR 蓝球",
  //   netRegex: NetRegexes.tether({ id: ["0033", "0034"] }),
  //   delaySeconds: 12,
  //   suppressSeconds: 120,
  //   alertText: (_data, _matches, output) => output.text(),
  //   outputStrings: {
  //     text: {
  //       cn: "撞蓝球",
  //     },
  //   },
  // },
  // {
  //     id: 'Eyes Dive Cast',
  //     type: 'GainsEffect',
  //     netRegex: NetRegexes.gainsEffect({ effectId: ['AD7', 'AD8'], capture: true }),
  //     delaySeconds:14,
  //     suppressSeconds:120,
  //     condition: Conditions.targetIsYou(),
  //     alertText: (data, matches, output) => {
  //       return output.text()
  //     },
  //     outputStrings: {
  //       text: {
  //         cn:'第1次站位',
  //       },
  //     },
  //   },
  //   {
  //     id: 'P4幻想冲',
  //     type: 'Ability',
  //     netRegex: NetRegexes.ability({ id: '68C4'}),
  //     suppressSeconds: 2,
  //     alertText: (data, matches, output) => {
  //       if (data.幻想冲===undefined) {
  //         data.幻想冲=1
  //       }
  //       if (data.幻想冲<4) {         
  //         data.幻想冲=data.幻想冲+1;
  //         return '第'+data.幻想冲+'次'+'站位'
  //       } 
  //     }
  //   },
    {
      id: 'DSR Right Eye Reminder',
      type: 'StartsUsing',
      // If the Right Eye is dead and the Left Eye gets the aoe off, then the Right Eye
      // will be revived and you shouldn't forget about it.
      netRegex: NetRegexes.startsUsing({ id: '68BD', source: 'Left Eye' }),
      delaySeconds: (_data, matches) => parseFloat(matches.castTime),
      infoText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Kill Right Eye',
          cn:'杀死右边红眼',
        },
      },
    },
    {
      id: 'DSR Spear of the Fury Limit Break',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62E2', source: 'Ser Zephirin', capture: false }),
      // This ability also happens in doorboss phase.
      condition: (data) => data.role === 'tank' && data.phase === 'haurchefant',
      // This is a 10 second cast, and (from video) my understanding is to
      // hit tank LB when the cast bar gets to the "F" in "Fury", which is
      // roughly 2.8 seconds before it ends.
      delaySeconds: 10 - 2.8,
      alarmText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'TANK LB!!',
          de: 'TANK LB!!',
          fr: 'LB TANK !!',
          ja: 'タンクLB!!',
          cn: '坦克LB！！',
          ko: '리미트 브레이크!!',
        },
      },
    },
    {
      id: 'P4.5',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62E4'}),
      delaySeconds:(data,matches)=>matches.castTime-5,
      suppressSeconds: 5,
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          cn: '注意奥尔什方血量',
        },
      },
    },
    {
      id: '龙眼位置',
      regex: /] ChatLog 00:0:103:.{8}:8003759A:00020001:.{7}(?<index>.+?):/,
      run: (data, matches, output) => {
        if (data.龙眼 === undefined) data.龙眼 = [];
        data.eye=+matches.index;
        switch (+matches.index) {
          case 0:
            data.龙眼.push('A点');

            break;
          case 1:
            data.龙眼.push('1点');
            break;
          case 2:
            data.龙眼.push('B点');
            break;
          case 3:
            data.龙眼.push('2点');
            break;
          case 4:
            data.龙眼.push('C点');
            break;
          case 5:
            data.龙眼.push('3点');
            break;
          case 6:
            data.龙眼.push('D点');
            break;
           case 7:
            data.龙眼.push('4点');
            break;
          default:
            return '其他'
            break;
        }
       // return data.龙眼[0];
      }
    },
    {
      id: 'DSR Dragon',
      regex: /] ChatLog 00:0:103:.{8}:8003759A:00020001:.{7}(?<index>.+?):/,
      delaySeconds:(data,matches)=>{
        if (data.phase=='thordan')  return 2
        if (data.phase=='thordan2')  return 10
      },
      delaySeconds:(data,matches)=>{
        if (data.phase=='thordan')  return 2
        if (data.phase=='thordan2')  return 12
      },
      durationSeconds:15,
      promise: async (data, matches) => {
        let bossData = await callOverlayHandler({
           call: 'getCombatants',
         });
          let bossData2= bossData.combatants.filter((boss) => boss.BNpcNameID===3632&&boss.BNpcID==12611);
          if (bossData2.length>0)  bossData2=bossData2;
          else bossData2=bossData.combatants.filter((boss) => boss.BNpcNameID===3632&&boss.BNpcID==12604);
          let bossData123;
          if (data.phase=='thordan') {
            bossData123=bossData.combatants.filter((boss) => boss.BNpcNameID===3632&&boss.BNpcID==12604)[0]
          }
          if (data.phase=='thordan2') {
            bossData123=bossData.combatants.filter((boss) => boss.BNpcNameID===3632&&boss.BNpcID==12611)[0]
          }
          data.骑神=Math.round(Math.round(4 - 4 * Math.atan2(bossData123.PosX-100, bossData123.PosY-100) / Math.PI) % 8);
       },
      alertText: (data, matches, output) => {
        if (data.龙眼 === undefined) data.龙眼 = [];
        switch (data.骑神) {
          case 0:
            data.龙眼.push('A点');
            break;
          case 1:
            data.龙眼.push('1点');
            break;
          case 2:
            data.龙眼.push('B点');
            break;
          case 3:
            data.龙眼.push('2点');
            break;
          case 4:
            data.龙眼.push('C点');
            break;
          case 5:
            data.龙眼.push('3点');
            break;
          case 6:
            data.龙眼.push('D点');
            break;
           case 7:
            data.龙眼.push('4点');
            break;
          default:
            
            break;
        }
        if (data.龙眼.length==2) {
          data.背对=true;
          return '背对'+data.龙眼[0]+data.龙眼[1];}
       return data.龙眼[0];
      }
    },
    {
      id: '面相',
      netRegex: /.*?/,
      condition:(data, matches, output)=>data.背对,
      tts:null,
      suppressSeconds:0.4,
      durationSeconds:0.5,
      sound: '',
      soundVolume: 0,
      promise : async (data, matches)=>{
        const boss = await callOverlayHandler({
          call: 'getCombatants',
        });
        if (data.phase=='thordan') {
          data.骑神位置=boss.combatants.filter((boss) => boss.BNpcNameID===3632&&boss.BNpcID==12604)[0]
        }
        if (data.phase=='thordan2') {
          data.骑神位置=boss.combatants.filter((boss) => boss.BNpcNameID===3632&&boss.BNpcID==12611)[0]
        }
        return ;
      },  
      alertText:(data, matches, output)=>{
        let vector2X=data.骑神位置.PosX-data.my.PosX;let vector2Y= data.骑神位置.PosY-data.my.PosY;
        let vector1X=0;let vector1Y=1;
        let RelativeAngle=(((Math.atan2(vector2Y,vector2X)-Math.atan2(vector1Y,vector1X))*(180/Math.PI)+360+180)%360+(data.my.Heading*(180/Math.PI)+360)%360)%360;
        let 面相骑神=RelativeAngle>180 - 46&&RelativeAngle<180 + 46 ;
        let 龙眼位置=EyesPositions[+data.eye][1];
        let vector3X=龙眼位置[0]-data.my.PosX;let vector3Y=龙眼位置[1]-data.my.PosY;
        let RelativeAngle1=(((Math.atan2(vector3Y,vector3X)-Math.atan2(vector1Y,vector1X))*(180/Math.PI)+360+180)%360+(data.my.Heading*(180/Math.PI)+360)%360)%360;
        let 面相眼睛=RelativeAngle1>180 - 46&&RelativeAngle1<180 + 46 ;
        let 面相正确=面相骑神&&面相眼睛;
        let 面相=面相正确? '错误':'正确';
        return '面相'+面相;      
      },
    },
    {
      id: '骑神眼位置删除',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '63D0'}),
      delaySeconds:12,
      run: (data, matches, output) => {
        if (data.phase === 'thordan2')  callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'load'});
       {
        data.背对=false;
        delete data.龙眼;
       }
       }
    },
    {
      id: 'DSR Ancient Quaga',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '63C6', capture: false }),
      response: Responses.aoe(),
    },
  {
    id: 'P5位置',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId:'B11'}),
    delaySeconds:0.5,
    suppressSeconds: 5,
    durationSeconds:12,
    promise : async (data)=>{
      const bossData = await callOverlayHandler({
        call: 'getCombatants',
      });
       data.战士 = bossData.combatants.filter((boss) => boss.BNpcNameID===3639)[0];
      return ;  
    },
    alertText: (data, matches, output) => {
      data.月环=Math.round(Math.round(2 - 2 * Math.atan2(data.战士.PosX-100, data.战士.PosY-100) / Math.PI) % 4);

      switch (data.月环) {
        case 0:
          return output.yueA()
          break;
      case 1:
          return output.yueB()
          break;
      case 2:
          return output.yueC()
          break;
      case 3:
          return output.yueD()
          break;  
        default:
          break;
      }
    },
    outputStrings: {
      yueA: {
        cn:'A点月环',
      },
      yueB: {
        cn:'B点月环',
      },
      yueC: {
        cn:'C点月环',
      },
      yueD: {
        cn:'D点月环',
      },
    },
  },
  {
    id: 'DSR Wrath Thunderstruck',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId:'B11'}),
    suppressSeconds: 5,
    promise : async (data)=>{
      const bossData = await callOverlayHandler({
        call: 'getCombatants',
      });
       data.战士 = bossData.combatants.filter((boss) => boss.BNpcNameID===3639)[0];
      return ;
    },
    alertText: (data, matches, output) => {
      if (matches.target==data.me) return output.text();
    },
    outputStrings: {
      text: {
        en: 'Thunder',
        cn: '雷点名',
      },
    },
  },
  {
    id: 'DSR Wrath Thunderstruck Targets',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId:'B11'}),
    suppressSeconds: 5,
    delaySeconds: (data, matches) => parseFloat(matches.duration) - 5,
    alertText: (data, matches, output) => {
      if (matches.target==data.me) return output.text();
    },
    outputStrings: {
      text: {
        en: 'Thunder',
        cn: '雷点名',
      },
    },
  },
  {
    id: 'P5雷点名职业播报',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId:'B11'}),
    delaySeconds:3,
    alertText: (data, matches, output) => {
      if (data.lei === undefined) data.lei =[];
      data.lei.push(nametocnjob(matches.target,data));
      if (data.lei.length==2) {
        let 标记1=data.lei.map((i)=>data.partJob.find((j)=>j.job==i));
        sendMark(标记1[0].ID,9);sendMark(标记1[1].ID,10);
        return '雷点名:'+data.lei[0]+data.lei[1]}
    }
  },
  {
    id: 'P5一运蓝标',
    type: 'HeadMarker',
    netRegex: NetRegexes.headMarker(),
    condition: (data, matches) => data.phase == 'thordan2',
    alertText: (data, matches, output) => {
      const id = getHeadmarkerId(data, matches);
      if( id=== headmarkers.fuchong&&data.me === matches.target)
      {
        switch (data.月环) {
          case 0:
            return output.diveC()
            break;
          case 1:
            return output.diveD()
            break;
          case 2:
            return output.diveA()
            break;
          case 3:
            return output.diveB()
            break;  
          default:
            return output.dive()
            break;
        }
      }
      if (id=== headmarkers.lanbiao) {
        if (data.P5点名 === undefined) data.P5点名 =[];
        data.P5点名.push(nametocnjob(matches.target,data));
        if (data.P5点名.length===3) {
        let 要排序的数组=data.fenzu.filter((x)=>!data.P5点名.some((item) => x === item));
          要排序的数组.sort((a,b)=>{
            return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
            
          let isInP5点名=data.P5点名.includes(nametocnjob(data.me,data));
          let 标记1=要排序的数组.map((i)=>data.partJob.find((j)=>j.job==i));
          // sendMark(标记1[0].ID,1);sendMark(标记1[1].ID,2);sendMark(标记1[2].ID,3);sendMark(标记1[3].ID,4);sendMark(标记1[4].ID,5);
          if (isInP5点名==false) return '排队'+要排序的数组[0]+要排序的数组[1]+要排序的数组[2]+要排序的数组[3]+要排序的数组[4]
        }
        
        if (data.me === matches.target)  return output.leapOnYou();
      }
    },
    outputStrings: {
      diveC: {
        cn: '去C点引导俯冲',
      },
      diveD: {
        cn: '去D点引导俯冲',
      },
      diveA: {
        cn: '去A点引导俯冲',
      },
      diveB: {
        cn: '去B点引导俯冲',
      },
      dive: {
        cn: '俯冲点名',
      },
      leapOnYou: {
        en: 'Leap on YOU',
        de: 'Sprung auf DIR',
        fr: 'Saut sur VOUS',
        ja: '自分に青マーカー',
        cn: '大圈，去左上',
        ko: '광역 대상자',
      },
    },
  },
  {
    id: "DSR Wrath Skyward Leap",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: "DSR P5一运水波",
    netRegex: NetRegexes.startsUsing({ id: "63CA", capture: false }),
    alertText: (_data, _matches, output) => output.text(),
    outputStrings: {
      text: {
      en: 'Spread',
      de: 'Verteilen',
      ja: '散会',
      cn: '分散',
      ko: '산개징 대상자',},
    },
  },
  {
    id: 'DSR Twisting Dive',
    type: 'Ability',
    netRegex: NetRegexes.ability({ id: '6B8B', capture: false }),
    suppressSeconds: 1,
    alertText: (_data, _matches, output) => output.text(),
    outputStrings: {
      text: {
        en: 'Twisters',
        de: 'Wirbelstürme',
        fr: 'Tornades',
        ja: '大竜巻',
        cn: '旋风',
        ko: '회오리',
      },
    },
  },
  {
    id: 'P5五连火圈',
    type: 'Ability',
    netRegex: NetRegexes.ability({ id: '6B91'}),
    condition: Conditions.targetIsYou(),
    suppressSeconds: 10,
    alertText: (data, matches, output) => output.text(),
    outputStrings: {
      text: {
        cn: '五连火圈点名',
      },
    },
  },
  {
    id: 'DSR Wrath Spiral Pierce',
    type: 'Tether',
    netRegex: NetRegexes.tether({ id: '0005' }),
    condition: Conditions.targetIsYou(),
    alertText: (_data, _matches, output) => output.text(),
    outputStrings: {
      text: {
        en: 'Tether on YOU',
        de: 'Verbindung auf DIR',
        ja: '自分に線',
        cn: '连线点名',
        ko: '선 대상자',
      },
    },
  },
  {
    id: 'P5一运连线',
    type: 'Tether',
    netRegex: NetRegexes.tether({ id: '0005' }),
    promise : async (data,matches)=>{
      let boss = await callOverlayHandler({
        call: 'getCombatants',
        ids: [parseInt(matches.sourceId, 16)],
      });
      data.linePos=Math.round(4- 4 * Math.atan2(boss.combatants[0]?.PosX-100, boss.combatants[0]?.PosY-100) / Math.PI+4) % 8;
      return ;
    },
    alertText: (data, matches, output) => {
      const dirs = {
        0: 'A点',
        1: '1点',
        2: 'B点',
        3: '2点',
        4: 'C点',
        5: '3点',
        6: 'D点',
        7: '4点',
        8: output.unknown(),
      };
      if (data.P5点名 === undefined) data.P5点名 =[];
      data.P5点名.push(nametocnjob(matches.target,data));
      if(data.me === matches?.target)
      {
      return output.direction({
        dir:dirs[data.linePos ?? 8],
      });
    }
    },
    outputStrings: {
      direction: {
        en: 'go to${dir}',
        de: '${dir}',
        fr: '${dir}',
        ja: '${dir}',
        cn: '去${dir}',
        ko: '${dir}',
      },
    },
  },
  {
    id: 'DSR白龙位置',
    type: 'Ability',
    netRegex: NetRegexes.ability({ id: '6B89' }),
    tts:null,
    delaySeconds: 4.7,
    promise: async (data, matches) => {
     let whiteDragons = await callOverlayHandler({
        call: 'getCombatants',
      });

      data.whiteDragon = whiteDragons.combatants.filter((boss) => boss.BNpcNameID===3984)[0];
    },
    alertText: (data, matches, output) => {
      let weizhi=Math.round(2- 2 * Math.atan2(data.whiteDragon.PosX-100, data.whiteDragon.PosY-100) / Math.PI) % 4;
      switch (weizhi) {
        case 0:
          return '白龙在A'
          break;
        case 1:
          return '白龙在B'
          break;
       case 2:
          return '白龙在C'
          break;
       case 3:
          return '白龙在D'
          break;
        default:
          break;
      }
    },
  },
  {
    id: 'DSRp5二运战士',
    type: 'AddedCombatant',
    netRegex: NetRegexes.addedCombatantFull({ npcBaseId:'9020',npcNameId:'3641' }),
    alertText: (data, matches, output) => {
      let mark=getMark(7);
      if (data.phase === 'thordan2') {
        // callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'save'});
        // callOverlayHandler({ call: 'PostNamazu', c: 'place', p: mark});
      }
     
      let weizhi=Math.round(2- 2 * Math.atan2(matches.x-100, matches.y-100) / Math.PI) % 4;
      switch (weizhi) {
        case 0:
          return output.warA();
          break;
        case 1:
          return output.warB();
          break;
       case 2:
          return output.warC();
          break;
       case 3:
          return output.warD();
          break;
        default:
          break;
      }
    },
    outputStrings: {
      warA: {
        cn: '战士在A',
      },
      warB: {
        cn: '战士在B',
      },
      warC: {
        cn: '战士在C',
      },
      warD: {
        cn: '战士在D',
      },
    },
  },
  {
    id: 'DSRp5二运战士第二次播报',
    type: 'AddedCombatant',
    netRegex: NetRegexes.addedCombatantFull({ npcBaseId:'9020',npcNameId:'3641' }),
    delaySeconds:11,
    durationSeconds:14,
    condition: (data, matches) => data.phase === 'thordan2',
    alertText: (data, matches, output) => {
      let weizhi=Math.round(2- 2 * Math.atan2(matches.x-100, matches.y-100) / Math.PI) % 4;
      switch (weizhi) {
        case 0:
          return output.warA();
          break;
        case 1:
          return output.warB();
          break;
       case 2:
          return output.warC();
          break;
       case 3:
          return output.warD();
          break;
        default:
          break;
      }
    },
    outputStrings: {
      warA: {
        cn: '战士在A',
      },
      warB: {
        cn: '战士在B',
      },
      warC: {
        cn: '战士在C',
      },
      warD: {
        cn: '战士在D',
      },
    },
  },
  //------------------鸡排--------------------
  // {
  //   id: 'DSR Doom Gain',
  //   type: 'GainsEffect',
  //   netRegex: NetRegexes.gainsEffect({ effectId:'BA0'}),
  //   alertText: (data, matches, output) => {
  //     if (data.death === undefined) data.death =[];
  //     data.death.push(nametocnjob(matches.target,data));
  //     if (matches.target==data.me) data.isDeath=true;
  //     if (data.death.length==4) {
  //       data.death.sort((a,b)=>{
  //         return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
  //       let 标记1=data.death.map((i)=>data.partJob.find((j)=>j.job==i));
  //       let notDianMing=data.fenzu.filter((x)=>!data.death.some((item) => x === item)); 
  //       notDianMing.sort((a,b)=>{
  //         return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
  //       let 标记2=notDianMing.map((i)=>data.partJob.find((j)=>j.job==i));
  //       // console.log(标记1);console.log(标记2);
  //       sendMark(标记1[0].ID,1);sendMark(标记1[1].ID,2);sendMark(标记1[2].ID,3);sendMark(标记1[3].ID,4);
  //       sendMark(标记2[0].ID,6);sendMark(标记2[1].ID,7);sendMark(标记2[2].ID,8);sendMark(标记2[3].ID,9);

  //       let 死宣分组=[[data.fenzu[0],data.fenzu[2]],[data.fenzu[4],data.fenzu[6]],[data.fenzu[5],data.fenzu[7]],[data.fenzu[1],data.fenzu[3 ]]];
  //       //let 死宣分组=[[data.fenzu[2],data.fenzu[3]],[data.fenzu[4],data.fenzu[8]],[data.fenzu[5],data.fenzu[7]],[data.fenzu[0],data.fenzu[1]]];
  //       let 我的死宣=死宣分组.findIndex((i)=>i.includes(nametocnjob(data.me,data)));
  //         let 死宣在数组位置=data.death.map((i)=>死宣分组.findIndex((j)=>j.includes(i)));
  //         死宣在数组位置.sort((a,b)=>a-b);
  //         let 我的=死宣在数组位置.filter((i)=>i==我的死宣);
  //         let bobao='';
  //         console.log('死宣');
  //         console.log(data.fenzu);
  //         console.log(死宣在数组位置); console.log(我的死宣);console.log(data.death);
  //         let 重复的元素= 死宣在数组位置.filter((e,i) => 死宣在数组位置.indexOf(e)!==死宣在数组位置.lastIndexOf(e) && 死宣在数组位置.indexOf(e)===i)[0];
  //         if (死宣在数组位置[0]==死宣在数组位置[1]&&死宣在数组位置[2]==死宣在数组位置[3]) {
  //           //情况3
  //           if (死宣在数组位置[3]-死宣在数组位置[0]==2) { 
  //             bobao= '上下换位'
  //             if (我的死宣%2==0) data.我要去的位置=(我的死宣+3)%4;
  //             else data.我要去的位置=(我的死宣+1)%4;

  //           }
  //           //情况2
  //           if (死宣在数组位置[3]-死宣在数组位置[0]==1||死宣在数组位置[3]-死宣在数组位置[0]==3) {
  //             bobao= '左右互换'
  //             if (我的死宣%2==0) data.我要去的位置=(我的死宣+1)%4;
  //             else data.我要去的位置=(我的死宣+3)%4;
  //           }
  //         };
  //         //情况1
  //         if (我的.length===2||我的.length===0) {
  //           let dir=[0,1,2,3];
  //           let 要移动的位置=dir.filter((x)=>!死宣在数组位置.some((item) => x === item)); 
  //           let 移动次数=要移动的位置-重复的元素;
  //           if (Math.abs(移动次数)==2) { 
  //           bobao='斜点交换'
  //           data.我要去的位置=(我的死宣+2)%4
            
  //           }
  //           else{
  //             if (死宣在数组位置.includes((重复的元素+1)%4)) {
  //               if (我的.length===0) {
  //                 data.我要去的位置=(我的死宣+1)%4;
  //               bobao='顺时针(左)换'
  //               }
  //               if (我的.length===2) {
  //                 data.我要去的位置=(我的死宣+3)%4;
  //               bobao='逆时针(右)换'
  //               }
  //           }
  //           else {
  //             if (我的.length===0) {
  //               data.我要去的位置=(我的死宣+3)%4;
  //             bobao='逆时针(右)换'
  //             }
  //             if (我的.length===2) {
  //               data.我要去的位置=(我的死宣+1)%4;
  //             bobao='顺时针(左)换'
  //             }
  //           }
  //           }
  //         };
  //         if (bobao=='') {
  //           data.我要去的位置=我的死宣;
  //           return '不用换位'
  //         }
  //       if (data.role!=='dps') {
  //         return bobao
  //       }
  //       else {
  //         data.我要去的位置=我的死宣;
  //         return '不用换位'
  //       }
  //       }
  //   }
  // },
  // {
  //   id: 'P5死宣去哪',
  //   type: 'GainsEffect',
  //   netRegex: NetRegexes.gainsEffect({ effectId:'BA0'}),
  //   delaySeconds:1.5,
  //   suppressSeconds:4,
  //   alertText: (data, matches, output) => {
  //     if (data.我要去的位置==0&&data.isDeath) return '去左上边缘'
  //     if (data.我要去的位置==1&&data.isDeath) return '去右上边缘'
  //     if (data.我要去的位置==2&&data.isDeath) return '去右边靠内'
  //     if (data.我要去的位置==3&&data.isDeath) return '去左边靠内'
  //     if (data.我要去的位置==0) return '去左边边缘'
  //     if (data.我要去的位置==1) return '去右边边缘'
  //     if (data.我要去的位置==2) return '去右下边缘'
  //     if (data.我要去的位置==3) return '去左下边缘'
  //   }
  // },
  // {
  //   id: 'DSR Playstation2 Fire Chains',
  //   type: 'GainsEffect',
  //   netRegex: NetRegexes.gainsEffect({ effectId:'BA0'}),
  //   delaySeconds:12,
  //   suppressSeconds:4,
  //   alertText: (data, matches, output) => {
  //     if (data.我要去的位置==0&&data.isDeath) return '去左下靠内'
  //     if (data.我要去的位置==1&&data.isDeath) return '去右下靠内'
  //     if (data.我要去的位置==2&&data.isDeath) return '去右边靠外引导'
  //     if (data.我要去的位置==3&&data.isDeath) return '去左边靠外引导'
  //     else return '去上边'
  //   }
  // },
  // {
  //   id: 'DSR P5索尼',
  //   type: 'HeadMarker',
  //   netRegex: NetRegexes.headMarker(),
  //   condition: (data, matches) => data.phase === 'thordan2' && data.me === matches.target,
  //   alertText: (data, matches, output) => {
  //     const id = getHeadmarkerId(data, matches);
  //     if (id === headmarkers.firechainCircle)
  //     {
  //        return '去左右'
  //     }
        
  //     if (id === headmarkers.firechainTriangle)
  //     {
  //       if (data.isDeath) return '去右下'
  //       else return '去左上'
  //     }
        
  //     if (id === headmarkers.firechainSquare)
  //     {
  //       if (data.isDeath) return '去左下'
  //       else return '去右上'
  //     }
        
  //     if (id === headmarkers.firechainX)
  //     {
  //       return '去上下'
  //     }
        
  //   },
  // },
  //-------------------辉夜横排----------------
  {
    id: 'DSR Doom Gain',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId:'BA0'}),
    alertText: (data, matches, output) => {
      if (data.death === undefined) data.death =[];
      data.death.push(nametocnjob(matches.target,data));
      if (matches.target==data.me) data.isDeath=true;
      if (data.death.length==4) {
        data.death.sort((a,b)=>{
          return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
        let 标记1=data.death.map((i)=>data.partJob.find((j)=>j.job==i));
        let notDianMing=data.fenzu.filter((x)=>!data.death.some((item) => x === item)); 
        notDianMing.sort((a,b)=>{
          return shunxu2.find((c)=>c.job==a).order-shunxu2.find((c)=>c.job==b).order});
        let 标记2=notDianMing.map((i)=>data.partJob.find((j)=>j.job==i));
        sendMark(标记1[0].ID,1);sendMark(标记1[1].ID,2);sendMark(标记1[2].ID,3);sendMark(标记1[3].ID,4);
        sendMark(标记2[0].ID,6);sendMark(标记2[1].ID,7);sendMark(标记2[2].ID,8);sendMark(标记2[3].ID,9);

        data.死宣排序=data.death.findIndex((i)=>i.includes(nametocnjob(data.me,data)));
        data.无死宣排序=notDianMing.findIndex((i)=>i.includes(nametocnjob(data.me,data)));
        }
    }
  },
  {
    id: 'P5死宣去哪',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId:'BA0'}),
    delaySeconds:1.5,
    suppressSeconds:4,
    alertText: (data, matches, output) => {
      if (data.死宣排序==0) return output.death1()
      if (data.死宣排序==1) return output.death2()
      if (data.死宣排序==2) return output.death3()
      if (data.死宣排序==3) return output.death4()
      if (data.无死宣排序==0) return output.nodeath1()
      if (data.无死宣排序==1) return output.nodeath2()
      if (data.无死宣排序==2) return output.nodeath3()
      if (data.无死宣排序==3) return output.nodeath4()
    },
    outputStrings: {
      death1: {
        cn: '去左内',
      },
      death2: {
        cn: '去左上',
      },
      death3: {
        cn: '去右上',
      },
      death4: {
        cn: '去右内',
      },
      nodeath1: {
        cn: '去左外',
      },
      nodeath2: {
        cn: '去左下',
      },
      nodeath3: {
        cn: '去右下',
      },
      nodeath4: {
        cn: '去右外',
      },
    },
  },
  {
    id: 'DSR Playstation2 Fire Chains',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId:'BA0'}),
    delaySeconds:12,
    suppressSeconds:4,
    alertText: (data, matches, output) => {
      if (data.死宣排序==0&&data.isDeath) return output.death1()
      if (data.死宣排序==1&&data.isDeath) return output.death2()
      if (data.死宣排序==2&&data.isDeath) return output.death3()
      if (data.死宣排序==3&&data.isDeath) return output.death4()
      if (data.无死宣排序==0) return output.nodeath()
      if (data.无死宣排序==1) return output.nodeath()
      if (data.无死宣排序==2) return output.nodeath()
      if (data.无死宣排序==3) return output.nodeath()
    },
    outputStrings: {
      death1: {
        cn: '去左边靠外引导',
      },
      death2: {
        cn: '去下半场',
      },
      death3: {
        cn: '去下半场',
      },
      death4: {
        cn: '去右边靠外引导',
      },
      nodeath: {
        cn: '去上半场',
      },
    },
  },
  {
    id: 'DSR P5索尼',
    type: 'HeadMarker',
    netRegex: NetRegexes.headMarker(),
    condition: (data, matches) => data.phase === 'thordan2' && data.me === matches.target,
    alertText: (data, matches, output) => {
      const id = getHeadmarkerId(data, matches);
      if (id === headmarkers.firechainCircle)
      {
        if (data.死宣排序==0&&data.isDeath) return output.Circle1()
        if (data.死宣排序==3&&data.isDeath) return output.Circle4()
      }
        
      if (id === headmarkers.firechainTriangle)
      {
        if (data.isDeath) return output.TriangleDeath()
        else return output.TriangleNoDeath()
      }
        
      if (id === headmarkers.firechainSquare)
      {
        if (data.isDeath) return output.SquareDeath()
        else return output.SquareNoDeath()
      }
        
      if (id === headmarkers.firechainX)
      {
        return output.BlueX()
      } 
    },
    outputStrings: {
      Circle1: {
        cn: '去左边',
      },
      Circle4: {
        cn: '去右边',
      },
      TriangleDeath: {
        cn: '去右下',
      },
      TriangleNoDeath: {
        cn: '去左上',
      },
      SquareDeath: {
        cn: '去左下',
      },
      SquareNoDeath: {
        cn: '去右上',
      },
      BlueX: {
        cn: '去上下',
      },
    },
  },
  {
    id: 'DSR Dragon\'s Gaze',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '63D0'}), 
    disabled:true,
    response: Responses.lookAway('alert'),
  },
  {
    id: "DSR Playstation2 Fire Chains No Marker",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: "DSR Playstation2 Fire Chains Unexpected Pair",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: "DSR Wrath Cauterize Marker",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: "DSR Sanctity of the Ward Sword Names",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: "DSR Mortal Vow",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: "DSR Spreading/Entangled Flame",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: 'P6传毒',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['B50'], capture: true }),
    suppressSeconds:5,
    delaySeconds: (data, matches) => parseFloat(matches.duration) - 4,
    suppressSeconds:2,
    preRun:(data, matches, output) => data.传毒次数++,
    infoText: (data, matches, output) => {

      if (data.传毒次数==1) {
        data.毒分组=[data.fenzu[2],data.fenzu[6],data.fenzu[3],data.fenzu[7]];
        let 第一次毒点名=nametocnjob(matches.target,data);
        data.第一次点名顺序=data.毒分组.indexOf(第一次毒点名);
        console.log(data.毒分组);
        console.log('毒');
        console.log(data.第一次点名顺序);
        let 标记1=data.partJob.find((j)=>j.job==第一次毒点名);
        let 标记2=data.partJob.find((j)=>j.job==data.fenzu[0]);
        sendMark(标记1.ID,11);sendMark(标记2.ID,12)
        return 第一次毒点名+'传毒给'+data.fenzu[0];
      }
      if (data.传毒次数==2) {
        let 标记1=data.partJob.find((j)=>j.job==data.fenzu[0]);
        let 标记2=data.partJob.find((j)=>j.job==data.fenzu[4]);
        sendMark(标记1.ID,11);sendMark(标记2.ID,12)
        return fenzu[0]+'传毒给'+fenzu[4]
      }
      if (data.第一次点名顺序==0){
        if (data.传毒次数==3){
          let 标记1=data.partJob.find((j)=>j.job==data.fenzu[4]);
          let 标记2=data.partJob.find((j)=>j.job==data.fenzu[6]);
          sendMark(标记1.ID,11);sendMark(标记2.ID,12)
          return fenzu[4]+'传毒给'+fenzu[6]
        }
        if (data.传毒次数==4){
          let 标记1=data.partJob.find((j)=>j.job==data.fenzu[6]);
          let 标记2=data.partJob.find((j)=>j.job==data.fenzu[2]);
          sendMark(标记1.ID,11);sendMark(标记2.ID,12)
          return fenzu[6]+'传毒给'+fenzu[2]
        }
      }else{
        if (data.传毒次数==3){
          let 标记1=data.partJob.find((j)=>j.job==data.fenzu[4]);
          let 标记2=data.partJob.find((j)=>j.job==data.fenzu[2]);
          sendMark(标记1.ID,11);sendMark(标记2.ID,12)
          return fenzu[4]+'传毒给'+fenzu[2]
        }
        if (data.传毒次数==4){
          let 标记1=data.partJob.find((j)=>j.job==data.fenzu[2]);
          let 标记2=data.partJob.find((j)=>j.job==data.fenzu[6]);
          sendMark(标记1.ID,11);sendMark(标记2.ID,12)
          return fenzu[2]+'传毒给'+fenzu[6]
        }
        if (data.传毒次数 == 5) return 
      }
    // return data.传毒次数+'传毒'
    },
    outputStrings: {
      作者注:{
        cn: 'DTTDD,初始-MT-ST-D1/D2-D2/D1',
      },
    },
  },
  {
    id: 'P6连线',
    type: 'Tether',
    netRegex: NetRegexes.tether({ id: ['00C4', '00C3','00C2'] }),
    condition: (data, matches) => matches.source === data.me,
    suppressSeconds:6,
    promise : async (data,matches)=>{
      const lineBOSS   = await callOverlayHandler({
        call: 'getCombatants',
        ids: [parseInt(matches.targetId, 16)],
      });
       data.lineBOSS = lineBOSS.combatants[0];
      return ;
    },
    alertText: (data, matches, output) => {
      let weizhi=Math.round(2- 2 * Math.atan2(data.lineBOSS.PosX-100, data.lineBOSS.PosY-100) / Math.PI) % 4;
      
      if (weizhi==1) return output.ice()
      if (weizhi==3) return output.fire()
      // return 'ceshi'
    },
    outputStrings: {
      ice:{
        cn: '冰线点名',
      },
      fire:{
        cn: '火线点名',
      },
    },
  },
  {
    id: 'DSR Hallowed Wings and Plume',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id:  ['6D23', '6D24','6D26','6D27']}),
    //condition: (data) => (data.phase === 'thordan2' && (data.safe = (data.safe ?? 0) + 1) === 1),
    condition:(data) => !data.fire ,
    delaySeconds:0.1,
    promise : async (data)=>{
      const BlackDragon = await callOverlayHandler({
        call: 'getCombatants',
      });
       data.BlackDragon = BlackDragon.combatants.filter((boss) => boss.BNpcNameID===3458&&boss.BNpcID==12612)[0];
      return ;
    },
    alertText:(data, matches, output) =>{
      let posX=data.BlackDragon.PosX;
      if (matches.id =='6D23'||matches.id =='6D26') {
        if (data.role=='tank') data.靠近或远离1='双T靠近';
        else data.靠近或远离1='人群远离';
      }
      if (matches.id =='6D24'||matches.id =='6D27') {
        if (data.role=='tank') data.靠近或远离1='双T远离';
        else data.靠近或远离1='人群靠近';
      }
      if (matches.id === '6D26'||matches.id === '6D27') {
        if(posX<100) data.翅膀1='去2点'
        if(posX>100) data.翅膀1= '去3点'
        
      } 
      if (matches.id === '6D23'||matches.id === '6D24') {
        if(posX<100) data.翅膀1='去1点'
        if(posX>100) data.翅膀1='去4点'
      }
      if (data.靠近或远离1&&data.翅膀1) return data.翅膀1+data.靠近或远离1;
    },
  },
  {
    id: 'DSRp6火球',
    type: 'AddedCombatant',
    netRegex: NetRegexes.addedCombatantFull({ npcBaseId:'13238' }),
    suppressSeconds:1,
    promise : async (data)=>{
      const WhiteDragon = await callOverlayHandler({
        call: 'getCombatants',
      });
       data.WhiteDragon = WhiteDragon.combatants.filter((boss) => boss.BNpcNameID===4954&&boss.BNpcID==12613)[0];
      return ;
    },
    alertText: (data, matches, output) => {
      if ((data.fire = (data.fire?? 0) + 1) === 2) {
        let posX=data.WhiteDragon.PosX;
        console.log(posX+':'+matches.y);
        console.log(data.fire)
      if (posX>=100&&+matches.y>106) return output.safe4();
      if (posX>=100&&+matches.y<106) return output.safe3();
      if (posX<=91&&+matches.y>106) return output.safe1();
      if (posX<=91&&+matches.y<106) return output.safe2();
      } 
    },
    outputStrings: {
      作者注:{
        cn: '默认4A1标点',
      },
      safe1: {
        cn: '1点起跑',
      },
      safe2: {
        cn: '2点起跑',
      },
      safe3: {
        cn: '3点起跑',
      },
      safe4:{
        cn: '4点起跑',
      }
    },
  },
  {
    id: 'DSR Akh Afah',
    // 6D41 Akh Afah from Hraesvelgr, and 64D2 is immediately after
    // 6D43 Akh Afah from Nidhogg, and 6D44 is immediately after
    // Hits highest emnity target
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: ['6D41', '6D43']}),
    suppressSeconds: 2,
    infoText: (_data, _matches, output) => {
      _data.分摊次数++;
     return output.groups();
    },
    outputStrings: {
      groups: {
        en: 'Tank Groups',
        ja: 'タンクと頭割り',
        ko: '탱커와 그룹 쉐어',
        cn: '上下分摊',
      },
    },
  },
  {
    id: "DSR Great Wyrmsbreath Nidhogg Not Glowing",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: "DSR Great Wyrmsbreath Hraesvelgr Not Glowing",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: "DSR Great Wyrmsbreath Both Glowing",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: 'DSR 发光位置收集',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id:  ['6D35', '6D33']}),  
    delaySeconds:10,
    preRun:(data, matches, output) =>{
      let weizhi=data.位置=Math.round(2- 2 * Math.atan2(matches.x-100, matches.y-100) / Math.PI) % 4;
      if (data.发光位置 === undefined) data.发光位置 = [];
      data.发光位置 .push(weizhi);
    },
    run:(data)=>delete data.发光位置

  },
  {
    id: 'DSR 发光位置播报',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id:  ['6D35', '6D33']}),  
    delaySeconds:0.5,
    suppressSeconds: 5,
    alertText:(data, matches, output) =>{
      if (data.role!=='tank') return;
      if (data.发光位置.length===2) return output.sharedBuster();
      if (data.发光位置.length===1) {
        if (data.发光位置[0]===1) return output.nidTankbuster();
        else return output.hraesvelgrTankbuster();
      }
    },
    outputStrings: {
      sharedBuster: {
        en: 'Shared Buster',
        de: 'geteilter Tankbuster',
        ja: 'タンク二人で頭割り',
        cn: '分摊死刑',
        ko: '쉐어 탱버',
      },
      nidTankbuster: {
        en: 'Nid Tankbuster',
        de: 'Nid Tankbuster',
        ja: 'ニーズから攻撃',
        cn: 'MT死刑',
        ko: '니드호그 탱버',
      },
      hraesvelgrTankbuster: {
        en: 'Hrae Tankbuster',
        de: 'Hrae Tankbuster',
        ja: 'フレスから攻撃',
        cn: 'ST死刑',
        ko: '흐레스벨그 탱버',
      },
    },  
  },
  {
    id: 'DSR Spreading Flame',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC6', 'AC7'], capture: true }),
    run: (data, matches, output) => {
      if (data.dark === undefined) data.dark =[];
      if (data.white === undefined) data.white =[];
      if (matches.effectId === 'AC6') {
        data.dark.push(nametocnjob(matches.target,data));
        if (matches.target==data.me) data.p6buff='暗';
        return 
      }
      if (matches.effectId === 'AC7') {
        data.white.push(nametocnjob(matches.target,data));
        if (matches.target==data.me) data.p6buff='白';
        return 
      }
    },
  },
  {
    id: 'DSR Entangled Flame',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['AC6', 'AC7'], capture: true }),
    delaySeconds:3,
    suppressSeconds:3,
    //delaySeconds: (data, matches) => parseFloat(matches.duration) - 5,
    run: (data, matches, output) => {
      data.dark.sort((a,b)=>{
        return shunxu2.find((c)=>c.job==b).order-shunxu2.find((c)=>c.job==a).order});
      data.white.sort((a,b)=>{
        return shunxu2.find((c)=>c.job==b).order-shunxu2.find((c)=>c.job==a).order});
      data.noBuff=data.fenzu.filter((x)=>(!data.dark.some((item) => x === item)&&(!data.white.some((item) => x === item))));
      data.noBuff.sort((a,b)=>{
        return shunxu2.find((c)=>c.job==b).order-shunxu2.find((c)=>c.job==a).order});
      let 标记1=data.dark.map((i)=>data.partJob.find((j)=>j.job==i));
      let 标记2=data.white.map((i)=>data.partJob.find((j)=>j.job==i));
      let notDianMing=data.noBuff.map((i)=>data.partJob.find((j)=>j.job==i));
      sendMark(标记1[0].ID,1);sendMark(标记1[1].ID,2);sendMark(标记1[2].ID,3);sendMark(标记1[3].ID,4);
      sendMark(标记2[0].ID,6);sendMark(标记2[1].ID,7)
      sendMark(notDianMing[0].ID,9);sendMark(notDianMing[1].ID,10);
      },
    outputStrings: {
      作者注: {
        cn: '标记优先级d4d3d2d1h2h1stmt,站位请123421',
      },
    },  
  },
  {
    id: "DSR Nidhogg Hot Tail",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: "DSR Nidhogg Hot Wing",
    disable: true,
    netRegex: NetRegexes.startsUsing({ id: '6D34', capture: false }),
  },
  {
    id: '辣翅辣尾',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id:  ['6D2B', '6D2D']}),  
    suppressSeconds: 5,
    condition: (data) => ((data.辣翅辣味 = (data.辣翅辣味 ?? 0) + 1) === 1),
    alertText:(data, matches, output) =>{

       let 黑位置=data.dark.includes(data.myJob)?data.dark.indexOf(data.myJob)+1:'';
       let 白位置=data.white.includes(data.myJob)?data.white.indexOf(data.myJob)+1:'';
       let 无点名位置=data.noBuff.includes(data.myJob)?data.noBuff.indexOf(data.myJob)+1:'';
      if (matches.id=='6D2D') 
      {
        if (data.dark.includes(data.myJob)) { 
          return '去上边,分散'
          // return '去两边第'+黑位置+'分散'
        }
        if (data.white.includes(data.myJob)) {
          return '去上边,分摊'
          // return '去两边第'+白位置+'分摊'
        }
        if (data.noBuff.includes(data.myJob)) {
          return '去上边,分摊'
          // return '去两边第'+无点名位置+'分摊'
        }
      }
      if (matches.id=='6D2B')
      {
        if (data.dark.includes(data.myJob)) { 
          return '去中间,分散'
          // return '去中间第'+黑位置+'分散'
        }
        if (data.white.includes(data.myJob)) {
          return '去中间,分摊'
          // return '去中间第'+白位置+'分摊'
        }
        if (data.noBuff.includes(data.myJob)) {
          return '去中间,分摊'
          // return '去中间第'+无点名位置+'分摊'
        }
      }
    },
  },
  {
    id: '辣翅辣尾2',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id:  ['6D2B', '6D2D','6D23', '6D24','6D26','6D27']}),  
    condition:(data) => data.分摊次数>=2,
    alertText:(data, matches, output) =>{
      console.log('分摊次数:'+data.分摊次数);
      if (matches.id=='6D2D') 
      {
        data.辣翅辣味安全位置='去两边';
      }
      if (matches.id=='6D2B')
      {
        data.辣翅辣味安全位置='去中间';
      }
      if (matches.id =='6D23'||matches.id =='6D26') {
        if (data.role=='tank') data.靠近或远离='靠近圣龙';
        else data.靠近或远离='远离圣龙';
      }
      if (matches.id =='6D24'||matches.id =='6D27') {
        if (data.role=='tank') data.靠近或远离='远离圣龙';
        else data.靠近或远离='靠近圣龙';
      }
      if (matches.id === '6D26'||matches.id === '6D27') {
        data.翅膀='下半场'
      }
      if (matches.id === '6D23'||matches.id === '6D24') {
        data.翅膀='上半场'
      }
      if (data.辣翅辣味安全位置&&data.翅膀&&data.靠近或远离) 
      return  data.辣翅辣味安全位置+data.翅膀+data.靠近或远离;
      
    }
  },
  {
    id: 'DSR Wyrmsbreath 2 Boiling and Freezing',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({ effectId: ['B52', 'B53'] }),
    condition: Conditions.targetIsYou(),
    // Lasts 10.96s, but bosses do not cast Cauterize until 7.5s after debuff
    delaySeconds: 7.6,
    promise : async (data)=>{
      const BlackDragon = await callOverlayHandler({
        call: 'getCombatants',
      });
       data.BlackDragon = BlackDragon.combatants.filter((boss) => boss.BNpcNameID===3458&&boss.BNpcID==12612)[0];
      return ;
    },  
    infoText: (data, matches, output) => {
      console.log(data.BlackDragon);
      if (matches.effectId === 'B52'){
        if (data.BlackDragon.PosX>100) return output.leftStop()
        else return output.rightStop()
      }
      else{
          if (data.BlackDragon.PosX>100) return output.right()
          else return output.left()
      }
    },
    outputStrings: {
      left: {
        cn: '去左边',
      },
      right: {
        cn: '去右边',
      },
      leftStop: {
        cn: '去左边停下',
      },
      rightStop: {
        cn: '去右边停下',
      },
    },
  },
  {
    id: 'DSR Wyrmsbreath 2 Pyretic',
    type: 'GainsEffect',
    // B52 = Boiling
    // When Boiling expires, Pyretic (3C0) will apply
    // Pyretic will cause damage on movement
    netRegex: NetRegexes.gainsEffect({ effectId: ['B52'] }),
    condition: Conditions.targetIsYou(),
    // Boiling lasts 10.96s, after which Pyretic is applied provide warning
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 1,
    // Player will have Pyretic for about 3s before hit by Cauterize
    durationSeconds: 4,
    infoText: (_data, _matches, output) => output.text(),
    outputStrings: {
      text: {
        en: 'Stop',
        de: 'Stopp',
        fr: 'Stop',
        ja: '動かない',
        cn: '停停停',
        ko: '멈추기',
      },
    },
  },
  {
    id: 'DSR Trinity Tank Dark Resistance',
    type: 'GainsEffect',
    // C40 = Dark Resistance Down, highest enmity target
    netRegex: NetRegexes.gainsEffect({
      effectId: 'C40',
      count: '02',
    }),
    condition: (data, matches) => data.me === matches.target,
    alertText: (_data, matches, output) => {
      if (parseFloat(matches.duration) > 10)
        return output.text();
    },
    outputStrings: {
      text: {
        // Only showing 'swap' is really confusing, in my opinion
        en: 'Get 2nd enmity',
        de: 'Sei 2. in der Aggro',
        ko: '적개심 2순위 잡기',
        cn: '关盾 2仇',
      },
    },
  },
  {
    id: 'DSR Trinity Tank Dark Resistance',
    type: 'GainsEffect',
    // C40 = Dark Resistance Down, highest enmity target
    netRegex: NetRegexes.gainsEffect({
      effectId: 'C40',
      count: '02',
    }),
    condition: (data, matches) => data.me === matches.target,
    alertText: (_data, matches, output) => {
      if (parseFloat(matches.duration) > 10)
        return output.text();
    },
    outputStrings: {
      text: {
        // Only showing 'swap' is really confusing, in my opinion
        en: 'Get 2nd enmity',
        de: 'Sei 2. in der Aggro',
        ko: '적개심 2순위 잡기',
        cn: '关盾 2仇',
      },
    },
  },
  {
    id: 'DSR Trinity Tank Light Resistance',
    type: 'GainsEffect',
    // C3F = Light Resistance Down, 2nd highest enmity target
    netRegex: NetRegexes.gainsEffect({
      effectId: 'C3F',
      count: '02',
    }),
    condition: (data, matches) => data.me === matches.target,
    // To prevent boss rotating around before Exaflare
    delaySeconds: 2.5,
    alertText: (_data, matches, output) => {
      if (parseFloat(matches.duration) > 10)
        return output.text();
    },
    outputStrings: {
      text: {
        en: 'Provoke',
        de: 'Herausforderung',
        ko: '도발하기',
        cn: '开盾 挑衅',
      },
    },
  },
  {
    id: "DSR Flames of Ascalon",
    disable: true,
    // netRegex: NetRegexes.gainsEffect({
    //   effectId: "808",
    //   count: "12A",
    //   capture: false,
    // }),
    // // delaySeconds: 1,
    // response: Responses.getOut(),
  },
  {
    id: "DSR Ice of Ascalon",
    disable: true,
    // netRegex: NetRegexes.gainsEffect({
    //   effectId: "808",
    //   count: "12B",
    //   capture: false,
    // }),
    // // delaySeconds: 1,
    // response: Responses.getIn(),
  },
  {
    id: 'P7钢铁月环',
    type: 'GainsEffect',
    netRegex: NetRegexes.gainsEffect({
      effectId: '808',
      count: ['12A','12B'],
    }),
    durationSeconds:10,
    alertText: (data, matches, output) => {
      if (matches.count=='12A') return output.getout()
      else return output.getin()
    },
    outputStrings: {
      getin: {
        cn: '月环月环',
      },
      getout: {
        cn: '钢铁钢铁',
      },
    }
  },
  {
    id: 'P7顺逆',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id:  ['6D9A', '6DD2','6DD3']}),  
    durationSeconds:15,
    alertText:(data, matches, output) =>{
      if (data.核爆 === undefined) data.核爆 = [];
      let 方位=Math.round(4 - 4 * Math.atan2(matches.x-100, matches.y-100) / Math.PI) % 8;
      if (matches.id=='6D9A') {
        data.核爆[0]=方位;
      }
      if (matches.id=='6DD2') {
        data.核爆[1]=方位;
      }
      if (data.核爆.length>=2) {
        let 核爆位置;
      switch (data.核爆[0]) {
        case 0:
          核爆位置='下'
          break;
        case 1:
          核爆位置='左下'
          break;
        case 2:
          核爆位置='左'
          break;
        case 3:
          核爆位置='左上'
          break;
        case 4:
          核爆位置='上'
          break;
        case 5:
          核爆位置='右上'
          break;
        case 6:
          核爆位置='右'
          break;
        case 7:
          核爆位置='右下'
          break;
        default:
          break;
      }
      let 顺逆=data.核爆[1]-data.核爆[0];
      if (顺逆>0||顺逆==-5) data.核爆顺逆= '顺时针(左左左)核爆'
      else data.核爆顺逆= '逆时针(右右右)核爆'
      if (核爆位置&&data.核爆顺逆)  return data.核爆顺逆
      }

    }
  },
  {
    id: 'P7顺逆删除',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id:  ['6D9A', '6DD2']}),  
    suppressSeconds: 1,
    delaySeconds:10,
    run:(data, matches, output) =>{
      delete data.核爆
    }
  },
  {
    id: 'P7第一次三位一体D1引导',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '6D9B'}),
    delaySeconds:11,
    alertText:(data, matches, output) =>{
      data.myIndex=data.fenzu.indexOf(data.myJob);
      if (data.role=='tank') return
      if (data.myIndex==2) return '靠近引导顺劈'
      else return 'D1引导'
    }
  },
  {
    id: 'P7第一次三位一体D2引导',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '6D9B'}),
    delaySeconds:15,
    alertText:(data, matches, output) =>{
      if (data.role=='tank') return
      if (data.myIndex==6) return '靠近引导顺劈'
      else return 'D2引导'
    }
  },
  {
    id: 'P7第一次三位一体H1引导',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '6D99'}),
    delaySeconds:22,
    alertText:(data, matches, output) =>{
      if (data.role=='tank') return
      if (data.myIndex==1) return '靠近引导顺劈'
      else return 'H1引导'
    }
  },
  {
    id: 'P7第一次三位一体H2引导',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '6D99'}),
    delaySeconds:26,
    alertText:(data, matches, output) =>{
      if (data.role=='tank') return
      if (data.myIndex==5) return '靠近引导顺劈'
      else return 'H2引导'
    }
  },
  {
    id: 'P7第一次三位一体D3引导',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '6D93'}),
    delaySeconds:14,
    alertText:(data, matches, output) =>{
      if (data.role=='tank') return
      if (data.myIndex==3) return '靠近引导顺劈'
      else return 'D3引导'
    }
  },
  {
    id: 'P7第一次三位一体D4引导',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '6D93'}),
    delaySeconds:18,
    alertText:(data, matches, output) =>{
      if (data.role=='tank') return
      if (data.myIndex==7) return '靠近引导顺劈'
      else return 'D4引导'
    }
  },
  {
    id: 'P7地火第一次标记',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id:  '6D9C'}),
    promise : async (data)=>{
      const bossData = await callOverlayHandler({
        call: 'getCombatants',
      });
       data.P7BOSS = bossData.combatants.filter((boss) => boss.BNpcNameID===11319&&boss.BNpcID==12616)[0];
       //console.log(data.P7BOSS);
    },
    alertText:(data, matches, output) =>{
      let Boss面相=Math.round(4 - 4 * parseFloat(data.P7BOSS.Heading) / Math.PI) % 8;
      let 地火位置=Math.round(4 - 4 * Math.atan2(matches.x-100, matches.y-100) / Math.PI) % 8;
      if ((Boss面相+4)%8==地火位置) {
        console.log(Boss面相+':'+地火位置);
        let waymark = {
          One: {
            X: matches.x,
            Y: matches.z,
            Z: matches.y,
            Active: true
          },
      };
      // callOverlayHandler({ call: 'PostNamazu', c: 'place', p: JSON.stringify(waymark)});
      return output.text()
      }
    },
    outputStrings: {
      text: {
        cn: '地火',
      }
    }
  },
  //吉吉的穷举
  {
    id: 'P7一步地火',
    type: 'StartsUsing',
    netRegex: NetRegexes.startsUsing({ id: '6D9C' }),
    promise: async (data, matches) => {
      const bossData = await callOverlayHandler({
        call: 'getCombatants',
      });
      data.P7BOSS = bossData.combatants.filter((boss) => boss.BNpcNameID === 11319 && boss.BNpcID == 12616)[0];
      data.地火 = bossData.combatants.filter((boss) => boss.ID === matches.ID)[0];
    },
    alertText: (data, matches, output) => {
      let Boss面相 = Math.round(4 - 4 * parseFloat(data.P7BOSS.Heading) / Math.PI) % 8;
      let 地火位置 = Math.round(4 - 4 * Math.atan2(matches.x - 100, matches.y - 100) / Math.PI) % 8;
      console.log('地火');

      if ((地火位置 + 9) % 8 == Boss面相) {
        if ( data.地火==undefined)   data.左上地火 = Math.round(4 - 4 * matches.heading / Math.PI + Boss面相) % 8;
        else data.左上地火 = Math.round(4 - 4 * data.地火.Heading / Math.PI + Boss面相) % 8;
      };
      if ((地火位置 + 7) % 8 == Boss面相) {
        if ( data.地火==undefined)   data.右上地火 = Math.round(4 - 4 * matches.heading / Math.PI + Boss面相) % 8;
        else data.右上地火 = Math.round(4 - 4 * data.地火.Heading / Math.PI + Boss面相) % 8;
      
      };
      if ((地火位置 + 4) % 8 == Boss面相) {
        if ( data.地火==undefined)   data.下面地火 = Math.round(4 - 4 * matches.heading / Math.PI + Boss面相) % 8;
        else data.下面地火 = Math.round(4 - 4 * data.地火.Heading / Math.PI + Boss面相) % 8;

      };
      console.log(data.左上地火+':'+data.右上地火+':'+data.下面地火);
      if (data.下面地火!==undefined && data.右上地火!==undefined &&  data.左上地火!==undefined) {
        if (/[02346]/.test(data.下面地火) && /[12357]/.test(data.右上地火)) return '左上安全';
        if (/[02456]/.test(data.下面地火) && /[13567]/.test(data.左上地火)) return '右上安全';
        if (/[01246]/.test(data.右上地火) && /[02467]/.test(data.左上地火)) return '背后安全';
      }
    }
  },
  {
    id: 'P7地火第二次标记',
    type: 'StartsUsing',
    netRegex: NetRegexes.ability({ id:  '6D9C'}),
    suppressSeconds:1,
    alertText:(data, matches, output) =>{
        let mark=getMark(13.2);
        // callOverlayHandler({ call: 'PostNamazu', c: 'place', p: mark});
        return output.text()
    },
    outputStrings: {
      text: {
        cn: '走走走',
      }
    }
  },
  {
    id: 'P7地火标点恢复',
    type: 'StartsUsing',
    netRegex: NetRegexes.ability({ id:  '6D9C'}),
    suppressSeconds:1,
    delaySeconds:7,
    run:(data, matches, output) =>{
        // callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'load'});
    }
  },
  ],
  timelineReplace: [

    {
      'locale': 'cn',
      'replaceSync': {
        '(?<!Dragon-)King Thordan': '.*?',
        'Ser Adelphel': '.*?',
        'Ser Charibert': '.*?',
        'Ser Grinnaux': '.*?',
        'Ser Guerrique': '.*?',
        'Ser Hermenost': '.*?',
        'Ser Ignasse': '.*?',
        'Ser Janlenoux': '.*?',
        'Ser Zephirin': '.*?',
        'Nidhogg':'.*?',
        'Hraesvelgr':'.*?',
        'Darkscale':'.*?',
        'Vedrfolnir':'.*?',
        'Right Eye':'.*?',
        'Ser Noudenet':'.*?',
        'Left Eye:':'.*?',
        'Dragon-king Thordan':'.*?',
      },
    },
  ],
});