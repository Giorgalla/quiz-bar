import {questions} from './questions.js';
export const characters=[{emoji:'🦊',name:'Fox'},{emoji:'🐸',name:'Frog'},{emoji:'🐼',name:'Panda'},{emoji:'🐱',name:'Cat'},{emoji:'🐙',name:'Octopus'},{emoji:'🦉',name:'Owl'},{emoji:'🐻',name:'Bear'},{emoji:'🐰',name:'Rabbit'},{emoji:'🦁',name:'Lion'},{emoji:'🦔',name:'Hedgehog'},
  {emoji:'🦸‍♂️',name:'Superhero'},
  {emoji:'🦸‍♀️',name:'Superheroine'},
  {emoji:'🥷',name:'Ninja'},
  {emoji:'🧙',name:'Wizard'},
  {emoji:'🧚',name:'Fairy'},
  {emoji:'🧝',name:'Elf'},
  {emoji:'🧜‍♀️',name:'Mermaid'},
  {emoji:'🧞',name:'Genie'},
  {emoji:'🧛',name:'Vampire'},
  {emoji:'🤖',name:'Robot'},
  {emoji:'👽',name:'Little Alien'},
  {emoji:'👻',name:'Friendly Ghost'},
  {emoji:'⛄',name:'Snow Buddy'},
  {emoji:'🎃',name:'Pumpkin Pal'},
  {emoji:'🌞',name:'Sunny'},
  {emoji:'🌝',name:'Moonbeam'},
  {emoji:'🌟',name:'Starlight'},
  {emoji:'🍄',name:'Mushroom Buddy'},
  {emoji:'🌸',name:'Blossom'},
  {emoji:'🧁',name:'Cupcake'},
  {emoji:'🦹‍♂️',name:'Supervillain'},
  {emoji:'🦹‍♀️',name:'Supervillainess'},
  {emoji:'🧙‍♀️',name:'Witch'},
  {emoji:'🧚‍♂️',name:'Forest Fairy'},
  {emoji:'🧝‍♀️',name:'Elven Archer'},
  {emoji:'🧜‍♂️',name:'Merman'},
  {emoji:'🧟',name:'Zombie'},
  {emoji:'👸',name:'Princess'},
  {emoji:'🤴',name:'Prince'},
  {emoji:'🫅',name:'Royal Ruler'},
  {emoji:'👩‍🚀',name:'Space Explorer'},
  {emoji:'👨‍🚀',name:'Star Captain'},
  {emoji:'🕵️',name:'Detective'},
  {emoji:'💂',name:'Royal Guard'},
  {emoji:'👩‍🎤',name:'Rock Star'},
  {emoji:'👨‍🎨',name:'Painter'},
  {emoji:'🧑‍🍳',name:'Chef'},
  {emoji:'🧑‍🔬',name:'Mad Scientist'},
  {emoji:'🧑‍🚒',name:'Firefighter'},
  {emoji:'🤠',name:'Cowboy'},
  {emoji:'🤡',name:'Clown'},
  {emoji:'👾',name:'Pixel Monster'},
  {emoji:'💀',name:'Skeleton'},
  {emoji:'👺',name:'Goblin'},
  {emoji:'👹',name:'Ogre'},
  {emoji:'😈',name:'Cheeky Devil'},
  {emoji:'👼',name:'Little Angel'},
  {emoji:'🥸',name:'Secret Agent'},
  {emoji:'😎',name:'Cool Kid'},
  {emoji:'🥳',name:'Party Pal'},
  {emoji:'🥹',name:'Softie'},
  {emoji:'🤩',name:'Starstruck'},
  {emoji:'🥶',name:'Frosty Face'},
  {emoji:'🤯',name:'Brain Blast'},
  {emoji:'😴',name:'Sleepyhead'},
  {emoji:'🫠',name:'Melty'},
  {emoji:'🦄',name:'Unicorn'},
  {emoji:'🐲',name:'Dragon'},
  {emoji:'🦖',name:'T-Rex'},
  {emoji:'🦕',name:'Gentle Dino'},
  {emoji:'🦋',name:'Butterfly'},
  {emoji:'🐝',name:'Busy Bee'},
  {emoji:'🐢',name:'Turtle'},
  {emoji:'🐧',name:'Penguin'},
  {emoji:'🦦',name:'Otter'},
  {emoji:'🐨',name:'Koala'},
  {emoji:'🦥',name:'Sloth'},
  {emoji:'🦩',name:'Flamingo'},
  {emoji:'🍓',name:'Strawberry'},
  {emoji:'🍒',name:'Cherry Duo'},
  {emoji:'🍍',name:'Pineapple'},
  {emoji:'🍉',name:'Watermelon'},
  {emoji:'🍑',name:'Peach'},
  {emoji:'🍩',name:'Donut'},
  {emoji:'🍪',name:'Cookie'},
  {emoji:'🍦',name:'Ice Cream'},
  {emoji:'🍿',name:'Popcorn'},
  {emoji:'🧋',name:'Boba Buddy'},
  {emoji:'🌈',name:'Rainbow'},
  {emoji:'💎',name:'Gem'}];
export const categories = [
  {id:'geography',name:'Geography & the world',emoji:'🌍',topics:['Geography','Around the world']},
  {id:'science',name:'Science & space',emoji:'🚀',topics:['Science','Space']},
  {id:'nature',name:'Animals & nature',emoji:'🌿',topics:['Nature','Animals']},
  {id:'food',name:'Food & drink',emoji:'🍕',topics:['Food','Food & drink']},
  {id:'screen',name:'Movies & TV',emoji:'🎬',topics:['Movies','Television']},
  {id:'music',name:'Music',emoji:'🎵',topics:['Music']},
  {id:'sport',name:'Sports',emoji:'⚽',topics:['Sport']},
  {id:'arts',name:'Books & art',emoji:'🎨',topics:['Literature','Art']},
  {id:'general',name:'General knowledge & numbers',emoji:'💡',topics:['General knowledge','Numbers']}
].map(c=>({...c,count:questions.filter(q=>c.topics.includes(q.category)).length}));
export function selectedCategories(ids=categories.map(c=>c.id)){
  if(!Array.isArray(ids))throw Error('Choose at least one category.');
  const selected=categories.filter(c=>ids.includes(c.id));
  if(!selected.length)throw Error('Choose at least one category.');
  return selected;
}
export function questionCount(ids,requested=15){if(!Number.isInteger(requested)||requested<1)throw Error('Choose a whole number of questions, starting from 1.');return Math.min(requested,selectedCategories(ids).reduce((n,c)=>n+c.count,0));}
export function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function makeGame(name,seconds=30,categoryIds,requested=15){const chosen=selectedCategories(categoryIds).map(c=>c.id);return {categories:chosen,total:questionCount(chosen,requested),name:name.trim().slice(0,50)||'Our quiz night',seconds:[20,30,45,60].includes(seconds)?seconds:30,phase:'lobby',index:0,deadline:0,players:[],deck:[],used:[],answers:{},revision:0};}
export function addPlayer(g,id,name,character){if(g.phase!=='lobby')throw Error('This game has started. Join after the rematch.');if(g.players.length>=8)throw Error('This table is full (8 players maximum).');name=String(name||'').trim().slice(0,24);if(!name)throw Error('Enter your name.');if(g.players.some(p=>p.name.toLowerCase()===name.toLowerCase()))throw Error('That name is taken. Try another.');if(!Number.isInteger(character)||!characters[character])throw Error('Choose a character.');g.players.push({id,name,character,score:0,connected:true});g.revision++;}
export function start(g,now=Date.now()){if(g.phase!=='lobby')throw Error('This quiz has already started.');if(g.players.filter(p=>p.connected).length<2)throw Error('Wait for one more player to join.');const chosen=selectedCategories(g.categories);
 const buckets=shuffle(chosen).map(c=>({fresh:shuffle(questions.filter(q=>c.topics.includes(q.category)&&!g.used.includes(q.q))),used:shuffle(questions.filter(q=>c.topics.includes(q.category)&&g.used.includes(q.q)))}));
 const picked=[];
 for(const key of ['fresh','used']){
   while(picked.length<g.total&&buckets.some(b=>b[key].length)){
     for(const bucket of buckets){if(picked.length>=g.total)break;if(bucket[key].length)picked.push(bucket[key].pop());}
   }
 }
 g.deck=picked.map((q,i)=>{const order=shuffle([0,1,2,3]);return {...q,round:Math.floor(i/5)===Math.ceil(g.total/5)-1?'The final call':i<5?'The warm-up':'Keep it going',o:order.map(j=>q.o[j]),a:order.indexOf(q.a)};});
 g.used=[...new Set([...g.used,...g.deck.map(q=>q.q)])];g.phase='question';g.index=0;g.answers={};g.players.forEach(p=>p.score=0);g.deadline=now+g.seconds*1000;g.revision++;}
export function answer(g,id,index,choice,now=Date.now()){if(g.phase!=='question'||index!==g.index||now>=g.deadline)throw Error('Answers are closed for this question.');if(!g.players.some(p=>p.id===id&&p.connected))throw Error('Player is not connected.');if(!Number.isInteger(choice)||choice<0||choice>3)throw Error('Choose an answer.');if(Object.hasOwn(g.answers,id))throw Error('Your answer is already locked in.');g.answers[id]=choice;g.revision++;if(g.players.filter(p=>p.connected).every(p=>Object.hasOwn(g.answers,p.id)))reveal(g);}
export function reveal(g){if(g.phase!=='question')return;g.phase='reveal';for(const p of g.players)if(g.answers[p.id]===g.deck[g.index].a)p.score+=100;g.revision++;}
export function next(g,now=Date.now()){if(g.phase!=='reveal')throw Error('Wait for the answers to be revealed.');if(g.index===g.deck.length-1){g.phase='finished';}else{g.index++;g.phase='question';g.answers={};g.deadline=now+g.seconds*1000;}g.revision++;}
export function rematch(g){if(g.phase!=='finished')throw Error('Finish this quiz first.');g.phase='lobby';g.answers={};g.players=g.players.filter(p=>p.connected);g.players.forEach(p=>p.score=0);g.index=0;g.revision++;}
export function snapshot(g,id,now=Date.now()){const q=g.deck[g.index],shown=['reveal','finished'].includes(g.phase);return {categories:[...g.categories],total:g.total,name:g.name,phase:g.phase,index:g.index,seconds:g.seconds,remaining:Math.max(0,g.deadline-now),revision:g.revision,players:g.players.map(p=>({...p,answered:Object.hasOwn(g.answers,p.id)})),mine:Object.hasOwn(g.answers,id)?g.answers[id]:null,question:q&&g.phase!=='lobby'?{q:q.q,o:q.o,round:q.round,category:q.category,...(shown?{a:q.a,f:q.f}:{})}:null};}
